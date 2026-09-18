/**
 * CONTROLLO SEO SOURCE OF TRUTH
 *
 * Routine SEO work should happen in this file only. Safe editorial fields:
 * title, description, canonical, robots, ogTitle, ogDescription, ogImage,
 * twitterTitle, twitterImage, targetKeywords, faq, schemaTypes, sitemap,
 * priority, changeFrequency, lastModified, breadcrumbLabel, and parent.
 *
 * Keep canonical values as root-relative paths. Set `sitemap: false` whenever
 * a page is noindex. FAQ entries must also be visible on the page; do not add
 * FAQ schema solely for search engines. Change canonicalOrigin, organization
 * identity, schema types, or route keys only with developer review.
 */

const page = (title, description, options = {}) => ({
  title,
  description,
  canonical: options.canonical,
  robots: options.robots ?? 'index,follow',
  ogTitle: options.ogTitle,
  ogDescription: options.ogDescription,
  ogImage: options.ogImage,
  twitterTitle: options.twitterTitle,
  twitterImage: options.twitterImage,
  targetKeywords: options.targetKeywords ?? [],
  faq: options.faq ?? [],
  schemaTypes: options.schemaTypes ?? ['WebPage'],
  sitemap: options.sitemap ?? true,
  priority: options.priority,
  changeFrequency: options.changeFrequency,
  lastModified: options.lastModified,
  breadcrumbLabel: options.breadcrumbLabel,
  parent: options.parent,
  warningOverrides: options.warningOverrides ?? [],
});

