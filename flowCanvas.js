// Flow Interactive Generative Ribbon & Particle Wave System
// Recreating the exact aesthetic from the reference image with interactive physics
class FlowHeroCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.width = 0;
    this.height = 0;
    this.dpr = window.devicePixelRatio || 1;

    // Simulation params
    this.time = 0;
    this.speed = 0.008;
    this.lineCount = 42; // number of wireframe ribbon strands
    this.amplitude = 130;
    this.wavelength = 0.0025;
    this.glowColor = 'rgba(255, 255, 255, 0.7)';
    this.dimColor = 'rgba(220, 230, 245, 0.15)';

    // Mouse tracking & physics
    this.mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 200,
      down: false,
      speed: 0,
      prevX: 0,
      prevY: 0
    };

    // Particles constellation
    this.particles = [];
    this.particleCount = 120;

    // Click ripples
    this.ripples = [];

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Mouse & Touch events
    const updateCoords = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : -1000);
      const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : -1000);
      this.mouse.targetX = (clientX - rect.left) * (this.canvas.width / rect.width / this.dpr);
      this.mouse.targetY = (clientY - rect.top) * (this.canvas.height / rect.height / this.dpr);
    };

    window.addEventListener('mousemove', (e) => {
      updateCoords(e);
      const dx = this.mouse.targetX - this.mouse.prevX;
      const dy = this.mouse.targetY - this.mouse.prevY;
      this.mouse.speed = Math.min(Math.sqrt(dx * dx + dy * dy), 40);
      this.mouse.prevX = this.mouse.targetX;
      this.mouse.prevY = this.mouse.targetY;
    });

    window.addEventListener('touchstart', (e) => updateCoords(e), { passive: true });
    window.addEventListener('touchmove', (e) => updateCoords(e), { passive: true });

    this.canvas.addEventListener('mousedown', (e) => {
      this.mouse.down = true;
      this.createRipple(this.mouse.x, this.mouse.y);
      if (window.flowAudio) window.flowAudio.playClick(800, 0.05, 'sine');
    });

    window.addEventListener('mouseup', () => {
      this.mouse.down = false;
    });

    this.initParticles();
    this.animate();
  }

  resize() {
    const parent = this.canvas.parentElement;
    this.width = parent ? parent.clientWidth : window.innerWidth;
    this.height = parent ? parent.clientHeight : window.innerHeight;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(this.dpr, this.dpr);
    this.initParticles();
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        originX: Math.random() * this.width,
        originY: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2.2 + 0.6,
        alpha: Math.random() * 0.65 + 0.2,
        baseAlpha: Math.random() * 0.65 + 0.2,
        phase: Math.random() * Math.PI * 2,
        orbitSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1)
      });
    }
  }

  createRipple(x, y) {
    this.ripples.push({
      x: x,
      y: y,
      radius: 0,
      maxRadius: 280,
      alpha: 0.8,
      speed: 6
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    this.time += this.speed;

    // Smooth mouse interpolation
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.12;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.12;
    this.mouse.speed *= 0.92;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw subtle background radial dark vignette
    const bgGradient = this.ctx.createRadialGradient(
      this.width / 2, this.height / 2, 40,
      this.width / 2, this.height / 2, Math.max(this.width, this.height) * 0.7
    );
    bgGradient.addColorStop(0, 'rgba(18, 16, 28, 0.4)');
    bgGradient.addColorStop(0.6, 'rgba(8, 7, 13, 0.8)');
    bgGradient.addColorStop(1, 'rgba(4, 4, 7, 1)');
    this.ctx.fillStyle = bgGradient;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // 2. Draw Ripples
    this.drawRipples();

    // 3. Draw The Flow Harmonic Wireframe Ribbon (Reference Image Replica)
    this.drawFlowRibbon();

    // 4. Draw Interactive Particles & Constellations
    this.drawParticles();
  }

  drawFlowRibbon() {
    const ctx = this.ctx;
    const centerY = this.height / 2;
    const stepX = 8;
    const numPoints = Math.ceil(this.width / stepX) + 2;

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let i = 0; i < this.lineCount; i++) {
      const lineProgress = i / (this.lineCount - 1); // 0 to 1
      const offsetPhase = lineProgress * Math.PI * 1.5;
      const strandAmp = this.amplitude * (0.55 + 0.45 * Math.sin(lineProgress * Math.PI));

      // Calculate alpha based on distance from ribbon center
      const centerFactor = Math.sin(lineProgress * Math.PI);
      const alpha = Math.max(0.04, centerFactor * 0.48);
      const lineWidth = 0.8 + centerFactor * 0.8;

      ctx.beginPath();
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = `rgba(235, 240, 255, ${alpha})`;

      for (let p = 0; p < numPoints; p++) {
        const x = (p - 1) * stepX;
        
        // Base sine wave modulation
        const wave1 = Math.sin(x * this.wavelength + this.time + offsetPhase);
        const wave2 = Math.sin(x * this.wavelength * 2.1 - this.time * 1.3 + offsetPhase * 0.7) * 0.4;
        const wave3 = Math.cos(x * this.wavelength * 0.5 + this.time * 0.7) * 0.3;

        // Envelope shape to create the organic teardrop loop in the center
        const centerDist = (x - this.width / 2) / (this.width / 2);
        const centerBell = Math.exp(-centerDist * centerDist * 3.2); // high in center
        const wingDamping = Math.exp(-centerDist * centerDist * 0.8);

        // Center loop deformation (recreating the loop from image)
        const loopDeform = Math.sin(centerDist * Math.PI * 1.8 + offsetPhase * 1.2) * (strandAmp * 1.2) * centerBell;

        let y = centerY + (wave1 + wave2 + wave3) * strandAmp * wingDamping + loopDeform;

        // Interactive mouse distortion
        if (this.mouse.x > -500) {
          const mdx = x - this.mouse.x;
          const mdy = y - this.mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < this.mouse.radius) {
            const force = (1 - mdist / this.mouse.radius) * 45;
            const pushDir = mdy > 0 ? 1 : -1;
            y += pushDir * force * Math.sin((mdist / this.mouse.radius) * Math.PI);
          }
        }

        // Apply ripples distortion
        for (const rip of this.ripples) {
          const rdx = x - rip.x;
          const rdy = y - rip.y;
          const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
          const diff = Math.abs(rdist - rip.radius);
          if (diff < 40) {
            const ripForce = Math.sin((diff / 40) * Math.PI) * (1 - rip.radius / rip.maxRadius) * 22;
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

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Natural movement
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;

      // Particle oscillation
      p.phase += p.orbitSpeed;
      const pulse = Math.sin(p.phase);

      // Mouse attraction / repulsion
      let currentAlpha = p.baseAlpha + pulse * 0.15;
      let targetX = p.x;
      let targetY = p.y;

      if (this.mouse.x > -500) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 180) {
          const factor = (1 - dist / 180);
          // Gently push particles on mouse movement
          targetX -= (dx / dist) * factor * 25;
          targetY -= (dy / dist) * factor * 25;
          currentAlpha = Math.min(1.0, currentAlpha + factor * 0.6);
        }
      }

      // Draw particle dot
      ctx.beginPath();
      ctx.arc(targetX, targetY, p.radius + Math.max(0, pulse * 0.4), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, currentAlpha)})`;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw faint constellation lines between nearby particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 75) {
          const lineAlpha = (1 - dist / 75) * 0.18;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    ctx.restore();
  }

  drawRipples() {
    const ctx = this.ctx;
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      const rip = this.ripples[i];
      rip.radius += rip.speed;
      rip.alpha = (1 - rip.radius / rip.maxRadius) * 0.6;

      if (rip.radius >= rip.maxRadius) {
        this.ripples.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(180, 220, 255, ${rip.alpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    }
  }

  // Interactive controls
  setSpeed(val) { this.speed = val; }
  setDensity(val) { this.lineCount = val; }
  setAmplitude(val) { this.amplitude = val; }
}

window.FlowHeroCanvas = FlowHeroCanvas;
