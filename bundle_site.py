import os

site_dir = r"c:\Users\elias\Desktop\website flow"

# Read CSS files
css_content = ""
for f in ["css/main.css", "css/clickgui.css", "css/radar.css", "css/components.css"]:
    with open(os.path.join(site_dir, f), "r", encoding="utf-8") as fh:
        css_content += f"/* === {f} === */\n" + fh.read() + "\n\n"

# Read JS files
js_content = ""
for f in ["js/audio.js", "js/modulesData.js", "js/flowCanvas.js", "js/radarSim.js", "js/clickgui.js", "js/tour.js", "js/app.js"]:
    with open(os.path.join(site_dir, f), "r", encoding="utf-8") as fh:
        js_content += f"// === {f} ===\n" + fh.read() + "\n\n"

html_body = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Flow Client | Next-Gen Minecraft 1.21.11 Fabric Client & DonutSMP Base Finder</title>
  <meta name="description" content="Flow Client is the premier 1.21.11 Fabric client featuring intelligent Sus Chunk Finder for DonutSMP, undetected anticheat bypasses, and an ultra-modern ClickGUI." />
  <meta name="keywords" content="Flow Client, Minecraft Client, DonutSMP Base Finder, Sus Chunk Finder, Minecraft 1.21.11, Fabric Client, Undetected Ghost Client, AutoCrystal, AutoTotem" />
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='24' fill='%23070709'/><text x='50' y='68' font-family='sans-serif' font-size='56' font-weight='bold' fill='%23ffffff' text-anchor='middle'>f</text></svg>" />

  <!-- Google Fonts Preconnect & Stylesheets -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@200;300;400;500;600;700&display=swap" rel="stylesheet">

  <style>
""" + css_content + """
  </style>
