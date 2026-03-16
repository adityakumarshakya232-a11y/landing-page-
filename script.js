// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Form submit
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target;
  btn.textContent = '✅ Submitted! We\'ll call you soon.';
  btn.style.background = 'linear-gradient(135deg, #28c840, #00d4ff)';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '🚀 Book Free Demo Session';
    btn.style.background = '';
    btn.disabled = false;
  }, 4000);
}

// Smooth scroll on nav link click
const allNavLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

allNavLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const navHeight = document.getElementById('navbar').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// Active nav link highlight on scroll (Intersection Observer)
const sections = document.querySelectorAll('section[id]');
const navHeight = document.getElementById('navbar').offsetHeight;

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      allNavLinks.forEach(a => {
        const isActive = a.getAttribute('href') === '#' + id;
        a.style.color = isActive ? 'var(--accent)' : '';
        a.style.fontWeight = isActive ? '600' : '';
      });
    }
  });
}, {
  rootMargin: `-${navHeight}px 0px -55% 0px`,
  threshold: 0
});

sections.forEach(s => activeObserver.observe(s));