"""One-off: print the shape of SerpApi Google Scholar responses (truncated) so the parser can be written
against real keys. Writes nothing. Run from the workflow with mode=discover."""
import json, os, urllib.parse, urllib.request

KEY = os.environ["SERPAPI_KEY"].strip()
AUTHOR = os.environ["SCHOLAR_ID"].strip().split("&")[0]


def get(params):
    params = dict(params, api_key=KEY)
    url = "https://serpapi.com/search.json?" + urllib.parse.urlencode(params)
    with urllib.request.urlopen(url, timeout=90) as r:
        return json.load(r)


def trim(o, depth=0):
    if isinstance(o, dict):
        return {k: trim(v, depth + 1) for k, v in o.items() if k not in ("search_metadata",)}
    if isinstance(o, list):
        return [trim(v, depth + 1) for v in o[:3]] + ([f"... {len(o)} items"] if len(o) > 3 else [])
    if isinstance(o, str):
        return o[:120]
    return o


def show(name, data):
    txt = json.dumps(trim(data), indent=1, ensure_ascii=False).replace(KEY, "***")
    print(f"===== {name} =====\n{txt}\n")


a = get({"engine": "google_scholar_author", "author_id": AUTHOR, "hl": "en", "num": 100})
show("author", a)
arts = a.get("articles", [])
print("ALL ARTICLE TITLES:")
for x in arts:
    print(" -", x.get("year"), "|", x.get("cited_by", {}).get("value"), "|", x.get("title"), "|", x.get("publication"))
if arts:
    top = arts[1]
    show("view_citation", get({"engine": "google_scholar_author", "author_id": AUTHOR, "hl": "en",
                               "view_op": "view_citation", "citation_id": top["citation_id"]}))
    cid = top.get("cited_by", {}).get("cites_id")
    s = get({"engine": "google_scholar", "cluster": cid, "hl": "en"}) if cid else get({"engine": "google_scholar", "q": top["title"], "hl": "en"})
    show("scholar_search", s)
    org = s.get("organic_results") or []
    if org:
        show("cite", get({"engine": "google_scholar_cite", "q": org[0]["result_id"], "hl": "en"}))
