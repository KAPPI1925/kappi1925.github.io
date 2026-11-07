/* Badge marquee under the social icons (About section).
   Reads data/badges.json (built by scripts/update_badges.py from your
   GitHub achievements + the files in certifications/badges/). */
(function () {
  'use strict';
  const BASES = ['https://raw.githubusercontent.com/KAPPI1925/kappi1925.github.io/main/', ''];
  const SPEED = 28; // pixels per second - low = slow

  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

  async function load() {
    for (const b of BASES) {
      try {
        const r = await fetch(b + 'data/badges.json', { cache: 'no-cache' });
        if (r.ok) return await r.json();
      } catch (e) { /* try next */ }
    }
    return null;
  }

  function item(b, local) {
    const img = `<img src="${local ? encodeURI(b.image) : esc(b.image)}" alt="${esc(b.name)}" draggable="false">`;
    const inner = `${img}<span>${esc(b.name)}</span>`;
    return b.url
      ? `<a class="badge-item" href="${esc(b.url)}" target="_blank" rel="noopener noreferrer" title="${esc(b.name)}">${inner}</a>`
      : `<div class="badge-item" title="${esc(b.name)}">${inner}</div>`;
  }

  function build(host, data) {
    const list = [].concat(
      (data.github || []).map(b => item(b, false)),
      (data.local || []).map(b => item(b, true)));
    if (!list.length) { host.innerHTML = ''; host.hidden = true; return; }
    host.hidden = false;
    host.innerHTML = '<div class="badge-track"></div>';
    const track = host.firstChild;
    const set = list.join('');
    track.innerHTML = set;
    // every badge once; only animate when the badges fill the whole row
    if (track.scrollWidth <= host.clientWidth) {
      host.classList.add('static');
      return;
    }
    host.classList.remove('static');
    track.innerHTML = set + set; // second copy only for a seamless loop
    const w = track.scrollWidth / 2;
    track.style.setProperty('--badge-shift', '-' + w + 'px');
    track.style.setProperty('--badge-time', Math.max(20, w / SPEED) + 's');
    track.querySelectorAll('.badge-item').forEach((el, i, all) => {
      if (i >= all.length / 2) { el.setAttribute('aria-hidden', 'true'); el.tabIndex = -1; }
    });
  }

  let current = null, timer = null;
  async function init() {
    const host = document.getElementById('badge-marquee');
    if (!host) return;
    current = current || await load();
    if (current) build(host, current);
  }

  // The About section is drawn by app.js, so wait for it
  function wait() {
    if (document.getElementById('badge-marquee')) return init();
    const mo = new MutationObserver(() => {
      if (document.getElementById('badge-marquee')) { mo.disconnect(); init(); }
    });
    mo.observe(document.body, { childList: true, subtree: true });
  }
  window.addEventListener('resize', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const host = document.getElementById('badge-marquee');
      if (host && current) build(host, current);
    }, 300);
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wait); else wait();
})();
