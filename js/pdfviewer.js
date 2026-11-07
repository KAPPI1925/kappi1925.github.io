/* ============================================================
   PDF VIEWER (used by the certificate lightbox in app.js)
   Draws PDF pages with PDF.js so they look the same on every
   device (phones often cannot show a PDF inside a page).
   PDF.js is loaded from cdnjs only when a PDF is first opened.
   Pages are drawn lazily while scrolling, so large PDFs are fine.

   PdfViewer.mount(wrapperElement, url) -> destroy()
   ============================================================ */

(function () {
  'use strict';

  const BASE = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
  // Integrity hashes (SHA-384) of the exact files: the browser refuses them if they ever change.
  const LIB_SRI = 'sha384-/1qUCSGwTur9vjf/z9lmu/eCUYbpOTgSjmpbMQZ1/CtX2v/WcAIKqRv+U1DUCG6e';
  const WORKER_SRI = 'sha384-SnzOobpRMLXZ52iJvZm/C0fYw0OQemTXzTjIsdsfMcrCtCEe9qgzxTd3RSklO5x2';
  let libPromise = null;

  function loadLib() {
    if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
    if (!libPromise) {
      libPromise = new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = BASE + 'pdf.min.js';
        s.integrity = LIB_SRI;
        s.crossOrigin = 'anonymous';
        s.referrerPolicy = 'no-referrer';
        s.onload = async () => {
          try {
            // Workers cannot carry an integrity attribute, so fetch the worker with one
            // and start it from a local blob.
            const r = await fetch(BASE + 'pdf.worker.min.js', { integrity: WORKER_SRI, mode: 'cors', credentials: 'omit' });
            if (!r.ok) throw new Error('worker');
            const blob = await r.blob();
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = URL.createObjectURL(new Blob([blob], { type: 'text/javascript' }));
            resolve(window.pdfjsLib);
          } catch (e) { libPromise = null; reject(new Error('PDF.js worker failed its integrity check')); }
        };
        s.onerror = () => { libPromise = null; reject(new Error('PDF.js could not be loaded (or failed its integrity check)')); };
        document.head.appendChild(s);
      });
    }
    return libPromise;
  }

  const attr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '%27');

  function mount(wrapper, url) {
    let destroyed = false;
    let doc = null;
    let observer = null;
    let pages = [];
    let ratio = 1.414;
    let zoom = 1;
    const safe = attr(url);

    wrapper.classList.add('pdf-mode');
    wrapper.innerHTML = `
      <div class="pdf-toolbar">
        <span class="pdf-page-info">Opening PDF…</span>
        <span class="pdf-tools">
          <button type="button" data-pdf="out" aria-label="Zoom out"><i class="fas fa-search-minus"></i></button>
          <span class="pdf-zoom">100%</span>
          <button type="button" data-pdf="in" aria-label="Zoom in"><i class="fas fa-search-plus"></i></button>
          <a href="${safe}" target="_blank" rel="noopener noreferrer" aria-label="Open in a new tab" title="Open in a new tab"><i class="fas fa-external-link-alt"></i></a>
          <a href="${safe}" download aria-label="Download PDF" title="Download PDF"><i class="fas fa-download"></i></a>
        </span>
      </div>
      <div class="pdf-scroll"><div class="pdf-status"><i class="fas fa-spinner fa-spin"></i> Opening PDF…</div></div>`;

    const scroll = wrapper.querySelector('.pdf-scroll');
    const info = wrapper.querySelector('.pdf-page-info');
    const zoomLabel = wrapper.querySelector('.pdf-zoom');

    function fail() {
      if (destroyed) return;
      scroll.innerHTML = `<div class="pdf-status"><i class="fas fa-file-pdf"></i>
        <p>This PDF could not be shown here.</p>
        <p><a href="${safe}" target="_blank" rel="noopener noreferrer">Open it in a new tab</a> or
        <a href="${safe}" download>download it</a>.</p></div>`;
      info.textContent = 'PDF';
    }

    function updateInfo() {
      if (!pages.length) return;
      const mid = scroll.scrollTop + scroll.clientHeight / 3;
      let cur = 1;
      for (let i = 0; i < pages.length; i++) {
        if (pages[i].offsetTop <= mid) cur = i + 1; else break;
      }
      info.textContent = `Page ${cur} / ${pages.length}`;
    }

    function layout() {
      const keep = scroll.scrollHeight ? scroll.scrollTop / scroll.scrollHeight : 0;
      if (observer) observer.disconnect();
      scroll.innerHTML = '';
      pages = [];
      lastWidth = scroll.clientWidth;
      const width = Math.max(240, scroll.clientWidth - 24) * zoom;
      for (let i = 1; i <= doc.numPages; i++) {
        const d = document.createElement('div');
        d.className = 'pdf-page';
        d.dataset.page = i;
        d.style.width = width + 'px';
        d.style.height = Math.round(width * ratio) + 'px';
        scroll.appendChild(d);
        pages.push(d);
      }
      observer = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) draw(e.target); });
      }, { root: scroll, rootMargin: '700px 0px' });
      pages.forEach(p => observer.observe(p));
      scroll.scrollTop = keep * scroll.scrollHeight;
      zoomLabel.textContent = Math.round(zoom * 100) + '%';
      updateInfo();
    }

    async function draw(div) {
      if (div.dataset.done || div.dataset.busy) return;
      div.dataset.busy = '1';
      try {
        const page = await doc.getPage(Number(div.dataset.page));
        if (destroyed) return;
        const width = parseFloat(div.style.width);
        const base = page.getViewport({ scale: 1 });
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const vp = page.getViewport({ scale: (width / base.width) * dpr });
        const canvas = document.createElement('canvas');
        canvas.width = Math.floor(vp.width);
        canvas.height = Math.floor(vp.height);
        canvas.style.width = width + 'px';
        canvas.style.height = (vp.height / dpr) + 'px';
        div.style.height = (vp.height / dpr) + 'px';
        await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp }).promise;
        if (destroyed) return;
        div.appendChild(canvas);
        div.dataset.done = '1';
      } catch (e) {
        if (!destroyed) delete div.dataset.busy;
      }
    }

    function setZoom(z) {
      zoom = Math.min(3, Math.max(0.5, z));
      if (doc) layout();
    }

    wrapper.addEventListener('click', onClick);
    function onClick(e) {
      const b = e.target.closest('[data-pdf]');
      if (!b) return;
      setZoom(zoom + (b.dataset.pdf === 'in' ? 0.25 : -0.25));
    }
    // re-fit the pages when the window (or phone orientation) changes
    let lastWidth = 0, resizeTimer = null;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (destroyed || !doc || Math.abs(scroll.clientWidth - lastWidth) < 8) return;
        layout();
      }, 200);
    }
    window.addEventListener('resize', onResize);
    let ticking = false;
    scroll.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; updateInfo(); });
    });

    loadLib()
      .then(lib => lib.getDocument({ url }).promise)
      .then(pdf => {
        if (destroyed) { pdf.destroy(); return null; }
        doc = pdf;
        return pdf.getPage(1);
      })
      .then(p1 => {
        if (!p1 || destroyed) return;
        const v = p1.getViewport({ scale: 1 });
        ratio = v.height / v.width;
        layout();
      })
      .catch(fail);

    return function destroy() {
      destroyed = true;
      wrapper.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
      if (observer) observer.disconnect();
      if (doc) { try { doc.destroy(); } catch (e) { /* ignore */ } }
      wrapper.classList.remove('pdf-mode');
    };
  }

  window.PdfViewer = { mount };
})();
