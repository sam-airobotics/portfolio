// Final interaction polish: current page, resilient mobile navigation, and lazy image fallback.
document.documentElement.classList.add('js');

(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('#')) return;
    const target = href.split('/').pop() || 'index.html';
    if (target === path) link.classList.add('is-active');
  });

  const toggle = document.getElementById('navToggle');
  const mobile = document.getElementById('navMobile');
  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      const open = mobile.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    mobile.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      mobile.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  document.querySelectorAll('img').forEach((img) => {
    img.addEventListener('error', () => img.classList.add('is-missing'), { once: true });
  });
})();
