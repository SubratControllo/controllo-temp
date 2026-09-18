/**
 * Permanent, one-hop redirects for URLs with a verified equivalent page.
 * Do not send unrelated retired URLs to the homepage. WordPress article URLs
 * stay out of this file until their content has been reviewed and migrated.
 */
export const redirects = [
  { from: '/platform', to: '/continuous-compliance', status: 301, note: 'Flattened platform route.' },
  { from: '/platform/continuous-compliance', to: '/continuous-compliance', status: 301, note: 'Flattened platform route.' },
  { from: '/platform/risk-management', to: '/risk-management', status: 301, note: 'Flattened platform route.' },
  { from: '/platform/audit-management', to: '/audit-management', status: 301, note: 'Flattened platform route.' },
  { from: '/platform/cloud-monitoring', to: '/cloud-monitoring', status: 301, note: 'Flattened platform route.' },
  { from: '/platform/secura-ai', to: '/secura-ai', status: 301, note: 'Flattened platform route.' },
  { from: '/about-us', to: '/company', status: 301, note: 'Preserves the existing company-page intent.' },
  { from: '/schedule-a-demo', to: '/demo', status: 301, note: 'Consolidates the verified sales handoff.' },
  { from: '/contact-us', to: '/demo', status: 301, note: 'Closest published contact route.' },
  { from: '/blogs', to: '/resources', status: 301, note: 'Preserves the resource-index intent.' },
  { from: '/asset-integration', to: '/integrations', status: 301, note: 'Preserves the integration-directory intent.' },
  { from: '/asset-integration-automation', to: '/integrations', status: 301, note: 'Preserves the integration-directory intent.' },
  { from: '/risk-management-2', to: '/risk-management', status: 301, note: 'Consolidates the duplicate WordPress risk route.' },
  { from: '/privacy', to: '/solutions/privacy', status: 301, note: 'Preserves the existing privacy-product intent.' },
];
