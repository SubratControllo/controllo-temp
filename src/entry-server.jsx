import { StrictMode } from 'react';
import { renderToReadableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import {
  absoluteUrl,
  buildStructuredData,
  getFullTitle,
  getSeoPage,
  seoConfig,
} from './config/seo';
import { publicRoutePaths } from './config/routes';

export async function render(url) {
  const stream = await renderToReadableStream(
    <StrictMode>
      <StaticRouter location={url}><App /></StaticRouter>
    </StrictMode>,
  );
  await stream.allReady;
  return new Response(stream).text();
}

export function getSeoPayload(url) {
  const page = getSeoPage(url);
  return {
    page,
    title: getFullTitle(page),
    canonicalUrl: absoluteUrl(page.canonical),
    ogImage: absoluteUrl(page.ogImage || seoConfig.site.defaultOgImage),
    structuredData: buildStructuredData(url, page),
    site: seoConfig.site,
  };
}

export const prerenderRoutes = publicRoutePaths;
