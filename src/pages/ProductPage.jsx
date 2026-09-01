import { useLocation } from 'react-router-dom';
import PageHero from '../components/PageHero';
import PageMeta from '../components/PageMeta';
import ConversionBand from '../components/ConversionBand';
import Reveal from '../components/Reveal';
import ProductDemo from '../components/ProductDemo';
import { productPages } from '../data/enterpriseContent';
import { useSiteMotion } from '../context/MotionContext';

export default function ProductPage() {
  const { pathname } = useLocation();
  const page = productPages[pathname] || productPages['/platform'];
  const { motionEnabled } = useSiteMotion();

  return (
    <>
      <PageMeta title={page.title} description={page.description} />
      <PageHero {...page} motionEnabled={motionEnabled} />
      <section className="section bg-white">
        <div className="shell">
          <div className="section-heading section-heading--split">
            <div>
              <p className="eyebrow">Designed around the work</p>
              <h2>Clarity at every handoff.</h2>
            </div>
            <p className="lede">
              Every view keeps the control, its context, and the next accountable action together.
            </p>
          </div>
          <div className="grid grid-cols-3 border-t border-line max-[760px]:grid-cols-1">
            {page.features.map(([title, detail], index) => (
              <Reveal
                key={title}
                motionEnabled={motionEnabled}
                delay={index * 0.08}
                className="min-h-[330px] border-r border-line py-9 pr-9 last:border-r-0 not-first:pl-9 max-[760px]:min-h-[240px] max-[760px]:border-r-0 max-[760px]:border-b max-[760px]:px-0 max-[760px]:py-7"
              >
                <span className="font-mono text-[.64rem] font-medium leading-none text-teal">
                  0{index + 1}
                </span>
                <h3 className="mt-[110px] max-[760px]:mt-[60px]">{title}</h3>
                <p className="text-[.83rem] leading-[1.75] text-muted">{detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-mint-soft">
        <div className="shell grid grid-cols-[.8fr_1.2fr] items-center gap-[90px] max-[1080px]:grid-cols-1 max-[760px]:gap-[46px]">
          <div>
            <p className="eyebrow">A living workspace</p>
            <h2 className="mb-6">Watch the program change state.</h2>
            <p className="lede">
              Signals enter with their source and scope. Controllo turns them into visible readiness, risk, and accountable work.
            </p>
          </div>
          <ProductDemo active={3} />
        </div>
      </section>
      <ConversionBand />
    </>
  );
}
