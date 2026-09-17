(() => {
  'use strict';

  const AGENTS = [
    { id: 'claude', name: 'Claude', mark: 'CL', room: 'R1', roomName: 'Humanitas', role: 'Strategy + synthesis', tone: 'Warm, precise, service-led.' },
    { id: 'codex', name: 'Codex', mark: 'CX', room: 'R4', roomName: 'Industria', role: 'Code + release', tone: 'Methodical, exact, quietly fast.' },
    { id: 'copilot', name: 'Copilot', mark: 'CP', room: 'R3', roomName: 'Temperantia', role: 'Risk + order flow', tone: 'Curious, systematic, momentum-minded.' },
    { id: 'cursor', name: 'Cursor', mark: 'CU', room: 'R2', roomName: 'Patientia', role: 'Site craft + debugging', tone: 'Precise, observant, unhurried.' },
    { id: 'docker-agent', name: 'Docker Agent', mark: 'DK', room: 'R6', roomName: 'Gula', role: 'Delivery + environments', tone: 'Decisive, visual, production-ready.' },
    { id: 'droid', name: 'Droid', mark: 'DR', room: 'R5', roomName: 'Luxuria', role: 'Creative direction', tone: 'Observant, visual, composition-first.' },
    { id: 'shell', name: 'Shell', mark: 'SH', room: 'R7', roomName: 'Superbia', role: 'Routines + automation', tone: 'Grounded, direct, quietly capable.' }
  ];
  const KEY = 'kyla-command-center-v1';
  const $ = (selector, root = document) => root.querySelector(selector);
  const esc = (value) => String(value == null ? '' : value).replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));

  function load() {
    try {
      const parsed = JSON.parse(localStorage.getItem(KEY) || '{}');
      return { threads: parsed.threads && typeof parsed.threads === 'object' ? parsed.threads : {}, activity: Array.isArray(parsed.activity) ? parsed.activity : [] };
    } catch (_) { return { threads: {}, activity: [] }; }
  }
  function save(state) { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {} }
  function timeLabel(timestamp) { try { return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); } catch (_) { return 'now'; } }
  function getAgent(id) { return AGENTS.find((agent) => agent.id === id) || AGENTS[0]; }
  function defaultThread(agent) { return [{ from: 'agent', text: `${agent.name} online. Local mock thread ready for a useful next move.`, at: Date.now() }]; }
  function reply(agent, text) { return `${agent.name} queued “${text.slice(0, 74)}${text.length > 74 ? '…' : ''}”. Mock only — no external execution or provider call was made.`; }

  function threadMarkup(messages) {
    return messages.slice(-8).map((message) => `<div class="cc-message ${message.from === 'user' ? 'user' : ''}"><small>${message.from === 'user' ? 'YOU' : esc(message.agentName || 'AGENT')} · ${esc(timeLabel(message.at))}</small>${esc(message.text)}</div>`).join('');
  }

  function cardMarkup(agent, state) {
    const messages = state.threads[agent.id] || defaultThread(agent);
    return `<article class="cc-agent-card" data-agent-card="${esc(agent.id)}">
      <header class="cc-agent-head"><div><div class="cc-agent-name"><div class="cc-agent-mark" aria-hidden="true">${esc(agent.mark)}</div><div><h3>${esc(agent.name)}</h3><a class="cc-room-link" href="#room-${esc(agent.room.toLowerCase())}">${esc(agent.room)} / ${esc(agent.roomName)}</a></div></div></div><span class="cc-status"><i></i>ONLINE / MOCK</span></header>
      <p class="cc-description"><strong>${esc(agent.role)}.</strong> ${esc(agent.tone)}</p>
      <div class="cc-thread-label">OUTPUT / LOCAL THREAD</div>
      <div class="cc-thread" data-thread="${esc(agent.id)}" aria-live="polite">${threadMarkup(messages)}</div>
      <form class="cc-form" data-command-form="${esc(agent.id)}"><label class="sr-only" for="cc-input-${esc(agent.id)}">Command ${esc(agent.name)}</label><input id="cc-input-${esc(agent.id)}" name="command" placeholder="Send a mock command ↗" autocomplete="off"><button type="submit">Send ↗</button></form>
    </article>`;
  }

  function renderActivity(state) {
    const target = $('#cc-activity');
    if (!target) return;
    if (!state.activity.length) { target.innerHTML = '<p class="empty-state">No commands yet. The surface is ready.</p>'; return; }
    target.innerHTML = state.activity.slice(-5).reverse().map((item) => `<p class="activity-line"><b>${esc(item.agentName)}</b> · ${esc(item.text)}<br><small>${esc(timeLabel(item.at))}</small></p>`).join('');
  }

  function updateStats(state) {
    const total = state.activity.length;
    const rooms = $('#cc-stat-rooms');
    const agents = $('#cc-stat-agents');
    const active = $('#cc-stat-active');
    const commands = $('#cc-stat-commands');
    if (rooms) rooms.textContent = '14';
    if (agents) agents.textContent = String(AGENTS.length);
    if (active) active.textContent = String(AGENTS.length);
    if (commands) commands.textContent = String(total);
  }

  function submit(agentId, input, thread, state) {
    const text = input.value.trim();
    if (!text) return;
    const agent = getAgent(agentId);
    const now = Date.now();
    const messages = state.threads[agentId] || defaultThread(agent);
    messages.push({ from: 'user', text, at: now });
    messages.push({ from: 'agent', agentName: agent.name, text: reply(agent, text), at: now + 1 });
    state.threads[agentId] = messages.slice(-20);
    state.activity.push({ agentName: agent.name, text, at: now });
    state.activity = state.activity.slice(-30);
    save(state);
    thread.innerHTML = threadMarkup(state.threads[agentId]);
    thread.scrollTop = thread.scrollHeight;
    input.value = '';
    updateStats(state);
    renderActivity(state);
  }

  function init() {
    const root = $('#command-center-grid');
    if (!root) return;
    const state = load();
    root.innerHTML = AGENTS.map((agent) => cardMarkup(agent, state)).join('');
    root.querySelectorAll('[data-command-form]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const input = $('input[name="command"]', form);
        const card = form.closest('[data-agent-card]');
        const thread = card ? $('[data-thread]', card) : null;
        if (input && thread) submit(form.dataset.commandForm, input, thread, state);
      });
    });
    updateStats(state);
    renderActivity(state);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
