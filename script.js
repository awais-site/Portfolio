// Typing effect
const phrases = ["Front-End Developer", "Python Programmer", "Computer Science Student"];
let i = 0, j = 0, current = '', isDeleting = false;
const typingEl = document.getElementById('typing');

function type() {
  if (!typingEl) return;
  const full = phrases[i];
  current = isDeleting ? full.substring(0, j--) : full.substring(0, j++);
  typingEl.textContent = current + (isDeleting ? '' : '│');

  if (!isDeleting && j === full.length + 1) {
    isDeleting = true;
    setTimeout(type, 900);
    return;
  }
  if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % phrases.length;
    setTimeout(type, 300);
    return;
  }
  setTimeout(type, isDeleting ? 60 : 120);
}
type();

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('navbar');
if (navToggle) {
  navToggle.addEventListener('click', () => nav.classList.toggle('open'));
}

// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
    a.classList.add('active');
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (nav.classList.contains('open')) nav.classList.remove('open');
  });
});

// IntersectionObserver reveal
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.18 });
reveals.forEach(r => io.observe(r));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// ========================
// Dark / Light Mode Toggle
// ========================
const themeToggle = document.getElementById('theme-toggle');

// Load saved theme
if (localStorage.getItem('theme') === 'light') {
  document.documentElement.classList.add('light');
}

// Toggle event
themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('light');
  if (document.documentElement.classList.contains('light')) {
    localStorage.setItem('theme', 'light');
    themeToggle.textContent = '☀';
  } else {
    localStorage.setItem('theme', 'dark');
    themeToggle.textContent = '☾';
  }
});

// Set initial icon based on theme
if (document.documentElement.classList.contains('light')) {
  themeToggle.textContent = '☀';
} else {
  themeToggle.textContent = '☾';
}
