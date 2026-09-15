export const auditManagementMeta = {
  title: 'Audit management software for compliance & GRC',
  description: 'Review framework scope, linked policy and evidence records, auditor assignments, and framework report exports in Controllo.',
};

export const auditHero = {
  eyebrow: 'Audit management',
  title: 'Keep audit scope, evidence, and reviewers aligned.',
  description: 'Review in-scope frameworks, linked policies and evidence, and internal or external auditor assignments in Controllo. Export framework details when it is time to share the review.',
  supporting: 'Framework scope · Linked documents · Auditor assignments · Framework export',
};

export const auditAreas = [
  {
    label: 'Audit frameworks',
    title: 'Know what is in scope.',
    copy: 'Review framework scope and progress, open the control view, and export framework details as an XLSX report.',
    cue: 'Scope → review → export',
  },
  {
    label: 'Policies and procedures',
    title: 'Find the documentation behind a control.',
    copy: 'Keep policy files and effective dates together with their linked controls.',
    cue: 'Document → linked control',
  },
  {
    label: 'Evidence',
    title: 'Know what a file supports.',
    copy: 'Review evidence records, attached files, effective dates, and the controls they support.',
    cue: 'Evidence → linked control',
  },
  {
    label: 'Auditor management',
    title: 'See who reviews each framework.',
    copy: 'Maintain a primary contact, additional contacts, and separate internal or external framework assignments.',
    cue: 'Contact → assigned framework',
  },
];

export const auditRepositoryViews = [
  {
    label: 'Policies',
    title: 'Policy and procedure record',
    record: 'Access review policy',
    file: 'Policy file',
    detail: 'Effective date recorded on the file',
    control: 'Access review control',
    copy: 'Keep governance documentation attached to the controls it supports. Framework context remains visible through those linked controls.',
  },
  {
    label: 'Evidence',
    title: 'Evidence record',
    record: 'Access review evidence',
    file: 'Supporting file',
    detail: 'Effective date recorded on the file',
    control: 'Access review control',
    copy: 'Give each supporting file a clear purpose by keeping it with an evidence record and its linked controls.',
  },
];

export const auditAuditor = {
  eyebrow: 'Auditor management',
  title: 'See who reviews each framework.',
  description: 'Keep the primary auditor contact and additional contacts visible beside separate internal and external framework assignments.',
  note: 'Keep contact and assignment context available to the team managing the review.',
};

export const auditClosing = {
  title: 'Walk through your next audit handoff.',
  copy: 'Bring one real framework review. We will look at the documents, auditor assignments, and decisions that need to stay connected.',
};
