# Portfolio Rebuild — Plan

**Owner:** Emmanuel Mulilo
**Status:** Stage 3 built — React + PWA app lives in `app/`. Stage 1 was superseded.
**Last updated:** 2026-10-27
**Working mode:** build-out. The staged teaching plan was set aside at the owner's request.

---

## 1. Goals

1. Replace the two mismatched HTML5 UP templates with one coherent, fast, accessible site.
2. Make the site **content-driven** — adding a project is editing one file, not copy-pasting HTML.
3. Ship a real **PWA** (installable, offline shell, update prompt).
4. Look like the work of someone who understands systems: editorial layout, data-viz accents, restrained motion.
5. Make project links **shareable** — correct preview cards on LinkedIn/WhatsApp/X.

### Non-goals

- No backend, no database, no auth. Static hosting only (GitHub Pages).
- No 3D/WebGL hero. Perf cost is not worth it.
- No blog unless there is a real writing habit behind it.
- No CMS. Markdown + git is the CMS.

---

## 2. Stack decision

### Path A — Vite + React SPA + PWA

One `index.html` shell. React Router renders every route on the client. The service worker caches the shell and assets.

**Pros**
- Pure React. Every hour spent transfers directly to React job requirements.
- Simplest mental model: one dev server, one bundle, no server/client boundary.
- PWA is native to the architecture — the app shell *is* the thing you cache.
- Route transitions, shared state (filters, command palette, theme) are trivial.
- Largest ecosystem of examples and answers.

**Cons**
- **Blank HTML on first load.** Social crawlers (LinkedIn, WhatsApp, Slack, X) do not execute JS, so every project URL previews with the same generic card. Google *can* render JS but deprioritises it.
- Needs a `404.html` copy of `index.html` to make deep links work on GitHub Pages.
- Ships JS for content that is 95% text and images.
- Slower LCP on cheap Android hardware — relevant for a Zambian audience.
- Hand-rolling the content pipeline (markdown → routes → metadata).

### Path B — Astro + React islands + PWA

Every route is prerendered to static HTML at build time. React components hydrate only where marked (`client:load`, `client:visible`, etc.). Vite under the hood.

**Pros**
- **Real HTML per project page** → correct `<title>`, description, and OG image per case study. Link previews just work.
- Near-zero JS on text-heavy pages; a case study can ship <10 KB of JS.
- Content collections: a Zod schema validates frontmatter at build time. Bad data fails the build, not the page.
- Still React — the filterable project grid, command palette, and theme toggle are React components using the same Tailwind/Motion skills.
- PWA via `@vite-pwa/astro` — same Workbox engine as Path A.
- Lighthouse scores are close to free, not a fight.

**Cons**
- New concept to learn: **hydration boundaries**. Knowing when a component is server-rendered vs interactive takes a week to internalise, and `window`-access bugs are the classic trap.
- Full-page navigation unless you opt into client-side routing (`<ClientRouter />`).
- More build moving parts than a plain SPA.
- Slightly less "I built a React app" to point at — though "I chose the right tool because the site is content-first" is the more senior story.

### Head-to-head, weighted for *this* site

| Criterion | Weight | A | B |
|---|---|---|---|
| Case-study link previews / SEO | High | ✗ | ✓ |
| Performance on low-end Android | High | ~ | ✓ |
| Speed of adding new projects | High | ~ | ✓ |
| PWA quality | Medium | ✓ | ✓ |
| React skill-building | Medium | ✓ | ~ |
| Setup + maintenance simplicity | Medium | ✓ | ~ |
| All-React mental model | Low | ✓ | ✗ |

### Decision (revised after confirming React experience = 0)

