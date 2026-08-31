import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import HeaderCtaContent from './HeaderCtaContent';

const { motionPreference } = vi.hoisted(() => ({
  motionPreference: { enabled: true }
}));

vi.mock('../context/MotionContext', () => ({
  useSiteMotion: () => ({ motionEnabled: motionPreference.enabled })
}));

describe('HeaderCtaContent', () => {
  beforeEach(() => {
    motionPreference.enabled = true;
  });

  it('renders a decorative shine and the accessible CTA label', () => {
    render(<HeaderCtaContent>Get a readiness tour</HeaderCtaContent>);

    expect(screen.getByText('Get a readiness tour')).toBeInTheDocument();
    expect(screen.getByTestId('header-cta-shine')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('header-cta-shine')).toHaveClass('-translate-x-full');
    expect(screen.getByTestId('header-cta-icon')).toHaveAttribute('aria-hidden', 'true');
  });

  it('omits the moving shine when motion is disabled', () => {
    motionPreference.enabled = false;
    render(<HeaderCtaContent>Get a readiness tour</HeaderCtaContent>);

    expect(screen.getByText('Get a readiness tour')).toBeInTheDocument();
    expect(screen.queryByTestId('header-cta-shine')).not.toBeInTheDocument();
  });

  it('allows reused CTA surfaces to expose distinct test ids', () => {
    render(
      <HeaderCtaContent
        iconTestId="hero-primary-cta-icon"
        shineTestId="hero-primary-cta-shine"
      >
        See your readiness path
      </HeaderCtaContent>
    );

    expect(screen.getByText('See your readiness path')).toBeInTheDocument();
    expect(screen.getByTestId('hero-primary-cta-shine')).toHaveClass(
      '-translate-x-full',
    );
    expect(screen.getByTestId('hero-primary-cta-icon')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
    expect(screen.queryByTestId('header-cta-shine')).not.toBeInTheDocument();
  });
});
