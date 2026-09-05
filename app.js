// Main Application Controller for Flow Client Website

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Generative Ribbon & Particle Wave Canvas (Hero)
  const heroCanvas = new FlowHeroCanvas('flowWaveCanvas');

  // 2. Initialize Interactive In-Browser ClickGUI
  const clickGUI = new FlowClickGUI('clickguiContainer');
  window.flowClickGUI = clickGUI;

  // 3. Initialize DonutSMP Sus Chunk Finder Radar Simulator
  const radarSim = new DonutChunkRadarSim('radarCanvas', 'radarInfoPanel');
  window.radarSim = radarSim;

  // 4. Sensitivity Slider for Radar
  const radarSensSlider = document.getElementById('radarSensitivitySlider');
  const radarSensVal = document.getElementById('radarSensitivityVal');
  if (radarSensSlider && radarSensVal) {
    radarSensSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      radarSensVal.textContent = val;
      radarSim.setSensitivity(val);
    });
  }

  // 5. Sound Mute Toggle Button in Header
  const btnMute = document.getElementById('btnToggleAudio');
  if (btnMute) {
    btnMute.addEventListener('click', () => {
      const isMuted = window.flowAudio.toggleMute();
      btnMute.classList.toggle('is-muted', isMuted);
      btnMute.setAttribute('title', isMuted ? 'Unmute UI Audio' : 'Mute UI Audio');
      btnMute.innerHTML = isMuted ? `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
      ` : `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
      `;
    });
  }

  // 6. Navigation Smooth Scrolling & Active State
  const navLinks = document.querySelectorAll('.nav-link, .hero-cta-btn');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (window.flowAudio) window.flowAudio.playClick(750, 0.03);
        }
      }
    });
  });

  // 7. Right Shift Key Listener to jump straight to the GUI Simulator
  window.addEventListener('keydown', (e) => {
    if (e.code === 'ShiftRight') {
      const guiSec = document.getElementById('clickgui-section');
      if (guiSec) {
        guiSec.scrollIntoView({ behavior: 'smooth', block: 'center' });
        clickGUI.showToast('Flow Client', 'GUI opened with [ Right Shift ] key', 0x38BDF8);
        if (window.flowAudio) window.flowAudio.playToggle(true);
      }
    }
  });

  // 8. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        faqItems.forEach(fi => fi.classList.remove('is-open'));
        if (!isOpen) {
          item.classList.add('is-open');
          if (window.flowAudio) window.flowAudio.playClick(680, 0.03);
        }
      });
    }
  });

  // 9. Download Button & Notification
  const downloadBtns = document.querySelectorAll('.btn-download-client');
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      clickGUI.showToast('Download Started', 'Downloading Flow-1.0.0-Fabric-1.21.11.jar', 0x10B981);
      if (window.flowAudio) window.flowAudio.playRadarPing();
      
      // Generate a mock mod jar download trigger
      const dummyContent = 'Flow Client v1.0.0 for Minecraft 1.21.11 Fabric Loader';
      const blob = new Blob([dummyContent], { type: 'application/java-archive' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'flow-1.0.0-fabric-1.21.11.jar';
      a.click();
      URL.revokeObjectURL(url);
    });
  });

  // 10. Copy Launch Args
  const btnCopyArgs = document.getElementById('btnCopyArgs');
  if (btnCopyArgs) {
    btnCopyArgs.addEventListener('click', () => {
      const argsText = '-XX:+UseG1GC -Xmx4G -Dflow.anticheat=undetected';
      navigator.clipboard.writeText(argsText);
      clickGUI.showToast('JVM Flags', 'Copied recommended launch flags to clipboard!', 0x38BDF8);
      if (window.flowAudio) window.flowAudio.playClick(850, 0.03);
    });
  }
});
