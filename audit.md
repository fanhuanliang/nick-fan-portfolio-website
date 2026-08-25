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

## 2026-08-24 — Phase 4 final regression check

### Result
Phase 4's dark-mode implementation passed the core phase/regression checks. No code changes were required during this pass.

### Verified
1. `npm run build` passed with the App Router route table still reporting `/` as a static app route.
2. SSR HTML still renders deterministic light-default markup before hydration:
   - `<html>` does not include a server-rendered `dark` class.
   - Server HTML includes the light-default toggle label (`Switch to dark mode`) and does not include the dark-default label.
3. Theme behavior passed:
   - Light mode: root class absent, toggle label `Switch to dark mode`, light CSS variables active.
   - Dark mode: root class present, toggle label `Switch to light mode`, dark CSS variables active.
   - Manual toggle persisted `localStorage["theme"] = "dark"` and stayed dark after reload.
   - With no stored theme and an emulated OS dark preference, the page loaded dark and the toggle label synced to `Switch to light mode` after hydration.
4. Desktop regression passed in light and dark:
   - Hero, About, Experience, Projects, and Contact were present.
   - No horizontal overflow.
   - Navbar scroll targets aligned at the 38px header offset for About, Experience, Portfolio, and Contact.
5. Mobile regression passed in light and dark:
   - Real 390px viewport was used.
   - Hero, About, Experience, Projects, and Contact were present.
   - Theme toggle and hamburger were visible.
   - No horizontal overflow (`scrollWidth` matched viewport width).
6. Overlay checks passed where automation completed:
   - Desktop dark project image modal used fixed full-screen overlay (`z-index: 1100`) and centered content layer (`z-index: 1101`).
   - Desktop dark Contact validation notice rendered above the page with the expected `Please fill out all the fields` message and overlay z-index values.
   - Video modal shell opened with close control and fixed overlay/content layers. The YouTube iframe itself could not be fully verified because external requests were blocked by the sandbox.

### Console Notes
No React hydration warning, recoverable hydration error, or page runtime exception was observed in the completed browser checks.

The local Playwright run reported `ERR_NETWORK_ACCESS_DENIED` / `ERR_FAILED` for external resources. These came from the restricted test environment blocking external font/video requests, not from the Phase 4 theme code. Next.js also reported the existing LCP `priority` warning for project/profile images; that belongs to the planned Phase 6 performance work.

### Remaining Caveat
Mobile image-modal automation opened the modal but the test runner hung while reading the modal layer geometry afterward. Desktop modal behavior passed, mobile layout/theme passed, and no crash was observed, but this specific mobile modal geometry check was not completed automatically. If visual confidence is needed before marking Phase 4 complete in `ai/plan.md`, manually open the first project image modal on a mobile viewport and confirm the overlay is centered and dismissible.
