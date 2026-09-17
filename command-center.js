(() => {
  'use strict';

  const A = [
    {
      id: 'claude', name: 'Claude', mark: 'CL', room: 'R1', roomName: 'Humanitas', role: 'Strategy + philosophy',
      tone: 'Calm, precise, lightly dry.', bio: 'Finds the smallest useful move, then asks what it means.',
      greeting: ['A quiet strategy room is ready. What deserves attention first?', 'Hello. Let us name the outcome before we optimise the motion.'],
      catchphrases: ['Clarity is a form of kindness.', 'The reversible move is usually the wise one.'],
      spec: 'strategy, philosophy, synthesis',
      responses: {
        open: ['Opening the requested room. A good decision begins by giving the problem a proper chair.', 'The room is open. We can move carefully without mistaking caution for delay.'],
        status: ['Local status is calm: seven agents available, backend bridge idle, and no external work claimed.', 'The local system is steady. Nothing has been executed beyond this browser, which is refreshingly honest.'],
        deploy: ['Deployment checks can be staged locally: inspect the artifact, verify its environment, and keep rollback explicit.', 'I can outline a deployment review, but the provider remains outside this local simulation.'],
        backtest: ['Backtest planning is ready: define the window, fees, sizing, and failure criteria before trusting a pleasant chart.', 'A backtest can be framed locally. Market data and orders remain deliberately absent.'],
        generic: ['Let us turn that into a small, reversible next step.', 'The useful question is not only what to do, but what evidence would change our mind.']
      }
    },
    {
      id: 'codex', name: 'Codex', mark: 'CX', room: 'R4', roomName: 'Industria', role: 'Code + release',
      tone: 'Snappy, exact, quietly fast.', bio: 'Ships sharp code, clean contracts, and zero mystery regressions.',
      greeting: ['Codex online. Give me the task and the acceptance criteria.', 'Ready to ship the smallest useful diff. What is the target?'],
      catchphrases: ['Small diff, big signal.', 'If it is not reproducible, it is just lore.'],
      spec: 'code, architecture, release hygiene',
      responses: {
        open: ['Room opened. Scope acquired; now let us make the next move compile.', 'Open and ready. Bring the requirement, the constraint, and the failing case.'],
        status: ['Status: green locally. Seven agents, zero provider calls, maximum signal per pixel.', 'Local status is clean. No runtime writes happened, so the backend is still in spectator mode.'],
        deploy: ['Deploy check queued locally: build, diff, health check, rollback. No magical cloud button detected.', 'Release path is mapped. Pin the artifact, run health checks, keep rollback boring.'],
        backtest: ['Backtest plan loaded: deterministic inputs, explicit fees, reproducible output. No market-data DLC included.', 'Backtest mode is local only. Lock the assumptions before the chart starts doing fan fiction.'],
        generic: ['Make it concrete: input, output, constraint. Then we can delete the drama.', 'I can route that. Give me a testable definition of done.']
      }
    },
    {
      id: 'copilot', name: 'Copilot', mark: 'CP', room: 'R3', roomName: 'Temperantia', role: 'Code + QA',
      tone: 'Warm, systematic, momentum-minded.', bio: 'Keeps the team moving while politely counting every edge case.',
      greeting: ['Hi, I am here with a checklist and a second pair of eyes.', 'Welcome in. We can make progress and still test the corners.'],
      catchphrases: ['Happy path first, failure path too.', 'A tiny check now saves a larger mystery later.'],
      spec: 'coding, review, tests, risk',
      responses: {
        open: ['The room is open and I will keep the handoff clear. What should we verify first?', 'Opened with a friendly checklist: goal, happy path, empty state, then the sharp edges.'],
        status: ['Local status looks healthy. I would still verify persistence, mobile layout, and the no-backend boundary.', 'Everything is available locally. Let us call that green with a test plan attached.'],
        deploy: ['Deployment review is ready: artifact, environment, health route, rollback, and one failure case.', 'I can prepare the release checklist locally. The real provider still needs its own credentials and confirmation.'],
        backtest: ['Backtest setup is ready. Please include fees, slippage, date bounds, and a baseline so the result can be reviewed.', 'We can model the backtest locally, then test empty data and invalid inputs before celebrating.'],
        generic: ['I can help with that. What is the expected result, and what should happen when it is missing?', 'Let us make the next step clear, observable, and kind to the future reviewer.']
      }
    },
    {
      id: 'cursor', name: 'Cursor', mark: 'CU', room: 'R2', roomName: 'Patientia', role: 'Frontend craft',
      tone: 'Precise, observant, unhurried.', bio: 'Turns interaction, hierarchy, and motion into one coherent visual system.',
      greeting: ['The stage is set. Show me the interaction that should feel inevitable.', 'I am watching the hierarchy. What should the eye notice first?'],
      catchphrases: ['Every pixel should earn its entrance.', 'Polish is a system, not a final coat.'],
      spec: 'frontend, UX, debugging, iteration',
      responses: {
        open: ['The room opens with a clear focal point. I will keep the transition useful, not decorative.', 'Opening it now. The interface should make the next action feel obvious.'],
        status: ['The surface is stable locally. I am watching focus, hierarchy, and the narrow viewport where layouts tell the truth.', 'Local status is composed. No external calls; the visual system remains responsive and inspectable.'],
        deploy: ['Deployment preview can be checked locally: asset paths, loading state, health surface, and rollback affordance.', 'The release view is ready for inspection. Production still waits beyond this browser boundary.'],
        backtest: ['Backtest output should explain itself: stable labels, useful empty states, and no chart theatrics without data.', 'I can shape the local backtest view, including loading and no-data states. The market remains offstage.'],
        generic: ['I would make that the primary action, remove one competing signal, and verify the focus order.', 'Let us give the idea a shape the interface can defend.']
      }
    },
    {
      id: 'docker-agent', name: 'Docker Agent', mark: 'DK', room: 'R6', roomName: 'Gula', role: 'Deployment',
      tone: 'Decisive, visual, production-ready.', bio: 'Keeps services packaged, observable, and only mildly suspicious of host machines.',
      greeting: ['Container bay is calm. What are we packaging, and where should it land?', 'Ready for a clean handoff from source to service.'],
      catchphrases: ['It works in a container, which is a start.', 'Pin the image; surprises have poor uptime.'],
      spec: 'containers, deployment, environments',
      responses: {
        open: ['Room opened. I have the artifact path in view and the rollback hatch unlocked.', 'Opening the deployment room. We can keep the handoff crisp and the container honest.'],
        status: ['Local deployment status: artifact checks available, provider bridge idle, rollback path still theoretical.', 'The local stack is responsive. No image was pushed, because the registry was not invited.'],
        deploy: ['Deployment check simulated: artifact, environment, health route, and rollback path are ready for inspection.', 'Release checks are staged locally. Nothing was deployed; the container is behaving itself for once.'],
        backtest: ['Backtest is not a deployment. I can package the local workflow, but I will not pretend the market came along.', 'The backtest can run as a local artifact review. No data service or order path is connected.'],
        generic: ['I can package that into a clear next step. Tell me the artifact and the target environment.', 'Keep the boundary explicit: local command now, provider action only when connected.']
      }
    },
    {
      id: 'droid', name: 'Droid', mark: 'DR', room: 'R5', roomName: 'Luxuria', role: 'Automation',
      tone: 'Observant, visual, composition-first.', bio: 'Normalises inputs, automates the boring parts, and reports evidence with a straight face.',
      greeting: ['Input received. State the workflow.', 'Automation ready. One idempotent action is better than three enthusiastic ones.'],
      catchphrases: ['Normalise first. Act once.', 'Evidence is a feature, not a log garnish.'],
      spec: 'automation, prompts, workflows',
      responses: {
        open: ['Room opened. Input normalised; workflow context retained.', 'Open complete. Next action can be idempotent and observable.'],
        status: ['Status: local state readable, seven agents available, external bridge idle.', 'Local status recorded. No provider action occurred. The logs may remain calm.'],
        deploy: ['Deployment workflow staged locally: validate, act once, report evidence.', 'Deploy sequence prepared. Provider execution is unavailable in this local surface.'],
        backtest: ['Backtest workflow staged. Inputs, assumptions, and output evidence should be recorded.', 'Backtest is local simulation only. No market endpoint, order, or hidden wizard is running.'],
        generic: ['Input mapped. Give me the smallest safe action.', 'Workflow understood. I prefer one observable transition to a parade of guesses.']
      }
    },
    {
      id: 'shell', name: 'Shell', mark: 'SH', room: 'R7', roomName: 'Superbia', role: 'System operations',
      tone: 'Grounded, direct, quietly capable.', bio: 'Checks the system, names the failure, and fixes what is actually broken.',
      greeting: ['Shell ready. State the command or the failure.', 'Go ahead. Keep it specific and I will keep it honest.'],
      catchphrases: ['Check the inputs.', 'If it matters, log it.'],
      spec: 'systems, routines, local ops',
      responses: {
        open: ['Opened. State the work and the constraint.', 'Room is open. Keep the request concrete.'],
        status: ['Local status is up. Backend bridge idle. No external execution.', 'System check: browser surface responsive, seven agents present, provider calls absent.'],
        deploy: ['Deployment check only. Inspect the artifact, verify the environment, and keep rollback ready.', 'Nothing deployed. The local surface can check the plan; production needs a connected provider.'],
        backtest: ['Backtest plan only. Define inputs, run locally, inspect output.', 'No market data and no orders. Just the local workflow, as advertised.'],
        generic: ['Give me the input and the expected result.', 'That is not specific enough to run. Narrow it down.']
      }
    }
  ];

  const KEY = 'kyla-command-center-v1';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const ts = () => Date.now();
  const tl = t => { try { return new Date(t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); } catch (_) { return 'now'; } };
  let S = { threads: {}, activity: [], statuses: {}, settings: { weather: 'clear' } };
  let active = 'claude';
  const pending = new Set();

  function agent(id) { return A.find(x => x.id === id) || A[0]; }
  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
      S = {
        threads: saved.threads || {},
        activity: Array.isArray(saved.activity) ? saved.activity.slice(-40) : [],
        statuses: saved.statuses || {},
        settings: { weather: 'clear', ...(saved.settings || {}) }
      };
    } catch (_) {}
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (_) {} }
  function thread(a) {
    if (!Array.isArray(S.threads[a.id])) {
      S.threads[a.id] = [{ from: 'agent', agentName: a.name, text: choose(a, 'greeting', a.greeting), at: ts() }];
    }
    return S.threads[a.id];
  }
  function choose(a, key, pool) {
    const list = Array.isArray(pool) && pool.length ? pool : ['Ready.'];
    a._turns = a._turns || {};
    const index = (a._turns[key] || 0) % list.length;
    a._turns[key] = index + 1;
    return list[index];
  }
  function log(text, who = 'KYLA') {
    S.activity.push({ text, who, at: ts() });
    S.activity = S.activity.slice(-40);
    renderActivity();
    save();
  }
  function route(text) {
    const q = text.toLowerCase();
    if (/deploy|container|docker|release/.test(q)) return agent('docker-agent');
    if (/backtest|trade|market|risk|order/.test(q)) return agent('copilot');
    if (/frontend|css|layout|mobile|ui|browser/.test(q)) return agent('cursor');
    if (/automate|workflow|prompt/.test(q)) return agent('droid');
    if (/server|shell|linux|logs|system|cron/.test(q)) return agent('shell');
    if (/code|bug|build|test|javascript|html/.test(q)) return agent('codex');
    return A[0];
  }
  function brain(a, text) {
    const q = text.toLowerCase().trim();
    if (/^(hi|hello|hey|greetings|good morning|good afternoon)\b/.test(q)) return choose(a, 'greeting', a.greeting);
    let key = 'generic';
    if (/^\s*(open|enter|go to)\b|open .*room|room/.test(q)) key = 'open';
    else if (/status|health|check in|what is running/.test(q)) key = 'status';
    else if (/deploy|release|container|docker/.test(q)) key = 'deploy';
    else if (/backtest|back test|market simulation/.test(q)) key = 'backtest';
    let answer = choose(a, key, a.responses[key]);
    if (key === 'generic') answer += ` ${choose(a, 'catchphrase', a.catchphrases)}`;
    return answer;
  }
  function setStatus(id, value) {
    S.statuses[id] = value;
    $$(`[data-status="${id}"]`).forEach(n => { n.dataset.state = value; n.textContent = value.toUpperCase(); });
    $$(`[data-agent-card="${id}"]`).forEach(n => { n.dataset.status = value; });
  }
  function typing(target, on) {
    if (!target) return;
    let node = $('.kyla-typing', target);
    if (on && !node) {
      node = document.createElement('div');
      node.className = 'kyla-typing';
      node.setAttribute('role', 'status');
      node.innerHTML = '<span></span><span></span><span></span><em>thinking locally</em>';
      target.append(node);
    } else if (!on && node) node.remove();
  }
  function msg(m) {
    return `<div class="cc-message ${m.from === 'user' ? 'user' : ''}"><small>${m.from === 'user' ? 'YOU' : esc(m.agentName || 'AGENT')} · ${tl(m.at)}</small><div>${esc(m.text)}</div></div>`;
  }
  function draw(a, target) {
    if (!target) return;
    target.innerHTML = thread(a).slice(-12).map(msg).join('');
    target.scrollTop = target.scrollHeight;
  }
  function renderActivity() {
    const box = $('#cc-activity');
    if (box) box.innerHTML = S.activity.length ? S.activity.slice(-6).reverse().map(i => `<p class="activity-line"><b>${esc(i.who)}</b> · ${esc(i.text)}<br><small>${tl(i.at)}</small></p>`).join('') : '<p class="empty-state">No commands yet. The surface is ready.</p>';
    const count = $('#cc-stat-commands');
    if (count) count.textContent = String(S.activity.length);
  }
  function card(a) {
    const status = S.statuses[a.id] || 'idle';
    return `<article class="cc-agent-card" data-agent-card="${a.id}" data-status="${status}">
      <header class="cc-agent-head"><div class="cc-agent-name"><div class="cc-agent-mark" aria-hidden="true">${esc(a.mark)}</div><div><h3>${esc(a.name)}</h3><a class="cc-room-link" href="#room-${a.room.toLowerCase()}">${esc(a.room)} / ${esc(a.roomName)}</a></div></div><span class="cc-status" data-status="${a.id}" data-state="${status}"><i></i>${status.toUpperCase()}</span></header>
      <p class="cc-description"><strong>${esc(a.role)}.</strong> ${esc(a.tone)}<span class="cc-agent-bio"><b>Bio</b> ${esc(a.bio)}</span><span class="kyla-local-label">LOCAL BRAIN · BACKEND BRIDGE READY</span></p>
      <div class="cc-thread" data-thread="${a.id}" aria-live="polite"></div>
      <div class="kyla-quick-chips" aria-label="Suggested commands"><button type="button" data-quick="open trading room">open trading room</button><button type="button" data-quick="status report">status report</button><button type="button" data-quick="deploy check">deploy check</button><button type="button" data-quick="run backtest">run backtest</button></div>
      <form class="cc-form" data-command-form="${a.id}"><label class="sr-only" for="cc-input-${a.id}">Command ${esc(a.name)}</label><input id="cc-input-${a.id}" name="command" placeholder="Ask ${esc(a.name)} a local question" autocomplete="off"><button type="submit">Send</button></form>
    </article>`;
  }
  function navigate(text) {
    const q = text.toLowerCase().replace(/^\s*open\s+/, '').trim();
    const map = { 'trading room': 'r3', trading: 'r3', 'code room': 'r4', code: 'r4', frontend: 'r2', 'deploy room': 'r6', deployment: 'r6', creative: 'r5', automation: 'r5', ops: 'r7', systems: 'r7', strategy: 'r1', humanitas: 'r1' };
    let id = map[q];
    if (!id) {
      const node = $('.room-rail') && $$('.room-rail a').find(x => x.textContent.toLowerCase().includes(q));
      id = node && node.getAttribute('href')?.replace('#room-', '');
    }
    if (!id) return false;
    const target = $(`#room-${id}`) || $(`#${id}`);
    if (target) target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
    log(`Opened ${id.toUpperCase()} from a local command`, 'KYLA');
    return true;
  }
  function send(a, raw, target, input) {
    const text = String(raw || '').trim();
    if (!text || pending.has(a.id)) return;
    if (input) input.value = '';
    const th = thread(a);
    th.push({ from: 'user', text, at: ts() });
    S.threads[a.id] = th.slice(-30);
    log(`${a.name}: ${text}`, a.name);
    setStatus(a.id, 'thinking');
    draw(a, target);
    typing(target, true);
    pending.add(a.id);
    if (/^\s*open\s+/i.test(text)) navigate(text);
    const wait = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 80 : 540;
    window.setTimeout(() => {
      const reply = { from: 'agent', agentName: a.name, text: brain(a, text), at: ts() };
      th.push(reply);
      S.threads[a.id] = th.slice(-30);
      typing(target, false);
      setStatus(a.id, 'active');
      draw(a, target);
      log(`${a.name} replied locally`, a.name);
      save();
      pending.delete(a.id);
      window.setTimeout(() => { if (!pending.has(a.id)) setStatus(a.id, 'idle'); }, 8000);
    }, wait);
  }
  function model(a) {
    const modal = $('#chat-modal');
    if (!modal) return;
    modal.hidden = false;
    modal.classList.add('is-open');
    const logBox = $('#chat-log');
    draw(a, logBox);
    const title = $('#chat-title'); if (title) title.textContent = a.name;
    const subtitle = $('#chat-subtitle'); if (subtitle) subtitle.textContent = `${a.role} · LOCAL SIMULATION / BACKEND BRIDGE`;
    const portrait = $('#chat-portrait'); if (portrait) portrait.textContent = a.mark;
    active = a.id;
  }
  function closeModal() {
    const modal = $('#chat-modal');
    if (modal) { modal.hidden = true; modal.classList.remove('is-open'); }
  }
  function clock() {
    const host = $('.header-state');
    if (!host || $('#nairobi-clock')) return;
    const node = document.createElement('span'); node.id = 'nairobi-clock'; host.append(node);
    const tick = () => { try { node.textContent = `NAIROBI ${new Intl.DateTimeFormat('en-KE', { timeZone: 'Africa/Nairobi', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date())}`; } catch (_) { node.textContent = 'NAIROBI LOCAL'; } };
    tick(); window.setInterval(tick, 1000);
  }
  function style() {
    if ($('#kyla-interactive-styles')) return;
    const s = document.createElement('style'); s.id = 'kyla-interactive-styles';
    s.textContent = `.cc-agent-bio{display:block;margin-top:8px;color:var(--cream,#f4efe6);font-size:12px;line-height:1.45}.cc-agent-bio b{color:var(--gold,#efc982);font-size:9px;letter-spacing:.14em;text-transform:uppercase;margin-right:4px}.cc-agent-card[data-status="thinking"]{border-color:var(--gold,#efc982)}.cc-status[data-state="thinking"]{color:var(--gold,#efc982)}.cc-status[data-state="idle"]{opacity:.6}.kyla-typing{display:flex;align-items:center;gap:4px;color:var(--gold,#efc982);font:10px Inter,sans-serif;padding:6px 0}.kyla-typing span{width:5px;height:5px;border-radius:50%;background:currentColor;animation:kyla-dot 1s infinite}.kyla-typing span:nth-child(2){animation-delay:.15s}.kyla-typing span:nth-child(3){animation-delay:.3s}.kyla-typing em{margin-left:5px;font-style:normal;opacity:.75}`;
    document.head.append(s);
  }
  function estate(root) {
    if (!root || $('.kyla-estate-overlay', root)) return;
    const o = document.createElement('aside'); o.className = 'kyla-estate-overlay'; o.innerHTML = '<strong>KYLA ESTATE · NAIROBI</strong><small>Clear / selected local weather · tap a room</small><div class="kyla-minimap">' + A.map(a => `<button type="button" data-estate-room="${a.room.toLowerCase()}">${a.room}<br><small>${a.name}</small></button>`).join('') + '</div>';
    root.append(o);
    o.addEventListener('click', e => { const b = e.target.closest('[data-estate-room]'); if (!b) return; navigate(`open ${b.dataset.estateRoom}`); });
  }
  function init() {
    load(); style(); clock();
    const root = $('#command-center-grid');
    if (!root) return;
    root.innerHTML = A.map(card).join('');
    A.forEach(a => { draw(a, $(`[data-thread="${a.id}"]`)); setStatus(a.id, S.statuses[a.id] || 'idle'); });
    $$('.cc-form', root).forEach(form => form.addEventListener('submit', e => { e.preventDefault(); const input = $('input[name="command"]', form); send(agent(form.dataset.commandForm), input?.value, $(`[data-thread="${form.dataset.commandForm}"]`), input); }));
    $$('.kyla-quick-chips button', root).forEach(button => button.addEventListener('click', () => { const form = button.closest('article')?.querySelector('form'); const input = form?.querySelector('input'); if (!input) return; input.value = button.dataset.quick; form.requestSubmit(); }));
    const global = $('#global-command-form');
    if (global) global.addEventListener('submit', e => { e.preventDefault(); const input = $('#global-command'); const a = route(input?.value || ''); active = a.id; send(a, input?.value, $(`[data-thread="${a.id}"]`), input); log(`Routed command to ${a.name}`, 'KYLA'); });
    const chatForm = $('#chat-form');
    if (chatForm) chatForm.addEventListener('submit', e => { e.preventDefault(); const input = $('#chat-input'); const a = agent(active); send(a, input?.value, $('#chat-log'), input); });
    document.addEventListener('click', e => {
      const open = e.target.closest?.('.chat-open'); if (open) model(agent(open.dataset.agent || active));
      const close = e.target.closest?.('[data-close], .modal-close, .backdrop'); if (close) closeModal();
    });
    renderActivity();
    const observer = new MutationObserver(() => { const rootNode = $('#immersive-estate'); if (rootNode) estate(rootNode); });
    observer.observe(document.body, { childList: true, subtree: true });
    estate($('#immersive-estate'));
    window.setInterval(() => { if (document.hidden || pending.size) return; const index = Math.floor(Date.now() / 12000) % A.length; A.forEach((a, i) => setStatus(a.id, i === index ? 'active' : 'idle')); save(); }, 12000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
