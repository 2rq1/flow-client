// Flow Interactive Spotlight Guide
// High-precision spotlight positioning, 1/5 counter, and clean non-AI HUD

class FlowTourGuide {
  constructor() {
    this.currentStep = 0;
    this.isActive = false;
    this.overlay = null;
    this.card = null;
    this.spotlight = null;
    this.activeTargetEl = null;

    this.steps = [
      {
        target: '#floatingIsland',
        scrollTarget: null,
        title: 'Soundtrack & Controls',
        desc: 'Click the speaker icon to mute or unmute music. Drag the slider to adjust volume.',
        isFixedDock: true
      },
      {
        target: '.hero-brand-center',
        scrollTarget: '#hero',
        title: 'Interactive Wave Ribbon',
        desc: 'Move your mouse across the silver wireframe ribbon to interact with wave physics.',
        placement: 'bottom'
      },
      {
        target: '.radar-viewport-container',
        scrollTarget: '#donutsmp',
        title: 'Sus Chunk Radar',
        desc: 'Click anywhere on the radar map to simulate scanning for underground bases.',
        placement: 'bottom'
      },
      {
        target: '#clickgui-section .gui-simulator-frame',
        scrollTarget: '#clickgui-section',
        title: 'ClickGUI Simulator',
        desc: 'Left-click any module to toggle it. Right-click to open sliders, switches, and keybinds.',
        placement: 'top'
      },
      {
        target: '#access .access-box-card',
        scrollTarget: '#access',
        title: 'Discord & Client Access',
        desc: 'Flow is a premium client. Join discord.gg/A3G6X5hWfn to purchase access keys and configs.',
        placement: 'top'
      }
    ];

    this.init();
  }

  init() {
    this.createTourDOM();
    this.bindEvents();

    // Nav guide button trigger
    const startTourBtn = document.getElementById('btnStartTourNav');
    if (startTourBtn) {
      startTourBtn.addEventListener('click', () => {
        if (window.flowAudio) window.flowAudio.play(false);
        this.startTour();
      });
    }

    // Auto-start the tour only on first visit (saved in localStorage)
    setTimeout(() => {
      try {
        if (!localStorage.getItem('flow_tour_completed')) {
          this.startTour();
        }
      } catch (e) {
        this.startTour();
      }
    }, 250);
  }

  createTourDOM() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'flow-tour-overlay';
    this.overlay.style.display = 'none';

    this.spotlight = document.createElement('div');
    this.spotlight.className = 'flow-tour-spotlight';
    this.spotlight.style.display = 'none';

    this.card = document.createElement('div');
    this.card.className = 'flow-tour-card';
    this.card.style.display = 'none';

