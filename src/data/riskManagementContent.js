export const riskManagementMeta = {
  title: 'Risk Management Software for Cyber, Privacy & AI',
  description:
    'Assess organization, asset, vendor, privacy, and AI risk context with Controllo. Use structured assessments, owners, registers, and heatmaps to set priorities.',
};

export const riskHero = {
  eyebrow: 'Comprehensive risk management',
  title: 'Know which risks need your attention.',
  titleAccent: 'need your attention.',
  description:
    'Assess likelihood and impact, assign owners, and keep priority risks visible across every risk context.',
  proof: ['Structured assessments', 'Risk ownership', 'Heatmaps', 'Connected controls'],
};

export const riskChallenges = [
  {
    id: 'scattered-context',
    problem: 'Risk information is scattered',
    capability: 'Structured risk workspace',
    response: 'Keep risk records, assessment details, owners, comments, and linked context in a structured workspace.',
    decision: 'Review starts from one record instead of a document hunt.',
  },
  {
    id: 'unclear-comparison',
    problem: 'Assessments are difficult to compare',
    capability: 'Visible assessment criteria',
    response: 'Evaluate likelihood and impact using visible criteria so teams can compare risk levels with less guesswork.',
    decision: 'Teams can defend why one risk needs attention before another.',
  },
  {
    id: 'unclear-owner',
    problem: 'Responsibility is unclear',
    capability: 'Accountable ownership',
    response: 'Assign owners and keep implementation comments alongside the work that needs attention.',
    decision: 'The next action has an owner and supporting context.',
  },
  {
    id: 'disconnected-compliance',
    problem: 'Risk and compliance sit apart',
    capability: 'Linked control context',
    response: 'Review risk-to-control relationships and filter the register by framework where controls are linked.',
    decision: 'Risk priority can be reviewed alongside the controls it affects.',
  },
];

export const riskCoverageViews = [
  {
    id: 'organization',
    label: 'Organization',
    title: 'Assess risks that affect the business.',
    description:
      'Capture organization-level risks, evaluate significance, assign responsibility, and keep the discussion visible for the next review.',
    signals: ['Business impact', 'Risk owner', 'Likelihood and impact', 'Implementation comments'],
    scoreLabel: 'Organization risk view',
  },
  {
    id: 'asset',
    label: 'Asset',
    title: 'Keep asset risk tied to the system it affects.',
    description:
      'Review asset identity, criticality, classification, owner, custodian, and assessment details in one operating view.',
    signals: ['Asset classification', 'Criticality', 'Owner and custodian', 'Risk assessment'],
    scoreLabel: 'Asset risk view',
  },
  {
    id: 'vendor',
    label: 'Vendor',
    title: 'Bring third-party context into risk decisions.',
    description:
      'Evaluate vendor relationships with status, criticality, location, point-of-contact, supporting documents, and risk assessment fields.',
    signals: ['Vendor status', 'Criticality', 'Contact context', 'Likelihood and impact'],
    scoreLabel: 'Vendor risk view',
  },
  {
    id: 'privacy',
    label: 'Privacy',
    title: 'Connect privacy work to risk context.',
    description:
      'Keep data-action, processing, and privacy assessment context close to the risks, owners, and remediation decisions it informs.',
    signals: ['Data action context', 'Residual risk', 'Processing summary', 'Owner visibility'],
    scoreLabel: 'Privacy risk context',
  },
  {
    id: 'ai',
    label: 'AI',
    title: 'Make AI risk review accountable.',
    description:
      'Review AI system risk context with ownership, likelihood, impact, and risk-score visibility so governance decisions have a clear record.',
    signals: ['AI system context', 'Risk owner', 'Likelihood and impact', 'Governance record'],
    scoreLabel: 'AI risk context',
  },
];

