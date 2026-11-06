"""Fetch Google Scholar data through SerpApi and write it for the website.

Run by .github/workflows/update-metrics.yml (weekly). GitHub settings needed:
  secret   SERPAPI_KEY : SerpApi key (never commit it)
  variable SCHOLAR_ID  : the "user=" value of the Google Scholar profile URL

Files written (only when something changed):
  data/metrics.json         weekly  : totals, citations per year, article list, co-authors   (1 search)
  data/scholar_details.json monthly : per-article record, citations per year, PDF links       (1 search per paper)
  data/scholar_cite.json    once    : citation formats, BibTeX, free PDF links per paper      (2-4 searches per new paper)
Details and citation formats are fetched only for Scholar articles whose title matches a paper in
data/publications.js, so wrong or duplicate Scholar entries cost nothing.
If a request fails, the old file is kept so the website keeps the last good data.
"""
import datetime
import json
import os
import re
import sys
import urllib.parse
import urllib.request

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
DATA = os.path.join(ROOT, "data")
METRICS = os.path.join(DATA, "metrics.json")
DETAILS = os.path.join(DATA, "scholar_details.json")
CITE = os.path.join(DATA, "scholar_cite.json")
DETAILS_MAX_AGE_DAYS = 28
OWNER_SURNAME = "Kanna"   # a citation record must contain this, or it is not used

KEY = os.environ.get("SERPAPI_KEY", "").strip()
# Accept "HGfTEjkAAAAJ", "HGfTEjkAAAAJ&hl=en" or a full profile URL.
_raw_id = os.environ.get("SCHOLAR_ID", "").strip()
_m = re.search(r"user=([^&]+)", _raw_id)
AUTHOR = (_m.group(1) if _m else _raw_id).split("&")[0].strip()
FORCE_DETAILS = os.environ.get("FORCE_DETAILS", "") == "1"
TODAY = datetime.date.today().isoformat()
searches = 0


def get(params):
    global searches
    searches += 1
    url = "https://serpapi.com/search.json?" + urllib.parse.urlencode(dict(params, api_key=KEY, hl="en"))
    with urllib.request.urlopen(url, timeout=90) as r:
        data = json.load(r)
    if "error" in data:
        raise RuntimeError(data["error"])
    return data


def load(path, default):
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except (OSError, ValueError):
        return default


def save(path, obj, old):
    """Write obj if it differs from old (ignoring the 'updated' stamp)."""
    def strip(d):
        return {k: v for k, v in d.items() if k != "updated"}
    if strip(obj) == strip(old):
        print("No change:", os.path.basename(path))
        return
    obj["updated"] = TODAY
    with open(path, "w", encoding="utf-8") as f:
        json.dump(obj, f, indent=1, ensure_ascii=False)
        f.write("\n")
    print("Updated:", os.path.basename(path))


def norm(t):
    return re.sub(r"\s+", " ", re.sub(r"[^a-z0-9]+", " ", (t or "").lower())).strip()


def same_title(a, b):
    a, b = norm(a), norm(b)
    if not a or not b:
        return False
    if a == b or a.startswith(b) or b.startswith(a):
        return True
    sa, sb = set(a.split()), set(b.split())
    return len(sa & sb) / len(sa | sb) >= 0.85


def site_titles():
    with open(os.path.join(DATA, "publications.js"), encoding="utf-8") as f:
        return re.findall(r'title:\s*"((?:[^"\\]|\\.)*)"', f.read())


def table_value(table, name, which):
    for row in table:
        if name in row:
            if which == "all":
                return row[name].get("all")
            for k, v in row[name].items():
                if k.startswith("since_"):
                    return v
    return None


def fetch_details(cid):
    c = get({"engine": "google_scholar_author", "author_id": AUTHOR,
             "view_op": "view_citation", "citation_id": cid}).get("citation", {})
    tc = c.get("total_citations") or {}
    return {
        "title": c.get("title"),
        "link": c.get("link"),
        "authors": c.get("authors"),
        "publication_date": c.get("publication_date"),
        "journal": c.get("journal"),
        "conference": c.get("conference"),
        "book": c.get("book"),
        "volume": c.get("volume"),
        "issue": c.get("issue"),
        "pages": c.get("pages"),
        "publisher": c.get("publisher"),
        "resources": [{"title": r.get("title"), "file_format": r.get("file_format"), "link": r.get("link")}
                      for r in c.get("resources", []) if r.get("link")],
        "per_year": [{"year": t.get("year"), "citations": t.get("citations")}
                     for t in tc.get("table", []) if t.get("year") is not None],
        "total": (tc.get("cited_by") or {}).get("total"),
    }


