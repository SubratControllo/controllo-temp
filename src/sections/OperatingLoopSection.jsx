import Reveal from "../components/Reveal";
import { operatingSteps } from "../data/siteContent";

export default function OperatingLoopSection({ motionEnabled }) {
  return (
    <section className="section bg-mist">
      <div className="shell">
        <Reveal
          className="section-heading section-heading--split"
          motionEnabled={motionEnabled}
        >
          <div>
            <p className="eyebrow">One connected operating loop</p>
            <h2>Trust work moves forward, not sideways.</h2>
          </div>
          <p className="lede">
            Each step strengthens the next. No orphan evidence, duplicate
            mapping, or mystery handoffs.
          </p>
        </Reveal>
        <div className="loop-track relative grid grid-cols-5 gap-4.5 max-[1080px]:grid-cols-3 max-[1080px]:gap-y-10 max-[760px]:grid-cols-1 max-[760px]:gap-6.5">
          {operatingSteps.map(([title, description], index) => (
            <Reveal
              className="relative z-1 pt-26.5 max-[1080px]:pt-0 max-[760px]:grid max-[760px]:grid-cols-[74px_1fr] max-[760px]:gap-x-4.5"
              delay={index * 0.06}
              motionEnabled={motionEnabled}
              key={title}
            >
              <span className="loop-step__number absolute top-0 left-0 grid size-23 place-items-center rounded-full border-[9px] border-mist bg-white font-mono text-[.76rem] font-medium leading-none text-teal shadow-[0_16px_45px_rgba(6,27,50,.11)] max-[1080px]:static max-[760px]:row-span-2 max-[760px]:size-18.5">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3.5 mb-2.5 max-[760px]:self-end">{title}</h3>
              <p className="m-0 text-[.78rem] leading-[1.65] text-muted">
                {description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
