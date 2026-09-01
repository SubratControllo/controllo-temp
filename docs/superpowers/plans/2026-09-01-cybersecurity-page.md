# Cybersecurity Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic `/solutions/cybersecurity` route with a bespoke six-section Cybersecurity and Cloud Security page whose claims, trial handoff, motion, responsive behavior, and accessibility match the approved design.

**Architecture:** Keep the route page focused on metadata and section composition. Store approved copy and illustrative product states in one Cybersecurity content module, build each major visual as a route-owned section, and isolate the future external trial handoff behind one `TrialLink` component with a safe `/pricing` fallback. Continue using the current React Router, Motion React, Lucide, Tailwind v4 utilities, `MotionContext`, and shared Compliance Current primitives; do not add dependencies or alter the frozen homepage.

**Tech Stack:** React 19, React Router 7, Vite 8, Tailwind CSS 4, Motion React 12, Lucide React, Vitest 4, Testing Library

**Spec:** `docs/superpowers/specs/2026-09-01-cybersecurity-page-design.md`

## Global Constraints

- Read the approved spec and `docs/research/2026-09-01-cybersecurity-product-claim-verification.md` before editing product copy.
- Preserve the frozen homepage, shared header layout, route-transition behavior, and existing user changes. A trial destination correction outside this new page requires a separate explicit approval.
- Use Manrope for headings/body and IBM Plex Mono for technical labels through the existing theme; do not add or change fonts.
- Use only verified restrained claims: say **regularly refreshed** or **current**, keep Secura human-reviewed, distinguish GCP asset synchronization from AWS/Azure dashboard parity, and never imply automatic cloud-to-control mapping.
- Keep `100+ frameworks` only as the governed aggregate site claim. Link only SOC 2 and ISO 27001 inside the featured Cybersecurity set; render the other six featured entries as labels.
- The website owns only `VITE_TRIAL_URL`. Accept absolute `http:` or `https:` URLs, navigate them in the current tab, and fall back to the internal `/pricing` route for missing, blank, malformed, or non-web values.
- Do not publish a trial duration or implement registration, payment, provisioning, onboarding, product API calls, customer data, or a simulated live tenant.
- Use existing dependencies only. No GSAP, generated imagery, raster dashboard collage, WebGL, network request, or package-lock change.
- Motion must explain entry, selection, progression, or resolution and then settle. Reduced motion must render each visual immediately in a complete state.
- Preserve semantic headings, 46px-or-taller controls, visible focus, tab keyboard behavior, full document-readable challenge content, and no color-only state.
- The page must remain usable without `IntersectionObserver`; the fallback is the complete or first meaningful static state specified per section.
- At 1080px and below, avoid sticky challenge behavior. At 760px and below, stack dense layouts. At 375px down to 320px, prevent horizontal overflow and make primary actions full width.
- Remove the generic FAQ sections from Product and Pricing routes and delete their now-unused component/data. Do not add a Cybersecurity FAQ.
- Do not run `npm run build`, a full test suite, full linting, dependency installation, or dependency upgrades. Use only the focused commands named in this plan.
- Because the worktree already contains user edits, stage only the files named by the current task and inspect `git diff --cached --name-status` before every commit.

---

## File Structure

### New files

- `src/components/TrialLink.jsx`: validates `VITE_TRIAL_URL` and renders an external anchor or internal Router link.
- `src/components/TrialLink.test.jsx`: covers valid, absent, malformed, and unsafe trial destinations.
- `src/data/cybersecurityContent.js`: owns approved copy and all illustrative route data.
- `src/pages/CybersecurityPage.jsx`: owns metadata and the six-section order.
- `src/pages/CybersecurityPage.test.jsx`: covers page composition, copy boundaries, metadata, links, and section order.
- `src/sections/cybersecurity/CyberHeroSection.jsx`: outcome-led hero and Assurance Horizon.
- `src/sections/cybersecurity/CyberHeroSection.test.jsx`: covers hero copy, actions, separated planes, and reduced motion.
- `src/sections/cybersecurity/CyberResponseSection.jsx`: readable challenge list and desktop Response Matrix state.
- `src/sections/cybersecurity/CyberResponseSection.test.jsx`: covers all challenge content and observer-driven state cleanup.
- `src/sections/cybersecurity/CyberSecuraSection.jsx`: one-shot Review Dossier with explicit replay.
- `src/sections/cybersecurity/CyberSecuraSection.test.jsx`: covers phases, replay, timer cleanup, and reduced motion.
- `src/sections/cybersecurity/CyberCloudSection.jsx`: accessible Operational Visibility Console tabs.
- `src/sections/cybersecurity/CyberCloudSection.test.jsx`: covers tab semantics, focus/keyboard behavior, and claim separation.
- `src/sections/cybersecurity/CyberFrameworksSection.jsx`: Shared-Control Field and valid framework destinations.
- `src/sections/cybersecurity/CyberFrameworksSection.test.jsx`: covers labels, direct links, mobile reading structure, and claim boundaries.
- `src/sections/cybersecurity/CyberCtaSection.jsx`: restrained Quiet Resolution conversion panel.
- `src/sections/cybersecurity/CyberCtaSection.test.jsx`: covers actions, proof, final states, and reduced motion.
- `src/pages/FaqRemoval.test.jsx`: regression coverage for the FAQ removal on generic Product and Pricing pages.

### Modified files

- `src/App.jsx`: lazy-load and explicitly register the dedicated Cybersecurity page.
- `src/App.test.jsx`: prove `/solutions/cybersecurity` no longer resolves through `ProductPage`.
- `src/data/enterpriseContent.js`: remove the generic Cybersecurity page entry and obsolete FAQ data.
- `src/pages/ProductPage.jsx`: remove the generic FAQ band and imports.
- `src/pages/PricingPage.jsx`: remove the buying FAQ band, import, and derived data.
- `.env.example`: document the optional public trial destination.
- `README.md`: document the new route and public environment value.
- `docs/ARCHITECTURE.md`: document route/content ownership, motion ownership, and trial resolution.
- `docs/ROADMAP.md`: record the user-visible capability and retain the externally owned trial cutover as a launch gate without an unapproved duration.

### Deleted file

- `src/components/FaqList.jsx`: remove after its only two consumers and the shared FAQ data are removed.

---

### Task 1: Establish the content model and safe trial-link contract

**Files:**

- Create: `src/components/TrialLink.jsx`
- Create: `src/components/TrialLink.test.jsx`
- Create: `src/data/cybersecurityContent.js`
- Modify: `.env.example:1-6`

**Interfaces:**

- Produces: `resolveTrialUrl(rawValue: unknown): string | null`.
- Produces: `TrialLink({ children, className, onClick, trialUrl, ...anchorProps })`, rendering `<a href>` when `resolveTrialUrl` succeeds and `<Link to="/pricing">` otherwise.
- Produces: `cybersecurityMeta`, `cyberHero`, `cyberChallenges`, `cyberSecuraReview`, `cyberCloudViews`, `cyberFrameworks`, and `cyberClosing` from `src/data/cybersecurityContent.js`.
- Consumes: existing React Router `Link`; no route or section consumes these exports until later tasks.

- [ ] **Step 1: Write the failing `TrialLink` tests**

```jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import TrialLink, { resolveTrialUrl } from './TrialLink';

const renderLink = (trialUrl) => render(
  <MemoryRouter>
    <TrialLink className="button" trialUrl={trialUrl}>Start Free Trial</TrialLink>
  </MemoryRouter>
);

describe('TrialLink', () => {
  it('accepts only absolute HTTP and HTTPS destinations', () => {
    expect(resolveTrialUrl('https://trial.controllo.ai/start?source=cyber')).toBe(
      'https://trial.controllo.ai/start?source=cyber'
    );
    expect(resolveTrialUrl('http://localhost:4100/register')).toBe(
      'http://localhost:4100/register'
    );
    expect(resolveTrialUrl('/register')).toBeNull();
    expect(resolveTrialUrl('javascript:alert(1)')).toBeNull();
    expect(resolveTrialUrl('mailto:hello@controllo.ai')).toBeNull();
    expect(resolveTrialUrl('')).toBeNull();
    expect(resolveTrialUrl(undefined)).toBeNull();
  });

  it('renders a current-tab anchor for a configured production URL', () => {
    renderLink('  https://trial.controllo.ai/start  ');
    const link = screen.getByRole('link', { name: 'Start Free Trial' });
    expect(link).toHaveAttribute('href', 'https://trial.controllo.ai/start');
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel', 'noopener noreferrer');
  });

  it.each([undefined, '', 'not a URL', '/signup', 'ftp://files.example.com'])
  ('falls back to pricing for %s', (trialUrl) => {
    renderLink(trialUrl);
    expect(screen.getByRole('link', { name: 'Start Free Trial' }))
      .toHaveAttribute('href', '/pricing');
  });
});
```

