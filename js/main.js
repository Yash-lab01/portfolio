/* ============================================
   PORTFOLIO — Main JavaScript & Interactive Canvas
   Yash Bhawar — AI/ML Engineer & Data Analyst
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- 1. Live Animated Particle & Neural Mesh Canvas ----------
  const canvas = document.getElementById('bgCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
    const mouse = { x: null, y: null, radius: 140 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 1;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        // Dual palette: Cyan and Lavender Violet
        this.color = Math.random() > 0.5 ? 'rgba(6, 182, 212, ' : 'rgba(139, 92, 246, ';
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color + '0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Mouse collision interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const maxDistance = mouse.radius;
            const force = (maxDistance - distance) / maxDistance;
            const directionX = forceDirectionX * force * 1.5;
            const directionY = forceDirectionY * force * 1.5;
            this.x -= directionX;
            this.y -= directionY;
          }
        }
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw particle network lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 125) {
            const lineAlpha = (1 - dist / 125) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
        particles[i].update();
        particles[i].draw();
      }

      requestAnimationFrame(animate);
    }

    animate();
  }

  // ---------- 2. Typed Text Effect ----------
  const typedElement = document.getElementById('heroTyped');
  if (typedElement) {
    const roles = [
      'AI & ML Engineer',
      'Data Analyst',
      'Multi-Agent System Builder',
      'LLM Solutions Architect'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typedElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
      } else {
        typedElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 90;
      }

      typedElement.style.borderRight = '2px solid var(--accent-cyan)';

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 450;
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  // ---------- 3. Navbar Scroll Effect ----------
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
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
    const scrollY = window.scrollY + 120;

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

  // ---------- 5. Mobile Hamburger & Navigation ----------
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

  // ---------- 7. Scroll Reveal Animations ----------
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---------- 8. Smooth Scroll for Nav Links ----------
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

  // ---------- 9. Category Filter Tabs Logic ----------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectSections = {
    'ai-llm': document.getElementById('ai-llm'),
    'machine-learning': document.getElementById('machine-learning'),
    'data-analytics': document.getElementById('data-analytics')
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      if (filter === 'all') {
        Object.values(projectSections).forEach(sec => {
          if (sec) sec.style.display = 'block';
        });
      } else {
        Object.keys(projectSections).forEach(key => {
          const sec = projectSections[key];
          if (sec) {
            if (key === filter) {
              sec.style.display = 'block';
              sec.scrollIntoView({ behavior: 'smooth' });
            } else {
              sec.style.display = 'none';
            }
          }
        });
      }
    });
  });

  // ---------- 10. AI Projects "View More" Toggle ----------
  const toggleAiBtn = document.getElementById('toggleAiProjectsBtn');
  const hiddenProjects = document.querySelectorAll('.hidden-project');

  if (toggleAiBtn && hiddenProjects.length > 0) {
    let isExpanded = false;

    toggleAiBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;

      hiddenProjects.forEach(proj => {
        if (isExpanded) {
          proj.classList.add('show');
        } else {
          proj.classList.remove('show');
        }
      });

      if (isExpanded) {
        toggleAiBtn.innerHTML = '<span>Show Less Projects</span> <span class="btn-arrow">▲</span>';
      } else {
        toggleAiBtn.innerHTML = '<span>Explore All 7 AI Agents & Projects</span> <span class="btn-arrow">▼</span>';
        const aiSection = document.getElementById('ai-llm');
        if (aiSection) {
          aiSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

});
