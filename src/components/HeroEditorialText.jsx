export default function HeroEditorialText({ title, accent, accentClassName = '' }) {
  const accentStart = accent ? title.indexOf(accent) : -1;

  if (accentStart < 0) return title;

  return (
    <>
      {title.slice(0, accentStart)}
      <em className={`hero-editorial-accent ${accentClassName}`.trim()}>{accent}</em>
      {title.slice(accentStart + accent.length)}
    </>
  );
}
