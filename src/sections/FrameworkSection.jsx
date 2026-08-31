import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import IntegrationLogo from "../components/IntegrationLogo";
import {
  frameworkShowcase,
  integrations,
} from "../data/enterpriseContent";

const proofMetrics = [
  ["100+", "Global and regional frameworks"],
  ["7,000+", "Structured compliance controls"],
  ["200,000+", "Control relationships"],
];

const integrationCoverage = [
  { categories: ["Cloud"], label: "Cloud systems" },
  { categories: ["Identity", "Endpoint"], label: "Identity and endpoint" },
  { categories: ["Workflow", "Evidence"], label: "Workflow and evidence" },
].map((group) => ({
  ...group,
  integrations: integrations.filter(({ category }) =>
    group.categories.includes(category),
  ),
}));

export default function FrameworkSection({ motionEnabled }) {
  return (
    <section
      aria-label="Frameworks and connectivity"
      className="section bg-white"
      id="frameworks"
    >
      <div className="shell">
        <Reveal className="max-w-205" motionEnabled={motionEnabled}>
          <p className="eyebrow">Frameworks and connectivity</p>
          <h2>More frameworks shouldn’t mean more work.</h2>
          <p className="lede mt-6 max-w-175">
            Related requirements stay connected so policies, evidence,
            implementation context, and risks can support more than one
            compliance objective.
          </p>
        </Reveal>

        <Reveal
          className="mt-14 grid grid-cols-[minmax(0,.78fr)_minmax(0,1.22fr)] overflow-hidden rounded-[30px] border border-line bg-field shadow-[0_24px_70px_rgba(6,27,50,.08)] max-[960px]:grid-cols-1 max-[760px]:mt-10 max-[760px]:rounded-[22px]"
          motionEnabled={motionEnabled}
          delay={0.05}
        >
          <div className="flex min-h-150 flex-col bg-navy p-10 text-white max-[960px]:min-h-0 max-[760px]:p-6">
            <div>
              <p className="font-mono text-[.58rem] font-medium tracking-[.11em] uppercase text-mint">
                Shared control model
              </p>
              <h3 className="mt-4 max-w-95 text-[2.1rem] leading-[1.12] tracking-[-.035em] text-white max-[760px]:text-[1.65rem]">
                Shared work. Distinct assurance paths.
              </h3>
              <p className="mt-5 max-w-100 text-[.78rem] leading-[1.75] text-[#b8c8d5]">
                Keep common controls reusable while every framework retains its
                own scope, ownership, and review context.
              </p>
            </div>

            <dl className="mt-auto pt-12 max-[960px]:mt-10 max-[960px]:pt-0">
              {proofMetrics.map(([value, label]) => (
                <div
                  className="flex items-end justify-between gap-6 border-t border-white/12 py-4.5 last:border-b"
                  key={value}
                >
                  <dd className="m-0 text-[1.55rem] leading-none font-medium tracking-[-.035em] text-white tabular-nums">
                    {value}
                  </dd>
                  <dt className="max-w-42 text-right text-[.64rem] leading-[1.45] text-[#9fb2c1]">
                    {label}
                  </dt>
                </div>
              ))}
            </dl>

            <Link
              className="mt-7 inline-flex min-h-11 items-center gap-2 self-start text-[.74rem] font-medium text-mint transition-colors hover:text-white [&>svg]:size-4 [&>svg]:transition-transform hover:[&>svg]:translate-x-1"
              to="/frameworks"
            >
              Explore frameworks <ArrowRight aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 bg-white p-10 max-[760px]:grid-cols-1 max-[760px]:gap-11 max-[760px]:p-6">
            <div>
              <p className="font-mono text-[.56rem] font-medium tracking-[.1em] uppercase text-teal">
                Framework coverage
              </p>
              <h3 className="mt-3 text-[1.3rem]">Selected assurance paths</h3>
              <p className="mt-3 mb-0 text-[.69rem] leading-[1.65] text-muted">
                Representative paths from the wider Controllo control library.
              </p>
              <ul
                aria-label="Selected framework coverage"
                className="mt-8 list-none border-b border-line pl-0"
              >
                {frameworkShowcase.map((group) => (
                  <li className="border-t border-line py-4.5" key={group.label}>
                    <strong className="block text-[.7rem] font-medium text-navy">
                      {group.label}
                    </strong>
                    <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
                      {group.frameworks.map((framework) => (
                        <span
                          className="flex min-w-0 items-center gap-2 text-[.62rem] leading-[1.45] text-muted"
                          data-framework-wordmark
                          key={framework}
                        >
                          <span
                            aria-hidden="true"
                            className="size-1 shrink-0 rounded-full bg-mint shadow-[0_0_0_3px_rgba(63,228,196,.1)]"
                          />
                          <span>{framework}</span>
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-l border-line pl-10 max-[760px]:border-t max-[760px]:border-l-0 max-[760px]:pt-10 max-[760px]:pl-0">
              <p className="font-mono text-[.56rem] font-medium tracking-[.1em] uppercase text-teal">
                Connected systems
              </p>
              <h3 className="mt-3 text-[1.3rem]">Operating context, brought in</h3>
              <p className="mt-3 mb-0 text-[.69rem] leading-[1.65] text-muted">
                Current integration surfaces for cloud, identity, endpoint,
                workflow, and evidence context.
              </p>
              <ul
                aria-label="Connected integration coverage"
                className="mt-8 list-none border-b border-line pl-0"
              >
                {integrationCoverage.map((group) => (
                  <li className="border-t border-line py-5" key={group.label}>
                    <strong className="block text-[.7rem] font-medium text-navy">
                      {group.label}
                    </strong>
                    <div className="mt-2.5 flex flex-wrap gap-x-6 gap-y-2">
                      {group.integrations.map(({ name, icon: Icon, brand }) => (
                        <span
                          className="inline-flex items-center gap-3 text-[.64rem] leading-[1.5] text-muted"
                          key={name}
                        >
                          <IntegrationLogo brand={brand} fallback={Icon} size="inline" />
                          <span className={brand?.format === "wordmark" ? "sr-only" : undefined}>
                            {name}
                          </span>
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                className="mt-7 inline-flex min-h-11 items-center gap-2 text-[.74rem] font-medium text-teal transition-colors hover:text-navy [&>svg]:size-4 [&>svg]:transition-transform hover:[&>svg]:translate-x-1"
                to="/integrations"
              >
                View integrations <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