    document.body.appendChild(this.overlay);
    document.body.appendChild(this.spotlight);
    document.body.appendChild(this.card);
  }

  startTour() {
    this.isActive = true;
    this.currentStep = 0;
    document.body.classList.add('flow-tour-active');
    
    this.overlay.style.display = 'block';
    this.spotlight.style.display = 'block';
    this.card.style.display = 'block';

    if (window.flowAudio) {
      window.flowAudio.play(false);
    }

    this.renderStep();
  }

  renderStep() {
    const total = this.steps.length;
    const step = this.steps[this.currentStep];
    if (!step) {
      this.finishTour();
      return;
    }

    if (this.activeTargetEl) {
      this.activeTargetEl.classList.remove('flow-tour-target-active');
    }

    const targetEl = document.querySelector(step.target);
    const scrollEl = step.scrollTarget ? document.querySelector(step.scrollTarget) : null;
    this.activeTargetEl = targetEl;

    if (targetEl) {
      targetEl.classList.add('flow-tour-target-active');
    }

    // Auto-scroll to target section if in page
    if (scrollEl) {
      scrollEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Delay slightly to let smooth scrolling complete
    setTimeout(() => {
      this.updateSpotlightAndCard(targetEl, step);
    }, scrollEl ? 320 : 60);

    if (window.flowAudio) window.flowAudio.playClick();
  }

  updateSpotlightAndCard(targetEl, step) {
    if (!targetEl) return;
    const rect = targetEl.getBoundingClientRect();
    const total = this.steps.length;
    const progressPct = Math.round(((this.currentStep + 1) / total) * 100);

    const cardW = 310;
    const cardH = 150;

    if (step.isFixedDock) {
      // Step 1: Bottom Floating Island Dock
      const pad = 6;
      this.spotlight.style.position = 'fixed';
      this.spotlight.style.top = `${Math.round(rect.top - pad)}px`;
      this.spotlight.style.left = `${Math.round(rect.left - pad)}px`;
      this.spotlight.style.width = `${Math.round(rect.width + pad * 2)}px`;
      this.spotlight.style.height = `${Math.round(rect.height + pad * 2)}px`;

      this.card.style.position = 'fixed';
      this.card.style.top = 'auto';
      this.card.style.bottom = `${Math.round(window.innerHeight - rect.top + 16)}px`;
      this.card.style.left = `${Math.round(rect.left + (rect.width / 2) - (cardW / 2))}px`;
    } else {
      // In-page sections (Hero, Radar, ClickGUI, Access)
      const pad = 10;
      this.spotlight.style.position = 'absolute';
      this.spotlight.style.top = `${Math.round(rect.top - pad + window.scrollY)}px`;
      this.spotlight.style.left = `${Math.round(rect.left - pad + window.scrollX)}px`;
      this.spotlight.style.width = `${Math.round(rect.width + pad * 2)}px`;
      this.spotlight.style.height = `${Math.round(rect.height + pad * 2)}px`;

      let cardTop;
      if (step.placement === 'top') {
        cardTop = rect.top + window.scrollY - cardH - 16;
      } else {
        cardTop = rect.bottom + window.scrollY + 16;
      }
      let cardLeft = rect.left + window.scrollX + (rect.width / 2) - (cardW / 2);

      // Clamp horizontally to screen
      cardLeft = Math.max(16, Math.min(window.innerWidth - cardW - 16, cardLeft));
      cardTop = Math.max(80, cardTop);

      this.card.style.position = 'absolute';
      this.card.style.bottom = 'auto';
      this.card.style.top = `${Math.round(cardTop)}px`;
      this.card.style.left = `${Math.round(cardLeft)}px`;
    }

    // Render Card with clean 1/5 counter
    this.card.innerHTML = `
      <div class="tour-card-header">
        <span class="tour-counter">${this.currentStep + 1}/${total}</span>
        <button class="tour-close-btn" id="btnTourClose" title="Close">&times;</button>
      </div>

      <div class="tour-progress-bar">
        <div class="tour-progress-fill" style="width: ${progressPct}%;"></div>
      </div>

      <div class="tour-card-body">
        <h4 class="tour-card-title">${step.title}</h4>
        <p class="tour-card-desc">${step.desc}</p>
      </div>

      <div class="tour-card-footer">
        <div class="tour-card-actions">
          ${this.currentStep > 0 ? `<button class="tour-btn-prev" id="btnTourPrev">Back</button>` : ''}
          <button class="tour-btn-next-blue" id="btnTourNext">
            <span>${this.currentStep === total - 1 ? 'Done ✓' : 'Next →'}</span>
          </button>
        </div>
      </div>
    `;

    const btnNext = this.card.querySelector('#btnTourNext');
    const btnPrev = this.card.querySelector('#btnTourPrev');
    const btnClose = this.card.querySelector('#btnTourClose');

    if (btnNext) {
      btnNext.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.flowAudio) window.flowAudio.play(false);
        this.currentStep++;
        this.renderStep();
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.flowAudio) window.flowAudio.play(false);
        this.currentStep--;
        this.renderStep();
      });
    }

    if (btnClose) {
      btnClose.addEventListener('click', (e) => {
        e.stopPropagation();
        this.finishTour();
      });
    }
  }

  finishTour() {
    this.isActive = false;
    document.body.classList.remove('flow-tour-active');
    
    if (this.activeTargetEl) {
      this.activeTargetEl.classList.remove('flow-tour-target-active');
      this.activeTargetEl = null;
    }

    this.overlay.style.display = 'none';
    this.spotlight.style.display = 'none';
    this.card.style.display = 'none';

    // Persist completion state so the tour does not auto-open again
    try {
      localStorage.setItem('flow_tour_completed', 'true');
    } catch (e) {}
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      if (this.isActive) {
        const step = this.steps[this.currentStep];
        if (step) {
          const targetEl = document.querySelector(step.target);
          this.updateSpotlightAndCard(targetEl, step);
        }
      }
    }, { passive: true });

    window.addEventListener('keydown', (e) => {
      if (!this.isActive) return;
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        this.currentStep++;
        this.renderStep();
      } else if (e.key === 'ArrowLeft') {
        if (this.currentStep > 0) {
          this.currentStep--;
          this.renderStep();
        }
      } else if (e.key === 'Escape') {
        this.finishTour();
      }
    });
  }
}

window.FlowTourGuide = FlowTourGuide;
