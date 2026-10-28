import { copyFile, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const dist = 'dist'
const base = 'https://mulilo-26.github.io'

// Deep links on GitHub Pages: unknown paths are served 404.html.
// Because this is a client-rendered SPA, a copy of index.html is all we need.
await copyFile(path.join(dist, 'index.html'), path.join(dist, '404.html'))

// Stop GitHub Pages from running Jekyll over the build output.
await writeFile(path.join(dist, '.nojekyll'), '')

// Sitemap from the route table plus the project slugs.
const source = await readFile(path.join('src', 'data', 'projects.ts'), 'utf8')
const slugs = [...source.matchAll(/slug: '([^']+)'/g)].map((match) => match[1])

const urls = ['/', '/work', '/resume', ...slugs.map((slug) => `/work/${slug}`)]

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map((url) => `  <url><loc>${base}${url}</loc></url>`),
  '</urlset>',
  '',
].join('\n')

await writeFile(path.join(dist, 'sitemap.xml'), sitemap)

console.log(`postbuild: 404.html, .nojekyll, sitemap.xml (${urls.length} urls)`)
