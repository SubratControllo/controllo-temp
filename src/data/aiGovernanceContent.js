export const aiGovernanceMeta = {
  title: 'Operational AI governance and risk',
  description: 'Connect AI systems, accountable owners, risk assessment, controls, and evidence in one operational governance view.'
};

export const aiHero = {
  eyebrow: 'Operational AI Governance',
  title: 'Turn AI standards into structured, actionable governance.',
  titleAccent: 'AI standards',
  description: 'Bring AI systems, accountable owners, risk assessment, controls, and evidence into one operating view—so your team can respond to evolving AI standards and regulation with clearer readiness.',
  actions: [
    { label: 'Start free trial', to: '/pricing', variant: 'primary' },
    { label: 'Request a demo', to: '/demo', variant: 'secondary' }
  ],
  dossier: {
    label: 'Illustrative product view',
    system: 'Customer support assistant',
    purpose: 'Customer support assistance',
    owner: 'Owner assigned',
    status: 'Active',
    likelihood: 'Possible',
    impact: 'Moderate',
    frameworkContext: ['ISO/IEC 42001', 'NIST AI RMF', 'EU AI Act']
  }
};

export const aiChallenges = {
  eyebrow: 'Where AI Governance Breaks Down',
  title: 'Turn AI governance challenges into structured action.',
  supporting: 'From AI inventory to audit readiness, keep governance visible, structured, and accountable.',
  items: [
    ['AI systems are difficult to inventory and track', 'Maintain a centralized AI system inventory with purpose, owner, and status.'],
    ['AI-specific risk context is easy to miss', 'Assess likelihood and impact in the context of each AI system.'],
    ['Ownership and accountability are unclear', 'Keep system ownership and risk responsibility visibly connected.'],
    ['New requirements create repeated compliance work', 'Reuse approved controls, implementation, policies, evidence, and risk context where requirements overlap.'],
    ['Evidence exists, but readiness is uncertain', 'Use Secura to surface gaps and prepare the next action for human approval.'],
    ['Progress and next actions remain unclear', 'Use readiness views that connect controls, evidence, risk, owners, and the next action.']
  ].map(([challenge, response], index) => ({ id: `challenge-${index + 1}`, challenge, response }))
};

export const aiOperations = {
  eyebrow: 'Govern Every AI System',
  title: 'From AI inventory to risk assessment—in one workflow.',
  description: 'Add each AI system, define its purpose, owner, and status, then assess likelihood and impact while keeping the responsible owner and review context connected.',
  workflow: ['Add AI system', 'Assign owner and status', 'Assess AI-specific risk'],
  views: [
    {
      id: 'ai-systems', label: 'AI Systems', title: 'Customer support assistant', badge: 'Illustrative product view',
      fields: [['Purpose', 'Customer support assistance'], ['Owner', 'Owner assigned'], ['Status', 'Active'], ['Review context', 'Customer-facing AI system']]
    },
    {
      id: 'ai-risk-assessment', label: 'AI Risk Assessment', title: 'Customer support assistant', badge: 'Illustrative assessment',
      fields: [['Risk context', 'Linked to AI system'], ['Likelihood', 'Possible'], ['Impact', 'Moderate'], ['Responsible owner', 'Owner assigned'], ['Assessment status', 'Current']]
    }
  ]
};

export const aiSecura = {
  eyebrow: 'Secura AI for AI Governance',
  title: 'Turn AI governance documentation into a readiness check.',
  description: 'Secura reviews implementation details, policies, procedures, and supporting evidence against AI governance controls—then surfaces missing context and prepares next actions for accountable people to approve.',
  capabilities: ['Review', 'Identify gaps', 'Prepare next actions', 'Human approval'],
  review: {
    label: 'Illustrative AI control review',
    inputs: ['Implementation', 'Policy', 'Procedure', 'Evidence'],
    status: 'Needs attention',
    finding: 'Supporting evidence does not demonstrate the latest approved AI-risk review.',
    recommendation: 'Add the current AI-risk assessment and ownership record.',
    decision: 'Human review required'
  }
};

export const aiFrameworks = {
  eyebrow: 'AI Governance Frameworks',
  title: 'One operating layer for evolving AI requirements.',
  description: 'Keep AI systems, ownership, risk, controls, and evidence connected as you work across relevant standards and regulations.',
  operatingLayer: ['AI system inventory', 'Ownership', 'Risk assessment', 'Controls', 'Evidence'],
  views: [
    { id: 'iso-iec-42001', label: 'ISO/IEC 42001', description: 'AI management-system structure and continual improvement.' },
    { id: 'nist-ai-rmf', label: 'NIST AI RMF', description: 'Govern, Map, Measure, and Manage AI risk.' },
    { id: 'eu-ai-act', label: 'EU AI Act', description: 'Role- and risk-based obligations for AI systems in the European Union.' }
  ],
  action: { label: 'Explore frameworks', to: '/frameworks' }
};

export const aiClosing = {
  eyebrow: 'AI Governance, Connected',
  title: 'Know your AI. Manage the risk. Prove readiness.',
  description: 'Bring systems, owners, assessments, controls, and evidence into one structured operating view.',
  actions: [
    { label: 'Start free trial', to: '/pricing', variant: 'primary' },
    { label: 'Request a demo', to: '/demo', variant: 'secondary' }
  ],
  proof: 'AI system inventory · AI risk assessment · Secura AI guidance · Framework readiness'
};
