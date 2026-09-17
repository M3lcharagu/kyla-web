# KYLA — The 3D Kilimani Penthouse

KYLA is a no-build, vanilla HTML/CSS/JS command surface styled as a dark-luxury Kilimani penthouse. It preserves the optional Three.js exterior with a CSS fallback and is designed mobile-first for fast iPhone 11 use.

## Included

- Fourteen mapped rooms and angels, each with a touch-friendly dedicated hash route.
- Agent profile pages with portrait scene, role, specialty, temperament, placeholder WORKS, input → agent → output pipeline, per-agent prompt bar, and the exact local-simulation footer.
- LocalStorage-backed bidirectional chat threads with timestamps, typing indicators, unread badges, distinct personality pools, proactive status bubbles, and a persisted master mute control.
- SOPHIA Master Deck: all-agent status lights, activity, unread counts, broadcast-all responses, and a clear local simulation/future backend label.
- Global and per-agent command bars. Keyword routing covers XAUUSD/order flow (R3), editing/reels/render/docker (R6), study/research (R10), and coding/site/build (R4), with queued → processing → delivered → done history.
- Visible autonomous task loops with specialty task chips, progress bars, room log results, visibility-aware ticking, reduced-motion support, and proactive 45–90 second notifications.
- No build step and no runtime dependency beyond the optional Three.js CDN. If CDN/WebGL is unavailable, the CSS exterior remains available and errors are guarded.

## Local simulation limitation

This is intentionally a front-end simulation. Commands, chat, task loops, broadcasts, unread state, mute state, and recent history stay in the browser's `localStorage`. The site does not claim to fetch prices, run code, render media, send messages, or complete external work. Real execution is designed to happen through Mel typing commands into this surface and the KYLA backend bridge when it comes online.

## Run locally

Open `index.html` in a browser or serve this folder with any static server. GitHub Pages serves the same root files directly from `main`.

Live site: https://m3lcharagu.github.io/kyla-web/
