---
name: portfolio-modernization-plan
description: Phased step-by-step modernization plan for Nick Fan's portfolio website
metadata:
  type: project
---

# Portfolio Website — Modernization Plan

> Reference: [spec.md](./spec.md)

Phases are ordered by dependency — each phase can be started independently of later phases,
but should be completed before the next phase begins.

---

## Phase 1 — Dependency & Tooling Upgrade

**Goal:** Upgrade all packages to modern versions and add TypeScript + Tailwind without breaking the running site.

### Steps
1. **Bump Next.js to v15 and React to v19**
   - `npm install next@latest react@latest react-dom@latest`
   - Verify `next dev` still starts; fix any breaking API changes

2. **Add TypeScript**
   - `npm install -D typescript @types/react @types/node @types/react-dom`
   - Create `tsconfig.json` via `npx tsc --init` (Next.js auto-detects it)
   - Rename files incrementally: `.js` → `.tsx` / `.ts`

3. **Add Tailwind CSS v4**
   - `npm install tailwindcss @tailwindcss/postcss postcss`
   - Create `postcss.config.mjs`, add `@import "tailwindcss"` to global stylesheet
   - Remove Semantic UI: `npm uninstall semantic-ui-css semantic-ui-react`

4. **Upgrade framer-motion to v11**
   - `npm install framer-motion@latest`
   - Fix deprecated `yoyo` → `repeat: Infinity, repeatType: "reverse"` in `Main.js`

5. **Replace emailjs-com with @emailjs/browser**
   - `npm uninstall emailjs-com && npm install @emailjs/browser`
   - Update import in `Contact.js`

6. **Add lucide-react for icons**
   - `npm install lucide-react`
   - Replace `<Icon name="angle double down">` with `<ChevronDown>` from lucide

7. **Remove scaffold files**
   - Delete `pages/api/hello.js`
   - Delete `public/vercel.svg`
   - Delete `styles/Home.module.css`

---

## Phase 2 — Post-Upgrade Regression Fixes

**Goal:** Fix all bugs found via manual regression testing of the site after Phase 1's dependency/tooling upgrade, before starting any further modernization work. Phase 1's changes were supposed to be visually invisible; in practice several pages relied on behavior that only worked *because of* packages that were just removed or upgraded, and broke once those changed. This phase is being driven by hands-on page-by-page regression testing (no automated test suite exists in this repo) — items get added to the list below as they're found, and checked off as they're fixed.

### Bugs found and fixed
1. **Site-wide font silently changed** — removing `semantic-ui-css` uncovered that it had been supplying `body{font-family:Lato,...}` and `h1-h5{font-family:Lato,...}` (plus its own Google Fonts `@import`) the whole time; `globals.css` never declared this itself. Fixed by adding an explicit Lato `@import` + `font-family` rule to `globals.css`.
2. **Hero scroll icon: wrong shape and color** — Semantic UI's `angle double down` is a double chevron; the Phase 1 icon swap used lucide's single-chevron `ChevronDown` by mistake. Corrected to `ChevronsDown`, colored to match the "Nick Fan" text (`#7facfafa`).
3. **Hero text weight** — bolded all three hero lines (`#hello`, `#name`, `#person_description`) per request; sizes/families otherwise unchanged (`#name` stays `"Raleway-semibold"`, a literal non-fallback value with no matching `@font-face`/Google Font anywhere in the repo — kept as-is by explicit choice).
4. **About page profile photo takes over the whole section** — `next/image` (pre-v13) used to auto-apply a responsive `max-width:100%; height:auto` style by default; that behavior was removed in v13+. `AboutMe.js`'s `<Image width={1000} height={1000}>` (spec.md issue #13) had relied on the removed default, so bumping Next 11→15 made it render at its raw 1000×1000 intrinsic size with nothing constraining it. First pass fixed it with a CSS pixel constraint; superseded by switching to `fill` (see below), which is the actually-idiomatic fix and what Phase 5e already called for.
   - `AboutMe.js`'s `<Image>` now uses `fill` + `sizes="(max-width: 600px) 200px, 300px"` + `style={{ objectFit: "cover" }}`, with `.img` in `About.module.css` carrying the sizing (`position: relative; width: 300px; height: 300px; border-radius: 100%; overflow: hidden`, 200px at the mobile breakpoint) instead of the `<img>` itself. This also fixed an unnecessary perf cost the pixel-constraint version had: without `sizes`, Next defaulted to `sizes="100vw"` and always served the largest (3840w) source regardless of the 300px display size.
