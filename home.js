document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    }, 1100);
  }

  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const setNavbarState = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 80);
    };
    window.addEventListener('scroll', setNavbarState);
    setNavbarState();
  }

  const reveals = document.querySelectorAll('.reveal');
  const revealElements = () => {
    reveals.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        element.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', revealElements);
  revealElements();

  const counters = document.querySelectorAll('.counter');
  counters.forEach((counter) => {
    const target = Number(counter.dataset.target || counter.textContent);
    if (!target) return;

    let current = 0;
    const increment = Math.max(1, Math.floor(target / 70));
    const updateCounter = () => {
      current += increment;
      if (current >= target) {
        counter.textContent = `${target}+`;
      } else {
        counter.textContent = `${current}+`;
        requestAnimationFrame(updateCounter);
      }
    };

    counter.textContent = '0+';
    updateCounter();
  });

  const topBtn = document.getElementById('topBtn');
  if (topBtn) {
    const updateTopBtn = () => {
      topBtn.style.display = window.scrollY > 500 ? 'block' : 'none';
    };
    window.addEventListener('scroll', updateTopBtn);
    topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    updateTopBtn();
  }

  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-active');
    });

    document.querySelectorAll('.nav-menu a').forEach((link) => {
      link.addEventListener('click', () => navMenu.classList.remove('mobile-active'));
    });
  }

  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach((link) => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
});