Path B is still the better *end state* for this site — content-first, correct link previews, near-zero JS. But it is the wrong **starting point** when React itself is new: two unfamiliar models (React, plus Astro's server/client boundary) failing at the same time is the fastest way to stall.

The stack is therefore **sequenced, not chosen once**:

| Stage | Stack | Rationale |
|---|---|---|
| 1 | Existing static HTML/CSS/JS, modernized | A good site ships in ~1 week with zero new concepts |
| 2 | React fundamentals, standalone exercises | One thing at a time, no deadline pressure |
| 3 | Vite + React SPA + PWA (**Path A**) | Portfolio becomes the React project, with Stage 1 live as fallback |
| 4 *(optional)* | Astro + React islands | Revisit once React is comfortable; migration cost ≈ 1 day |

Path A is deliberately chosen for Stage 3: a single runtime is easier to debug while learning. Its SEO/OG weakness is acceptable for a first React build, and Stage 4 exists if it ever starts to matter.

**Constraint that drove this:** the portfolio is the shop window. It must not be broken or unfinished for the entire duration of a learning curve.

### Why Path B was tempting (kept for the record)

Path B wins when React is already comfortable: prerendered HTML per route, per-project OG images, <10 KB JS on case studies, build-time content validation. The deciding factor is link previews — project links get shared on LinkedIn far more often than anyone inspects a bundle. Revisit in Stage 4 if performance or shareability becomes a real complaint.

### Middle path, if you want all-React *and* prerendered HTML

React Router 8 framework mode with `ssr: false` and a `prerender` list emits static HTML per route from a pure React codebase. It closes most of the SEO/OG gap. Cost: more config than plain Vite, and the `vite-plugin-pwa` integration needs verifying. This is the upgrade to consider at Stage 4 — not now.

### Deltas if you later adopt Path B (Stage 4)

Everything in §4–§9 is stack-agnostic, so the migration is mechanical:
- `src/data/projects.ts` → content collections (same fields, MDX bodies).
- React Router routes → file-based routes + prerendering.
- `vite-plugin-pwa` → `@vite-pwa/astro`.
- Per-route `<head>` via React 19 hoisting → native per-route `<head>` (better OG support).
- Tailwind, tokens, and all React components carry over unchanged.

---

## 3. Current site audit

### Keep
- The dark-green identity (it is distinctive and worth protecting).
- The `localStorage` theme-toggle pattern — port the logic, not the code.
- Both social links and the CV download concept.

### Fix or remove
| Issue | Action |
|---|---|
| Two different templates (Dimension + Massively) | Replace with one design system |
| jQuery + 5 template scripts | Delete; replace with React/CSS |
| `user-scalable=no` in viewport | Remove — blocks pinch-zoom, a WCAG failure |
| Contact form posts to `#` | Wire to Formspree/Web3Forms, or drop the form for mailto |
| All 6 project cards + featured project are placeholders | Replace with real case studies |
| Certificates table is 3× "Add Certificate Name Here" | Replace with real data or hide the section |
| Sass-generated placeholder text visible to users (`Place your CV PDF at…`) | Remove before launch |
| `href="#"` everywhere | Real links or nothing |
| `package-lock.json` in `.gitignore` | Remove from ignore — lockfiles must be committed |
| Duplicate `gitignore` + `.gitignore` | Keep `.gitignore` only |
| 3.2 MB of jQuery + FontAwesome webfonts (.eot/.svg/.ttf) | Delete; use inline SVG icons |
| `bg.jpg` at 396 KB | Re-encode to AVIF (~40 KB), add WebP fallback |
| No favicon, no OG tags, no sitemap, no `robots.txt` | Add in Phase 6 |
| HTML5 UP attribution | Only required while their design/code is in use. Replacing the templates removes the obligation — but keep the credit if any layout survives. |

---

## 4. Information architecture

```
/                 Home — hero, about, selected work, skills, certificates, contact
/work             All projects, filterable by discipline (data / software / database)
/work/[slug]      Case study: problem → constraints → approach → result → retrospective
/resume           Web résumé + PDF download
/404              Hand-built not-found page
```

Stage 1 maps this onto static files: `index.html`, `projects.html` (plus `work/<slug>.html` per case study), `resume.html`, `404.html`. Stage 3 reproduces the same URLs in React Router. Keep the paths stable — they are what gets shared.

Home sections carry `#about`, `#skills`, and `#contact` anchors for backwards compatibility with the old links.

**Case-study structure (the part that actually gets you hired):**
1. One-sentence summary + role + timeline + stack chips.
2. The problem, in the user's language.
3. Constraints (time, data quality, hardware, scope).
4. Approach — with one diagram or architecture sketch.
5. Result — a number if at all possible.
6. What I'd do differently. ← this signals maturity more than any framework choice.

---

## 5. Design direction — Editorial data-viz

**Reference feeling:** a technical report that someone with taste laid out. Swiss grid, oversized type, monospace metadata, hairline rules. Not a startup landing page, not a terminal cosplay.

### Colour (OKLCH, dark-first)

| Token | Dark | Light |
|---|---|---|
| `--bg` | `oklch(0.17 0.02 155)` | `oklch(0.98 0.005 155)` |
| `--surface` | `oklch(0.22 0.025 155)` | `oklch(0.95 0.008 155)` |
| `--text` | `oklch(0.95 0.01 155)` | `oklch(0.22 0.02 155)` |
| `--muted` | `oklch(0.68 0.015 155)` | `oklch(0.48 0.015 155)` |
| `--accent` | `oklch(0.78 0.17 152)` | `oklch(0.52 0.14 152)` |

Accent is decorative only — never the sole carrier of meaning. Verify 4.5:1 on every text pair before launch.

### Type
- Display/body: one variable grotesque (Instrument Sans, Geist, or Space Grotesk), self-hosted, latin subset, `font-display: swap`.
- Data/labels: one monospace (JetBrains Mono or IBM Plex Mono) for section numbers, stack chips, dates, metrics.
- Scale: 1.25 ratio, clamped (`clamp(2.5rem, 8vw, 6rem)` for h1). `text-wrap: balance` on headings.

### Signature elements
- Numbered section labels: `01 — ABOUT`.
- Hairline rules + generous negative space instead of cards everywhere.
- Monospace metadata rows above each project.
- Small stat blocks (`6 projects`, `3 languages`, `2023—2026`) — real numbers only.
- Grain/noise texture at 2–3% opacity to kill the flat digital look.

### Motion rules
- 150–250 ms, `ease-out`, transform/opacity only.
- One staggered reveal per section, once, via `IntersectionObserver` or scroll-driven CSS.
- No parallax on mobile. No cursor followers.
- Honour `prefers-reduced-motion: reduce` by disabling all of it.
- Route transitions: plain navigation in v1. Native View Transitions are a Stage 4 enhancement.

### Accessibility floor
Skip link • semantic landmarks • visible `:focus-visible` rings • labelled form fields with `aria-describedby` errors • `color-scheme` declared • no text below 14 px • both themes tested for contrast.

---

## 6. Content model

The schema below is the single source of truth from Stage 1 onward. Only the *storage format* changes per stage.

### Stage 1 — `assets/data/projects.json`

No build step exists, so projects are a JSON array fetched by `projects.js` and rendered into the grid with vanilla JS. This is deliberate: it is the same shape Stage 3 will consume, and writing it now makes the React version feel familiar rather than new.

```json
{
  "slug": "university-db-normalisation",
  "title": "University Records Database",
  "summary": "Normalised a 14-table flat schema to 3NF, cutting duplicate records by 38%.",
  "role": "Sole developer",
  "year": 2026,
  "timeline": "6 weeks",
  "stack": ["MySQL", "SQL", "Python"],
  "metrics": [{ "label": "Duplicate rows", "value": "-38%" }],
  "cover": "images/work/university-db/cover.avif",
  "gallery": [],
  "links": { "repo": "https://github.com/mulilo-26/..." },
  "featured": true,
  "order": 1,
  "draft": false
}
```

### Stage 3 — `src/data/projects.ts`

Same objects, typed. Case-study bodies become MDX (one file per project) once there is prose worth writing.

**Blocking input needed from you:** every project above is still a placeholder. The site cannot launch on template copy. Minimum viable: 3 real projects with 1–2 screenshots each and a verifiable outcome.

---

## 7. PWA specification

**Manifest**
- `name: "Emmanuel Mulilo — Portfolio"`, `short_name: "E. Mulilo"`
- `start_url: "/"`, `scope: "/"`, `display: "standalone"`, `orientation: "any"`
- `theme_color` / `background_color` matched to `--bg`
- Icons: 192, 512, 1024 + one **maskable** 512 with safe-zone padding
- `screenshots` (narrow + wide) so Android shows the richer install sheet
- `shortcuts`: Work, Résumé, Contact
- `categories: ["portfolio", "education"]`

**Service worker (Workbox via `@vite-pwa/astro`)**
- Precache: app shell, fonts, icons, critical CSS, last-built project index.
- Images: `StaleWhileRevalidate`, 30-day expiry, 60-entry cap.
- HTML: `NetworkFirst` with 3 s timeout → `/offline` fallback.
- CV PDF: `NetworkFirst`, 7-day expiry (so an updated CV is never stale for long).

**Install & update UX**
- Capture `beforeinstallprompt`; show a quiet "Install app" affordance in the footer.
- Hide it when `display-mode: standalone`.
- iOS: no prompt exists — detect iOS Safari and show a one-line "Share → Add to Home Screen" hint.
- `onNeedRefresh` → non-blocking toast: "New version available — Reload".
- `onOfflineReady` → one-time toast.

**Honest framing:** the PWA is a differentiator *signal*, not a user need. Keep it to ~half a day of work.

---

## 8. Performance & quality budgets

| Metric | Target |
|---|---|
| LCP (mid-tier Android, 4G) | < 1.8 s |
| CLS | < 0.05 |
| INP | < 200 ms |
| JS shipped, home | < 120 KB gzip |
| JS shipped, case study | < 30 KB gzip |
| Lighthouse (all four) | ≥ 95 |
| axe violations | 0 |
| Contrast | ≥ 4.5:1 both themes |

Enforcement: Lighthouse CI in the deploy workflow; `pnpm build` fails on schema errors; `astro check` for types.

---

## 9. SEO & sharing

- Per-route `<title>`, description, canonical.
- OG + Twitter cards, 1200×630, **generated per project at build** (sharp/satori) so no manual asset work.
- JSON-LD: `Person` on home, `CreativeWork` on each case study.
- `@astrojs/sitemap` + `robots.txt`.
- Human-readable slugs (`/work/university-db-normalisation`, not `/work/p1`).
- Custom domain later? Not required — `mulilo-26.github.io` is fine and the OG tags work regardless.

---

## 10. Deployment

`.github/workflows/deploy.yml`:
- Trigger: push to `main`.
- Node 24, pnpm with cache.
- `pnpm install --frozen-lockfile && pnpm build`
- `actions/upload-pages-artifact` → `actions/deploy-pages`
- Permissions: `pages: write`, `id-token: write`; `concurrency: pages`.
- Emit `.nojekyll` in `dist` (Astro does not need it, but it costs nothing and prevents surprises).

Keep the current site live on `main` until the rebuild is deployable; build on `redesign`.

GitHub Pages has no native PR previews. If you want them, point Cloudflare Pages at the repo — free, and it builds previews per branch.

---

## 11. Roadmap

### Stage 1 — Modernize the static site (~8–15 h)

No frameworks. Nothing to install. Ships live.

| # | Task | Detail |
|---|---|---|
| 1.1 | Real content | Replace all placeholder projects, certificates, and the CV PDF. **Longest task — start here.** |
| 1.2 | Correctness + a11y | Remove `user-scalable=no`; real contact endpoint (Formspree/Web3Forms); fix `href="#"`; delete user-facing instructions like "Place your CV PDF at…"; skip link; focus rings; contrast pass |
| 1.3 | Performance | Delete jQuery + 5 template scripts; replace FontAwesome webfonts with inline SVG; re-encode `bg.jpg` to AVIF/WebP; subset fonts |
| 1.4 | Design refresh | Apply the editorial data-viz direction (§5) within the existing templates: OKLCH tokens, type scale, numbered section labels, hairline rules, mono metadata |
| 1.5 | Sharing + SEO | OG/Twitter tags with a 1200×630 image, favicon, `sitemap.xml`, `robots.txt`, JSON-LD `Person` |
| 1.6 | Repo hygiene | Un-ignore `package-lock.json`; delete the duplicate `gitignore`; archive old assets |
| 1.7 | Deploy | Confirm `main` builds and serves correctly on Pages |

**Exit:** zero placeholder strings, Lighthouse ≥ 90, both themes pass contrast, CV downloads, contact form delivers.

### Stage 2 — React fundamentals (~15–25 h)

Standalone exercises, **not** the portfolio. Order matters.

1. JSX, components, props
2. Rendering lists + `key`
3. `useState` and why state is not a variable
4. Events and controlled forms
5. Conditional rendering and composition
6. `useEffect` and data loading (last — it is the most misunderstood)
7. TypeScript basics *(types only, keep it light)*

**Practice builds:** filterable card grid → theme toggle → small data table with sorting.

**Exit:** you can build a component that takes data as props and renders a filterable list without following a tutorial.

### Stage 3 — Rebuild as React + PWA (~30–50 h)

Built on branch `react-rebuild`; Stage 1 stays live on `main` throughout. Swap only when the new site is genuinely better.

| # | Task |
|---|---|
| 3.1 | Install Node 24 LTS + pnpm; scaffold Vite + React + TS; empty deploy succeeds |
| 3.2 | Port design tokens to Tailwind v4 `@theme`; rebuild theme toggle locally |
| 3.3 | Sections as components: Hero, About, Projects, Skills, Certificates, Contact |
| 3.4 | Content as typed data files — no hand-written repeated markup |
| 3.5 | React Router; `/work` and `/work/[slug]`; `404.html` fallback for Pages |
| 3.6 | PWA (manifest, icons, Workbox, install + update UX, offline page) — **do this last** |
| 3.7 | QA against §8 budgets; swap Pages source; archive Stage 1 |

**Deliberately cut from v1:** Motion library, command palette, filterable grid, View Transitions, any WebGL.

**Exit:** §13 Definition of done, Stage 3.

---

## 12. Blockers & open questions

1. **No package manager.** `node v18.19.1` only — EOL since April 2025, and `npm`/`npx`/`pnpm` are all absent. Blocks **Stage 3** only; Stage 1 needs nothing but an editor and a browser.
2. **No CV PDF.** `assets/resume/` contains only a README. The download button is currently dead. *Blocks Stage 1 launch.*
3. **No real project content.** Six placeholder cards. *Blocks Stage 1 launch — this is the critical path.*
4. **No real certificates.** Table is placeholder. Hide the section until there are entries.
5. **Contact delivery.** Static hosting has no server. Choose: Formspree, Web3Forms, or `mailto:`. *Blocks Stage 1 launch.*
6. **Analytics.** Recommend Plausible/Umami/GoatCounter (privacy-friendly, no cookie banner). Or none — also a valid answer.
7. **Custom domain?** Optional. Say now if wanted, since it affects canonical URLs.
8. **Weekly time budget.** The estimates assume 6–8 h/week. Tell me the real number and I will re-cut the stages.

---

## 13. Definition of done

### Stage 1 — static site

- [ ] Zero placeholder strings anywhere; certificates section hidden if empty
- [ ] CV PDF downloads successfully
- [ ] Contact form delivers to a real inbox
- [ ] Pinch-zoom works; skip link; visible focus rings; both themes ≥ 4.5:1
- [ ] jQuery, template scripts, and webfonts removed
- [ ] OG tags render a correct card when the URL is pasted into LinkedIn
- [ ] Lighthouse ≥ 90 across all four categories
- [ ] Keyboard-only navigation works end to end

### Stage 3 — React rebuild

- [ ] One design system, no residual template code
- [ ] Real content in every section; zero placeholders
- [ ] `/work/[slug]` pages render correctly and deep-link without 404
- [ ] Installable PWA on Android; add-to-home-screen works on iOS
- [ ] Offline reload shows a usable page, not a browser error
- [ ] Lighthouse ≥ 95 × 4; axe clean; keyboard-only navigable
- [ ] Both themes meet contrast, no flash on load
- [ ] Deploy is automated; `main` always reflects production
- [ ] README rewritten to match reality
- [ ] Old URLs (`/#about`, `projects.html`) still resolve or redirect
