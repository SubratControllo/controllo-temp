import { act, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cyberChallenges } from '../../data/cybersecurityContent';
import CyberResponseSection from './CyberResponseSection';

let observerCallback;
const disconnect = vi.fn();

class IntersectionObserverStub {
  constructor(callback) { observerCallback = callback; }
  observe() {}
  unobserve() {}
  disconnect() { disconnect(); }
}

describe('CyberResponseSection', () => {
  beforeEach(() => {
    observerCallback = undefined;
    disconnect.mockClear();
    vi.stubGlobal('IntersectionObserver', IntersectionObserverStub);
  });
  afterEach(() => vi.unstubAllGlobals());

  it('keeps all five challenge and response pairs in the document', () => {
    render(<CyberResponseSection items={cyberChallenges} motionEnabled />);
    const list = screen.getByRole('list', { name: 'Cybersecurity challenges and responses' });
    expect(within(list).getAllByRole('listitem')).toHaveLength(5);
    cyberChallenges.forEach(({ challenge, response }) => {
      expect(within(list).getByText(challenge)).toBeInTheDocument();
      expect(within(list).getByText(response)).toBeInTheDocument();
    });
  });

  it('updates only the illustrative console when a row becomes current', () => {
    render(<CyberResponseSection items={cyberChallenges} motionEnabled />);
    const rows = screen.getAllByTestId(/cyber-response-row-/);
    act(() => observerCallback([{ target: rows[3], isIntersecting: true, intersectionRatio: 0.7 }]));
    const consolePanel = screen.getByLabelText('Current Controllo response example');
    expect(within(consolePanel).getByText('Environment watch')).toBeInTheDocument();
    expect(within(consolePanel).getByText('Refresh complete')).toBeInTheDocument();
  });

  it('disconnects its observer on unmount', () => {
    const { unmount } = render(<CyberResponseSection items={cyberChallenges} motionEnabled />);
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
  });
});
