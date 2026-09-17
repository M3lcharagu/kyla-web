/* KYLA performance bridge: keep the first paint local, then opt into the richer layers. */
(() => {
  'use strict';

  const root = document;
  const body = root.body;
  const enhancementAssets = ['kyla-enhancements.css', 'kyla-enhancements.js'];
  let enhancementPromise;
  let interactionStarted = false;
  let frameGuardInstalled = false;

  const idle = (callback, timeout = 2000) => {
    if ('requestIdleCallback' in window) {
      return window.requestIdleCallback(callback, { timeout });
    }
    return window.setTimeout(callback, Math.min(timeout, 1200));
  };

  const installFrameGuard = () => {
    if (frameGuardInstalled || typeof window.requestAnimationFrame !== 'function' || typeof window.cancelAnimationFrame !== 'function') return;
    frameGuardInstalled = true;

    const nativeRequestAnimationFrame = window.requestAnimationFrame.bind(window);
    const nativeCancelAnimationFrame = window.cancelAnimationFrame.bind(window);
    const jobs = new Map();
    let nextId = 1;
    let lastFrame = 0;
    const frameInterval = 1000 / 30;

    const schedule = (id) => {
      const job = jobs.get(id);
      if (!job || document.hidden || job.nativeId !== null) return;
      job.nativeId = nativeRequestAnimationFrame((timestamp) => {
        const current = jobs.get(id);
        if (!current) return;
        current.nativeId = null;
        if (document.hidden) return;
        if (timestamp - lastFrame < frameInterval) {
          schedule(id);
          return;
        }
        lastFrame = timestamp;
        jobs.delete(id);
        current.callback(timestamp);
      });
    };

    window.requestAnimationFrame = (callback) => {
      const id = nextId++;
      jobs.set(id, { callback, nativeId: null });
      schedule(id);
      return id;
    };

    window.cancelAnimationFrame = (id) => {
      const job = jobs.get(id);
      if (!job) return;
      if (job.nativeId !== null) nativeCancelAnimationFrame(job.nativeId);
      jobs.delete(id);
    };

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) return;
      jobs.forEach((job, id) => {
        if (job.nativeId === null) schedule(id);
      });
    }, { passive: true });
  };

  const loadEnhancements = () => {
    if (enhancementPromise) return enhancementPromise;

    enhancementPromise = new Promise((resolve) => {
      const finish = () => resolve(true);
      const css = enhancementAssets[0];
      const js = enhancementAssets[1];

      if (!root.querySelector(`link[data-kyla-layer="${css}"]`)) {
        const link = root.createElement('link');
        link.rel = 'stylesheet';
        link.href = css;
        link.dataset.kylaLayer = css;
        link.onload = finish;
        link.onerror = finish;
        root.head.appendChild(link);
      }

      if (!root.querySelector(`script[data-kyla-layer="${js}"]`)) {
        const script = root.createElement('script');
        script.src = js;
        script.defer = true;
        script.dataset.kylaLayer = js;
        script.onload = finish;
        script.onerror = finish;
        root.head.appendChild(script);
      } else {
        finish();
      }
    });

    return enhancementPromise;
  };

  const installAmbientBudget = () => {
    const style = root.createElement('style');
    style.id = 'kyla-performance-guard';
    style.textContent = `
      /* Keep the initial shell composited and make hidden-tab work free. */
      .command-center-grid, .cc-agent-card, .dashboard-card, .room-card { contain: layout paint; }
      .cc-agent-card, .dashboard-card, .room-card, .button, a { backface-visibility: hidden; }
      [data-kyla-hidden="true"] *, [data-kyla-hidden="true"] *::before, [data-kyla-hidden="true"] *::after {
        animation-play-state: paused !important;
      }
      @media (max-width: 760px) {
        .immersive-stage { contain: layout paint; }
        .immersive-stage canvas { max-width: 100%; }
      }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { animation-duration: .001ms !important; transition-duration: .001ms !important; }
      }
    `;
    root.head.appendChild(style);

    const syncVisibility = () => {
      const hidden = root.hidden || document.visibilityState === 'hidden';
      body.dataset.kylaHidden = hidden ? 'true' : 'false';
    };
    document.addEventListener('visibilitychange', syncVisibility, { passive: true });
    syncVisibility();
  };

  const syncMotionWeather = () => {
    const select = root.getElementById('season-select');
    if (!select) return;
    body.dataset.motionWeather = select.value === 'rainy' ? 'rain' : select.value === 'harmattan' ? 'cloudy' : '';
  };

  const beginInteraction = () => {
    if (interactionStarted) return;
    interactionStarted = true;
    loadEnhancements();
    body.classList.add('motion-listening');
  };

  const init = () => {
    if (window.__kylaPerformanceReady) return;
    window.__kylaPerformanceReady = true;
    installAmbientBudget();
    installFrameGuard();
    syncMotionWeather();

    const season = root.getElementById('season-select');
    season?.addEventListener('change', syncMotionWeather, { passive: true });

    ['pointerdown', 'keydown', 'touchstart', 'scroll'].forEach((eventName) => {
      root.addEventListener(eventName, beginInteraction, { once: true, passive: eventName !== 'keydown' });
    });

    /* Avatars and walk mode are useful after the shell is readable, not on the critical path. */
    idle(() => loadEnhancements(), 3500);
  };

  if (root.readyState === 'loading') {
    root.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
