export const securaAiMeta = {
  title: 'Secura AI for Compliance Gap Analysis',
  description: 'Review control requirements against implementation details, policies, procedures, and evidence. Secura AI surfaces gaps and prepares next actions for human review.',
};

export const securaAiHero = {
  eyebrow: 'Secura AI',
  title: 'Know what’s missing. Know what to review next.',
  titleAccent: 'Know what to review next.',
  description: 'Secura reviews a control requirement alongside its implementation description, linked policies and procedures, and evidence. It surfaces missing or incomplete context and prepares recommendations for your team to validate.',
  supportingLine: 'Reviewable AI guidance for GRC teams.',
  primaryAction: { label: 'Request a demo', href: '/demo' },
  secondaryAction: { label: 'See a sample control review', href: '#secura-output' },
};

export const securaAiContext = {
  eyebrow: 'Full control context',
  title: 'One control. Every relevant source in context.',
  description: 'Secura reviews the control requirement together with the linked implementation description, policies, procedures, and evidence available to the control.',
  items: [
    {
      id: 'requirement',
      title: 'Control requirement',
      description: 'Defines what the control must demonstrate.',
      status: 'Required context',
    },
    {
      id: 'implementation',
      title: 'Implementation description',
      description: 'Shows how the control operates in practice.',
      status: 'Implementation context',
    },
    {
      id: 'policies',
      title: 'Policies & procedures',
      description: 'Defines how the control should operate.',
      status: 'Linked documents',
    },
    {
      id: 'evidence',
      title: 'Evidence',
      description: 'Demonstrates that the control was performed.',
      status: 'Reviewable records',
    },
  ],
  highlight: '4 sources · 1 control context · reviewable AI guidance',
};

export const securaAiProcess = {
  eyebrow: 'From control to clarity',
  title: 'Deep gap analysis, structured for review.',
  description: 'The information is already part of the control workflow. Secura brings the linked context together and turns it into a structured analysis.',
  steps: [
    ['Describe', 'Explain how the control is implemented.'],
    ['Connect', 'Link policies, procedures, and evidence.'],
    ['Analyze', 'Review the requirement and supporting context.'],
    ['Understand', 'See what is supported, incomplete, or missing.'],
    ['Improve', 'Review recommendations and decide what to address.'],
  ],
  highlight: 'Describe → Connect → Analyze → Understand → Improve',
};

export const securaAiOutput = {
  eyebrow: 'Structured gap analysis',
  title: 'Not just a finding. The full picture.',
  description: 'Start with the overall position, then move through the specific documents, gaps, and recommended next actions that need human review.',
  items: [
    ['Analysis summary', 'See what Secura found across the implementation description and supporting records.'],
    ['Document level gaps', 'Review findings against individual policies, procedures, and evidence files instead of receiving one generic response.'],
    ['Gap summary table', 'Bring identified issues into one structured view so your team can see what needs attention.'],
    ['Detailed recommendations', 'Use practical guidance to strengthen the implementation description, documentation, or evidence.'],
  ],
  example: {
    label: 'Sample control review',
    document: 'Q2 Access Review.pdf',
    finding: 'The access review was performed, but reviewer approval is not visible.',
    reason: 'The evidence does not fully demonstrate that the review was formally completed.',
    recommendation: 'Add the reviewer name, approval date, and closure status for identified exceptions.',
  },
  highlight: 'See the gap. Understand why. Know what to review next.',
};

export const securaAiValue = {
  eyebrow: 'Built for GRC gap analysis',
  title: 'Spend less time assembling the first review. Focus on what needs attention.',
  description: 'A manual control review means reading the requirement, implementation description, policies, procedures, and evidence, then comparing them to find what does not line up. Secura performs that first structured review and gives your team a clearer place to start.',
  manualTasks: [
    'Read the control requirement',
    'Review the implementation description',
    'Check policies and procedures',
    'Inspect linked evidence',
    'Work out the next action',
  ],
  structuredOutputs: [
    ['Structured gaps', 'See what is incomplete or missing.'],
    ['Source-level findings', 'Know which linked source needs attention.'],
    ['Recommended review actions', 'See what the team should review next.'],
  ],
  differentiators: [
    ['Control aware', 'Analysis starts with the requirement.'],
    ['Context aware', 'The implementation description and supporting records are reviewed together.'],
    ['Document level', 'See which specific source needs attention.'],
    ['Action oriented', 'Turn findings into practical recommendations for review.'],
  ],
  highlight: 'Less manual comparison. More focused review.',
};

export const securaAiReadiness = {
  eyebrow: 'Be ready before review',
  title: 'Review potential gaps before formal assessment.',
  description: 'A missing document is easy to spot. A weak implementation description, incomplete record, or inconsistency between policy and evidence can be harder to catch. Secura gives your team another layer of review while there is still time to investigate the finding and strengthen the control.',
  benefits: [
    'Review implementation descriptions before formal assessment',
    'Identify policy and procedure gaps',
    'Find weaknesses in supporting evidence',
    'Spot inconsistencies across documentation',
    'Prioritize what needs attention',
    'Prepare stronger control support for review',
  ],
  workflow: ['Implement', 'Document', 'Secura review', 'Address gaps', 'Formal review'],
  findings: [
    ['Implementation weak', 'Control activity not fully described'],
    ['Policy gap found', 'Procedure not aligned to policy'],
    ['Evidence needs review', 'Supporting record incomplete'],
  ],
  priority: 'Findings are prioritized before formal review.',
  boundary: 'Secura supports the analysis. Your team and auditor remain responsible for the final judgment.',
};

export const securaAiClosing = {
  eyebrow: 'See Secura in action',
  title: 'Give Secura a control. See what your team may have missed.',
  description: 'Bring together the implementation description, policies, procedures, and evidence behind a control. Secura gives you a structured view of what is supported, what needs attention, and what your team should review next.',
  supportingLine: 'From control context to structured gap analysis and reviewable next steps.',
  primaryAction: { label: 'Request a demo', href: '/demo' },
  secondaryAction: { label: 'Review the sample analysis', href: '#secura-output' },
};
