/* =========================================================
   UBAID — Shared interactions
   ========================================================= */

(function() {
  'use strict';

  // ===== PAGE TRANSITION ENTER =====
  document.addEventListener('DOMContentLoaded', function() {
    const transition = document.querySelector('.page-transition');
    if (transition) {
      transition.classList.add('entering');
      setTimeout(() => transition.classList.remove('entering'), 1500);
    }
  });

  // ===== PAGE TRANSITION LEAVE on link click =====
  document.addEventListener('DOMContentLoaded', function() {
    const internalLinks = document.querySelectorAll('a[href$=".html"]:not([target="_blank"])');
    const transition = document.querySelector('.page-transition');

    internalLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('http')) return;
        e.preventDefault();
        if (transition) {
          transition.classList.add('leaving');
          setTimeout(() => { window.location.href = href; }, 900);
        } else {
          window.location.href = href;
        }
      });
    });
  });

  // ===== MOBILE MENU =====
  document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
  });

  // ===== HEADER SCROLL HIDE/SHOW =====
  document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      if (currentScroll > lastScroll && currentScroll > 100) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }
      lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    });
  });

  // ===== LIVE CLOCK =====
  document.addEventListener('DOMContentLoaded', function() {
    const clockEl = document.querySelector('[data-clock]');
    if (!clockEl) return;

    function tick() {
      const now = new Date();
      const opts = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Africa/Johannesburg' };
      clockEl.textContent = now.toLocaleTimeString('en-ZA', opts) + ' SAST';
    }
    tick();
    setInterval(tick, 1000);
  });

  // ===== CUSTOM CURSOR =====
  document.addEventListener('DOMContentLoaded', function() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = document.querySelector('.cursor');
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    const ease = 0.18;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      cursorX += (mouseX - cursorX) * ease;
      cursorY += (mouseY - cursorY) * ease;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      requestAnimationFrame(animate);
    }
    animate();

    // Interactive hover states
    const growTargets = document.querySelectorAll('a, button, .menu-toggle, input, textarea, select, .skill-cell, .semester-card, .edu-card');
    growTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('grow', 'text'));
    });

    const textTargets = document.querySelectorAll('.project-tile .project-viewport, .hero-portrait, .about-portrait');
    textTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('text'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('text'));
    });
  });

  // ===== INTERSECTION REVEAL ANIMATIONS =====
  document.addEventListener('DOMContentLoaded', function() {
    const reveals = document.querySelectorAll('[data-reveal]');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
  });

  // ===== SKILL METER ANIMATIONS =====
  document.addEventListener('DOMContentLoaded', function() {
    const meters = document.querySelectorAll('.skill-meter-fill');
    if (!meters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target.dataset.value || '50';
          entry.target.style.width = target + '%';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    meters.forEach(m => observer.observe(m));
  });

})();
