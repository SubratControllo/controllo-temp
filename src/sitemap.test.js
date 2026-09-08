import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  frameworks,
  productRoutePaths,
  resources,
} from './data/enterpriseContent';
import { staticPages } from './data/staticPages';

const sitemap = readFileSync('public/sitemap.xml', 'utf8');

const publishedFrameworkPaths = frameworks
  .filter((framework) => !framework.comingSoon)
  .map((framework) => `/frameworks/${framework.slug}`);

const resourcePaths = resources.map((resource) => `/resources/${resource.slug}`);

const expectedPublicPaths = [
  '/',
  '/integrations',
  '/frameworks',
  '/resources',
  '/pricing',
  '/demo',
  '/solutions/cybersecurity',
  '/solutions/ai-governance',
  ...productRoutePaths,
  ...Object.keys(staticPages),
  ...publishedFrameworkPaths,
  ...resourcePaths,
];

describe('sitemap', () => {
  it('covers every published public route', () => {
    const missingPaths = [...new Set(expectedPublicPaths)].filter(
      (path) => !sitemap.includes(`https://controllo.ai${path}`),
    );

    expect(missingPaths).toEqual([]);
  });

  it('does not list framework detail pages that are marked coming soon', () => {
    const comingSoonFrameworkPaths = frameworks
      .filter((framework) => framework.comingSoon)
      .map((framework) => `/frameworks/${framework.slug}`);

    comingSoonFrameworkPaths.forEach((path) => {
      expect(sitemap).not.toContain(`https://controllo.ai${path}`);
    });
  });
});
