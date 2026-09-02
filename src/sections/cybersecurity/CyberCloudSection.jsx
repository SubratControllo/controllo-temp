import { useRef, useState } from 'react';
import { Activity, Boxes, Cloud, MonitorCheck, ShieldAlert, UsersRound } from 'lucide-react';
import { motion } from 'motion/react';

const panelIcons = [Cloud, UsersRound, ShieldAlert];
const metricIcons = [Boxes, MonitorCheck, Activity];

function Metric({ label, value, index }) {
  const Icon = metricIcons[index] ?? Activity;

  return (
    <div className="min-w-0 rounded-[18px] border border-line p-4">
      <Icon className="size-4 text-teal" aria-hidden="true" />
      <span className="mt-7 block text-[.65rem] text-muted">{label}</span>
      <strong className="mt-1 block text-[.78rem]">{value}</strong>
    </div>
  );
}

function CloudAssetsView({ view }) {
  return (
    <>
      <div className="grid grid-cols-3 gap-3 max-[520px]:grid-cols-1">
        {view.metrics.map(([label, value], index) => <Metric label={label} value={value} index={index} key={label} />)}
      </div>
      <OperationalRows rows={view.rows} />
    </>
  );
}

function IdentitiesAndDevicesView({ view }) {
  return (
    <div className="grid grid-cols-[.84fr_1.16fr] gap-5 max-[620px]:grid-cols-1">
      <div className="grid gap-3">
        {view.metrics.map(([label, value], index) => <Metric label={label} value={value} index={index} key={label} />)}
      </div>
      <OperationalRows rows={view.rows} className="mt-0" />
    </div>
  );
}

function AlertsAndExposureView({ view }) {
  return (
    <>
      <dl className="grid grid-cols-3 divide-x divide-line border-y border-line max-[520px]:grid-cols-1 max-[520px]:divide-x-0 max-[520px]:divide-y">
        {view.metrics.map(([label, value], index) => {
          const Icon = metricIcons[index] ?? Activity;
          return (
            <div className="min-h-28 p-4" key={label}>
              <Icon className="size-4 text-teal" aria-hidden="true" />
              <dt className="mt-7 text-[.65rem] text-muted">{label}</dt>
              <dd className="mt-1 text-[.78rem] font-semibold">{value}</dd>
            </div>
          );
        })}
      </dl>
      <OperationalRows rows={view.rows} />
    </>
  );
}

function OperationalRows({ rows, className = 'mt-6' }) {
  return (
    <ul className={`${className} list-none border-t border-line pl-0`}>
      {rows.map(([label, state]) => (
        <li className="grid min-h-15 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-line text-[.76rem]" key={label}>
          <span>{label}</span>
          <strong className="font-medium text-teal">{state}</strong>
        </li>
      ))}
    </ul>
  );
}

function ActiveView({ view, activeIndex }) {
  if (activeIndex === 1) return <IdentitiesAndDevicesView view={view} />;
  if (activeIndex === 2) return <AlertsAndExposureView view={view} />;
  return <CloudAssetsView view={view} />;
}

export default function CyberCloudSection({ views, motionEnabled }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);
  const active = views[activeIndex];
  const ActiveIcon = panelIcons[activeIndex] ?? Cloud;

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

  return (
    <section className="section bg-mist" aria-labelledby="cyber-cloud-title">
      <div className="shell">
        <header className="mx-auto mb-14 max-w-200 text-center">
          <p className="eyebrow">Cloud and workforce monitoring</p>
          <h2 id="cyber-cloud-title">See what is connected and where attention is needed.</h2>
          <p className="lede mx-auto mt-6">Bring supported cloud resources, workforce identities and devices, access activity, and security alerts into regularly refreshed operational views.</p>
        </header>

        <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-elevated">
          <div className="flex gap-2 overflow-x-auto border-b border-line bg-[#f8fbfa] p-3" role="tablist" aria-label="Operational visibility views">
            {views.map((view, index) => {
              const Icon = panelIcons[index] ?? Cloud;
              const isActive = activeIndex === index;

              return (
                <button
                  ref={(node) => { tabRefs.current[index] = node; }}
                  className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-[13px] border-0 bg-transparent px-4 text-[.78rem] text-muted transition-[background-color,color,box-shadow] duration-200 hover:bg-panel-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy aria-selected:bg-navy aria-selected:text-white aria-selected:shadow-button"
                  id={`cyber-cloud-tab-${view.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`cyber-cloud-panel-${view.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => activate(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  key={view.id}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {view.label}
                </button>
              );
            })}
          </div>

          <motion.div
            className="grid min-h-125 grid-cols-[minmax(0,.78fr)_minmax(0,1.22fr)] max-[760px]:min-h-0 max-[760px]:grid-cols-1"
            id={`cyber-cloud-panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`cyber-cloud-tab-${active.id}`}
            key={active.id}
            initial={motionEnabled ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24 }}
          >
            <div className="flex flex-col justify-between border-r border-line bg-navy p-8 text-white max-[760px]:border-r-0 max-[760px]:border-b max-[520px]:p-5">
              <div>
                <ActiveIcon className="size-6 text-mint" aria-hidden="true" />
                <p className="mt-16 font-mono text-[.61rem] uppercase tracking-[.12em] text-mint">{active.label}</p>
                <h3 className="mt-3 text-white">{active.summary}</h3>
              </div>
              <span className="mt-10 text-[.65rem] text-[#b8c8d5]">Illustrative product view</span>
            </div>
            <div className="min-w-0 p-8 max-[520px]:p-5">
              <ActiveView view={active} activeIndex={activeIndex} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
