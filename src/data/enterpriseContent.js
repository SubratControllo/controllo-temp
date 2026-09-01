import { Bot, Boxes, CheckCircle2, ClipboardCheck, Cloud, FileSearch, Gauge, Network, Radar, ShieldCheck } from 'lucide-react';
import SecuraMark from '../components/SecuraMark';
import { brandAssets } from './brandAssets';

export const navGroups = [
  { label: 'Platform', href: '/platform', links: [
    ['/platform/continuous-compliance', 'Continuous compliance', 'Keep controls and evidence current.'],
    ['/platform/risk-management', 'Risk management', 'See exposure and coordinate response.'],
    ['/platform/audit-management', 'Audit management', 'Give every audit a clean operating layer.'],
    ['/platform/cloud-monitoring', 'Cloud monitoring', 'Connect live environment context to compliance.'],
    ['/platform/secura-ai', 'Secura AI', 'Move work forward with guided intelligence.']
  ]},
  { label: 'Solutions', href: '/solutions/cybersecurity', links: [
    ['/solutions/cybersecurity', 'Cybersecurity', 'Implement controls and stay ready across frameworks.'],
    ['/solutions/privacy', 'Privacy', 'Run ROPA, DPIA, data-flow, and PII work.'],
    ['/solutions/ai-governance', 'AI governance', 'Govern AI systems, owners, status, and risk.'],
    ['/solutions/enterprise', 'Enterprise', 'Unify assurance across teams and entities.'],
    ['/solutions/growing-teams', 'Growing teams', 'Build trust without building more process.']
  ]},
  { label: 'Frameworks', href: '/frameworks' },
  { label: 'Integrations', href: '/integrations' },
  { label: 'Resources', href: '/resources' }
];

/** @type {Record<string, {eyebrow:string,title:string,description:string,accent:string,icon:import('react').ComponentType,features:Array<[string,string]>}>} */
export const productPages = {
  '/platform': {
    eyebrow: 'One operating layer', title: 'Run compliance like a connected system.',
    description: 'Bring controls, evidence, risk, owners, and audit work into one continuously current view.',
    accent: 'mint', icon: Network,
    features: [['Shared control model', 'Define once and reuse approved work across frameworks.'], ['Evidence current', 'Keep source, owner, scope, and freshness attached.'], ['Readiness views', 'Give leaders and teams the right level of detail.']]
  },
  '/platform/continuous-compliance': {
    eyebrow: 'Continuous compliance', title: 'Know what is ready before anyone asks.',
    description: 'Replace episodic evidence chases with a living program that keeps control status, ownership, and proof connected.',
    accent: 'mint', icon: CheckCircle2,
    features: [['Evidence streams', 'Connect cloud, identity, code, and business systems.'], ['Control monitoring', 'Surface stale proof and changing scope early.'], ['Framework reuse', 'Map shared controls to multiple assurance goals.']]
  },
  '/platform/risk-management': {
    eyebrow: 'Risk management', title: 'See risk while it is still actionable.',
    description: 'Connect risk to the controls, evidence, systems, and owners that determine what happens next.',
    accent: 'teal', icon: Radar,
    features: [['Living register', 'Keep context, impact, ownership, and treatment together.'], ['Control context', 'See which controls reduce exposure and where gaps remain.'], ['Executive view', 'Translate operational detail into decision-ready signals.']]
  },
  '/platform/audit-management': {
    eyebrow: 'Audit management', title: 'Give every audit a cleaner starting point.',
    description: 'Coordinate requests, approvals, evidence, and auditor collaboration without rebuilding the same trail.',
    accent: 'shell', icon: ClipboardCheck,
    features: [['Request workspace', 'Route every question to the right owner with context.'], ['Evidence review', 'Validate scope and freshness before it reaches the auditor.'], ['Audit trail', 'Preserve decisions, changes, and approvals in one place.']]
  },
  '/platform/secura-ai': {
    eyebrow: 'Secura AI', title: 'Guidance that understands the work around the control.',
    description: 'Use an AI co-auditor to find missing context, prepare next steps, and keep humans in control of every decision.',
    accent: 'navy', icon: SecuraMark,
    features: [['Readiness guidance', 'Prioritize work by impact, dependency, and timing.'], ['Evidence review', 'Flag missing scope and stale supporting material.'], ['Human approval', 'Keep recommendations reviewable and decisions accountable.']]
  },
  '/platform/cloud-monitoring': {
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
  '/solutions/ai-governance': {
    eyebrow: 'AI governance', title: 'Govern every AI system with clear ownership and risk context.',
    description: 'Maintain an AI inventory, assign accountable owners, track system status, and connect AI-specific risk assessments to governance work.',
    accent: 'teal', icon: Bot,
    features: [['AI system inventory', 'Keep purpose, implementation context, status, and ownership visible.'], ['AI-specific risk', 'Assess likelihood and impact in the context of each system.'], ['Governance readiness', 'Prepare reviewable work for ISO 42001, the EU AI Act, and applicable requirements.']]
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

export const productRoutePaths = Object.keys(productPages);

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

export const resources = [
  { slug: 'continuous-compliance-field-guide', type: 'Guide', title: 'A field guide to continuous compliance', summary: 'A practical operating model for moving from point-in-time preparation to a current program.', read: '8 min' },
  { slug: 'shared-control-model', type: 'Brief', title: 'Why shared controls change multi-framework work', summary: 'See how a connected control model reduces duplicate effort without removing accountability.', read: '6 min' },
  { slug: 'audit-readiness-questions', type: 'Checklist', title: 'Ten questions that reveal audit readiness', summary: 'A focused readiness review for security and GRC leaders before the next audit cycle.', read: '5 min' }
];

export const resourceTypes = ['All', ...new Set(resources.map((item) => item.type))];
const resourcesBySlug = new Map(resources.map((item) => [item.slug, item]));

export const getResourceBySlug = (slug) => resourcesBySlug.get(slug);

export const faqs = [
  ['Does Controllo replace our auditor?', 'No. Controllo organizes the program, evidence, decisions, and collaboration around the audit. Independent assurance remains with your chosen auditor.'],
  ['Can we use our existing controls?', 'The platform is designed around a shared control model so teams can bring existing controls forward and map them across applicable frameworks.'],
  ['How does Secura AI make decisions?', 'Secura AI provides guidance and prepares work for review. Accountable people remain responsible for approvals and program decisions.'],
  ['Can Controllo support multiple programs?', 'The enterprise experience is designed to provide shared visibility while preserving ownership across teams, products, and business units.']
];

export const footerGroups = [
  ['Platform', [['Overview', '/platform'], ['Compliance', '/platform/continuous-compliance'], ['Risk', '/platform/risk-management'], ['Cloud', '/platform/cloud-monitoring'], ['Secura AI', '/platform/secura-ai']]],
  ['Explore', [['Cybersecurity', '/solutions/cybersecurity'], ['Privacy operations', '/solutions/privacy'], ['AI governance', '/solutions/ai-governance'], ['Frameworks', '/frameworks'], ['Integrations', '/integrations'], ['Pricing', '/pricing']]],
  ['Company', [['About', '/company'], ['Security', '/security'], ['Privacy policy', '/privacy-policy'], ['Accessibility', '/accessibility']]]
];

export const productIcons = [FileSearch, ShieldCheck, Network];