</head>
<body>

  <!-- ==================== STICKY NAVIGATION BAR ==================== -->
  <header class="flow-navbar">
    <div class="flow-container">
      <div class="nav-wrapper">
        <a href="#hero" class="brand-logo" title="Flow Client Home">
          <span class="logo-text-spaced">flow</span>
          <span class="logo-version-badge">v1.0.0 • 1.21.11</span>
        </a>

        <nav class="nav-menu-container">
          <ul class="nav-links-menu">
            <li><a href="#hero" class="nav-link">Overview</a></li>
            <li><a href="#donutsmp" class="nav-link">Sus Chunk Finder</a></li>
            <li><a href="#bypasses" class="nav-link">Undetected Matrix</a></li>
            <li><a href="#clickgui-section" class="nav-link">Live ClickGUI</a></li>
            <li><a href="#access" class="nav-link">Purchase & Discord</a></li>
            <li><a href="#faq" class="nav-link">FAQ</a></li>
          </ul>
        </nav>

        <div class="nav-actions">
          <!-- Quick Tour Trigger Button -->
          <button class="nav-tour-btn" id="btnStartTourNav" title="Start Interactive Guide">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            <span>Guide Tour</span>
          </button>

          <a href="https://discord.gg/A3G6X5hWfn" target="_blank" rel="noopener noreferrer" class="nav-discord-btn" title="Join Flow Discord">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span>Discord</span>
          </a>
        </div>
      </div>
    </div>
  </header>

  <!-- ==================== DYNAMIC FLOATING ISLAND DOCK ==================== -->
  <aside class="flow-floating-island" id="floatingIsland">
    <!-- Home Button -->
    <button class="island-btn" id="islandBtnHome" title="Scroll to Top">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
    </button>

    <!-- View Modules Button -->
    <button class="island-btn" id="islandBtnModules" title="View Modules & ClickGUI">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
    </button>

    <div class="island-divider"></div>

    <!-- Mute / Unmute Button -->
    <button class="island-btn flow-mute-toggle-btn" id="islandBtnMute" title="Mute/Unmute Music">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
    </button>

    <!-- Volume Slider in Island -->
    <div class="island-volume-wrap" title="Adjust Music Volume">
      <input type="range" class="island-volume-slider flow-volume-slider" id="islandVolumeSlider" min="0" max="1" step="0.01" value="0.5" />
    </div>

    <div class="island-divider"></div>

    <!-- Discord Button -->
    <button class="island-btn btn-discord-island" id="islandBtnDiscord" title="Join Flow Discord">
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    </button>

    <div class="island-divider"></div>

    <!-- Theme Toggle (Sun ☀️ <-> Half-Moon 🌙) -->
    <button class="island-btn flow-theme-toggle-btn" id="islandBtnTheme" title="Toggle Light/Dark Theme">
      <!-- Injected by JavaScript -->
    </button>
  </aside>

  <!-- ==================== HERO SECTION ==================== -->
  <section class="flow-hero-section" id="hero">
    <!-- Generative Wave Ribbon & Interactive Particles Canvas -->
    <canvas id="flowWaveCanvas" class="hero-canvas-background"></canvas>

    <div class="flow-container">
      <div class="hero-content-wrapper">
        <div class="hero-brand-center">
          <h1 class="hero-flow-title">flow</h1>
        </div>

        <div class="hero-subtitle-tag">
          <span>Fabric Native 1.21.11 Client</span>
          <span>•</span>
          <span>DonutSMP & Anarchy</span>
        </div>

        <h2 class="hero-main-headline">
          Precision Engineering for DonutSMP & Modern Minecraft
        </h2>

        <p class="hero-description">
          Dominate with our intelligent multi-signal <strong>Sus Chunk Finder</strong> that turns base hunting into child's play, 
          battle-tested <strong>undetected anticheat bypasses</strong>, and an ultra-fluid ClickGUI.
        </p>

        <div class="hero-cta-group">
          <a href="https://discord.gg/A3G6X5hWfn" target="_blank" rel="noopener noreferrer" class="hero-btn-discord">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span>Get Flow on Discord</span>
          </a>
          <a href="#clickgui-section" class="hero-btn-secondary">
            <span>Explore Interactive Client GUI</span>
          </a>
        </div>

        <!-- Performance Stats Strip -->
        <div class="hero-stats-strip">
          <div class="stat-item">
            <span class="stat-number">50+</span>
            <span class="stat-label">Engineered Modules</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">100%</span>
            <span class="stat-label">DonutSMP Undetected</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">0-Lag</span>
            <span class="stat-label">Async Chunk Queue</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">1.21.11</span>
            <span class="stat-label">Fabric Native</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ==================== DONUTSMP & SUS CHUNK FINDER SPOTLIGHT ==================== -->
  <section class="donut-radar-section" id="donutsmp">
    <div class="flow-container">
      <div class="section-header-center">
        <div class="section-tag">DonutSMP Base Hunting</div>
        <h2 class="section-title">Sus Chunk Finder & Base Radar</h2>
        <p class="section-desc">
          Finding hidden underground vaults, shulker stashes, and mega-bases on DonutSMP made effortless. 
          Flow’s multi-signal heuristic chunk scanner pinpoints underground anomalies automatically without frame drops.
        </p>
      </div>

      <!-- Radar Showcase Grid -->
      <div class="radar-showcase-grid">
        <!-- Interactive Canvas Radar -->
        <div class="radar-viewport-container">
          <div class="radar-overlay-badge">
            <span class="radar-live-blip"></span>
            <span>DONUTSMP RADAR • CLICK TO SCAN CHUNK</span>
          </div>
          <canvas id="radarCanvas"></canvas>
          <div class="radar-controls-overlay">
            <div class="radar-slider-wrap">
              <label for="radarSensitivitySlider">Sensitivity:</label>
              <input type="range" id="radarSensitivitySlider" min="1" max="15" value="5" step="1" />
              <span id="radarSensitivityVal" style="font-weight: 600;">5</span>
            </div>
            <span class="radar-hint-text">Simulating Elytra Speed: 0.8 Chunks/s</span>
          </div>
        </div>

        <!-- Radar Telemetry & Target Details -->
        <div class="radar-info-box" id="radarInfoPanel">
          <!-- Dynamically populated by radarSim.js -->
        </div>
      </div>

      <!-- DonutSMP Feature Cards Grid -->
      <div class="donutsmp-grid" style="margin-top: 40px;">
        <div class="donut-feature-card">
          <div class="donut-card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polygon points="12 8 8 12 12 16 16 12 12 8"></polygon></svg>
          </div>
          <h3 class="donut-card-title">10-Signal Detection Matrix</h3>
          <p class="donut-card-desc">
            Flow evaluates underground containers (&lt;Y55), armor stands, workstations, obsidian portals, rotated deepslate, redstone circuits, artificial lights, tamed pets, and multi-geode hub clustering.
          </p>
          <div class="donut-tag-list">
            <span class="donut-pill">Containers &lt;Y55</span>
            <span class="donut-pill">Rotated Deepslate</span>
            <span class="donut-pill">Multi-Geodes</span>
            <span class="donut-pill">Redstone</span>
          </div>
        </div>

        <div class="donut-feature-card">
          <div class="donut-card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          </div>
          <h3 class="donut-card-title">Staff & Vanish Detector</h3>
          <p class="donut-card-desc">
            Monitors DonutSMP player tab list and network packets to detect staff members joining, entering vanish, or changing gamemodes. Features instant audio alarm and emergency auto-disconnect.
          </p>
          <div class="donut-tag-list">
            <span class="donut-pill">Vanish Alerts</span>
            <span class="donut-pill">Auto Disconnect</span>
            <span class="donut-pill">Discord Webhooks</span>
          </div>
        </div>

        <div class="donut-feature-card">
          <div class="donut-card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
          </div>
          <h3 class="donut-card-title">Stash & Netherite Finder</h3>
          <p class="donut-card-desc">
            Quickly locate massive shulker stashes and unmined Ancient Debris veins in the Nether with bounding boxes, 3D tracer lines, and fast Shulker Dropper for 1-click raiding.
          </p>
          <div class="donut-tag-list">
            <span class="donut-pill">Ancient Debris ESP</span>
            <span class="donut-pill">Stash Density</span>
            <span class="donut-pill">Shulker Dropper</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ==================== UNDETECTED ANTICHEAT BYPASS MATRIX ==================== -->
  <section class="flow-bypass-section" id="bypasses">
    <div class="flow-container">
      <div class="section-header-center">
        <div class="section-tag">Security Architecture</div>
        <h2 class="section-title">Undetected Anticheat Bypasses</h2>
        <p class="section-desc">
          Flow is built from the ground up with strict stealth algorithms, humanized aim bezier curves, and packet spoofing to bypass modern Minecraft anticheats effortlessly.
        </p>
      </div>

      <div class="bypass-matrix-container">
        <!-- Anticheat Compatibility Table -->
        <div class="bypass-card">
          <div class="bypass-header">
            <h3 class="bypass-title">Server Anticheat Status</h3>
            <span class="bypass-badge-active">ALL ACTIVE</span>
          </div>
          <table class="anticheat-table">
            <thead>
              <tr>
                <th>Anticheat</th>
                <th>Supported Modules</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="anticheat-name">DonutSMP Custom</td>
                <td>Sus Chunk Finder, AutoTotem, ElytraFly</td>
                <td class="status-passed">✓ UNDETECTED</td>
              </tr>
              <tr>
                <td class="anticheat-name">GrimAC</td>
                <td>AimAssist, AutoClicker, Reach (3.3m), SafeWalk</td>
                <td class="status-passed">✓ 100% BYPASS</td>
              </tr>
              <tr>
                <td class="anticheat-name">Vulcan / Polar</td>
                <td>AutoCrystal, AutoDoubleHand, FastPlace, FastLadder</td>
                <td class="status-passed">✓ 100% BYPASS</td>
              </tr>
              <tr>
                <td class="anticheat-name">Intave / Verus</td>
                <td>TriggerBot, AutoEat, AutoArmor, NameProtect</td>
                <td class="status-passed">✓ 100% BYPASS</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Ghost vs Blatant Overview -->
        <div class="bypass-card">
          <div class="bypass-header">
            <h3 class="bypass-title">Stealth vs Blatant Modes</h3>
            <span class="bypass-badge-active">CONFIGURABLE</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-hairline); border-radius: 6px; padding: 12px;">
              <h4 style="font-size: 13.5px; margin-bottom: 3px; color: var(--text-pure-white);">Ghost Mode (Stream & Screen-Share Proof)</h4>
              <p style="font-size: 12.5px;">
                Humanized AimAssist with smooth curve interpolation, randomized Gaussian CPS auto clicker (12-16 CPS), local NameProtect, and discreet Player ESP.
              </p>
            </div>
            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-hairline); border-radius: 6px; padding: 12px;">
              <h4 style="font-size: 13.5px; margin-bottom: 3px; color: var(--text-pure-white);">Blatant PvP Mode (Max Performance)</h4>
              <p style="font-size: 12.5px;">
                Zero-delay AutoCrystal, AutoAnchor detonator, Double-Hand totem swapping, Freecam cavern exploration, and infinite glide ElytraFly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ==================== LIVE INTERACTIVE CLICKGUI SIMULATOR ==================== -->
  <section class="clickgui-interactive-section" id="clickgui-section">
    <div class="flow-container">
      <div class="section-header-center">
        <div class="section-tag">Interactive Client GUI</div>
        <h2 class="section-title">Exact In-Browser Flow ClickGUI</h2>
        <p class="section-desc">
          Test drive Flow’s complete native Java ClickGUI directly in your browser. 
          <strong>Left click</strong> any module to toggle it. <strong>Right click</strong> to expand keybinds and subsettings (sliders, switches, colors). 
          Drag category windows anywhere on the canvas!
        </p>
      </div>

      <!-- ClickGUI Simulator Frame -->
      <div class="gui-simulator-frame">
        <div class="gui-frame-header">
          <div class="gui-window-controls">
            <span class="gui-dot"></span>
            <span class="gui-dot"></span>
            <span class="gui-dot"></span>
          </div>
          <div class="gui-frame-title">Flow Client v1.0.0 (Minecraft 1.21.11 Fabric) • ClickGUI Screen</div>
          <div class="gui-hint-badge">Press [ Right Shift ] or click below</div>
        </div>

        <!-- In-Browser ClickGUI Root Container -->
        <div id="clickguiContainer"></div>
      </div>
    </div>
  </section>

  <!-- ==================== DISCORD & PURCHASE ACCESS SECTION ==================== -->
  <section class="access-section" id="access">
    <div class="flow-container">
      <div class="access-box-card">
        <div class="access-header">
          <div class="section-tag">Premium Client</div>
          <h2>Get Flow Client Access</h2>
          <p>Flow Client is a premium client. Join our Discord community to purchase an access key, receive instant updates, and access our private config repository.</p>
        </div>

        <div class="access-action-row">
          <a href="https://discord.gg/A3G6X5hWfn" target="_blank" rel="noopener noreferrer" class="btn-join-discord-main">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span>Join Discord: discord.gg/A3G6X5hWfn</span>
          </a>
        </div>

        <!-- 3 Perks -->
        <div class="access-perks-grid">
          <div class="perk-card">
            <div class="perk-number">PERK 01</div>
            <h4>Instant Key Delivery</h4>
            <p>Automated license generation and launcher access immediately after joining.</p>
          </div>
          <div class="perk-card">
            <div class="perk-number">PERK 02</div>
            <h4>Continuous 1.21.11 Updates</h4>
            <p>Automatic bypass updates for DonutSMP, GrimAC, Vulcan, and Polar.</p>
          </div>
          <div class="perk-card">
            <div class="perk-number">PERK 03</div>
            <h4>Community & Presets</h4>
            <p>Verified base hunters sharing secret presets, dupe configs, and coordinates.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ==================== FAQ SECTION ==================== -->
  <section class="faq-section" id="faq">
    <div class="flow-container">
      <div class="section-header-center">
        <div class="section-tag">Information</div>
        <h2 class="section-title">Frequently Asked Questions</h2>
        <p class="section-desc">Everything you need to know about Flow Client and DonutSMP base finding.</p>
      </div>

      <div class="faq-list">
        <div class="faq-item is-open">
          <div class="faq-question">
            <span>How do I purchase and get Flow Client?</span>
            <span class="faq-toggle-icon">+</span>
          </div>
          <div class="faq-answer">
            Join our official Discord server at <a href="https://discord.gg/A3G6X5hWfn" target="_blank" style="text-decoration: underline; color: #5865F2;">discord.gg/A3G6X5hWfn</a> and open a ticket. Our automated bot system will deliver your client key and launcher setup instantly.
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question">
            <span>How does Sus Chunk Finder find bases on DonutSMP without getting banned?</span>
            <span class="faq-toggle-icon">+</span>
          </div>
          <div class="faq-answer">
            Sus Chunk Finder works completely client-side by analyzing world chunk packets already sent to your client by the server. It performs zero illegal packet requests and operates on a 4-chunk-per-tick queue, making it 100% undetectable to server-side anticheats.
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question">
            <span>What signals trigger the Sus Chunk Finder?</span>
            <span class="faq-toggle-icon">+</span>
          </div>
          <div class="faq-answer">
            Flow evaluates 10 unique heuristic signals: underground containers below Y55 (chests, shulkers, barrels), armor stands and item frames, workstations and beds, obsidian portal rooms, horizontally rotated deepslate blocks, redstone clocks/pistons, artificial light sources, villagers/tamed pets, and multi-geode clustering.
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question">
            <span>How do I open the ClickGUI in Minecraft?</span>
            <span class="faq-toggle-icon">+</span>
          </div>
          <div class="faq-answer">
            By default, press <strong>Right Shift</strong> on your keyboard. You can also rebind any individual module or access presets through the bottom "CONFIGS" button.
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ==================== FOOTER ==================== -->
  <footer class="flow-footer">
    <div class="flow-container">
      <div class="footer-top-row">
        <div class="brand-logo">
          <span class="logo-text-spaced">flow</span>
          <span class="logo-version-badge">v1.0.0</span>
        </div>
        <div style="display: flex; gap: 20px; font-size: 13px; color: var(--text-muted);">
          <a href="#hero" class="nav-link">Overview</a>
          <a href="#donutsmp" class="nav-link">Sus Chunk Finder</a>
          <a href="#clickgui-section" class="nav-link">Live GUI</a>
          <a href="https://discord.gg/A3G6X5hWfn" target="_blank" style="color: #5865F2;">Discord</a>
        </div>
      </div>

      <div class="footer-bottom-row">
        <span>© 2026 Flow Client. Built for Fabric 1.21.11 & DonutSMP.</span>
        <span>Crafted for high performance, aesthetics, and stealth.</span>
      </div>
    </div>
  </footer>

  <!-- Embedded Modular Scripts -->
  <script>
""" + js_content + """
  </script>
</body>
</html>
"""

with open(os.path.join(site_dir, "index.html"), "w", encoding="utf-8") as out:
    out.write(html_body)

print("Built index.html with Interactive Spotlight Tour, Blue Next Button, Auto-Scroll, and Audio integration!")
