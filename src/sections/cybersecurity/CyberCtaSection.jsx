import { useEffect, useRef } from 'react';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import TrialLink from '../../components/TrialLink';

const CTA_VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4';

const contentVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.08, staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, transform: 'translateY(18px)' },
  visible: {
    opacity: 1,
    transform: 'translateY(0px)',
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function CyberCtaSection({ content, motionEnabled }) {
  const videoRef = useRef(null);
  const canAnimate = Boolean(motionEnabled);
  const payoff = 'Keep the proof close.';
  const hasPayoff = content.title.includes(payoff);
  const headlineLead = hasPayoff
    ? content.title.slice(0, content.title.indexOf(payoff))
    : content.title;

  useEffect(() => {
    const video = videoRef.current;
    if (!canAnimate || !video || typeof IntersectionObserver === 'undefined') return undefined;

    let isVisible = false;
    const syncPlayback = () => {
      if (isVisible && document.visibilityState !== 'hidden') {
        const playback = video.play();
        playback?.catch(() => {});
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.1 });
    const handleVisibilityChange = () => syncPlayback();

    observer.observe(video);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [canAnimate]);

  return (
    <section
      className="cyber-cta-scene text-white"
      aria-labelledby="cyber-cta-title"
    >
      <div
        className="cyber-cta-scene__field"
        data-cinematic-field
        data-motion={canAnimate ? 'animated' : 'static'}
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          className="cyber-cta-scene__video"
          data-cyber-cta-video
          data-motion={canAnimate ? 'animated' : 'static'}
          aria-hidden="true"
          autoPlay={canAnimate}
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
        >
          <source src={CTA_VIDEO_URL} type="video/mp4" />
        </video>
        <span className="cyber-cta-scene__fallback" />
        <span className="cyber-cta-scene__scrim" />
        <span className="cyber-cta-scene__grain" />
        <span className="cyber-cta-scene__vignette" />
      </div>

      <motion.div
        className="cyber-cta-scene__content shell text-center"
        data-cta-content
        data-motion={canAnimate ? 'animated' : 'static'}
        variants={contentVariants}
        initial={canAnimate ? 'hidden' : false}
        whileInView={canAnimate ? 'visible' : undefined}
        viewport={canAnimate ? { once: true, amount: 0.45 } : undefined}
      >
        <motion.div
          className="cyber-cta-signature"
          data-testid="cyber-cta-signature"
          aria-label="Controllo connected assurance"
          variants={itemVariants}
        >
          <span className="cyber-cta-signature__mark" aria-hidden="true">
            <img src="/assets/emblemLogo.svg" alt="" />
          </span>
          <span>{content.eyebrow}</span>
        </motion.div>

        <motion.h2
          id="cyber-cta-title"
          className="cyber-cta-scene__title text-balance text-white"
          variants={itemVariants}
        >
          {headlineLead}
          {hasPayoff && <span>{payoff}</span>}
        </motion.h2>

        <motion.p className="cyber-cta-scene__description" variants={itemVariants}>
          {content.description}
        </motion.p>

        <motion.div className="cyber-cta-scene__actions" variants={itemVariants}>
          <TrialLink className="button button--mint button--directional focus-visible:outline-white">
            <ArrowRight aria-hidden="true" />
            Start Free Trial
          </TrialLink>
          <Link className="button cyber-cta-scene__secondary focus-visible:outline-white" to="/demo">
            <CalendarDays aria-hidden="true" />
            Request a Demo
          </Link>
        </motion.div>

        <motion.ul
          className="cyber-cta-scene__proof"
          aria-label="Cybersecurity platform proof"
          variants={itemVariants}
        >
          {content.proof.map((item) => <li key={item}>{item}</li>)}
        </motion.ul>
      </motion.div>
    </section>
  );
}
