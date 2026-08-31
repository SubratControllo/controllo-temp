import { ArrowRight } from 'lucide-react';

export default function BrandCtaContent({
  children,
  motionEnabled,
  iconTestId,
  shineTestId,
}) {
  return (
    <>
      {motionEnabled && (
        <span
          className="pointer-events-none absolute top-0 left-0 h-full w-25 -translate-x-full bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,.82),transparent_70%)] opacity-60 group-hover/brand-cta:animate-[header-cta-shine_1.5s_ease-out_infinite] group-focus-visible/brand-cta:animate-[header-cta-shine_1.5s_ease-out_infinite]"
          data-testid={shineTestId}
          aria-hidden="true"
        />
      )}
      <span className="relative z-10">{children}</span>
      <ArrowRight
        className="relative z-10 motion-reduce:group-hover/brand-cta:translate-x-0 motion-reduce:group-focus-visible/brand-cta:translate-x-0"
        data-testid={iconTestId}
        aria-hidden="true"
      />
    </>
  );
}