- [ ] **Step 2: Run the focused test and confirm the expected failure**

Run:

```bash
npm test -- --run src/components/TrialLink.test.jsx --reporter=dot
```

Expected: FAIL because `src/components/TrialLink.jsx` does not exist.

- [ ] **Step 3: Implement URL validation and rendering**

```jsx
import { Link } from 'react-router-dom';

export function resolveTrialUrl(rawValue) {
  if (typeof rawValue !== 'string' || rawValue.trim() === '') return null;

  try {
    const url = new URL(rawValue.trim());
    return url.protocol === 'http:' || url.protocol === 'https:'
      ? url.href
      : null;
  } catch {
    return null;
  }
}

export default function TrialLink({
  children,
  className = '',
  onClick,
  trialUrl = import.meta.env.VITE_TRIAL_URL,
  ...anchorProps
}) {
  const destination = resolveTrialUrl(trialUrl);

  if (destination) {
    return (
      <a className={className} href={destination} onClick={onClick} {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} to="/pricing" onClick={onClick} {...anchorProps}>
      {children}
    </Link>
  );
}
```

Keep the external link in the current tab by omitting `target`. Do not add tracking parameters, trial duration, or trial-flow knowledge.

- [ ] **Step 4: Add the complete approved route data**

Create the module with the following stable export shapes and exact public copy. Keep the illustrative display values inside the data module so visual components contain no product claims of their own.

```js
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
```

Do not add “under a minute,” “live,” “automatic mapping,” “risk treatment,” or “full audit history” anywhere in this module.

- [ ] **Step 5: Document the public environment value in `.env.example`**

Append:

```dotenv

# Optional public absolute HTTP(S) URL for the externally owned trial flow.
# When empty or invalid, Start Free Trial links fall back to /pricing.
VITE_TRIAL_URL=
```

- [ ] **Step 6: Run the focused tests and content guard scan**

Run:

```bash
npm test -- --run src/components/TrialLink.test.jsx --reporter=dot
rg -n "under a minute|real-time|automatically mapped|risk treatment|full audit history" src/data/cybersecurityContent.js
```

Expected: all `TrialLink` tests PASS; `rg` returns no matches.

- [ ] **Step 7: Commit only Task 1 files**

```bash
git add .env.example src/components/TrialLink.jsx src/components/TrialLink.test.jsx src/data/cybersecurityContent.js
git diff --cached --name-status
git commit -m "feat: add cybersecurity content and trial link"
```

Expected staged paths: exactly the four Task 1 files.

---

### Task 2: Build the outcome hero and challenge-response story

**Files:**

- Create: `src/sections/cybersecurity/CyberHeroSection.jsx`
- Create: `src/sections/cybersecurity/CyberHeroSection.test.jsx`
- Create: `src/sections/cybersecurity/CyberResponseSection.jsx`
- Create: `src/sections/cybersecurity/CyberResponseSection.test.jsx`

**Interfaces:**

- Consumes: `cyberHero`, `cyberChallenges`, `TrialLink`, `motionEnabled: boolean`.
- Produces: `CyberHeroSection({ content, motionEnabled })` with the page `h1` and Assurance Horizon.
- Produces: `CyberResponseSection({ items, motionEnabled })` with five document-readable challenge/response pairs and an illustrative sticky console.
- The route page introduced in Task 6 will pass imported content into both sections.

- [ ] **Step 1: Write failing hero tests**

```jsx
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { cyberHero } from '../../data/cybersecurityContent';
import CyberHeroSection from './CyberHeroSection';

const renderHero = (motionEnabled = false) => render(
  <MemoryRouter>
    <CyberHeroSection content={cyberHero} motionEnabled={motionEnabled} />
  </MemoryRouter>
);

describe('CyberHeroSection', () => {
  it('presents the approved outcome and three distinct actions', () => {
    renderHero();
    const hero = screen.getByRole('region', { name: cyberHero.title });
    expect(within(hero).getByRole('heading', { level: 1, name: cyberHero.title })).toBeInTheDocument();
    expect(within(hero).getByRole('link', { name: 'Start Free Trial' })).toHaveAttribute('href', '/pricing');
    expect(within(hero).getByRole('link', { name: 'Request a Demo' })).toHaveAttribute('href', '/demo');
    expect(within(hero).getByRole('link', { name: 'Explore the Platform' })).toHaveAttribute('href', '/platform');
  });

  it('separates assurance work from operational context without connectors', () => {
    renderHero();
    const graphic = screen.getByRole('img', { name: 'Illustrative assurance and environment overview' });
    expect(within(graphic).getByText('Assurance work')).toBeInTheDocument();
    expect(within(graphic).getByText('Operational context')).toBeInTheDocument();
    expect(graphic.querySelector('[data-cloud-control-connector]')).not.toBeInTheDocument();
  });

  it('renders its resolved state when motion is disabled', () => {
    renderHero(false);
    expect(screen.getByTestId('assurance-horizon')).toHaveAttribute('data-motion', 'static');
    expect(screen.getByTestId('assurance-horizon')).toHaveAttribute('data-state', 'resolved');
  });
});
```

- [ ] **Step 2: Write failing challenge-response tests**

```jsx
import { act, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cyberChallenges } from '../../data/cybersecurityContent';
import CyberResponseSection from './CyberResponseSection';

let observerCallback;
const disconnect = vi.fn();

class IntersectionObserverStub {
  constructor(callback) { observerCallback = callback; }
  observe() {}
  unobserve() {}
  disconnect() { disconnect(); }
}

describe('CyberResponseSection', () => {
  beforeEach(() => {
    observerCallback = undefined;
    disconnect.mockClear();
    vi.stubGlobal('IntersectionObserver', IntersectionObserverStub);
  });
  afterEach(() => vi.unstubAllGlobals());

  it('keeps all five challenge and response pairs in the document', () => {
    render(<CyberResponseSection items={cyberChallenges} motionEnabled />);
    const list = screen.getByRole('list', { name: 'Cybersecurity challenges and responses' });
    expect(within(list).getAllByRole('listitem')).toHaveLength(5);
    cyberChallenges.forEach(({ challenge, response }) => {
      expect(within(list).getByText(challenge)).toBeInTheDocument();
      expect(within(list).getByText(response)).toBeInTheDocument();
    });
  });

  it('updates only the illustrative console when a row becomes current', () => {
    render(<CyberResponseSection items={cyberChallenges} motionEnabled />);
    const rows = screen.getAllByTestId(/cyber-response-row-/);
    act(() => observerCallback([{ target: rows[3], isIntersecting: true, intersectionRatio: 0.7 }]));
    const consolePanel = screen.getByLabelText('Current Controllo response example');
    expect(within(consolePanel).getByText('Environment watch')).toBeInTheDocument();
    expect(within(consolePanel).getByText('Refresh complete')).toBeInTheDocument();
  });

  it('disconnects its observer on unmount', () => {
    const { unmount } = render(<CyberResponseSection items={cyberChallenges} motionEnabled />);
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
  });
});
```

- [ ] **Step 3: Run both section tests and verify they fail**

Run:

```bash
npm test -- --run src/sections/cybersecurity/CyberHeroSection.test.jsx src/sections/cybersecurity/CyberResponseSection.test.jsx --reporter=dot
```

Expected: FAIL because both section modules are missing.

- [ ] **Step 4: Implement `CyberHeroSection` and Assurance Horizon**

Use one semantic section and one `role="img"` group. Keep both conceptual planes inside a shared frame, separated by a labelled rule—not connecting lines.

