import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  absoluteUrl,
  buildStructuredData,
  getFullTitle,
  getSeoPage,
  seoConfig,
} from '../config/seo';

const upsertMeta = (selector, attribute, key, content) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
};

export default function PageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = getSeoPage(pathname);
    const title = getFullTitle(page);
    const canonicalUrl = absoluteUrl(page.canonical);
    const nonProduction = !import.meta.env.PROD
      || ['preview', 'staging'].includes(import.meta.env.VITE_SITE_ENV);
    const robots = nonProduction ? 'noindex,nofollow' : page.robots;

    document.title = title;
    upsertMeta('meta[name="description"]', 'name', 'description', page.description);
    upsertMeta('meta[name="robots"]', 'name', 'robots', robots);
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', page.ogTitle || title);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', page.ogDescription || page.description);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', absoluteUrl(page.ogImage || seoConfig.site.defaultOgImage));
    upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', seoConfig.site.siteName);
    upsertMeta('meta[property="og:locale"]', 'property', 'og:locale', seoConfig.site.locale);
    upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', page.twitterTitle || page.ogTitle || title);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', page.ogDescription || page.description);
    upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', absoluteUrl(page.twitterImage || page.ogImage || seoConfig.site.defaultOgImage));

    if (seoConfig.site.twitterHandle) {
      upsertMeta('meta[name="twitter:site"]', 'name', 'twitter:site', seoConfig.site.twitterHandle);
    }
    if (import.meta.env.VITE_GOOGLE_SITE_VERIFICATION) {
      upsertMeta('meta[name="google-site-verification"]', 'name', 'google-site-verification', import.meta.env.VITE_GOOGLE_SITE_VERIFICATION);
    }
    if (import.meta.env.VITE_BING_SITE_VERIFICATION) {
      upsertMeta('meta[name="msvalidate.01"]', 'name', 'msvalidate.01', import.meta.env.VITE_BING_SITE_VERIFICATION);
    }

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    let structured = document.head.querySelector('#controllo-structured-data');
    if (!structured) {
      structured = document.createElement('script');
      structured.id = 'controllo-structured-data';
      structured.type = 'application/ld+json';
      document.head.appendChild(structured);
    }
    structured.textContent = JSON.stringify(buildStructuredData(pathname, page));
  }, [pathname]);

  return null;
}
