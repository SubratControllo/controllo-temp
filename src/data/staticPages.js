import { Accessibility, Building2, LockKeyhole, Scale, ShieldCheck } from 'lucide-react';

export const staticPages = {
  '/company': {
    eyebrow: 'Company',
    title: 'Building the operating layer for lasting trust.',
    description: 'Controllo is focused on helping security and GRC teams turn assurance work into a connected, current system.',
    icon: Building2,
    sections: [
      [
        'Why we exist',
        'Compliance work often loses context as it moves between systems, teams, and audit cycles. We believe the program should become more useful every time work is approved.'
      ],
      [
        'How we build',
        'We design for accountable people, explainable guidance, and the reality that every organization operates differently.'
      ]
    ]
  },
  '/security': {
    eyebrow: 'Security',
    title: 'Trust starts with how the platform is operated.',
    description: 'Our security program is designed around clear ownership, controlled access, resilient operations, and transparent communication.',
    icon: ShieldCheck,
    sections: [
      [
        'Security by design',
        'Access, change, and operational decisions are designed to be reviewable and accountable.'
      ],
      [
        'Responsible disclosure',
        'Security reports should be shared through an approved private channel. Contact the Controllo team for disclosure instructions.'
      ]
    ]
  },
  '/privacy-policy': {
    eyebrow: 'Privacy',
    title: 'Privacy information, written for people.',
    description: 'This page describes the intended privacy approach for the website. Final legal language must be reviewed before production publication.',
    icon: LockKeyhole,
    sections: [
      [
        'Information you provide',
        'Demo requests may include your name, work email, company, company size, and role.'
      ],
      [
        'How it is used',
        'Submitted information is intended to respond to your request and understand interest in Controllo.'
      ],
      [
        'Your choices',
        'You may request access, correction, or deletion through the published Controllo privacy contact once configured.'
      ]
    ]
  },
  '/terms': {
    eyebrow: 'Terms',
    title: 'Clear terms for using this website.',
    description: 'This is a structured publication placeholder. Approved legal terms must replace this text before production launch.',
    icon: Scale,
    sections: [
      [
        'Website use',
        'Use the website lawfully and do not attempt to disrupt its operation or access restricted systems.'
      ],
      [
        'Product information',
        'Website information may change and does not create a service commitment without an executed agreement.'
      ]
    ]
  },
  '/accessibility': {
    eyebrow: 'Accessibility',
    title: 'A website experience designed to remain usable.',
    description: 'Controllo aims for WCAG 2.2 AA and supports keyboard navigation, visible focus, readable contrast, and reduced motion.',
    icon: Accessibility,
    sections: [
      [
        'Motion and interaction',
        'Visitors can pause ambient motion, and the experience respects operating-system reduced-motion preferences.'
      ],
      [
        'Feedback',
        'If part of the website creates an accessibility barrier, contact the Controllo team with the page and issue encountered.'
      ]
    ]
  }
};

export const staticPagesWithoutConversion = new Set([
  '/privacy-policy',
  '/terms',
  '/accessibility'
]);
