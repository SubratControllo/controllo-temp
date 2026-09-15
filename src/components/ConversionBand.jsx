import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from './Reveal';

export default function ConversionBand({
  title = "See where your program can move next.",
  copy = "Bring one real compliance workflow. We’ll map the friction, dependencies, and readiness path with you.",
  tone = 'teal',
  actionLabel = 'Get a readiness tour',
  motionEnabled = false,
}) {
  return (
    <section className={`${tone === 'navy' ? 'bg-navy' : 'bg-teal'} py-25 text-white`}>
      <Reveal motionEnabled={motionEnabled} duration={0.42} className="shell flex items-center justify-between gap-12.5 max-[760px]:flex-col max-[760px]:items-start">
        <div>
          <h2 className="text-[clamp(2.2rem,4vw,3.4rem)]">{title}</h2>
          <p className="mt-4.5 mb-0 max-w-150 leading-[1.7] text-conversion-copy">
            {copy}
          </p>
        </div>
        <Link className="button button--light button--directional" to="/demo">
          {actionLabel} <ArrowRight aria-hidden="true" />
        </Link>
      </Reveal>
    </section>
  );
}
