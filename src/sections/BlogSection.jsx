import { ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import { blogArticles, homepageLinks } from '../data/siteContent';

function ArticleLink({ article, headingId, featured = false, position }) {
  return (
    <article aria-labelledby={headingId}>
      <a
        className={`group flex flex-col justify-between transition-colors duration-200 hover:bg-panel-hover focus-visible:bg-panel-hover ${featured ? 'min-h-[27rem] border-r border-line px-10 py-11 max-[960px]:min-h-0 max-[960px]:border-r-0 max-[960px]:border-b max-[760px]:px-0 max-[760px]:py-9' : 'min-h-[13.5rem] px-9 py-8 max-[760px]:min-h-0 max-[760px]:px-0 max-[760px]:py-8'}`}
        href={article.href}
      >
        <span>
          <span className="flex items-center justify-between gap-6">
            <span className="font-mono text-[.66rem] font-medium tracking-[.12em] uppercase text-teal">
              {article.category}
            </span>
            <span className="font-mono text-[.62rem] tracking-[.12em] text-muted" aria-hidden="true">
              {featured ? 'Featured analysis' : position}
            </span>
          </span>
          <h3
            className={`text-pretty transition-colors duration-200 group-hover:text-teal group-focus-visible:text-teal ${featured ? 'mt-14 max-w-155 text-[clamp(2rem,3.7vw,3.05rem)] max-[760px]:mt-9' : 'mt-7 max-w-115 text-[1.35rem]'}`}
            id={headingId}
          >
            {article.title}
          </h3>
          <p className={`mb-0 max-w-135 text-pretty leading-[1.75] text-muted ${featured ? 'mt-6 text-[.9rem]' : 'mt-3.5 text-[.76rem]'}`}>
            {article.summary}
          </p>
        </span>
        <span className="mt-7 inline-flex min-h-11 items-center gap-2 text-[.74rem] font-medium text-teal group-hover:text-navy group-focus-visible:text-navy [&>svg]:size-3.5 [&>svg]:transition-transform [&>svg]:duration-200 group-hover:[&>svg]:translate-x-1 group-focus-visible:[&>svg]:translate-x-1">
          Read article<span className="sr-only">: {article.title}</span>
          <ArrowRight aria-hidden="true" />
        </span>
      </a>
    </article>
  );
}

export default function BlogSection({ motionEnabled }) {
  const [featured, ...supporting] = blogArticles;

  return (
    <section className="section bg-mist" aria-labelledby="blog-heading">
      <div className="shell">
        <Reveal
          className="mb-14 flex items-end justify-between gap-14 max-[760px]:mb-10 max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-7"
          motionEnabled={motionEnabled}
        >
          <div className="max-w-195">
            <p className="eyebrow">From the Controllo blog</p>
            <h2 id="blog-heading">Practical guidance for compliance work that keeps changing.</h2>
            <p className="lede mt-6 max-w-175 text-pretty">
              Explore current thinking on cybersecurity, privacy, AI governance, and continuous audit readiness.
            </p>
          </div>
          <a
            className="group inline-flex min-h-11 shrink-0 items-center gap-2 text-[.76rem] font-medium text-teal transition-colors duration-200 hover:text-navy [&>svg]:size-4 [&>svg]:transition-transform [&>svg]:duration-200 group-hover:[&>svg]:translate-x-1 group-focus-visible:[&>svg]:translate-x-1"
            href={homepageLinks.blog}
          >
            Explore all articles <ArrowRight aria-hidden="true" />
          </a>
        </Reveal>

        <Reveal
          className="grid grid-cols-[1.12fr_.88fr] border-y border-line max-[960px]:grid-cols-1"
          motionEnabled={motionEnabled}
          delay={0.06}
        >
          <ArticleLink article={featured} featured headingId="blog-featured-heading" position="01" />
          <div className="divide-y divide-line">
            {supporting.map((article, index) => (
              <ArticleLink
                article={article}
                headingId={`blog-supporting-${index + 1}-heading`}
                key={article.href}
                position={`0${index + 2}`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
