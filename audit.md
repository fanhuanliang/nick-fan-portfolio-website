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

## 2026-08-25 — Phase 4 mobile image-modal geometry check (closes remaining caveat)

### Method
Ran a standalone Playwright script against `npm run dev` at a 390×844 mobile viewport (`isMobile`, `hasTouch`), once with `colorScheme: 'light'` and once with `colorScheme: 'dark'`. Clicked the first project's image (`[class*="project_image"] img`) to open `PopImage.js`'s modal, read the `.top_layer` overlay's bounding box via `getBoundingClientRect()`, then clicked the `.bottom_layer` backdrop to dismiss.

### Result — Pass in both themes
- Overlay bounding box: `left 58.5, right 331.5, top 126.6, bottom 717.4` against a 390×844 viewport.
  - Horizontal center: (58.5+331.5)/2 = 195.0 = viewport width/2 (195) — exactly centered.
  - Vertical center: (126.6+717.4)/2 = 422.0 = viewport height/2 (422) — exactly centered.
  - Size: 273×590.8px = 70vw×70vh as defined in `PopImage.module.css` (`.top_layer { width: 70vw; height: 70vh }`).
- Clicking the backdrop dismissed the modal in both light and dark (`dismissed: true`).
- No console errors or page errors in either run.

### Conclusion
This closes the Phase 4 remaining caveat. `ai/plan.md` Phase 4 updated to `✅ Complete`; `ai/spec.md` known issue #10 updated to `✅ Fixed`.

## 2026-08-25 — Phase 4 documentation consistency cleanup

### Result
Removed the stale "Current Handoff" checklist from `ai/plan.md` after Phase 4 had already been marked complete. That checklist still said the phase should not be treated as finished, which contradicted the final mobile modal verification above and `ai/spec.md` known issue #10.

### Verification
Re-ran `npm run build` from the project root so Next.js resolved all local dependencies from this repo's `node_modules`. Build passed successfully with `/` prerendered as a static App Router route.

## 2026-08-25 — Phase 5a/5b regression pass

### Scope
Added `npm run test:regression`, backed by `scripts/regression-check.cjs`, and ran it against the local Next.js dev server at `http://localhost:3000`.

The regression covers:
1. Desktop 1440×900 in light and dark.
2. Mobile 390×844 in light and dark.
3. Section visibility for Hero, About, Experience, Projects, and Contact.
4. Horizontal overflow checks.
5. Hero canvas CSS sizing, drawing-buffer sizing, and nonblank pixel output.
6. Manual theme toggle, root `.dark` class behavior, ARIA label changes, and localStorage persistence after reload.
7. System dark preference with no stored user choice.
8. Project image modal centering and dismissal.
9. Contact empty-form validation notice.

### Findings
The first regression run caught an incomplete hero canvas conversion: `components/HeroCanvas.tsx` existed, but `styles/Main.module.css` only absolutely positioned the canvas at `left: 0; top: 0` and did not force the canvas element to fill the hero. The rendered CSS box and drawing buffer could diverge. Fixed by setting `.canvas` to `inset: 0`, `width: 100%`, `height: 100%`, and `display: block`; the regression now verifies both the CSS box and drawing buffer match the hero section.

Playwright's physical click action can wait awkwardly when this app opens or closes full-screen overlays during the click sequence, so the modal open/dismiss and contact validation checks use DOM-triggered clicks while still asserting the resulting visible UI state.

### Result
`npm run test:regression` passed:
- `desktop light`
- `desktop dark`
- `mobile light`
- `mobile dark`
- `system preference dark`

Also re-ran `npm run build` and `npm run lint`; both passed. `next lint` reports its existing deprecation warning for Next.js 16 migration, but no ESLint warnings or errors.

## 2026-08-26 — Phase 5 component rewrite completion

### Scope
Completed the remaining Phase 5 rewrite work:
1. Converted App Router files, `ThemeProvider`, and all components from `.js` to `.tsx`/`.ts`.
2. Replaced all component CSS Modules with Tailwind utility classes.
3. Removed all `styles/*.module.css` files; `styles/globals.css` is now the only app stylesheet.
4. Replaced `react-scroll` with plain hash anchors plus global `scroll-behavior: smooth` and section `scroll-margin-top`.
5. Replaced `react-player` with a direct YouTube iframe modal.
6. Removed unused/dead Heroku deploy URL data from `lib/data.ts`.
7. Restored Footer's LinkedIn link and added clearer ARIA labels/focus rings across converted controls.
8. Added typed tech stack labels for icon alt text and hover tooltips.
9. Blanked the Contact section by user request, preserving the `#contact` anchor and Footer while removing the EmailJS form, notice modal, config file, and dependency.

### Verification
Passed:
- `npm run build` — `/` remains a static App Router route; first-load JS is 160 kB.
- `npm run lint` — no ESLint warnings or errors. The command still reports Next's existing `next lint` deprecation warning for future Next 16 migration.
- `npm run test:regression` — passed `desktop light`, `desktop dark`, `mobile light`, `mobile dark`, and `system preference dark`.
- `rg --files -g "*.js" -g "*.jsx" -g "*.module.css" app components styles lib` — no app/component JavaScript files and no CSS Modules remain.

### Notes
`playwright` is now an explicit dev dependency because the regression script imports it directly; relying on an incidental transitive install made `npm run test:regression` non-reproducible.

The shell still prints the existing PowerShell profile parse error from `C:\Users\fanhu\Documents\PowerShell\Microsoft.PowerShell_profile.ps1`, but it did not block build, lint, or regression commands.

### Remaining Follow-Ups
Phase 6 owns performance/SEO work, including replacing the CSS Google Font `@import` with `next/font`, reviewing image priorities/sizes, and adding sitemap/robots/Open Graph assets. Phase 7 owns deeper accessibility work, including possible `<dialog>`-based modal focus management. Contact form loading/error/accessibility work is no longer applicable unless a new contact surface is added later.
