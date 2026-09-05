// Flow Generative Wave Ribbon & Interactive Particles Canvas
// Highly optimized with IntersectionObserver, capped DPR, and isolated render loops

class FlowHeroCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.width = 0;
    this.height = 0;
    // Cap DPR to 1.5 for ultra-smooth 60-144 FPS rendering without GPU bottleneck
    this.dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    // Simulation params
    this.time = 0;
    this.speed = 0.0055;
    this.lineCount = 32; // Optimized for silky smooth performance
    this.amplitude = 110;
    this.wavelength = 0.0022;
    this.isLightMode = false;
    this.isVisible = true;
    this.animationFrameId = null;

    // Mouse tracking & physics
    this.mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 200,
      speed: 0,
      prevX: 0,
      prevY: 0
    };

    // Stardust Particles (Optimized count)
    this.particles = [];
    this.particleCount = 45;

    // Click ripples
    this.ripples = [];

    this.init();
  }

  setTheme(isLight) {
    this.isLightMode = isLight;
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });

    const updateCoords = (e) => {
      if (!this.isVisible) return;
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : -1000);
      const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : -1000);
      this.mouse.targetX = (clientX - rect.left) * (this.canvas.width / rect.width / this.dpr);
      this.mouse.targetY = (clientY - rect.top) * (this.canvas.height / rect.height / this.dpr);
    };

    window.addEventListener('mousemove', (e) => {
      if (!this.isVisible) return;
      updateCoords(e);
      const dx = this.mouse.targetX - this.mouse.prevX;
      const dy = this.mouse.targetY - this.mouse.prevY;
      this.mouse.speed = Math.min(Math.sqrt(dx * dx + dy * dy), 25);
      this.mouse.prevX = this.mouse.targetX;
      this.mouse.prevY = this.mouse.targetY;
    }, { passive: true });

    window.addEventListener('touchstart', (e) => updateCoords(e), { passive: true });
    window.addEventListener('touchmove', (e) => updateCoords(e), { passive: true });

    this.canvas.addEventListener('mousedown', (e) => {
      this.createRipple(this.mouse.x, this.mouse.y);
      if (window.flowAudio) window.flowAudio.playClick();
    });

    this.initParticles();

    // IntersectionObserver to pause rendering when hero is off-screen
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const wasVisible = this.isVisible;
          this.isVisible = entry.isIntersecting;
          if (!wasVisible && this.isVisible) {
            this.animate();
          }
        });
      }, { rootMargin: '100px 0px 100px 0px', threshold: 0.01 });

      const heroEl = document.getElementById('hero') || this.canvas;
      observer.observe(heroEl);
    }

    this.animate();
  }

  resize() {
    const parent = this.canvas.parentElement;
    this.width = parent ? parent.clientWidth : window.innerWidth;
    this.height = parent ? parent.clientHeight : window.innerHeight;

    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(this.dpr, this.dpr);
    this.initParticles();
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.6 + 0.5,
        baseAlpha: Math.random() * 0.45 + 0.15,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.008
      });
    }
  }

  createRipple(x, y) {
    this.ripples.push({
      x: x,
      y: y,
      radius: 0,
      maxRadius: 240,
      alpha: 0.45,
      speed: 6
    });
  }

  animate() {
    if (!this.isVisible) {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      return;
    }

    this.time += this.speed;

    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.1;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.1;
    this.mouse.speed *= 0.88;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Dynamic background based on theme
    this.ctx.fillStyle = this.isLightMode ? '#f8f8fa' : '#060608';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.drawRipples();
    this.drawFlowRibbon();
    this.drawParticles();

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  drawFlowRibbon() {
    const ctx = this.ctx;
    const centerY = this.height / 2;
    const stepX = 8; // Optimized step size
    const numPoints = Math.ceil(this.width / stepX) + 2;

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let i = 0; i < this.lineCount; i++) {
      const lineProgress = i / (this.lineCount - 1);
      const offsetPhase = lineProgress * Math.PI * 1.4;
      const strandAmp = this.amplitude * (0.6 + 0.4 * Math.sin(lineProgress * Math.PI));

      const centerFactor = Math.sin(lineProgress * Math.PI);
      const alpha = Math.max(0.04, centerFactor * (this.isLightMode ? 0.45 : 0.38));
      const lineWidth = 0.75 + centerFactor * 0.6;

      ctx.beginPath();
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = this.isLightMode 
        ? `rgba(24, 24, 30, ${alpha})`
        : `rgba(240, 240, 245, ${alpha})`;

      for (let p = 0; p < numPoints; p++) {
        const x = (p - 1) * stepX;
        
        const wave1 = Math.sin(x * this.wavelength + this.time + offsetPhase);
        const wave2 = Math.sin(x * this.wavelength * 1.9 - this.time * 1.1 + offsetPhase * 0.6) * 0.35;
        const wave3 = Math.cos(x * this.wavelength * 0.6 + this.time * 0.8) * 0.25;

        const centerDist = (x - this.width / 2) / (this.width / 2);
        const centerBell = Math.exp(-centerDist * centerDist * 3.5);
        const wingDamping = Math.exp(-centerDist * centerDist * 0.9);

        const loopDeform = Math.sin(centerDist * Math.PI * 1.8 + offsetPhase * 1.1) * (strandAmp * 1.15) * centerBell;

        let y = centerY + (wave1 + wave2 + wave3) * strandAmp * wingDamping + loopDeform;

        if (this.mouse.x > -500) {
          const mdx = x - this.mouse.x;
          const mdy = y - this.mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < this.mouse.radius) {
            const force = (1 - mdist / this.mouse.radius) * 32;
            const pushDir = mdy > 0 ? 1 : -1;
            y += pushDir * force * Math.sin((mdist / this.mouse.radius) * Math.PI);
          }
        }

        for (const rip of this.ripples) {
          const rdx = x - rip.x;
          const rdy = y - rip.y;
          const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
          const diff = Math.abs(rdist - rip.radius);
          if (diff < 32) {
            const ripForce = Math.sin((diff / 32) * Math.PI) * (1 - rip.radius / rip.maxRadius) * 14;
            y += ripForce;
          }
        }

        if (p === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
    }

    ctx.restore();
  }

  drawParticles() {
    const ctx = this.ctx;
    ctx.save();

    const particleBaseRGB = this.isLightMode ? '24, 24, 30' : '255, 255, 255';
    const len = this.particles.length;

    for (let i = 0; i < len; i++) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      p.phase += p.pulseSpeed;
      const pulse = Math.sin(p.phase);
      let currentAlpha = Math.max(0.1, p.baseAlpha + pulse * 0.12);

      let targetX = p.x;
      let targetY = p.y;

      if (this.mouse.x > -500) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          const factor = (1 - dist / 130);
          targetX -= (dx / dist) * factor * 18;
          targetY -= (dy / dist) * factor * 18;
          currentAlpha = Math.min(0.9, currentAlpha + factor * 0.35);
        }
      }

      ctx.beginPath();
      ctx.arc(targetX, targetY, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${particleBaseRGB}, ${currentAlpha})`;
      ctx.fill();

      for (let j = i + 1; j < len; j++) {
        const p2 = this.particles[j];
        const dx = Math.abs(p.x - p2.x);
        if (dx > 55) continue;
        const dy = Math.abs(p.y - p2.y);
        if (dy > 55) continue;

        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 55) {
          const lineAlpha = (1 - dist / 55) * 0.1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${particleBaseRGB}, ${lineAlpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    ctx.restore();
  }

  drawRipples() {
    const ctx = this.ctx;
    const rippleRGB = this.isLightMode ? '24, 24, 30' : '255, 255, 255';
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      const rip = this.ripples[i];
      rip.radius += rip.speed;
      rip.alpha = (1 - rip.radius / rip.maxRadius) * 0.4;

      if (rip.radius >= rip.maxRadius) {
        this.ripples.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${rippleRGB}, ${rip.alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }
  }
}

window.FlowHeroCanvas = FlowHeroCanvas;
