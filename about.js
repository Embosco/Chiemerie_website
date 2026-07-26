document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');
  counters.forEach((counter) => {
    const target = Number(counter.dataset.target || counter.textContent);
    if (!target) return;
    let current = 0;
    const increment = Math.max(1, Math.floor(target / 80));
    const updateCounter = () => {
      current += increment;
      counter.textContent = current >= target ? `${target}+` : `${current}+`;
      if (current < target) requestAnimationFrame(updateCounter);
    };
    counter.textContent = '0+';
    updateCounter();
  });

  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.2 });

  reveals.forEach((element) => revealObserver.observe(element));
});
