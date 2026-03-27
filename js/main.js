/* ============================================================
   SAKIB HASAN ANIK — PORTFOLIO JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. NAVBAR SCROLL SHRINK ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ── 2. HAMBURGER MENU ── */
  const hamburger = document.querySelector('.hamburger');
  const navLinks  = document.querySelector('.nav-links');
  hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px,5px)' : '';
    spans[1].style.opacity   = navLinks.classList.contains('open') ? '0' : '1';
    spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });
  // Close nav on link click
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  /* ── 3. REVEAL ON SCROLL ── */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // Animate skill bars when skills section visible
        if (e.target.classList.contains('skills-animate')) animateSkillBars();
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── 4. TYPING ANIMATION ── */
  const roles = [
    'AI & ML Researcher',
    'Data Science Enthusiast',
    'CSE Student',
    'Problem Solver',
    'Open Source Contributor'
  ];
  let roleIdx = 0, charIdx = 0, isDeleting = false;
  const typedEl = document.querySelector('.typed-text');

  function typeLoop() {
    if (!typedEl) return;
    const current = roles[roleIdx];
    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIdx--);
      if (charIdx < 0) { isDeleting = false; roleIdx = (roleIdx + 1) % roles.length; setTimeout(typeLoop, 400); return; }
      setTimeout(typeLoop, 50);
    } else {
      typedEl.textContent = current.substring(0, charIdx++);
      if (charIdx > current.length) { isDeleting = true; setTimeout(typeLoop, 1800); return; }
      setTimeout(typeLoop, 80);
    }
  }
  setTimeout(typeLoop, 1200);

  /* ── 5. SKILL BARS ── */
  function animateSkillBars() {
    document.querySelectorAll('.skill-fill').forEach(bar => {
      const w = bar.getAttribute('data-width');
      if (w) bar.style.width = w;
    });
  }

  // Also trigger if skills section is already visible
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const skillObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) animateSkillBars(); });
    }, { threshold: 0.1 });
    skillObs.observe(skillsSection);
  }

  /* ── 6. IMAGE CAROUSEL ── */
  const track   = document.querySelector('.carousel-track');
  const slides  = document.querySelectorAll('.carousel-slide');
  const dots    = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  let current = 0, autoTimer;

  function goTo(idx) {
    if (!track || slides.length === 0) return;
    current = (idx + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function startAuto() {
    autoTimer = setInterval(() => goTo(current + 1), 4000);
  }
  function stopAuto() { clearInterval(autoTimer); }

  prevBtn?.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  nextBtn?.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); }));
  goTo(0);
  startAuto();

  // Pause on hover
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  carouselWrapper?.addEventListener('mouseenter', stopAuto);
  carouselWrapper?.addEventListener('mouseleave', startAuto);

  /* ── 7. SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── 8. ACTIVE NAV HIGHLIGHT ── */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navAs = document.querySelectorAll('.nav-links a');
  const activeObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAs.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${e.target.id}` ? 'var(--green)' : '';
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => activeObs.observe(s));

  /* ── 9. FOOTER BACK TO TOP ── */
  document.querySelector('.footer-back')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── 10. ACHIEVEMENT CARD TILT ── */
  document.querySelectorAll('.achievement-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -10;
      card.style.transform = `translateY(-4px) perspective(600px) rotateX(${y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});
