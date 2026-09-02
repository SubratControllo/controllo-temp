import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import TrialLink, { resolveTrialUrl } from './TrialLink';

const renderLink = (trialUrl, props = {}) => render(
  <MemoryRouter>
    <TrialLink className="button" trialUrl={trialUrl} {...props}>Start Free Trial</TrialLink>
  </MemoryRouter>
);

describe('TrialLink', () => {
  it('accepts only absolute HTTP and HTTPS destinations', () => {
    expect(resolveTrialUrl('https://trial.controllo.ai/start?source=cyber')).toBe(
      'https://trial.controllo.ai/start?source=cyber'
    );
    expect(resolveTrialUrl('http://localhost:4100/register')).toBe(
      'http://localhost:4100/register'
    );
    expect(resolveTrialUrl('/register')).toBeNull();
    expect(resolveTrialUrl('javascript:alert(1)')).toBeNull();
    expect(resolveTrialUrl('mailto:hello@controllo.ai')).toBeNull();
    expect(resolveTrialUrl('')).toBeNull();
    expect(resolveTrialUrl(undefined)).toBeNull();
  });

  it('renders a current-tab anchor for a configured production URL', () => {
    renderLink('  https://trial.controllo.ai/start  ');
    const link = screen.getByRole('link', { name: 'Start Free Trial' });
    expect(link).toHaveAttribute('href', 'https://trial.controllo.ai/start');
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not allow caller props to override the configured external destination', () => {
    renderLink('https://trial.controllo.ai/start', {
      href: 'https://example.com/override',
      to: '/override',
      target: '_blank',
      rel: 'noopener noreferrer',
    });

    const link = screen.getByRole('link', { name: 'Start Free Trial' });
    expect(link).toHaveAttribute('href', 'https://trial.controllo.ai/start');
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });

  it('does not allow caller props to override the pricing fallback', () => {
    renderLink(undefined, {
      href: 'https://example.com/override',
      to: '/override',
      target: '_blank',
      rel: 'noopener noreferrer',
    });

    const link = screen.getByRole('link', { name: 'Start Free Trial' });
    expect(link).toHaveAttribute('href', '/pricing');
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });

  it.each([undefined, '', 'not a URL', '/signup', 'ftp://files.example.com'])
  ('falls back to pricing for %s', (trialUrl) => {
    renderLink(trialUrl);
    expect(screen.getByRole('link', { name: 'Start Free Trial' }))
      .toHaveAttribute('href', '/pricing');
  });
});