def fetch_cite(x):
    """Citation formats + free full-text links for one paper.

    Scholar often holds several records of one paper, and some drop authors (one YOLO record leaves
    out Kanna). Only a record whose APA text contains OWNER_SURNAME is used; otherwise no formats.
    """
    s = get({"engine": "google_scholar", "cluster": x["cites_id"]}) if x.get("cites_id") \
        else get({"engine": "google_scholar", "q": x["title"]})
    hits = [r for r in s.get("organic_results", []) if same_title(r.get("title"), x["title"])]
    if not hits:
        print("No Scholar search match for", x["title"][:60])
        return None
    pdf, seen = [], set()
    for r in hits:
        for res in r.get("resources", []) or []:
            if res.get("link") and res["link"] not in seen:
                seen.add(res["link"])
                pdf.append({"title": res.get("title") or "", "file_format": res.get("file_format"), "link": res["link"]})
    ct, tried = None, set()
    for r in hits:
        rid = r.get("result_id")
        if not rid or rid in tried or len(tried) >= 3:
            continue
        tried.add(rid)
        c = get({"engine": "google_scholar_cite", "q": rid})
        apa = next((z.get("snippet", "") for z in c.get("citations", []) if z.get("title") == "APA"), "")
        if OWNER_SURNAME.lower() in apa.lower():
            ct = c
            break
        print("Skipped a record without", OWNER_SURNAME, "in its authors:", apa[:80])
    if not ct:
        return {"styles": [], "bibtex": None, "pdf": pdf}
    bibtex = None
    for link in ct.get("links", []):
        if link.get("name") == "BibTeX" and link.get("link"):
            try:  # the download link expires within minutes, so fetch the text now
                req = urllib.request.Request(link["link"], headers={"User-Agent": "Mozilla/5.0"})
                with urllib.request.urlopen(req, timeout=30) as r:
                    txt = r.read().decode("utf-8", "replace").strip()
                if txt.startswith("@"):
                    bibtex = txt
            except Exception as e:
                print("BibTeX download failed for", x["title"][:60], "-", e)
    return {"styles": [{"title": c.get("title"), "snippet": c.get("snippet")} for c in ct.get("citations", [])],
            "bibtex": bibtex, "pdf": pdf}


def main() -> int:
    if not KEY or not AUTHOR:
        print("SERPAPI_KEY secret or SCHOLAR_ID variable is not set; nothing updated.")
        return 1

    # ---- weekly: profile ---------------------------------------------------
    a = get({"engine": "google_scholar_author", "author_id": AUTHOR, "num": 100})
    table = a.get("cited_by", {}).get("table", [])
    since_key = next((k for row in table for v in row.values() for k in v if k.startswith("since_")), None)
    metrics = {
        "citations": table_value(table, "citations", "all"),
        "h_index": table_value(table, "h_index", "all"),
        "i10_index": table_value(table, "i10_index", "all"),
        "since_year": int(since_key.split("_")[1]) if since_key else None,
        "citations_since": table_value(table, "citations", "since"),
        "h_index_since": table_value(table, "h_index", "since"),
        "i10_index_since": table_value(table, "i10_index", "since"),
        "graph": [{"year": g["year"], "citations": g["citations"]} for g in a.get("cited_by", {}).get("graph", [])],
        "profile_url": f"https://scholar.google.com/citations?user={AUTHOR}&hl=en",
        "articles": [
            {
                "title": x.get("title"),
                "citation_id": x.get("citation_id"),
                "authors": x.get("authors"),
                "publication": x.get("publication"),
                "year": x.get("year"),
                "cited_by": (x.get("cited_by") or {}).get("value") or 0,
                "cited_by_link": (x.get("cited_by") or {}).get("link"),
                "cites_id": (x.get("cited_by") or {}).get("cites_id"),
            }
            for x in a.get("articles", [])
        ],
        "co_authors": [
            {"name": c.get("name"), "affiliations": c.get("affiliations"), "link": c.get("link")}
            for c in a.get("co_authors", [])
        ],
        "source": "Google Scholar (via SerpApi)",
    }
    if metrics["citations"] is None or metrics["h_index"] is None:
        print("Unexpected response, metrics table not found.")
        return 1
    save(METRICS, metrics, load(METRICS, {}))

    titles = site_titles()
    wanted = [x for x in metrics["articles"] if x["citation_id"] and any(same_title(x["title"], t) for t in titles)]
    print(f"{len(wanted)} of {len(metrics['articles'])} Scholar articles match the website.")

    # ---- monthly: per-article details --------------------------------------
    old_d = load(DETAILS, {"items": {}})
    items = dict(old_d.get("items", {}))
    if old_d.get("updated"):
        age = (datetime.date.today() - datetime.date.fromisoformat(old_d["updated"])).days
    else:
        age = 999
    refresh_all = FORCE_DETAILS or age >= DETAILS_MAX_AGE_DAYS
    fetched = failures = 0
    for x in wanted:
        cid = x["citation_id"]
        if not refresh_all and cid in items:
            continue
        try:
            items[cid] = fetch_details(cid)
            fetched += 1
            failures = 0
        except Exception as e:  # keep the old record
            print("Details failed for", x["title"][:60], "-", e)
            failures += 1
            if failures >= 2:
                print("Per-article pages are not available from SerpApi right now; will retry next run.")
                break
    if fetched:
        # a full refresh always restamps the date so the next one is a month later
        save(DETAILS, {"items": items}, {} if refresh_all else old_d)
    else:
        print(f"Details skipped (last refresh {age} days ago).")

    # ---- once per paper: citation formats ----------------------------------
    old_c = load(CITE, {"items": {}})
    cites = dict(old_c.get("items", {}))
    for x in wanted:
        if x["citation_id"] in cites:
            continue
        try:
            rec = fetch_cite(x)
        except Exception as e:
            print("Cite failed for", x["title"][:60], "-", e)
            continue
        if rec:
            cites[x["citation_id"]] = rec
    save(CITE, {"items": cites}, old_c)

    print("SerpApi searches used this run:", searches)
    return 0


if __name__ == "__main__":
    sys.exit(main())
