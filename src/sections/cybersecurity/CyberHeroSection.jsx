import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  CircleAlert,
  Cloud,
  Database,
  FileCheck2,
  FolderOpen,
  House,
  LayoutGrid,
  Layers3,
  ListChecks,
  ScanText,
  Settings,
  ShieldCheck,
  UserRound,
  UsersRound
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import IntegrationLogo from '../../components/IntegrationLogo';
import TrialLink from '../../components/TrialLink';
import { brandAssets } from '../../data/brandAssets';

const proofCards = [
  {
    label: 'Secura AI',
    value: '2 gaps identified',
    detail: 'Evidence period · Required approval',
    className: 'cyber-hero-proof--secura',
    entry: { x: 86, y: 78 },
    secura: true
  },
  {
    label: 'Cloud security',
    value: '3 configuration risks',
    detail: 'Updated now',
    className: 'cyber-hero-proof--cloud',
    entry: { x: -76, y: 72 },
    Icon: Cloud,
    cloudSources: true
  },
  {
    label: 'Identity & endpoint risk',
    value: '1 exposed identity',
    detail: 'Microsoft 365 · Dark Web',
    className: 'cyber-hero-proof--identity',
    entry: { x: 84, y: -70 },
    Icon: UserRound,
    identityRisk: true
  },
  {
    label: 'Framework coverage',
    value: 'Mapped',
    detail: 'SOC 2 · ISO/IEC 27001',
    className: 'cyber-hero-proof--framework',
    entry: { x: -78, y: -68 },
    Icon: Layers3
  }
];

const supportedCloudSources = [
  { label: 'AWS', brand: brandAssets.aws },
  { label: 'Microsoft Azure', brand: brandAssets.microsoftAzure },
  { label: 'Google Cloud', brand: brandAssets.googleCloud }
];

const controlReviewStates = [
  { label: 'Implementation', status: 'Current', Icon: Check, state: 'ready' },
  { label: 'Policy & Procedure', status: 'Linked', Icon: Check, state: 'ready' },
  { label: 'Evidence', status: 'Review needed', Icon: CircleAlert, state: 'attention' },
  { label: 'Audit', status: 'Scoped', Icon: ShieldCheck, state: 'ready' }
];

const connectedArtifacts = [
  { label: 'Access review record', kind: 'Evidence', Icon: FileCheck2 },
  { label: 'User access management', kind: 'Policy & Procedure', Icon: BookOpen }
];

const dashboardNavigation = [House, ListChecks, ShieldCheck, FolderOpen, UsersRound, LayoutGrid, Settings];

const reviewContext = [
  { label: 'Owner', value: 'Assigned', Icon: UserRound },
  { label: 'Evidence freshness', value: 'Review needed', Icon: Database, attention: true },
  { label: 'Audit scope', value: 'Scoped', Icon: ShieldCheck }
];

