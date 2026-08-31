export default function BrandLogo({ variant = 'dark' }) {
  return (
    <img
      alt=""
      aria-hidden="true"
      className="h-auto w-36 max-[760px]:w-31"
      decoding="async"
      draggable="false"
      src={`/assets/logo-${variant}.svg`}
    />
  );
}
