import HeroSection from '../sections/HeroSection';
import TrustStrip from '../sections/TrustStrip';
import PlatformSection from '../sections/PlatformSection';
import SecuraSection from '../sections/SecuraSection';
import RiskSection from '../sections/RiskSection';
import ComplianceStory from '../sections/ComplianceStory';
import FrameworkSection from '../sections/FrameworkSection';
import BlogSection from '../sections/BlogSection';
import CtaSection from '../sections/CtaSection';
import PageMeta from '../components/PageMeta';
import { useSiteMotion } from '../context/MotionContext';

export default function HomePage() {
  const { motionEnabled } = useSiteMotion();

  return (
    <>
      <PageMeta
        title="Connected compliance, risk, privacy, and AI governance"
        description="Connect controls, evidence, risk, privacy, AI governance, cloud context, and audit work in one continuously current platform."
      />
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
