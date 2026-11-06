"""Fetch citation metrics from Google Scholar (through SerpApi) and write data/metrics.json.

Run by .github/workflows/update-metrics.yml. Needs two settings in the GitHub repo:
  - secret   SERPAPI_KEY  : your SerpApi API key (never commit it)
  - variable SCHOLAR_ID   : the "user=" part of your Google Scholar profile URL
If anything goes wrong, the existing data/metrics.json is left untouched and the job fails,
so the website keeps showing the last good numbers.
"""
import datetime
import json
import os
import sys
import urllib.parse
import urllib.request

OUT = os.path.join(os.path.dirname(__file__), "..", "data", "metrics.json")


def main() -> int:
    key = os.environ.get("SERPAPI_KEY", "").strip()
    author = os.environ.get("SCHOLAR_ID", "").strip()
    if not key or not author:
        print("SERPAPI_KEY secret or SCHOLAR_ID variable is not set; nothing updated.")
        return 1

    url = "https://serpapi.com/search.json?" + urllib.parse.urlencode(
        {"engine": "google_scholar_author", "author_id": author, "hl": "en", "api_key": key}
    )
    with urllib.request.urlopen(url, timeout=60) as resp:
        data = json.load(resp)

    if "error" in data:
        print("SerpApi error:", data["error"])
        return 1

    table = {}
    for row in data.get("cited_by", {}).get("table", []):
        table.update(row)
    try:
        metrics = {
            "citations": int(table["citations"]["all"]),
            "h_index": int(table["h_index"]["all"]),
            "i10_index": int(table["i10_index"]["all"]),
        }
    except (KeyError, TypeError, ValueError):
        print("Unexpected response, metrics table not found:", json.dumps(data.get("cited_by"))[:500])
        return 1

    old = {}
    if os.path.exists(OUT):
        with open(OUT, encoding="utf-8") as f:
            old = json.load(f)
    if all(old.get(k) == v for k, v in metrics.items()):
        print("No change:", metrics)
        return 0

    metrics["source"] = "Google Scholar (via SerpApi)"
    metrics["updated"] = datetime.date.today().isoformat()
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(metrics, f, indent=2)
        f.write("\n")
    print("Updated:", metrics)
    return 0


if __name__ == "__main__":
    sys.exit(main())
