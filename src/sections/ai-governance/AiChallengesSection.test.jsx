import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { aiChallenges } from '../../data/aiGovernanceContent';
import AiChallengesSection from './AiChallengesSection';

describe('AiChallengesSection', () => {
  it('presents the six approved AI governance challenges in their action order', () => {
    render(<AiChallengesSection content={aiChallenges} motionEnabled={false} />);

    const ledger = screen.getByRole('region', { name: /where ai governance breaks down/i });
    const entries = within(ledger).getAllByRole('listitem');

    expect(entries).toHaveLength(6);
    expect(within(entries[0]).getByText(/ai systems are difficult to inventory and track/i)).toBeInTheDocument();
    expect(within(entries[0]).getByText(/centralized ai system inventory/i)).toBeInTheDocument();
    expect(within(entries[5]).getByText(/readiness views that connect controls, evidence, risk, owners/i)).toBeInTheDocument();
    expect(within(ledger).queryByText(/comments|internal chat|auditor collaboration/i)).not.toBeInTheDocument();
  });
});
