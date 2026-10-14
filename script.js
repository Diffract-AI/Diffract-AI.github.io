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
const researchDisclosure = document.querySelector('.nav-research');
const reportsPicker = document.querySelector('.reports-picker');

const closeResearchMenu = () => {
  if (researchDisclosure) researchDisclosure.removeAttribute('open');
  if (reportsPicker) reportsPicker.removeAttribute('open');
};

menuToggle.addEventListener('click', () => {
  const isOpen = document.body.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  if (!isOpen) closeResearchMenu();
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  document.body.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  closeResearchMenu();
}));

if (researchDisclosure) {
  document.addEventListener('click', (event) => {
    if (!researchDisclosure.contains(event.target)) closeResearchMenu();
  });

}

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  if (researchDisclosure?.open) {
    closeResearchMenu();
    researchDisclosure.querySelector('summary').focus();
  } else if (document.body.classList.contains('menu-open')) {
    document.body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    menuToggle.focus();
  }
});
