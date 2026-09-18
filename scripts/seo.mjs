import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const command = process.argv[2] || 'check';
const loadSourceModule = async (relativePath) => {
  const source = await readFile(path.join(root, relativePath), 'utf8');
  return import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
};

const { seoConfig } = await loadSourceModule('src/config/seo.config.ts');
const { redirects } = await loadSourceModule('src/config/redirects.config.ts');
const { publicRoutePaths, pendingLegacyContentPaths } = await import(
  pathToFileURL(path.join(root, 'src/config/routes.js')).href
);

const normalize = (value) => {
  const pathname = value.split(/[?#]/, 1)[0] || '/';
  return pathname === '/' ? '/' : `/${pathname.replace(/^\/+|\/+$/g, '')}`;
};
const absolute = (value) => new URL(value, `${seoConfig.site.canonicalOrigin}/`).href;
const fullTitle = (page) => seoConfig.site.titleTemplate.replace('%s', page.title);
const isIndexable = (page) => !page.robots.toLowerCase().includes('noindex');
const xml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

function validate() {
  const errors = [];
  const warnings = [];
  const pages = Object.entries(seoConfig.pages);
  const routeSet = new Set(publicRoutePaths);
  const allowedSchema = new Set([
    'AboutPage', 'Article', 'CollectionPage', 'ContactPage', 'Organization',
    'Person', 'ProfilePage', 'SoftwareApplication', 'VideoObject', 'WebPage', 'WebSite',
  ]);

  if (!/^https:\/\/[^/]+$/.test(seoConfig.site.canonicalOrigin)) {
    errors.push('site.canonicalOrigin must be one HTTPS origin without a trailing slash.');
  }
  if (seoConfig.site.robotsDefault.includes('noindex')) {
    errors.push('Production robotsDefault must not be noindex.');
  }

  publicRoutePaths.forEach((route) => {
    if (!seoConfig.pages[route]) errors.push(`${route}: missing seo.config.ts entry.`);
  });
  pages.forEach(([route]) => {
    if (!routeSet.has(route)) errors.push(`${route}: SEO entry has no public route registry entry.`);
  });

  const duplicates = (field) => {
    const values = new Map();
    pages.filter(([, page]) => isIndexable(page)).forEach(([route, page]) => {
      const value = page[field];
      if (!value) return;
      values.set(value, [...(values.get(value) || []), route]);
    });
    values.forEach((routes, value) => {
      if (routes.length > 1) errors.push(`Duplicate ${field} on ${routes.join(', ')}: ${value}`);
    });
  };

  duplicates('title');
  duplicates('description');
  duplicates('canonical');

  pages.forEach(([route, page]) => {
    const suppressed = new Set(page.warningOverrides || []);
    if (!page.title) errors.push(`${route}: title is required.`);
    if (!page.description) errors.push(`${route}: description is required.`);
    if (!page.canonical) errors.push(`${route}: canonical is required.`);
    if (page.canonical !== normalize(page.canonical)) errors.push(`${route}: canonical must be normalized and root-relative.`);
    if (/localhost|vercel\.app|netlify\.app|staging/i.test(JSON.stringify(page))) {
      errors.push(`${route}: staging or local URL found in SEO data.`);
    }
    if (isIndexable(page) && !page.sitemap) errors.push(`${route}: indexable page is missing from the sitemap.`);
    if (!isIndexable(page) && page.sitemap) errors.push(`${route}: noindex page must not be in the sitemap.`);
    if (!Array.isArray(page.schemaTypes) || page.schemaTypes.some((type) => !allowedSchema.has(type))) {
      errors.push(`${route}: unsupported schemaTypes value.`);
    }
    if (!Array.isArray(page.faq) || page.faq.some((item) => !item.question || !item.answer)) {
      errors.push(`${route}: FAQ entries require question and answer.`);
    }
    const titleLength = fullTitle(page).length;
    if (!suppressed.has('titleLength') && (titleLength < 30 || titleLength > 65)) {
      warnings.push(`${route}: rendered title is ${titleLength} characters.`);
    }
    const descriptionLength = page.description.length;
    if (!suppressed.has('descriptionLength') && (descriptionLength < 70 || descriptionLength > 170)) {
      warnings.push(`${route}: description is ${descriptionLength} characters.`);
    }
    const image = page.ogImage || seoConfig.site.defaultOgImage;
    if (!existsSync(path.join(root, 'public', image.replace(/^\//, '')))) {
      errors.push(`${route}: OG image does not exist at public${image}.`);
    }
  });

  const redirectSources = new Set(redirects.map(({ from }) => normalize(from)));
  redirects.forEach(({ from, to, status }) => {
    const source = normalize(from);
    const target = normalize(to);
    if (![301, 308].includes(status)) errors.push(`${from}: redirect status must be 301 or 308.`);
    if (source === target) errors.push(`${from}: redirect loop.`);
    if (redirectSources.has(target)) errors.push(`${from}: redirect chain through ${to}.`);
    if (!routeSet.has(target)) errors.push(`${from}: target ${to} is not a published route.`);
  });

  return { errors, warnings };
}

async function generate() {
  const staging = ['preview', 'staging'].includes(process.env.VITE_SITE_ENV);
  const entries = Object.entries(seoConfig.pages)
    .filter(([route, page]) => publicRoutePaths.includes(route) && page.sitemap && isIndexable(page));
  const urls = entries.map(([, page]) => [
    '  <url>',
    `    <loc>${xml(absolute(page.canonical))}</loc>`,
    page.lastModified ? `    <lastmod>${xml(page.lastModified)}</lastmod>` : '',
    page.changeFrequency ? `    <changefreq>${xml(page.changeFrequency)}</changefreq>` : '',
    Number.isFinite(page.priority) ? `    <priority>${page.priority.toFixed(1)}</priority>` : '',
    '  </url>',
  ].filter(Boolean).join('\n')).join('\n');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  const robots = staging
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${seoConfig.site.canonicalOrigin}/sitemap.xml\n`;
  const redirectFile = `${redirects.map(({ from, to, status }) => `${from} ${to} ${status}!`).join('\n')}\n/* /404.html 404\n`;
  const headers = [
    '/*',
    '  X-Content-Type-Options: nosniff',
    '  Referrer-Policy: strict-origin-when-cross-origin',
    '  Permissions-Policy: camera=(), microphone=(), geolocation=()',
    ...(staging ? ['  X-Robots-Tag: noindex, nofollow'] : []),
    '',
    '/assets/*.js',
    '  Cache-Control: public, max-age=31536000, immutable',
    '',
    '/assets/*.css',
    '  Cache-Control: public, max-age=31536000, immutable',
    '',
  ].join('\n');

  await Promise.all([
    writeFile(path.join(root, 'public/sitemap.xml'), sitemap),
    writeFile(path.join(root, 'public/robots.txt'), robots),
    writeFile(path.join(root, 'public/_redirects'), redirectFile),
    writeFile(path.join(root, 'public/_headers'), headers),
  ]);
  await generateReports();
  console.log(`Generated ${entries.length} sitemap URLs, robots, redirects, headers, and SEO reports.`);
}

async function generateReports() {
  const rows = Object.entries(seoConfig.pages).map(([route, page]) => (
    `| \`${route}\` | ${page.schemaTypes.includes('SoftwareApplication') ? 'product' : page.schemaTypes.includes('CollectionPage') ? 'directory' : 'page'} | ${page.title} | \`${page.canonical}\` | ${page.robots} | ${page.schemaTypes.join(', ') || 'none'} | ${page.sitemap ? 'yes' : 'no'} | ${page.lastModified || '—'} |`
  ));
  const registry = `# SEO page registry\n\nGenerated from \`src/config/seo.config.ts\`. Do not edit this table by hand.\n\n| Route | Type | Title | Canonical | Robots | Schema | Sitemap | Last modified |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n${rows.join('\n')}\n`;
  const redirectRows = redirects.map(({ from, to, status, note }) => `| \`${from}\` | \`${to}\` | ${status} | ${note} |`);
  const pendingRows = pendingLegacyContentPaths.map((route) => `| \`${route}\` | Pending | Preserve on WordPress, proxy, or migrate after editorial and claim review. |`);
  const migration = `# SEO migration report\n\nThe verified one-hop mappings below are generated from \`src/config/redirects.config.ts\`. The full 259-URL WordPress inventory remains in \`docs/research/2026-08-29-controllo-live-route-inventory.md\`.\n\n## Approved redirects\n\n| Old URL | New URL | Status | Notes |\n| --- | --- | --- | --- |\n${redirectRows.join('\n')}\n\n## Content routes awaiting a cutover decision\n\n| Existing URL | Status | Required action |\n| --- | --- | --- |\n${pendingRows.join('\n')}\n\nDo not redirect the pending articles to the homepage or resource index merely to avoid a 404.\n`;
  await mkdir(path.join(root, 'docs'), { recursive: true });
  await Promise.all([
    writeFile(path.join(root, 'docs/SEO-PAGE-REGISTRY.md'), registry),
    writeFile(path.join(root, 'docs/SEO-MIGRATION-REPORT.md'), migration),
  ]);
}

async function checkLinks() {
  const known = new Set(publicRoutePaths);
  const redirectSources = new Set(redirects.map(({ from }) => normalize(from)));
  const pending = new Set(pendingLegacyContentPaths.map(normalize));
  const linkedRoutes = new Set(['/']);
  const errors = [];
  const warnings = [];
  const { createServer } = await import('vite');
  const server = await createServer({
    root,
    appType: 'custom',
    logLevel: 'silent',
    server: { hmr: false, middlewareMode: true },
  });

  try {
    const { render } = await server.ssrLoadModule('/src/entry-server.jsx');
    for (const sourceRoute of publicRoutePaths) {
      const html = await render(sourceRoute);
      const matches = html.matchAll(/href="([^"]+)"/g);
      for (const match of matches) {
        const value = match[1];
        if (/localhost|127\.0\.0\.1|vercel\.app|netlify\.app|staging/i.test(value)) {
          errors.push(`${sourceRoute}: local or staging link ${value}`);
          continue;
        }

        let routeValue = value;
        if (/^https?:\/\//.test(value)) {
          const url = new URL(value);
          if (url.origin !== seoConfig.site.canonicalOrigin) {
            if (url.protocol === 'http:') warnings.push(`${sourceRoute}: external HTTP link ${value}`);
            continue;
          }
          if (url.protocol !== 'https:') errors.push(`${sourceRoute}: canonical-domain link must use HTTPS: ${value}`);
          routeValue = url.pathname;
        }

        if (!routeValue.startsWith('/') || routeValue.startsWith('//') || routeValue.startsWith('/assets/')) continue;
        const route = normalize(routeValue);
        linkedRoutes.add(route);
        if (redirectSources.has(route)) {
          errors.push(`${sourceRoute}: internal link points to redirect ${value}`);
          continue;
        }
        if (!known.has(route) && !pending.has(route)) {
          errors.push(`${sourceRoute}: unknown internal route ${value}`);
        }
      }
    }
  } finally {
    await server.close();
  }

  Object.entries(seoConfig.pages)
    .filter(([route, page]) => route !== '/' && page.sitemap && isIndexable(page))
    .forEach(([route]) => {
      if (!linkedRoutes.has(route)) warnings.push(`${route}: indexable route has no detected static inbound link.`);
    });

  pendingLegacyContentPaths.forEach((route) => {
    warnings.push(`${route}: linked WordPress content still needs a cutover hosting decision.`);
  });
  return { errors, warnings };
}

const report = ({ errors, warnings }, label) => {
  warnings.forEach((item) => console.warn(`WARN ${item}`));
  errors.forEach((item) => console.error(`ERROR ${item}`));
  console.log(`${label}: ${errors.length} error(s), ${warnings.length} warning(s).`);
  if (errors.length) process.exitCode = 1;
};

if (command === 'check') report(validate(), 'SEO check');
else if (command === 'generate') await generate();
else if (command === 'links') report(await checkLinks(), 'Link check');
else if (command === 'registry') await generateReports();
else throw new Error(`Unknown SEO command: ${command}`);
