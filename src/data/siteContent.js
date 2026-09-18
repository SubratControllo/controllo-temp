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
    category: 'Compliance automation',
    title: 'Compliance automation: the smart way to simplify regulatory compliance',
    summary: 'A practical overview of compliance automation, common tooling, and the role of accountable human review.',
    href: 'https://controllo.ai/blog/compliance-automation/'
  },
  {
    category: 'Privacy',
    title: 'NIST Privacy Framework functions and privacy controls',
    summary: 'Understand the framework’s core functions and how they support structured privacy-risk management.',
    href: 'https://controllo.ai/nist-privacy-framework-functions/'
  },
  {
    category: 'SOC 2',
    title: 'Factors affecting SOC 2 compliance cost in 2026',
    summary: 'Review the scope, organizational, technical, and audit choices that influence SOC 2 costs.',
    href: 'https://controllo.ai/soc-2-compliance-cost/'
  },
  {
    category: 'PCI DSS',
    title: 'Understanding PCI compliance certification cost',
    summary: 'Explore the factors that shape PCI DSS assessment, remediation, and certification costs.',
    href: 'https://controllo.ai/pci-compliance-certification-cost/'
  },
  {
    category: 'Compliance automation',
    title: 'Compliance automation software for SOC 2 and risk management',
    summary: 'Learn how compliance platforms connect control work, evidence, risk, and audit preparation.',
    href: 'https://controllo.ai/compliance-automation-software/'
  },
  {
    category: 'SOC automation',
    title: 'SOC automation tools for security and compliance teams',
    summary: 'Compare the operating areas SOC automation tools can support across evidence, controls, and reporting.',
    href: 'https://controllo.ai/soc-automation-tools/'
  },
  {
    category: 'NIST',
    title: 'Understanding NIST SP 800-53 controls',
    summary: 'A guide to the control families used to organize security and privacy safeguards for information systems.',
    href: 'https://controllo.ai/top-nist-800-53-controls/'
  }
];

export const homepageLinks = {
  blog: '/resources',
  demo: '/demo'
};
