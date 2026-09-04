export const aiGovernanceMeta = {
  title: 'Operational AI governance and risk',
  description: 'Connect AI systems, accountable owners, risk assessment, controls, and evidence in one operational governance view.'
};

export const aiHero = {
  eyebrow: 'Operational AI Governance',
  title: 'Turn AI standards into structured, actionable governance.',
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
