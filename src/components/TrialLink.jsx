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
  ...anchorProps
}) {
  const destination = resolveTrialUrl(trialUrl);

  if (destination) {
    return (
      <a className={className} href={destination} onClick={onClick} {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} to="/pricing" onClick={onClick} {...anchorProps}>
      {children}
    </Link>
  );
}
