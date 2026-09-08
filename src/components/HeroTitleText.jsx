export default function HeroTitleText({ title, accent }) {
  const accentStart = accent ? title.indexOf(accent) : -1;

  if (accentStart < 0) return title;

  return (
    <>
      {title.slice(0, accentStart)}
      <span className="hero-title-accent">{accent}</span>
      {title.slice(accentStart + accent.length)}
    </>
  );
}
