export const navigationItems = [
  ['Platform', '#platform'],
  ['Secura AI', '#secura'],
  ['Frameworks', '#frameworks'],
  ['Customers', '#customers']
];

export const trustMarks = ['CloudNorth', 'VECTORLAB', 'Railbird', 'NOVA Health', 'Fyndra'];

export const operatingSteps = [
  ['Connect', 'Bring cloud, identity, code, and business systems into one evidence stream.'],
  ['Validate', 'Check freshness, ownership, scope, and audit usefulness automatically.'],
  ['Map', 'Reuse one approved control across every framework that matters.'],
  ['Collaborate', 'Route decisions to the right people with the context already attached.'],
  ['Report', 'Give leadership and auditors a clear, current view of assurance.']
];

const riskLevelRows = [
  ['controlled', 'high', 'low', 'controlled', 'moderate'],
  ['critical', 'controlled', 'low', 'moderate', 'controlled'],
  ['low', 'controlled', 'high', 'controlled', 'critical'],
  ['controlled', 'moderate', 'controlled', 'low', 'high'],
  ['moderate', 'controlled', 'low', 'controlled', 'controlled']
];

export const riskCells = riskLevelRows.flatMap((row, rowIndex) =>
  row.map((level, columnIndex) => ({
    id: `${String.fromCharCode(65 + rowIndex)}${columnIndex + 1}`,
    level,
    critical: level === 'critical'
  }))
);

export const platformDomains = [
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    eyebrow: 'Cybersecurity operations',
    title: 'Keep security controls ready with evidence, risk, and audit context.',
    description: 'Run security compliance across frameworks without separating implementation, policies, evidence, risk, and audit collaboration.',
    features: ['Control implementation', 'Evidence management', 'Policy management', 'Audit collaboration'],
    cta: ['Explore cybersecurity', '/solutions/cybersecurity'],
    preview: {
      label: 'Framework readiness',
      title: 'SOC 2',
      meta: '82% ready',
      metric: '12 controls advanced',
      rows: [
        ['Implementation', 86, 'On track'],
        ['Policies & procedures', 78, 'Review'],
        ['Evidence', 82, 'Current']
      ]
    }
  },
  {
    id: 'privacy',
    label: 'Privacy',
    eyebrow: 'Privacy operations',
    title: 'Operationalize privacy across data, systems, and teams.',
    description: 'Build and maintain ROPA, conduct DPIA and PIA reviews, document data flows, and keep PII accountability visible.',
    features: ['ROPA', 'DPIA / PIA', 'Data Flows & PII', 'Consent management'],
    cta: ['Explore privacy operations', '/solutions/privacy'],
    preview: {
      label: 'Data flow diagram',
      title: 'Customer onboarding',
      meta: 'PII mapped',
      metric: 'PII flows mapped',
      rows: [
        ['Processing purpose', 'Account activation', 'Recorded'],
        ['Data categories', 'Contact and identity', 'Mapped'],
        ['Retention', 'Owner confirmation', 'Review']
      ]
    }
  },
  {
    id: 'ai-governance',
    label: 'AI governance',
    eyebrow: 'AI governance',
    title: 'Govern every AI system with clear ownership and risk context.',
    description: 'Maintain an AI inventory, assign accountable owners, track system status, and connect AI-specific risks to governance work.',
    features: ['AI inventory', 'Accountability', 'System status', 'AI-specific risk'],
    cta: ['Explore AI governance', '/solutions/ai-governance'],
    preview: {
      label: 'AI system inventory',
      title: 'Customer support assistant',
      meta: 'System active',
      metric: 'Moderate inherent risk',
      rows: [
        ['AI owner', 'Owner assigned', 'Current'],
        ['AI risk rating', 'Moderate', 'Scored'],
        ['Linked AI risks', 'Evaluated', 'Tracked']
      ]
    }
  }
];

export const connectedCapabilities = [
  {
    id: 'risk-management',
    eyebrow: 'Connected risk',
    title: 'Risk management',
    description: 'Score and assign risk across assets, the organization, vendors, privacy, and AI—while keeping control relationships visible.',
    cta: ['Explore risk management', '/platform/risk-management']
  },
  {
    id: 'cloud-monitoring',
    eyebrow: 'Live environment context',
    title: 'Cloud monitoring',
    description: 'Bring AWS, Azure, Google Cloud, Microsoft environments, and Google Workspace signals into compliance and risk decisions.',
    cta: ['Explore cloud monitoring', '/platform/cloud-monitoring']
  }
];

export const blogArticles = [
  {
    category: 'Continuous compliance',
    title: 'Continuous Compliance – Simplify Security & Regulatory Management',
    summary: 'A practical introduction to keeping compliance work current between audit cycles.',
    href: '/blog/continuous-compliance/'
  },
  {
    category: 'Cybersecurity',
    title: 'ISO 27001 vs SOC 2—Which Is Best for Your Business?',
    summary: 'Understand how the two assurance paths differ and where their operating work overlaps.',
    href: '/blog/iso-27001-vs-soc-2-which-is-best/'
  },
  {
    category: 'AI governance',
    title: 'How ISO 42001 Enhances AI Governance and Ethics',
    summary: 'See how an AI management system creates clearer ownership, risk, and oversight.',
    href: '/blog/iso-42001-enhances-ai-governance/'
  }
];

export const homepageLinks = {
  blog: '/blogs/',
  demo: '/demo',
  trial: '/pricing'
};
