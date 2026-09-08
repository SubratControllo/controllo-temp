import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { complianceLoopContent } from '../../data/continuousComplianceContent';
import ComplianceLoopSection from './ComplianceLoopSection';

describe('ComplianceLoopSection', () => {
  it('changes steps only through user input and preserves keyboard focus', async () => {
    const user = userEvent.setup();
    render(<ComplianceLoopSection content={complianceLoopContent} motionEnabled={false} />);

    const scopeTab = screen.getByRole('tab', { name: /set scope/i });
    const controlsTab = screen.getByRole('tab', { name: /maintain controls/i });
    const readinessTab = screen.getByRole('tab', { name: /track readiness/i });

    expect(scopeTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Framework scope');

    scopeTab.focus();
    await user.keyboard('{ArrowDown}');
    expect(controlsTab).toHaveFocus();
    expect(controlsTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Control record');

    await user.keyboard('{End}');
    expect(readinessTab).toHaveFocus();
    expect(readinessTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Return to scope when conditions change');
  });

  it('renders a complete static product state when motion is disabled', () => {
    render(<ComplianceLoopSection content={complianceLoopContent} motionEnabled={false} />);

    expect(screen.getByText('Review, refresh, repeat')).toBeInTheDocument();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Selected');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('In scope');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Prepared');
  });
});
