import { useSiteMotion } from '../context/MotionContext';
import {
  riskAssessmentContent,
  riskChallenges,
  riskClosing,
  riskCoverageViews,
  riskHero,
} from '../data/riskManagementContent';
import RiskAssessmentSection from '../sections/risk-management/RiskAssessmentSection';
import RiskChallengesSection from '../sections/risk-management/RiskChallengesSection';
import RiskCoverageSection from '../sections/risk-management/RiskCoverageSection';
import RiskCtaSection from '../sections/risk-management/RiskCtaSection';
import RiskHeroSection from '../sections/risk-management/RiskHeroSection';

export default function RiskManagementPage() {
  const { motionEnabled } = useSiteMotion();

  return (
    <>
      <RiskHeroSection content={riskHero} motionEnabled={motionEnabled} />
      <RiskChallengesSection items={riskChallenges} motionEnabled={motionEnabled} />
      <RiskCoverageSection views={riskCoverageViews} motionEnabled={motionEnabled} />
      <RiskAssessmentSection content={riskAssessmentContent} motionEnabled={motionEnabled} />
      <RiskCtaSection content={riskClosing} motionEnabled={motionEnabled} />
    </>
  );
}
