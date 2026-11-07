/* ============================================================
   RS/GIS PORTFOLIO — MAIN APPLICATION
   Navigation, Theme, Typing Effect, Scroll Animations,
   Publications, Activities, Certificate Lightbox, Counters
   ============================================================ */

(function () {
  'use strict';

  // ─── State ──────────────────────────────────────────────
  let currentTheme = localStorage.getItem('theme') || 'dark';
  let typingInterval = null;
  let lightboxState = { images: [], currentIndex: 0, title: '' };

  // ─── DOM Ready ──────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme);
    initNavbar();
    initHeroAnimations();
    initTypingEffect();
    initScrollProgress();
    initScrollToTop();
    initSectionObserver();
    initTimelineObserver();
    initSkillBarsObserver();
    initCounterAnimations();
    renderAbout();
    renderResearchInterests();
    renderPublications();
    renderEducation();
    renderSkills();
    renderActivities();
    renderAwards();
    renderContact();
    renderFooter();
    initLightboxKeyboard();
    triggerPageLoad();
  });

  // ─── Theme Management ───────────────────────────────────
  function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.innerHTML = theme === 'dark'
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    }
  }

  window.toggleTheme = function () {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  // ─── Navbar ─────────────────────────────────────────────
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobilePanel = document.getElementById('mobile-nav-panel');
    const mobileOverlay = document.getElementById('mobile-nav-overlay');
    const navSections = ['about', 'research', 'publications', 'education', 'skills', 'activities', 'awards', 'contact'];

    // Show navbar with animation
    setTimeout(() => navbar.classList.add('visible'), 200);

    // Scroll behavior
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      lastScroll = scrollY;
    });

    // Hamburger toggle
    function toggleMobile() {
      hamburger.classList.toggle('active');
      mobilePanel.classList.toggle('active');
      mobileOverlay.classList.toggle('active');
      document.body.style.overflow = mobilePanel.classList.contains('active') ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMobile);
    mobileOverlay.addEventListener('click', toggleMobile);

    // Populate mobile nav
    navSections.forEach(id => {
      const a = document.createElement('a');
      a.href = `#${id}`;
      a.textContent = capitalize(id);
      a.dataset.section = id;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScroll(id);
        if (mobilePanel.classList.contains('active')) toggleMobile();
      });
      mobilePanel.appendChild(a);
    });
  }

  // ─── Smooth Scroll ──────────────────────────────────────
  function smoothScroll(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  // ─── Active Section Highlighting ────────────────────────
  function initSectionObserver() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[data-section]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === id);
          });
          // Mobile nav
          const mobileLinks = document.querySelectorAll('.mobile-nav-panel a[data-section]');
          mobileLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    });

    sections.forEach(s => observer.observe(s));
  }

  // ─── Scroll Progress Bar ────────────────────────────────
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      bar.style.width = progress + '%';
    });
  }

  // ─── Scroll to Top ──────────────────────────────────────
  function initScrollToTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── Hero Load Animations ───────────────────────────────
  function initHeroAnimations() {
    setTimeout(() => {
      const hero = document.getElementById('hero');
      if (hero) hero.classList.add('hero-loaded');
    }, 100);
  }

  // ─── Typing Effect ──────────────────────────────────────
  function initTypingEffect() {
    const phrases = [
      'Remote Sensing & GIS Specialist',
      'Precision Agriculture Researcher',
      'Deep Learning for Geospatial Applications',
      'Digital Soil Mapping Expert'
    ];
    const el = document.getElementById('typing-text');
    if (!el) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 50;
    const deleteSpeed = 30;
    const pauseTime = 2000;

    function type() {
      const current = phrases[phraseIndex];
      if (isDeleting) {
        charIndex--;
        el.textContent = current.substring(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          typingInterval = setTimeout(type, 300);
          return;
        }
        typingInterval = setTimeout(type, deleteSpeed);
      } else {
        charIndex++;
        el.textContent = current.substring(0, charIndex);
        if (charIndex === current.length) {
          isDeleting = true;
          typingInterval = setTimeout(type, pauseTime);
          return;
        }
        typingInterval = setTimeout(type, typeSpeed);
      }
    }

    typingInterval = setTimeout(type, 1500);
  }

  // ─── Counter Animations ─────────────────────────────────
  // Citation metrics are refreshed monthly by .github/workflows/update-metrics.yml.
  // Read straight from the repo (no Pages rebuild needed), then the local copy;
  // if both fail, the numbers written in index.html are shown.
  // The same applies to scholar_details.json and scholar_links.json; js/scholar.js uses them.
  const DATA_BASES = [
    'https://raw.githubusercontent.com/KAPPI1925/kappi1925.github.io/main/data/',
    'data/'
  ];

  async function fetchData(file) {
    for (const base of DATA_BASES) {
      try {
        const res = await fetch(base + file, { cache: 'no-cache' });
        if (res.ok) return await res.json();
      } catch (e) { /* try next source */ }
    }
    return null;
  }

  async function loadMetrics() {
    const [metrics, details, links] = await Promise.all(
      ['metrics.json', 'scholar_details.json', 'scholar_links.json'].map(fetchData));
    window.SCHOLAR = { metrics, details, links };
    document.dispatchEvent(new CustomEvent('scholar-data', { detail: window.SCHOLAR }));
    const m = metrics;
    if (!m) return;
    const set = (id, v) => {
      const el = document.getElementById(id);
      if (el && v !== null && v !== undefined && Number.isFinite(Number(v))) { el.dataset.target = Number(v); return true; }
      return false;
    };
    const since = (id, v) => {
      const el = document.getElementById(id);
      if (el && m.since_year && v !== null && v !== undefined) el.textContent = `${v} since ${m.since_year}`;
    };
    set('stat-citations', m.citations);
    set('stat-hindex', m.h_index);
    if (set('stat-i10', m.i10_index)) document.getElementById('stat-i10-item').hidden = false;
    since('stat-citations-since', m.citations_since);
    since('stat-hindex-since', m.h_index_since);
    since('stat-i10-since', m.i10_index_since);
    if (m.profile_url) {
      const btn = document.getElementById('scholar-profile-btn');
      if (btn) btn.href = m.profile_url;
    }
  }

  async function initCounterAnimations() {
    await Promise.race([loadMetrics(), new Promise(r => setTimeout(r, 2500))]);
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const isFloat = el.dataset.float === 'true';
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      if (isFloat) {
        el.textContent = current.toFixed(1) + suffix;
      } else {
        el.textContent = Math.floor(current) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ─── Scroll Animation Observer ──────────────────────────
  function initScrollAnimationObserver() {
    const elements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
  }

  // ─── Timeline Observer ──────────────────────────────────
  function initTimelineObserver() {
    const line = document.querySelector('.timeline-line');
    const items = document.querySelectorAll('.timeline-item');
    const dots = document.querySelectorAll('.timeline-dot');

    if (!line) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          line.classList.add('animate');
          items.forEach((item, i) => {
            setTimeout(() => {
              item.style.animationPlayState = 'running';
              item.style.opacity = '';
              item.classList.add('animate');
              if (dots[i]) dots[i].classList.add('pulse');
            }, i * 200);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    const timeline = document.querySelector('.timeline');
    if (timeline) observer.observe(timeline);
  }

  // ─── Skill Bars Observer ────────────────────────────────
  function initSkillBarsObserver() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetWidth = entry.target.dataset.width;
          entry.target.style.width = targetWidth + '%';
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(b => observer.observe(b));
  }

  // ─── Render About Section ───────────────────────────────
  function renderAbout() {
    const container = document.getElementById('about-content');
    if (!container || typeof PROFILE === 'undefined') return;

    container.innerHTML = `
      <div class="about-grid">
        <div class="about-image-wrapper scroll-animate-left">
          <div class="about-image-container">
            <div class="about-image-border"></div>
            <img src="${PROFILE.profileImage}" alt="${PROFILE.name}" class="about-image" 
                 onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22260%22 height=%22260%22><rect fill=%22%231e293b%22 width=%22260%22 height=%22260%22/><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%2394a3b8%22 font-size=%2248%22>👨‍🔬</text></svg>'">
          </div>
        </div>
        <div class="about-text scroll-animate-right">
          <h3>${PROFILE.name}</h3>
          <p class="subtitle">${PROFILE.title} | ${PROFILE.university.split(',')[0]}</p>
          ${PROFILE.bio.map(p => `<p>${p}</p>`).join('')}
          <div class="about-social">
            ${PROFILE.links.map(l => `
              <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="social-link" title="${l.label}" aria-label="${l.label}">
                <i class="fab ${l.icon}"></i>
              </a>
            `).join('')}
          </div>
          <div class="badge-marquee" id="badge-marquee" hidden aria-label="Badges"></div>
        </div>
      </div>
    `;
  }

  // ─── Render Research Interests ──────────────────────────
  function renderResearchInterests() {
    const container = document.getElementById('research-grid');
    if (!container || typeof PROFILE === 'undefined') return;

    container.innerHTML = PROFILE.researchInterests.map((item, i) => `
      <div class="research-card scroll-animate-scale stagger-${(i % 9) + 1}">
        <div class="research-card-icon"><i class="fas ${item.icon}"></i></div>
        <div class="research-card-label">${item.label}</div>
      </div>
    `).join('');

    // Re-observe scroll animations after render
    setTimeout(initScrollAnimationObserver, 100);
  }

  // ─── Render Publications ────────────────────────────────
  function renderPublications() {
    if (typeof PUBLICATIONS === 'undefined') return;

    const tabsContainer = document.getElementById('pub-tabs');
    const panelContainer = document.getElementById('pub-panels');

    const categories = [
      { key: 'researchArticles', label: 'Research Articles', icon: 'fa-file-alt' },
      { key: 'reviewArticles', label: 'Review Articles', icon: 'fa-book-open' },
      { key: 'popularArticles', label: 'Popular Articles', icon: 'fa-newspaper' },
      { key: 'bookChapters', label: 'Book Chapters', icon: 'fa-book' },
      { key: 'books', label: 'Books', icon: 'fa-bookmark' },
      { key: 'conferencePapers', label: 'Conference Papers', icon: 'fa-users' },
      { key: 'patents', label: 'Patents & Designs', icon: 'fa-lightbulb' },
      { key: 'reviewerRoles', label: 'Reviewer Roles', icon: 'fa-user-check' }
    ];

    tabsContainer.innerHTML = categories.map((cat, i) => {
      const count = PUBLICATIONS[cat.key] ? PUBLICATIONS[cat.key].length : 0;
      return `
        <button class="pub-tab ${i === 0 ? 'active' : ''}" data-pub-tab="${cat.key}">
          <i class="fas ${cat.icon}"></i> ${cat.label} <span class="pub-count">(${count})</span>
        </button>
      `;
    }).join('');

    panelContainer.innerHTML = categories.map((cat, i) => `
      <div class="pub-panel ${i === 0 ? 'active' : ''}" id="pub-panel-${cat.key}">
        ${renderPubCards(PUBLICATIONS[cat.key], cat.key)}
      </div>
    `).join('');

    // Tab switching
    tabsContainer.addEventListener('click', (e) => {
      const tab = e.target.closest('.pub-tab');
      if (!tab) return;
      const key = tab.dataset.pubTab;
      tabsContainer.querySelectorAll('.pub-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      panelContainer.querySelectorAll('.pub-panel').forEach(p => p.classList.remove('active'));
      const target = document.getElementById('pub-panel-' + key);
      if (target) target.classList.add('active');
    });

    // Abstract toggles & certificate buttons
    panelContainer.addEventListener('click', (e) => {
      const certBtn = e.target.closest('.pub-cert-btn');
      if (certBtn) {
        const images = JSON.parse(certBtn.dataset.images);
        if (images && images.length > 0 && images[0]) openLightbox(images, certBtn.dataset.title);
        return;
      }
      const toggle = e.target.closest('.pub-abstract-toggle');
      if (!toggle) return;
      const card = toggle.closest('.pub-card');
      const abstract = card.querySelector('.pub-abstract');
      abstract.classList.toggle('open');
      toggle.innerHTML = abstract.classList.contains('open')
        ? 'Hide Abstract <i class="fas fa-chevron-up"></i>'
        : 'Show Abstract <i class="fas fa-chevron-down"></i>';
    });
  }

  function renderPubCards(items, key) {
    if (!items || items.length === 0) {
      return '<div class="empty-state"><i class="fas fa-folder-open"></i><p>No items in this category yet.</p></div>';
    }
    return items.map((item, i) => {
      const venue = item.journal || item.publisher || item.conference || '';
      const certPaths = Array.isArray(item.certificatePath) ? item.certificatePath : (item.certificatePath ? [item.certificatePath] : []);
      const encodedCertPaths = certPaths.map(p => encodeURIComponent(p));
      return `
        <div class="pub-card" data-pub-key="${key}" data-pub-index="${i}" style="animation-delay: ${i * 0.1}s">
          <div class="pub-card-header">
            <h3>${item.title}</h3>
            <span class="pub-year">${item.year}</span>
          </div>
          <div class="pub-authors">${item.authors}</div>
          ${venue ? `<div class="pub-venue">${venue}</div>` : ''}
          ${item.isbn ? `<div class="pub-venue">ISBN: ${item.isbn}</div>` : ''}
          ${item.type ? `<div class="pub-venue"><i class="fas fa-microphone"></i> ${item.type}</div>` : ''}
          ${item.location ? `<div class="pub-venue"><i class="fas fa-map-marker-alt"></i> ${item.location}</div>` : ''}
          ${item.abstract ? `
            <button class="pub-abstract-toggle">Show Abstract <i class="fas fa-chevron-down"></i></button>
            <div class="pub-abstract"><p>${item.abstract}</p></div>
          ` : ''}
          ${item.tags && item.tags.length ? `
            <div class="pub-tags">${item.tags.map(t => `<span class="pub-tag">${t}</span>`).join('')}</div>
          ` : ''}
          <div class="pub-card-actions">
            ${item.url && item.url !== '#' ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer" class="pub-link"><i class="fas fa-external-link-alt"></i> View Publication</a>` : ''}
            ${item.doi ? `<a href="${item.doi}" target="_blank" rel="noopener noreferrer" class="pub-link"><i class="fas fa-doi"></i> DOI</a>` : ''}
            ${certPaths.length > 0 ? `<button type="button" class="pub-link pub-cert-btn" data-images='${JSON.stringify(encodedCertPaths)}' data-title="${escapeAttr(item.title)}"><i class="fas fa-certificate"></i> View Certificate</button>` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  // ─── Render Education Timeline ──────────────────────────
  function renderEducation() {
    const container = document.getElementById('education-timeline');
    if (!container || typeof PROFILE === 'undefined') return;

    container.innerHTML = `
      <div class="timeline">
        <div class="timeline-line"></div>
        ${PROFILE.education.map(edu => `
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-card">
              <h3>${edu.degree}</h3>
              <div class="timeline-degree">${edu.field}</div>
              <div class="timeline-institution">${edu.institution}</div>
              <div class="timeline-year"><i class="fas fa-calendar-alt"></i> ${edu.year}</div>
              ${edu.marks !== '—' ? `<span class="timeline-marks"><i class="fas fa-star"></i> ${edu.marks}</span>` : ''}
              <div class="timeline-details">${edu.details}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ─── Render Skills ──────────────────────────────────────
  function renderSkills() {
    const container = document.getElementById('skills-grid');
    if (!container || typeof PROFILE === 'undefined') return;

    container.innerHTML = PROFILE.skillCategories.map((cat, ci) => `
      <div class="skill-category scroll-animate stagger-${(ci % 9) + 1}">
        <div class="skill-category-header">
          <div class="skill-category-icon"><i class="fas ${cat.icon}"></i></div>
          <h3>${cat.name}</h3>
        </div>
        ${cat.skills.map(skill => `
          <div class="skill-item skill-box">
            <span class="skill-name">${skill.name}</span>
          </div>
        `).join('')}
      </div>
    `).join('');

    setTimeout(() => {
      initScrollAnimationObserver();
      initSkillBarsObserver();
    }, 100);
  }

  // ─── Render Activities/Certifications ───────────────────
  function renderActivities() {
    if (typeof ACTIVITIES === 'undefined') return;

    const tabsContainer = document.getElementById('activities-tabs');
    const panelContainer = document.getElementById('activities-panels');

    const categories = [
      { key: 'webCourses', label: 'Online Courses', icon: 'fa-laptop-code' },
      { key: 'courses', label: 'Academic Courses', icon: 'fa-graduation-cap' },
      { key: 'trainings', label: 'Trainings', icon: 'fa-chalkboard-teacher' },
      { key: 'workshops', label: 'Workshops', icon: 'fa-tools' },
      { key: 'conferences', label: 'Conferences', icon: 'fa-users' },
      { key: 'webinars', label: 'Webinars', icon: 'fa-video' },
      { key: 'invitedTalks', label: 'Invited Talks', icon: 'fa-microphone-alt' },
      { key: 'hackathons', label: 'Hackathons', icon: 'fa-code' },
      { key: 'competitions', label: 'Competitions', icon: 'fa-medal' },
      { key: 'quizzes', label: 'Quizzes', icon: 'fa-question-circle' },
      { key: 'others', label: 'Others', icon: 'fa-star' },
      { key: 'memberships', label: 'Memberships', icon: 'fa-id-badge' }
    ];

    tabsContainer.innerHTML = categories.map((cat, i) => `
      <button class="activities-tab ${i === 0 ? 'active' : ''}" data-act-tab="${cat.key}">
        <i class="fas ${cat.icon}"></i> ${cat.label}
      </button>
    `).join('');

    panelContainer.innerHTML = categories.map((cat, i) => `
      <div class="activities-panel ${i === 0 ? 'active' : ''}" id="act-panel-${cat.key}">
        ${renderActivityPanel(ACTIVITIES[cat.key], cat.key)}
      </div>
    `).join('');

    // Tab switching
    tabsContainer.addEventListener('click', (e) => {
      const tab = e.target.closest('.activities-tab');
      if (!tab) return;
      const key = tab.dataset.actTab;
      tabsContainer.querySelectorAll('.activities-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      panelContainer.querySelectorAll('.activities-panel').forEach(p => p.classList.remove('active'));
      const target = document.getElementById('act-panel-' + key);
      if (target) target.classList.add('active');
    });

    // Accordion toggles & certificate view buttons
    panelContainer.addEventListener('click', (e) => {
      // Accordion toggle
      const header = e.target.closest('.cert-item-header');
      if (header && !e.target.closest('.cert-view-btn') && !e.target.closest('.cert-sub-view-btn')) {
        const item = header.closest('.cert-item');
        item.classList.toggle('expanded');
        return;
      }
      // Certificate view buttons
      const viewBtn = e.target.closest('.cert-view-btn, .cert-sub-view-btn');
      if (viewBtn) {
        e.stopPropagation();
        const images = viewBtn.dataset.images ? JSON.parse(viewBtn.dataset.images) : [viewBtn.dataset.image];
        const title = viewBtn.dataset.title;
        if (images && images.length > 0 && images[0]) {
          openLightbox(images, title);
        }
      }
    });
  }

  function renderActivityPanel(data, key) {
    if (!data) return '<div class="empty-state"><i class="fas fa-folder-open"></i><p>No items in this category.</p></div>';

    // Web courses: grouped object
    if (key === 'webCourses') {
      const groups = Object.entries(data);
      if (groups.length === 0) return '<div class="empty-state"><i class="fas fa-folder-open"></i><p>No courses yet.</p></div>';

      return `<ul class="cert-list">${groups.map(([groupName, items]) => `
        <li class="cert-item">
          <div class="cert-item-header">
            <div class="cert-item-info">
              <div class="cert-item-title"><i class="fas fa-folder"></i> ${groupName} <span class="text-muted">(${items.length})</span></div>
            </div>
            <i class="fas fa-chevron-down cert-chevron"></i>
          </div>
          <div class="cert-item-body">
            <div class="cert-item-body-content">
              ${items.map(item => {
        const paths = Array.isArray(item.certificatePath) ? item.certificatePath : (item.certificatePath ? [item.certificatePath] : []);
        const encodedPaths = paths.map(p => encodeURIComponent(p));
        return `
                  <div class="cert-sub-item">
                    <span class="cert-sub-item-title">${item.title}</span>
                    <span class="cert-sub-item-year">${item.year}</span>
                    ${paths.length > 0 ? `<button class="cert-sub-view-btn" data-images='${JSON.stringify(encodedPaths)}' data-title="${escapeAttr(item.title)}"><i class="fas fa-certificate"></i> View</button>` : ''}
                  </div>
                `;
      }).join('')}
            </div>
          </div>
        </li>
      `).join('')}</ul>`;
    }

    // Memberships: simple list
    if (key === 'memberships') {
      if (!data.length) return '<div class="empty-state"><i class="fas fa-id-badge"></i><p>Membership details will be added soon.</p></div>';
      return `<ul class="cert-list">${data.map(item => `
        <li class="cert-item">
          <div class="cert-item-header" style="cursor:default">
            <div class="cert-item-info">
              <div class="cert-item-title"><i class="fas fa-id-badge"></i> ${item.title}</div>
              <div class="cert-item-year">${item.year}</div>
            </div>
          </div>
        </li>
      `).join('')}</ul>`;
    }

    // Array items
    const arr = Array.isArray(data) ? data : [];
    if (arr.length === 0) return '<div class="empty-state"><i class="fas fa-folder-open"></i><p>No items in this category.</p></div>';

    return `<ul class="cert-list">${arr.map(item => {
      const paths = Array.isArray(item.certificatePath) ? item.certificatePath : (item.certificatePath ? [item.certificatePath] : []);
      const encodedPaths = paths.map(p => encodeURIComponent(p));
      const medal = ['gold', 'silver', 'bronze'].includes(item.medal) ? item.medal : '';
      const medalLabel = { gold: 'First place', silver: 'Second place', bronze: 'Third place' }[medal] || '';
      return `
        <li class="cert-item">
          <div class="cert-item-header">
            <div class="cert-item-info">
              <div class="cert-item-title">${medal ? `<i class="fas fa-medal medal-icon medal-${medal}" title="${medalLabel}"></i> ` : ''}${item.title}</div>
              <div class="cert-item-year">${item.year}</div>
            </div>
            ${paths.length > 0 ? `
              <button class="cert-view-btn${medal ? ` medal-btn medal-${medal}` : ''}" data-images='${JSON.stringify(encodedPaths)}' data-title="${escapeAttr(item.title)}">
                <i class="fas fa-certificate"></i> View Certificate
              </button>
            ` : ''}
          </div>
        </li>
      `;
    }).join('')}</ul>`;
  }

  // ─── Render Awards ──────────────────────────────────────
  function renderAwards() {
    const container = document.getElementById('awards-grid');
    if (!container || typeof ACTIVITIES === 'undefined') return;

    const awards = ACTIVITIES.awards || [];
    if (awards.length === 0) {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-trophy"></i><p>No awards yet.</p></div>';
      return;
    }

    container.innerHTML = awards.map((award, i) => {
      const paths = Array.isArray(award.certificatePath) ? award.certificatePath : (award.certificatePath ? [award.certificatePath] : []);
      const encodedPaths = paths.map(p => encodeURIComponent(p));
      return `
        <div class="award-card scroll-animate stagger-${(i % 9) + 1}">
          <div class="award-icon"><i class="fas fa-trophy"></i></div>
          <h3>${award.title}</h3>
          <div class="award-year">${award.year}</div>
          ${paths.length > 0 ? `
            <button class="award-view-btn" data-images='${JSON.stringify(encodedPaths)}' data-title="${escapeAttr(award.title)}">
              <i class="fas fa-certificate"></i> View Certificate
            </button>
          ` : ''}
        </div>
      `;
    }).join('');

    // Award view buttons
    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.award-view-btn');
      if (btn) {
        const images = JSON.parse(btn.dataset.images);
        const title = btn.dataset.title;
        if (images && images.length > 0 && images[0]) {
          openLightbox(images, title);
        }
      }
    });

    setTimeout(initScrollAnimationObserver, 100);
  }

  // ─── Render Contact Section ─────────────────────────────
  function renderContact() {
    const container = document.getElementById('contact-content');
    if (!container || typeof PROFILE === 'undefined') return;

    const mainLinks = PROFILE.links.slice(0, 4);
    container.innerHTML = `
      <p>Feel free to reach out for research collaborations, consultations, or any questions about remote sensing, GIS, and geospatial technologies.</p>
      <div class="contact-links">
        ${mainLinks.map(l => `
          <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="contact-link" onclick="addRipple(event)">
            <i class="fab ${l.icon}"></i>
            <span>${l.label}</span>
          </a>
        `).join('')}
      </div>
      <div class="mt-3">
        <a href="mailto:${PROFILE.email}" class="contact-email" onclick="addRipple(event)">
          <i class="fas fa-envelope"></i>
          ${PROFILE.email}
        </a>
      </div>
    `;
  }

  // ─── Render Footer ──────────────────────────────────────
  function renderFooter() {
    const container = document.getElementById('footer-content');
    if (!container || typeof PROFILE === 'undefined') return;

    const socialLinks = PROFILE.links.filter(l =>
      ['fa-linkedin', 'fa-github', 'fa-youtube', 'fa-instagram', 'fa-x-twitter'].includes(l.icon)
    );

    container.innerHTML = `
      <p>${PROFILE.copyright}</p>
      <div class="footer-links">
        ${socialLinks.map(l => `
          <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="social-link" title="${l.label}" aria-label="${l.label}" style="width:32px;height:32px;font-size:0.85rem;">
            <i class="fab ${l.icon}"></i>
          </a>
        `).join('')}
      </div>
    `;
  }

  // ─── Certificate Lightbox ───────────────────────────────
  function openLightbox(images, title) {
    lightboxState = {
      images: images,
      currentIndex: 0,
      title: title || 'Certificate'
    };
    updateLightbox();
    document.getElementById('lightbox-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (lightboxState.destroyPdf) { lightboxState.destroyPdf(); lightboxState.destroyPdf = null; }
    document.getElementById('lightbox-overlay').classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigateLightbox(direction) {
    const total = lightboxState.images.length;
    if (total <= 1) return;
    lightboxState.currentIndex = (lightboxState.currentIndex + direction + total) % total;
    updateLightbox();
  }

  function updateLightbox() {
    const overlay = document.getElementById('lightbox-overlay');
    const imgWrapper = overlay.querySelector('.lightbox-image-wrapper');
    const counter = overlay.querySelector('.lightbox-counter');
    const titleEl = overlay.querySelector('.lightbox-title');
    const prevBtn = overlay.querySelector('.lightbox-nav.prev');
    const nextBtn = overlay.querySelector('.lightbox-nav.next');

    const src = lightboxState.images[lightboxState.currentIndex];
    const total = lightboxState.images.length;

    titleEl.textContent = lightboxState.title;
    counter.textContent = total > 1 ? `${lightboxState.currentIndex + 1} / ${total}` : '';
    prevBtn.style.display = total > 1 ? '' : 'none';
    nextBtn.style.display = total > 1 ? '' : 'none';

    if (lightboxState.destroyPdf) { lightboxState.destroyPdf(); lightboxState.destroyPdf = null; }
    const body = overlay.querySelector('.lightbox-body');
    let plain = src;
    try { plain = decodeURIComponent(src); } catch (e) { /* keep as is */ }
    if (/\.pdf($|[?#])/i.test(plain) && window.PdfViewer) {
      body.classList.add('pdf-open');
      lightboxState.destroyPdf = window.PdfViewer.mount(imgWrapper, encodeURI(plain));
      return;
    }
    body.classList.remove('pdf-open');
    imgWrapper.classList.remove('pdf-mode');
    imgWrapper.innerHTML = `<img src="${src}" alt="${lightboxState.title}"
      onerror="this.parentElement.innerHTML='<div class=\\'lightbox-fallback\\'><i class=\\'fas fa-image\\'></i><p>Certificate image not available</p></div>'">`;
  }

  window.closeLightbox = closeLightbox;
  window.navigateLightbox = navigateLightbox;

  function initLightboxKeyboard() {
    document.addEventListener('keydown', (e) => {
      const overlay = document.getElementById('lightbox-overlay');
      if (!overlay.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // Close on backdrop click
    const overlay = document.getElementById('lightbox-overlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target.classList.contains('lightbox-container')) {
          closeLightbox();
        }
      });
    }
  }

  // ─── Ripple Effect ──────────────────────────────────────
  window.addRipple = function (event) {
    const el = event.currentTarget;
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
    el.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  };

  // ─── Section Header Underline Observer ──────────────────
  function initSectionHeaders() {
    const underlines = document.querySelectorAll('.underline-animated');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    underlines.forEach(u => observer.observe(u));
  }

  // ─── Utility Functions ──────────────────────────────────
  function capitalize(str) {
    const words = str.replace(/[-_]/g, ' ').split(' ');
    return words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  function escapeAttr(str) {
    return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function triggerPageLoad() {
    document.body.classList.add('page-loaded');
    setTimeout(() => {
      initScrollAnimationObserver();
      initSectionHeaders();
    }, 200);
  }

})();