```jsx
import { ArrowRight, CalendarDays, CheckCircle2, Cloud, Eye, FileCheck2, UsersRound } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import TrialLink from '../../components/TrialLink';

const assuranceRows = [
  ['Access governance', 'Reviewable', CheckCircle2],
  ['Evidence packet', 'Owner assigned', FileCheck2]
];
const environmentRows = [
  ['Cloud sources', 'Current', Cloud],
  ['Workforce context', 'Available', UsersRound]
];

function HorizonPlane({ label, rows, motionEnabled, delay }) {
  return (
    <motion.div className="grid gap-3 p-5 max-[460px]:p-4" initial={motionEnabled ? { opacity: 0, y: 10 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: .38, delay }}>
      <span className="font-mono text-[.64rem] font-medium tracking-[.12em] uppercase text-teal">{label}</span>
      {rows.map(([name, state, Icon]) => (
        <div className="grid min-h-14 grid-cols-[auto_1fr_auto] items-center gap-3 border-t border-line pt-3" key={name}>
          <Icon className="size-4 text-teal" aria-hidden="true" />
          <strong className="text-[.76rem] font-medium">{name}</strong>
          <span className="text-[.65rem] text-muted">{state}</span>
        </div>
      ))}
    </motion.div>
  );
}

export default function CyberHeroSection({ content, motionEnabled }) {
  return (
    <section className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_82%_22%,rgba(38,216,173,.22),transparent_31%),linear-gradient(180deg,#f8fbfa_0%,#f3f8f6_78%,#e4f7f1_100%)] pt-42 pb-28 max-[1080px]:pt-36 max-[760px]:pt-32 max-[760px]:pb-20" aria-labelledby="cyber-hero-title">
      <div className="shell grid min-h-170 grid-cols-[.86fr_1.14fr] items-center gap-16 max-[1080px]:min-h-0 max-[1080px]:grid-cols-1">
        <div className="relative z-10 max-w-167">
          <p className="eyebrow">{content.eyebrow}</p>
          <h1 id="cyber-hero-title">{content.title}</h1>
          <p className="lede mt-6">{content.description}</p>
          <p className="mt-7 font-mono text-[.68rem] leading-7 text-muted">{content.frameworks.join(' · ')}</p>
          <div className="action-row max-[460px]:grid">
            <TrialLink className="button button--mint button--directional"><ArrowRight aria-hidden="true" />Start Free Trial</TrialLink>
            <Link className="button button--ghost" to="/demo"><CalendarDays aria-hidden="true" />Request a Demo</Link>
            <Link className="inline-flex min-h-11.5 items-center gap-2 px-2 text-[.82rem] text-teal" to="/platform"><Eye className="size-4" aria-hidden="true" />Explore the Platform</Link>
          </div>
        </div>
        <motion.div
          className="relative mx-auto w-full max-w-165 overflow-hidden rounded-[28px] border border-navy/12 bg-white/88 shadow-elevated backdrop-blur"
          initial={motionEnabled ? { opacity: 0, y: 18, scale: .985 } : false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: .7, ease: [.2, .7, .2, 1] }}
          role="img"
          aria-label="Illustrative assurance and environment overview"
          data-testid="assurance-horizon"
          data-motion={motionEnabled ? 'animated' : 'static'}
          data-state="resolved"
        >
          {motionEnabled ? <motion.span className="pointer-events-none absolute inset-y-0 z-10 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-mint/14 to-transparent" initial={{ x: '-130%' }} animate={{ x: '430%' }} transition={{ duration: .8, delay: .62, ease: [.2, .7, .2, 1] }} aria-hidden="true" /> : null}
          <div className="flex min-h-12 items-center justify-between border-b border-line px-5 font-mono text-[.62rem] uppercase tracking-[.1em] text-muted"><span>Assurance horizon</span><span>Illustrative view</span></div>
          <HorizonPlane label="Assurance work" rows={assuranceRows} motionEnabled={motionEnabled} delay={motionEnabled ? .16 : 0} />
          <div className="flex items-center gap-3 border-y border-line bg-mist/70 px-5 py-3 font-mono text-[.6rem] uppercase tracking-[.1em] text-muted"><span className="h-px flex-1 bg-line" /><span>Context remains distinct</span><span className="h-px flex-1 bg-line" /></div>
          <HorizonPlane label="Operational context" rows={environmentRows} motionEnabled={motionEnabled} delay={motionEnabled ? .28 : 0} />
        </motion.div>
      </div>
    </section>
  );
}
```

The frame and one short focus sweep run once and settle. Reduced motion omits both entrance transforms and the sweep. Add no ambient loop; keep the composition readable down to 320px.

- [ ] **Step 5: Implement `CyberResponseSection` with a resilient observer**

```jsx
import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export default function CyberResponseSection({ items, motionEnabled }) {
  const listRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!motionEnabled || typeof IntersectionObserver === 'undefined') return undefined;
    const rows = Array.from(listRef.current?.querySelectorAll('[data-response-index]') ?? []);
    const observer = new IntersectionObserver((entries) => {
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (current) setActiveIndex(Number(current.target.dataset.responseIndex));
    }, { threshold: [0.45, 0.6, 0.75], rootMargin: '-12% 0px -28% 0px' });
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [motionEnabled, items]);

  const active = items[activeIndex];

  return (
    <section className="section bg-white" aria-labelledby="cyber-response-title">
      <div className="shell">
        <header className="section-heading max-w-210"><p className="eyebrow">A connected cyber program</p><h2 id="cyber-response-title">Turn compliance friction into clearer action.</h2><p className="lede mt-6">Modern cyber and cloud programs must keep evidence reviewable, extend work across overlapping frameworks, respond to changing environments, assess risk consistently, and coordinate with auditors—without adding another disconnected system.</p></header>
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(340px,.72fr)] items-start gap-18 max-[1080px]:grid-cols-1 max-[1080px]:gap-10">
          <ol ref={listRef} className="list-none border-t border-line pl-0" aria-label="Cybersecurity challenges and responses">
            {items.map((item, index) => (
              <li className="grid min-h-62 content-center border-b border-line py-9 max-[760px]:min-h-0" data-response-index={index} data-testid={`cyber-response-row-${index}`} key={item.id}>
                <span className="font-mono text-[.62rem] text-teal">0{index + 1}</span>
                <h3 className="mt-5 max-w-150">{item.challenge}</h3>
                <p className="mt-4 mb-0 max-w-165 text-[.88rem] leading-[1.75] text-muted">{item.response}</p>
                <div className="mt-5 hidden border-l-2 border-mint pl-4 max-[1080px]:block"><strong className="block text-[.78rem]">{item.visual.value}</strong><span className="text-[.68rem] text-muted">{item.visual.detail}</span></div>
              </li>
            ))}
          </ol>
          <div className="sticky top-32 rounded-[24px] border border-navy/12 bg-navy p-7 text-white shadow-elevated max-[1080px]:hidden" aria-label="Current Controllo response example">
            <span className="font-mono text-[.62rem] uppercase tracking-[.12em] text-mint">Illustrative response</span>
            <motion.div key={active.id} initial={motionEnabled ? { opacity: 0, y: 8 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: .24 }}>
              <p className="mt-18 mb-2 text-[.72rem] text-[#b8c8d5]">{active.visual.label}</p>
              <h3 className="text-white">{active.visual.value}</h3>
              <p className="mt-4 mb-0 text-[.75rem] leading-[1.65] text-[#b8c8d5]">{active.visual.detail}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

The desktop console is enhancement only. Every response remains visible inside the ordered list. The breakpoint removes sticky behavior at `1080px` and below.

- [ ] **Step 6: Run the focused tests**

Run:

```bash
npm test -- --run src/sections/cybersecurity/CyberHeroSection.test.jsx src/sections/cybersecurity/CyberResponseSection.test.jsx --reporter=dot
```

Expected: all tests PASS with no `act(...)` warnings.

- [ ] **Step 7: Commit only the hero and response slice**

```bash
git add src/sections/cybersecurity/CyberHeroSection.jsx src/sections/cybersecurity/CyberHeroSection.test.jsx src/sections/cybersecurity/CyberResponseSection.jsx src/sections/cybersecurity/CyberResponseSection.test.jsx
git diff --cached --name-status
git commit -m "feat: add cyber readiness narrative"
```

Expected staged paths: exactly the four Task 2 files.

---

### Task 3: Build the one-shot Secura Review Dossier

**Files:**

- Create: `src/sections/cybersecurity/CyberSecuraSection.jsx`
- Create: `src/sections/cybersecurity/CyberSecuraSection.test.jsx`

**Interfaces:**

- Consumes: `cyberSecuraReview`, `motionEnabled: boolean`.
- Produces: `CyberSecuraSection({ content, motionEnabled })`.
- Exports: `SECURA_REVIEW_DELAYS = { scope: 650, reviewing: 850 }` for deterministic focused tests.
- Ends in phase `result`; replay resets to `scope` and starts one new sequence. It never loops automatically.

- [ ] **Step 1: Write the failing phase, replay, and reduced-motion tests**

```jsx
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cyberSecuraReview } from '../../data/cybersecurityContent';
import CyberSecuraSection, { SECURA_REVIEW_DELAYS } from './CyberSecuraSection';

let inViewCallback;
class IntersectionObserverStub {
  constructor(callback) { inViewCallback = callback; }
  observe() {}
  disconnect() {}
}

const enterView = () => act(() => inViewCallback([{ isIntersecting: true, intersectionRatio: .7 }]));

