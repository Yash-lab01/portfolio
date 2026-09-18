/* ============================================
   PORTFOLIO — Main JavaScript (Clean, Zero Gimmicks)
   Yash Bhawar — AI/ML Engineer & Systems Builder
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- 1. Interactive Technical Blueprint Grid Canvas ----------
  const canvas = document.getElementById('bgCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;

    const GRID_SIZE = 40;
    const RADIUS = 180;

    let mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false
    };

    let isAnimating = false;
    let idleTimer = null;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';

      ctx.scale(dpr, dpr);
      renderStatic();
    }

    function renderStatic() {
      ctx.clearRect(0, 0, width, height);

      // Base Blueprint Grid: Faint, crisp static ticks
      ctx.fillStyle = 'rgba(30, 41, 59, 0.4)';
      const startX = (width % GRID_SIZE) / 2;
      const startY = (height % GRID_SIZE) / 2;

      for (let x = startX; x < width; x += GRID_SIZE) {
        for (let y = startY; y < height; y += GRID_SIZE) {
          ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.2;
      mouse.y += (mouse.targetY - mouse.y) * 0.2;

      const startX = (width % GRID_SIZE) / 2;
      const startY = (height % GRID_SIZE) / 2;

      // Base dots
      ctx.fillStyle = 'rgba(30, 41, 59, 0.4)';
      for (let x = startX; x < width; x += GRID_SIZE) {
        for (let y = startY; y < height; y += GRID_SIZE) {
          ctx.fillRect(x - 0.75, y - 0.75, 1.5, 1.5);
        }
      }

      // Proximity-based crosshair illumination
      if (mouse.active && mouse.x > -200) {
        const minX = Math.max(0, mouse.x - RADIUS);
        const maxX = Math.min(width, mouse.x + RADIUS);
        const minY = Math.max(0, mouse.y - RADIUS);
        const maxY = Math.min(height, mouse.y + RADIUS);

        const firstX = Math.floor((minX - startX) / GRID_SIZE) * GRID_SIZE + startX;
        const firstY = Math.floor((minY - startY) / GRID_SIZE) * GRID_SIZE + startY;

        for (let x = firstX; x <= maxX; x += GRID_SIZE) {
          for (let y = firstY; y <= maxY; y += GRID_SIZE) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < RADIUS) {
              const intensity = Math.pow(1 - dist / RADIUS, 2);

              // Draw precision crosshair (+)
              const arm = 2 + intensity * 4;
              ctx.strokeStyle = `rgba(245, 158, 11, ${intensity * 0.55})`;
              ctx.lineWidth = 1;

              ctx.beginPath();
              // Horizontal tick
              ctx.moveTo(x - arm, y);
              ctx.lineTo(x + arm, y);
              // Vertical tick
              ctx.moveTo(x, y - arm);
              ctx.lineTo(x, y + arm);
              ctx.stroke();

              // Subtle center point highlight
              ctx.fillStyle = `rgba(245, 158, 11, ${intensity * 0.8})`;
              ctx.fillRect(x - 1, y - 1, 2, 2);
            }
          }
        }

        // Faint coordinate readout near cursor
        const coordText = `LOC [${Math.round(mouse.x)}, ${Math.round(mouse.y)}]`;
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(148, 163, 184, 0.25)';
        ctx.fillText(coordText, mouse.x + 14, mouse.y - 12);
      }

      // Check if motion has settled
      const diffX = Math.abs(mouse.targetX - mouse.x);
      const diffY = Math.abs(mouse.targetY - mouse.y);

      if (diffX > 0.1 || diffY > 0.1) {
        requestAnimationFrame(draw);
      } else {
        isAnimating = false;
        if (!mouse.active) {
          renderStatic();
        }
      }
    }

    function onMouseMove(e) {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;

      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        mouse.active = false;
        if (!isAnimating) {
          isAnimating = true;
          requestAnimationFrame(draw);
        }
      }, 3500);

      if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(draw);
      }
    }

    function onMouseLeave() {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(draw);
      }
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    resize();
  }

  // ---------- 2. Fast Role Rotation / Subheading ----------
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

  // ---------- 3. Navbar Scroll Behavior ----------
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

  // ---------- 4. Active Nav Link Highlighting ----------
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

  // ---------- 5. Mobile Hamburger Menu ----------
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

  // ---------- 6. Resume Dropdown Toggle ----------
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

  // ---------- 7. Catalog Category Filter Tabs ----------
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

  // ---------- 8. Smooth Scroll for Anchor Links ----------
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
