import PageMeta from '../components/PageMeta';
import ConversionBand from '../components/ConversionBand';
import { useSiteMotion } from '../context/MotionContext';
import { auditAreas, auditAuditor, auditClosing, auditHero, auditManagementMeta, auditRepositoryViews } from '../data/auditManagementContent';
import AuditAreasSection from '../sections/audit-management/AuditAreasSection';
import AuditAuditorSection from '../sections/audit-management/AuditAuditorSection';
import AuditHeroSection from '../sections/audit-management/AuditHeroSection';
import AuditRepositorySection from '../sections/audit-management/AuditRepositorySection';

export default function AuditManagementPage() {
  const { motionEnabled } = useSiteMotion();

  return (
    <>
      <PageMeta title={auditManagementMeta.title} description={auditManagementMeta.description} appendBrand={false} />
      <AuditHeroSection content={auditHero} motionEnabled={motionEnabled} />
      <AuditAreasSection areas={auditAreas} motionEnabled={motionEnabled} />
      <AuditRepositorySection views={auditRepositoryViews} motionEnabled={motionEnabled} />
      <AuditAuditorSection content={auditAuditor} motionEnabled={motionEnabled} />
      <ConversionBand
        title={auditClosing.title}
        copy={auditClosing.copy}
        tone="navy"
        actionLabel="Request a demo"
        motionEnabled={motionEnabled}
      />
    </>
  );
}
