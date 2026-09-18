export const staticPagePaths = [
  '/company',
  '/security',
  '/privacy-policy',
  '/terms',
  '/accessibility',
];

export const publicRoutePaths = [
  '/',
  '/continuous-compliance',
  '/risk-management',
  '/audit-management',
  '/cloud-monitoring',
  '/secura-ai',
  '/solutions/cybersecurity',
  '/solutions/privacy',
  '/solutions/ai-governance',
  '/solutions/enterprise',
  '/solutions/growing-teams',
  '/integrations',
  '/frameworks',
  '/frameworks/soc-2',
  '/frameworks/iso-27001',
  '/frameworks/hipaa',
  '/resources',
  '/pricing',
  '/demo',
  ...staticPagePaths,
];

// These remain on the current WordPress origin. They need an explicit hosting
// decision before the new static site replaces that origin.
export const pendingLegacyContentPaths = [
  '/blog/compliance-automation/',
  '/nist-privacy-framework-functions/',
  '/soc-2-compliance-cost/',
  '/pci-compliance-certification-cost/',
  '/compliance-automation-software/',
  '/soc-automation-tools/',
  '/top-nist-800-53-controls/',
];
