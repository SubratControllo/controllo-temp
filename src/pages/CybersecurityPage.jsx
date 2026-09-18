import { useSiteMotion } from '../context/MotionContext';
import {
  cyberChallenges,
  cyberClosing,
  cyberCloudViews,
  cyberFrameworks,
  cyberHero,
  cyberSecuraReview
} from '../data/cybersecurityContent';
import CyberCloudSection from '../sections/cybersecurity/CyberCloudSection';
import CyberCtaSection from '../sections/cybersecurity/CyberCtaSection';
import CyberFrameworksSection from '../sections/cybersecurity/CyberFrameworksSection';
import CyberHeroSection from '../sections/cybersecurity/CyberHeroSection';
import CyberResponseSection from '../sections/cybersecurity/CyberResponseSection';
import CyberSecuraSection from '../sections/cybersecurity/CyberSecuraSection';

export default function CybersecurityPage() {
  const { motionEnabled } = useSiteMotion();

  return (
    <>
      <CyberHeroSection content={cyberHero} motionEnabled={motionEnabled} />
      <CyberResponseSection items={cyberChallenges} motionEnabled={motionEnabled} />
      <CyberSecuraSection content={cyberSecuraReview} motionEnabled={motionEnabled} />
      <CyberCloudSection views={cyberCloudViews} motionEnabled={motionEnabled} />
      <CyberFrameworksSection frameworks={cyberFrameworks} motionEnabled={motionEnabled} />
      <CyberCtaSection content={cyberClosing} motionEnabled={motionEnabled} />
    </>
  );
}
