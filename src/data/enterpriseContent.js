import { Boxes, ClipboardCheck, Cloud, FileSearch, Gauge, Network, Radar, ShieldCheck } from 'lucide-react';
import { brandAssets } from './brandAssets';

export const navGroups = [
  { label: 'Platform', links: [
    ['/continuous-compliance', 'Continuous compliance', 'Keep controls and evidence current.'],
    ['/risk-management', 'Risk management', 'See exposure and coordinate response.'],
    ['/audit-management', 'Audit management', 'Give every audit a clean operating layer.'],
    ['/cloud-monitoring', 'Cloud monitoring', 'Connect live environment context to compliance.'],
    ['/secura-ai', 'Secura AI', 'Move work forward with guided intelligence.']
  ]},
  { label: 'Solutions', href: '/solutions/cybersecurity', links: [
    ['/solutions/cybersecurity', 'Cybersecurity', 'Implement controls and stay ready across frameworks.'],
    ['/solutions/privacy', 'Privacy', 'Run ROPA, DPIA, data-flow, and PII work.'],
    ['/solutions/ai-governance', 'AI governance', 'Govern AI systems, owners, status, and risk.']
  ]},
  { label: 'Frameworks', href: '/frameworks' },
  { label: 'Integrations', href: '/integrations' },
  { label: 'Resources', href: '/resources' }
];

/** @type {Record<string, {eyebrow:string,title:string,description:string,accent:string,icon:import('react').ComponentType,features:Array<[string,string]>}>} */
export const productPages = {
  '/risk-management': {
    eyebrow: 'Risk management', title: 'See risk while it is still actionable.',
    description: 'Connect risk to the controls, evidence, systems, and owners that determine what happens next.',
    accent: 'teal', icon: Radar,
    features: [['Living register', 'Keep context, impact, ownership, and treatment together.'], ['Control context', 'See which controls reduce exposure and where gaps remain.'], ['Executive view', 'Translate operational detail into decision-ready signals.']]
  },
  '/cloud-monitoring': {
    eyebrow: 'Cloud monitoring', title: 'Turn live environment signals into compliance context.',
    description: 'Connect cloud configuration, identity, endpoint, and workspace information to the controls and risks your team already manages.',
    accent: 'teal', icon: Cloud,
    features: [['Cloud asset visibility', 'Bring AWS, Azure, and Google Cloud resources into one operating view.'], ['Identity and endpoint context', 'Review Microsoft Entra, Intune, Defender, and Google Workspace signals.'], ['Connected decisions', 'Keep monitoring context linked to assets, risk, and control work.']]
  },
  '/solutions/privacy': {
    eyebrow: 'Privacy', title: 'Operationalize privacy across data, systems, and teams.',
    description: 'Maintain ROPA, conduct DPIA and PIA reviews, document data flows, and keep PII accountability visible across the program.',
    accent: 'mint', icon: FileSearch,
    features: [['ROPA management', 'Document processing purpose, data categories, retention, recipients, and ownership.'], ['DPIA and PIA workflows', 'Assess privacy impact and keep the supporting decisions reviewable.'], ['Data flow and PII context', 'Connect systems, data stores, flows, and controller or processor roles.']]
  },
  '/solutions/enterprise': {
    eyebrow: 'For enterprise GRC', title: 'One assurance system across every moving part.',
    description: 'Create shared visibility without forcing every team, entity, or product into the same operating motion.',
    accent: 'navy', icon: Boxes,
    features: [['Multi-program view', 'See assurance across products, teams, and business units.'], ['Flexible ownership', 'Route accountability without losing central governance.'], ['Leadership reporting', 'Turn program activity into a clear posture narrative.']]
  },
  '/solutions/growing-teams': {
    eyebrow: 'For growing teams', title: 'Build trust without building more process.',
    description: 'Give lean security and compliance teams a focused path from first framework to a scalable assurance program.',
    accent: 'mint', icon: Gauge,
    features: [['Guided setup', 'Start with a clear readiness path and accountable owners.'], ['Connected evidence', 'Reuse the work already happening in your systems.'], ['Scale forward', 'Add frameworks without multiplying duplicate controls.']]
  }
};

const dedicatedProductRoutePaths = [
  '/continuous-compliance',
  '/risk-management',
  '/audit-management',
  '/cloud-monitoring',
  '/secura-ai',
];

