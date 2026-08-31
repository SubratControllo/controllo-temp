export default function BrandMark({ compact = false }) {
  return (
    <span
      className={`brand-mark relative inline-block shrink-0 ${
        compact ? "size-7" : "size-7.5"
      }`}
      aria-hidden="true"
    >
      <span className="absolute inset-[5px_0_5px_4px] bg-mint [clip-path:polygon(0_0,58%_0,100%_50%,58%_100%,0_100%,42%_50%)]" />
      <span className="absolute inset-[5px_2px_5px_13px] bg-teal [clip-path:polygon(0_0,58%_0,100%_50%,58%_100%,0_100%,42%_50%)]" />
    </span>
  );
}