export const riskAssessmentContent = {
  eyebrow: 'Risk Assessments, Registers & Heatmaps',
  title: 'Assess the risk. See where to focus.',
  description:
    'Bring assessment details and the wider risk picture together. Understand the reasoning behind each rating, see where risks are concentrated, and keep responsibility clear.',
  features: [
    [
      'Assess with context',
      'Evaluate likelihood and impact, record the risk level, and keep the owner and assessment comments together.',
    ],
    [
      'See your priorities',
      'Use heatmaps to understand risk distribution and the risk register to review individual assessments.',
    ],
    [
      'Keep compliance in view',
      'Filter risks by framework and review associated controls where linked—without separating risk discussions from compliance work.',
    ],
  ],
  supporting: 'NIST-based assessments · Clear ownership · Framework-level visibility',
  workbench: {
    label: 'Structured risk portfolio walkthrough',
    scale: [0, 2, 5, 8, 10],
    contexts: [
      {
        id: 'asset',
        label: 'Asset',
        title: 'Asset risks',
        description: 'Physical and digital assets that enable your operations.',
        risk: 'Unsupported endpoint asset',
        likelihood: 8,
        impact: 8,
        score: 64,
        level: 'High',
        owner: 'Asset owner',
        comment: 'Confirm the supported replacement path and keep the asset review context visible.',
        framework: 'NIST CSF',
        linkedControls: ['Asset inventory', 'Endpoint protection', 'Evidence ownership'],
      },
      {
        id: 'organization',
        label: 'Organization',
        title: 'Organization risks',
        description: 'People, processes, and internal factors across the business.',
        risk: 'Privileged access review',
        likelihood: 10,
        impact: 8,
        score: 80,
        level: 'High',
        owner: 'Security owner',
        comment: 'Review admin access evidence and keep the accountable owner and assessment reasoning together.',
        framework: 'NIST CSF',
        linkedControls: ['Access control review', 'Identity governance', 'Evidence ownership'],
      },
      {
        id: 'vendor',
        label: 'Vendor',
        title: 'Vendor risks',
        description: 'Third-party providers and external partners.',
        risk: 'Vendor evidence gap',
        likelihood: 8,
        impact: 5,
        score: 40,
        level: 'Moderate',
        owner: 'Vendor risk owner',
        comment: 'Review the current assessment response and supporting document before the next review.',
        framework: 'NIST CSF',
        linkedControls: ['Vendor assessment', 'Evidence ownership', 'Third-party review'],
      },
    ],
    heatmapCells: [
      { impact: 0, likelihood: 0, score: 0, count: 0, level: 'none', contexts: [] },
      { impact: 0, likelihood: 2, score: 0, count: 0, level: 'none', contexts: [] },
      { impact: 0, likelihood: 5, score: 0, count: 0, level: 'none', contexts: [] },
      { impact: 0, likelihood: 8, score: 0, count: 0, level: 'none', contexts: [] },
      { impact: 0, likelihood: 10, score: 0, count: 0, level: 'none', contexts: [] },
      { impact: 2, likelihood: 0, score: 0, count: 0, level: 'none', contexts: [] },
      { impact: 2, likelihood: 2, score: 4, count: 2, level: 'very-low', contexts: ['Asset'] },
      { impact: 2, likelihood: 5, score: 10, count: 1, level: 'very-low', contexts: ['Vendor'] },
      { impact: 2, likelihood: 8, score: 16, count: 0, level: 'none', contexts: [] },
      { impact: 2, likelihood: 10, score: 20, count: 1, level: 'very-low', contexts: ['Org'] },
      { impact: 5, likelihood: 0, score: 0, count: 0, level: 'none', contexts: [] },
      { impact: 5, likelihood: 2, score: 10, count: 1, level: 'very-low', contexts: ['Vendor'] },
      { impact: 5, likelihood: 5, score: 25, count: 2, level: 'low', contexts: ['Org', 'Asset'] },
      { impact: 5, likelihood: 8, score: 40, count: 1, level: 'moderate', contexts: ['Vendor'] },
      { impact: 5, likelihood: 10, score: 50, count: 1, level: 'moderate', contexts: ['AI'] },
      { impact: 8, likelihood: 0, score: 0, count: 0, level: 'none', contexts: [] },
      { impact: 8, likelihood: 2, score: 16, count: 1, level: 'very-low', contexts: ['Asset'] },
      { impact: 8, likelihood: 5, score: 40, count: 1, level: 'low', contexts: ['Privacy'] },
      { impact: 8, likelihood: 8, score: 64, count: 2, level: 'high', contexts: ['Asset', 'Vendor'] },
      { impact: 8, likelihood: 10, score: 80, count: 1, level: 'high', contexts: ['Org'] },
      { impact: 10, likelihood: 0, score: 0, count: 0, level: 'none', contexts: [] },
      { impact: 10, likelihood: 2, score: 20, count: 0, level: 'none', contexts: [] },
      { impact: 10, likelihood: 5, score: 50, count: 1, level: 'moderate', contexts: ['Privacy'] },
      { impact: 10, likelihood: 8, score: 80, count: 1, level: 'high', contexts: ['Org'] },
      { impact: 10, likelihood: 10, score: 100, count: 1, level: 'very-high', contexts: ['Vendor'] },
    ],
  },
};

export const riskSeverityLevels = [
  ['none', 'None'],
  ['very-low', 'Very low'],
  ['low', 'Low'],
  ['moderate', 'Moderate'],
  ['high', 'High'],
  ['very-high', 'Very high'],
];

export const riskClosing = {
  eyebrow: 'Risk, connected',
  title: 'Give your team a clearer view of risk.',
  description:
    'Bring assessments, ownership, heatmaps, and compliance context into one place so the next risk review starts from a shared record.',
};
