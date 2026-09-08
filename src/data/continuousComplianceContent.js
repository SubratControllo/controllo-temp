export const continuousComplianceMeta = {
  title: 'Continuous Compliance Software and Audit Readiness',
  description: 'Keep SOC 2 and ISO/IEC 27001 readiness moving with connected controls, evidence, Secura-assisted review, and progress across 100+ frameworks.',
};

export const continuousComplianceHero = {
  eyebrow: 'Continuous compliance',
  title: 'Continuous compliance. Beyond the audit.',
  titleAccent: 'Beyond the audit.',
  description: 'Keep SOC 2, ISO/IEC 27001, and other compliance programs moving between audits. Controllo keeps controls, policies, evidence, risk context, ownership, and review work connected so your team can maintain readiness instead of rebuilding it.',
  proof: ['Pre-mapped controls', 'Secura-assisted control review', 'Readiness views'],
  workspace: {
    accessibleLabel: 'Representative Compliance Current workspace',
    label: 'Compliance Current workspace',
    supporting: 'Framework scope, control context, and accountable review in one view.',
    frameworks: ['SOC 2', 'ISO/IEC 27001'],
    control: 'User access reviews',
    reference: 'Shared control · AC-04',
    summary: 'Access rights are reviewed against current role and approval context.',
    states: [
      { label: 'Implementation', value: 'Current', state: 'current' },
      { label: 'Policy & procedure', value: 'Linked', state: 'current' },
      { label: 'Evidence', value: 'Review needed', state: 'attention' },
      { label: 'Owner', value: 'Assigned', state: 'current' },
    ],
    nextReview: 'Confirm current-period evidence',
  },
};

export const betweenAuditsContent = {
  eyebrow: 'Readiness is an ongoing responsibility',
  title: "Your last audit can't tell you what changed this week.",
  description: 'A new vendor, a change in access, or a policy that no longer reflects how the team works can change the assurance program before the next audit begins.',
  scenarios: [
    {
      id: 'evidence',
      title: 'Evidence needs refreshing',
      description: 'A record from the last audit may not demonstrate how a control operates today.',
    },
    {
      id: 'process',
      title: 'Processes move on',
      description: 'Implementation descriptions, policies, and procedures need to reflect the work the team performs.',
    },
    {
      id: 'ownership',
      title: 'Ownership changes',
      description: 'When roles change, reviews and follow-up actions still need an accountable owner.',
    },
    {
      id: 'risk',
      title: 'Risks evolve',
      description: 'New systems, suppliers, and business activities can change what the program needs to address.',
    },
  ],
  standards: [
    {
      label: 'SOC 2 Type II',
      title: 'Demonstrate effectiveness over time.',
      description: 'A Type II examination evaluates control design and operating effectiveness over a defined review period, not only on the day documents are reviewed.',
    },
    {
      label: 'ISO/IEC 27001',
      title: 'Maintain and improve the management system.',
      description: 'ISO/IEC 27001 treats the information security management system as ongoing work that is maintained and continually improved.',
    },
  ],
};

