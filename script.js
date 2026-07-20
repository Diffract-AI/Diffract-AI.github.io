const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  observer.observe(element);
});

document.getElementById('year').textContent = new Date().getFullYear();

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav nav');

menuToggle.addEventListener('click', () => {
  const isOpen = document.body.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  document.body.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
