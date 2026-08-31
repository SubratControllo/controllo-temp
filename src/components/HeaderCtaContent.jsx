import { useSiteMotion } from '../context/MotionContext';
import BrandCtaContent from './BrandCtaContent';

export default function HeaderCtaContent({
  children,
  iconTestId = 'header-cta-icon',
  shineTestId = 'header-cta-shine',
}) {
  const { motionEnabled } = useSiteMotion();

  return (
    <BrandCtaContent
      iconTestId={iconTestId}
      motionEnabled={motionEnabled}
      shineTestId={shineTestId}
    >
      {children}
    </BrandCtaContent>
  );
}
