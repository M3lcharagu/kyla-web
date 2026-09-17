# KYLA — The 3D Kilimanjaro Penthouse

KYLA is a no-build, vanilla HTML/CSS/JS command surface styled as a dark-luxury Kilimanjaro penthouse. It is local-first: the interface is fully usable as a browser simulation, while the future KYLA backend bridge is clearly labelled wherever real execution would begin.

## Included behavior

- **Fourteen mapped rooms and agents** rendered from one data model, with each room linked to its specialist agent.
- **Hash-routed agent pages** (`#agent-r1` through `#agent-r14`) with a dedicated agent profile, temperament, specialty, sample works, current loop state, prompt centre, and input/output pipeline.
- **Bidirectional private chats** opened from room cards or agent pages. Messages have timestamps, typing indicators, local simulated agent replies, unread badges, per-agent personality, and a persisted master mute for proactive pings.
- **Prompt centres and command history** through the global command bar, per-room command bars, and per-agent prompt bars. Keyword routing covers trading/XAUUSD (R3), editing/reels/render/dock (R6), study/research (R10), and coding/site/build (R4); commands move through queued, processing, delivered, and done states and appear in recent history.
- **SOPHIA Master Deck** with all-agent status lights, activity, unread counts, a persisted proactive-agent mute, and a broadcast command that produces a local response from every mapped agent plus a SOPHIA summary.
- **Autonomous task loops** for every agent: visible specialty task chips, progress bars, room activity logs, rotating work placeholders, completion events, resting intervals, and visibility-aware ticking. These are deliberately simulated locally and do not claim external work was completed.
- **Proactive, muteable pings** on a randomized 45–90 second local timer, suppressed while the page is hidden and disabled by the master mute control.
- **`localStorage` persistence** for chat threads, unread counts, command history, task-loop progress/activity, mute state, and recent local state under `kyla-state`.
- **Three.js exterior scene with fallback.** The optional Three.js CDN scene is guarded by an error handler and runtime `try/catch`; if the CDN or WebGL is unavailable, the CSS-styled exterior remains available and the page marks the fallback state instead of failing the command surface.
- **Mobile-first presentation** with reduced-motion-aware scene animation and no build step or runtime dependency beyond the optional Three.js CDN.

## Local simulation limitation

This is intentionally a front-end simulation. Commands, chats, task loops, broadcasts, unread state, mute state, and recent history stay in the browser's `localStorage`. The site does **not** fetch prices, run code, render media, send real messages, or complete external work. The UI identifies simulated output and the local-simulation/future-backend boundary. Real execution is designed to happen through Mel typing commands into this surface and the KYLA backend bridge when that bridge comes online.

## Run locally

Open `index.html` in a browser, or serve this folder with any static server. The project contains only:

- `index.html` — semantic shell, deck, rooms, broadcast, chat modal, command surfaces, and fallback markup.
- `style.css` — responsive dark-luxury presentation and CSS exterior fallback.
- `script.js` — agent data, routing, persistence, chat simulation, command history, broadcast, autonomous loops, proactive pings, and guarded Three.js scene.

GitHub Pages serves the same root files directly from the `main` branch (`/`).

## GitHub Pages

Live site: <https://m3lcharagu.github.io/kyla-web/>

Pages is configured as a legacy static site from **`main` / `/`**. A deployment can take a short time after a commit; the browser-facing simulation remains usable without a backend connection. The repository is <https://github.com/M3lcharagu/kyla-web>.