export const seoConfig = {
  site: {
    siteName: 'Controllo',
    defaultTitle: 'Connected compliance, risk, privacy, and AI governance',
    titleTemplate: '%s | Controllo',
    defaultDescription: 'Connect controls, evidence, risk, privacy, AI governance, cloud context, and audit work in one continuously current platform.',
    canonicalOrigin: 'https://controllo.ai',
    defaultOgImage: '/og/controllo-default.png',
    twitterHandle: '',
    locale: 'en_US',
    organizationName: 'Controllo',
    organizationLogo: '/assets/logo-dark.svg',
    robotsDefault: 'index,follow',
  },
  pages: {
    '/': page(
      'Connected compliance, risk, privacy, and AI governance',
      'Connect controls, evidence, risk, privacy, AI governance, cloud context, and audit work in one continuously current platform.',
      { canonical: '/', schemaTypes: ['Organization', 'WebSite'], priority: 1, changeFrequency: 'weekly', lastModified: '2026-09-01' },
    ),
    '/continuous-compliance': page(
      'Continuous Compliance Software and Audit Readiness',
      'Keep SOC 2 and ISO/IEC 27001 readiness moving with connected controls, evidence, Secura-assisted review, and progress across supported frameworks.',
      { canonical: '/continuous-compliance', schemaTypes: ['SoftwareApplication'], priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-09-09', breadcrumbLabel: 'Continuous compliance' },
    ),
    '/risk-management': page(
      'Risk Management Software for Cyber, Privacy & AI',
      'Assess organization, asset, vendor, privacy, and AI risk context with structured assessments, owners, registers, and heatmaps in Controllo.',
      { canonical: '/risk-management', schemaTypes: ['SoftwareApplication'], priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-09-16', breadcrumbLabel: 'Risk management' },
    ),
    '/audit-management': page(
      'Audit management software for compliance & GRC',
      'Review framework scope, linked policy and evidence records, auditor assignments, and framework report exports in Controllo.',
      { canonical: '/audit-management', schemaTypes: ['SoftwareApplication'], priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-09-16', breadcrumbLabel: 'Audit management' },
    ),
    '/cloud-monitoring': page(
      'Cloud Security & Compliance Monitoring',
      'Monitor supported AWS, Azure, GCP, Microsoft 365, and Google Workspace environments with current asset, configuration, identity, security, and available exposure context.',
      { canonical: '/cloud-monitoring', schemaTypes: ['SoftwareApplication'], priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-09-17', breadcrumbLabel: 'Cloud monitoring' },
    ),
    '/secura-ai': page(
      'Secura AI for Compliance Gap Analysis',
      'Review control requirements against implementation details, policies, procedures, and evidence. Secura AI surfaces gaps and prepares next actions for human review.',
      { canonical: '/secura-ai', schemaTypes: ['SoftwareApplication'], priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-09-18', breadcrumbLabel: 'Secura AI' },
    ),
    '/solutions/cybersecurity': page(
      'Cybersecurity and cloud security',
      'Connect cyber framework implementation, evidence, risk, auditor collaboration, and regularly refreshed cloud and workforce visibility in Controllo.',
      { canonical: '/solutions/cybersecurity', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-09-07', breadcrumbLabel: 'Cybersecurity', parent: '/solutions' },
    ),
    '/solutions/privacy': page(
      'Privacy operations and management software',
      'Maintain ROPA, conduct DPIA and PIA reviews, document data flows, and keep PII accountability visible across the privacy program.',
      { canonical: '/solutions/privacy', priority: 0.8, changeFrequency: 'monthly', breadcrumbLabel: 'Privacy operations', parent: '/solutions' },
    ),
    '/solutions/ai-governance': page(
      'Operational AI governance and risk',
      'Connect AI systems, accountable owners, risk assessment, controls, and evidence in one operational governance view.',
      { canonical: '/solutions/ai-governance', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-09-07', breadcrumbLabel: 'AI governance', parent: '/solutions' },
    ),
    '/solutions/enterprise': page(
      'Enterprise GRC and assurance programs',
      'Create shared compliance visibility across products, teams, and business units while keeping ownership and framework scope clear.',
      { canonical: '/solutions/enterprise', robots: 'noindex,follow', sitemap: false, breadcrumbLabel: 'Enterprise', parent: '/solutions' },
    ),
    '/solutions/growing-teams': page(
      'Compliance operations for growing teams',
      'Build a focused compliance foundation with guided setup, connected evidence, accountable owners, and a path to additional frameworks.',
      { canonical: '/solutions/growing-teams', robots: 'noindex,follow', sitemap: false, breadcrumbLabel: 'Growing teams', parent: '/solutions' },
    ),
    '/integrations': page(
      'Compliance and security integrations',
      'Connect Controllo to the systems where security and compliance work already happens.',
      { canonical: '/integrations', schemaTypes: ['CollectionPage'], priority: 0.8, changeFrequency: 'monthly', breadcrumbLabel: 'Integrations' },
    ),
    '/frameworks': page(
      'Compliance frameworks',
      'Build reusable compliance programs across security, privacy, and AI governance frameworks.',
      { canonical: '/frameworks', schemaTypes: ['CollectionPage'], priority: 0.9, changeFrequency: 'monthly', breadcrumbLabel: 'Frameworks' },
    ),
    '/frameworks/soc-2': page(
      'Build a continuously ready SOC 2 program',
      'Connect Trust Services Criteria to the controls, evidence, and owners that keep your SOC 2 program moving.',
      { canonical: '/frameworks/soc-2', priority: 0.8, changeFrequency: 'monthly', breadcrumbLabel: 'SOC 2', parent: '/frameworks' },
    ),
    '/frameworks/iso-27001': page(
      'Make your ISO 27001 ISMS easier to operate',
      'Keep risks, controls, evidence, and improvement activity connected throughout the ISO/IEC 27001 certification lifecycle.',
      { canonical: '/frameworks/iso-27001', priority: 0.8, changeFrequency: 'monthly', breadcrumbLabel: 'ISO/IEC 27001', parent: '/frameworks' },
    ),
    '/frameworks/hipaa': page(
      'Coordinate safeguards around health information',
      'Organize HIPAA administrative, physical, and technical safeguard work with clear ownership and evidence.',
      { canonical: '/frameworks/hipaa', priority: 0.8, changeFrequency: 'monthly', breadcrumbLabel: 'HIPAA', parent: '/frameworks' },
    ),
    '/resources': page(
      'Compliance, risk and audit readiness resources',
      'Practical guidance for operating continuous compliance, risk, privacy, AI governance, and audit readiness.',
      { canonical: '/resources', schemaTypes: ['CollectionPage'], priority: 0.7, changeFrequency: 'weekly', breadcrumbLabel: 'Resources' },
    ),
    '/pricing': page(
      'Controllo packages',
      'Explore capability-based Controllo packages for growing and enterprise compliance teams.',
      { canonical: '/pricing', robots: 'noindex,follow', sitemap: false, breadcrumbLabel: 'Packages' },
    ),
    '/demo': page(
      'Request a Controllo demo',
      'Request a focused Controllo walkthrough shaped around your compliance program and readiness priorities.',
      { canonical: '/demo', schemaTypes: ['ContactPage'], priority: 0.7, changeFrequency: 'monthly', breadcrumbLabel: 'Request a demo' },
    ),
    '/company': page(
      'About Controllo',
      'Controllo helps security and GRC teams turn assurance work into a connected, current system.',
      { canonical: '/company', schemaTypes: ['AboutPage'], priority: 0.5, changeFrequency: 'yearly', breadcrumbLabel: 'Company' },
    ),
    '/security': page(
      'Security at Controllo',
      'Learn how Controllo approaches clear ownership, controlled access, resilient operations, and responsible security reporting.',
      { canonical: '/security', priority: 0.5, changeFrequency: 'yearly', breadcrumbLabel: 'Security' },
    ),
    '/privacy-policy': page(
      'Controllo privacy policy',
      'Read how the Controllo website intends to handle information and privacy choices.',
      { canonical: '/privacy-policy', robots: 'noindex,follow', sitemap: false, breadcrumbLabel: 'Privacy policy' },
    ),
    '/terms': page(
      'Controllo website terms',
      'Read the terms governing use of the Controllo website and its published product information.',
      { canonical: '/terms', robots: 'noindex,follow', sitemap: false, breadcrumbLabel: 'Terms' },
    ),
    '/accessibility': page(
      'Accessibility at Controllo',
      'Learn about Controllo website support for keyboard navigation, visible focus, readable contrast, and reduced motion.',
      { canonical: '/accessibility', priority: 0.3, changeFrequency: 'yearly', breadcrumbLabel: 'Accessibility' },
    ),
  },
  notFound: page(
    'Page not found',
    'The requested Controllo page could not be found.',
    { canonical: '/404', robots: 'noindex,nofollow', sitemap: false, schemaTypes: [] },
  ),
};
