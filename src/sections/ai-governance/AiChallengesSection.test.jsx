import { act, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { aiChallenges } from '../../data/aiGovernanceContent';
import AiChallengesSection from './AiChallengesSection';

let observerCallback;
const disconnect = vi.fn();

class IntersectionObserverStub {
  constructor(callback) { observerCallback = callback; }
  observe() {}
  disconnect() { disconnect(); }
}

describe('AiChallengesSection', () => {
  beforeEach(() => {
    observerCallback = undefined;
    disconnect.mockClear();
    vi.stubGlobal('IntersectionObserver', IntersectionObserverStub);
  });

  afterEach(() => vi.unstubAllGlobals());

  it('keeps all verified challenge and response ideas readable across four operating stages', () => {
    render(<AiChallengesSection content={aiChallenges} motionEnabled={false} />);

    const section = screen.getByRole('region', { name: /from ai complexity to governance clarity/i });
    const list = within(section).getByRole('list', { name: /ai governance operating stages/i });
    const rows = within(list).getAllByTestId(/ai-challenge-row-/);

    expect(rows).toHaveLength(4);
    aiChallenges.stages.forEach((stage, index) => {
      expect(within(rows[index]).getByRole('heading', { name: stage.title })).toBeVisible();
      expect(within(rows[index]).getByText(stage.description)).toBeVisible();
    });
    aiChallenges.items.forEach((item) => {
      expect(within(section).getByText(item.challenge)).toBeVisible();
      expect(within(section).getByText(item.response)).toBeVisible();
    });
    expect(within(section).queryByRole('button')).not.toBeInTheDocument();
    expect(within(section).queryByRole('tab')).not.toBeInTheDocument();
    expect(within(section).queryByText(/comments|internal chat|auditor collaboration/i)).not.toBeInTheDocument();
  });

  it('syncs the stage rail and product canvas to the most visible stage', () => {
    render(<AiChallengesSection content={aiChallenges} motionEnabled />);

    const rows = screen.getAllByTestId(/ai-challenge-row-/);
    const current = screen.getByLabelText('AI governance journey progress');

    act(() => observerCallback([{ target: rows[1], isIntersecting: true, intersectionRatio: 0.8 }]));

    expect(rows[1]).toHaveAttribute('aria-current', 'step');
    expect(within(current).getByText('Assign & assess', { exact: true })).toBeInTheDocument();
    expect(screen.getAllByRole('figure', { name: /representative ownership and ai risk view/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole('progressbar', { name: 'AI governance story progress' }))
      .toHaveAttribute('aria-valuenow', '2');
  });

  it('keeps the stage rail concise instead of duplicating narrative copy', () => {
    render(<AiChallengesSection content={aiChallenges} motionEnabled={false} />);

    const current = screen.getByLabelText('AI governance journey progress');
    expect(within(current).getByText('Map', { exact: true })).toBeInTheDocument();
    expect(within(current).queryByText(aiChallenges.items[0].response)).not.toBeInTheDocument();
  });

  it('renders a complete static narrative and skips scroll observers when motion is reduced', () => {
    const { unmount } = render(<AiChallengesSection content={aiChallenges} motionEnabled={false} />);

    expect(screen.getAllByTestId(/ai-challenge-row-/)).toHaveLength(4);
    expect(observerCallback).toBeUndefined();
    unmount();
    expect(disconnect).not.toHaveBeenCalled();
  });

  it('disconnects its scroll observer on unmount', () => {
    const { unmount } = render(<AiChallengesSection content={aiChallenges} motionEnabled />);

    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
  });
});
