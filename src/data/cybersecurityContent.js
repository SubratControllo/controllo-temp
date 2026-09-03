export const cybersecurityMeta = {
  title: 'Cybersecurity and cloud security',
  description: 'Connect cyber framework implementation, evidence, risk, auditor collaboration, and regularly refreshed cloud and workforce visibility in Controllo.'
};

export const cyberHero = {
  eyebrow: 'Cybersecurity & Cloud Security',
  title: 'Cyber readiness with connected visibility.',
  description: 'Bring framework implementation, evidence, risk, and auditor collaboration into one workflow, with refreshed visibility across supported cloud and workforce environments.'
};

export const cyberChallenges = [
  {
    id: 'control-support',
    challenge: 'Is the control sufficiently supported?',
    response: 'Secura reviews control requirements, implementation descriptions, policies, procedures, and evidence to identify missing context and recommend the next accountable action.',
    visual: {
      label: 'Secura review',
      value: '2 gaps to resolve',
      detail: 'Audit-period coverage · Required approval',
      signals: [
        ['Requirement', 'In scope'],
        ['Policy & procedure', 'Linked'],
        ['Evidence', 'Review needed'],
        ['Approval', 'Missing']
      ]
    }
  },
  {
    id: 'framework-reuse',
    challenge: 'New frameworks create repeated work.',
    response: 'Mapped controls and linked evidence help teams reuse approved work while keeping each framework’s scope and accountability visible.',
    visual: {
      label: 'Mapped control set',
      value: 'Access governance reused',
      detail: 'Framework scope remains visible',
      signals: [
        ['SOC 2', 'Mapped'],
        ['ISO/IEC 27001', 'Mapped'],
        ['Evidence', 'Reused'],
        ['Scope', 'Visible']
      ]
    }
  },
  {
    id: 'control-workspace',
    challenge: 'Control information is scattered.',
    response: 'One control workspace keeps implementation, ownership, policies, procedures, evidence, risk context, comments, and audit details together.',
    visual: {
      label: 'Control workspace',
      value: 'Review context assembled',
      detail: 'Owner, evidence, risk context, and auditor access',
      signals: [
        ['Owner', 'Assigned'],
        ['Evidence', 'Reviewable'],
        ['Risk context', 'Linked'],
        ['Auditor access', 'Scoped']
      ]
    }
  },
  {
    id: 'environment-change',
    challenge: 'Point-in-time reviews miss environmental change.',
    response: 'Cloud and workforce monitoring provides regularly refreshed views of supported cloud assets, identities, devices, access activity, alerts, and available exposure indicators.',
    visual: {
      label: 'Environment watch',
      value: 'Operational context refreshed',
      detail: 'Cloud, identity, devices, and alerts',
      signals: [
        ['Cloud', 'Refreshed'],
        ['Identity', 'Available'],
        ['Devices', 'Current'],
        ['Alerts', 'Review']
      ]
    }
  },
  {
    id: 'accountable-action',
    challenge: 'Risk and audit ownership become unclear.',
    response: 'Consistent likelihood-and-impact scoring, owners, status, questionnaires, dashboards, heatmaps, assigned auditor access, and control-level collaboration make the next action visible.',
    visual: {
      label: 'Accountable action',
      value: 'Review owner assigned',
      detail: 'Risk context and auditor access visible',
      signals: [
        ['Risk', 'Scored'],
        ['Owner', 'Assigned'],
        ['Status', 'Visible'],
        ['Auditor access', 'Scoped']
      ]
    }
  }
];

export const cyberSecuraReview = {
  eyebrow: 'Secura AI',
  title: 'Review each control with Secura before sharing it with an auditor.',
  description: 'Secura reviews the control requirement, implementation description, linked policies and procedures, and evidence, then surfaces missing context for your team to validate. Your team decides what happens next.',
  control: 'ISO/IEC 27001 · Access review',
  sources: [
    { label: 'Implementation description', mobileLabel: 'Implementation', state: 'Included' },
    { label: 'Policies & procedures', mobileLabel: 'Policies', state: 'Linked' },
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
    sources: [
      { label: 'AWS', state: 'Connected', brandKey: 'aws' },
      { label: 'Azure', state: 'Connected', brandKey: 'microsoftAzure' },
      { label: 'GCP assets', state: 'Synced', brandKey: 'googleCloud' }
    ],
    signals: [['Production accounts', 'Current'], ['Asset inventory', 'Refreshed']],
    attention: [['Configuration review', 'Attention']]
  },
  {
    id: 'identities-devices',
    label: 'Identities & Devices',
    summary: 'Workforce account and device posture',
    sources: [
      { label: 'Microsoft Intune', state: 'Connected', brandKey: 'microsoftIntune' },
      { label: 'Microsoft Defender', state: 'Available', brandKey: 'microsoftDefender' },
      { label: 'Google Workspace', state: 'Connected', brandKey: 'googleWorkspace' }
    ],
    signals: [['Managed devices', 'Current'], ['Identity activity', 'Available']],
    attention: [['MFA posture', 'Review']]
  },
  {
    id: 'alerts-exposure',
    label: 'Alerts & Exposure',
    summary: 'Security events, activity, and available user-level indicators',
    sources: [
      { label: 'Microsoft Defender', state: 'Available', brandKey: 'microsoftDefender' },
      { label: 'Google Workspace', state: 'Connected', brandKey: 'googleWorkspace' }
    ],
    signals: [['Security alerts', 'Open'], ['Access activity', 'Available'], ['Exposure indicators', 'Review']],
    attention: [['Priority alert', 'Needs owner'], ['User-level indicator', 'Investigate']]
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
