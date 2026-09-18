import HeroSection from '../sections/HeroSection';
import TrustStrip from '../sections/TrustStrip';
import PlatformSection from '../sections/PlatformSection';
import SecuraSection from '../sections/SecuraSection';
import RiskSection from '../sections/RiskSection';
import ComplianceStory from '../sections/ComplianceStory';
import FrameworkSection from '../sections/FrameworkSection';
import BlogSection from '../sections/BlogSection';
import CtaSection from '../sections/CtaSection';
import { useSiteMotion } from '../context/MotionContext';

export default function HomePage() {
  const { motionEnabled } = useSiteMotion();

  return (
    <>
      <HeroSection motionEnabled={motionEnabled} />
      <TrustStrip motionEnabled={motionEnabled} />
      <PlatformSection motionEnabled={motionEnabled} />
      <SecuraSection motionEnabled={motionEnabled} />
      <RiskSection motionEnabled={motionEnabled} />
      <FrameworkSection motionEnabled={motionEnabled} />
      <ComplianceStory motionEnabled={motionEnabled} />
      <BlogSection motionEnabled={motionEnabled} />
      <CtaSection motionEnabled={motionEnabled} />
    </>
  );
}
