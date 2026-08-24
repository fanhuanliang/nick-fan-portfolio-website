# Audit Notes

## 2026-08-23 — Hydration mismatch during Phase 4 theme work

### Symptom
React/Next.js reported a recoverable hydration error after App Router migration and dark-mode work:

> Hydration failed because the server rendered HTML didn't match the client.

### Root Cause
This was not the same as the earlier likely browser-extension attribute warning. The app introduced a real mismatch in `ThemeProvider`.

The server render defaulted to light mode because `document` is unavailable on the server, while the first client render read `document.documentElement.classList.contains("dark")`. The inline theme script in `app/layout.js` can add the `dark` class before hydration, so the first client render could output a dark-mode toggle icon/ARIA label while the server HTML contained the light-mode version.

### Fix
`ThemeProvider` now starts with a deterministic `"light"` value for both server render and first client render, then syncs to the actual document theme inside `useEffect` after hydration.

### Rule For Future Work
Do not read `document`, `window`, `localStorage`, media queries, dates, random values, or other browser-only/nondeterministic state inside a `useState` initializer or render path of an SSR-rendered Client Component. Use a stable initial render, then sync browser state in `useEffect`.

### Phase 4 Handoff Status
The dark-mode implementation exists in the working tree, but Phase 4 is not fully done until final regression and commit are completed.

Next pass should:
1. Re-run `npm run build`.
2. Run the dev site and confirm there are no hydration warnings or recoverable errors on first load.
3. Toggle light/dark mode and confirm no console errors, correct icon/ARIA label, correct `<html class="dark">` behavior, and persistence after reload.
4. Spot-check desktop and mobile layout for Hero, Navbar, About, Experience, Projects, project modals, Contact, notice popup, and Footer in both themes.
5. If all checks pass, update `ai/plan.md` Phase 4 to `✅ Complete`, update `ai/spec.md` known issue #10 to `✅ Fixed`, then commit all Phase 4 files and notes together.