export const complianceLoopContent = {
  eyebrow: 'A continuous operating loop',
  title: 'Keep the record current, not just the checklist.',
  description: 'Move from framework scope to readiness review without losing the implementation, evidence, risk, and ownership context gathered along the way.',
  accessibleLabel: 'Continuous compliance operating steps',
  workspaceLabel: 'Compliance Current workspace',
  workspaceDescription: 'Representative product states for the selected operating step.',
  steps: [
    {
      id: 'scope',
      label: 'Set scope',
      title: 'Start with the assurance path that matters now.',
      description: 'Select the relevant framework and keep its requirements connected to the controls your team operates.',
      object: 'Framework scope',
      context: 'SOC 2 · Security criteria',
      records: [
        ['Framework', 'Selected', 'current'],
        ['Requirements', 'In scope', 'current'],
        ['Control set', 'Prepared', 'current'],
      ],
      next: 'Assign accountable control owners',
    },
    {
      id: 'controls',
      label: 'Maintain controls',
      title: 'Keep implementation aligned with the work.',
      description: 'Update implementation descriptions, policies, and procedures as operating processes change.',
      object: 'Control record',
      context: 'User access reviews',
      records: [
        ['Implementation', 'Current', 'current'],
        ['Policy & procedure', 'Linked', 'current'],
        ['Owner', 'Assigned', 'current'],
      ],
      next: 'Attach supporting records',
    },
    {
      id: 'evidence',
      label: 'Add evidence',
      title: 'Build evidence as control activity happens.',
      description: 'Keep each supporting record with the relevant control and review period instead of rebuilding the trail before an audit.',
      object: 'Evidence record',
      context: 'Quarterly access review',
      records: [
        ['Source', 'Recorded', 'current'],
        ['Review period', 'Needs confirmation', 'attention'],
        ['Approval', 'Outstanding', 'attention'],
      ],
      next: 'Review scope and freshness',
    },
    {
      id: 'review',
      label: 'Review context',
      title: 'Bring the full control record into review.',
      description: 'Review implementation, policy, evidence, risk context, ownership, and earlier decisions together.',
      object: 'Control review',
      context: 'Access governance',
      records: [
        ['Control context', 'Assembled', 'current'],
        ['Risk context', 'Linked', 'current'],
        ['Evidence', 'Review needed', 'attention'],
      ],
      next: 'Validate the next accountable action',
    },
    {
      id: 'readiness',
      label: 'Track readiness',
      title: 'See the work that still needs attention.',
      description: 'Keep framework progress and follow-up work visible, then return to scope as the business changes.',
      object: 'Readiness view',
      context: 'SOC 2 · Current review',
      records: [
        ['Implementation', 'Current', 'current'],
        ['Policy & procedure', 'Current', 'current'],
        ['Evidence', 'Action needed', 'attention'],
      ],
      next: 'Return to scope when conditions change',
    },
  ],
};

export const oversightContent = {
  eyebrow: 'Readiness oversight',
  title: 'Know where things stand before someone asks.',
  description: 'Use a deliberate control review when context needs validation, then keep the remaining readiness work visible to accountable teams.',
  views: [
    {
      id: 'secura',
      label: 'Review with Secura',
      eyebrow: 'User-initiated review',
      title: 'Review the control context before deciding what changes.',
      description: 'Secura reviews the selected requirement, implementation description, linked policies and procedures, and evidence. Your team validates the finding and decides what happens next.',
      control: 'ISO/IEC 27001 · User access review',
      inputs: [
        ['Implementation description', 'Included'],
        ['Policies & procedures', 'Linked'],
        ['Evidence', 'Review needed'],
      ],
      finding: 'Current-period evidence and required approval need confirmation.',
      recommendation: 'Attach the latest approved access-review record.',
      boundary: 'Human review is required before any change is accepted.',
    },
    {
      id: 'readiness',
      label: 'Track readiness',
      eyebrow: 'Framework readiness',
      title: 'See progress by the work that supports it.',
      description: 'Review implementation, policy and procedure, evidence, and ownership as separate signals so incomplete support stays visible.',
      control: 'SOC 2 · Current review period',
      signals: [
        { label: 'Implementation', value: 'Current', state: 'current', segments: 4 },
        { label: 'Policy & procedure', value: 'Needs review', state: 'attention', segments: 3 },
        { label: 'Evidence', value: 'Outstanding', state: 'attention', segments: 2 },
        { label: 'Ownership', value: 'Assigned', state: 'current', segments: 4 },
      ],
      boundary: 'Representative status only. Accountable owners confirm readiness.',
    },
  ],
};

export const complianceFrameworksContent = {
  eyebrow: '100+ global and regional frameworks',
  title: "Build on the work you've already done.",
  description: 'Pre-mapped relationships help teams reuse relevant implementation, policies, evidence, and risk context where requirements overlap while preserving each framework\'s scope and review status.',
  note: 'Reuse what applies. Address what is different.',
  frameworks: [
    { name: 'SOC 2', href: '/frameworks/soc-2' },
    { name: 'ISO/IEC 27001', href: '/frameworks/iso-27001' },
    { name: 'CSA CCM v4' },
    { name: 'CMMC' },
    { name: 'GDPR' },
    { name: 'ISO/IEC 27701' },
    { name: 'ISO/IEC 42001' },
    { name: 'DORA' },
  ],
};

export const continuousComplianceClosing = {
  eyebrow: 'Continuous assurance, connected',
  title: 'Make your next audit a review, not a restart.',
  description: 'Keep controls, evidence, risk context, ownership, and review work connected throughout the year.',
  proof: 'From your first framework to an ongoing assurance program.',
};
