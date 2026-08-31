import PageHero from '../components/PageHero';
import PageMeta from '../components/PageMeta';
import ConversionBand from '../components/ConversionBand';
import { staticPages, staticPagesWithoutConversion } from '../data/staticPages';
import { useSiteMotion } from '../context/MotionContext';

export default function StaticPage({ path }) {
  const page = staticPages[path];
  const { motionEnabled } = useSiteMotion();

  return (
    <>
      <PageMeta title={page.title} description={page.description} />
      <PageHero {...page} motionEnabled={motionEnabled} demo={false} />
      <section className="section bg-white">
        <div className="shell max-w-[980px]">
          {page.sections.map(([title, copy], index) => (
            <article
              className="grid grid-cols-[100px_1fr] gap-[30px] border-b border-line py-[50px] max-[760px]:grid-cols-[50px_1fr]"
              key={title}
            >
              <span className="font-mono text-[.62rem] font-medium leading-none text-teal">
                0{index + 1}
              </span>
              <div>
                <h2 className="text-[2rem]">{title}</h2>
                <p className="leading-[1.8] text-muted">{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      {staticPagesWithoutConversion.has(path) ? null : <ConversionBand />}
    </>
  );
}
