import { CalendarDays, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const CTA_EASE = [0.16, 1, 0.3, 1];
const HEAT_CELLS = [
  'bg-white/42',
  'bg-[#bfeee1]/70',
  'bg-[#f2d468]/58',
  'bg-white/36',
  'bg-[#e99a42]/48',
  'bg-white/46',
  'bg-[#bfeee1]/62',
  'bg-white/38',
  'bg-[#f2d468]/48',
  'bg-white/42',
  'bg-[#bfeee1]/68',
  'bg-white/35',
];

export default function RiskCtaSection({ content, motionEnabled }) {
  const motionProps = motionEnabled
    ? {
        initial: { opacity: 0, y: 26 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.68, ease: CTA_EASE },
      }
    : {};
  const cardMotion = (delay) => motionEnabled
    ? {
        initial: { opacity: 0, y: 20, scale: 0.94 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: true, amount: 0.4 },
        transition: { delay, duration: 0.62, ease: CTA_EASE },
      }
    : {};

  return (
    <section className="relative bg-white py-24 max-[760px]:py-16" aria-labelledby="risk-cta-title">
      <motion.div {...motionProps} className="shell">
        <div className="rounded-[38px] border border-navy/[.08] bg-mist p-1.5 shadow-[0_26px_70px_rgba(6,27,50,.09)] max-[560px]:rounded-[28px]">
          <div className="relative isolate grid min-h-[470px] grid-cols-[minmax(0,1fr)_minmax(360px,.72fr)] items-center gap-14 overflow-hidden rounded-[32px] bg-mint px-14 py-14 max-[1020px]:grid-cols-1 max-[1020px]:gap-5 max-[760px]:px-7 max-[760px]:py-9 max-[560px]:min-h-0 max-[560px]:rounded-[23px]">
            <span className="pointer-events-none absolute -top-28 -right-16 -z-1 h-96 w-96 rounded-full border border-teal/12" aria-hidden="true" />
            <span className="pointer-events-none absolute -right-40 -bottom-52 -z-1 h-[34rem] w-[34rem] rounded-full border border-teal/10" aria-hidden="true" />
            <img
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute right-[7%] bottom-[7%] -z-1 w-48 opacity-[.07] max-[560px]:hidden"
              src="/assets/emblemLogo.svg"
            />

            <div className="max-w-[680px]">
              <p className="eyebrow text-teal">{content.eyebrow}</p>
              <h2 id="risk-cta-title" className="max-w-[670px] text-[clamp(2.55rem,4.4vw,4.7rem)] leading-[.94] text-navy">
                {content.title}
              </h2>
              <p className="lede mt-6 max-w-[610px] text-navy/68">{content.description}</p>
              <div className="mt-8 flex flex-wrap gap-3 max-[560px]:grid">
                <Link className="button" to="/demo">
                  <CalendarDays aria-hidden="true" size={16} />
                  Request a demo
                </Link>
              </div>
            </div>

            <div className="relative min-h-[320px] max-[1020px]:mx-auto max-[1020px]:w-full max-[1020px]:max-w-[560px] max-[560px]:grid max-[560px]:min-h-0 max-[560px]:gap-3">
              <div className="pointer-events-none absolute inset-[12%] grid rotate-[-5deg] grid-cols-4 gap-2 opacity-70 max-[560px]:hidden" aria-hidden="true">
                {HEAT_CELLS.map((cell, index) => (
                  <span className={`rounded-[14px] ${cell}`} key={index} />
                ))}
              </div>

              <motion.div
                {...cardMotion(0.16)}
                className="absolute top-[7%] left-[2%] w-[245px] rotate-[-4deg] rounded-[22px] border border-navy/[.1] bg-white px-6 py-5 shadow-[0_20px_46px_rgba(6,27,50,.12)] max-[560px]:relative max-[560px]:top-auto max-[560px]:left-auto max-[560px]:w-full max-[560px]:rotate-0"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[.62rem] font-semibold uppercase tracking-[.13em] text-muted">Inherent exposure</p>
                  <span className="rounded-full bg-[#f7e4cf] px-3 py-1 text-[.7rem] font-semibold text-[#8a4c18]">High</span>
                </div>
                <strong className="mt-5 block text-[3.4rem] font-medium leading-none tracking-[-.07em] text-navy">80</strong>
              </motion.div>

              <motion.div
                {...cardMotion(0.28)}
                className="absolute right-[1%] bottom-[6%] w-[265px] rotate-[3deg] rounded-[24px] bg-navy px-6 py-5 text-white shadow-[0_24px_55px_rgba(6,27,50,.2)] max-[560px]:relative max-[560px]:right-auto max-[560px]:bottom-auto max-[560px]:w-full max-[560px]:rotate-0"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[.62rem] font-semibold uppercase tracking-[.13em] text-mint">Target exposure</p>
                  <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-mint text-navy" aria-hidden="true">
                    <TrendingDown size={17} strokeWidth={1.9} />
                  </span>
                </div>
                <div className="mt-5 flex items-end justify-between gap-5">
                  <strong className="text-[3.7rem] font-medium leading-none tracking-[-.07em] text-white">50</strong>
                  <span className="rounded-full bg-mint/16 px-3 py-1 text-[.7rem] font-semibold text-mint">Moderate</span>
                </div>
                <p className="mt-4 border-t border-white/12 pt-3 text-[.72rem] text-white/62">After treatment review</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
