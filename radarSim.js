// DonutSMP Sus Chunk Finder Interactive Scanner & Radar Simulator
// Implements scoring, cluster logic & tracer rendering of Flow's SusChunkFinder.java
// Optimized with IntersectionObserver & capped DPR for zero frame drop

class DonutChunkRadarSim {
  constructor(canvasId, infoPanelId) {
    this.canvas = document.getElementById(canvasId);
    this.infoPanel = document.getElementById(infoPanelId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.width = 0;
    this.height = 0;
    this.isVisible = true;
    this.animationFrameId = null;

    // Player State in DonutSMP
    this.player = {
      x: 0,
      z: 0,
      chunkX: 0,
      chunkZ: 0,
      heading: 0,
      speed: 0.75,
      flying: true
    };

    // Scan settings matching SusChunkFinder
    this.simDistance = 4;
    this.sensitivity = 5;
    this.tracers = true;
    this.color = '#0078FF';

    // World chunk generation
    this.chunks = new Map();
    this.flaggedBases = [];
    this.topBase = null;
    this.lastPingTime = 0;
    this.lastHudUpdate = 0;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });
    this.generateSimWorld();

    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = (e.clientX - rect.left) * (this.width / rect.width);
      const clickZ = (e.clientY - rect.top) * (this.height / rect.height);

      // Convert pixel coords to world chunk
      const centerPxX = this.width / 2;
      const centerPxZ = this.height / 2;
      const zoom = 14;

      const targetChunkX = Math.round(this.player.chunkX + (clickX - centerPxX) / zoom);
      const targetChunkZ = Math.round(this.player.chunkZ + (clickZ - centerPxZ) / zoom);

