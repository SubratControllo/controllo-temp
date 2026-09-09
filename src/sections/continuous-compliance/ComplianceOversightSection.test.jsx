import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { oversightContent } from '../../data/continuousComplianceContent';
import ComplianceOversightSection from './ComplianceOversightSection';

describe('ComplianceOversightSection', () => {
  it('keeps Secura review user initiated and requires accountable human review', () => {
    const { container } = render(<ComplianceOversightSection content={oversightContent} motionEnabled={false} />);

    expect(screen.getByRole('tab', { name: 'Review with Secura' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('User-initiated review');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Human review is required before any change is accepted.');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Prepared for accountable review');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Link the latest approved access-review record.');
    expect(screen.getByRole('tabpanel').querySelector('[data-motion-state]')).toHaveAttribute('data-motion-state', 'settled');
    expect(container.querySelectorAll('[data-review-flow]')).toHaveLength(2);
    expect(container.querySelector('.continuous-review__trace > span')).not.toBeInTheDocument();
    expect(container.querySelector('.continuous-review__recommendation [data-review-flow="vertical"]')).toBeInTheDocument();
    expect(container.querySelector('[data-review-flow="vertical"] .continuous-review__trace-current')).toHaveAttribute('d', 'M6 0 V32');
    expect(container.querySelector('[data-review-flow="vertical"] .continuous-review__trace-head')).toHaveAttribute('d', 'M2.1 25.5 L6 32 L9.9 25.5');
    container.querySelectorAll('.continuous-review__trace-current').forEach((path) => {
      expect(path).not.toHaveAttribute('pathLength');
      expect(path).not.toHaveAttribute('stroke-dasharray');
      expect(path).not.toHaveAttribute('stroke-dashoffset');
    });
    expect(screen.queryByText(/automatically|autonomous/i)).not.toBeInTheDocument();
  });

  it('supports keyboard selection and shows qualitative readiness signals only', async () => {
    const user = userEvent.setup();
    const { container } = render(<ComplianceOversightSection content={oversightContent} motionEnabled={false} />);
    const securaTab = screen.getByRole('tab', { name: 'Review with Secura' });
    const readinessTab = screen.getByRole('tab', { name: 'Track readiness' });

    securaTab.focus();
    await user.keyboard('{ArrowRight}');

    expect(readinessTab).toHaveFocus();
    expect(readinessTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('See readiness through the work that supports it.');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('ImplementationCurrent');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('EvidenceOutstanding');
    expect(container.querySelector('.continuous-readiness__segments')).not.toBeInTheDocument();
    expect(container.textContent).not.toContain('%');
  });

  it('keeps view selection manual instead of advancing on a timer', () => {
    vi.useFakeTimers();
    render(<ComplianceOversightSection content={oversightContent} motionEnabled={false} />);

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(screen.getByRole('tab', { name: 'Review with Secura' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Track readiness' })).toHaveAttribute('aria-selected', 'false');
    vi.useRealTimers();
  });
});
