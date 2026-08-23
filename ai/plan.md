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

## Phase 3 — App Router Migration

**Goal:** Migrate from `pages/` directory to Next.js App Router (`app/`).

### Steps
1. **Create `app/` directory structure**
   ```
   app/
     layout.tsx       ← root layout (replaces _app.js + <Head>)
     page.tsx         ← home page (replaces pages/index.js)
     globals.css      ← Tailwind entry point
   ```

2. **Move metadata to `layout.tsx`**
   - Use Next.js 15 `Metadata` export instead of `<Head>` + `next/head`
   - Add Open Graph and Twitter card metadata
   - Add JSON-LD structured data for `Person` schema

3. **Convert `_app.js` logic into `layout.tsx`**
   - Global CSS import moves here
   - Add `ThemeProvider` wrapper for dark mode (see Phase 4)

4. **Delete `pages/` directory** once app router is working

---

## Phase 4 — Dark Mode

**Goal:** Add system-aware dark/light mode with a manual toggle persisted to localStorage.

### Steps
1. **Configure Tailwind dark mode**
   - Set `darkMode: 'class'` in Tailwind config

2. **Create `ThemeProvider` component** (`components/ThemeProvider.tsx`)
   - Reads `prefers-color-scheme` and `localStorage` on mount
   - Toggles `dark` class on `<html>`
   - Exposes `useTheme()` hook

3. **Add toggle button to Navbar**
   - Use `SunIcon` / `MoonIcon` from lucide-react
   - Animate toggle with framer-motion `AnimatePresence`

4. **Update all color values** to use Tailwind dark variants (`dark:bg-*`, `dark:text-*`)

---

## Phase 5 — Component Rewrite (TypeScript + Tailwind)

**Goal:** Convert all components from JS + CSS Modules to TSX + Tailwind. Delete all `styles/*.module.css` files when done.

**Order:** Bottom-up (leaf components first, then parents)

### Steps

#### 5a. Data layer
- Move all data files to `lib/data.ts`
- Add TypeScript interfaces: `Experience`, `Project`, `TechLogo`
- Add `aws` to tech stack logos list

#### 5b. Canvas (Hero background)
- Rewrite `Canvas.js` as a proper React component (`components/HeroCanvas.tsx`)
- Use `useRef<HTMLCanvasElement>` instead of bare global `c`
- Wrap animation loop in `useEffect` with cleanup (`cancelAnimationFrame`)
- Add resize observer instead of `window.addEventListener`
- Still open as of Phase 2: React 19 StrictMode may double-run this loop in dev (no cleanup exists today) — noted but deliberately not fixed outside this phase.

#### 5c. Navbar
- Convert `Navbar.tsx`, `Navigation.tsx`, `NavLinks.tsx`
- Replace Semantic UI grid with Tailwind flex
- Keep `hamburger-react` (or replace with a custom Tailwind hamburger)
- Add smooth scroll behavior via CSS `scroll-behavior: smooth` + anchor IDs

#### 5d. Main (Hero section)
- Convert `Main.tsx`
- Use updated framer-motion API for stagger animation on name/title
- Replace `react-scroll` `<Link>` with a plain `<a href="#about">` (CSS smooth scroll)

#### 5e. AboutMe
- Convert `AboutMe.tsx`, `TechStacks.tsx`
- Use `next/image` with `fill` prop + aspect ratio wrapper instead of fixed dimensions — Phase 2 already fixed the acute "image fills the whole section" regression with a CSS width/height constraint; this step is the longer-term, more idiomatic replacement, not an urgent fix.
- Add hover tooltip labels to tech stack icons

#### 5f. Experience
- Convert `Experience.tsx`, `ExperienceCard.tsx`
- Redesign as a vertical timeline with Tailwind
- Update dates in `data.ts` if needed

#### 5g. Projects
- Convert `Projects.tsx`, `Project.tsx`, `Popup.tsx`, `PopImage.tsx`
- Replace `react-player` popup with direct YouTube embed or link
- Fix/remove dead Heroku deploy URL
- Consider replacing Popup with a `<dialog>` element for accessibility
- Also clean up `Project.js`'s dead `className="project_card"` (a raw string that's never matched the CSS-Modules-hashed class, pre-existing no-op) while touching this file

#### 5h. Contact
- Convert `Contact.tsx`, `Notice.tsx`
- Add loading spinner state during email send
- Add proper error boundaries
- Improve form accessibility (label `for` attributes, ARIA)

#### 5i. Footer
- Convert `Footer.tsx`
- Update social links (GitHub, LinkedIn)

---

## Phase 6 — Performance & SEO

**Goal:** Achieve Lighthouse ≥ 95, full SEO coverage.

### Steps
1. **Images**
   - Audit all `<img>` and `next/image` usages
   - Add `priority` prop to hero/above-fold images
   - Convert `.png` assets to `.webp` where possible

2. **Fonts**
   - Add `next/font` with a modern Google Font (e.g., Inter or Geist)
   - Remove any `@import` font URLs from CSS — note this now includes the Lato import added in Phase 2, not just the original scaffold fonts

3. **Bundle analysis**
   - `npm install -D @next/bundle-analyzer`
   - Identify and eliminate heavy unused imports

4. **SEO**
   - Verify Open Graph image renders correctly
   - Add `robots.txt` and `sitemap.xml` via Next.js route handlers
   - Validate JSON-LD with Google's Rich Results Test

---

## Phase 7 — Accessibility Audit

**Goal:** WCAG 2.1 AA compliance.

### Steps
1. Add skip-to-main-content link at top of page
2. Ensure all interactive elements have visible focus rings (Tailwind `focus-visible:ring-*`)
3. Add `aria-label` to icon-only buttons (hamburger, scroll arrow, theme toggle)
4. Verify color contrast ratios in both light and dark modes
5. Test keyboard navigation through all sections and forms
6. Add `alt` text audit for all images

---

## Phase 8 — Deploy

**Goal:** Live on Vercel with environment variables properly configured.

### Steps
1. Move EmailJS credentials (`serviceID`, `templateID`, `userID`) to `.env.local`
   - Prefix with `NEXT_PUBLIC_` for client-side access
   - Add `.env.local` to `.gitignore` (verify it's already there)
   - Update `emailjs.config.ts` to read from `process.env`

2. Add Vercel project and connect to GitHub repo
   - Set environment variables in Vercel dashboard

3. Verify production build passes: `npm run build`

4. Set up custom domain if desired

---

## Summary Table

| Phase | Effort | Risk | Value | Status |
|---|---|---|---|---|
| 1 — Deps & Tooling | Medium | Medium | Unblocks everything | ✅ Complete |
| 2 — Post-Upgrade Regression Fixes | Low | Low | Restores pre-upgrade visual parity | 🔄 In progress (manual regression testing underway) |
| 3 — App Router | Medium | Low | Future-proofs architecture | Not started |
| 4 — Dark Mode | Low | Low | UX polish | Not started |
| 5 — Component Rewrite | High | Low | Code quality, maintainability | Not started |
| 6 — Performance & SEO | Low | Low | Discoverability | Not started |
| 7 — Accessibility | Low | Low | Inclusivity, professionalism | Not started |
| 8 — Deploy | Low | Low | Live site | Not started |

**Recommended next step:** Finish Phase 2 regression testing/fixes, then Phase 3 (App Router migration) and Phase 5b (Canvas fix) as the two highest-ROI remaining steps.
