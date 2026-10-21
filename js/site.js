/* =============================================================
   Dr. Suffrin — site.js
   One place to edit: profile links, navigation, header, footer.
   Every page includes <div id="site-header"></div> and
   <div id="site-footer"></div>; this file fills them in.
   ============================================================= */

/* ---- 1. EDIT THESE LINKS ONCE — they update across every page ---- */
const LINKS = {
  email:    'sdimitri33@gmail.com',
  cv:       'cv/Suffrin-CV.pdf',          // put the PDF at /cv/Suffrin-CV.pdf
  orcid:    'https://orcid.org/0000-0001-7403-3460',
  scholar:  '',                           // Google Scholar profile URL
  pubmed:   '',                           // PubMed author search URL
  linkedin: 'https://www.linkedin.com/in/jcdimitritrisuffrin',   // from his ORCID record
  harvard:  ''                            // Harvard profile URL
};

const ICON_LINKEDIN = '<svg class="icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>';

/* ---- 2. Navigation (order = order shown) ---- */
const NAV = [
  { id: 'home',         label: 'Home',         href: 'index.html' },
  { id: 'research',     label: 'Research',     href: 'research.html' },
  { id: 'fieldwork',    label: 'Field Work',   href: 'fieldwork.html' },
  { id: 'projects',     label: 'Projects',     href: 'projects.html' },
  { id: 'publications', label: 'Publications', href: 'publications.html' },
  { id: 'writing',      label: 'Writing',      href: 'writing.html' },
  { id: 'about',        label: 'About',        href: 'about.html' }
];

(function () {
  'use strict';
  const body = document.body;
  const root = body.dataset.root || '';          // '../' for pages in sub-folders
  const page = body.dataset.page || '';
  const url = (p) => /^(https?:|mailto:)/.test(p) ? p : root + p;

  /* ---- Header ---- */
  const header = document.getElementById('site-header');
  if (header) {
    header.outerHTML = `
<a class="skip" href="#main">Skip to content</a>
<header class="site-header" id="header">
  <div class="wrap header-row">
    <a class="brand" href="${url('index.html')}" aria-label="Dr. Suffrin, home">
      <img src="${url('images/logo-ink.png')}" alt="Dr. Suffrin" width="245" height="34">
    </a>
    <nav class="primary-nav" id="primary-nav" aria-label="Main">
      ${NAV.map(n => `<a href="${url(n.href)}"${n.id === page ? ' aria-current="page"' : ''}>${n.label}</a>`).join('')}
    </nav>
    <div class="header-actions">
      <a class="btn btn-line btn-sm" data-link="cv" href="#">CV</a>
      <a class="btn btn-ink btn-sm" href="${url('contact.html')}"${page === 'contact' ? ' aria-current="page"' : ''}>Contact</a>
    </div>
    <a class="header-social" data-link="linkedin" data-keep href="#" aria-label="LinkedIn">${ICON_LINKEDIN}</a>
    <button class="menu-btn" id="menu-btn" aria-expanded="false" aria-controls="primary-nav">Menu</button>
  </div>
</header>`;
  }

  /* ---- Footer ---- */
  const footer = document.getElementById('site-footer');
  if (footer) {
    const year = new Date().getFullYear();
    footer.outerHTML = `
<footer class="site-footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <img src="${url('images/logo-white.png')}" alt="Dr. Suffrin" width="288" height="40">
        <p class="footer-question">How do we translate evidence and technology into effective care in real-world health systems?</p>
      </div>
      <div>
        <h4>Explore</h4>
        <ul>${NAV.map(n => `<li><a href="${url(n.href)}">${n.label}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h4>Connect</h4>
        <ul>
          <li><a href="${url('contact.html')}">Collaborate</a></li>
          <li><a data-link="email" href="#">Email</a></li>
          <li><a data-link="cv" href="#">CV (PDF)</a></li>
          <li><a data-link="orcid" href="#">ORCID</a></li>
          <li><a data-link="scholar" href="#">Google Scholar</a></li>
          <li><a data-link="pubmed" href="#">PubMed</a></li>
          <li><a class="with-icon" data-link="linkedin" data-keep href="#">${ICON_LINKEDIN}LinkedIn</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; ${year} Jean Christophe Dimitri Suffrin, MD, MMSc</span>
      <span>Views are my own. No confidential patient or program data is published on this site.</span>
    </div>
  </div>
</footer>`;
  }

  /* ---- Fill every [data-link] from LINKS ---- */
  document.querySelectorAll('[data-link]').forEach(function (a) {
    const key = a.dataset.link;
    const val = LINKS[key];
    if (!val && a.dataset.keep !== undefined) {   // shown on purpose before the URL exists
      a.href = '#';
      a.setAttribute('aria-disabled', 'true');
      a.title = 'Profile link coming soon';
      a.addEventListener('click', e => e.preventDefault());
      return;
    }
    if (!val) {                       // not set yet: hide it rather than show a dead link
      const li = a.closest('li');
      (li && li.parentElement.closest('.site-footer') ? li : a).hidden = true;
      return;
    }
    if (key === 'email') {
      a.href = 'mailto:' + val;
      if (a.dataset.showValue !== undefined) a.textContent = val;
    } else {
      a.href = url(val);
      if (/^https?:/.test(val)) { a.target = '_blank'; a.rel = 'noopener'; }
    }
  });

  /* ---- Header: border on scroll, mobile menu ---- */
  const hdr = document.getElementById('header');
  const btn = document.getElementById('menu-btn');
  if (hdr) {
    const onScroll = () => hdr.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  if (hdr && btn) {
    btn.addEventListener('click', function () {
      const open = hdr.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      btn.textContent = open ? 'Close' : 'Menu';
    });
  }

  /* ---- Projects: filter by research domain (projects.html#tb etc.) ---- */
  const filters = document.querySelector('.filters');
  if (filters) {
    const cards = Array.from(document.querySelectorAll('.project'));
    const buttons = Array.from(filters.querySelectorAll('button'));
    const apply = function (tag, updateHash) {
      if (!buttons.some(b => b.dataset.filter === tag)) tag = 'all';
      buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === tag)));
      cards.forEach(c => { c.hidden = tag !== 'all' && !c.dataset.tags.split(' ').includes(tag); });
      if (updateHash) history.replaceState(null, '', tag === 'all' ? location.pathname : '#' + tag);
    };
    buttons.forEach(b => b.addEventListener('click', () => apply(b.dataset.filter, true)));
    const fromHash = () => {
      const h = location.hash.slice(1);
      const card = h && document.getElementById(h);
      if (card && card.classList.contains('project')) { apply('all', false); card.open = true; card.scrollIntoView(); }
      else apply(h || 'all', false);
    };
    window.addEventListener('hashchange', fromHash);
    fromHash();
  }
})();
