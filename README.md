# KYLA — The 3D Kilimani Penthouse

A dependency-free, mobile-first virtual command-center mansion for trading, dev, creative work, and life. The exterior uses an optional Three.js CDN scene with a CSS-only fallback; room commands and the SOPHIA broadcast are clearly marked front-end simulations for a future backend handoff.

## Live

https://M3lcharagu.github.io/kyla-web/

## Run locally

Open `index.html` in a browser. No build step or package install is required. Three.js is loaded from jsDelivr only; if WebGL or the CDN is unavailable, the CSS exterior remains usable.

## Structure

- `index.html` — accessible shell, hero, broadcast, modal, and navigation
- `style.css` — responsive luxury visual system, CSS 3D-ish rooms/angels, reduced-motion rules
- `script.js` — room/agent data, command simulations, IntersectionObserver reveals, optional Three.js scene

GitHub Pages publishes the `main` branch root.