5. **Project card images can overflow their card** — same root cause as #4: `Project.js`'s `<Image height={375} width={600} />` had no CSS width constraint, and the grid (`Projects.module.css`, `minmax(450px, 1fr)`) can give a card a cell narrower than 600px. Fixed via CSS: `.project_image img { max-width: 100%; height: auto }`.
6. **Tech stack logo icons unconstrained** — `TechStacks.js`'s `<Image height={100} width={100} />` had no CSS constraint either. Lower severity (100px is already a reasonable icon size) but same fragility as #5. Fixed via CSS: `.logo img { max-width: 100%; height: auto }`.
7. **Header/About scroll gap after header compaction** — making the header fixed and shorter exposed that the old `react-scroll` offsets still assumed a taller 70px nav, leaving the black hero strip visible above About. Fixed by matching all section offsets to the actual 38px fixed header.
8. **Remaining sections oversized after Bootstrap/Semantic removal** — Experience, Projects, and Contact retained large typography, padding, card sizing, and form dimensions that looked zoomed-in during regression testing. Reduced section headings, body text, card padding, project card minimum height, Contact textarea height, and footer icon dimensions across desktop/mobile.
9. **Project/contact overlays rendered below or relative to the fixed header** — fixed header z-index made modal layers appear below the nav, and project modals were nested inside animated cards so fixed positioning was anchored to the transformed card instead of the viewport. Raised modal z-index above the header and moved project modals out as siblings of the animated card.

### Still to do
- Phase 2 manual regression pass has covered Hero scroll, Navbar, About, Experience, Projects, Contact, Footer, project image/video modals, Contact validation notice, desktop layout, mobile layout, and horizontal overflow checks.
- Move on to Phase 3 unless another visual issue is found during human review.

---

## Phase 3 — App Router Migration ✅ Complete

**Goal:** Migrate from `pages/` directory to Next.js App Router (`app/`).

### Steps
1. **Create `app/` directory structure**
   ```
   app/
     layout.js       ← root layout (replaces _app.js + <Head>)
     page.js         ← home page (replaces pages/index.js)
   ```
   - *Execution note:* initially kept `.js` during Phase 3; converted to `.tsx` in Phase 5. `globals.css` is imported directly in `layout.tsx`, same as it was in `_app.js`; no separate Tailwind entry point needed since Tailwind's imports already live inside `globals.css` itself (from Phase 1).

2. **Move metadata to `layout.js`**
   - Migrated title, description, keywords, Open Graph, and Twitter metadata to the App Router `Metadata` export.
   - Added the App Router `viewport` export to preserve the old explicit `<meta name="viewport">` behavior.
   - Added initial `Person` JSON-LD in the root layout. Phase 6 still owns the fuller SEO/performance pass: canonical production URL validation, OG image, sitemap, robots, and rich-results validation.
   - Added `<html lang="en">` — required scaffolding for the App Router root layout (there was no `pages/_document.js` setting it before); not a behavior change.

3. **Convert `_app.js` logic into `layout.js`**
   - Global CSS import moved here directly.
   - `ThemeProvider` wrapper was added in Phase 4 and converted to TypeScript in Phase 5.

4. **Delete `pages/` directory** — done in the same commit as steps 1-2 (not staged separately), since `app/page.js` and `pages/index.js` would otherwise both resolve to `/` and Next.js hard-errors on the route conflict. `pages/_app.js`, `pages/index.js`, and the now-empty `pages/` directory were all removed together.

