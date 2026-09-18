import { seoConfig } from './seo.config.ts';

export const normalizePath = (value = '/') => {
  const path = value.split(/[?#]/, 1)[0] || '/';
  return path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`;
};

export const absoluteUrl = (value) => new URL(value, `${seoConfig.site.canonicalOrigin}/`).href;

export const getSeoPage = (pathname) => (
  seoConfig.pages[normalizePath(pathname)] ?? seoConfig.notFound
);

export const getFullTitle = (page) => (
  seoConfig.site.titleTemplate.replace('%s', page.title || seoConfig.site.defaultTitle)
);

export const getBreadcrumbs = (pathname) => {
  const path = normalizePath(pathname);
  const current = seoConfig.pages[path];
  if (!current || path === '/') return [];

  const items = [{ name: 'Home', path: '/' }];
  if (current.parent && seoConfig.pages[current.parent]) {
    const parent = seoConfig.pages[current.parent];
    items.push({ name: parent.breadcrumbLabel || parent.title, path: parent.canonical });
  }
  items.push({ name: current.breadcrumbLabel || current.title, path: current.canonical });
  return items;
};

export const buildStructuredData = (pathname, page = getSeoPage(pathname)) => {
  const canonicalUrl = absoluteUrl(page.canonical);
  const organizationId = `${seoConfig.site.canonicalOrigin}/#organization`;
  const websiteId = `${seoConfig.site.canonicalOrigin}/#website`;
  const graph = [];

  if (page.schemaTypes.includes('Organization')) {
    graph.push({
      '@type': 'Organization',
      '@id': organizationId,
      name: seoConfig.site.organizationName,
      url: `${seoConfig.site.canonicalOrigin}/`,
      logo: { '@type': 'ImageObject', url: absoluteUrl(seoConfig.site.organizationLogo) },
    });
  }

  if (page.schemaTypes.includes('WebSite')) {
    graph.push({
      '@type': 'WebSite',
      '@id': websiteId,
      name: seoConfig.site.siteName,
      url: `${seoConfig.site.canonicalOrigin}/`,
      publisher: { '@id': organizationId },
    });
  }

  page.schemaTypes
    .filter((type) => !['Organization', 'WebSite', 'FAQPage', 'BreadcrumbList'].includes(type))
    .forEach((type) => {
      const item = {
        '@type': type,
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: page.title,
        description: page.description,
        isPartOf: { '@id': websiteId },
      };
      if (type === 'SoftwareApplication') {
        item.applicationCategory = 'BusinessApplication';
        item.operatingSystem = 'Web';
      }
      graph.push(item);
    });

  const breadcrumbs = getBreadcrumbs(pathname);
  if (breadcrumbs.length > 1) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.path),
      })),
    });
  }

  if (page.faq.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}#faq`,
      mainEntity: page.faq.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
};

export { seoConfig };
