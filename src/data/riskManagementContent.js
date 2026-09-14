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
    problem: 'Risk information is scattered',
    response: 'Keep risk records, assessment details, owners, comments, and linked context in a structured workspace.',
  },
  {
    problem: 'Assessments are difficult to compare',
    response: 'Evaluate likelihood and impact using visible criteria so teams can compare risk levels with less guesswork.',
  },
  {
    problem: 'Responsibility is unclear',
    response: 'Assign owners and keep implementation comments alongside the work that needs attention.',
  },
  {
    problem: 'Risk and compliance sit apart',
    response: 'Review risk-to-control relationships and filter the register by framework where controls are linked.',
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
  eyebrow: 'Risk assessment and visibility',
  title: 'Assess the risk. See where to focus.',
  description:
    'Bring assessment details and the wider risk picture together. Controllo keeps the reasoning behind a rating, the owner, and the linked compliance context visible.',
  features: [
    ['Assess with context', 'Capture likelihood, impact, risk level, owner, and comments together.'],
    ['See your priorities', 'Use register and heatmap views to find concentrated exposure.'],
    ['Keep compliance in view', 'Filter by framework and review associated controls where relationships are linked.'],
  ],
};

const riskHeatmapRows = [
  ['controlled', 'high', 'low', 'controlled', 'moderate'],
  ['critical', 'controlled', 'low', 'moderate', 'controlled'],
  ['low', 'controlled', 'high', 'controlled', 'critical'],
  ['controlled', 'moderate', 'controlled', 'low', 'high'],
  ['moderate', 'controlled', 'low', 'controlled', 'controlled'],
];

export const riskSeverityLevels = [
  ['controlled', 'Controlled'],
  ['low', 'Low'],
  ['moderate', 'Moderate'],
  ['high', 'High'],
  ['critical', 'Critical'],
];

export const riskHeatmapCells = riskHeatmapRows.flatMap((row, rowIndex) =>
  row.map((level, columnIndex) => ({
    id: `${String.fromCharCode(65 + rowIndex)}${columnIndex + 1}`,
    level,
    critical: level === 'critical',
  }))
);

export const riskClosing = {
  eyebrow: 'Risk, connected',
  title: 'Give your team a clearer view of risk.',
  description:
    'Bring assessments, ownership, heatmaps, and compliance context into one place so the next risk review starts from a shared record.',
};
