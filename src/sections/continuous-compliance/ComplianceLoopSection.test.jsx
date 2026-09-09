import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { complianceLoopContent } from '../../data/continuousComplianceContent';
import ComplianceLoopSection, { getLoopStepIndex } from './ComplianceLoopSection';

describe('ComplianceLoopSection', () => {
  it('maps the full scroll range across all five operating steps', () => {
    expect(getLoopStepIndex(0, 5)).toBe(0);
    expect(getLoopStepIndex(0.2, 5)).toBe(1);
    expect(getLoopStepIndex(0.8, 5)).toBe(4);
    expect(getLoopStepIndex(1, 5)).toBe(4);
  });

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
    const { container } = render(<ComplianceLoopSection content={complianceLoopContent} motionEnabled={false} />);

    expect(screen.getByRole('region', { name: complianceLoopContent.title })).toHaveAttribute('data-motion', 'static');
    expect(container.querySelector('[data-slot="interactive-square-grid"]')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('Continue with')).toBeInTheDocument();
    expect(screen.getByText('Keep the record current')).toBeInTheDocument();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Selected');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('In scope');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Mapped');
  });

  it('enables the ambient grid field only when motion is enabled', () => {
    render(<ComplianceLoopSection content={complianceLoopContent} motionEnabled />);

    expect(screen.getByRole('region', { name: complianceLoopContent.title })).toHaveAttribute('data-motion', 'animated');
  });
});
