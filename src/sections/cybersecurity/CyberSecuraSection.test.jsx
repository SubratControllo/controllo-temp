import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cyberSecuraReview } from '../../data/cybersecurityContent';
import CyberSecuraSection, { SECURA_REVIEW_DELAYS } from './CyberSecuraSection';

let inViewCallback;
const disconnect = vi.fn();

class IntersectionObserverStub {
  constructor(callback) {
    inViewCallback = callback;
  }

  observe() {}
  disconnect() {
    disconnect();
  }
}

const enterView = () => act(() => inViewCallback([{ isIntersecting: true, intersectionRatio: 0.7 }]));
const leaveView = () => act(() => inViewCallback([{ isIntersecting: false, intersectionRatio: 0 }]));

describe('CyberSecuraSection', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    inViewCallback = undefined;
    disconnect.mockClear();
    vi.stubGlobal('IntersectionObserver', IntersectionObserverStub);
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('plays once from review scope to a human-reviewed recommendation', () => {
    render(<CyberSecuraSection content={cyberSecuraReview} motionEnabled />);
    const dossier = screen.getByRole('article', { name: 'Illustrative Secura control review' });

    expect(dossier).toHaveAttribute('data-phase', 'scope');

    enterView();
    act(() => vi.advanceTimersByTime(SECURA_REVIEW_DELAYS.scope));
    expect(dossier).toHaveAttribute('data-phase', 'reviewing');

    act(() => vi.advanceTimersByTime(SECURA_REVIEW_DELAYS.reviewing));
    expect(dossier).toHaveAttribute('data-phase', 'result');
    expect(within(dossier).getByText('2 gaps identified')).toBeInTheDocument();
    expect(within(dossier).getByText(cyberSecuraReview.recommendation)).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(20_000));
    expect(dossier).toHaveAttribute('data-phase', 'result');
  });

  it('replays only after explicit activation', async () => {
    render(<CyberSecuraSection content={cyberSecuraReview} motionEnabled />);

    enterView();
    act(() => vi.advanceTimersByTime(SECURA_REVIEW_DELAYS.scope + SECURA_REVIEW_DELAYS.reviewing));
    vi.useRealTimers();
    const user = userEvent.setup();
    const replay = screen.getByRole('button', { name: 'Replay Secura review' });
    expect(replay).toHaveClass('hover:bg-mint-soft', 'focus-visible:bg-mint-soft');
    await user.click(replay);

    expect(screen.getByRole('article', { name: 'Illustrative Secura control review' })).toHaveAttribute('data-phase', 'scope');
  });

  it('renders the complete result immediately for reduced motion', () => {
    render(<CyberSecuraSection content={cyberSecuraReview} motionEnabled={false} />);
    const dossier = screen.getByRole('article', { name: 'Illustrative Secura control review' });

    expect(dossier).toHaveAttribute('data-phase', 'result');
    expect(within(dossier).getAllByRole('listitem', { name: /gap:/i })).toHaveLength(2);

    act(() => screen.getByRole('button', { name: 'Replay Secura review' }).click());
    expect(dossier).toHaveAttribute('data-phase', 'result');
  });

  it('renders the complete result when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    render(<CyberSecuraSection content={cyberSecuraReview} motionEnabled />);
    const dossier = screen.getByRole('article', { name: 'Illustrative Secura control review' });

    expect(dossier).toHaveAttribute('data-phase', 'result');
    expect(within(dossier).getAllByRole('listitem', { name: /gap:/i })).toHaveLength(2);

    act(() => screen.getByRole('button', { name: 'Replay Secura review' }).click());
    expect(dossier).toHaveAttribute('data-phase', 'result');
  });

  it('does not start the review below the required visibility threshold', () => {
    render(<CyberSecuraSection content={cyberSecuraReview} motionEnabled />);
    const dossier = screen.getByRole('article', { name: 'Illustrative Secura control review' });

    act(() => inViewCallback([{ isIntersecting: true, intersectionRatio: 0.44 }]));
    act(() => vi.advanceTimersByTime(20_000));

    expect(dossier).toHaveAttribute('data-phase', 'scope');
  });

  it('keeps a single phase panel in the dossier during a transition', () => {
    render(<CyberSecuraSection content={cyberSecuraReview} motionEnabled />);
    const dossier = screen.getByRole('article', { name: 'Illustrative Secura control review' });

    enterView();
    act(() => vi.advanceTimersByTime(SECURA_REVIEW_DELAYS.scope));

    expect(within(dossier).getAllByRole('heading', { level: 3 })).toHaveLength(1);
  });

  it.each([
    ['scope', SECURA_REVIEW_DELAYS.scope - 1],
    ['reviewing', SECURA_REVIEW_DELAYS.scope + SECURA_REVIEW_DELAYS.reviewing - 1],
  ])('settles to result and clears timers when leaving during %s', (expectedPhase, elapsed) => {
    render(<CyberSecuraSection content={cyberSecuraReview} motionEnabled />);
    const dossier = screen.getByRole('article', { name: 'Illustrative Secura control review' });

    enterView();
    act(() => vi.advanceTimersByTime(elapsed));
    expect(dossier).toHaveAttribute('data-phase', expectedPhase);

    leaveView();
    expect(dossier).toHaveAttribute('data-phase', 'result');
    expect(vi.getTimerCount()).toBe(0);

    enterView();
    act(() => vi.advanceTimersByTime(20_000));
    expect(dossier).toHaveAttribute('data-phase', 'result');
  });

  it('announces each phase through one stable polite status region', () => {
    render(<CyberSecuraSection content={cyberSecuraReview} motionEnabled />);
    const status = screen.getByRole('status');

    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveAttribute('aria-atomic', 'true');
    expect(status).toHaveTextContent(`Review scope ready for ${cyberSecuraReview.control}.`);

    enterView();
    act(() => vi.advanceTimersByTime(SECURA_REVIEW_DELAYS.scope));
    expect(screen.getByRole('status')).toBe(status);
    expect(status).toHaveTextContent('Secura is reviewing connected control context.');

    act(() => vi.advanceTimersByTime(SECURA_REVIEW_DELAYS.reviewing));
    expect(screen.getByRole('status')).toBe(status);
    expect(status).toHaveTextContent('Secura review complete: 2 gaps identified.');
  });

  it('clears pending review timers when unmounted', () => {
    const { unmount } = render(<CyberSecuraSection content={cyberSecuraReview} motionEnabled />);
    enterView();
    expect(vi.getTimerCount()).toBe(2);

    unmount();

    expect(vi.getTimerCount()).toBe(0);
  });

  it('disconnects the observer when unmounted', () => {
    const { unmount } = render(<CyberSecuraSection content={cyberSecuraReview} motionEnabled />);

    unmount();

    expect(disconnect).toHaveBeenCalledOnce();
  });
});
