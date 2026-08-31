import { Link, useParams } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import ConversionBand from '../components/ConversionBand';
import { getResourceBySlug } from '../data/enterpriseContent';
import NotFoundPage from './NotFoundPage';

export default function ResourceDetailPage() {
  const { slug } = useParams();
  const item = getResourceBySlug(slug);

  if (!item) return <NotFoundPage />;

  return (
    <>
      <PageMeta title={item.title} description={item.summary} />
      <article>
        <header className="bg-shell pt-[210px] pb-[100px] max-[760px]:pt-[170px] max-[760px]:pb-20">
          <div className="shell max-w-[1000px]">
            <nav className="mb-[42px] flex gap-[9px] text-[.67rem] text-muted [&_a:hover]:text-teal">
              <Link to="/resources">Resources</Link>
              <span>/</span>
              <span>{item.type}</span>
            </nav>
            <p className="eyebrow">{item.type} · {item.read}</p>
            <h1 className="max-w-[950px]">{item.title}</h1>
            <p className="lede mt-[26px]">{item.summary}</p>
          </div>
        </header>
        <div className="shell max-w-[820px] pt-[100px] pb-[120px] max-[760px]:pt-[70px] [&>p]:text-[1.05rem] [&>p]:leading-[1.9] [&>p]:text-[#344b5f] [&>h2]:mt-[70px] [&>h2]:mb-5 [&>h2]:text-[2rem]">
          <p className="text-[1.35rem]! text-navy!">
            A continuous program is less about adding automation everywhere and more about preserving context as work moves between systems and people.
          </p>
          <h2>Start with the operating signal</h2>
          <p>
            Identify the evidence, decisions, owners, and dependencies that determine whether a control is actually ready. Keep those elements connected instead of treating the final document as the work itself.
          </p>
          <blockquote className="my-[60px] border-l-[5px] border-mint bg-[#eaf8f4] p-[34px] text-[1.35rem] leading-[1.55]">
            Readiness becomes useful when the team can see what changed, why it matters, and who can move it forward.
          </blockquote>
          <h2>Design for reuse without losing accountability</h2>
          <p>
            Shared controls reduce repeated effort, but each framework still needs clear scope and ownership. A strong operating model makes reuse visible and reviewable.
          </p>
          <h2>Make the next action obvious</h2>
          <p>
            Dashboards inform. Programs move when the next accountable action arrives with enough context to make a decision.
          </p>
        </div>
      </article>
      <ConversionBand />
    </>
  );
}
