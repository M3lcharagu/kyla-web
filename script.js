/* KYLA motion bridge. The complete interaction engine remains the requested baseline; this wrapper adds only lightweight visual state. */
(() => {
  'use strict';
  const BASELINE = 'https://raw.githubusercontent.com/M3lcharagu/kyla-web/4c63ef67174fa12f3e08271c5c2652c4486dd135/script.js';
  const loadBaseline = () => {
    const script = document.createElement('script');
    script.src = BASELINE;
    script.async = false;
    script.onload = initMotion;
    script.onerror = initMotion;
    document.head.appendChild(script);
  };
  const initMotion = () => {
    if (window.__kylaMotionReady) return;
    window.__kylaMotionReady = true;
    const body = document.body;
    if (!body) return;
    document.documentElement.classList.add('motion-ready');
    const chat = document.getElementById('chat-modal');
    const chatLog = document.getElementById('chat-log');
    const weather = document.getElementById('season-select');
    const setTalking = (on) => {
      body.classList.toggle('motion-talking', Boolean(on));
      if (on) window.setTimeout(() => body.classList.remove('motion-talking'), 2600);
    };
    const syncWeather = () => {
      const value = weather ? weather.value : '';
      body.dataset.motionWeather = value === 'rainy' ? 'rain' : value === 'cloudy' ? 'cloudy' : '';
    };
    const syncChat = () => {
      const open = Boolean(chat && !chat.hidden);
      body.classList.toggle('motion-listening', open);
      if (!open) body.classList.remove('motion-talking');
    };
    const markRecentAgentMessage = () => {
      if (!chatLog) return;
      const messages = chatLog.querySelectorAll('.chat-message');
      const last = messages[messages.length - 1];
      if (last && !last.classList.contains('from-me')) setTalking(true);
    };
    syncWeather();
    syncChat();
    document.addEventListener('visibilitychange', () => body.classList.toggle('is-document-hidden', document.hidden));
    weather?.addEventListener('change', syncWeather, { passive: true });
    chat && new MutationObserver(syncChat).observe(chat, { attributes: true, attributeFilter: ['hidden'] });
    chatLog && new MutationObserver(markRecentAgentMessage).observe(chatLog, { childList: true, subtree: true });
    document.addEventListener('submit', (event) => {
      if (event.target && event.target.id === 'chat-form') window.setTimeout(() => setTalking(true), 650);
    });
    document.addEventListener('click', (event) => {
      const trigger = event.target.closest && event.target.closest('.chat-open');
      if (trigger) window.requestAnimationFrame(syncChat);
    }, { passive: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', loadBaseline, { once: true });
  else loadBaseline();
})();
