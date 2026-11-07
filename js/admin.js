/* Site admin dashboard (admin.html).
   Edits data/*.js and uploads certificates straight to GitHub in ONE commit.
   Login = a GitHub fine-grained token for this repo only, stored in this browser
   encrypted with your own password (AES-GCM, PBKDF2). Nothing is sent anywhere except api.github.com. */
(function () {
  'use strict';
  const CFG = { owner: 'KAPPI1925', repo: 'kappi1925.github.io', branch: 'main' };
  const DOCS = {
    activities:   { path: 'data/activities.js',   name: 'ACTIVITIES',   cleanup: true },
    publications: { path: 'data/publications.js', name: 'PUBLICATIONS' },
    profile:      { path: 'data/profile.js',      name: 'PROFILE' }
  };
  const SECTIONS = [
    ['conferences', 'Conferences', 'Conference'], ['webCourses', 'Web course (by provider)', 'Course and Softwares'],
    ['courses', 'Academic courses', 'Course and Softwares'], ['trainings', 'Trainings', 'Training'],
    ['webinars', 'Webinars', 'Webniar'], ['workshops', 'Workshops', 'Workshop'],
    ['invitedTalks', 'Invited talks', 'Others'], ['hackathons', 'Hackathons', 'Hackathon'],
    ['competitions', 'Competitions / symposia', 'Symposium'], ['quizzes', 'Quizzes', 'Others'],
    ['others', 'Others (social, cultural, early)', 'Others'], ['awards', 'Awards & recognition', 'Awards'],
    ['memberships', 'Memberships', 'Membership']
  ];
  const LONG = new Set(['bio', 'abstract', 'details', 'description']);
  const VAULT = 'siteAdminVault.v1';
  const LOCK_MS = 30 * 60 * 1000;

  const S = { token: null, docs: {}, tree: new Set(), uploads: [], deletes: new Set(), tab: 'add', busy: false, msg: null, lockTimer: null };
  const $app = document.getElementById('app');

  // ─── small DOM helper ──────────────────────────────────
  function h(tag, attrs, ...kids) {
    const e = document.createElement(tag);
    for (const k in (attrs || {})) {
      const v = attrs[k];
      if (k === 'class') e.className = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else if (v === true) e.setAttribute(k, '');
      else if (v !== false && v != null) e.setAttribute(k, v);
    }
    kids.flat(2).forEach(c => { if (c != null && c !== false) e.append(c.nodeType ? c : document.createTextNode(c)); });
    return e;
  }
  const clone = o => JSON.parse(JSON.stringify(o));
  const dirtyKeys = () => Object.keys(DOCS).filter(k => S.docs[k] && JSON.stringify(S.docs[k].obj) !== S.docs[k].orig);
  const pendingN = () => dirtyKeys().length + S.uploads.length + S.deletes.size;

  // ─── crypto vault ──────────────────────────────────────
  const b64 = buf => btoa(String.fromCharCode(...new Uint8Array(buf)));
  const unb64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
  async function deriveKey(pw, salt) {
    const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 250000, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
  }
  async function seal(token, pw) {
    const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
    const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, await deriveKey(pw, salt), new TextEncoder().encode(token));
    localStorage.setItem(VAULT, JSON.stringify({ s: b64(salt), i: b64(iv), c: b64(ct) }));
  }
  async function unseal(pw) {
    const v = JSON.parse(localStorage.getItem(VAULT));
    const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64(v.i) }, await deriveKey(pw, unb64(v.s)), unb64(v.c));
    return new TextDecoder().decode(pt);
  }
  const hasVault = () => { try { return !!localStorage.getItem(VAULT); } catch (e) { return false; } };

  // ─── GitHub API ────────────────────────────────────────
  async function gh(path, opt = {}) {
    const r = await fetch('https://api.github.com/repos/' + CFG.owner + '/' + CFG.repo + path, {
      method: opt.method || 'GET',
      headers: Object.assign({ Authorization: 'Bearer ' + S.token, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' }, opt.body ? { 'Content-Type': 'application/json' } : {}),
      body: opt.body ? JSON.stringify(opt.body) : undefined
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { const e = new Error(j.message || ('GitHub error ' + r.status)); e.status = r.status; throw e; }
    return j;
  }
  const decodeB64Utf8 = s => new TextDecoder().decode(unb64(s.replace(/\n/g, '')));

  function parseDoc(text, name) {
    const obj = new Function(text + '\n;return ' + name + ';')();
    const i = text.indexOf('const ' + name);
    return { obj, header: i > 0 ? text.slice(0, i) : '', orig: JSON.stringify(obj) };
  }
  function prune(n) {
    if (Array.isArray(n)) n.forEach(prune);
    else if (n && typeof n === 'object') {
      for (const k of Object.keys(n)) {
        if (['certificatePath', 'url', 'medal'].includes(k) && (n[k] === '' || (Array.isArray(n[k]) && !n[k].length))) delete n[k];
        else prune(n[k]);
      }
    }
  }
  function serializeDoc(key) {
    const d = S.docs[key], cfg = DOCS[key];
    const o = clone(d.obj);
    if (cfg.cleanup) prune(o);
    return d.header + 'const ' + cfg.name + ' = ' + JSON.stringify(o, null, 2) + ';\n';
  }

  async function loadAll() {
    const keys = Object.keys(DOCS);
    const files = await Promise.all(keys.map(k => gh('/contents/' + DOCS[k].path + '?ref=' + CFG.branch)));
    keys.forEach((k, i) => { S.docs[k] = parseDoc(decodeB64Utf8(files[i].content), DOCS[k].name); });
    const t = await gh('/git/trees/' + CFG.branch + '?recursive=1');
    S.tree = new Set(t.tree.filter(x => x.type === 'blob').map(x => x.path));
    S.uploads = []; S.deletes = new Set();
  }

  async function publish(message) {
    const entries = [];
    for (const k of dirtyKeys()) {
      const b = await gh('/git/blobs', { method: 'POST', body: { content: serializeDoc(k), encoding: 'utf-8' } });
      entries.push({ path: DOCS[k].path, mode: '100644', type: 'blob', sha: b.sha });
    }
    for (const u of S.uploads) {
      const b = await gh('/git/blobs', { method: 'POST', body: { content: u.b64, encoding: 'base64' } });
      entries.push({ path: u.path, mode: '100644', type: 'blob', sha: b.sha });
    }
    for (const p of S.deletes) entries.push({ path: p, mode: '100644', type: 'blob', sha: null });
    let lastErr;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const ref = await gh('/git/ref/heads/' + CFG.branch);
        const parent = await gh('/git/commits/' + ref.object.sha);
        const tree = await gh('/git/trees', { method: 'POST', body: { base_tree: parent.tree.sha, tree: entries } });
        const commit = await gh('/git/commits', { method: 'POST', body: { message, tree: tree.sha, parents: [ref.object.sha] } });
        await gh('/git/refs/heads/' + CFG.branch, { method: 'PATCH', body: { sha: commit.sha } });
        return commit.sha;
      } catch (e) { lastErr = e; if (e.status !== 422) throw e; }
    }
    throw lastErr;
  }

  // ─── UI plumbing ───────────────────────────────────────
  function say(text, kind) { S.msg = text ? { text, kind } : null; }
  function touch() { updatePending(); resetLock(); }
  function updatePending() {
    const p = document.getElementById('pending');
    if (p) p.textContent = pendingN() ? pendingN() + ' unsaved change(s)' : 'No unsaved changes';
  }
  function resetLock() { clearTimeout(S.lockTimer); if (S.token) S.lockTimer = setTimeout(lockNow, LOCK_MS); }
  function lockNow() { S.token = null; render(); }
  window.addEventListener('beforeunload', e => { if (pendingN()) { e.preventDefault(); e.returnValue = ''; } });
  ['click', 'keydown'].forEach(ev => document.addEventListener(ev, () => { if (S.token) resetLock(); }));
  function refresh() { const y = scrollY; render(); scrollTo(0, y); }

  function render() {
    $app.innerHTML = '';
    if (!S.token) return $app.append(lockScreen());
    $app.append(
      h('header', null, h('h1', null, 'Site admin — ' + CFG.owner + '/' + CFG.repo),
        h('span', { id: 'pending' }),
        h('button', { class: 'small', onclick: () => { if (pendingN() && !confirm('You have unsaved changes. Lock anyway? (They stay until you close this tab.)')) return; lockNow(); } }, 'Lock')),
      h('nav', null, ...[['add', 'Add certificate'], ['activities', 'Certificates & activities'], ['publications', 'Publications'], ['profile', 'Profile, About, Skills'], ['badges', 'Badges'], ['publish', 'Update website']]
        .map(([k, l]) => h('button', { class: S.tab === k ? 'on' : '', onclick: () => { S.tab = k; say(null); render(); } }, l))),
      h('main', null, S.msg && h('div', { class: 'msg ' + (S.msg.kind || '') }, S.msg.text), S.docs.activities ? view() : h('p', null, 'Loading…')));
    updatePending();
  }

  function view() {
    if (S.tab === 'add') return addView();
    if (S.tab === 'activities') return treeView('activities', 'Certificates & activities', 'Open any entry to edit it. Use the arrows to reorder, the copy button to duplicate and the bin to delete.');
    if (S.tab === 'publications') return treeView('publications', 'Publications', 'Research articles, reviews, books, chapters, conference papers, reviewer roles and patents.');
    if (S.tab === 'profile') return treeView('profile', 'Profile, About, Research interests, Education, Skills, Social links', 'The text under About me is "bio" (one box per paragraph).');
    if (S.tab === 'badges') return badgesView();
    return publishView();
  }

  // ─── lock / login ──────────────────────────────────────
  function lockScreen() {
    const first = !hasVault();
    const err = h('div');
    const pw = h('input', { type: 'password', autocomplete: first ? 'new-password' : 'current-password', placeholder: first ? 'Choose an admin password' : 'Admin password' });
    const pw2 = h('input', { type: 'password', autocomplete: 'new-password', placeholder: 'Repeat the password' });
    const tok = h('input', { type: 'password', autocomplete: 'off', placeholder: 'github_pat_…' });
    const fail = t => { err.innerHTML = ''; err.append(h('div', { class: 'msg err' }, t)); };
    async function go() {
      err.innerHTML = '';
      try {
        let token;
        if (first) {
          if (pw.value.length < 8) return fail('Use a password of at least 8 characters.');
          if (pw.value !== pw2.value) return fail('The two passwords differ.');
          token = tok.value.trim();
          if (!token) return fail('Paste your GitHub token.');
          S.token = token;
          const repo = await gh('');
          if (repo.permissions && repo.permissions.push === false) { S.token = null; return fail('This token can read the repository but not write to it. Give it "Contents: Read and write".'); }
          await seal(token, pw.value);
        } else {
          try { token = await unseal(pw.value); } catch (e) { return fail('Wrong password.'); }
          S.token = token;
        }
        say('Loading your site files…'); render();
        if (!S.docs.activities) await loadAll();
        say(null); resetLock(); render();
      } catch (e) {
        S.token = null; say(null); render();
        const m = e.status === 401 ? 'GitHub rejected this token (expired or wrong).' : e.status === 404 ? 'GitHub cannot see the repository with this token (check the repository access).' : e.message;
        const box = $app.querySelector('.lock .card'); if (box) box.append(h('div', { class: 'msg err' }, m));
      }
    }
    const box = h('div', { class: 'lock' }, h('div', { class: 'card' },
      h('h2', null, first ? 'Set up admin login' : 'Admin login'),
      first ? h('p', { class: 'hint' }, 'One-time setup: paste a GitHub fine-grained token that only has access to ' + CFG.repo + ' (Contents: Read and write). It is stored in this browser, encrypted with the password you choose now. Next time you only type the password.') : h('p', { class: 'hint' }, 'Enter your admin password to unlock.'),
      first ? [h('label', null, 'GitHub token'), tok] : null,
      h('label', null, 'Password'), pw, first ? [h('label', null, 'Repeat password'), pw2] : null,
      h('div', { class: 'toolbar' }, h('button', { class: 'primary', onclick: go }, first ? 'Save & log in' : 'Unlock'),
        !first && h('button', { class: 'small danger', onclick: () => { if (confirm('Forget the saved token on this browser? You will need to paste it again.')) { localStorage.removeItem(VAULT); render(); } } }, 'Forget token')),
      err));
    box.addEventListener('keydown', e => { if (e.key === 'Enter') go(); });
    return box;
  }

  // ─── generic tree editor ───────────────────────────────
  function summaryOf(o) {
    if (o && typeof o === 'object') for (const k of ['title', 'label', 'name', 'degree']) if (typeof o[k] === 'string' && o[k]) return o[k];
    return '(new item)';
  }
  function blank(o) {
    if (typeof o === 'string') return '';
    if (typeof o === 'number') return 0;
    if (Array.isArray(o)) return [];
    if (o && typeof o === 'object') { const r = {}; for (const k in o) if (k !== 'medal') r[k] = blank(o[k]); return r; }
    return '';
  }
  function certsIn(o, out = []) {
    if (o && typeof o === 'object') for (const k in o) {
      if (k === 'certificatePath') [].concat(o[k]).forEach(p => p && out.push(p)); else certsIn(o[k], out);
    }
    return out;
  }
  function askDeleteFiles(item) {
    const files = certsIn(item).filter(p => S.tree.has(p));
    if (files.length && confirm('This entry has ' + files.length + ' certificate file(s) on GitHub:\n\n' + files.join('\n') + '\n\nAlso delete these files from GitHub when you click Update?\n(OK = delete the files too, Cancel = keep the files)')) files.forEach(f => S.deletes.add(f));
  }
  const pretty = k => String(k).replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, c => c.toUpperCase());
  const labelled = (l, el) => h('div', null, h('label', null, l), el);

  function treeView(key, title, hint) {
    const d = S.docs[key];
    const wrap = h('div', null, h('div', { class: 'card' }, h('h2', null, title), h('p', { class: 'hint' }, hint)));
    for (const k of Object.keys(d.obj)) wrap.append(section(d.obj, k, [key, k]));
    return wrap;
  }
  function section(parent, k, path) {
    const v = parent[k];
    const det = h('details', { class: 'sect' }, h('summary', null, pretty(k) + (Array.isArray(v) ? ' (' + v.length + ')' : '')));
    det.append(field(parent, k, path, true));
    return det;
  }

  // renders the editor for parent[k]
  function field(parent, k, path, top) {
    const v = parent[k];
    if (k === 'certificatePath') return certWidget(parent, k, path);
    if (k === 'medal') {
      const s = h('select', { onchange: () => { parent[k] = s.value; touch(); } }, ...['', 'gold', 'silver', 'bronze'].map(o => h('option', { value: o, selected: v === o }, o || '(none)')));
      return labelled('Medal', s);
    }
    if (typeof v === 'string') {
      const long = LONG.has(k) || v.length > 90 || v.includes('\n');
      const i = h(long ? 'textarea' : 'input', { type: 'text', oninput: () => { parent[k] = i.value; touch(); } });
      i.value = v;
      return top ? i : labelled(pretty(k), i);
    }
    if (typeof v === 'number') {
      const i = h('input', { type: 'number', step: 'any', oninput: () => { parent[k] = i.value === '' ? 0 : Number(i.value); touch(); } });
      i.value = v; return labelled(pretty(k), i);
    }
    if (typeof v === 'boolean') {
      const i = h('input', { type: 'checkbox', style: 'width:auto', onchange: () => { parent[k] = i.checked; touch(); } });
      i.checked = v; return labelled(pretty(k), i);
    }
    if (Array.isArray(v)) return arrayEditor(v, path, k);
    if (v && typeof v === 'object') {
      const box = h('div');
      for (const kk of Object.keys(v)) box.append(top ? section(v, kk, path.concat(kk)) : h('div', { class: 'sub' }, h('strong', null, pretty(kk)), field(v, kk, path.concat(kk))));
      if (k === 'webCourses') box.append(h('button', { class: 'small', onclick: () => { const n = prompt('Name of the new provider group'); if (n && !v[n]) { v[n] = []; touch(); refresh(); } } }, '+ New provider group'));
      return box;
    }
    return h('em', null, String(v));
  }

  function arrayEditor(arr, path, k) {
    const box = h('div');
    const strings = arr.every(x => typeof x === 'string') && (arr.length || ['tags', 'bio', 'skills'].includes(k));
    if (strings) {
      arr.forEach((s, idx) => {
        const long = LONG.has(k) || s.length > 90;
        const i = h(long ? 'textarea' : 'input', { type: 'text', oninput: () => { arr[idx] = i.value; touch(); } }); i.value = s;
        box.append(h('div', { class: 'strrow' }, i, h('button', { class: 'small danger', title: 'Delete', onclick: () => { arr.splice(idx, 1); touch(); refresh(); } }, '✕')));
      });
      box.append(h('button', { class: 'small', onclick: () => { arr.push(''); touch(); refresh(); } }, '+ Add'));
      return box;
    }
    const isActivity = path[0] === 'activities';
    arr.forEach((item, idx) => box.append(itemCard(arr, idx, path)));
    box.append(h('button', { class: 'small primary', onclick: () => { arr.unshift(arr.length ? blank(arr[0]) : (isActivity ? { title: '', year: '' } : {})); touch(); refresh(); } }, '+ Add new item at the top'));
    return box;
  }

  function itemCard(arr, idx, path) {
    const item = arr[idx];
    const move = d => () => { const j = idx + d; if (j < 0 || j >= arr.length) return; [arr[idx], arr[j]] = [arr[j], arr[idx]]; touch(); refresh(); };
    const btn = (t, ti, fn, cls) => h('button', { class: 'small' + (cls ? ' ' + cls : ''), title: ti, onclick: e => { e.preventDefault(); e.stopPropagation(); fn(); } }, t);
    const sum = h('summary', null, h('span', { class: 't' }, summaryOf(item)), item && item.year ? h('span', { class: 'y' }, item.year) : null,
      item && item.medal ? h('span', { class: 'chip' }, item.medal) : null,
      btn('↑', 'Move up', move(-1)), btn('↓', 'Move down', move(1)),
      btn('⧉', 'Duplicate', () => { arr.splice(idx + 1, 0, clone(item)); touch(); refresh(); }),
      btn('🗑', 'Delete', () => { if (!confirm('Delete "' + summaryOf(item) + '"?')) return; askDeleteFiles(item); arr.splice(idx, 1); touch(); refresh(); }, 'danger'));
    const body = h('div', { class: 'body' });
    if (item && typeof item === 'object' && !Array.isArray(item)) {
      for (const kk of Object.keys(item)) body.append(field(item, kk, path, false));
      const opt = ['certificatePath', 'url', 'medal'].filter(x => !(x in item));
      if (opt.length && 'title' in item && path[0] === 'activities') {
        const sel = h('select', { style: 'width:auto' }, h('option', { value: '' }, '+ add field…'), ...opt.map(o => h('option', { value: o }, pretty(o))));
        sel.addEventListener('change', () => { if (sel.value) { item[sel.value] = sel.value === 'certificatePath' ? [] : ''; touch(); refresh(); } });
        body.append(h('div', { class: 'toolbar' }, sel));
      }
    }
    const det = h('details', { class: 'item' }, sum, body);
    if (summaryOf(item) === '(new item)') det.open = true;
    return det;
  }

  // ─── certificate files ─────────────────────────────────
  function folderFor(path) {
    const key = path[1] || '', s = SECTIONS.find(x => x[0] === key);
    let f = 'certifications/' + (s ? s[2] : 'Others');
    if (key === 'webCourses') { const p = String(path[2] || ''); if (/esri/i.test(p)) f += '/ESRI'; else if (/mooc/i.test(p)) f += '/MOOC'; }
    if (path[0] === 'publications') f = 'certifications/' + ({ patents: 'Patent', reviewerRoles: 'Reviewer certificate' }[key] || 'Others');
    return f;
  }
  const safeName = n => n.replace(/[\\/:*?"<>|#%]/g, '-').replace(/\s+/g, ' ').trim();
  function uniquePath(folder, name) {
    const dot = name.lastIndexOf('.'), base = dot > 0 ? name.slice(0, dot) : name, ext = dot > 0 ? name.slice(dot) : '';
    let p = folder + '/' + name, n = 2;
    const taken = q => S.tree.has(q) || S.uploads.some(u => u.path === q);
    while (taken(p)) p = folder + '/' + base + '_' + (n++) + ext; // never overwrites an existing file
    return p;
  }
  const readB64 = file => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result).split(',')[1]); r.onerror = rej; r.readAsDataURL(file); });
  async function stageFile(file, folder) {
    const p = uniquePath(folder, safeName(file.name));
    S.uploads.push({ path: p, b64: await readB64(file), name: file.name, size: file.size, url: URL.createObjectURL(file) });
    return p;
  }
  function certWidget(parent, k, path) {
    const box = h('div');
    box.append(h('label', null, 'Certificate file(s) — images or PDF'));
    const list = [].concat(parent[k] || []).filter(Boolean);
    const set = arr => { parent[k] = arr.length === 1 ? arr[0] : arr; touch(); };
    list.forEach((p, i) => {
      const inp = h('input', { type: 'text', oninput: () => { const a = [].concat(parent[k]); a[i] = inp.value; set(a); } }); inp.value = p;
      box.append(h('div', { class: 'strrow' }, inp, S.uploads.some(u => u.path === p) ? h('span', { class: 'chip' }, 'new') : null,
        h('button', { class: 'small danger', title: 'Remove from this entry (the file stays on GitHub)', onclick: () => { const a = [].concat(parent[k]); a.splice(i, 1); set(a); refresh(); } }, '✕')));
    });
    const pick = h('input', { type: 'file', multiple: true, accept: 'image/*,application/pdf', style: 'display:none' });
    pick.addEventListener('change', async () => {
      const a = [].concat(parent[k] || []).filter(Boolean);
      for (const f of pick.files) a.push(await stageFile(f, folderFor(path)));
      set(a); refresh();
    });
    box.append(pick, h('button', { class: 'small', onclick: () => pick.click() }, '+ Upload certificate file(s)'));
    return box;
  }

  // ─── add certificate wizard ────────────────────────────
  function addView() {
    const A = S.docs.activities.obj;
    const sec = h('select', null, ...SECTIONS.map(([k, l]) => h('option', { value: k }, l)));
    const prov = h('input', { type: 'text', list: 'provs', placeholder: 'Provider group, e.g. ESRI' });
    const provWrap = h('div', null, h('label', null, 'Provider group (pick or type a new one)'), prov, h('datalist', { id: 'provs' }, ...Object.keys(A.webCourses || {}).map(p => h('option', { value: p }))));
    const title = h('textarea', { placeholder: 'Full title, with the organiser in brackets' });
    const year = h('input', { type: 'text', value: String(new Date().getFullYear()) });
    const medal = h('select', null, ...[['', '(none)'], ['gold', 'Gold – first'], ['silver', 'Silver – second'], ['bronze', 'Bronze – third']].map(([v, l]) => h('option', { value: v }, l)));
    const link = h('input', { type: 'url', placeholder: 'https://… (optional, makes the title a link)' });
    const folder = h('input', { type: 'text' });
    const files = [], fileList = h('div', { class: 'hint' });
    const pick = h('input', { type: 'file', multiple: true, accept: 'image/*,application/pdf', style: 'display:none' });
    const dz = h('div', { class: 'dz' }, 'Click or drop the certificate here (JPG / PNG / PDF). Several files = one entry, shown one after the other.');
    function folderGuess() {
      folder.value = folderFor(['activities', sec.value, prov.value.trim()]);
      provWrap.style.display = sec.value === 'webCourses' ? '' : 'none';
    }
    sec.onchange = folderGuess; prov.oninput = folderGuess; folderGuess();
    const addFiles = fl => { for (const f of fl) files.push(f); fileList.textContent = files.map(f => f.name + ' (' + Math.round(f.size / 1024) + ' KB)').join(', '); };
    pick.onchange = () => addFiles(pick.files);
    dz.onclick = () => pick.click();
    dz.ondragover = e => { e.preventDefault(); dz.classList.add('over'); };
    dz.ondragleave = () => dz.classList.remove('over');
    dz.ondrop = e => { e.preventDefault(); dz.classList.remove('over'); addFiles(e.dataTransfer.files); };
    const go = h('button', { class: 'primary', onclick: async () => {
      const t = title.value.trim();
      if (!t) return alert('Please type the title.');
      if (sec.value === 'webCourses' && !prov.value.trim()) return alert('Please give the provider group.');
      const paths = [];
      for (const f of files) paths.push(await stageFile(f, folder.value.replace(/\/+$/, '')));
      const entry = { title: t, year: year.value.trim() };
      if (medal.value) entry.medal = medal.value;
      if (link.value.trim()) entry.url = link.value.trim();
      if (paths.length) entry.certificatePath = paths.length === 1 ? paths[0] : paths;
      let target;
      if (sec.value === 'webCourses') { const p = prov.value.trim(); A.webCourses[p] = A.webCourses[p] || []; target = A.webCourses[p]; }
      else target = A[sec.value] = A[sec.value] || [];
      target.unshift(entry);
      say('Staged: "' + t + '". It is not on the website yet — add more, or go to "Update website".', 'ok'); render();
    } }, 'Add to my site (staged)');
    return h('div', null, h('div', { class: 'card' }, h('h2', null, 'Add a certificate'),
      h('p', { class: 'hint' }, 'Fill this in and press the button. Nothing goes live until you click "Update website", so you can stage several entries first.'),
      h('div', { class: 'row' }, h('div', null, h('label', null, 'Section'), sec), provWrap),
      h('label', null, 'Title'), title,
      h('div', { class: 'row' }, h('div', null, h('label', null, 'Year'), year), h('div', null, h('label', null, 'Medal (for prizes)'), medal)),
      h('label', null, 'Link (optional)'), link,
      h('label', null, 'Certificate file(s)'), dz, pick, fileList,
      h('label', null, 'Save the file in this folder of the repository'), folder,
      h('div', { class: 'toolbar' }, go)));
  }

  // ─── badges ────────────────────────────────────────────
  function badgesView() {
    const dir = 'certifications/badges/';
    const existing = [...S.tree].filter(p => p.startsWith(dir) && /\.(png|jpe?g|webp|svg|gif)$/i.test(p)).sort();
    const grid = h('div', { class: 'files' });
    existing.forEach(p => grid.append(h('div', { class: 'f' + (S.deletes.has(p) ? ' gone' : '') },
      h('img', { src: p, alt: '' }), h('div', null, p.slice(dir.length)),
      S.deletes.has(p) ? h('button', { class: 'small', onclick: () => { S.deletes.delete(p); touch(); refresh(); } }, 'Undo')
        : h('button', { class: 'small danger', onclick: () => { if (confirm('Remove this badge from your site when you click Update?')) { S.deletes.add(p); touch(); refresh(); } } }, 'Remove'))));
    S.uploads.filter(u => u.path.startsWith(dir)).forEach(u => grid.append(h('div', { class: 'f' }, h('img', { src: u.url, alt: '' }), h('div', null, u.path.slice(dir.length)), h('span', { class: 'chip' }, 'new'),
      h('button', { class: 'small', onclick: () => { S.uploads = S.uploads.filter(x => x !== u); touch(); refresh(); } }, 'Cancel'))));
    const pick = h('input', { type: 'file', multiple: true, accept: 'image/*', style: 'display:none' });
    pick.onchange = async () => { for (const f of pick.files) await stageFile(f, 'certifications/badges'); touch(); refresh(); };
    return h('div', { class: 'card' }, h('h2', null, 'Badges'),
      h('p', { class: 'hint' }, 'These images scroll under your social icons. Your GitHub achievements are added automatically every day and are not listed here. After you click "Update website" the badge list rebuilds itself within about a minute.'),
      grid, pick, h('div', { class: 'toolbar' }, h('button', { class: 'primary', onclick: () => pick.click() }, '+ Upload badge image(s)')));
  }

  // ─── publish ───────────────────────────────────────────
  const countItems = v => Array.isArray(v) ? v.length : v && typeof v === 'object' ? Object.values(v).reduce((n, x) => n + countItems(x), 0) : 1;
  function changedKeys(key) {
    const d = S.docs[key], a = JSON.parse(d.orig), b = d.obj, out = [];
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
      if (JSON.stringify(a[k]) === JSON.stringify(b[k])) continue;
      const la = countItems(a[k]), lb = countItems(b[k]);
      out.push(pretty(k) + (la !== lb ? ' (' + (lb > la ? '+' : '') + (lb - la) + ' item(s))' : ' (edited)'));
    }
    return out;
  }
  function publishView() {
    const rows = [];
    dirtyKeys().forEach(k => rows.push(h('li', null, h('strong', null, DOCS[k].path), ': ', changedKeys(k).join(', '))));
    S.uploads.forEach(u => rows.push(h('li', null, 'Upload ', h('code', null, u.path), ' (' + Math.round(u.size / 1024) + ' KB)')));
    [...S.deletes].forEach(p => rows.push(h('li', { style: 'color:var(--danger)' }, 'Delete file ', h('code', null, p))));
    const msg = h('input', { type: 'text', value: 'Update site content from admin dashboard' });
    const btn = h('button', { class: 'primary', disabled: !rows.length || S.busy, onclick: async () => {
      if (S.deletes.size && !confirm('This will delete ' + S.deletes.size + ' file(s) from the site (GitHub history keeps them). Continue?')) return;
      S.busy = true; say('Sending to GitHub…'); render();
      try {
        const sha = await publish(msg.value.trim() || 'Update site content');
        await loadAll(); S.busy = false;
        say('Done — committed ' + sha.slice(0, 7) + '. The live site updates in about a minute (press Ctrl+F5 to see it).', 'ok'); render();
      } catch (e) { S.busy = false; say('Could not update: ' + e.message + ' — nothing was lost, your changes are still here.', 'err'); render(); }
    } }, 'Update website now');
    return h('div', { class: 'card' }, h('h2', null, 'Update website'),
      rows.length ? [h('p', null, 'This will be saved to GitHub as ONE commit:'), h('ul', { class: 'sum' }, ...rows)] : h('p', { class: 'hint' }, 'Nothing to update yet.'),
      h('label', null, 'Commit note'), msg,
      h('div', { class: 'toolbar' }, btn,
        rows.length ? h('button', { class: 'danger', onclick: async () => { if (!confirm('Discard ALL unsaved changes?')) return; S.busy = true; await loadAll(); S.busy = false; say('Discarded.', 'ok'); render(); } }, 'Discard all changes') : null));
  }

  window.__admin = { S, parseDoc, serializeDoc, DOCS };
  render();
})();
