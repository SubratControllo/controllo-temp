import { act, render, screen, within } from '@testing-library/react';
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

  it('loops from scope to review to result while the workspace remains visible', () => {
    render(<CyberSecuraSection content={cyberSecuraReview} motionEnabled />);
    const dossier = screen.getByRole('article', { name: 'Illustrative Secura control review' });

    enterView();
    expect(dossier).toHaveAttribute('data-phase', 'scope');
    act(() => vi.advanceTimersByTime(SECURA_REVIEW_DELAYS.scope));
    expect(dossier).toHaveAttribute('data-phase', 'reviewing');
    act(() => vi.advanceTimersByTime(SECURA_REVIEW_DELAYS.reviewing));
    expect(dossier).toHaveAttribute('data-phase', 'result');
    act(() => vi.advanceTimersByTime(3_500));
    expect(dossier).toHaveAttribute('data-phase', 'result');
    act(() => vi.advanceTimersByTime(1_000));
    expect(dossier).toHaveAttribute('data-phase', 'scope');
  });

  it('uses the official Secura identity and removes redundant workflow and replay controls', () => {
    render(<CyberSecuraSection content={cyberSecuraReview} motionEnabled />);
    const dossier = screen.getByRole('article', { name: 'Illustrative Secura control review' });

    expect(dossier.querySelector('img[src="/assets/secura-mark.svg"]')).toBeInTheDocument();
    expect(screen.queryByRole('list', { name: 'Secura review workflow' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Replay Secura review' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /animation/i })).not.toBeInTheDocument();
  });

  it('keeps every phase inside one compact stable workspace', () => {
    render(<CyberSecuraSection content={cyberSecuraReview} motionEnabled />);
    const dossier = screen.getByRole('article', { name: 'Illustrative Secura control review' });

    expect(dossier).toHaveClass('h-[32.5rem]', 'max-w-[35rem]');
    expect(within(dossier).getByTestId('secura-scope-plane')).toBeInTheDocument();
    expect(within(dossier).getByTestId('secura-review-plane')).toBeInTheDocument();
    expect(within(dossier).getByTestId('secura-result-plane')).toBeInTheDocument();
  });

  it('keeps product-verified review inputs and accountable result language', () => {
    render(<CyberSecuraSection content={cyberSecuraReview} motionEnabled={false} />);
    const dossier = screen.getByRole('article', { name: 'Illustrative Secura control review' });

    ['Implementation description', 'Policies & procedures', 'Evidence'].forEach((label) => {
      expect(within(dossier).getByText(label)).toBeInTheDocument();
    });
    expect(within(dossier).getByText('Review required')).toBeInTheDocument();
    expect(within(dossier).getByText('3 review inputs linked')).toBeInTheDocument();
    expect(within(dossier).getByText('Implementation', { exact: true })).toBeInTheDocument();
    expect(within(dossier).getByText('Validate findings before taking action.')).toBeInTheDocument();
    expect(within(dossier).queryByText('Connected control context')).not.toBeInTheDocument();
  });

  it('renders the complete result without autoplay controls for reduced motion', () => {
    render(<CyberSecuraSection content={cyberSecuraReview} motionEnabled={false} />);
    const dossier = screen.getByRole('article', { name: 'Illustrative Secura control review' });

    expect(dossier).toHaveAttribute('data-phase', 'result');
    expect(within(dossier).getAllByRole('listitem', { name: /gap:/i })).toHaveLength(2);
    expect(screen.queryByRole('button', { name: /animation/i })).not.toBeInTheDocument();
    expect(inViewCallback).toBeUndefined();
  });

  it('renders the complete result when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    render(<CyberSecuraSection content={cyberSecuraReview} motionEnabled />);
    const dossier = screen.getByRole('article', { name: 'Illustrative Secura control review' });

    expect(dossier).toHaveAttribute('data-phase', 'result');
    expect(screen.queryByRole('button', { name: /animation/i })).not.toBeInTheDocument();
  });

  it('stops offscreen and restarts the loop when the workspace re-enters', () => {
    render(<CyberSecuraSection content={cyberSecuraReview} motionEnabled />);
    const dossier = screen.getByRole('article', { name: 'Illustrative Secura control review' });

    enterView();
    act(() => vi.advanceTimersByTime(SECURA_REVIEW_DELAYS.scope));
    expect(dossier).toHaveAttribute('data-phase', 'reviewing');
    leaveView();
    expect(dossier).toHaveAttribute('data-phase', 'result');
    expect(vi.getTimerCount()).toBe(0);
    enterView();
    expect(dossier).toHaveAttribute('data-phase', 'scope');
  });

  it('clears timers and disconnects its observer on unmount', () => {
    const { unmount } = render(<CyberSecuraSection content={cyberSecuraReview} motionEnabled />);
    enterView();
    expect(vi.getTimerCount()).toBeGreaterThan(0);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
    expect(disconnect).toHaveBeenCalledOnce();
  });
});
