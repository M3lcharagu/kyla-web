# KYLA — Kilimani Penthouse Estate

KYLA is a static, mobile-first command centre for a fictional Kilimani estate. The existing local agent directory, 14-room source of truth, chats, task loops, proactive pings, command routing/history, SOPHIA deck/settings and localStorage state remain client-side and build-free.

## Local simulation

Serve the repository root with any static server; no build step is needed:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/`. A direct `file://` open works for the static page, but browsers may restrict fullscreen, WebAudio, device orientation and WebXR there. Commands and agent replies are deliberately local simulations and never claim external work completed.

## VR / Walkthrough controls

The fixed **Enter VR / Walkthrough** button opens an accessible fullscreen first-person route: skyline → estate gate → pool path → villa entrance → lobby. The tour uses cinematic easing and can be interrupted. Mouse drag and one-finger touch drag look around with clamped yaw/pitch. The **Head-bob** toggle is optional, and **Motion look** requests device-orientation permission only after the user taps it.

Glowing keyboard-focusable markers teleport/glide to each route stop; use Enter or Space after focusing a marker. Escape or **Exit** closes the mode. If Three.js/WebGL is unavailable, the UI falls back to a no-crash lightweight route surface.

When `navigator.xr` reports immersive VR support, a **VR headset** control appears after the user opens the walkthrough. It requests a basic `immersive-vr` session on that gesture and silently falls back if unavailable or denied; this is intentionally not a full controller implementation.

**Ambient audio** is optional in SOPHIA settings. It is generated with WebAudio (a quiet oscillator pad plus filtered noise city bed), starts only after an explicit user gesture, persists its mute preference, and is stopped/disconnected when immersive mode exits. No audio files are loaded. Reduced-motion preferences lower/disable cinematic movement and mobile devices use capped pixel ratio and smaller star counts.

## Deployment

The site is plain static HTML/CSS/JS and is published from the `main` branch through GitHub Pages: https://m3lcharagu.github.io/kyla-web/
