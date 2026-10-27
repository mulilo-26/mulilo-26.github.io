# Emmanuel Mulilo — Portfolio

Personal portfolio for **Emmanuel Mulilo**, a Computer Science student and data analyst.

**Live:** <https://mulilo-26.github.io>

---

## Stack

| Layer | Choice |
|---|---|
| UI | React 19 |
| Build | Vite 8 |
| Language | TypeScript 7 |
| Styling | Tailwind CSS 4 (OKLCH design tokens) |
| Routing | React Router 8 |
| PWA | `vite-plugin-pwa` (Workbox) |
| Hosting | GitHub Pages via GitHub Actions |

No backend. Everything is static once built.

---

## Structure

```
app/
├── src/
│   ├── components/     Header, Footer, ProjectCard, ProjectCover, …
│   ├── data/
│   │   ├── projects.ts  All project content + case studies
│   │   └── site.ts      Profile, nav, skills, social links
│   ├── lib/            useTheme, usePageMeta
│   ├── pages/          Home, Work, ProjectDetail, Resume, NotFound
│   ├── index.css       Design tokens, base styles, font faces
│   ├── App.tsx         Route table
│   └── main.tsx
├── public/             Icons, OG image, fonts, robots.txt
├── scripts/postbuild.mjs   404.html, .nojekyll, sitemap.xml
├── index.html          Meta tags, theme bootstrap, JSON-LD
└── vite.config.ts      Tailwind + PWA config
```

The original HTML5 UP site (`index.html`, `projects.html`, `assets/`) is kept as a
fallback until the React build is deployed. It is not part of the build.

---

## Development

Requires **Node 24 LTS** (Node 18 is end-of-life and will not build this).

```bash
cd app
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check, build, generate 404.html/sitemap
npm run preview    # serve the production build
npm run lint       # oxlint
```

If `node -v` reports 18, run `source ~/.bashrc` or open a new terminal.

---

## Editing content

Almost everything you need is in two files:

- **`app/src/data/projects.ts`** — one object per project. Each has a `caseStudy`
  with `problem`, `constraints`, `approach`, `result`, and `retrospective`.
  Missing facts are `null`, and the UI omits them rather than inventing values.
- **`app/src/data/site.ts`** — name, tagline, nav, skills, education, social links.

### Turning on the CV download

1. Drop the PDF at `assets/resume/emmanuel-mulilo-cv.pdf`.
2. Set `cvAvailable: true` in `app/src/data/site.ts`.

`scripts/postbuild.mjs` copies the PDF into the build automatically.

### Turning on the email link

Set `email` in `app/src/data/site.ts`. While it is `null`, the contact section
points at LinkedIn instead of showing a dead mailto.

---

## PWA

The build emits a manifest and a Workbox service worker. Installability needs
HTTPS, which GitHub Pages provides. Icons are in `app/public/`; the maskable
variant has the required safe-zone padding.

Offline behaviour: the app shell and assets are precached; images use
stale-while-revalidate. Updates apply automatically on the next navigation.

---

## Deployment

`.github/workflows/deploy.yml` builds `app/` and publishes `app/dist` to GitHub
Pages on every push to `main`.

> **Pushing to `main` deploys the React site and replaces the old one.**
> Set **Settings → Pages → Source** to **GitHub Actions** once.

Deep links work because `postbuild.mjs` copies `index.html` to `404.html`, which
Pages serves for unknown paths.

---

## License

Site code © Emmanuel Mulilo, released under the MIT License — see [LICENSE](LICENSE).

Space Grotesk is used under the SIL Open Font License.

The previous design was based on [HTML5 UP](https://html5up.net) templates
(CCA 3.0); the React build does not use them.
