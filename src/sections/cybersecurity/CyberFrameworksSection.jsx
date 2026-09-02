import { ArrowRight, FileCheck2, Layers3, Network, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const sharedControls = [
  ['Access governance', ShieldCheck],
  ['Asset inventory', Layers3],
  ['Incident response', FileCheck2],
];

export default function CyberFrameworksSection({ frameworks, motionEnabled }) {
  const canReveal = motionEnabled && typeof IntersectionObserver !== 'undefined';

  return (
    <section
      className="section overflow-hidden bg-white"
      aria-labelledby="cyber-frameworks-title"
    >
      <div className="shell grid grid-cols-[.72fr_1.28fr] items-center gap-18 max-[1080px]:grid-cols-1">
        <div className="max-w-145">
          <p className="eyebrow">Framework coverage</p>
          <h2 id="cyber-frameworks-title">Start with one framework. Expand when you need to.</h2>
          <p className="lede mt-6">
            Activate the cyber and cloud requirements relevant today, then extend mapped controls
            and linked evidence as customer, regulatory, and market expectations evolve.
          </p>
          <p className="mt-8 font-mono text-[.68rem] text-muted">
            100+ global and regional frameworks
          </p>
          <Link
            className="group mt-8 inline-flex min-h-11.5 items-center gap-2 text-[.8rem] font-medium text-teal transition-colors duration-200 hover:text-navy focus-visible:text-navy"
            to="/frameworks"
          >
            Explore All Frameworks
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <div className="relative min-h-155 overflow-hidden rounded-[28px] border border-line bg-mist p-6 max-[760px]:grid max-[760px]:min-h-0 max-[760px]:gap-4 max-[520px]:p-4">
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(6,27,50,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(6,27,50,.045)_1px,transparent_1px)] bg-[size:42px_42px]"
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute top-1/2 right-10 left-10 h-px bg-teal/18 max-[760px]:hidden"
            aria-hidden="true"
          />

          <div className="absolute top-1/2 left-1/2 z-10 w-63 -translate-x-1/2 -translate-y-1/2 rounded-[22px] border border-navy/12 bg-navy p-5 text-white shadow-elevated max-[760px]:relative max-[760px]:top-auto max-[760px]:left-auto max-[760px]:order-1 max-[760px]:w-full max-[760px]:translate-0">
            <Network className="size-5 text-mint" aria-hidden="true" />
            <p className="mt-10 font-mono text-[.62rem] uppercase text-mint">
              Shared control workspace
            </p>
            <ul className="mt-5 list-none border-t border-white/14 pl-0">
              {sharedControls.map(([label, Icon]) => (
                <li
                  className="flex min-h-13 items-center gap-3 border-b border-white/14 text-[.72rem]"
                  key={label}
                >
                  <Icon className="size-3.5 text-mint" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
            <p className="mt-5 mb-0 text-[.68rem] leading-[1.6] text-[#b8c8d5]">
              Reuse approved work while each framework keeps visible scope and accountability.
            </p>
          </div>

          <ul
            className="relative grid min-h-143 grid-cols-4 content-between gap-x-3 gap-y-56 list-none pl-0 max-[760px]:order-2 max-[760px]:min-h-0 max-[760px]:grid-cols-1 max-[760px]:content-normal max-[760px]:gap-3"
            aria-label="Featured cyber and cloud frameworks"
          >
            {frameworks.map((framework, index) => (
              <motion.li
                className="min-h-30 rounded-[18px] border border-line bg-white p-4"
                data-motion={canReveal ? 'animated' : 'static'}
                initial={canReveal ? { opacity: 0, y: 10 } : false}
                animate={canReveal ? undefined : { opacity: 1, y: 0 }}
                whileInView={canReveal ? { opacity: 1, y: 0 } : undefined}
                viewport={canReveal ? { once: true, amount: 0.3 } : undefined}
                transition={{ duration: 0.34, delay: Math.min(index * 0.04, 0.24) }}
                key={framework.name}
              >
                <span className="font-mono text-[.56rem] uppercase text-teal">
                  {framework.category}
                </span>
                <strong className="mt-5 block text-[.76rem]">{framework.name}</strong>
                <small className="mt-2 block leading-[1.45] text-muted">
                  {framework.description}
                </small>
                {framework.href ? (
                  <Link
                    className="mt-4 inline-flex min-h-11.5 items-center rounded-[10px] px-2 text-[.68rem] text-teal transition-[background-color,color] duration-200 hover:bg-mint-soft hover:text-navy focus-visible:bg-mint-soft focus-visible:text-navy"
                    to={framework.href}
                  >
                    Explore {framework.name}
                  </Link>
                ) : null}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
