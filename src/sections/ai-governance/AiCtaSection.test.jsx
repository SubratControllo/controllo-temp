import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { aiClosing } from '../../data/aiGovernanceContent';
import AiCtaSection from './AiCtaSection';

describe('AiCtaSection', () => {
  it('presents the approved connected-governance conversion path without an unsupported auditor claim', () => {
    render(
      <MemoryRouter>
        <AiCtaSection content={aiClosing} />
      </MemoryRouter>,
    );

    const cta = screen.getByRole('region', { name: /ai governance, connected/i });
    expect(
      within(cta).getByRole('heading', { name: /know your ai.*manage the risk.*prove readiness/i }),
    ).toBeInTheDocument();
    expect(within(cta).getByRole('link', { name: /start free trial/i })).toHaveAttribute('href', '/pricing');
    expect(within(cta).getByRole('link', { name: /request a demo/i })).toHaveAttribute('href', '/demo');
    expect(
      within(cta).getByText(/ai system inventory.*ai risk assessment.*secura ai guidance.*framework readiness/i),
    ).toBeInTheDocument();
    expect(within(cta).queryByText(/built by auditors/i)).not.toBeInTheDocument();
  });
});
