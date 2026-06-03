// ============ MOBILE MENU TOGGLE ============
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuIcon = mobileToggle.querySelector('[data-lucide]');

mobileToggle.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');
  if (isOpen) {
    mobileMenu.classList.add('hidden');
    mobileMenuIcon.setAttribute('data-lucide', 'menu');
  } else {
    mobileMenu.classList.remove('hidden');
    mobileMenuIcon.setAttribute('data-lucide', 'x');
  }
  lucide.createIcons();
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    mobileMenuIcon.setAttribute('data-lucide', 'menu');
    lucide.createIcons();
  });
});

// ============ NAVBAR SCROLL EFFECT ============
// Transparente no topo; escurece gradualmente com o scroll até ficar
// totalmente preto quando começa a secção "Sobre" (fim da hero).
const navbar = document.getElementById('navbar');
const hero = document.getElementById('hero');

function updateNavbar() {
  const navH = navbar.offsetHeight;
  const heroHeight = hero ? hero.offsetHeight : window.innerHeight;
  // distância de scroll até a "Sobre" encostar ao navbar
  const denom = Math.max(heroHeight - navH, 1);
  let progress = window.scrollY / denom;
  progress = Math.min(Math.max(progress, 0), 1);

  // #0D0D0D = rgb(13,13,13)
  navbar.style.backgroundColor = `rgba(13, 13, 13, ${progress})`;
  navbar.style.backdropFilter = progress > 0.03 ? `blur(${progress * 8}px)` : 'none';
  navbar.style.webkitBackdropFilter = navbar.style.backdropFilter;
  navbar.style.borderBottom = `1px solid rgba(255, 255, 255, ${progress * 0.06})`;
  navbar.style.boxShadow = progress > 0.4 ? `0 10px 30px -12px rgba(0, 0, 0, ${progress * 0.5})` : 'none';
}

window.addEventListener('scroll', updateNavbar, { passive: true });
window.addEventListener('resize', updateNavbar);
updateNavbar();

// ============ LIVE OPEN/CLOSED STATUS ============
function updateOpenStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours * 60 + minutes;

  const statusDot = document.getElementById('status-dot');
  const statusText = document.getElementById('status-text');

  // Schedule ranges in minutes since midnight
  const morningOpen = 7 * 60;        // 7:00
  const morningClose = 13 * 60;      // 13:00
  const afternoonOpen = 15 * 60 + 30; // 15:30
  const afternoonClose = 21 * 60;    // 21:00
  const saturdayOpen = 8 * 60 + 30;  // 8:30
  const saturdayClose = 13 * 60;     // 13:00

  let isOpen = false;

  if (day === 0) {
    isOpen = false;
  } else if (day === 6) {
    isOpen = currentTime >= saturdayOpen && currentTime < saturdayClose;
  } else {
    const isMorning = currentTime >= morningOpen && currentTime < morningClose;
    const isAfternoon = currentTime >= afternoonOpen && currentTime < afternoonClose;
    isOpen = isMorning || isAfternoon;
  }

  if (isOpen) {
    statusDot.classList.remove('bg-red-500');
    statusDot.classList.add('bg-green-500', 'animate-pulse');
    statusText.textContent = 'Estamos Abertos! Vem Treinar 💪';
    statusText.classList.remove('text-gray-300');
    statusText.classList.add('text-green-400');
  } else {
    statusDot.classList.remove('bg-green-500', 'animate-pulse');
    statusDot.classList.add('bg-red-500');
    statusText.textContent = 'Estamos Fechados! Vemo-nos em breve 🥊';
    statusText.classList.remove('text-green-400');
    statusText.classList.add('text-gray-300');
  }
}

updateOpenStatus();
setInterval(updateOpenStatus, 60000);

// ============ CURRENT YEAR ============
document.getElementById('current-year').textContent = new Date().getFullYear();

// ============ SMOOTH SCROLL FOR ALL ANCHOR LINKS ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = navbar.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ============ FORM SUBMISSION (Prevent Default) ============
const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const button = contactForm.querySelector('button[type="submit"]');
    const originalHTML = button.innerHTML;

    button.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i> Mensagem Enviada!';
    button.classList.add('bg-green-600', 'hover:bg-green-700', 'text-white');
    button.classList.remove('bg-boxing-green', 'hover:bg-boxing-green-light');
    lucide.createIcons();

    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.classList.remove('bg-green-600', 'hover:bg-green-700', 'text-white');
      button.classList.add('bg-boxing-green', 'hover:bg-boxing-green-light');
      contactForm.reset();
      lucide.createIcons();
    }, 3000);
  });
}

console.log('🥊 Barbosa Boxing Gym — Pronto para a ação!');
