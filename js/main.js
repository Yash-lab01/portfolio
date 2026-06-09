/* ============================================
   Portfolio — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Typed Text Effect ----------
  const typedElement = document.getElementById('heroTyped');
  const roles = [
    'AI / ML Engineer',
    'Data Analyst',
    'LLM Application Builder',
    'Dashboard Designer'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typedElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    // Add blinking cursor
    typedElement.style.borderRight = '2px solid var(--accent)';

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at the end of the word
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // ---------- Navbar Scroll Effect ----------
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ---------- Active Nav Link Highlighting ----------
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

  // ---------- Mobile Hamburger ----------
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
  });

  // Close mobile menu on link click (but not the resume dropdown toggle)
  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (link.classList.contains('nav-resume-btn')) return;
      hamburger.classList.remove('active');
      navLinksContainer.classList.remove('open');
    });
  });

  // ---------- Resume Dropdown Toggle ----------
  const resumeDropdown = document.getElementById('resumeDropdown');
  const resumeBtn = resumeDropdown.querySelector('.nav-resume-btn');

  resumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    resumeDropdown.classList.toggle('open');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!resumeDropdown.contains(e.target)) {
      resumeDropdown.classList.remove('open');
    }
  });

  // ---------- Scroll Reveal Animations ----------
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once revealed, stop observing for performance
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---------- Smooth Scroll for Nav Links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // Skip the resume dropdown toggle
      if (this.classList.contains('nav-resume-btn')) return;
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
