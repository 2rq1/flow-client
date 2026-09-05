// Main Application Controller for Flow Client Website
// Connects Tour Guide, Dynamic Island Dock, Theme Switcher, Discord Redirect, Audio & GUI

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Generative Ribbon & Particle Wave Canvas (Hero)
  const heroCanvas = new FlowHeroCanvas('flowWaveCanvas');
  window.flowHeroCanvas = heroCanvas;

  // 2. Initialize Interactive In-Browser ClickGUI
  const clickGUI = new FlowClickGUI('clickguiContainer');
  window.flowClickGUI = clickGUI;

  // 3. Initialize DonutSMP Sus Chunk Finder Radar Simulator
  const radarSim = new DonutChunkRadarSim('radarCanvas', 'radarInfoPanel');
  window.radarSim = radarSim;

  // 4. Initialize Interactive Game-Like Onboarding Guide
  const tourGuide = new FlowTourGuide();
  window.tourGuide = tourGuide;

  // 5. Radar Sensitivity Slider
  const radarSensSlider = document.getElementById('radarSensitivitySlider');
  const radarSensVal = document.getElementById('radarSensitivityVal');
  if (radarSensSlider && radarSensVal) {
    radarSensSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      radarSensVal.textContent = val;
      radarSim.setSensitivity(val);
    });
  }

  // 6. Theme Switcher (Sun ☀️ <-> Half-Moon 🌙)
  const themeToggleBtns = document.querySelectorAll('.flow-theme-toggle-btn');
  let isLightMode = false;

  const sunIconSVG = `
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
  `;

  const halfMoonIconSVG = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
  `;

  themeToggleBtns.forEach(btn => {
    btn.innerHTML = sunIconSVG;
    btn.setAttribute('title', 'Switch to Light Theme');

    btn.addEventListener('click', () => {
      isLightMode = !isLightMode;
      document.body.classList.toggle('theme-light', isLightMode);

      themeToggleBtns.forEach(b => {
        b.innerHTML = isLightMode ? halfMoonIconSVG : sunIconSVG;
        b.setAttribute('title', isLightMode ? 'Switch to Dark Theme' : 'Switch to Light Theme');
      });

      if (heroCanvas) heroCanvas.setTheme(isLightMode);
      if (window.flowAudio) window.flowAudio.playClick();
      clickGUI.showToast('Theme', isLightMode ? 'Light Mode Active' : 'Dark Mode Active', isLightMode ? '#000000' : '#ffffff');
    });
  });

  // 7. Floating Island Dock Actions
  const islandBtnHome = document.getElementById('islandBtnHome');
  const islandBtnModules = document.getElementById('islandBtnModules');
  const islandBtnDiscord = document.getElementById('islandBtnDiscord');
  const islandBtnMute = document.getElementById('islandBtnMute');
  const islandVolumeSlider = document.getElementById('islandVolumeSlider');

  if (islandBtnHome) {
    islandBtnHome.addEventListener('click', () => {
      const hero = document.getElementById('hero');
      if (hero) hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (window.flowAudio) window.flowAudio.playClick();
    });
  }

  if (islandBtnModules) {
    islandBtnModules.addEventListener('click', () => {
      const guiSec = document.getElementById('clickgui-section');
      if (guiSec) guiSec.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (window.flowAudio) window.flowAudio.playClick();
    });
  }

  if (islandBtnDiscord) {
    islandBtnDiscord.addEventListener('click', () => {
      window.open('https://discord.gg/A3G6X5hWfn', '_blank');
      if (window.flowAudio) window.flowAudio.playClick();
    });
  }

  if (islandBtnMute) {
    islandBtnMute.addEventListener('click', () => {
      window.flowAudio.toggleMute();
    });
  }

  if (islandVolumeSlider) {
    islandVolumeSlider.addEventListener('input', (e) => {
      window.flowAudio.setVolume(e.target.value);
    });
  }

  // 8. Navigation Smooth Scrolling
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (window.flowAudio) window.flowAudio.playClick();
        }
      }
    });
  });

  // 9. Right Shift Key Listener
  window.addEventListener('keydown', (e) => {
    if (e.code === 'ShiftRight') {
      const guiSec = document.getElementById('clickgui-section');
      if (guiSec) {
        guiSec.scrollIntoView({ behavior: 'smooth', block: 'center' });
        clickGUI.showToast('Flow Client', 'GUI opened with [ Right Shift ] key', '#ffffff');
        if (window.flowAudio) window.flowAudio.playToggle(true);
      }
    }
  });

  // 10. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        faqItems.forEach(fi => fi.classList.remove('is-open'));
        if (!isOpen) {
          item.classList.add('is-open');
          if (window.flowAudio) window.flowAudio.playClick();
        }
      });
    }
  });
});