describe('CyberSecuraSection', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('IntersectionObserver', IntersectionObserverStub);
  });
  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('plays once from review scope to a human-reviewed recommendation', () => {
    render(<CyberSecuraSection content={cyberSecuraReview} motionEnabled />);
    const dossier = screen.getByRole('article', { name: 'Illustrative Secura control review' });
    expect(dossier).toHaveAttribute('data-phase', 'scope');
    enterView();
    act(() => vi.advanceTimersByTime(SECURA_REVIEW_DELAYS.scope));
    expect(dossier).toHaveAttribute('data-phase', 'reviewing');
    act(() => vi.advanceTimersByTime(SECURA_REVIEW_DELAYS.reviewing));
    expect(dossier).toHaveAttribute('data-phase', 'result');
    expect(within(dossier).getByText('2 gaps identified')).toBeInTheDocument();
    expect(within(dossier).getByText(cyberSecuraReview.recommendation)).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(20_000));
    expect(dossier).toHaveAttribute('data-phase', 'result');
  });

  it('replays only after explicit activation', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<CyberSecuraSection content={cyberSecuraReview} motionEnabled />);
    enterView();
    act(() => vi.advanceTimersByTime(SECURA_REVIEW_DELAYS.scope + SECURA_REVIEW_DELAYS.reviewing));
    await user.click(screen.getByRole('button', { name: 'Replay Secura review' }));
    expect(screen.getByRole('article', { name: 'Illustrative Secura control review' })).toHaveAttribute('data-phase', 'scope');
  });

  it('renders the complete result immediately for reduced motion', () => {
    render(<CyberSecuraSection content={cyberSecuraReview} motionEnabled={false} />);
    const dossier = screen.getByRole('article', { name: 'Illustrative Secura control review' });
    expect(dossier).toHaveAttribute('data-phase', 'result');
    expect(within(dossier).getAllByRole('listitem', { name: /gap:/i })).toHaveLength(2);
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```bash
npm test -- --run src/sections/cybersecurity/CyberSecuraSection.test.jsx --reporter=dot
```

Expected: FAIL because `CyberSecuraSection.jsx` does not exist.

- [ ] **Step 3: Implement the deterministic one-shot controller**

Use `scope`, `reviewing`, and `result` only. Store timeout IDs and clear them before replay and on unmount.

```jsx
import { useCallback, useEffect, useRef, useState } from 'react';
import { FileCheck2, RefreshCw, ScanSearch, ShieldCheck } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export const SECURA_REVIEW_DELAYS = { scope: 650, reviewing: 850 };

export default function CyberSecuraSection({ content, motionEnabled }) {
  const panelRef = useRef(null);
  const timersRef = useRef([]);
  const hasPlayedRef = useRef(false);
  const [phase, setPhase] = useState(motionEnabled ? 'scope' : 'result');

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const play = useCallback(() => {
    clearTimers();
    setPhase('scope');
    timersRef.current = [
      window.setTimeout(() => setPhase('reviewing'), SECURA_REVIEW_DELAYS.scope),
      window.setTimeout(() => setPhase('result'), SECURA_REVIEW_DELAYS.scope + SECURA_REVIEW_DELAYS.reviewing)
    ];
  }, [clearTimers]);

  useEffect(() => {
    if (!motionEnabled) {
      clearTimers();
      setPhase('result');
      return undefined;
    }
    if (typeof IntersectionObserver === 'undefined') {
      setPhase('result');
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= .45 && !hasPlayedRef.current) {
        hasPlayedRef.current = true;
        play();
      }
    }, { threshold: [.45] });
    observer.observe(panelRef.current);
    return () => { observer.disconnect(); clearTimers(); };
  }, [clearTimers, motionEnabled, play]);

  return (
    <section className="section overflow-hidden bg-navy text-white" aria-labelledby="cyber-secura-title">
      <div className="shell grid grid-cols-[.82fr_1.18fr] items-center gap-20 max-[1080px]:grid-cols-1">
        <div className="max-w-150"><p className="eyebrow text-mint">{content.eyebrow}</p><h2 id="cyber-secura-title" className="text-white">{content.title}</h2><p className="mt-6 mb-0 text-[1rem] leading-[1.75] text-[#b8c8d5]">{content.description}</p><ol className="mt-9 grid grid-cols-4 gap-2 border-t border-white/14 pt-5 max-[520px]:grid-cols-2" aria-label="Secura review workflow">{content.workflow.map((step, index) => <li className="list-none font-mono text-[.64rem] text-mint" key={step}>0{index + 1} · {step}</li>)}</ol></div>
        <article ref={panelRef} className="min-h-145 overflow-hidden rounded-[26px] border border-white/14 bg-white text-navy shadow-form max-[760px]:min-h-155" aria-label="Illustrative Secura control review" data-phase={phase}>
          <header className="flex min-h-15 items-center justify-between border-b border-line px-5"><span className="font-mono text-[.62rem] uppercase tracking-[.12em] text-teal">Control review dossier</span><span className="text-[.64rem] text-muted">Illustrative product view</span></header>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={phase} className="p-6 max-[520px]:p-4" initial={motionEnabled ? { opacity: 0, y: 8 } : false} animate={{ opacity: 1, y: 0 }} exit={motionEnabled ? { opacity: 0, y: -6 } : undefined} transition={{ duration: .24 }}>
              {phase === 'scope' && <div><ShieldCheck className="size-5 text-teal" aria-hidden="true" /><p className="mt-8 font-mono text-[.65rem] uppercase text-teal">Review scope</p><h3 className="mt-2">{content.control}</h3><ul className="mt-8 list-none border-t border-line pl-0">{content.sources.map((source) => <li className="flex min-h-14 items-center justify-between border-b border-line text-[.75rem]" key={source.label}><span>{source.label}</span><span className="text-muted">{source.state}</span></li>)}</ul></div>}
              {phase === 'reviewing' && <div className="grid min-h-112 place-items-center text-center"><div><ScanSearch className="mx-auto size-8 text-teal" aria-hidden="true" /><h3 className="mt-5">Reviewing connected context</h3><p className="mt-3 text-[.75rem] text-muted">Requirement · Implementation · Policy · Evidence</p></div></div>}
              {phase === 'result' && <div><FileCheck2 className="size-5 text-teal" aria-hidden="true" /><p className="mt-8 font-mono text-[.65rem] uppercase text-teal">Review result</p><h3 className="mt-2">2 gaps identified</h3><ul className="mt-7 list-none border-t border-line pl-0">{content.gaps.map((gap) => <li className="border-b border-line py-4 text-[.76rem]" aria-label={`Gap: ${gap}`} key={gap}>{gap}</li>)}</ul><div className="mt-6 rounded-[18px] bg-mint-soft p-5"><span className="font-mono text-[.6rem] uppercase text-teal">Recommended review action</span><p className="mt-3 mb-0 text-[.78rem] leading-[1.6]">{content.recommendation}</p></div><p className="mt-4 text-[.68rem] text-muted">Validate findings before taking action.</p></div>}
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-end border-t border-line px-5 py-3"><button className="inline-flex min-h-11.5 items-center gap-2 rounded-[14px] border border-line bg-white px-4 text-[.72rem] text-teal" type="button" onClick={() => { hasPlayedRef.current = true; motionEnabled ? play() : setPhase('result'); }}><RefreshCw className="size-3.5" aria-hidden="true" />Replay Secura review</button></div>
        </article>
      </div>
    </section>
  );
}
```

Do not render chat bubbles, credits, cloud signals, endpoint metrics, or a looping animation. Ensure the fixed minimum height contains every phase without clipping.

- [ ] **Step 4: Run the focused test**

Run:

```bash
npm test -- --run src/sections/cybersecurity/CyberSecuraSection.test.jsx --reporter=dot
```

Expected: all tests PASS; fake timers are cleared after every test.

- [ ] **Step 5: Commit only the Secura slice**

```bash
git add src/sections/cybersecurity/CyberSecuraSection.jsx src/sections/cybersecurity/CyberSecuraSection.test.jsx
git diff --cached --name-status
git commit -m "feat: add Secura review dossier"
```

Expected staged paths: exactly the two Task 3 files.

---

### Task 4: Build the accessible Operational Visibility Console

**Files:**

- Create: `src/sections/cybersecurity/CyberCloudSection.jsx`
- Create: `src/sections/cybersecurity/CyberCloudSection.test.jsx`

**Interfaces:**

- Consumes: `cyberCloudViews`, `motionEnabled: boolean`.
- Produces: `CyberCloudSection({ views, motionEnabled })`.
- Tab IDs: `cyber-cloud-tab-${view.id}`; panel ID: `cyber-cloud-panel-${view.id}`.
- Arrow Left/Right wrap and activate; Home/End activate first/last; focus moves to the newly active tab.

- [ ] **Step 1: Write the failing tab semantics and keyboard tests**

```jsx
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { cyberCloudViews } from '../../data/cybersecurityContent';
import CyberCloudSection from './CyberCloudSection';

describe('CyberCloudSection', () => {
  it('starts with Cloud Assets and exposes one labelled panel', () => {
    render(<CyberCloudSection views={cyberCloudViews} motionEnabled={false} />);
    expect(screen.getByRole('tab', { name: 'Cloud Assets' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Identities & Devices' })).toHaveAttribute('aria-selected', 'false');
    const panel = screen.getByRole('tabpanel', { name: 'Cloud Assets' });
    expect(within(panel).getByText('GCP assets')).toBeInTheDocument();
    expect(within(panel).getByText('Synced')).toBeInTheDocument();
    expect(within(panel).getByText('Illustrative product view')).toBeInTheDocument();
  });

  it('supports wrapping Arrow keys plus Home and End', async () => {
    const user = userEvent.setup();
    render(<CyberCloudSection views={cyberCloudViews} motionEnabled />);
    const cloud = screen.getByRole('tab', { name: 'Cloud Assets' });
    cloud.focus();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Alerts & Exposure' })).toHaveFocus();
    expect(screen.getByRole('tabpanel', { name: 'Alerts & Exposure' })).toBeInTheDocument();
    await user.keyboard('{Home}');
    expect(cloud).toHaveFocus();
    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Alerts & Exposure' })).toHaveFocus();
  });

  it('does not claim that operational signals update controls', () => {
    render(<CyberCloudSection views={cyberCloudViews} motionEnabled={false} />);
    expect(screen.queryByText(/automatically map|update control status|continuous control mapping/i)).not.toBeInTheDocument();
    expect(document.querySelector('[data-cloud-control-connector]')).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```bash
npm test -- --run src/sections/cybersecurity/CyberCloudSection.test.jsx --reporter=dot
```

Expected: FAIL because `CyberCloudSection.jsx` does not exist.

- [ ] **Step 3: Implement roving focus and three visually distinct panel arrangements**

```jsx
import { useRef, useState } from 'react';
import { Activity, Boxes, Cloud, MonitorCheck, ShieldAlert, UsersRound } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const panelIcons = [Cloud, UsersRound, ShieldAlert];

export default function CyberCloudSection({ views, motionEnabled }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);
  const active = views[activeIndex];

  const activate = (index) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  const handleKeyDown = (event, index) => {
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % views.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + views.length) % views.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = views.length - 1;
    else return;
    event.preventDefault();
    activate(nextIndex);
  };

  const ActiveIcon = panelIcons[activeIndex];

  return (
    <section className="section bg-mist" aria-labelledby="cyber-cloud-title">
      <div className="shell">
        <header className="mx-auto mb-14 max-w-200 text-center"><p className="eyebrow">Cloud and workforce monitoring</p><h2 id="cyber-cloud-title">See what is connected and where attention is needed.</h2><p className="lede mx-auto mt-6">Bring supported cloud resources, workforce identities and devices, access activity, and security alerts into regularly refreshed operational views.</p></header>
        <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-elevated">
          <div className="flex gap-2 overflow-x-auto border-b border-line bg-[#f8fbfa] p-3" role="tablist" aria-label="Operational visibility views">
            {views.map((view, index) => {
              const Icon = panelIcons[index];
              return <button ref={(node) => { tabRefs.current[index] = node; }} className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-[13px] border-0 bg-transparent px-4 text-[.78rem] text-muted aria-selected:bg-navy aria-selected:text-white" id={`cyber-cloud-tab-${view.id}`} type="button" role="tab" aria-selected={activeIndex === index} aria-controls={`cyber-cloud-panel-${view.id}`} tabIndex={activeIndex === index ? 0 : -1} onClick={() => activate(index)} onKeyDown={(event) => handleKeyDown(event, index)} key={view.id}><Icon className="size-4" aria-hidden="true" />{view.label}</button>;
            })}
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div className="grid min-h-125 grid-cols-[.78fr_1.22fr] max-[760px]:min-h-0 max-[760px]:grid-cols-1" id={`cyber-cloud-panel-${active.id}`} role="tabpanel" aria-labelledby={`cyber-cloud-tab-${active.id}`} key={active.id} initial={motionEnabled ? { opacity: 0, y: 8 } : false} animate={{ opacity: 1, y: 0 }} exit={motionEnabled ? { opacity: 0, y: -6 } : undefined} transition={{ duration: .24 }}>
              <div className="flex flex-col justify-between border-r border-line bg-navy p-8 text-white max-[760px]:border-r-0 max-[760px]:border-b max-[520px]:p-5"><div><ActiveIcon className="size-6 text-mint" aria-hidden="true" /><p className="mt-16 font-mono text-[.61rem] uppercase tracking-[.12em] text-mint">{active.label}</p><h3 className="mt-3 text-white">{active.summary}</h3></div><span className="mt-10 text-[.65rem] text-[#b8c8d5]">Illustrative product view</span></div>
              <div className="p-8 max-[520px]:p-5"><div className="grid grid-cols-3 gap-3 max-[520px]:grid-cols-1">{active.metrics.map(([label, value], metricIndex) => { const Icon = metricIndex === 0 ? Boxes : metricIndex === 1 ? MonitorCheck : Activity; return <div className="min-h-28 rounded-[18px] border border-line p-4" key={label}><Icon className="size-4 text-teal" aria-hidden="true" /><span className="mt-7 block text-[.65rem] text-muted">{label}</span><strong className="mt-1 block text-[.78rem]">{value}</strong></div>; })}</div><ul className="mt-6 list-none border-t border-line pl-0">{active.rows.map(([label, state]) => <li className="grid min-h-15 grid-cols-[1fr_auto] items-center gap-4 border-b border-line text-[.76rem]" key={label}><span>{label}</span><strong className="font-medium text-teal">{state}</strong></li>)}</ul></div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
```

Keep the tab strip horizontally scrollable only when necessary. Never put the content panel itself in a horizontal scroller. With reduced motion, state changes remain manual and use no spatial transition.

- [ ] **Step 4: Run the focused tests**

Run:

```bash
npm test -- --run src/sections/cybersecurity/CyberCloudSection.test.jsx --reporter=dot
```

Expected: all tests PASS; keyboard focus and selection move together.

- [ ] **Step 5: Commit only the Cloud slice**

```bash
git add src/sections/cybersecurity/CyberCloudSection.jsx src/sections/cybersecurity/CyberCloudSection.test.jsx
git diff --cached --name-status
git commit -m "feat: add operational visibility console"
```

Expected staged paths: exactly the two Task 4 files.

---

### Task 5: Build the Shared-Control Field and closing conversion

**Files:**

- Create: `src/sections/cybersecurity/CyberFrameworksSection.jsx`
- Create: `src/sections/cybersecurity/CyberFrameworksSection.test.jsx`
- Create: `src/sections/cybersecurity/CyberCtaSection.jsx`
- Create: `src/sections/cybersecurity/CyberCtaSection.test.jsx`

**Interfaces:**

- Consumes: `cyberFrameworks`, `cyberClosing`, `TrialLink`, `motionEnabled: boolean`.
- Produces: `CyberFrameworksSection({ frameworks, motionEnabled })` and `CyberCtaSection({ content, motionEnabled })`.
- Framework entries with `href` render Router links; entries with `href: null` render non-interactive `<span>` content.

- [ ] **Step 1: Write failing framework-link and mapping-boundary tests**

```jsx
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { cyberFrameworks } from '../../data/cybersecurityContent';
import CyberFrameworksSection from './CyberFrameworksSection';

describe('CyberFrameworksSection', () => {
  it('renders eight featured entries with only two direct detail links', () => {
    render(<MemoryRouter><CyberFrameworksSection frameworks={cyberFrameworks} motionEnabled={false} /></MemoryRouter>);
    const list = screen.getByRole('list', { name: 'Featured cyber and cloud frameworks' });
    expect(within(list).getAllByRole('listitem')).toHaveLength(8);
    expect(within(list).getByRole('link', { name: /Explore SOC 2/i })).toHaveAttribute('href', '/frameworks/soc-2');
    expect(within(list).getByRole('link', { name: /Explore ISO\/IEC 27001/i })).toHaveAttribute('href', '/frameworks/iso-27001');
    expect(within(list).getAllByRole('link')).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'Explore All Frameworks' })).toHaveAttribute('href', '/frameworks');
  });

  it('describes reuse without promising automatic completion', () => {
    render(<MemoryRouter><CyberFrameworksSection frameworks={cyberFrameworks} motionEnabled /></MemoryRouter>);
    expect(screen.getByText('Shared control workspace')).toBeInTheDocument();
    expect(screen.getByText('Access governance')).toBeInTheDocument();
    expect(screen.queryByText(/automatically complete|automatic compliance|one-click certified/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Write failing closing-conversion tests**

```jsx
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { cyberClosing } from '../../data/cybersecurityContent';
import CyberCtaSection from './CyberCtaSection';

describe('CyberCtaSection', () => {
  it('uses restrained proof and the approved conversion actions', () => {
    render(<MemoryRouter><CyberCtaSection content={cyberClosing} motionEnabled={false} /></MemoryRouter>);
    const section = screen.getByRole('region', { name: cyberClosing.title });
    expect(within(section).getByRole('link', { name: 'Start Free Trial' })).toHaveAttribute('href', '/pricing');
    expect(within(section).getByRole('link', { name: 'Request a Demo' })).toHaveAttribute('href', '/demo');
    expect(within(section).getByRole('list', { name: 'Cybersecurity platform proof' })).toHaveTextContent('100+ frameworks');
    expect(section).not.toHaveTextContent(/customer|trusted by|under a minute/i);
  });

  it('resolves all three quiet states under reduced motion', () => {
    render(<MemoryRouter><CyberCtaSection content={cyberClosing} motionEnabled={false} /></MemoryRouter>);
    const band = screen.getByTestId('cyber-resolution-band');
    expect(band).toHaveAttribute('data-motion', 'static');
    expect(within(band).getAllByRole('listitem')).toHaveLength(3);
  });
});
```

- [ ] **Step 3: Run the tests and verify they fail**

Run:

```bash
npm test -- --run src/sections/cybersecurity/CyberFrameworksSection.test.jsx src/sections/cybersecurity/CyberCtaSection.test.jsx --reporter=dot
```

Expected: FAIL because both modules are missing.

- [ ] **Step 4: Implement the responsive Shared-Control Field**

```jsx
import { ArrowRight, FileCheck2, Layers3, Network, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const sharedControls = [
  ['Access governance', ShieldCheck],
  ['Asset inventory', Layers3],
  ['Incident response', FileCheck2]
];

export default function CyberFrameworksSection({ frameworks, motionEnabled }) {
  return (
    <section className="section overflow-hidden bg-white" aria-labelledby="cyber-frameworks-title">
      <div className="shell grid grid-cols-[.72fr_1.28fr] items-center gap-18 max-[1080px]:grid-cols-1">
        <div className="max-w-145"><p className="eyebrow">Framework coverage</p><h2 id="cyber-frameworks-title">Start with one framework. Expand when you need to.</h2><p className="lede mt-6">Activate the cyber and cloud requirements relevant today, then extend mapped controls and linked evidence as customer, regulatory, and market expectations evolve.</p><p className="mt-8 font-mono text-[.68rem] text-muted">100+ global and regional frameworks</p><Link className="mt-8 inline-flex min-h-11.5 items-center gap-2 text-[.8rem] font-medium text-teal" to="/frameworks">Explore All Frameworks <ArrowRight className="size-4" aria-hidden="true" /></Link></div>
        <div className="relative min-h-155 overflow-hidden rounded-[28px] border border-line bg-mist p-6 max-[760px]:grid max-[760px]:min-h-0 max-[760px]:gap-4 max-[520px]:p-4">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(6,27,50,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(6,27,50,.045)_1px,transparent_1px)] bg-[size:42px_42px]" aria-hidden="true" />
          <span className="pointer-events-none absolute top-1/2 right-10 left-10 h-px bg-teal/18 max-[760px]:hidden" aria-hidden="true" />
          <div className="absolute top-1/2 left-1/2 z-10 w-63 -translate-x-1/2 -translate-y-1/2 rounded-[22px] border border-navy/12 bg-navy p-5 text-white shadow-elevated max-[760px]:relative max-[760px]:top-auto max-[760px]:left-auto max-[760px]:order-1 max-[760px]:w-full max-[760px]:translate-0"><Network className="size-5 text-mint" aria-hidden="true" /><p className="mt-10 font-mono text-[.62rem] uppercase text-mint">Shared control workspace</p><ul className="mt-5 list-none border-t border-white/14 pl-0">{sharedControls.map(([label, Icon]) => <li className="flex min-h-13 items-center gap-3 border-b border-white/14 text-[.72rem]" key={label}><Icon className="size-3.5 text-mint" aria-hidden="true" />{label}</li>)}</ul><p className="mt-5 mb-0 text-[.68rem] leading-[1.6] text-[#b8c8d5]">Reuse approved work while each framework keeps visible scope and accountability.</p></div>
          <ul className="relative grid min-h-143 grid-cols-4 content-between gap-x-3 gap-y-56 list-none pl-0 max-[760px]:order-2 max-[760px]:min-h-0 max-[760px]:grid-cols-1 max-[760px]:content-normal max-[760px]:gap-3" aria-label="Featured cyber and cloud frameworks">
            {frameworks.map((framework, index) => <motion.li className="min-h-30 rounded-[18px] border border-line bg-white p-4" initial={motionEnabled ? { opacity: 0, y: 10 } : false} whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined} viewport={{ once: true, amount: .3 }} transition={{ duration: .34, delay: Math.min(index * .04, .24) }} key={framework.name}><span className="font-mono text-[.56rem] uppercase text-teal">{framework.category}</span><strong className="mt-5 block text-[.76rem]">{framework.name}</strong><small className="mt-2 block leading-[1.45] text-muted">{framework.description}</small>{framework.href ? <Link className="mt-4 inline-flex min-h-11 items-center text-[.68rem] text-teal" to={framework.href}>Explore {framework.name}</Link> : null}</motion.li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
```

At `760px` and below, the shared-control explanation comes first and the framework list becomes a normal vertical reading sequence. Do not force radial positioning or a drawer on mobile.

- [ ] **Step 5: Implement the Quiet Resolution closing panel**

```jsx
import { ArrowRight, CalendarDays, CheckCircle2, Eye, FileCheck2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import TrialLink from '../../components/TrialLink';

const resolutionStates = [
  ['Implementation current', CheckCircle2],
  ['Evidence reviewable', FileCheck2],
  ['Environment visible', Eye]
];

export default function CyberCtaSection({ content, motionEnabled }) {
  return (
    <section className="relative overflow-hidden bg-teal py-28 text-white" aria-labelledby="cyber-cta-title">
      <div className="shell relative z-10 grid grid-cols-[1fr_.78fr] items-center gap-16 max-[900px]:grid-cols-1">
        <div><p className="eyebrow text-mint">{content.eyebrow}</p><h2 id="cyber-cta-title" className="text-white">{content.title}</h2><p className="mt-5 mb-0 max-w-165 text-[1rem] leading-[1.7] text-conversion-copy">{content.description}</p><div className="action-row max-[460px]:grid"><TrialLink className="button button--mint button--directional"><ArrowRight aria-hidden="true" />Start Free Trial</TrialLink><Link className="button button--light" to="/demo"><CalendarDays aria-hidden="true" />Request a Demo</Link></div><ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 list-none pl-0 font-mono text-[.61rem] text-conversion-copy" aria-label="Cybersecurity platform proof">{content.proof.map((item) => <li key={item}>{item}</li>)}</ul></div>
        <motion.ul className="list-none rounded-[24px] border border-white/18 bg-navy/34 p-5 pl-5 backdrop-blur" data-testid="cyber-resolution-band" data-motion={motionEnabled ? 'resolved' : 'static'} aria-label="Resolved program states" initial={motionEnabled ? { opacity: 0, x: 16 } : false} whileInView={motionEnabled ? { opacity: 1, x: 0 } : undefined} viewport={{ once: true, amount: .45 }} transition={{ duration: .42 }}>
          {resolutionStates.map(([label, Icon], index) => <li className="flex min-h-17 items-center gap-4 border-b border-white/14 last:border-0" key={label}><span className="grid size-9 place-items-center rounded-full border border-mint/35 bg-mint/10"><Icon className="size-4 text-mint" aria-hidden="true" /></span><span className="text-[.78rem]">{label}</span><span className="ml-auto font-mono text-[.58rem] text-mint">0{index + 1}</span></li>)}
        </motion.ul>
      </div>
    </section>
  );
}
```

Keep this panel spacious. It contains no dashboard, logo grid, customer proof, or reused homepage emblem assembly.

- [ ] **Step 6: Run the focused tests**

Run:

```bash
npm test -- --run src/sections/cybersecurity/CyberFrameworksSection.test.jsx src/sections/cybersecurity/CyberCtaSection.test.jsx --reporter=dot
```

Expected: all tests PASS; exactly two featured framework detail links appear.

- [ ] **Step 7: Commit only the frameworks and closing slice**

```bash
git add src/sections/cybersecurity/CyberFrameworksSection.jsx src/sections/cybersecurity/CyberFrameworksSection.test.jsx src/sections/cybersecurity/CyberCtaSection.jsx src/sections/cybersecurity/CyberCtaSection.test.jsx
git diff --cached --name-status
git commit -m "feat: add cyber framework and conversion sections"
```

Expected staged paths: exactly the four Task 5 files.

---

### Task 6: Compose and register the dedicated route

**Files:**

- Create: `src/pages/CybersecurityPage.jsx`
- Create: `src/pages/CybersecurityPage.test.jsx`
- Modify: `src/App.jsx:12-17,35-40`
- Modify: `src/App.test.jsx:210-219`
- Modify: `src/data/enterpriseContent.js:25-95`

**Interfaces:**

- Consumes: every content export from Task 1 and every section from Tasks 2-5.
- Produces: default `CybersecurityPage` and the explicit lazy route `/solutions/cybersecurity`.
- `productRoutePaths` must no longer contain `/solutions/cybersecurity`; all other generic product paths remain unchanged.

- [ ] **Step 1: Write the failing page composition test**

```jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { MotionProvider } from '../context/MotionContext';
import { cybersecurityMeta, cyberHero } from '../data/cybersecurityContent';
import CybersecurityPage from './CybersecurityPage';

const renderPage = () => render(
  <MemoryRouter initialEntries={['/solutions/cybersecurity']}>
    <MotionProvider><CybersecurityPage /></MotionProvider>
  </MemoryRouter>
);

describe('CybersecurityPage', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/solutions/cybersecurity');
  });

  it('composes the approved six-section narrative in order', () => {
    renderPage();
    const headings = [
      cyberHero.title,
      'Turn compliance friction into clearer action.',
      'Review each control with Secura before sharing it with an auditor.',
      'See what is connected and where attention is needed.',
      'Start with one framework. Expand when you need to.',
      'Build cyber and cloud compliance you can prove.'
    ].map((name) => screen.getByRole('heading', { name }));
    headings.slice(0, -1).forEach((heading, index) => {
      expect(heading.compareDocumentPosition(headings[index + 1]))
        .toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(screen.queryByText(/Questions, answered|Buying questions/i)).not.toBeInTheDocument();
  });

  it('publishes route metadata without unsupported language', () => {
    renderPage();
    expect(document.title).toBe(`${cybersecurityMeta.title} | Controllo`);
    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute('content', cybersecurityMeta.description);
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://controllo.ai/solutions/cybersecurity');
  });
});
```

- [ ] **Step 2: Add a failing dedicated-route test to `src/App.test.jsx`**

```jsx
it('renders the dedicated Cybersecurity route instead of the generic product template', async () => {
  renderRoute('/solutions/cybersecurity');

  expect(await screen.findByRole('heading', {
    level: 1,
    name: /one platform for cyber readiness and connected environment visibility/i
  })).toBeInTheDocument();
  expect(screen.getByRole('region', {
    name: /see what is connected and where attention is needed/i
  })).toBeInTheDocument();
  expect(screen.queryByText('Clarity at every handoff.')).not.toBeInTheDocument();
});
```

- [ ] **Step 3: Run the two focused page tests and verify failure**

Run:

```bash
npm test -- --run src/pages/CybersecurityPage.test.jsx src/App.test.jsx --reporter=dot
```

Expected: the page test fails because `CybersecurityPage.jsx` is missing; the application test still finds the generic route.

- [ ] **Step 4: Compose the route page without route-specific business logic**

```jsx
import PageMeta from '../components/PageMeta';
import { useSiteMotion } from '../context/MotionContext';
import {
  cybersecurityMeta,
  cyberChallenges,
  cyberClosing,
  cyberCloudViews,
  cyberFrameworks,
  cyberHero,
  cyberSecuraReview
} from '../data/cybersecurityContent';
import CyberCloudSection from '../sections/cybersecurity/CyberCloudSection';
import CyberCtaSection from '../sections/cybersecurity/CyberCtaSection';
import CyberFrameworksSection from '../sections/cybersecurity/CyberFrameworksSection';
import CyberHeroSection from '../sections/cybersecurity/CyberHeroSection';
import CyberResponseSection from '../sections/cybersecurity/CyberResponseSection';
import CyberSecuraSection from '../sections/cybersecurity/CyberSecuraSection';

export default function CybersecurityPage() {
  const { motionEnabled } = useSiteMotion();

  return (
    <>
      <PageMeta title={cybersecurityMeta.title} description={cybersecurityMeta.description} />
      <CyberHeroSection content={cyberHero} motionEnabled={motionEnabled} />
      <CyberResponseSection items={cyberChallenges} motionEnabled={motionEnabled} />
      <CyberSecuraSection content={cyberSecuraReview} motionEnabled={motionEnabled} />
      <CyberCloudSection views={cyberCloudViews} motionEnabled={motionEnabled} />
      <CyberFrameworksSection frameworks={cyberFrameworks} motionEnabled={motionEnabled} />
      <CyberCtaSection content={cyberClosing} motionEnabled={motionEnabled} />
    </>
  );
}
```

- [ ] **Step 5: Give the route one explicit lazy boundary**

In `src/App.jsx`, add:

```jsx
const CybersecurityPage = lazy(() => import('./pages/CybersecurityPage'));
```

Inside the shared-layout route, place this before the generic `productRoutePaths.map`:

```jsx
<Route path="/solutions/cybersecurity" element={<CybersecurityPage />} />
```

Delete only the `/solutions/cybersecurity` object from `productPages`. Keep the navigation entry, footer entry, icon imports still used elsewhere, and every other generic product object. `productRoutePaths` will then exclude the path automatically.

- [ ] **Step 6: Run the focused route tests**

Run:

```bash
npm test -- --run src/pages/CybersecurityPage.test.jsx src/App.test.jsx --reporter=dot
```

Expected: all page and application tests PASS; Suspense resolves the dedicated page and the generic template copy is absent.

- [ ] **Step 7: Verify the route registry and sitemap have one owner/entry**

Run:

```bash
rg -n "solutions/cybersecurity" src/App.jsx src/data/enterpriseContent.js public/sitemap.xml
```

Expected:

- one explicit route in `src/App.jsx`
- navigation/footer references remain in `src/data/enterpriseContent.js`, but no `productPages` object
- one existing sitemap URL; do not add a duplicate

- [ ] **Step 8: Commit only the route-composition files**

```bash
git add src/pages/CybersecurityPage.jsx src/pages/CybersecurityPage.test.jsx src/App.jsx src/App.test.jsx src/data/enterpriseContent.js
git diff --cached --name-status
git commit -m "feat: register dedicated cybersecurity page"
```

Expected staged paths: exactly the five Task 6 files.

---

### Task 7: Remove repeated FAQ sections and dead FAQ code

**Files:**

- Create: `src/pages/FaqRemoval.test.jsx`
- Modify: `src/pages/ProductPage.jsx:1-9,61-69`
- Modify: `src/pages/PricingPage.jsx:1-8,36,131-139`
- Modify: `src/data/enterpriseContent.js:172-177`
- Delete: `src/components/FaqList.jsx`

**Interfaces:**

- Consumes: existing Product and Pricing route components.
- Produces: no new runtime interface; removes `FaqList`, `faqs`, and `buyingFaqs` completely.
- Must preserve Product route features, ProductDemo, ConversionBand, Pricing packages, and package comparison behavior.

- [ ] **Step 1: Write the failing FAQ-removal regression test**

```jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { MotionProvider } from '../context/MotionContext';
import PricingPage from './PricingPage';
import ProductPage from './ProductPage';

function renderRoute(path, element) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <MotionProvider>
        <Routes><Route path={path} element={element} /></Routes>
      </MotionProvider>
    </MemoryRouter>
  );
}

describe('generic FAQ removal', () => {
  it('removes repeated questions from generic product routes', () => {
    renderRoute('/platform/risk-management', <ProductPage />);
    expect(screen.getByRole('heading', { name: 'See risk while it is still actionable.' })).toBeInTheDocument();
    expect(screen.queryByText('Questions, answered')).not.toBeInTheDocument();
    expect(screen.queryByText('Does Controllo replace our auditor?')).not.toBeInTheDocument();
  });

  it('removes the generic buying questions while preserving package comparison', () => {
    renderRoute('/pricing', <PricingPage />);
    expect(screen.getByRole('button', { name: 'Compare packages' })).toBeInTheDocument();
    expect(screen.queryByText('Buying questions')).not.toBeInTheDocument();
    expect(screen.queryByText('Can we use our existing controls?')).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```bash
npm test -- --run src/pages/FaqRemoval.test.jsx --reporter=dot
```

Expected: both assertions fail because the FAQ sections still render.

- [ ] **Step 3: Remove the two sections, imports, data, and component**

Make these exact removals:

```diff
- import FaqList from '../components/FaqList';
- import { faqs, productPages } from '../data/enterpriseContent';
+ import { productPages } from '../data/enterpriseContent';
```

Delete the ProductPage `<section>` whose eyebrow is `Questions, answered`.

```diff
- import FaqList from '../components/FaqList';
- import { faqs } from '../data/enterpriseContent';
- const buyingFaqs = faqs.slice(0, 3);
```

Delete the PricingPage `<section>` whose eyebrow is `Buying questions`.

Delete the complete `export const faqs` array containing the four questions “Does Controllo replace our auditor?”, “Can we use our existing controls?”, “How does Secura AI make decisions?”, and “Can Controllo support multiple programs?” from `enterpriseContent.js`, then remove the unused file:

```bash
git rm src/components/FaqList.jsx
```

- [ ] **Step 4: Prove no runtime FAQ consumers remain**

Run:

```bash
rg -n "FaqList|buyingFaqs|export const faqs|Questions, answered|Buying questions" src
```

Expected: only the negative assertions in `src/pages/FaqRemoval.test.jsx` match; no runtime source match remains.

- [ ] **Step 5: Run focused regression tests**

Run:

```bash
npm test -- --run src/pages/FaqRemoval.test.jsx src/App.test.jsx --reporter=dot
```

Expected: all tests PASS; generic routes and pricing comparison still render.

- [ ] **Step 6: Commit only the FAQ cleanup**

```bash
git add src/pages/FaqRemoval.test.jsx src/pages/ProductPage.jsx src/pages/PricingPage.jsx src/data/enterpriseContent.js
git diff --cached --name-status
git commit -m "refactor: remove repeated page FAQs"
```

Expected staged paths: the four modified/created files plus the deleted `FaqList.jsx`; no other file.

---

### Task 8: Document ownership, run targeted validation, and complete browser QA

**Files:**

- Modify: `README.md:5-35,46-57`
- Modify: `docs/ARCHITECTURE.md:22-80`
- Modify: `docs/ROADMAP.md:159-190`

**Interfaces:**

- Documents: the dedicated route boundary, content ownership, `VITE_TRIAL_URL`, six section-owned motion systems, FAQ policy, and externally owned production cutover.
- Does not modify runtime behavior.

- [ ] **Step 1: Add the exact README environment contract**

Add the dedicated Cybersecurity route to Current Status and extend the environment example to:

```dotenv
VITE_LEAD_ENDPOINT=https://example.com/api/leads
VITE_DEMO_CALENDAR_URL=https://example.com/book
VITE_TRIAL_URL=https://trial.example.com/start
```

Add this explanation directly below the example:

```markdown
`VITE_TRIAL_URL` is the optional public absolute HTTP(S) handoff owned by the external trial application. When it is absent or invalid, Cybersecurity page trial actions remain visible and lead to `/pricing`. The marketing site does not implement registration, payment, provisioning, onboarding, or trial-duration logic.
```

- [ ] **Step 2: Add the route boundary and motion ownership to Architecture**

Add a `Dedicated Cybersecurity Route` subsection after Content Model containing:

```markdown
### Dedicated Cybersecurity Route

`src/pages/CybersecurityPage.jsx` owns metadata and the ordered six-section composition for `/solutions/cybersecurity`. `src/data/cybersecurityContent.js` owns its approved copy and illustrative product states. The route is lazy-loaded explicitly in `src/App.jsx` and is intentionally excluded from the generic `productPages` registry.

Each route-owned section controls one visual system: Assurance Horizon, Response Matrix, Review Dossier, Operational Visibility Console, Shared-Control Field, or Quiet Resolution. `MotionContext` supplies the operating-system motion preference; automated sequences settle, clean up timers/observers, and render complete static states under reduced motion.

`TrialLink` accepts only an absolute `http:` or `https:` `VITE_TRIAL_URL`. A missing, blank, malformed, relative, or non-web value renders an internal Router link to `/pricing`. The variable is public browser configuration and must never contain a secret.

Generic Product and Pricing pages no longer repeat FAQ content. Educational questions belong in the external article library; a future pricing-specific FAQ requires separately approved commercial answers.
```

- [ ] **Step 3: Update Roadmap capability and trial launch gate accurately**

Add a dated completed capability entry:

```markdown
- [x] Replace the generic Cybersecurity route with a claim-verified six-section page covering framework implementation, Secura review, risk and auditor context, supported cloud/workforce monitoring, framework reuse, and an externally configurable trial handoff. The route has distinct responsive graphics, keyboard-operable tabs, one-shot motion, and complete reduced-motion states.
```

Replace the current 14-day launch-blocker wording with:

```markdown
- [ ] Supply the approved production `VITE_TRIAL_URL` owned by the external trial application, verify registration and useful first-session activation end to end, and reconcile the external system’s trial duration before publishing any duration claim.
```

Do not mark the external trial integration complete simply because the fallback link works.

- [ ] **Step 4: Run the complete focused Cybersecurity test set**

Run exactly:

```bash
npm test -- --run src/components/TrialLink.test.jsx src/sections/cybersecurity/CyberHeroSection.test.jsx src/sections/cybersecurity/CyberResponseSection.test.jsx src/sections/cybersecurity/CyberSecuraSection.test.jsx src/sections/cybersecurity/CyberCloudSection.test.jsx src/sections/cybersecurity/CyberFrameworksSection.test.jsx src/sections/cybersecurity/CyberCtaSection.test.jsx src/pages/CybersecurityPage.test.jsx src/pages/FaqRemoval.test.jsx src/App.test.jsx --reporter=dot
```

Expected: every named test file passes; there are no fake-timer, `act`, duplicate-key, or accessibility-role warnings.

- [ ] **Step 5: Run cheap source and diff checks**

Run:

```bash
rg -n "under a minute|real-time|automatically mapped|automatic compliance|risk treatment|full audit history|Book a Demo" src/data/cybersecurityContent.js src/sections/cybersecurity src/pages/CybersecurityPage.jsx
rg -n "FaqList|buyingFaqs|export const faqs" src
git diff --check
```

Expected: both `rg` commands return no runtime matches; `git diff --check` returns no output.

- [ ] **Step 6: Reuse the existing development server or start one only if none exists**

First inspect the current local terminal or known Vite URL. If no development server is available, run:

```bash
npm run dev
```

Do not start a second Vite process. Open `/solutions/cybersecurity` through the in-app browser and keep the browser console visible during QA.

- [ ] **Step 7: Complete desktop and tablet browser QA**

Inspect 1440×900, 1024×900, and 768×1024. At each width verify:

- the header does not cover the hero heading or actions
- the six headings appear in approved order
- Assurance Horizon keeps Assurance work and Operational context visibly separated
- Response Matrix is sticky only above 1080px; all five written responses remain readable at every width
- Secura runs once, stops at the recommendation, and replays only through the replay button
- Cloud tabs change only through user activation and their focus/selected state is visible
- only SOC 2 and ISO/IEC 27001 are direct featured-framework links
- the closing panel is visually quiet and both actions remain at least 46px high
- no section clips, changes height unexpectedly during animation, or creates horizontal overflow
- the console shows no React, routing, observer, timer, or duplicate-key warnings

- [ ] **Step 8: Complete small-mobile and accessibility browser QA**

Inspect 375×812 and 320×700. Verify full-width actions, readable product labels, no miniature radial framework layout, no sideways dashboard scrolling, no horizontal document overflow, and no clipped content.

Then complete keyboard-only QA:

1. Use the skip link to reach `#main-content`.
2. Tab through all hero, cloud, framework, replay, and closing actions with a visible focus outline.
3. On Cloud Assets, press Arrow Left to wrap to Alerts & Exposure; press Home and End; confirm focus and `aria-selected` move together.
4. Confirm non-linked framework labels never enter the tab order.
5. Confirm replay activation does not move focus unexpectedly.

Emulate `prefers-reduced-motion: reduce`, reload the route, and verify:

- Assurance Horizon is resolved with no parallax
- every challenge/response pair remains readable
- Secura opens directly on the complete result
- Cloud tabs remain manually operable with no spatial transition
- all framework entries and closing states are immediately visible
- no automated phase, observer callback, sweep, or transform loop runs

- [ ] **Step 9: Record actual validation evidence in Roadmap**

Append a dated validation entry containing only observed results. Start and end the entry with these exact bullets:

```markdown
Validation on 2026-09-01:

- The dedicated Cybersecurity route renders its six claim-verified sections, safe trial fallback, distinct responsive visuals, keyboard-operable Cloud tabs, one-shot Secura review, and complete reduced-motion states. Generic Product and Pricing FAQs are removed.
- Browser QA passed at 1440×900, 1024×900, 768×1024, 375×812, and 320×700 with zero horizontal overflow and no browser-console warnings. The production build and full test suite were not run.
```

Between those bullets, add the exact Step 4 command in backticks followed by the final Vitest file/test count copied verbatim from the successful run. Do not estimate, round, or pre-fill the count.

If any check fails, record nothing yet; return to the responsible task, add a failing regression test, fix the narrow cause, rerun only the affected test, and repeat the relevant browser check.

- [ ] **Step 10: Commit documentation after validation**

```bash
git add -p README.md docs/ARCHITECTURE.md docs/ROADMAP.md
git diff --cached --name-status
git commit -m "docs: record cybersecurity page architecture"
```

Expected staged paths: exactly the three documentation files, with only the Cybersecurity hunks selected. Reject every unrelated pre-existing hunk during `git add -p`.

- [ ] **Step 11: Final scope check**

Run:

```bash
git status --short
git log --oneline -8
```

Expected: Task 1-8 commits are visible, the plan’s runtime files are clean, pre-existing user changes remain present and uncommitted if they were not part of an approved Cybersecurity hunk, and no dependency or production-build artifact changed.
