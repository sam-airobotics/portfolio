// Enable JS class for animations
document.documentElement.classList.add('js');

// Current Year
document.getElementById('year').textContent = new Date().getFullYear();

// -----------------------------
// Mobile Navigation Toggle
// -----------------------------
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

navToggle.addEventListener('click', () => {
    const open = navMobile.classList.toggle('is-open');

    navToggle.setAttribute(
        'aria-expanded',
        open ? 'true' : 'false'
    );

    navToggle.classList.toggle('is-open');
});

navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMobile.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// -----------------------------
// Active Navigation Highlight
// -----------------------------
const sections = [
    'about',
    'stack',
    'work',
    'contact'
].map(id => document.getElementById(id));

const navLinks = document.querySelectorAll('[data-nav]');

function setActiveNav() {
    let current = null;

    sections.forEach(section => {
        if (
            section &&
            section.getBoundingClientRect().top <= 120
        ) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            'is-active',
            link.getAttribute('href') === '#' + current
        );
    });
}

document.addEventListener(
    'scroll',
    setActiveNav,
    { passive: true }
);

setActiveNav();

// -----------------------------
// Scroll Reveal Animation
// -----------------------------
if (
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
) {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    document
        .querySelectorAll('.reveal')
        .forEach(element => observer.observe(element));
} else {
    document
        .querySelectorAll('.reveal')
        .forEach(element =>
            element.classList.add('is-visible')
        );
}