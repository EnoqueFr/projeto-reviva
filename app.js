// ===================================================================
// Projeto Reviva — Script compartilhado
// Usado por: index.html, equipe.html
// ===================================================================

// scroll reveal
const revealItems = document.querySelectorAll('.reveal');
const revealIO = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); } });
}, { threshold: 0.12 });
revealItems.forEach(i => revealIO.observe(i));

// belt scroll progress
const beltBar = document.getElementById('beltProgress');
function updateBelt() {
  if (!beltBar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? scrollTop / docHeight : 0;
  beltBar.style.transform = `scaleX(${progress})`;
}
window.addEventListener('scroll', updateBelt, { passive: true });
updateBelt();

// mobile menu
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (menuToggle && mobileMenu) {
  function getFocusableInMenu() {
    return mobileMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
  }

  function closeMenu() {
    document.body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.focus();
  }

  function openMenu() {
    document.body.classList.add('menu-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    const focusable = getFocusableInMenu();
    if (focusable.length) focusable[0].focus();
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = document.body.classList.contains('menu-open');
    if (isOpen) closeMenu(); else openMenu();
  });

  document.querySelectorAll('.mm-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('keydown', (e) => {
    if (!document.body.classList.contains('menu-open')) return;

    if (e.key === 'Escape') { closeMenu(); return; }

    // focus trap: prende o Tab dentro do menu enquanto ele estiver aberto
    if (e.key === 'Tab') {
      const focusable = Array.from(getFocusableInMenu());
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

// floating mobile CTA — aparece depois que o hero sai de vista, some perto do footer
const floatingCta = document.getElementById('floatingCta');
if (floatingCta) {
  const heroEl = document.querySelector('.hero');
  const footerEl = document.querySelector('footer');
  let heroVisible = false;
  let footerVisible = false;

  function updateFloatingCta() {
    floatingCta.classList.toggle('visible', !heroVisible && !footerVisible);
  }

  const floatIO = new IntersectionObserver((entries) => {
    entries.forEach(e => { heroVisible = e.isIntersecting; });
    updateFloatingCta();
  }, { threshold: 0 });
  if (heroEl) floatIO.observe(heroEl);

  if (footerEl) {
    const footerIO = new IntersectionObserver((entries) => {
      entries.forEach(e => { footerVisible = e.isIntersecting; });
      updateFloatingCta();
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
    footerIO.observe(footerEl);
  }

  if (!heroEl) updateFloatingCta();
}

// carousel (só existe na index.html)
const track = document.getElementById('carouselTrack');
if (track) {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  function getScrollAmount() {
    const firstSlide = track.querySelector('.carousel-slide');
    if (!firstSlide) return 306;
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || '16');
    return firstSlide.getBoundingClientRect().width + gap;
  }
  prevBtn.addEventListener('click', () => track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' }));
  nextBtn.addEventListener('click', () => track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' }));
}

// FAQ accordion (só existe na index.html)
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-question');
  function toggleFaq() {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o => {
      if (o !== item) {
        o.classList.remove('open');
        o.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      }
    });
    item.classList.toggle('open', !isOpen);
    question.setAttribute('aria-expanded', String(!isOpen));
  }
  question.addEventListener('click', toggleFaq);
  question.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFaq(); }
  });
});
