import { useEffect, useRef } from 'react';

const CTA_VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4';

export default function CinematicCtaField({ motionEnabled }) {
  const videoRef = useRef(null);
  const canAnimate = Boolean(motionEnabled);

  useEffect(() => {
    const video = videoRef.current;
    if (!canAnimate || !video || typeof IntersectionObserver === 'undefined') return undefined;

    let isVisible = false;
    const syncPlayback = () => {
      if (isVisible && document.visibilityState !== 'hidden') video.play()?.catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.1 });

    observer.observe(video);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
    };
  }, [canAnimate]);

  return (
    <div
      className="cyber-cta-scene__field"
      data-cinematic-field
      data-motion={canAnimate ? 'animated' : 'static'}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        className="cyber-cta-scene__video"
        data-cinematic-cta-video
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
  );
}
