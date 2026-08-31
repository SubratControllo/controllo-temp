import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { CalendarDays } from "lucide-react";
import ProductDemo from "./ProductDemo";

const accentStyles = {
  mint: "",
  shell: "bg-shell",
  teal: "page-hero--teal",
  navy: "bg-navy text-white",
};

export default function PageHero({
  eyebrow,
  title,
  description,
  accent = "mint",
  icon: Icon,
  motionEnabled = true,
  demo = true,
}) {
  const isNavy = accent === "navy";
  return (
    <section
      className={`page-hero page-hero--${accent} relative -mt-25 min-h-180 overflow-hidden bg-[#f7fbfa] pb-27.5 pt-52.5 max-[760px]:min-h-0 max-[760px]:pb-20.5 max-[760px]:pt-42.5 ${
        accentStyles[accent] ?? ""
      }`}
    >
      <div className="page-hero__wash" aria-hidden="true" />
      <div className="shell relative z-1 grid grid-cols-[1fr_.9fr] items-center gap-20 max-[1080px]:grid-cols-1 max-[760px]:gap-11.5">
        <motion.div
          className="page-hero__copy"
          initial={motionEnabled ? { opacity: 0, y: 24 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <nav
            className={`mb-10.5 flex gap-2.25 text-[.67rem] ${
              isNavy ? "text-[#9fb1c1]" : "text-muted"
            } [&_a:hover]:text-teal`}
            aria-label="Breadcrumb"
          >
            <Link to="/">Home</Link>
            <span>/</span>
            <span>{eyebrow}</span>
          </nav>
          {Icon && (
            <Icon
              className="mb-7 size-8.5 text-teal stroke-[1.5]"
              aria-hidden="true"
            />
          )}
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="text-[clamp(3rem,4.3vw,3.85rem)]">{title}</h1>
          <p className={`lede mt-6.5 ${isNavy ? "text-[#bbcad6]" : ""}`}>
            {description}
          </p>
          <div className="action-row">
            <Link className="button button--mint" to="/demo">
              <CalendarDays aria-hidden="true" /> See it in your program
            </Link>
            <Link
              className={`button button--ghost ${
                isNavy
                  ? "text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,.28)]"
                  : ""
              }`}
              to="/platform"
            >
              Explore the platform
            </Link>
          </div>
        </motion.div>
        {demo && (
          <motion.div
            className="max-w-175 perspective-[1000px] transform-[rotateY(-4deg)] max-[760px]:transform-none"
            initial={motionEnabled ? { opacity: 0, x: 30 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
          >
            <ProductDemo active={2} compact />
          </motion.div>
        )}
      </div>
    </section>
  );
}
