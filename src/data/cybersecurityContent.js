export const cybersecurityMeta = {
  title: 'Cybersecurity and cloud security',
  description: 'Connect cyber framework implementation, evidence, risk, auditor collaboration, and regularly refreshed cloud and workforce visibility in Controllo.'
};

export const cyberHero = {
  eyebrow: 'Cybersecurity & Cloud Security',
  title: 'One platform for cyber readiness and connected environment visibility.',
  description: 'Bring framework implementation, evidence management, risk assessments, and auditor collaboration into one workflow—alongside regularly refreshed visibility across supported cloud and workforce environments.',
  frameworks: ['SOC 2', 'ISO/IEC 27001', 'NIST CSF 2.0', 'CSA CCM v4', 'CMMC', 'and more']
};

export const cyberChallenges = [
  {
    id: 'control-support',
    challenge: 'Is the control sufficiently supported?',
    response: 'Secura reviews control requirements, implementation descriptions, policies, procedures, and evidence to identify missing context and recommend the next accountable action.',
    visual: { label: 'Secura review', value: '2 gaps to resolve', detail: 'Audit-period coverage · Required approval' }
  },
  {
    id: 'framework-reuse',
    challenge: 'New frameworks create repeated work.',
    response: 'Mapped controls and linked artifacts help teams reuse approved work while keeping each framework’s scope and accountability visible.',
    visual: { label: 'Mapped control set', value: 'Access governance reused', detail: 'Framework scope remains visible' }
  },
  {
    id: 'control-workspace',
    challenge: 'Control information is scattered.',
    response: 'One control workspace keeps implementation, ownership, policies, procedures, evidence, risk context, comments, and audit details together.',
    visual: { label: 'Control workspace', value: 'Review context assembled', detail: 'Owner · Evidence · Risk · Auditor' }
  },
  {
    id: 'environment-change',
    challenge: 'Point-in-time reviews miss environmental change.',
    response: 'Cloud and workforce monitoring provides regularly refreshed views of supported cloud assets, identities, devices, access activity, alerts, and available exposure indicators.',
    visual: { label: 'Environment watch', value: 'Refresh complete', detail: 'Cloud · Identity · Device · Alert' }
  },
  {
    id: 'accountable-action',
    challenge: 'Risk and audit ownership become unclear.',
    response: 'Consistent likelihood-and-impact scoring, owners, status, questionnaires, dashboards, heatmaps, assigned auditor access, and control-level collaboration make the next action visible.',
    visual: { label: 'Accountable action', value: 'Review owner assigned', detail: 'Risk context and auditor access visible' }
  }
];

export const cyberSecuraReview = {
  eyebrow: 'Secura AI',
  title: 'Review each control with Secura before sharing it with an auditor.',
  description: 'Secura assesses the control requirement, implementation description, linked policies, procedures, and evidence, then highlights gaps and recommends review actions. Your compliance team remains responsible for validating the findings and deciding what to do next.',
  workflow: ['Implement', 'Review', 'Resolve', 'Share'],
  control: 'ISO/IEC 27001 · Access review',
  sources: [
    { label: 'Implementation', state: 'Included' },
    { label: 'Policy & procedure', state: 'Linked' },
    { label: 'Evidence', state: 'Review needed' }
  ],
  gaps: ['Evidence falls outside the current audit period', 'Required approval is missing'],
  recommendation: 'Upload the latest approved access-review record.'
};

export const cyberCloudViews = [
  {
    id: 'cloud-assets',
    label: 'Cloud Assets',
    summary: 'Supported cloud inventory and synchronization state',
    metrics: [['AWS', 'Connected'], ['Azure', 'Connected'], ['GCP assets', 'Synced']],
    rows: [['Production accounts', 'Current'], ['Configuration review', 'Attention'], ['Asset inventory', 'Refreshed']]
  },
  {
    id: 'identities-devices',
    label: 'Identities & Devices',
    summary: 'Workforce account and device posture',
    metrics: [['Microsoft 365', 'Connected'], ['Google Workspace', 'Connected'], ['Managed devices', 'Current']],
    rows: [['MFA posture', 'Review'], ['Device status', 'Current'], ['Identity activity', 'Available']]
  },
  {
    id: 'alerts-exposure',
    label: 'Alerts & Exposure',
    summary: 'Security events, activity, and available user-level indicators',
    metrics: [['Security alerts', 'Open'], ['Access activity', 'Available'], ['Exposure indicators', 'Review']],
    rows: [['Priority alert', 'Needs owner'], ['Access event', 'Observed'], ['User-level indicator', 'Investigate']]
  }
];

export const cyberFrameworks = [
  { name: 'SOC 2', category: 'Security & assurance', description: 'Trust Services Criteria readiness', href: '/frameworks/soc-2' },
  { name: 'ISO/IEC 27001', category: 'Information security', description: 'ISMS implementation and evidence', href: '/frameworks/iso-27001' },
  { name: 'NIST CSF 2.0', category: 'Cybersecurity', description: 'Cyber risk outcomes', href: null },
  { name: 'CSA CCM v4', category: 'Cloud security', description: 'Cloud control coverage', href: null },
  { name: 'CMMC', category: 'Cybersecurity', description: 'Defense supply-chain readiness', href: null },
  { name: 'DORA', category: 'Digital resilience', description: 'Financial-sector operational resilience', href: null },
  { name: 'NIS2', category: 'Cybersecurity regulation', description: 'EU cyber risk governance', href: null },
  { name: 'PCI DSS 4.0', category: 'Payment security', description: 'Cardholder-data security', href: null }
];

export const cyberClosing = {
  eyebrow: 'Connected assurance',
  title: 'Build cyber and cloud compliance you can prove.',
  description: 'Bring implementation, evidence, risk, monitoring, and auditor collaboration into one connected program.',
  proof: ['100+ frameworks', 'Pre-mapped controls', 'AI-assisted gap assessment']
};
