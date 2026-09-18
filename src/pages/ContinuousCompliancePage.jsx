import { useSiteMotion } from '../context/MotionContext';
import {
  betweenAuditsContent,
  complianceFrameworksContent,
  complianceLoopContent,
  continuousComplianceClosing,
  continuousComplianceHero,
  oversightContent,
} from '../data/continuousComplianceContent';
import BetweenAuditsSection from '../sections/continuous-compliance/BetweenAuditsSection';
import ComplianceFrameworksSection from '../sections/continuous-compliance/ComplianceFrameworksSection';
import ComplianceLoopSection from '../sections/continuous-compliance/ComplianceLoopSection';
import ComplianceOversightSection from '../sections/continuous-compliance/ComplianceOversightSection';
import ContinuousComplianceCtaSection from '../sections/continuous-compliance/ContinuousComplianceCtaSection';
import ContinuousComplianceHeroSection from '../sections/continuous-compliance/ContinuousComplianceHeroSection';

export default function ContinuousCompliancePage() {
  const { motionEnabled } = useSiteMotion();

  return (
    <>
      <ContinuousComplianceHeroSection content={continuousComplianceHero} motionEnabled={motionEnabled} />
      <BetweenAuditsSection content={betweenAuditsContent} motionEnabled={motionEnabled} />
      <ComplianceLoopSection content={complianceLoopContent} motionEnabled={motionEnabled} />
      <ComplianceOversightSection content={oversightContent} motionEnabled={motionEnabled} />
      <ComplianceFrameworksSection content={complianceFrameworksContent} motionEnabled={motionEnabled} />
      <ContinuousComplianceCtaSection content={continuousComplianceClosing} motionEnabled={motionEnabled} />
    </>
  );
}
