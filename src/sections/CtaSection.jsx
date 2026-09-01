import Reveal from "../components/Reveal";
import BrandCtaContent from "../components/BrandCtaContent";
import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import { motion } from "motion/react";
import { homepageLinks } from "../data/siteContent";

const emblemSegments = [
  {
    d: "M152.438 163.418L113.869 67.461H0L38.5686 163.418L0 259.376H113.869L152.438 163.418Z",
    fill: "#6F8190",
    initial: { opacity: 0, x: -42, y: 5, rotate: -4 },
    className: "cta-emblem-field__segment--one",
    delay: 0.16
  },
  {
    d: "M228.351 232.043L189.782 136.085H75.9129L114.481 232.043L75.9129 328H189.782L228.351 232.043Z",
    fill: "#10AFA4",
    initial: { opacity: 0, x: 2, y: 42, rotate: 3 },
    className: "cta-emblem-field__segment--two",
    delay: 0.26
  },
  {
    d: "M281 95.9574L242.431 0H128.562L167.131 95.9574L128.562 191.915H242.431L281 95.9574Z",
    fill: "#32D6BA",
    initial: { opacity: 0, x: 36, y: -38, rotate: 4 },
    className: "cta-emblem-field__segment--three",
    delay: 0.36
  }
];

function CtaEmblem({ motionEnabled }) {
  return (
    <motion.svg
      aria-hidden="true"
      className="cta-emblem-field__svg"
      focusable="false"
      viewBox="-18 -18 317 364"
      viewport={{ once: true, amount: 0.55 }}
    >
      {emblemSegments.map((segment) => (
        <motion.g
          initial={motionEnabled ? segment.initial : false}
          key={segment.fill}
          transition={{ duration: 0.62, delay: segment.delay, ease: [0.16, 1, 0.3, 1] }}
          whileInView={motionEnabled ? { opacity: 1, x: 0, y: 0, rotate: 0 } : undefined}
        >
          <path
            className={`cta-emblem-field__segment ${segment.className}`}
            d={segment.d}
            fill={segment.fill}
          />
        </motion.g>
      ))}
    </motion.svg>
  );
}

export default function CtaSection({ motionEnabled }) {
  return (
    <section
      aria-labelledby="cta-heading"
      className="bg-navy pt-30 pb-11 text-white max-[760px]:pt-20 max-[760px]:pb-7"
      id="contact"
    >
      <div className="shell">
        <Reveal
          className="cta-panel grid grid-cols-[minmax(0,1.2fr)_minmax(17rem,.8fr)] overflow-hidden rounded-[40px] bg-mint text-navy max-[900px]:grid-cols-1 max-[760px]:rounded-[28px]"
          motionEnabled={motionEnabled}
        >
          <div className="relative z-1 px-18 py-20 max-[1080px]:px-12 max-[900px]:py-16 max-[760px]:px-6.5 max-[760px]:py-14.5">
            <p className="eyebrow max-[480px]:text-[.7rem] max-[480px]:tracking-[.1em]">
              Start with the work in front of you
            </p>
            <h2 className="mb-5.5 max-w-160 text-pretty" id="cta-heading">
              A clearer compliance program starts here.
            </h2>
            <p className="mb-7.5 max-w-150 text-base leading-[1.7] text-[#174a54]">
              Start with the frameworks relevant to your business, then
              connect controls, evidence, risks, and ownership as your
              assurance program grows.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                className="button button--directional group/brand-cta relative isolate overflow-hidden border border-white/25 transition-transform duration-300 hover:scale-[1.015] hover:bg-navy focus-visible:scale-[1.015] motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:focus-visible:translate-y-0 motion-reduce:focus-visible:scale-100 max-[480px]:w-full"
                to={homepageLinks.trial}
              >
                <BrandCtaContent
                  iconTestId="final-primary-cta-icon"
                  motionEnabled={motionEnabled}
                  shineTestId="final-primary-cta-shine"
                >
                  Start free trial
                </BrandCtaContent>
              </Link>
              <Link
                className="button button--light shadow-none transition-[background-color,color,box-shadow] duration-200 hover:translate-y-0 hover:bg-white hover:text-teal focus-visible:bg-white focus-visible:text-teal motion-reduce:hover:translate-y-0 max-[480px]:w-full"
                to={homepageLinks.demo}
              >
                <CalendarDays aria-hidden="true" /> Request a demo
              </Link>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="cta-emblem-field relative min-h-[26rem] overflow-hidden border-l border-white/12 bg-navy max-[900px]:min-h-48 max-[900px]:border-t max-[900px]:border-l-0"
            data-motion={motionEnabled ? "interactive" : "static"}
          >
            <CtaEmblem motionEnabled={motionEnabled} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