5. **Server/Client Component boundaries** (not an original plan.md step, but required by the App Router's Server-Component-by-default model): audited all 20 files under `components/` and added `"use client"` to the 8 that use hooks/handlers/browser APIs directly — `Main.js`, `MobileNavigation.js`, `NavLinks.js`, `Contact.js`, `Notice.js`, `Project.js`, `Popup.js`, `PopImage.js`. Confirmed via direct reads of the Navbar/Projects/Contact composition that no function/callback props cross from a Server Component into a Client Component (only plain serializable data, e.g. `Projects.js` → `Project.js`'s `projectData`), so no other files needed the directive — `Navbar.js`, `Navigation.js`, `Projects.js`, `AboutMe.js`, `TechStacks.js`, `Experience.js`, `ExperienceCard.js`, `Footer.js`, and the data-only files all stayed Server Components unchanged.

Verified: `next build` succeeds (route table now reports `Route (app)` with `/` and the auto-generated `/_not-found`, replacing the old Pages `/404`), development server serves correct metadata/anchors/icons with no hydration errors.

---

## Phase 4 — Dark Mode ✅ Complete

**Goal:** Add system-aware dark/light mode with a manual toggle persisted to localStorage.

### Steps
1. **Configure dark mode**
   - *Execution note:* no component uses Tailwind utility classes yet (Phase 5's job), so `darkMode: 'class'`-style config alone would be inert — it wouldn't change anything visible today. Instead: 16 semantic CSS custom properties (`--bg-page`, `--bg-surface`, `--bg-nav`, `--text-primary`, etc.) added to `styles/globals.css`, defined in `:root` (light) and overridden in `:root.dark`. All ~45 scattered hardcoded colors across 9 CSS Module files were mapped to these variables (a few — `Main.module.css`'s `#7facfafa` "Nick Fan" accent, and the fully self-contained gradient buttons in `Contact.module.css`/`Project.module.css` — were deliberately left hardcoded; see plan details in git history/PR for the full per-file rationale). Also added Tailwind v4's `@custom-variant dark (&:where(.dark, .dark *));` directive so Phase 5's future Tailwind-class conversion already has working dark-mode plumbing to consume — inert today, since nothing uses Tailwind classes yet.

2. **Create `ThemeProvider` component** (`components/ThemeProvider.tsx`)
   - Uses a deterministic initial `"light"` state so the server render and first client render match.
   - Syncs the actual document theme inside `useEffect` after hydration. Do not move `document`, `window`, `localStorage`, or `matchMedia` reads back into render or a `useState` initializer — that caused the Phase 4 hydration error recorded in `audit.md`.
   - A blocking inline script in `app/layout.js` applies the `dark` class before hydration to avoid a flash-of-wrong-theme without making `layout.js` a Client Component. `layout.js` must stay a Server Component because it exports `metadata` and `viewport`.
   - Toggles `dark` class on `<html>`, persists to `localStorage["theme"]`
   - Also listens for OS-level `prefers-color-scheme` changes, but only while no explicit user choice is stored
   - Exposes `useTheme()` hook returning `{ theme, toggleTheme }`

3. **Add toggle button to Navbar**
   - New `components/Navbar/ThemeToggle.tsx` (client component) using lucide-react `Sun`/`Moon` with a framer-motion crossfade, wired into `Navbar.tsx` as a third child of the primary nav container.

4. **Tailwind dark variants**: not applicable this phase (see step 1) — will apply naturally once Phase 5 converts components to Tailwind utility classes.

### Final Verification
Known good checks from the final pass: `npm run build` passed after the hydration fix; a browser console check showed no warning/error logs before and after toggling; the toggle changed the root `.dark` class and ARIA label correctly; all sections existed with no horizontal overflow.

Additional verification: `npm run build` was re-run from the project root after the final documentation update and passed successfully with the App Router route table still reporting `/` as a static route.

**Closed 2026-08-25:** the one remaining caveat from the 2026-08-24 pass — automated mobile image-modal overlay geometry — was re-checked manually via Playwright at a 390×844 mobile viewport in both light and dark. The overlay (`PopImage.js`'s `.top_layer`) was exactly centered in the viewport (bounding box center matched viewport center in both axes) at the expected 70vw×70vh size, and clicking the overlay dismissed it in both themes with no console errors. See `audit.md` for details. Phase 4 is now fully complete.

---

## Phase 5 — Component Rewrite (TypeScript + Tailwind) ✅ Complete

**Goal:** Convert all components from JS + CSS Modules to TSX + Tailwind. Delete all `styles/*.module.css` files when done.

**Order:** Bottom-up (leaf components first, then parents)

### Steps

#### 5a. Data layer
- ✅ Move all data files to `lib/data.ts`
- ✅ Add TypeScript interfaces: `Experience`, `Project`, `TechLogo`
- ✅ Add `aws` to tech stack logos list

#### 5b. Canvas (Hero background)
- ✅ Rewrite `Canvas.js` as a proper React component (`components/HeroCanvas.tsx`)
- ✅ Use `useRef<HTMLCanvasElement>` instead of bare global `c`
- ✅ Wrap animation loop in `useEffect` with cleanup (`cancelAnimationFrame`)
- ✅ Add resize observer instead of `window.addEventListener`
- ✅ Ensure the canvas CSS box and drawing buffer both fill the hero section at desktop and mobile sizes

#### 5c. Navbar
- ✅ Convert `Navbar.tsx`, `Navigation.tsx`, `NavLinks.tsx`, `MobileNavigation.tsx`, and `ThemeToggle.tsx`
- ✅ Replace CSS Modules with Tailwind flex/layout classes
- ✅ Keep `hamburger-react`, with explicit labels for open/close states
- ✅ Add smooth scroll behavior via CSS `scroll-behavior: smooth` + anchor IDs

#### 5d. Main (Hero section)
- ✅ Convert `Main.tsx`
- ✅ Keep the updated framer-motion animation behavior
- ✅ Replace `react-scroll` `<Link>` with a plain `<a href="#about">` (CSS smooth scroll)

#### 5e. AboutMe
- ✅ Convert `AboutMe.tsx`, `TechStacks.tsx`
- ✅ Use `next/image` with `fill` prop + aspect ratio wrapper for the profile image
- ✅ Add hover tooltip labels and accurate alt text to tech stack icons

#### 5f. Experience
- ✅ Convert `Experience.tsx`, `ExperienceCard.tsx`
- ✅ Redesign as a vertical timeline with Tailwind
- ✅ Leave dates unchanged pending a content-authoritative update

#### 5g. Projects
- ✅ Convert `Projects.tsx`, `Project.tsx`, `Popup.tsx`, `PopImage.tsx`
- ✅ Replace `react-player` popup with a direct YouTube iframe embed
- ✅ Remove unused/dead Heroku deploy URL data
- ✅ Clean up `Project.js`'s dead raw `className="project_card"` during the TSX rewrite
- Deferred: consider replacing Popup with a `<dialog>` element during Phase 7 accessibility work

#### 5h. Contact
- ✅ Convert `Contact.tsx`
- ✅ Blank the Contact section by user request, keeping the `#contact` anchor and Footer
- ✅ Remove EmailJS form, notice modal, config file, and `@emailjs/browser` dependency
- Superseded by user request: loading/error/form-accessibility work is no longer applicable unless a new contact surface is added later

#### 5i. Footer
- ✅ Convert `Footer.tsx`
- ✅ Update social links (GitHub, LinkedIn)

### Final Verification
Verified 2026-08-26:
- `npm run build` passed; `/` remains a static App Router route and first-load JS is 160 kB.
- `npm run lint` passed with no warnings/errors, aside from Next's existing `next lint` deprecation notice.
- `npm run test:regression` passed desktop light, desktop dark, mobile light, mobile dark, and system-preference dark scenarios.
- `rg --files -g "*.js" -g "*.jsx" -g "*.module.css" app components styles lib` returned no app/component JS files and no CSS Modules.
- Removed `react-scroll` and `react-player` dependencies after replacing their usage.

---

## Phase 6 — Performance & SEO ✅ Complete

**Goal:** Achieve Lighthouse ≥ 95, full SEO coverage.

### Steps
1. **Images**
   - ✅ Audited all `next/image` usages (`AboutMe.tsx`, `Project.tsx`, `TechStacks.tsx`). No `<img>` tags exist outside `next/image`.
   - Deferred/not applicable: no `priority` prop added anywhere — the Hero section has no image (canvas + text), and `AboutMe`'s profile photo sits below `Main`'s `min-h-screen`, so it isn't the LCP element. Adding `priority` to a below-the-fold image would only hurt LCP.
   - Deferred: `.png` → `.webp` source conversion skipped as unnecessary — `next.config.js` doesn't set `images.unoptimized`, so Next's built-in Image Optimization API already re-encodes and serves `webp`/`avif` on demand at request time regardless of the source file format.
   - ✅ Added `sizes="(max-width: 600px) 100vw, 320px"` to `Project.tsx`'s card image — it previously had no `sizes`, so Next only generated 1x/2x variants of the full 600w intrinsic size instead of a variant matching the actual rendered card width.
   - ✅ Deleted `public/images/selfie.png` (8.2 MB) — an unused duplicate of `IMG_1857.png` (same 3126×3443 dimensions), not referenced anywhere in `lib/data.ts` or components.

2. **Fonts**
   - ✅ Replaced the Google Fonts `@import` in `globals.css` (added in Phase 2 to restore the Lato font Semantic UI used to silently supply) with `next/font/google`'s `Lato` in `app/layout.tsx`, exposed as the `--font-lato` CSS variable via `variable: "--font-lato"` and applied on `<html>`.
   - ✅ `globals.css`'s two `font-family` declarations (`html, body` and the heading rule) now reference `var(--font-lato)` instead of the literal `Lato` name, so they stay tied to the self-hosted font instead of an external CSS import.
   - Font is now self-hosted at build time (no runtime request to `fonts.googleapis.com`) with an automatic size-adjusted fallback face, eliminating the external font request + layout shift risk of the old `@import`.

3. **Bundle analysis**
   - ✅ Installed `@next/bundle-analyzer` (dev dependency) and `cross-env` (dev dependency, needed because `ANALYZE=true next build` doesn't work in the project's default PowerShell shell on Windows) and wired both into `next.config.js` / a new `analyze` npm script.
   - ✅ Ran `npm run analyze`: first-load JS for `/` is 158 kB (103 kB shared framework/Next runtime + 55.4 kB page-specific), effectively unchanged from Phase 5's 160 kB baseline.
   - Finding: no heavy or unused imports to eliminate. All three non-framework runtime dependencies (`framer-motion`, `lucide-react`, `hamburger-react`) are actively used, and `lucide-react`'s icon imports are already per-icon (tree-shakeable ESM), so there's nothing to trim without removing a feature.

4. **SEO**
   - ✅ Added `app/robots.ts` (allow-all, points at the sitemap) and `app/sitemap.ts` (single `/` entry) using Next's App Router metadata route file conventions.
   - ✅ Added `app/opengraph-image.tsx` using `next/og`'s `ImageResponse` to generate a 1200×630 OG image at build time (statically prerendered — confirmed via `npm run build`'s route table, no edge runtime needed). This also satisfies the Twitter card image, since `twitter.card: "summary_large_image"` was already set in `layout.tsx` and Twitter's crawler falls back to `og:image` when no explicit `twitter:image` is set.
   - Verified via `curl` against a local build: `og:image:width`/`og:image:height` meta tags render correctly, `/robots.txt` and `/sitemap.xml` both return 200 with correct content types.
   - Deferred: validating the JSON-LD against Google's Rich Results Test requires a publicly reachable URL, which doesn't exist until Phase 8 deploy — do this as a Phase 8 post-deploy check.

### Final Verification
- `npm run build` passed; `/` remains a static App Router route at 158 kB first-load JS; `/opengraph-image`, `/robots.txt`, and `/sitemap.xml` all prerender as static routes.
- `npm run lint` passed with no warnings/errors (aside from the existing `next lint` → Next 16 deprecation notice).
- `npm run test:regression` passed `desktop light`, `desktop dark`, `mobile light`, `mobile dark`, and `system preference dark`.
- Verified via a headless Playwright check that `next/font`'s Lato actually resolves (`getComputedStyle(document.body).fontFamily` → `Lato, "Lato Fallback", "Helvetica Neue", Arial, Helvetica, sans-serif`) with zero console errors.

---

## Phase 7 — Accessibility Audit ✅ Complete

**Goal:** WCAG 2.1 AA compliance.

### Steps
1. ✅ Added a skip-to-main-content link at the top of the page, targeting a new `main#content` landmark that wraps the primary post-hero content.
2. ✅ Ensured interactive elements have visible focus styles, including the skip link, project image buttons, project action links/buttons, modal close controls, nav links, theme toggle, and footer links.
3. ✅ Audited icon-only controls and links: hamburger, scroll arrow, theme toggle, modal close buttons, project image preview buttons, and footer icon links all have accessible names.
4. ✅ Verified sampled color contrast in both light and dark modes through the regression script; also replaced the low-contrast project action gradient with a darker accessible button color.
5. ✅ Tested keyboard navigation for the skip link and modal flows; project image/video modals now focus their close buttons on open and close with Escape.
6. ✅ Added automated alt-attribute coverage checks and improved project modal preview alt text.

### Final Verification
- `npm run build` passed; `/` remains a static App Router route at 158 kB first-load JS.
- `next lint` passed with no warnings/errors (run through the bundled Node executable because the sandbox PATH did not expose `npm` consistently).
- `tsc --noEmit` passed.
- `npm run test:regression` equivalent passed via bundled Node: desktop light, desktop dark, mobile light, mobile dark, and system-preference dark. The regression now checks landmarks, skip-link focus visibility, unnamed controls, missing image alt attributes, sampled contrast, image modal dialog semantics/focus/Escape, and video modal dialog semantics/focus/Escape.

---

## Phase 8 — Deploy

**Goal:** Live on Vercel with environment variables properly configured.

### Steps
1. Environment variables
   - No EmailJS variables are currently needed because the Contact form was removed in Phase 5
   - Add future contact/provider keys to `.env.local` if a new contact surface is introduced

2. Add Vercel project and connect to GitHub repo
   - Set environment variables in Vercel dashboard

3. Verify production build passes: `npm run build`

4. Set up custom domain if desired

---

## Summary Table

| Phase | Effort | Risk | Value | Status |
|---|---|---|---|---|
| 1 — Deps & Tooling | Medium | Medium | Unblocks everything | ✅ Complete |
| 2 — Post-Upgrade Regression Fixes | Low | Low | Restores pre-upgrade visual parity | ✅ Complete |
| 3 — App Router | Medium | Low | Future-proofs architecture | ✅ Complete |
| 4 — Dark Mode | Low | Low | UX polish | ✅ Complete |
| 5 — Component Rewrite | High | Low | Code quality, maintainability | ✅ Complete |
| 6 — Performance & SEO | Low | Low | Discoverability | ✅ Complete |
| 7 — Accessibility | Low | Low | Inclusivity, professionalism | ✅ Complete |
| 8 — Deploy | Low | Low | Live site | Not started |

**Recommended next step:** Start Phase 8 Deploy.