function ControlWorkspace({ motionEnabled }) {
  return (
    <div className="cyber-hero-workspace">
      <header className="cyber-hero-workspace__header">
        <span>
          <span className="cyber-hero-workspace__framework">SOC 2 · CC6.2B</span>
          <h3>Access review</h3>
          <span className="cyber-hero-workspace__subtitle">Control workspace</span>
        </span>
        <span className="cyber-hero-workspace__dots" aria-hidden="true"><i /><i /><i /></span>
      </header>

      <div className="cyber-hero-workspace__body">
        <div className="cyber-hero-workspace__left">
          <section className="cyber-hero-scope" aria-label="Review scope">
            <span className="cyber-hero-scope__ring" aria-hidden="true"><ScanText /></span>
            <span>
              <strong>Review scope</strong>
              <span>Requirement, implementation, and evidence in view</span>
            </span>
          </section>

          <section className="cyber-hero-artifacts">
            <h4>Connected artifacts</h4>
            <ul aria-label="Connected control artifacts">
              {connectedArtifacts.map(({ label, kind, Icon }) => (
                <li aria-label={`${label}: ${kind}`} key={label}>
                  <span className="cyber-hero-artifacts__icon"><Icon aria-hidden="true" /></span>
                  <span><strong>{label}</strong><small>{kind}</small></span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="cyber-hero-review">
          <h4>Control review</h4>
          <ul aria-label="Control review states">
            {controlReviewStates.map(({ label, status, Icon, state }) => (
              <motion.li
                aria-label={`${label}: ${status}`}
                data-state={state}
                data-story-signal={state === 'attention' ? 'source' : undefined}
                initial={false}
                animate={motionEnabled && state === 'attention'
                  ? { opacity: [1, .68, 1], scale: [1, 1.012, 1] }
                  : { opacity: 1, scale: 1 }}
                transition={{ duration: .42, delay: motionEnabled && state === 'attention' ? .18 : 0, ease: [.16, 1, .3, 1] }}
                key={label}
              >
                <span className="cyber-hero-review__icon"><Icon aria-hidden="true" /></span>
                <span><strong>{label}</strong><small>{status}</small></span>
              </motion.li>
            ))}
          </ul>
        </section>
      </div>

      <ul className="cyber-hero-workspace__context" aria-label="Review context">
        {reviewContext.map(({ label, value, Icon, attention }) => (
          <li aria-label={`${label}: ${value}`} data-attention={attention ? 'true' : undefined} key={label}>
            <Icon aria-hidden="true" />
            <span><small>{label}</small><strong>{value}</strong></span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ConnectedProductStage({ motionEnabled }) {
  return (
    <div className="cyber-hero-proof-cluster relative">
      <div className="cyber-hero-orbit cyber-hero-orbit--outer" aria-hidden="true" />
      <div
        className="cyber-hero-orbit-field"
        data-layer="behind-dashboard"
        data-motion={motionEnabled ? 'animated' : 'static'}
        data-testid="cyber-hero-orbit-field"
        aria-hidden="true"
      >
        <span className="cyber-hero-orbit-track cyber-hero-orbit-track--outer">
          {['primary', 'secondary'].map((emblem) => (
            <span
              className={`cyber-hero-orbit-planet cyber-hero-orbit-planet--${emblem}`}
              data-direction="forward"
              key={emblem}
            >
              <img alt="" data-testid="cyber-hero-orbit-emblem" draggable={false} src="/assets/emblemLogo.svg" />
            </span>
          ))}
        </span>
      </div>

      <motion.div
        className="cyber-hero-dashboard-entry"
        data-testid="cyber-hero-dashboard"
        initial={false}
        style={{ opacity: 1 }}
      >
        <div className="cyber-hero-dashboard-plane">
          <div className="cyber-hero-dashboard-rail" data-testid="cyber-dashboard-navigation" aria-hidden="true">
            <img
              alt=""
              className="cyber-hero-dashboard-emblem"
              data-testid="cyber-dashboard-emblem"
              draggable={false}
              src="/assets/emblemLogo.svg"
            />
            {dashboardNavigation.map((Icon, index) => (
              <span className={`cyber-hero-dashboard-rail__item${index === 1 ? ' cyber-hero-dashboard-rail__item--active' : ''}`} key={index}>
                <Icon />
              </span>
            ))}
          </div>
          <div className="cyber-hero-dashboard-screen">
            <ControlWorkspace motionEnabled={motionEnabled} />
          </div>
        </div>
      </motion.div>

      {motionEnabled ? (
        <motion.span
          className="cyber-hero-signal-burst"
          data-testid="cyber-hero-signal-burst"
          aria-hidden="true"
          initial={{ opacity: 0, scale: .3 }}
          animate={{ opacity: [0, .34, 0], scale: [.3, 1.25, 1.45] }}
          transition={{ duration: .58, delay: .2, ease: [.16, 1, .3, 1] }}
        />
      ) : null}

      <ul className="absolute inset-0 z-20 list-none p-0" aria-label="Connected assurance proof cards">
        {proofCards.map(({ label, value, detail, Icon, className, entry, secura, cloudSources, identityRisk }, index) => (
          <motion.li
            className={`cyber-hero-proof ${className}`}
            aria-label={`${label}: ${value}`}
            data-motion-origin="dashboard"
            data-story-signal={secura ? 'response' : undefined}
            initial={motionEnabled ? { opacity: 0, x: entry.x, y: entry.y, scale: .72 } : false}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            transition={{ duration: .42, delay: motionEnabled ? .34 + index * .07 : 0, ease: [.16, 1, .3, 1] }}
            key={label}
          >
            {identityRisk ? (
              <>
                <span className="cyber-hero-identity-card__header">
                  <span className="cyber-hero-proof__icon"><Icon aria-hidden="true" /></span>
                  <span className="cyber-hero-proof__copy">
                    <span className="cyber-hero-proof__label">{label}</span>
                    <strong className="cyber-hero-proof__value">{value}</strong>
                    <span className="cyber-hero-proof__detail">{detail}</span>
                  </span>
                </span>
                <span className="cyber-hero-identity-sparkline" data-testid="identity-risk-sparkline" aria-hidden="true">
                  {Array.from({ length: 8 }, (_, barIndex) => <i key={barIndex} />)}
                </span>
              </>
            ) : cloudSources ? (
              <>
                <span className="cyber-hero-cloud-card__header">
                  <span className="cyber-hero-proof__icon"><Icon aria-hidden="true" /></span>
                  <span className="cyber-hero-proof__copy">
                    <span className="cyber-hero-proof__label">{label}</span>
                    <strong className="cyber-hero-proof__value">{value}</strong>
                    <span className="cyber-hero-proof__detail">{detail}</span>
                  </span>
                </span>
                <ul className="cyber-hero-cloud-sources" aria-label="Supported cloud sources">
                  {supportedCloudSources.map((source) => (
                    <li aria-label={source.label} key={source.label}>
                      <IntegrationLogo brand={source.brand} />
                    </li>
                  ))}
                </ul>
              </>
            ) : secura ? (
              <img
                alt=""
                aria-hidden="true"
                className="cyber-hero-proof__secura-mark"
                data-testid="cyber-secura-mark"
                draggable={false}
                src="/assets/secura-mark.svg"
              />
            ) : (
              <span className="cyber-hero-proof__icon"><Icon aria-hidden="true" /></span>
            )}
            {cloudSources || identityRisk ? null : (
              <span className="cyber-hero-proof__copy">
                <span className="cyber-hero-proof__label">{label}</span>
                <strong className="cyber-hero-proof__value">{value}</strong>
                <span className="cyber-hero-proof__detail">{detail}</span>
              </span>
            )}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default function CyberHeroSection({ content, motionEnabled }) {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-84px)] items-center overflow-hidden bg-[radial-gradient(circle_at_82%_22%,rgba(38,216,173,.22),transparent_31%),linear-gradient(180deg,#f8fbfa_0%,#f3f8f6_78%,#e4f7f1_100%)] pt-16 pb-8 max-[1080px]:min-h-0 max-[1080px]:pt-32 max-[1080px]:pb-20 max-[760px]:pt-28 max-[760px]:pb-16" aria-labelledby="cyber-hero-title">
      <div className="shell grid grid-cols-[.86fr_1.14fr] items-center gap-12 max-[1080px]:grid-cols-1 max-[1080px]:gap-8">
        <div className="relative z-10 max-w-145">
          <p className="eyebrow">{content.eyebrow}</p>
          <h1 className="text-[clamp(2.75rem,3.5vw,3.25rem)]" id="cyber-hero-title">{content.title}</h1>
          <p className="lede mt-5 max-w-135">{content.description}</p>
          <div className="action-row mt-7 max-[460px]:grid">
            <TrialLink className="button button--mint button--directional"><ArrowRight aria-hidden="true" />Start Free Trial</TrialLink>
            <Link className="button button--ghost" to="/demo"><CalendarDays aria-hidden="true" />Request a Demo</Link>
          </div>
        </div>
        <figure
          className="pointer-events-none relative mx-auto my-0 w-full max-w-160 select-none max-[460px]:max-w-none"
          aria-label="Controllo connected assurance proof cluster"
          data-testid="assurance-horizon"
          data-motion={motionEnabled ? 'animated' : 'static'}
          data-state="resolved"
        >
          <ConnectedProductStage motionEnabled={motionEnabled} />
        </figure>
      </div>
    </section>
  );
}