export const genericProductRoutePaths = Object.keys(productPages).filter(
  (path) => !dedicatedProductRoutePaths.includes(path)
);
export const productRoutePaths = [
  ...dedicatedProductRoutePaths,
  ...genericProductRoutePaths,
];

export const frameworks = [
  { slug: 'soc-2', code: 'SOC 2', type: 'Security', title: 'Build a continuously ready SOC 2 program', summary: 'Connect Trust Services Criteria to the controls, evidence, and owners that keep your program moving.' },
  { slug: 'iso-27001', code: 'ISO 27001', type: 'Security', title: 'Make your ISMS easier to operate', summary: 'Keep risks, controls, evidence, and improvement activity connected throughout the certification lifecycle.' },
  { slug: 'hipaa', code: 'HIPAA', type: 'Privacy', title: 'Coordinate safeguards around health information', summary: 'Organize administrative, physical, and technical safeguard work with clear ownership and evidence.' },
  { slug: 'gdpr', code: 'GDPR', type: 'Privacy', title: 'Connect privacy obligations to operating work', summary: 'Keep accountability, controls, evidence, and risk decisions visible across the program.', comingSoon: true },
  { slug: 'iso-42001', code: 'ISO 42001', type: 'AI governance', title: 'Create an operating system for responsible AI', summary: 'Structure AI governance responsibilities, risks, controls, and evidence.', comingSoon: true }
];

export const frameworkShowcase = [
  {
    label: 'Security & assurance',
    frameworks: [
      'SOC 2',
      'ISO/IEC 27001',
      'NIST CSF 2.0',
      'NIST SP 800-53',
      'PCI DSS 4.0',
      'CIS Controls v8.1'
    ]
  },
  {
    label: 'Privacy',
    frameworks: [
      'HIPAA',
      'GDPR',
      'ISO/IEC 27701',
      'CPRA',
      'NIST Privacy Framework'
    ]
  },
  {
    label: 'AI governance',
    frameworks: ['ISO/IEC 42001', 'NIST AI RMF', 'EU AI Act']
  },
  {
    label: 'Operational resilience',
    frameworks: ['DORA', 'NIS2']
  }
];

export const frameworkTypes = ['All', ...new Set(frameworks.map((item) => item.type))];
const publishedFrameworksBySlug = new Map(
  frameworks.filter((item) => !item.comingSoon).map((item) => [item.slug, item])
);

export const getFrameworkBySlug = (slug) => publishedFrameworksBySlug.get(slug);

export const integrations = [
  { name: 'AWS', category: 'Cloud', icon: Cloud, brand: brandAssets.aws },
  { name: 'Microsoft Azure', category: 'Cloud', icon: Cloud, brand: brandAssets.microsoftAzure },
  { name: 'Google Cloud', category: 'Cloud', icon: Cloud, brand: brandAssets.googleCloud },
  { name: 'Microsoft Entra ID', category: 'Identity', icon: ShieldCheck },
  { name: 'Microsoft Intune', category: 'Endpoint', icon: ShieldCheck, brand: brandAssets.microsoftIntune },
  { name: 'Microsoft Defender', category: 'Endpoint', icon: ShieldCheck, brand: brandAssets.microsoftDefender },
  { name: 'Google Workspace', category: 'Identity', icon: ShieldCheck, brand: brandAssets.googleWorkspace },
  { name: 'Jira', category: 'Workflow', icon: ClipboardCheck, brand: brandAssets.jira },
  { name: 'Confluence', category: 'Evidence', icon: FileSearch, brand: brandAssets.confluence }
];

export const integrationCategories = [
  'All',
  ...new Set(integrations.map(({ category }) => category))
];

export const footerGroups = [
  ['Platform', [['Compliance', '/continuous-compliance'], ['Audit management', '/audit-management'], ['Risk', '/risk-management'], ['Cloud', '/cloud-monitoring'], ['Secura AI', '/secura-ai']]],
  ['Explore', [['Cybersecurity', '/solutions/cybersecurity'], ['Privacy operations', '/solutions/privacy'], ['AI governance', '/solutions/ai-governance'], ['Frameworks', '/frameworks'], ['Integrations', '/integrations'], ['Pricing', '/pricing']]],
  ['Company', [['About', '/company'], ['Security', '/security'], ['Privacy policy', '/privacy-policy'], ['Terms', '/terms'], ['Accessibility', '/accessibility']]]
];

export const productIcons = [FileSearch, ShieldCheck, Network];
