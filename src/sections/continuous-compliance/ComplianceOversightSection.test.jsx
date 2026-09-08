import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { oversightContent } from '../../data/continuousComplianceContent';
import ComplianceOversightSection from './ComplianceOversightSection';

describe('ComplianceOversightSection', () => {
  it('keeps Secura review user initiated and requires accountable human review', () => {
    render(<ComplianceOversightSection content={oversightContent} motionEnabled={false} />);

    expect(screen.getByRole('tab', { name: 'Review with Secura' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('User-initiated review');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Human review is required before any change is accepted.');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Prepared for accountable review');
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
    expect(screen.getByRole('tabpanel')).toHaveTextContent('ImplementationCurrent');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('EvidenceOutstanding');
    expect(container.textContent).not.toContain('%');
  });
});
