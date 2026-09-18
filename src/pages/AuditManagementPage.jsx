import { useSiteMotion } from '../context/MotionContext';
import { auditAreas, auditAuditor, auditClosing, auditHero, auditRepositoryViews } from '../data/auditManagementContent';
import AuditAreasSection from '../sections/audit-management/AuditAreasSection';
import AuditAuditorSection from '../sections/audit-management/AuditAuditorSection';
import AuditCtaSection from '../sections/audit-management/AuditCtaSection';
import AuditHeroSection from '../sections/audit-management/AuditHeroSection';
import AuditRepositorySection from '../sections/audit-management/AuditRepositorySection';

export default function AuditManagementPage() {
  const { motionEnabled } = useSiteMotion();

  return (
    <>
      <AuditHeroSection content={auditHero} motionEnabled={motionEnabled} />
      <AuditAreasSection areas={auditAreas} motionEnabled={motionEnabled} />
      <AuditRepositorySection views={auditRepositoryViews} motionEnabled={motionEnabled} />
      <AuditAuditorSection content={auditAuditor} motionEnabled={motionEnabled} />
      <AuditCtaSection content={auditClosing} motionEnabled={motionEnabled} />
    </>
  );
}
