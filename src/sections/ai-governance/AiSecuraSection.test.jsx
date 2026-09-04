import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { aiSecura } from '../../data/aiGovernanceContent';
import AiSecuraSection from './AiSecuraSection';

describe('AiSecuraSection', () => {
  it('presents a review finding and accountable human decision without unsafe claims', () => {
    render(<AiSecuraSection content={aiSecura} motionEnabled={false} />);

    const section = screen.getByRole('region', { name: /secura ai for ai governance/i });
    expect(within(section).getByRole('heading', { name: /documentation into a readiness check/i })).toBeInTheDocument();
    expect(within(section).getByText('Needs attention')).toBeInTheDocument();
    expect(within(section).getByText(/does not demonstrate the latest approved ai-risk review/i)).toBeInTheDocument();
    expect(within(section).getByText(/human review required/i)).toBeInTheDocument();
    expect(within(section).queryByText(/under one minute|autonomous|star for ai|chat/i)).not.toBeInTheDocument();
  });
});
