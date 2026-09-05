// Flow Client Interactive ClickGUI Simulator
// Pixel-perfect replica of Flow Client's Java GUI & Config Engine

class FlowClickGUI {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.modules = JSON.parse(JSON.stringify(FLOW_MODULES));
    this.categories = FLOW_CATEGORIES;
    this.searchQuery = '';
    this.activeBindingModule = null;
    this.draggedPanel = null;
    this.dragOffset = { x: 0, y: 0 };
    this.panelPositions = {};

    this.init();
  }

  init() {
    this.render();
    this.attachGlobalListeners();
    this.updateActiveHUD();
  }

  render() {
    this.container.innerHTML = `
      <div class="flow-gui-workspace" id="flowGuiWorkspace">
        <!-- In-game HUD Simulator Layer -->
        <div class="flow-hud-overlay" id="flowHudOverlay">
          <!-- Flow+ Top Left Watermark -->
          <div class="flow-hud-watermark" id="hudWatermark">
            <span class="hud-flow-brand">f l o w</span>
            <span class="hud-divider">|</span>
            <span class="hud-stat-badge" id="hudFps">240 FPS</span>
            <span class="hud-stat-badge" id="hudPing">18ms</span>
            <span class="hud-stat-badge" id="hudCoords">X: 1,420 Y: 68 Z: -3,890</span>
          </div>

          <!-- Active Modules List (Top Right) -->
          <div class="flow-hud-arraylist" id="hudArrayList"></div>

          <!-- Spotify HUD (Bottom Left) -->
          <div class="flow-hud-spotify" id="hudSpotify">
            <div class="spotify-art">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.42c-.18.3-.57.4-.87.21-2.39-1.46-5.4-1.79-8.95-.98-.34.08-.68-.14-.76-.48-.08-.34.14-.68.48-.76 3.9-.89 7.23-.51 9.89 1.14.3.19.4.58.21.87zm1.22-2.72c-.23.37-.72.49-1.09.26-2.73-1.68-6.9-2.17-10.13-1.19-.42.13-.86-.11-.99-.53-.13-.42.11-.86.53-.99 3.69-1.12 8.3-.57 11.42 1.36.37.23.49.72.26 1.09zm.13-2.83C14.67 9.07 9.28 8.89 6.17 9.84c-.49.15-1.02-.13-1.17-.62-.15-.49.13-1.02.62-1.17 3.63-1.1 9.61-.89 13.43 1.38.44.26.59.84.33 1.28-.26.44-.84.59-1.28.33z"/>
              </svg>
            </div>
            <div class="spotify-meta">
              <div class="spotify-title">Flow Theme (Binaural Beats)</div>
              <div class="spotify-artist">DonutSMP Hunting Beats</div>
              <div class="spotify-progress-bar"><div class="spotify-progress-fill"></div></div>
            </div>
          </div>
        </div>

        <!-- Notification Toasts Layer -->
        <div class="flow-notifications-container" id="flowNotifications"></div>

        <!-- Panels Container -->
        <div class="flow-panels-container" id="flowPanelsContainer">
          ${this.categories.map((cat, idx) => this.renderCategoryPanel(cat, idx)).join('')}
        </div>

        <!-- Floating Bottom GUI Bar (CONFIGS + SEARCH BAR) -->
        <div class="flow-gui-bottom-bar">
          <button class="flow-gui-btn flow-btn-configs" id="btnGuiConfigs" title="Manage Config Profiles">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
            <span>CONFIGS</span>
          </button>
          
          <div class="flow-gui-search-box" id="guiSearchBox">
            <svg class="search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="guiSearchInput" placeholder="SEARCH MODULES..." value="${this.searchQuery}" spellcheck="false" autocomplete="off" />
            <button class="search-clear-btn" id="guiSearchClear" style="display: ${this.searchQuery ? 'block' : 'none'};">&times;</button>
          </div>

          <button class="flow-gui-btn flow-btn-reset" id="btnGuiReset" title="Reset Panels Grid">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
            <span>RESET LAYOUT</span>
          </button>
        </div>
      </div>

      <!-- Config Presets Modal -->
      <div class="flow-modal-backdrop" id="configModal" style="display: none;">
        <div class="flow-modal-card">
          <div class="modal-header">
            <h3>Flow Client Configurations</h3>
            <button class="modal-close" id="configModalClose">&times;</button>
          </div>
          <div class="modal-body">
            <p class="modal-subtitle">Load official tailored configs optimized for specific playstyles & servers.</p>
            <div class="config-presets-grid">
              <div class="config-preset-item" data-preset="donutsmp">
                <div class="preset-icon">🍩</div>
                <div class="preset-info">
                  <h4>DonutSMP Base Hunter</h4>
                  <p>Sus Chunk Finder optimized, Stash Finder, Staff Detector & Safe AutoTotem.</p>
                </div>
                <button class="preset-load-btn">LOAD</button>
              </div>
              <div class="config-preset-item" data-preset="ghost">
                <div class="preset-icon">👻</div>
                <div class="preset-info">
                  <h4>Undetected Ghost PVP</h4>
                  <p>Legit AimAssist, 14 CPS randomized jitter, SafeWalk & subtle ESP.</p>
                </div>
                <button class="preset-load-btn">LOAD</button>
              </div>
              <div class="config-preset-item" data-preset="blatant">
                <div class="preset-icon">⚔️</div>
                <div class="preset-info">
                  <h4>Blatant Crystal & Anchor</h4>
                  <p>0-delay AutoCrystal, AutoAnchor, AutoDoubleHand & Freecam.</p>
                </div>
                <button class="preset-load-btn">LOAD</button>
              </div>
              <div class="config-preset-item" data-preset="default">
                <div class="preset-icon">✨</div>
                <div class="preset-info">
                  <h4>Flow Default Profile</h4>
                  <p>Balanced configuration with essential render and utility modules.</p>
                </div>
                <button class="preset-load-btn">LOAD</button>
              </div>
            </div>
            
            <div class="config-actions-row">
              <button class="config-action-btn" id="btnExportConfig">Export JSON Config</button>
              <button class="config-action-btn" id="btnImportConfig">Import JSON Config</button>
              <input type="file" id="configFileInput" accept=".json" style="display: none;" />
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  renderCategoryPanel(category, idx) {
    const defaultX = 24 + idx * 190;
    const defaultY = 24;
    const pos = this.panelPositions[category.id] || { x: defaultX, y: defaultY };

    const catModules = this.modules.filter(m => {
      if (m.category !== category.id) return false;
      if (!this.searchQuery) return true;
      const q = this.searchQuery.toLowerCase();
      return m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q);
    });

    return `
      <div class="flow-category-panel" id="panel-${category.id}" style="left: ${pos.x}px; top: ${pos.y}px;" data-category="${category.id}">
        <!-- Header (Drag Handle) -->
        <div class="panel-header" data-drag-handle="true">
          <span class="panel-title">${category.name.toUpperCase()}</span>
          <span class="panel-count">${catModules.length}</span>
        </div>

        <!-- Modules List -->
        <div class="panel-modules-list">
          ${catModules.length === 0 ? `
            <div class="panel-empty-search">No matches</div>
          ` : catModules.map(mod => this.renderModuleButton(mod)).join('')}
        </div>
      </div>
    `;
  }

  renderModuleButton(mod) {
    const isBinding = this.activeBindingModule === mod.key;
    const bindLabel = isBinding ? '[ Press Key... ]' : (mod.keybind !== 'NONE' ? `[ ${mod.keybind} ]` : '[ NONE ]');

    return `
      <div class="flow-module-wrapper ${mod.expanded ? 'is-expanded' : ''}" data-module-key="${mod.key}">
        <div class="flow-module-button ${mod.enabled ? 'is-enabled' : ''} ${mod.highlight ? 'is-highlighted' : ''}" 
             data-action="toggle-module" 
             title="${mod.description} (Left click to toggle, Right click for settings)">
          <div class="module-btn-content">
            <span class="module-name">${mod.name.toUpperCase()}</span>
            ${mod.settings && mod.settings.length > 0 ? `
              <span class="module-expand-indicator ${mod.expanded ? 'rotated' : ''}">▸</span>
            ` : ''}
          </div>
        </div>

        <!-- Subsettings Accordion (Right Click Dropdown) -->
        ${mod.expanded ? `
          <div class="flow-module-dropdown">
            <!-- Keybind Selector Row -->
            <div class="setting-row setting-keybind" data-action="bind-key" data-module-key="${mod.key}">
              <span class="setting-label">KEYBIND</span>
              <span class="setting-bind-badge ${isBinding ? 'is-listening' : ''}">${bindLabel}</span>
            </div>

            <!-- Settings list -->
            ${mod.settings ? mod.settings.map((s, sIdx) => this.renderSettingComponent(mod, s, sIdx)).join('') : ''}
          </div>
        ` : ''}
      </div>
    `;
  }

  renderSettingComponent(mod, setting, sIdx) {
    if (setting.type === 'boolean') {
      return `
        <div class="setting-row setting-boolean" data-action="toggle-setting" data-module-key="${mod.key}" data-setting-idx="${sIdx}">
          <span class="setting-label">${setting.name}</span>
          <div class="flow-toggle-switch ${setting.value ? 'is-active' : ''}">
            <div class="toggle-knob"></div>
          </div>
        </div>
      `;
    } else if (setting.type === 'number') {
      const pct = Math.min(100, Math.max(0, ((setting.value - setting.min) / (setting.max - setting.min)) * 100));
      return `
        <div class="setting-row setting-number" data-module-key="${mod.key}" data-setting-idx="${sIdx}">
          <div class="setting-header-row">
            <span class="setting-label">${setting.name}</span>
            <span class="setting-num-val">§b${typeof setting.value === 'number' ? setting.value.toFixed(1) : setting.value}</span>
          </div>
          <div class="flow-slider-container">
            <input type="range" class="flow-slider-range" 
                   min="${setting.min}" max="${setting.max}" step="${setting.step || 0.1}" 
                   value="${setting.value}" 
                   data-module-key="${mod.key}" data-setting-idx="${sIdx}" />
            <div class="slider-track-fill" style="width: ${pct}%"></div>
          </div>
        </div>
      `;
    } else if (setting.type === 'color') {
      const hexStr = typeof setting.value === 'number' 
        ? '#' + (setting.value & 0xFFFFFF).toString(16).padStart(6, '0') 
        : (setting.value.startsWith('0x') ? '#' + setting.value.replace('0x', '').slice(-6) : setting.value);
      return `
        <div class="setting-row setting-color" data-action="cycle-color" data-module-key="${mod.key}" data-setting-idx="${sIdx}">
          <span class="setting-label">${setting.name}</span>
          <div class="color-swatch-box" style="background-color: ${hexStr};"></div>
        </div>
      `;
    } else if (setting.type === 'string') {
      return `
        <div class="setting-row setting-string">
          <span class="setting-label">${setting.name}</span>
          <input type="text" class="flow-setting-input" 
                 value="${setting.value}" 
                 data-module-key="${mod.key}" data-setting-idx="${sIdx}" spellcheck="false" />
        </div>
      `;
    } else if (setting.type === 'button') {
      return `
        <div class="setting-row setting-button">
          <button class="flow-setting-action-btn" data-action="click-setting-button" data-module-key="${mod.key}" data-setting-name="${setting.name}">
            ${setting.name.toUpperCase()}
          </button>
        </div>
      `;
    }
    return '';
  }

  bindEvents() {
    const workspace = this.container.querySelector('#flowGuiWorkspace');

    // Module Left/Right click
    workspace.addEventListener('mousedown', (e) => {
      const moduleBtn = e.target.closest('[data-action="toggle-module"]');
      if (moduleBtn) {
        const wrapper = moduleBtn.closest('.flow-module-wrapper');
        const modKey = wrapper.getAttribute('data-module-key');
        const mod = this.modules.find(m => m.key === modKey);
        if (!mod) return;

        if (e.button === 0) { // Left Click: Toggle Module
          mod.enabled = !mod.enabled;
          if (window.flowAudio) window.flowAudio.playToggle(mod.enabled);
          this.showToast(mod.name, mod.enabled ? 'Enabled' : 'Disabled', mod.enabled ? 0x10B981 : 0xEF4444);
          this.render();
          this.updateActiveHUD();
        } else if (e.button === 2) { // Right Click: Expand Settings
          e.preventDefault();
          mod.expanded = !mod.expanded;
          if (window.flowAudio) window.flowAudio.playClick(650, 0.04);
          this.render();
        }
        return;
      }

      // Setting Boolean Toggle
      const boolRow = e.target.closest('[data-action="toggle-setting"]');
      if (boolRow && e.button === 0) {
        const modKey = boolRow.getAttribute('data-module-key');
        const sIdx = parseInt(boolRow.getAttribute('data-setting-idx'), 10);
        const mod = this.modules.find(m => m.key === modKey);
        if (mod && mod.settings && mod.settings[sIdx]) {
          mod.settings[sIdx].value = !mod.settings[sIdx].value;
          if (window.flowAudio) window.flowAudio.playClick(720, 0.03);
          this.render();
        }
        return;
      }

      // Keybind bind click
      const keybindRow = e.target.closest('[data-action="bind-key"]');
      if (keybindRow && e.button === 0) {
        const modKey = keybindRow.getAttribute('data-module-key');
        this.activeBindingModule = this.activeBindingModule === modKey ? null : modKey;
        if (window.flowAudio) window.flowAudio.playClick(850, 0.05);
        this.render();
        return;
      }

      // Setting Color Cycle
      const colorRow = e.target.closest('[data-action="cycle-color"]');
      if (colorRow && e.button === 0) {
        const modKey = colorRow.getAttribute('data-module-key');
        const sIdx = parseInt(colorRow.getAttribute('data-setting-idx'), 10);
        const mod = this.modules.find(m => m.key === modKey);
        if (mod && mod.settings && mod.settings[sIdx]) {
          const palette = [0x38BDF8, 0xF472B6, 0x10B981, 0xFBBF24, 0xA855F7, 0xEF4444, 0xFFFFFF];
          const cur = mod.settings[sIdx].value;
          const next = palette[(palette.indexOf(cur) + 1) % palette.length] || palette[0];
          mod.settings[sIdx].value = next;
          if (window.flowAudio) window.flowAudio.playClick(800, 0.03);
          this.render();
        }
        return;
      }

      // Setting Button Click
      const settingBtn = e.target.closest('[data-action="click-setting-button"]');
      if (settingBtn && e.button === 0) {
        const btnName = settingBtn.getAttribute('data-setting-name');
        if (window.flowAudio) window.flowAudio.playClick(900, 0.04);
        this.showToast('Config Manager', `Executed: ${btnName}`, 0x38BDF8);
        return;
      }

      // Panel Header Drag start
      const header = e.target.closest('[data-drag-handle="true"]');
      if (header && e.button === 0) {
        const panel = header.closest('.flow-category-panel');
        this.draggedPanel = panel;
        const rect = panel.getBoundingClientRect();
        this.dragOffset.x = e.clientX - rect.left;
        this.dragOffset.y = e.clientY - rect.top;
        panel.classList.add('is-dragging');
      }
    });

    // Prevent default context menu on GUI workspace
    workspace.addEventListener('contextmenu', (e) => {
      if (e.target.closest('.flow-category-panel') || e.target.closest('.flow-gui-bottom-bar')) {
        e.preventDefault();
      }
    });

    // Slider inputs
    workspace.addEventListener('input', (e) => {
      if (e.target.classList.contains('flow-slider-range')) {
        const modKey = e.target.getAttribute('data-module-key');
        const sIdx = parseInt(e.target.getAttribute('data-setting-idx'), 10);
        const val = parseFloat(e.target.value);
        const mod = this.modules.find(m => m.key === modKey);
        if (mod && mod.settings && mod.settings[sIdx]) {
          mod.settings[sIdx].value = val;
          const container = e.target.closest('.setting-number');
          const valDisplay = container.querySelector('.setting-num-val');
          const fill = container.querySelector('.slider-track-fill');
          if (valDisplay) valDisplay.textContent = `§b${val.toFixed(1)}`;
          if (fill) {
            const pct = Math.min(100, Math.max(0, ((val - mod.settings[sIdx].min) / (mod.settings[sIdx].max - mod.settings[sIdx].min)) * 100));
            fill.style.width = `${pct}%`;
          }
        }
      } else if (e.target.classList.contains('flow-setting-input')) {
        const modKey = e.target.getAttribute('data-module-key');
        const sIdx = parseInt(e.target.getAttribute('data-setting-idx'), 10);
        const mod = this.modules.find(m => m.key === modKey);
        if (mod && mod.settings && mod.settings[sIdx]) {
          mod.settings[sIdx].value = e.target.value;
        }
      }
    });

    // Search bar
    const searchInput = workspace.querySelector('#guiSearchInput');
    const searchClear = workspace.querySelector('#guiSearchClear');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        if (searchClear) searchClear.style.display = this.searchQuery ? 'block' : 'none';
        this.render();
      });
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.searchQuery = '';
          searchInput.value = '';
          this.render();
        }
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        this.searchQuery = '';
        if (searchInput) searchInput.value = '';
        this.render();
      });
    }

    // Configs button
    const btnConfigs = workspace.querySelector('#btnGuiConfigs');
    const configModal = workspace.querySelector('#configModal');
    const configModalClose = workspace.querySelector('#configModalClose');

    if (btnConfigs && configModal) {
      btnConfigs.addEventListener('click', () => {
        configModal.style.display = 'flex';
        if (window.flowAudio) window.flowAudio.playClick(700, 0.04);
      });
    }

    if (configModalClose && configModal) {
      configModalClose.addEventListener('click', () => {
        configModal.style.display = 'none';
      });
    }

    if (configModal) {
      configModal.addEventListener('click', (e) => {
        if (e.target === configModal) configModal.style.display = 'none';
      });

      // Config Presets click
      configModal.querySelectorAll('.config-preset-item').forEach(item => {
        item.addEventListener('click', () => {
          const presetName = item.getAttribute('data-preset');
          this.loadPreset(presetName);
          configModal.style.display = 'none';
        });
      });

      // Export / Import
      const btnExport = configModal.querySelector('#btnExportConfig');
      const btnImport = configModal.querySelector('#btnImportConfig');
      const fileInput = configModal.querySelector('#configFileInput');

      if (btnExport) {
        btnExport.addEventListener('click', () => this.exportConfig());
      }
      if (btnImport && fileInput) {
        btnImport.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => this.importConfigFile(e));
      }
    }

    // Reset Layout Button
    const btnReset = workspace.querySelector('#btnGuiReset');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        this.panelPositions = {};
        this.render();
        if (window.flowAudio) window.flowAudio.playClick(600, 0.05);
        this.showToast('Layout', 'Panels reset to default positions', 0x38BDF8);
      });
    }
  }

  attachGlobalListeners() {
    // Global Drag Move & Up
    window.addEventListener('mousemove', (e) => {
      if (this.draggedPanel) {
        const workspace = this.container.querySelector('#flowGuiWorkspace');
        if (!workspace) return;
        const wsRect = workspace.getBoundingClientRect();

        let newX = e.clientX - wsRect.left - this.dragOffset.x;
        let newY = e.clientY - wsRect.top - this.dragOffset.y;

        newX = Math.max(10, Math.min(wsRect.width - 180, newX));
        newY = Math.max(10, Math.min(wsRect.height - 60, newY));

        this.draggedPanel.style.left = `${newX}px`;
        this.draggedPanel.style.top = `${newY}px`;

        const catId = this.draggedPanel.getAttribute('data-category');
        if (catId) {
          this.panelPositions[catId] = { x: newX, y: newY };
        }
      }
    });

    window.addEventListener('mouseup', () => {
      if (this.draggedPanel) {
        this.draggedPanel.classList.remove('is-dragging');
        this.draggedPanel = null;
      }
    });

    // Global Key Listener for Keybinds
    window.addEventListener('keydown', (e) => {
      if (this.activeBindingModule) {
        e.preventDefault();
        const mod = this.modules.find(m => m.key === this.activeBindingModule);
        if (mod) {
          if (e.key === 'Escape' || e.key === 'Backspace' || e.key === 'Delete') {
            mod.keybind = 'NONE';
          } else {
            mod.keybind = e.key.toUpperCase();
          }
          this.showToast(mod.name, `Bound to [ ${mod.keybind} ]`, 0xFBBF24);
        }
        this.activeBindingModule = null;
        this.render();
        return;
      }

      // Check if pressed key toggles any module
      const pressedKey = e.key.toUpperCase();
      const matchedMod = this.modules.find(m => m.keybind === pressedKey && m.keybind !== 'NONE');
      if (matchedMod && document.activeElement.tagName !== 'INPUT') {
        matchedMod.enabled = !matchedMod.enabled;
        if (window.flowAudio) window.flowAudio.playToggle(matchedMod.enabled);
        this.showToast(matchedMod.name, matchedMod.enabled ? 'Enabled' : 'Disabled', matchedMod.enabled ? 0x10B981 : 0xEF4444);
        this.render();
        this.updateActiveHUD();
      }
    });
  }

  updateActiveHUD() {
    const list = this.container.querySelector('#hudArrayList');
    if (!list) return;

    const enabledMods = this.modules.filter(m => m.enabled);
    list.innerHTML = enabledMods.map((mod, i) => {
      const hue = (i * 18 + 195) % 360;
      return `
        <div class="hud-module-entry" style="--accent-hue: ${hue};">
          <span class="hud-module-text">${mod.name}</span>
        </div>
      `;
    }).join('');
  }

  showToast(title, message, color = 0x38BDF8) {
    const container = this.container.querySelector('#flowNotifications');
    if (!container) return;

    const hexColor = typeof color === 'number' ? '#' + (color & 0xFFFFFF).toString(16).padStart(6, '0') : color;
    const toast = document.createElement('div');
    toast.className = 'flow-toast-card';
    toast.style.borderLeftColor = hexColor;
    toast.innerHTML = `
      <div class="toast-title" style="color: ${hexColor};">${title}</div>
      <div class="toast-message">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-exit');
      setTimeout(() => toast.remove(), 350);
    }, 2800);
  }

  loadPreset(preset) {
    if (preset === 'donutsmp') {
      this.modules.forEach(m => {
        if (['SUSCHUNKFINDER', 'STAFFDETECTOR', 'STASHFINDER', 'STORAGEESP', 'AUTOTOTEM', 'AUTODOUBLEHAND', 'AUTOSPRINT', 'AUTOARMOR', 'FULLBRIGHT', 'NORENDER', 'FLOWPLUS', 'HUD'].includes(m.key)) {
          m.enabled = true;
        } else {
          m.enabled = false;
        }
      });
      this.showToast('Profile Loaded', 'DonutSMP Base Hunter config active', 0x0078FF);
    } else if (preset === 'ghost') {
      this.modules.forEach(m => {
        if (['AIMASSIST', 'AUTOCLICKER', 'SAFEWALK', 'AUTOSPRINT', 'AUTOARMOR', 'PLAYERESP', 'FULLBRIGHT', 'NORENDER', 'FLOWPLUS'].includes(m.key)) {
          m.enabled = true;
        } else {
          m.enabled = false;
        }
      });
      this.showToast('Profile Loaded', 'Undetected Ghost PvP config active', 0x10B981);
    } else if (preset === 'blatant') {
      this.modules.forEach(m => {
        if (['AUTOCRYSTAL', 'AUTOANCHOR', 'AUTODOUBLEHAND', 'AUTOTOTEM', 'FREECAM', 'ELYTRAFLY', 'SCAFFOLD', 'STORAGEESP', 'PLAYERESP', 'FULLBRIGHT', 'FLOWPLUS', 'HUD'].includes(m.key)) {
          m.enabled = true;
        } else {
          m.enabled = false;
        }
      });
      this.showToast('Profile Loaded', 'Blatant Crystal & Anchor config active', 0xEF4444);
    } else {
      this.modules = JSON.parse(JSON.stringify(FLOW_MODULES));
      this.showToast('Profile Loaded', 'Flow Default config restored', 0x38BDF8);
    }

    if (window.flowAudio) window.flowAudio.playRadarPing();
    this.render();
    this.updateActiveHUD();
  }

  exportConfig() {
    const configData = {
      client: 'Flow Client',
      version: '1.0.0',
      timestamp: Date.now(),
      modules: this.modules
    };
    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flow-config-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('Config Export', 'Configuration exported to file', 0x10B981);
  }

  importConfigFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.modules && Array.isArray(parsed.modules)) {
          this.modules = parsed.modules;
          this.render();
          this.updateActiveHUD();
          this.showToast('Config Import', 'Config loaded successfully!', 0x10B981);
        }
      } catch (err) {
        this.showToast('Config Error', 'Invalid JSON config file', 0xEF4444);
      }
    };
    reader.readAsText(file);
  }
}

window.FlowClickGUI = FlowClickGUI;
