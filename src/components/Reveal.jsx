import { motion } from 'motion/react';

export default function Reveal({ children, className = '', delay = 0, motionEnabled = true }) {
  return (
    <motion.div
      className={className}
      initial={motionEnabled ? { opacity: 0, y: 28 } : false}
      whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
