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

export const riskCells = Array.from({ length: 25 }, (_, index) => ({
  id: `${String.fromCharCode(65 + Math.floor(index / 5))}${(index % 5) + 1}`,
  critical: index === 6 || index === 18
}));

export const platformDomains = [
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    eyebrow: 'Cybersecurity operations',
    title: 'Implement controls with the evidence and owners attached.',
    description: 'Run security compliance across frameworks without separating implementation, policies, evidence, risk, and audit collaboration.',
    features: ['Control implementation', 'Evidence management', 'Policy management', 'Audit collaboration'],
    cta: ['Explore cybersecurity', '/solutions/cybersecurity'],
    preview: {
      label: 'Framework readiness',
      title: 'SOC 2',
      meta: '82% ready',
      metric: '12 controls advanced',
      rows: [
        ['Access reviews', 'Evidence current', 'Ready'],
        ['Encryption policy', 'Owner review', 'Review'],
        ['Vendor monitoring', 'Mapped to 3 frameworks', 'Synced']
      ]
    }
  },
  {
    id: 'privacy',
    label: 'Privacy',
    eyebrow: 'Privacy operations',
    title: 'Operationalize privacy across data, systems, and teams.',
    description: 'Build and maintain ROPA, conduct DPIA and PIA reviews, document data flows, and keep PII accountability visible.',
    features: ['ROPA', 'DPIA / PIA', 'Data flows', 'PII tracking'],
    cta: ['Explore privacy operations', '/solutions/privacy'],
    preview: {
      label: 'Records of processing activities',
      title: 'Customer onboarding',
      meta: 'Owner assigned',
      metric: 'DPIA review due',
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
      title: 'Support assistant',
      meta: 'Assessment active',
      metric: 'Medium inherent risk',
      rows: [
        ['Business owner', 'Customer operations', 'Assigned'],
        ['System status', 'Production', 'Active'],
        ['Risk assessment', 'Human oversight', 'Review']
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
