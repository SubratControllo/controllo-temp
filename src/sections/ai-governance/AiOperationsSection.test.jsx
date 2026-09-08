import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { aiOperations } from '../../data/aiGovernanceContent';
import AiOperationsSection from './AiOperationsSection';

describe('AiOperationsSection', () => {
  it('selects the AI system and risk views by click and complete keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<AiOperationsSection content={aiOperations} motionEnabled={false} />);

    const systemsTab = screen.getByRole('tab', { name: 'AI Systems' });
    const riskTab = screen.getByRole('tab', { name: 'AI Risk Assessment' });

    expect(systemsTab).toHaveAttribute('aria-selected', 'true');
    expect(systemsTab).toHaveAttribute('aria-controls', 'ai-operations-panel-ai-systems');
    const systemsPanel = screen.getByRole('tabpanel', { name: 'AI Systems' });
    expect(within(screen.getByRole('complementary', { name: /operating workflow/i })).getAllByRole('listitem'))
      .toHaveLength(3);
    expect(screen.getByText('AI operations workspace')).toBeVisible();
    expect(screen.getByText('Inventory and risk review in one connected flow.')).toBeVisible();
    expect(systemsPanel).toHaveTextContent('Customer support assistance');
    expect(within(systemsPanel).getByText('AI system record')).toBeVisible();
    expect(within(systemsPanel).getByTestId('ai-operations-card-current')).toHaveAttribute('data-motion', 'static');
    expect(within(systemsPanel).getByText('Risk handoff')).toBeVisible();
    expect(within(systemsPanel).getByText('Context carried forward')).toBeVisible();
    expect(within(systemsPanel).queryByRole('link', { name: /context/i })).not.toBeInTheDocument();
    expect(within(systemsPanel).queryByRole('button', { name: /context/i })).not.toBeInTheDocument();
    expect(within(systemsPanel).queryByText(/illustrative/i)).not.toBeInTheDocument();

    await user.click(riskTab);

    const riskPanel = screen.getByRole('tabpanel', { name: 'AI Risk Assessment' });
    expect(riskTab).toHaveAttribute('aria-selected', 'true');
    expect(riskTab).toHaveAttribute('tabindex', '0');
    expect(riskPanel).toHaveAttribute('aria-labelledby', 'ai-operations-tab-ai-risk-assessment');
    expect(within(riskPanel).getByText('AI risk assessment')).toBeVisible();
    expect(within(riskPanel).getByTestId('ai-operations-card-current')).toHaveAttribute('data-motion', 'static');
    expect(within(riskPanel).getByText('Source system')).toBeVisible();
    expect(within(riskPanel).getByText('Likelihood')).toBeVisible();
    expect(within(riskPanel).getByText('Possible')).toBeVisible();
    expect(within(riskPanel).getByText('Impact')).toBeVisible();
    expect(within(riskPanel).getByText('Moderate')).toBeVisible();
    expect(within(riskPanel).getByText('Context carried forward')).toBeVisible();
    expect(within(riskPanel).queryByRole('link', { name: /context/i })).not.toBeInTheDocument();
    expect(within(riskPanel).queryByRole('button', { name: /context/i })).not.toBeInTheDocument();
    expect(within(riskPanel).queryByText(/illustrative/i)).not.toBeInTheDocument();

    await user.keyboard('{Home}');
    expect(systemsTab).toHaveFocus();
    expect(systemsTab).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{End}');
    expect(riskTab).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(systemsTab).toHaveFocus();
  });

  it('transitions panel bodies inside one stable active tabpanel', async () => {
    const user = userEvent.setup();
    render(<AiOperationsSection content={aiOperations} motionEnabled />);

    const panel = screen.getByRole('tabpanel', { name: 'AI Systems' });
    await user.click(screen.getByRole('tab', { name: 'AI Risk Assessment' }));

    expect(screen.getByRole('tabpanel', { name: 'AI Risk Assessment' })).toBe(panel);
    await waitFor(() => {
      expect(within(panel).getByText('Possible')).toBeVisible();
    });
    expect(within(panel).getByText('Source system')).toBeVisible();
  });
});
