'use strict';

// ── Copyright year ────────────────────────────────────────────
const yrEl = document.getElementById('yr');
if (yrEl) yrEl.textContent = new Date().getFullYear();


// ── Phrase cycling ────────────────────────────────────────────
const phrases = [
  'work smarter, not harder.',
  'spend more time on the things you love.',
  'take advantage of technology without lifting a finger.',
  'stop doing the same repetitive work every week.',
  'get out of the weeds and back in your zone.',
  'run a tighter operation with a lot less effort.',
  'make more money without adding more hours.',
  'let the software handle the boring stuff.',
];

const phraseEl = document.getElementById('phrase');
if (phraseEl) {
  let current = 0;

  function nextPhrase() {
    phraseEl.classList.add('out');
    setTimeout(() => {
      current = (current + 1) % phrases.length;
      phraseEl.textContent = phrases[current];
      phraseEl.classList.remove('out');
    }, 460);
  }

  setInterval(nextPhrase, 3800);
}


// ── Contact form ──────────────────────────────────────────────
const form    = document.getElementById('contact-form');
const btn     = document.getElementById('submit-btn');
const success = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name  = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const note  = form.querySelector('[name="note"]').value.trim();

    if (!name || !email) return;

    btn.disabled    = true;
    btn.textContent = 'Sending…';

    const subject = encodeURIComponent('ThoughtFire — Fresh eyes on my business');
    const body    = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}` + (note ? `\n\n${note}` : '')
    );
    window.location.href =
      `mailto:david@thoughtfire.studio?subject=${subject}&body=${body}`;

    form.reset();
    success.hidden  = false;
    btn.textContent = 'Sent →';
  });
}


// ── Smooth scroll ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
