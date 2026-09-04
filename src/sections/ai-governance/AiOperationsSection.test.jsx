import { render, screen, within } from '@testing-library/react';
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
    expect(screen.getByRole('tabpanel', { name: 'AI Systems' })).toHaveTextContent('Customer support assistance');

    await user.click(riskTab);

    const riskPanel = screen.getByRole('tabpanel', { name: 'AI Risk Assessment' });
    expect(riskTab).toHaveAttribute('aria-selected', 'true');
    expect(riskTab).toHaveAttribute('tabindex', '0');
    expect(riskPanel).toHaveAttribute('aria-labelledby', 'ai-operations-tab-ai-risk-assessment');
    expect(within(riskPanel).getByText('Possible')).toBeVisible();
    expect(riskPanel).toHaveTextContent(/likelihood possible/i);

    await user.keyboard('{Home}');
    expect(systemsTab).toHaveFocus();
    expect(systemsTab).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{End}');
    expect(riskTab).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    expect(systemsTab).toHaveFocus();
  });
});
