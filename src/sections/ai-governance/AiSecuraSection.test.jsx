import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { aiSecura } from '../../data/aiGovernanceContent';
import AiSecuraSection from './AiSecuraSection';

describe('AiSecuraSection', () => {
  it('presents a simplified Secura review visual without unsafe claims or fake actions', () => {
    render(<AiSecuraSection content={aiSecura} motionEnabled={false} />);

    const section = screen.getByRole('region', { name: /secura ai for ai governance/i });
    expect(within(section).getByRole('heading', { name: /documentation into a readiness check/i })).toBeInTheDocument();
    expect(within(section).getByRole('figure', { name: /representative secura control review/i }))
      .toBeInTheDocument();
    expect(within(section).getByText('Secura control review')).toBeVisible();
    expect(within(section).getByText('Needs attention')).toBeInTheDocument();
    expect(within(section).getByText(/does not demonstrate the latest approved ai-risk review/i)).toBeInTheDocument();
    expect(within(section).getByText(/add the current ai-risk assessment and ownership record/i)).toBeInTheDocument();
    expect(within(section).getByText(/human review required/i)).toBeInTheDocument();
    expect(within(section).getAllByTestId('ai-secura-review-row')).toHaveLength(4);
    expect(within(section).getAllByTestId('ai-secura-orbit-node')).toHaveLength(8);
    expect(within(section).queryByTestId('ai-secura-orbit-sprite')).not.toBeInTheDocument();
    expect(within(section).queryByText(/illustrative/i)).not.toBeInTheDocument();
    expect(within(section).queryByText(/under one minute|autonomous|star for ai|built by auditors|chat/i))
      .not.toBeInTheDocument();
    expect(within(section).queryByRole('link')).not.toBeInTheDocument();
    expect(within(section).queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders the complete static Secura visual when motion is disabled', () => {
    render(<AiSecuraSection content={aiSecura} motionEnabled={false} />);

    const section = screen.getByRole('region', { name: /secura ai for ai governance/i });
    const visual = within(section).getByTestId('ai-secura-visual');

    expect(visual).toHaveAttribute('data-motion', 'static');
    expect(within(visual).getAllByTestId('ai-secura-orbit-node')).toHaveLength(8);
    expect(within(visual).queryByTestId('ai-secura-orbit-sprite')).not.toBeInTheDocument();
    expect(within(visual).queryByText('Review current')).not.toBeInTheDocument();
    expect(within(visual).queryByText('Human approval')).not.toBeInTheDocument();
    aiSecura.review.inputs.forEach((input) => {
      expect(within(visual).getByText(input)).toBeInTheDocument();
    });
  });
});
