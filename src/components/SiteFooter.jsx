import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { footerGroups } from "../data/enterpriseContent";

export default function SiteFooter() {
  return (
    <footer className="bg-navy pt-21 text-white" role="contentinfo">
      <div className="shell grid grid-cols-[1.35fr_repeat(3,.65fr)] gap-12.5 pb-15 text-footer-text max-[1080px]:grid-cols-[1.2fr_repeat(3,.65fr)] max-[760px]:grid-cols-2 max-[420px]:grid-cols-1">
        <div className="max-[760px]:col-span-full max-[420px]:col-auto">
          <Link
            className="inline-flex min-h-11 items-center gap-2.75 text-[1.2rem] font-medium text-white tracking-[-.03em] max-[760px]:text-[1.05rem]"
            to="/"
            aria-label="Controllo home"
          >
            <BrandLogo variant="light" />
          </Link>
          <p className="mt-4.5 mb-0 max-w-80 text-[.7rem]">
            Continuous compliance infrastructure for teams building lasting
            trust.
          </p>
          <Link
            className="mt-6.5 inline-flex items-center gap-2 text-[.76rem] text-mint [&>svg]:size-3.75 [&>svg]:transition-transform hover:[&>svg]:translate-x-0.5"
            to="/demo"
          >
            Book a readiness tour <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        {footerGroups.map(([heading, links]) => (
          <div key={heading}>
            <strong className="mb-4 block text-[.72rem] text-white">
              {heading}
            </strong>
            {links.map(([label, href]) => (
              <Link
                className="block min-h-9 text-[.7rem] transition-colors hover:text-mint"
                to={href}
                key={href}
              >
                {label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="shell flex justify-between gap-6 border-t border-white/12 py-6 font-mono text-[.58rem] leading-normal text-footer-dim max-[760px]:flex-col">
        <span>© 2026 Controllo GRC</span>
        <span>Enterprise compliance, kept current.</span>
      </div>
    </footer>
  );
}
