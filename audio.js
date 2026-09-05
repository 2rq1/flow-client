// Flow Client Permanent Background Music Controller
// Hardcoded music.mp3 with Mute/Unmute icon button and Volume slider

class FlowAudioController {
  constructor() {
    this.audioElement = new Audio('music.mp3');
    this.audioElement.loop = true;
    this.volume = 0.5;
    this.audioElement.volume = this.volume;
    this.isMuted = false;
    this.hasStarted = false;

    this.init();
  }

  init() {
    // Attempt auto-play on initial load; fallback to first user interaction
    const startAudio = () => {
      if (!this.hasStarted) {
        this.hasStarted = true;
        this.play(true); // Start from beginning 0:00
      }
    };

    // Try starting immediately on load if browser policy allows
    this.play(true);

    // Ensure audio starts immediately from 0:00 on first user click, keypress, or touch
    window.addEventListener('click', startAudio, { once: true });
    window.addEventListener('keydown', startAudio, { once: true });
    window.addEventListener('touchstart', startAudio, { once: true });
    window.addEventListener('pointerdown', startAudio, { once: true });
  }

  play(fromStart = false) {
    if (this.audioElement) {
      if (fromStart) {
        try {
          this.audioElement.currentTime = 0;
        } catch (e) {}
      }
      this.audioElement.muted = this.isMuted;
      this.audioElement.volume = this.volume;
      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          this.hasStarted = true;
          this.updateUI();
        }).catch(() => {
          // Handled by browser interaction policy
        });
      }
      this.updateUI();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.audioElement) {
      this.audioElement.muted = this.isMuted;
      if (!this.isMuted && this.audioElement.paused) {
        this.play();
      }
    }
    this.updateUI();
    return this.isMuted;
  }

  setVolume(newVol) {
    this.volume = Math.max(0, Math.min(1, parseFloat(newVol)));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
      if (this.volume === 0) {
        this.isMuted = true;
        this.audioElement.muted = true;
      } else if (this.isMuted) {
        this.isMuted = false;
        this.audioElement.muted = false;
      }
    }
    this.updateUI();
  }

  updateUI() {
    const muteBtns = document.querySelectorAll('.flow-mute-toggle-btn');
    const volSliders = document.querySelectorAll('.flow-volume-slider');
    const volText = document.getElementById('volumePercentageText');

    muteBtns.forEach(btn => {
      btn.classList.toggle('is-muted', this.isMuted || this.volume === 0);
      btn.setAttribute('title', (this.isMuted || this.volume === 0) ? 'Unmute Music' : 'Mute Music');
      btn.innerHTML = (this.isMuted || this.volume === 0) ? `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
      ` : (this.volume < 0.4 ? `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
      ` : `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
      `);
    });

    volSliders.forEach(slider => {
      slider.value = this.isMuted ? 0 : this.volume;
    });

    if (volText) {
      volText.textContent = this.isMuted ? '0%' : `${Math.round(this.volume * 100)}%`;
    }
  }

  // Mechanical UI Sound Effects
  playClick() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.025);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.025);
    } catch (e) {}
  }

  playToggle(enabled) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(enabled ? 380 : 480, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(enabled ? 640 : 280, ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    } catch (e) {}
  }

  playRadarPing() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {}
  }
}

const flowAudio = new FlowAudioController();
window.flowAudio = flowAudio;
