/* ============================================================
   GOOGLE SCHOLAR ADD-ONS
   Data comes from data/metrics.json, data/scholar_details.json and
   data/scholar_links.json, written by the monthly GitHub Actions job
   (scripts/update_metrics.py). app.js loads them into window.SCHOLAR
   and fires a 'scholar-data' event.

   Adds: citations-per-year chart (hero), "Cited by N" badges, sort
   (Newest / Most cited), Most cited strip, Scholar record line,
   per-paper citation chart, free PDF link, Cite button (all formats
   built from data/publications.js, not Scholar), co-authors.
   Everything is optional: missing data simply shows nothing.
   ============================================================ */

(function () {
  'use strict';

  const SKIP_KEYS = ['reviewerRoles', 'patents'];
  let applied = false;
  let sortMode = 'newest';

  // ─── Helpers ────────────────────────────────────────────
  const esc = s => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  const stripTags = s => String(s || '').replace(/<[^>]*>/g, '');
  const norm = t => String(t || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

  function sameTitle(a, b) {
    a = norm(a); b = norm(b);
    if (!a || !b) return false;
    if (a === b || a.startsWith(b) || b.startsWith(a)) return true;
    const sa = new Set(a.split(' ')), sb = new Set(b.split(' '));
    let inter = 0;
    sa.forEach(w => { if (sb.has(w)) inter++; });
    return inter / (sa.size + sb.size - inter) >= 0.85;
  }

  function siteItem(card) {
    const key = card.dataset.pubKey, i = Number(card.dataset.pubIndex);
    return (typeof PUBLICATIONS !== 'undefined' && PUBLICATIONS[key]) ? PUBLICATIONS[key][i] : null;
  }

  function cards() {
    return [...document.querySelectorAll('#pub-panels .pub-card[data-pub-key]')]
      .filter(c => !SKIP_KEYS.includes(c.dataset.pubKey));
  }

  // Scholar article matched to a card (cached on the element)
  function articleFor(card, articles) {
    if (card._scholar !== undefined) return card._scholar;
    const item = siteItem(card);
    const title = item ? item.title.replace(/\s*\(Chapter \d+\)\s*$/i, '') : '';
    card._scholar = (articles || []).find(a => sameTitle(a.title, title)) || null;
    return card._scholar;
  }

  // ─── 1. Citations per year (hero) ───────────────────────
  function renderHeroChart(metrics) {
    const box = document.getElementById('hero-cite-chart');
    const g = (metrics && metrics.graph) || [];
    if (!box || g.length === 0) return;
    const max = Math.max(...g.map(d => d.citations), 1);
    const bw = 34, gap = 14, h = 70, top = 16;
    const w = g.length * (bw + gap) - gap;
    const bars = g.map((d, i) => {
      const bh = Math.max(2, Math.round((d.citations / max) * h));
      const x = i * (bw + gap), y = top + h - bh;
      return `<g><title>${d.year}: ${d.citations} citations</title>
        <rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="4" class="cc-bar"></rect>
        <text x="${x + bw / 2}" y="${y - 4}" class="cc-val">${d.citations}</text>
        <text x="${x + bw / 2}" y="${top + h + 14}" class="cc-year">${d.year}</text></g>`;
    }).join('');
    box.innerHTML = `
      <div class="cc-title">Citations per year <span>· Google Scholar</span></div>
      <svg viewBox="0 0 ${w} ${top + h + 20}" width="${w}" height="${top + h + 20}" role="img"
        aria-label="Citations per year: ${g.map(d => d.year + ' ' + d.citations).join(', ')}">${bars}</svg>`;
    box.hidden = false;
  }

  // ─── 7. Sort control ────────────────────────────────────
  function initSort() {
    const panels = document.getElementById('pub-panels');
    if (!panels || document.getElementById('pub-sort')) return;
    const bar = document.createElement('div');
    bar.id = 'pub-sort';
    bar.className = 'pub-sort';
    bar.innerHTML = `<span>Sort by</span>
      <button type="button" class="pub-sort-btn active" data-sort="newest">Newest</button>
      <button type="button" class="pub-sort-btn" data-sort="cited">Most cited</button>`;
    panels.parentNode.insertBefore(bar, panels);
    bar.addEventListener('click', e => {
      const b = e.target.closest('.pub-sort-btn');
      if (!b) return;
      sortMode = b.dataset.sort;
      bar.querySelectorAll('.pub-sort-btn').forEach(x => x.classList.toggle('active', x === b));
      applySort();
    });
    applySort();
  }

  function applySort() {
    document.querySelectorAll('#pub-panels .pub-panel').forEach(panel => {
      const list = [...panel.querySelectorAll(':scope > .pub-card')];
      if (list.length < 2) return;
      const yearOf = c => { const it = siteItem(c); return parseInt(it && it.year, 10) || 0; };
      const citesOf = c => (c._scholar && c._scholar.cited_by) || 0;
      list.map((c, i) => ({ c, i }))
        .sort((p, q) => {
          if (sortMode === 'cited') {
            const d = citesOf(q.c) - citesOf(p.c);
            if (d) return d;
          }
          return (yearOf(q.c) - yearOf(p.c)) || (Number(p.c.dataset.pubIndex) - Number(q.c.dataset.pubIndex));
        })
        .forEach(({ c }) => panel.appendChild(c));
    });
  }

  // ─── 6, 13, 14, 15, 18. Card add-ons ────────────────────
  function enhanceCard(card, data) {
    const item = siteItem(card);
    if (!item || card.dataset.scholarDone) return;
    card.dataset.scholarDone = '1';
    const art = articleFor(card, data.metrics && data.metrics.articles);
    const cid = art && art.citation_id;
    const det = cid && data.details && data.details.items ? data.details.items[cid] : null;
    const cit = cid && data.links && data.links.items ? data.links.items[cid] : null;
    const actions = card.querySelector('.pub-card-actions');

    // 15. Scholar record: only parts not already shown on the card
    if (det) {
      const shown = norm(stripTags([item.journal, item.publisher, item.conference, item.bookTitle, item.isbn].join(' ')));
      const parts = [
        det.volume && ['Vol.', det.volume], det.issue && ['Issue', det.issue], det.pages && ['pp.', det.pages],
        det.publisher && ['', det.publisher], det.publication_date && ['Published', det.publication_date]
      ].filter(Boolean).filter(([, v]) => !shown.includes(norm(v)));
      if (parts.length) {
        const div = document.createElement('div');
        div.className = 'pub-scholar-record';
        div.innerHTML = '<i class="fas fa-graduation-cap"></i> ' + parts.map(([l, v]) => esc((l ? l + ' ' : '') + v)).join(' · ');
        const venues = card.querySelectorAll('.pub-venue');
        const after = venues[venues.length - 1] || card.querySelector('.pub-authors');
        after.insertAdjacentElement('afterend', div);
      }
    }

    // 6. Cited by N  +  13. per-paper citations per year
    if (art && art.cited_by > 0) {
      const head = card.querySelector('.pub-card-header');
      const badge = document.createElement('a');
      badge.className = 'pub-cited-badge';
      badge.href = art.cited_by_link || (data.metrics && data.metrics.profile_url) || '#';
      badge.target = '_blank';
      badge.rel = 'noopener noreferrer';
      badge.title = 'See who cites this paper on Google Scholar';
      badge.innerHTML = `<i class="fas fa-quote-right"></i> Cited by ${art.cited_by}`;
      head.querySelector('.pub-year').insertAdjacentElement('beforebegin', badge);
      if (det && det.per_year && det.per_year.length) {
        const max = Math.max(...det.per_year.map(d => d.citations), 1);
        const spark = document.createElement('div');
        spark.className = 'pub-spark';
        spark.innerHTML = `<span class="pub-spark-label">Citations per year</span>` + det.per_year.map(d =>
          `<span class="pub-spark-col" title="${d.year}: ${d.citations}"><span class="pub-spark-bar" style="height:${Math.max(8, Math.round(d.citations / max * 100))}%"></span><span class="pub-spark-year">${String(d.year).slice(2)}</span></span>`
        ).join('');
        actions.insertAdjacentElement('beforebegin', spark);
      }
    }

    // 14. free full text
    const pdfs = [...((cit && cit.pdf) || []), ...((det && det.resources) || [])];
    const pdf = pdfs.find(p => /pdf/i.test(p.file_format || '')) || pdfs[0];
    if (pdf && pdf.link) {
      actions.insertAdjacentHTML('beforeend',
        `<a href="${esc(pdf.link)}" target="_blank" rel="noopener noreferrer" class="pub-link" title="Free full text found by Google Scholar${pdf.title ? ' (' + esc(pdf.title) + ')' : ''}"><i class="fas fa-file-pdf"></i> Free ${esc(pdf.file_format || 'PDF')}</a>`);
    }

    // 18. Cite (every publication card; all formats built from data/publications.js)
    actions.insertAdjacentHTML('beforeend',
      `<button type="button" class="pub-link pub-cite-btn"><i class="fas fa-quote-left"></i> Cite</button>`);
    actions.querySelector('.pub-cite-btn').addEventListener('click', () => openCite(item));
  }

  // ─── 18. Citation formats (built from this website's own records) ──
  // Names are split into family name + initials: the family name is the last full word that is not an
  // initial ("Athira A Nair" -> Nair, A. A.; "Karthikkumar A" -> Karthikkumar, A.).
  const isInitial = w => /\./.test(w) || w.length <= 2 || (w === w.toUpperCase() && w.length <= 3);

  function parseName(raw) {
    const words = raw.replace(/\./g, '. ').split(/\s+/).filter(Boolean);
    let fi = -1;
    for (let i = words.length - 1; i >= 0; i--) if (!isInitial(words[i])) { fi = i; break; }
    if (fi < 0) return { family: raw.trim(), given: [] };
    return { family: words[fi], given: words.filter((_, i) => i !== fi) };
  }
  // "K. P." / "VR" / "Kamalesh Kanna" -> ['K','P'] / ['V','R'] / ['K','K']
  const letters = n => n.given.map(g => g.replace(/\./g, ''))
    .flatMap(g => (g === g.toUpperCase() && g.length <= 3) ? g.split('') : [g[0]]).map(c => c.toUpperCase());
  const givenFull = n => n.given.map(g => (g.replace(/\./g, '').length === 1 ? g.replace(/\.?$/, '.') : g)).join(' ');
  const withGiven = n => n.given.length ? `${n.family}, ${givenFull(n)}` : n.family;

  function authorList(item) {
    return stripTags(item.authors).replace(/\((co-)?author\)/gi, '').split(/\s*,\s*|\s+and\s+/)
      .map(s => s.trim()).filter(Boolean).map(parseName);
  }

  function citeParts(item) {
    const doi = item.doi ? String(item.doi).replace(/^https?:\/\/(dx\.)?doi\.org\//i, '') : '';
    const inBook = !!(item.bookTitle || item.conference);
    return {
      title: item.title.replace(/\s*\(Chapter \d+\)\s*$/i, ''),
      doi,
      link: doi ? `https://doi.org/${doi}` : (item.url && item.url !== '#' ? item.url : ''),
      container: stripTags(item.journal || item.bookTitle || item.conference || ''),
      publisher: item.journal ? '' : stripTags(item.publisher || ''),
      inBook,
      year: item.year || 'n.d.'
    };
  }

  const end = s => (/[.?!]$/.test(s) ? s : s + '.');
  const tidy = s => s.replace(/\s+/g, ' ').replace(/\s+\./g, '.').trim();
  const listJoin = (arr, last) => arr.length < 2 ? (arr[0] || '')
    : arr.slice(0, -1).join(', ') + last + arr[arr.length - 1];

  function formats(item) {
    const A = authorList(item), p = citeParts(item);
    const where = [p.inBook ? 'In ' + p.container : p.container, p.publisher].filter(Boolean).map(end).join(' ');

    const apa = tidy(`${end(listJoin(A.map(n => [n.family, letters(n).map(c => c + '.').join(' ')].filter(Boolean).join(', ')), ', & '))} ` +
      `(${p.year}). ${end(p.title)} ${where} ${p.link}`);

    const mlaAuth = A.length === 1 ? withGiven(A[0])
      : A.length === 2 ? `${withGiven(A[0])}, and ${tidy(givenFull(A[1]) + ' ' + A[1].family)}`
        : `${withGiven(A[0])}, et al`;
    const mla = tidy(`${end(mlaAuth)} "${end(p.title)}" ${[p.container, p.publisher, p.year].filter(Boolean).join(', ')}` +
      `${p.link ? ', ' + p.link.replace(/^https?:\/\//, '') : ''}.`);

    const chiNames = A.map((n, i) => i === 0 ? withGiven(n) : tidy(givenFull(n) + ' ' + n.family));
    const chicago = tidy(`${end(listJoin(chiNames, chiNames.length > 2 ? ', and ' : ' and '))} ${p.year}. "${end(p.title)}" ${where} ${p.link}`);

    const harvard = tidy(`${listJoin(A.map(n => [n.family, letters(n).map(c => c + '.').join('')].filter(Boolean).join(', ')), ' and ')} ` +
      `(${p.year}) '${p.title}', ${where}${p.link ? ' Available at: ' + p.link : ''}`);

    const van = A.map(n => tidy(`${n.family} ${letters(n).join('')}`));
    const vancouver = tidy(`${end(van.length > 6 ? van.slice(0, 6).join(', ') + ', et al' : van.join(', '))} ${end(p.title)} ` +
      `${where} ${p.year}.${p.doi ? ' doi:' + p.doi : (p.link ? ' Available from: ' + p.link : '')}`);

    return [['APA', apa], ['MLA', mla], ['Chicago', chicago], ['Harvard', harvard], ['Vancouver', vancouver]];
  }

  function bibtexFor(item) {
    const A = authorList(item), p = citeParts(item);
    const first = (A[0] ? A[0].family : 'author').replace(/[^A-Za-z]/g, '');
    const word = (norm(p.title).split(' ').find(w => w.length > 3) || 'paper');
    const key = `${first.toLowerCase()}${item.year || ''}${word}`;
    const type = item.journal ? 'article' : item.bookTitle ? 'incollection' : item.conference ? 'inproceedings'
      : item.isbn ? 'book' : 'misc';
    const fields = [
      ['title', p.title],
      ['author', A.map(withGiven).join(' and ')],
      ['year', item.year],
      ['journal', item.journal && stripTags(item.journal)],
      ['booktitle', (item.bookTitle || item.conference) && stripTags(item.bookTitle || item.conference)],
      ['publisher', item.publisher && stripTags(item.publisher)],
      ['isbn', item.isbn && stripTags(item.isbn)],
      ['doi', p.doi],
      ['url', item.url && item.url !== '#' ? item.url : '']
    ].filter(([, v]) => v);
    return `@${type}{${key},\n` + fields.map(([k, v]) => `  ${k} = {${String(v).replace(/[{}]/g, '')}}`).join(',\n') + '\n}';
  }

  function ensureModal() {
    let m = document.getElementById('cite-modal');
    if (m) return m;
    m = document.createElement('div');
    m.id = 'cite-modal';
    m.className = 'cite-overlay';
    m.innerHTML = `<div class="cite-box" role="dialog" aria-modal="true" aria-labelledby="cite-title">
        <div class="cite-head"><span id="cite-title">Cite this publication</span>
          <button type="button" class="cite-close" aria-label="Close"><i class="fas fa-times"></i></button></div>
        <div class="cite-body"></div></div>`;
    document.body.appendChild(m);
    const close = () => m.classList.remove('open');
    m.addEventListener('click', e => {
      if (e.target === m || e.target.closest('.cite-close')) close();
      const copy = e.target.closest('button.cite-copy');
      if (copy) {
        const text = copy.parentElement.querySelector('.cite-text').innerText;
        (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(
          () => { copy.innerHTML = '<i class="fas fa-check"></i> Copied'; setTimeout(() => { copy.innerHTML = '<i class="fas fa-copy"></i> Copy'; }, 1500); },
          () => { copy.textContent = 'Select and copy'; });
      }
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    return m;
  }

  function openCite(item) {
    const m = ensureModal();
    const bib = bibtexFor(item);
    const blob = URL.createObjectURL(new Blob([bib + '\n'], { type: 'application/x-bibtex' }));
    m.querySelector('.cite-body').innerHTML =
      formats(item).map(([name, text]) => `<div class="cite-row"><div class="cite-style">${name}</div>
          <div class="cite-text">${esc(text)}</div>
          <button type="button" class="cite-copy"><i class="fas fa-copy"></i> Copy</button></div>`).join('') +
      `<div class="cite-row"><div class="cite-style">BibTeX</div>
          <pre class="cite-text cite-bib">${esc(bib)}</pre>
          <button type="button" class="cite-copy"><i class="fas fa-copy"></i> Copy</button>
          <a class="cite-copy" href="${blob}" download="${esc(bib.match(/\{([^,]+),/)[1])}.bib"><i class="fas fa-download"></i> .bib</a></div>`;
    m.classList.add('open');
  }

  // ─── 8. Most cited strip ────────────────────────────────
  function renderTopCited() {
    const tabs = document.getElementById('pub-tabs');
    if (!tabs || document.getElementById('pub-top-cited')) return;
    const ranked = cards().filter(c => c._scholar && c._scholar.cited_by > 0)
      .sort((a, b) => b._scholar.cited_by - a._scholar.cited_by).slice(0, 3);
    if (!ranked.length) return;
    const box = document.createElement('div');
    box.id = 'pub-top-cited';
    box.className = 'pub-top-cited';
    box.innerHTML = `<div class="ptc-title"><i class="fas fa-fire"></i> Most cited</div><div class="ptc-grid">` +
      ranked.map((c, i) => {
        const it = siteItem(c);
        const venue = stripTags(it.journal || it.bookTitle || it.conference || it.publisher || '');
        return `<button type="button" class="ptc-card" data-target-key="${c.dataset.pubKey}" data-target-index="${c.dataset.pubIndex}">
          <span class="ptc-rank">#${i + 1}</span>
          <span class="ptc-name">${esc(it.title)}</span>
          <span class="ptc-venue">${esc(venue)} · ${esc(it.year)}</span>
          <span class="ptc-cites"><i class="fas fa-quote-right"></i> Cited by ${c._scholar.cited_by}</span></button>`;
      }).join('') + `</div>`;
    tabs.parentNode.insertBefore(box, tabs);
    box.addEventListener('click', e => {
      const b = e.target.closest('.ptc-card');
      if (!b) return;
      const tab = document.querySelector(`.pub-tab[data-pub-tab="${b.dataset.targetKey}"]`);
      if (tab) tab.click();
      const card = document.querySelector(`.pub-card[data-pub-key="${b.dataset.targetKey}"][data-pub-index="${b.dataset.targetIndex}"]`);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.remove('pub-flash'); void card.offsetWidth; card.classList.add('pub-flash');
      }
    });
  }

  // ─── 11. Co-authors ─────────────────────────────────────
  function renderCoauthors(metrics) {
    const list = (metrics && metrics.co_authors) || [];
    const container = document.querySelector('#publications .pub-container');
    if (!list.length || !container || document.getElementById('pub-coauthors')) return;
    const nice = n => (n === n.toLowerCase() || n === n.toUpperCase())
      ? n.toLowerCase().replace(/\b[a-z]/g, ch => ch.toUpperCase()) : n;
    const initials = n => n.split(/[\s.]+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
    const box = document.createElement('div');
    box.id = 'pub-coauthors';
    box.className = 'pub-coauthors';
    box.innerHTML = `<div class="ptc-title"><i class="fas fa-user-friends"></i> Co-authors on Google Scholar</div>
      <div class="coauthor-grid">${list.map(c => `
        <a class="coauthor" href="${esc(c.link)}" target="_blank" rel="noopener noreferrer">
          <span class="coauthor-avatar">${esc(initials(nice(c.name)))}</span>
          <span class="coauthor-text"><span class="coauthor-name">${esc(nice(c.name))}</span>
          <span class="coauthor-aff">${esc(c.affiliations || '')}</span></span></a>`).join('')}</div>`;
    container.insertAdjacentElement('afterend', box);
  }

  // ─── Apply ──────────────────────────────────────────────
  function apply(data) {
    if (applied || !data) return;
    applied = true;
    const metrics = data.metrics || {};
    renderHeroChart(metrics);
    cards().forEach(c => { articleFor(c, metrics.articles); enhanceCard(c, data); });
    renderTopCited();
    renderCoauthors(metrics);
    applySort();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initSort();
    if (window.SCHOLAR) apply(window.SCHOLAR);
  });
  document.addEventListener('scholar-data', e => apply(e.detail));
})();
