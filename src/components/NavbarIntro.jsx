import { createContext, forwardRef, useContext, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useSiteMotion } from '../context/MotionContext';

const INTRO_DURATION = 950;
const introEase = [0.16, 1, 0.3, 1];
const NavbarIntroContext = createContext({ motionEnabled: false, active: false });

const surfaceVariants = {
  hidden: { opacity: 0, y: -8, filter: 'blur(7px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: introEase }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: -4 },
  visible: (delay = 0.28) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.34, ease: introEase }
  })
};

export default function NavbarIntro({ children, className = '' }) {
  const { motionEnabled } = useSiteMotion();
  const [complete, setComplete] = useState(!motionEnabled);
  const active = motionEnabled && !complete;

  useEffect(() => {
    if (!motionEnabled) {
      setComplete(true);
      return undefined;
    }

    setComplete(false);
    const completionTimer = window.setTimeout(() => setComplete(true), INTRO_DURATION);
    return () => window.clearTimeout(completionTimer);
  }, [motionEnabled]);

  return (
    <NavbarIntroContext.Provider value={{ motionEnabled, active }}>
      <motion.div
        className={className}
        data-intro-phase={active ? 'active' : 'complete'}
        data-testid="navbar-intro"
        initial={motionEnabled ? 'hidden' : false}
        animate="visible"
        variants={surfaceVariants}
      >
        {children}
      </motion.div>
    </NavbarIntroContext.Provider>
  );
}

export function NavbarIntroLogo({ children }) {
  const { motionEnabled, active } = useContext(NavbarIntroContext);

  return (
    <span className="relative block">
      <motion.span
        className="block"
        initial={motionEnabled ? { clipPath: 'inset(0 0 0 16%)', opacity: 0.72 } : false}
        animate={{ clipPath: 'inset(0 0 0 0%)', opacity: 1 }}
        transition={{ delay: 0.13, duration: 0.44, ease: introEase }}
      >
        {children}
      </motion.span>

      {active && (
        <motion.img
          className="pointer-events-none absolute top-1/2 left-0 h-8 w-7 -translate-y-1/2 object-contain max-[760px]:h-[30px] max-[760px]:w-[26px]"
          data-testid="navbar-intro-emblem"
          src="/assets/emblemLogo.svg"
          alt=""
          aria-hidden="true"
          initial={{ opacity: 0, x: -7, rotate: -5, scale: 0.86 }}
          animate={{ opacity: [0, 1, 1, 0], x: [-7, 0, 0, 0], rotate: [-5, 0, 0, 0], scale: [0.86, 1, 1, 1] }}
          transition={{ delay: 0.06, duration: 0.78, times: [0, 0.32, 0.78, 1], ease: introEase }}
          draggable="false"
        />
      )}
    </span>
  );
}

export const NavbarIntroItem = forwardRef(function NavbarIntroItem(
  { children, className = '', delay = 0.28, ...props },
  ref
) {
  const { motionEnabled } = useContext(NavbarIntroContext);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={motionEnabled ? 'hidden' : false}
      animate="visible"
      custom={delay}
      variants={itemVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
});

export const NavbarIntroNav = forwardRef(function NavbarIntroNav(
  { children, className = '', ...props },
  ref
) {
  return (
    <motion.nav ref={ref} className={className} {...props}>
      {children}
    </motion.nav>
  );
});

export function NavbarIntroHighlight() {
  const { active } = useContext(NavbarIntroContext);

  if (!active) return null;

  return (
    <motion.span
      className="pointer-events-none absolute inset-0 rounded-[inherit] border border-mint"
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: [0, 0.9, 0], scale: [0.97, 1.015, 1] }}
      transition={{ delay: 0.58, duration: 0.3, times: [0, 0.48, 1], ease: introEase }}
    />
  );
}
