const containerClasses = {
  card: 'flex h-11 w-18 shrink-0 items-center justify-center rounded-[12px] border border-line bg-[#f8fbfa] px-2.5 py-2',
  inline: 'inline-flex h-5 w-fit shrink-0 items-center justify-center',
};

const fallbackClasses = {
  card: 'size-6 text-teal',
  inline: 'size-3.5 text-teal',
};

export default function IntegrationLogo({ brand, fallback: Fallback, size = 'card' }) {
  const containerClassName = brand?.format === 'wordmark' && size === 'inline'
    ? 'inline-flex h-5 w-24 shrink-0 items-center justify-center'
    : containerClasses[size] ?? containerClasses.card;

  if (!brand) {
    return (
      <span className={containerClassName} aria-hidden="true">
        {Fallback ? <Fallback className={fallbackClasses[size] ?? fallbackClasses.card} /> : null}
      </span>
    );
  }

  const imageClassName = brand.format === 'wordmark'
    ? size === 'inline'
      ? 'max-h-2.5 w-full object-contain'
      : 'max-h-3.5 w-full object-contain'
    : size === 'inline'
      ? 'size-4 object-contain'
      : 'size-7 object-contain';

  return (
    <span className={containerClassName} aria-hidden="true">
      <img
        alt=""
        className={imageClassName}
        data-brand-logo=""
        decoding="async"
        loading="lazy"
        src={brand.src}
      />
    </span>
  );
}
