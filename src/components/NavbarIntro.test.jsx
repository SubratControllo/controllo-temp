import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import NavbarIntro, { NavbarIntroLogo } from './NavbarIntro';

const { motionPreference } = vi.hoisted(() => ({
  motionPreference: { enabled: true }
}));

vi.mock('../context/MotionContext', () => ({
  useSiteMotion: () => ({ motionEnabled: motionPreference.enabled })
}));

describe('NavbarIntro', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    motionPreference.enabled = true;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('keeps header content present and removes the temporary emblem after the intro', () => {
    render(
      <NavbarIntro className="header-surface">
        <NavbarIntroLogo>
          <span>Controllo</span>
        </NavbarIntroLogo>
      </NavbarIntro>
    );

    expect(screen.getByTestId('navbar-intro')).toHaveAttribute('data-intro-phase', 'active');
    expect(screen.getByText('Controllo')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-intro-emblem')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(950));

    expect(screen.getByTestId('navbar-intro')).toHaveAttribute('data-intro-phase', 'complete');
    expect(screen.queryByTestId('navbar-intro-emblem')).not.toBeInTheDocument();
  });

  it('clears its completion timer when unmounted', () => {
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');
    const { unmount } = render(<NavbarIntro>Navigation</NavbarIntro>);

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });

  it('renders the final static state when reduced motion is active', () => {
    motionPreference.enabled = false;

    render(
      <NavbarIntro>
        <NavbarIntroLogo>
          <span>Controllo</span>
        </NavbarIntroLogo>
      </NavbarIntro>
    );

    expect(screen.getByTestId('navbar-intro')).toHaveAttribute('data-intro-phase', 'complete');
    expect(screen.getByText('Controllo')).toBeInTheDocument();
    expect(screen.queryByTestId('navbar-intro-emblem')).not.toBeInTheDocument();
  });
});
