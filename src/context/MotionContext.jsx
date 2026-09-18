import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'motion/react';

const MotionContext = createContext(null);

export function MotionProvider({ children }) {
  const prefersReducedMotion = useReducedMotion();
  const [hydrated, setHydrated] = useState(
    () => typeof document !== 'undefined' && !document.getElementById('root')?.hasChildNodes(),
  );
  useEffect(() => setHydrated(true), []);
  const motionEnabled = hydrated && !prefersReducedMotion;
  const value = useMemo(() => ({ motionEnabled }), [motionEnabled]);
  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

export function useSiteMotion() {
  const context = useContext(MotionContext);
  if (!context) throw new Error('useSiteMotion must be used within MotionProvider');
  return context;
}
