#!/usr/bin/env python3
"""Build data/badges.json from (1) your GitHub achievements page and
(2) the image files in certifications/badges/. Needs no API key.
If GitHub cannot be reached, the previous GitHub list is kept."""
import json, os, re, sys, html, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'data', 'badges.json')
FOLDER = os.path.join(ROOT, 'certifications', 'badges')
USER = os.environ.get('GH_USER', 'KAPPI1925')
EXT = ('.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif')

def github_badges():
    url = f'https://github.com/{USER}?tab=achievements'
    req = urllib.request.Request(url, headers={'User-Agent': 'portfolio-badge-sync'})
    page = urllib.request.urlopen(req, timeout=30).read().decode('utf-8', 'replace')
    out = []
    for m in re.finditer(r'data-achievement-slug="([^"]+)"(.*?)</summary>', page, re.S):
        slug, body = m.group(1), m.group(2)
        img = re.search(r'<img[^>]+src="([^"]+)"', body)
        name = re.search(r'<h3[^>]*>\s*(.*?)\s*</h3>', body, re.S)
        tier = re.search(r'>\s*(x\d+)\s*<', body)
        if not img or not name:
            continue
        label = html.unescape(re.sub(r'<[^>]+>', '', name.group(1))).strip()
        if tier:
            label += ' ' + tier.group(1)
        out.append({'name': label,
                    'image': html.unescape(img.group(1)),
                    'url': f'https://github.com/{USER}?achievement={slug}'})
    return out

def local_badges():
    out = []
    if os.path.isdir(FOLDER):
        for f in sorted(os.listdir(FOLDER), key=str.lower):
            if f.lower().endswith(EXT):
                out.append({'name': os.path.splitext(f)[0],
                            'image': 'certifications/badges/' + f})
    return out

def main():
    old = {}
    try:
        old = json.load(open(OUT, encoding='utf-8'))
    except Exception:
        pass
    try:
        gh = github_badges()
        print('GitHub achievements:', len(gh))
    except Exception as e:
        print('GitHub not reachable, keeping old list:', e)
        gh = old.get('github', [])
    data = {'github': gh, 'local': local_badges()}
    text = json.dumps(data, indent=2, ensure_ascii=False) + '\n'
    try:
        if open(OUT, encoding='utf-8').read() == text:
            print('No change.'); return
    except Exception:
        pass
    open(OUT, 'w', encoding='utf-8', newline='\n').write(text)
    print('Wrote', OUT, '- local:', len(data['local']))

if __name__ == '__main__':
    main()
