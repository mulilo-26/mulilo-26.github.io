# Emmanuel Mulilo — Portfolio

Personal site for Emmanuel Mulilo, Computer Science student: local AI, database
systems, and networking projects.

**Live:** <https://mulilo-26.github.io>

Built with React 19, Vite 8, TypeScript, Tailwind 4, React Router, and
`vite-plugin-pwa`. Static, no backend.

## Run

Requires Node 24.

```bash
cd app
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check, build, generate 404.html + sitemap
npm run preview   # serve the production build
npm run smoke     # render every route server-side and assert its content
```

## Edit content

| File | What's in it |
|---|---|
| `app/src/data/projects.ts` | Projects and their case studies |
| `app/src/data/site.ts` | Name, email, nav, skills, education, links |
| `app/public/resume/emmanuel-mulilo-cv.pdf` | The downloadable CV |
| `app/src/index.css` | Colour tokens, fonts, base styles |
| `app/public/` | Icons, OG image, fonts |

Unknown facts are `null` in `projects.ts` and the UI omits them rather than
inventing values.

## Deploy

Push to `main`. `.github/workflows/deploy.yml` builds `app/` and publishes
`app/dist` to GitHub Pages.

- Pages **Settings → Source** must be **GitHub Actions**.
- Deep links work because `scripts/postbuild.mjs` copies `index.html` to
  `404.html`, which Pages serves for unknown paths.

The previous HTML5 UP site is preserved at the `v1-static` tag.

## Notes

- Theme is dark by default, stored in `localStorage` under `mulilo-theme`.
- The service worker excludes `/resume/` and `*.pdf` from the SPA fallback so
  the CV downloads as a real PDF.

## License

MIT — see [LICENSE](LICENSE). Space Grotesk is used under the SIL Open Font License.
