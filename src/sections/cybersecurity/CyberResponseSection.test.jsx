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

  it('keeps the section introduction and timeline in one narrative column', () => {
    render(<CyberResponseSection items={cyberChallenges} motionEnabled />);
    const narrative = screen.getByTestId('cyber-story-narrative');
    expect(within(narrative).getByRole('heading', { name: 'Turn compliance friction into clearer action.' })).toBeInTheDocument();
    expect(within(narrative).getByRole('list', { name: 'Cybersecurity challenges and responses' })).toBeInTheDocument();
  });

  it('ends the desktop timeline track at the final node', () => {
    render(<CyberResponseSection items={cyberChallenges} motionEnabled />);

    expect(screen.getByTestId('cyber-story-track')).toHaveClass('bottom-[10%]');
  });

  it('changes to the matching product scene as the active chapter changes', () => {
    render(<CyberResponseSection items={cyberChallenges} motionEnabled />);
    const rows = screen.getAllByTestId(/cyber-response-row-/);
    act(() => observerCallback([{ target: rows[1], isIntersecting: true, intersectionRatio: 0.8 }]));
    const consolePanel = screen.getByLabelText('Current Controllo response example');
    expect(within(consolePanel).getByRole('img', { name: 'Mapped control set visual' })).toBeInTheDocument();
  });

  it('presents the dossier as pointer-inert illustrative content with canonical evidence language', () => {
    render(<CyberResponseSection items={cyberChallenges} motionEnabled />);
    const consolePanel = screen.getByLabelText('Current Controllo response example');

    expect(consolePanel).toHaveClass('pointer-events-none', 'select-none');
    expect(within(consolePanel).getByText('Illustrative program view')).toBeInTheDocument();
    expect(within(consolePanel).queryByText('Illustrative program state')).not.toBeInTheDocument();
    expect(within(consolePanel).queryByText('Scroll to continue the connected program')).not.toBeInTheDocument();
    expect(within(consolePanel).getByText('Audit-period evidence')).toBeInTheDocument();
    expect(within(consolePanel).getByText('Policy & procedure')).toBeInTheDocument();
  });

  it('renders continuous mapped-control connectors without SVG dash animation', () => {
    render(<CyberResponseSection items={cyberChallenges} motionEnabled />);
    const rows = screen.getAllByTestId(/cyber-response-row-/);
    act(() => observerCallback([{ target: rows[1], isIntersecting: true, intersectionRatio: 0.8 }]));
    const scene = within(screen.getByLabelText('Current Controllo response example'))
      .getByRole('img', { name: 'Mapped control set visual' });
    const connectors = scene.querySelectorAll(':scope > div > svg > path');

    expect(connectors).toHaveLength(4);
    connectors.forEach((connector) => expect(connector).not.toHaveAttribute('pathLength'));
  });

  it('uses canonical evidence language in the mapped-control scene', () => {
    render(<CyberResponseSection items={cyberChallenges} motionEnabled />);
    const rows = screen.getAllByTestId(/cyber-response-row-/);
    act(() => observerCallback([{ target: rows[1], isIntersecting: true, intersectionRatio: 0.8 }]));
    const scene = within(screen.getByLabelText('Current Controllo response example'))
      .getByRole('img', { name: 'Mapped control set visual' });

    expect(within(scene).getByText('Evidence')).toBeInTheDocument();
    expect(within(scene).queryByText('Artifacts')).not.toBeInTheDocument();
  });

  it('shows accountable ownership inside the control workspace scene', () => {
    render(<CyberResponseSection items={cyberChallenges} motionEnabled />);
    const rows = screen.getAllByTestId(/cyber-response-row-/);
    act(() => observerCallback([{ target: rows[2], isIntersecting: true, intersectionRatio: 0.8 }]));
    const scene = within(screen.getByLabelText('Current Controllo response example'))
      .getByRole('img', { name: 'Control workspace visual' });

    expect(within(scene).getAllByText('Owner')).toHaveLength(2);
    expect(within(scene).getAllByText('Auditor access')).toHaveLength(2);
    expect(within(scene).getByText('Scoped')).toBeInTheDocument();
    expect(within(scene).queryByText('Implementation')).not.toBeInTheDocument();
  });

  it('explains environment refresh state with named operational signals', () => {
    render(<CyberResponseSection items={cyberChallenges} motionEnabled />);
    const rows = screen.getAllByTestId(/cyber-response-row-/);
    act(() => observerCallback([{ target: rows[3], isIntersecting: true, intersectionRatio: 0.8 }]));
    const scene = within(screen.getByLabelText('Current Controllo response example'))
      .getByRole('img', { name: 'Environment watch visual' });

    expect(within(scene).getByText('Operational context snapshot')).toBeInTheDocument();
    ['Cloud inventory', 'Identity activity', 'Device posture', 'Alert queue'].forEach((label) => {
      expect(within(scene).getByText(label)).toBeInTheDocument();
    });
  });

  it('ends the final chapter without a redundant footer status or another story prompt', () => {
    render(<CyberResponseSection items={cyberChallenges} motionEnabled />);
    const rows = screen.getAllByTestId(/cyber-response-row-/);
    act(() => observerCallback([{ target: rows[4], isIntersecting: true, intersectionRatio: 0.8 }]));
    const consolePanel = screen.getByLabelText('Current Controllo response example');

    expect(within(consolePanel).queryByText('Illustrative sequence complete')).not.toBeInTheDocument();
    expect(within(consolePanel).queryByText('Program state complete')).not.toBeInTheDocument();
    expect(within(consolePanel).queryByText('Scroll to continue the connected program')).not.toBeInTheDocument();
  });

  it('presents final readiness as status rather than a next-action prompt', () => {
    render(<CyberResponseSection items={cyberChallenges} motionEnabled />);
    const rows = screen.getAllByTestId(/cyber-response-row-/);
    act(() => observerCallback([{ target: rows[4], isIntersecting: true, intersectionRatio: 0.8 }]));
    const scene = within(screen.getByLabelText('Current Controllo response example'))
      .getByRole('img', { name: 'Accountable action visual' });

    expect(within(scene).getByText('Readiness state')).toBeInTheDocument();
    expect(within(scene).getByText('Review context ready')).toBeInTheDocument();
    expect(within(scene).queryByText('Next action')).not.toBeInTheDocument();
  });

  it('updates only the illustrative console when a row becomes current', () => {
    render(<CyberResponseSection items={cyberChallenges} motionEnabled />);
    const rows = screen.getAllByTestId(/cyber-response-row-/);
    act(() => observerCallback([{ target: rows[3], isIntersecting: true, intersectionRatio: 0.7 }]));
    const consolePanel = screen.getByLabelText('Current Controllo response example');
    expect(within(consolePanel).getByText('Environment watch')).toBeInTheDocument();
    expect(within(consolePanel).getByText('Operational context refreshed')).toBeInTheDocument();
    expect(rows[3]).toHaveAttribute('aria-current', 'step');
    expect(within(consolePanel).getByRole('progressbar', { name: 'Story progress' })).toHaveAttribute('aria-valuenow', '4');
  });

  it('renders a complete static program state when motion is reduced', () => {
    render(<CyberResponseSection items={cyberChallenges} motionEnabled={false} />);
    const consolePanel = screen.getByLabelText('Current Controllo response example');
    expect(within(consolePanel).getByText('Accountable action')).toBeInTheDocument();
    expect(within(consolePanel).getByText('Review owner assigned')).toBeInTheDocument();
    expect(observerCallback).toBeUndefined();
  });

  it('keeps the response synced to the most visible row across observer callbacks', () => {
    render(<CyberResponseSection items={cyberChallenges} motionEnabled />);
    const rows = screen.getAllByTestId(/cyber-response-row-/);
    const consolePanel = screen.getByLabelText('Current Controllo response example');

    act(() => observerCallback([{ target: rows[0], isIntersecting: true, intersectionRatio: 1 }]));
    act(() => observerCallback([{ target: rows[1], isIntersecting: true, intersectionRatio: 0.75 }]));
    expect(within(consolePanel).getByText('Secura review')).toBeInTheDocument();

    act(() => observerCallback([
      { target: rows[0], isIntersecting: true, intersectionRatio: 0.45 },
      { target: rows[1], isIntersecting: true, intersectionRatio: 1 }
    ]));
    expect(within(consolePanel).getByText('Mapped control set')).toBeInTheDocument();
  });

  it('advances the connected program timeline with the active chapter', () => {
    render(<CyberResponseSection items={cyberChallenges} motionEnabled />);
    const rows = screen.getAllByTestId(/cyber-response-row-/);
    const progress = screen.getByRole('progressbar', { name: 'Connected program timeline progress' });

    expect(progress).toHaveAttribute('aria-valuenow', '1');
    act(() => observerCallback([{ target: rows[2], isIntersecting: true, intersectionRatio: 0.8 }]));
    expect(progress).toHaveAttribute('aria-valuenow', '3');
  });

  it('keeps timeline number markers free of horizontal connector lines', () => {
    render(<CyberResponseSection items={cyberChallenges} motionEnabled />);
    const rows = screen.getAllByTestId(/cyber-response-row-/);

    rows.forEach((row) => {
      expect(row.querySelector(':scope > span[aria-hidden="true"]')).not.toBeInTheDocument();
    });
  });

  it('disconnects its observer on unmount', () => {
    const { unmount } = render(<CyberResponseSection items={cyberChallenges} motionEnabled />);
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
  });
});
