import { Outlet, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import ScrollToTop from "./ScrollToTop";
import CookiePreferences from "./CookiePreferences";
import { useSiteMotion } from "../context/MotionContext";

export default function SiteLayout() {
  const { pathname } = useLocation();
  const { motionEnabled } = useSiteMotion();
  return (
    <div
      className="site w-full overflow-clip bg-mist text-navy"
      data-testid="site-root"
      data-motion={motionEnabled ? "playing" : "paused"}
    >
      <ScrollToTop />
      <a
        className="absolute -top-20 left-5 z-100 rounded-xl bg-navy px-4 py-3 text-white focus:top-3"
        href="#main-content"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">
        <motion.div
          key={pathname}
          initial={motionEnabled ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
        >
          <Outlet />
        </motion.div>
      </main>
      <SiteFooter />
      <CookiePreferences />
    </div>
  );
}