      // Spawn a suspicious vault at click location
      this.injectSuspiciousBase(targetChunkX, targetChunkZ);
      if (window.flowAudio) window.flowAudio.playRadarPing();
    });

    // IntersectionObserver to pause radar simulation when section is off-screen
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

      const donutSection = document.getElementById('donutsmp') || this.canvas;
      observer.observe(donutSection);
    }

    this.animate();
  }

  resize() {
    const parent = this.canvas.parentElement;
    this.width = parent ? parent.clientWidth : 600;
    this.height = parent ? parent.clientHeight : 450;

    this.canvas.width = Math.round(this.width * this.dpr);
    this.canvas.height = Math.round(this.height * this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(this.dpr, this.dpr);
  }

  generateSimWorld() {
    // Inject realistic DonutSMP bases at varied distances
    const prebakedBases = [
      { cx: 8, cz: -6, type: 'Obsidian Vault & Stash', score: 38, reason: 'obsidian base (18) + containers (14)', y: -24 },
      { cx: -12, cz: 9, type: 'Dupe / Redstone Stash', score: 26, reason: 'redstone (12) + containers (8)', y: 12 },
      { cx: 16, cz: 14, type: 'Underground Villager Trading Hall', score: 42, reason: 'villagers (8) + workstations (12) + beds (6)', y: 32 },
      { cx: -7, cz: -11, type: 'Secret Clan Vault (Rotated Deepslate)', score: 32, reason: 'rotated deepslate (14) + armor stands (4)', y: -48 },
      { cx: 3, cz: -18, type: 'Mega Geode Farm Hub', score: 28, reason: 'mega geode hub (3+ geodes)', y: -16 }
    ];

    prebakedBases.forEach(b => {
      this.chunks.set(`${b.cx},${b.cz}`, {
        cx: b.cx,
        cz: b.cz,
        worldX: b.cx * 16 + 8,
        worldZ: b.cz * 16 + 8,
        worldY: b.y,
        isBase: true,
        baseType: b.type,
        score: b.score,
        reason: b.reason,
        containers: Math.floor(b.score / 2),
        stands: 2,
        scanned: false
      });
    });
  }

  injectSuspiciousBase(cx, cz) {
    const reasons = [
      { type: 'Hidden DonutSMP Stash Vault', reason: 'containers (24) + obsidian base (8)', score: 45, y: -38 },
      { type: 'Underground AFK Farm', reason: 'redstone (16) + rotated deepslate (6)', score: 29, y: 18 },
      { type: 'Armor Stand & Trophy Room', reason: 'armor stands (6) + item frames (12)', score: 34, y: 42 }
    ];
    const pick = reasons[Math.floor(Math.random() * reasons.length)];

    this.chunks.set(`${cx},${cz}`, {
      cx: cx,
      cz: cz,
      worldX: cx * 16 + 8,
      worldZ: cz * 16 + 8,
      worldY: pick.y,
      isBase: true,
      baseType: pick.type,
      score: pick.score,
      reason: pick.reason,
      containers: 16,
      stands: 4,
      scanned: true
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

    // Update player trajectory (simulating Elytra flight)
    if (this.player.flying) {
      this.player.heading += 0.0075;
      this.player.x += Math.cos(this.player.heading) * this.player.speed;
      this.player.z += Math.sin(this.player.heading) * this.player.speed;
      this.player.chunkX = this.player.x / 16;
      this.player.chunkZ = this.player.z / 16;
    }

    this.scanNearbyChunks();
    this.draw();

    // Throttle HUD updates to 10 FPS for optimal DOM rendering performance
    const now = Date.now();
    if (now - this.lastHudUpdate > 100) {
      this.lastHudUpdate = now;
      this.updateInfoHUD();
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  scanNearbyChunks() {
    const scanRadius = 12;
    this.flaggedBases = [];
    let highestScore = -1;
    let top = null;

    const pChunkX = Math.round(this.player.chunkX);
    const pChunkZ = Math.round(this.player.chunkZ);

    for (let dx = -scanRadius; dx <= scanRadius; dx++) {
      for (let dz = -scanRadius; dz <= scanRadius; dz++) {
        const cx = pChunkX + dx;
        const cz = pChunkZ + dz;
        const key = `${cx},${cz}`;

        if (this.chunks.has(key)) {
          const chunkData = this.chunks.get(key);
          chunkData.scanned = true;

          if (chunkData.score >= this.sensitivity) {
            this.flaggedBases.push(chunkData);
            if (chunkData.score > highestScore) {
              highestScore = chunkData.score;
              top = chunkData;
            }
          }
        }
      }
    }

    this.topBase = top;

    // Periodic radar notification ping
    const now = Date.now();
    if (this.topBase && now - this.lastPingTime > 7000) {
      this.lastPingTime = now;
      if (window.flowAudio) window.flowAudio.playRadarPing();
    }
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    const centerX = this.width / 2;
    const centerZ = this.height / 2;
    const zoom = 14; // pixels per chunk

    // Draw Dark Radar Grid
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;

    const gridExtent = 18;
    const offX = (this.player.chunkX % 1) * zoom;
    const offZ = (this.player.chunkZ % 1) * zoom;

    ctx.beginPath();
    for (let i = -gridExtent; i <= gridExtent; i++) {
      const offsetX = i * zoom - offX + centerX;
      ctx.moveTo(offsetX, 0);
      ctx.lineTo(offsetX, this.height);

      const offsetZ = i * zoom - offZ + centerZ;
      ctx.moveTo(0, offsetZ);
      ctx.lineTo(this.width, offsetZ);
    }
    ctx.stroke();

    // Draw Simulation Distance Ring
    ctx.beginPath();
    ctx.arc(centerX, centerZ, this.simDistance * zoom, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Scanning Cone Sweep
    const sweepAngle = (Date.now() / 850) % (Math.PI * 2);
    const sweepGrad = ctx.createRadialGradient(centerX, centerZ, 10, centerX, centerZ, 150);
    sweepGrad.addColorStop(0, 'rgba(0, 120, 255, 0.16)');
    sweepGrad.addColorStop(1, 'rgba(0, 120, 255, 0.0)');

    ctx.beginPath();
    ctx.moveTo(centerX, centerZ);
    ctx.arc(centerX, centerZ, 150, sweepAngle - 0.4, sweepAngle);
    ctx.closePath();
    ctx.fillStyle = sweepGrad;
    ctx.fill();

    // Draw Scanned Chunks and Suspicious Flagged Bases
    this.chunks.forEach(chunk => {
      const px = centerX + (chunk.cx - this.player.chunkX) * zoom;
      const pz = centerZ + (chunk.cz - this.player.chunkZ) * zoom;

      if (px < -20 || px > this.width + 20 || pz < -20 || pz > this.height + 20) return;

      if (chunk.isBase && chunk.scanned) {
        const isTop = this.topBase && this.topBase.cx === chunk.cx && this.topBase.cz === chunk.cz;

        // Base box
        ctx.fillStyle = isTop ? 'rgba(239, 68, 68, 0.55)' : 'rgba(0, 120, 255, 0.45)';
        ctx.strokeStyle = isTop ? '#EF4444' : '#0078FF';
        ctx.lineWidth = isTop ? 2 : 1.2;

        ctx.fillRect(px - zoom / 2, pz - zoom / 2, zoom, zoom);
        ctx.strokeRect(px - zoom / 2, pz - zoom / 2, zoom, zoom);

        // Tracer line to player
        if (this.tracers) {
          ctx.beginPath();
          ctx.moveTo(centerX, centerZ);
          ctx.lineTo(px, pz);
          ctx.strokeStyle = isTop ? 'rgba(239, 68, 68, 0.75)' : 'rgba(0, 120, 255, 0.4)';
          ctx.lineWidth = isTop ? 1.8 : 1;
          ctx.stroke();
        }

        // Nametag & Signal Reason
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`SCORE: ${chunk.score}`, px, pz - zoom / 2 - 4);
      }
    });

    // Draw Player Marker
    ctx.save();
    ctx.translate(centerX, centerZ);
    ctx.rotate(this.player.heading + Math.PI / 2);

    ctx.fillStyle = '#10B981';
    ctx.shadowColor = '#10B981';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(5, 6);
    ctx.lineTo(0, 3.5);
    ctx.lineTo(-5, 6);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
    ctx.restore();
  }

  updateInfoHUD() {
    if (!this.infoPanel) return;

    const pX = Math.round(this.player.x);
    const pZ = Math.round(this.player.z);
    const flagCount = this.flaggedBases.length;

    let targetHTML = `
      <div class="radar-status-bar">
        <span class="status-live-dot"></span>
        <span class="status-title">SUS CHUNK SCANNER ACTIVE</span>
        <span class="status-sim-tag">DonutSMP Engine</span>
      </div>

      <div class="radar-telemetry-grid">
        <div class="telemetry-card">
          <span class="telemetry-label">Player Position</span>
          <span class="telemetry-val">X: ${pX} | Z: ${pZ}</span>
        </div>
        <div class="telemetry-card">
          <span class="telemetry-label">Flagged Targets</span>
          <span class="telemetry-val highlight-cyan">${flagCount} Bases</span>
        </div>
        <div class="telemetry-card">
          <span class="telemetry-label">Scan Speed</span>
          <span class="telemetry-val">4 Chunks / Tick</span>
        </div>
        <div class="telemetry-card">
          <span class="telemetry-label">Sensitivity</span>
          <span class="telemetry-val">Score ≥ ${this.sensitivity}</span>
        </div>
      </div>
    `;

    if (this.topBase) {
      const dist = Math.round(Math.hypot(this.topBase.worldX - pX, this.topBase.worldZ - pZ));
      targetHTML += `
        <div class="radar-target-card">
          <div class="target-header">
            <span class="target-badge">TOP CANDIDATE DETECTED</span>
            <span class="target-dist">${dist}m AWAY</span>
          </div>
          <div class="target-type">${this.topBase.baseType}</div>
          <div class="target-coords">
            <strong>Coords:</strong> X: ${this.topBase.worldX} &nbsp; Y: ${this.topBase.worldY} &nbsp; Z: ${this.topBase.worldZ}
          </div>
          <div class="target-reason">
            <strong>Detection Signals:</strong> ${this.topBase.reason}
          </div>
          <div class="target-actions">
            <button class="target-btn-copy" onclick="navigator.clipboard.writeText('/tp ${this.topBase.worldX} ${this.topBase.worldY} ${this.topBase.worldZ}'); window.flowClickGUI?.showToast('Coords Copied', 'Copied base coordinates to clipboard!', '#10B981');">
              Copy Coordinates
            </button>
            <span class="target-score-pill">Score: ${this.topBase.score}</span>
          </div>
        </div>
      `;
    } else {
      targetHTML += `
        <div class="radar-target-card empty-target">
          <div class="empty-target-title">Scouting chunks...</div>
          <p>Click anywhere on the radar grid to simulate spawning a hidden underground base!</p>
        </div>
      `;
    }

    this.infoPanel.innerHTML = targetHTML;
  }

  setSensitivity(val) {
    this.sensitivity = val;
  }

  toggleTracers() {
    this.tracers = !this.tracers;
    return this.tracers;
  }
}

window.DonutChunkRadarSim = DonutChunkRadarSim;
