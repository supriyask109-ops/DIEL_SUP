# DIEL_SUP — Dielectric Material Learning App

## Project structure
- `index.html` — app screens and layout
- `style.css` — simple responsive design
- `app.js` — search, category filter and detail view
- `data/materials.json` — offline database of 10 materials
- `sw.js` — service worker that caches the app for offline use
- `manifest.webmanifest` — installable web-app metadata
- `icons/icon.svg`, `icons/icon-192.png`, `icons/icon-512.png` — app icons

## Important installation note
This is an installable Progressive Web App (PWA), not a signed native APK. Android Chrome requires the app to be served from HTTPS (or localhost) for service-worker installation. Host this student-created folder on an HTTPS static host (for example, your own GitHub Pages repository), open it once in Chrome while online, wait for the page to finish loading, then use Chrome menu → Install app / Add to Home screen. Open the installed icon once while online so the app shell and database are cached. Then switch off internet and test it. The material search, filtering and detail records work from the local cache.

If your instructor specifically requires an APK file rather than an installable PWA, ask before submission; an APK packaging/signing step is separate and is not included in this source bundle.

## Run locally for development
Use a local development server. Opening `index.html` directly as a `file://` URL may prevent service workers from registering. On a computer, run `python -m http.server 8000` in this folder and visit `http://localhost:8000`. For Android installation, use HTTPS hosting.

## Data notes
Values are representative educational reference values, not universal manufacturer specifications. Dielectric constant and loss depend on material grade, temperature, humidity, voltage and frequency. The frequency condition is shown beside each entry. See each record's source URL and the report bibliography.
