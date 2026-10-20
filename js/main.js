/* ─────────────────────────────────────────────
   Dr. Suffrin – main.js
   Mobile hamburger, scroll effects, dropdowns
   ───────────────────────────────────────────── */

(function () {
  'use strict';

  // ── Hamburger toggle ────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close nav when a link is clicked (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Mobile dropdown toggle (tap) ────────────
  document.querySelectorAll('.nav-dropdown-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const parent = toggle.closest('.nav-dropdown');
        if (parent) parent.classList.toggle('open');
      }
    });
  });

  // ── Navbar scroll shadow ─────────────────────
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ── Active nav link on scroll ────────────────
  const sections  = document.querySelectorAll('section[id], footer[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  if (sections.length && navAnchors.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navAnchors.forEach(function (a) {
            a.classList.toggle(
              'active',
              a.getAttribute('href') === '#' + entry.target.id
            );
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (s) { observer.observe(s); });
  }

  // ── Close dropdowns when clicking outside ────
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.nav-dropdown.open').forEach(function (d) {
        d.classList.remove('open');
      });
    }
  });

})();
