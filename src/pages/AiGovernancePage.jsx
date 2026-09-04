import PageMeta from '../components/PageMeta';
import { useSiteMotion } from '../context/MotionContext';
import {
  aiGovernanceMeta,
  aiHero,
  aiChallenges,
  aiOperations,
  aiSecura,
  aiFrameworks,
  aiClosing
} from '../data/aiGovernanceContent';
import AiHeroSection from '../sections/ai-governance/AiHeroSection';
import AiChallengesSection from '../sections/ai-governance/AiChallengesSection';
import AiOperationsSection from '../sections/ai-governance/AiOperationsSection';
import AiSecuraSection from '../sections/ai-governance/AiSecuraSection';
import AiFrameworksSection from '../sections/ai-governance/AiFrameworksSection';
import AiCtaSection from '../sections/ai-governance/AiCtaSection';

export default function AiGovernancePage() {
  const { motionEnabled } = useSiteMotion();

  return (
    <>
      <PageMeta title={aiGovernanceMeta.title} description={aiGovernanceMeta.description} />
      <AiHeroSection content={aiHero} motionEnabled={motionEnabled} />
      <AiChallengesSection content={aiChallenges} motionEnabled={motionEnabled} />
      <AiOperationsSection content={aiOperations} motionEnabled={motionEnabled} />
      <AiSecuraSection content={aiSecura} motionEnabled={motionEnabled} />
      <AiFrameworksSection content={aiFrameworks} motionEnabled={motionEnabled} />
      <AiCtaSection content={aiClosing} />
    </>
  );
}
