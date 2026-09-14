/* ============================================
   PORTFOLIO — Main JavaScript (Clean, Zero Gimmicks)
   Yash Bhawar — AI/ML Engineer & Systems Builder
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- 1. Fast Role Rotation / Subheading ----------
  const typedElement = document.getElementById('heroTyped');
  if (typedElement) {
    const roles = [
      'AI & ML Engineer',
      'Multi-Agent System Builder',
      'Deterministic Graph Architect',
      'Data Analyst'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 70;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typedElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 35;
      } else {
        typedElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 70;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  // ---------- 2. Navbar Scroll Behavior ----------
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ---------- 3. Active Nav Link Highlighting ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a:not(.nav-resume-btn)');

  function updateActiveLink() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);

  // ---------- 4. Mobile Hamburger Menu ----------
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');

  if (hamburger && navLinksContainer) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinksContainer.classList.toggle('open');
    });

    navLinksContainer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (link.classList.contains('nav-resume-btn')) return;
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('open');
      });
    });
  }

  // ---------- 5. Resume Dropdown Toggle ----------
  const resumeDropdown = document.getElementById('resumeDropdown');
  if (resumeDropdown) {
    const resumeBtn = resumeDropdown.querySelector('.nav-resume-btn');
    if (resumeBtn) {
      resumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        resumeDropdown.classList.toggle('open');
      });
    }

    document.addEventListener('click', (e) => {
      if (!resumeDropdown.contains(e.target)) {
        resumeDropdown.classList.remove('open');
      }
    });
  }

  // ---------- 6. Catalog Category Filter Tabs ----------
  const filterBtns = document.querySelectorAll('.catalog-filter-bar .filter-btn');
  const catalogCards = document.querySelectorAll('.catalog-card');

  if (filterBtns.length > 0 && catalogCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        catalogCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ---------- 7. Smooth Scroll for Anchor Links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if (this.classList.contains('nav-resume-btn')) return;
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
