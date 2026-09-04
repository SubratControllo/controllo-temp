import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { aiHero } from '../../data/aiGovernanceContent';
import AiHeroSection from './AiHeroSection';

describe('AiHeroSection', () => {
  it('presents the approved operational governance promise and actions', () => {
    render(
      <MemoryRouter>
        <AiHeroSection content={aiHero} motionEnabled={false} />
      </MemoryRouter>
    );

    const hero = screen.getByRole('region', { name: /operational ai governance/i });
    expect(within(hero).getByRole('heading', {
      level: 1,
      name: /turn ai standards into structured, actionable governance/i
    })).toBeInTheDocument();
    expect(within(hero).getByRole('link', { name: /start free trial/i }))
      .toHaveAttribute('href', '/pricing');
    expect(within(hero).getByRole('link', { name: /request a demo/i }))
      .toHaveAttribute('href', '/demo');
    expect(within(hero).getByRole('figure', { name: /illustrative connected ai dossier/i }))
      .toHaveAttribute('data-motion-state', 'settled');
    expect(within(hero).queryByText(/star for ai|under one minute|built by auditors/i))
      .not.toBeInTheDocument();
  });
});
