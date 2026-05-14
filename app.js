/* app.js — ThoughtFire Studio interactions
   Loaded with <script defer> — DOM is ready when this runs. */

'use strict';

// ── Copyright year ────────────────────────────────────────────
const yrEl = document.getElementById('yr');
if (yrEl) yrEl.textContent = new Date().getFullYear();


// ── Nav scroll state ──────────────────────────────────────────
(function initNav() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }

  updateNav(); // apply on load in case page is already scrolled
  window.addEventListener('scroll', updateNav, { passive: true });
})();


// ── Scroll reveal (IntersectionObserver) ─────────────────────
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  // Respect reduced-motion preference — skip animation entirely
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  els.forEach(el => observer.observe(el));
})();


// ── Smooth scroll for in-page hash links ─────────────────────
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      if (!id) return; // bare "#" — scroll to top
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
