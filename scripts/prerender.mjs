import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'vite';

const root = process.cwd();
const checkOnly = process.argv.includes('--check');
const dist = path.join(root, 'dist');
const template = await readFile(path.join(checkOnly ? root : dist, 'index.html'), 'utf8');
const server = await createServer({
  root,
  appType: 'custom',
  logLevel: 'silent',
  server: { hmr: false, middlewareMode: true },
});

const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('"', '&quot;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;');

const meta = (attribute, key, content) => (
  `<meta ${attribute}="${key}" content="${escapeHtml(content)}">`
);

const buildHead = ({ page, title, canonicalUrl, ogImage, structuredData, site }) => {
  const staging = ['preview', 'staging'].includes(process.env.VITE_SITE_ENV);
  const robots = staging ? 'noindex,nofollow' : page.robots;
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    meta('name', 'description', page.description),
    meta('name', 'robots', robots),
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}">`,
    meta('property', 'og:type', 'website'),
    meta('property', 'og:title', page.ogTitle || title),
    meta('property', 'og:description', page.ogDescription || page.description),
    meta('property', 'og:url', canonicalUrl),
    meta('property', 'og:image', ogImage),
    meta('property', 'og:site_name', site.siteName),
    meta('property', 'og:locale', site.locale),
    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', page.twitterTitle || page.ogTitle || title),
    meta('name', 'twitter:description', page.ogDescription || page.description),
    meta('name', 'twitter:image', page.twitterImage ? new URL(page.twitterImage, `${site.canonicalOrigin}/`).href : ogImage),
  ];

  if (site.twitterHandle) tags.push(meta('name', 'twitter:site', site.twitterHandle));
  if (process.env.VITE_GOOGLE_SITE_VERIFICATION) {
    tags.push(meta('name', 'google-site-verification', process.env.VITE_GOOGLE_SITE_VERIFICATION));
  }
  if (process.env.VITE_BING_SITE_VERIFICATION) {
    tags.push(meta('name', 'msvalidate.01', process.env.VITE_BING_SITE_VERIFICATION));
  }
  tags.push(`<script id="controllo-structured-data" type="application/ld+json">${JSON.stringify(structuredData).replaceAll('<', '\\u003c')}</script>`);
  return tags.join('\n    ');
};

const assertDocument = (route, document) => {
  const failures = [
    ['title', /<title>[^<]+<\/title>/],
    ['description', /<meta name="description" content="[^"]+">/],
    ['canonical', /<link rel="canonical" href="https:\/\/controllo\.ai\/[^"]*">/],
    ['H1', /<h1\b/i],
    ['structured data', /type="application\/ld\+json"/],
  ].filter(([, pattern]) => !pattern.test(document));
  if (failures.length) throw new Error(`${route}: missing ${failures.map(([name]) => name).join(', ')}`);
};

try {
  const { getSeoPayload, prerenderRoutes, render } = await server.ssrLoadModule('/src/entry-server.jsx');
  const routes = [...prerenderRoutes, '/__404__'];

  for (const route of routes) {
    const body = await render(route);
    const head = buildHead(getSeoPayload(route));
    const document = template
      .replace('<!--seo-head-->', head)
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    assertDocument(route, document);

    if (!checkOnly) {
      const output = route === '/'
        ? path.join(dist, 'index.html')
        : route === '/__404__'
          ? path.join(dist, '404.html')
          : path.join(dist, route.slice(1), 'index.html');
      await mkdir(path.dirname(output), { recursive: true });
      await writeFile(output, document);
    }
  }

  console.log(`${checkOnly ? 'SSR checked' : 'Prerendered'} ${routes.length} routes.`);
} finally {
  await server.close();
}
