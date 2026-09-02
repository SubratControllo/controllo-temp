import { Link } from 'react-router-dom';

export function resolveTrialUrl(rawValue) {
  if (typeof rawValue !== 'string' || rawValue.trim() === '') return null;

  try {
    const url = new URL(rawValue.trim());
    return url.protocol === 'http:' || url.protocol === 'https:'
      ? url.href
      : null;
  } catch {
    return null;
  }
}

export default function TrialLink({
  children,
  className = '',
  onClick,
  trialUrl = import.meta.env.VITE_TRIAL_URL,
  href: _href,
  to: _to,
  target: _target,
  rel: _rel,
  ...linkProps
}) {
  const destination = resolveTrialUrl(trialUrl);

  if (destination) {
    return (
      <a {...linkProps} className={className} href={destination} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link {...linkProps} className={className} to="/pricing" onClick={onClick}>
      {children}
    </Link>
  );
}
