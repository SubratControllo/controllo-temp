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
    expect(hero.querySelector('.ai-governance-hero-layout')).toBeInTheDocument();
    expect(within(hero).getByRole('heading', {
      level: 1,
      name: /turn ai standards into structured, actionable governance/i
    })).toBeInTheDocument();
    expect(within(hero).getByRole('heading', { level: 1 }).querySelector('em')).toBeNull();
    const titleAccent = within(hero).getByText('AI standards', { exact: true });
    expect(titleAccent.tagName).toBe('SPAN');
    expect(titleAccent).toHaveClass('hero-title-accent');
    expect(within(hero).getByRole('link', { name: /start free trial/i }))
      .toHaveAttribute('href', '/pricing');
    expect(within(hero).getByRole('link', { name: /request a demo/i }))
      .toHaveAttribute('href', '/demo');
    expect(within(hero).getByRole('figure', { name: /representative ai governance workflow/i }))
      .toHaveAttribute('data-motion-state', 'settled');
    expect(within(hero).getByText('AI governance workspace')).toBeVisible();
    expect(within(hero).getByText('Systems, ownership, risk, and frameworks in one view.'))
      .toBeVisible();
    expect(within(hero).queryByText(/illustrative product view|product view|governance current|readiness lens/i))
      .not.toBeInTheDocument();
    const connection = within(hero).getByRole('list', { name: /ai governance workflow stages/i });
    ['AI system', 'Accountable owner', 'Risk assessment', 'Framework context'].forEach((label) => {
      expect(within(connection).getByText(label, { exact: true })).toBeInTheDocument();
    });
    expect(within(hero).queryByText(/star for ai|under one minute|built by auditors/i))
      .not.toBeInTheDocument();
  });

  it('identifies the representative workflow as live when motion is enabled', () => {
    render(
      <MemoryRouter>
        <AiHeroSection content={aiHero} motionEnabled />
      </MemoryRouter>
    );

    expect(screen.getByRole('figure', { name: /representative ai governance workflow/i }))
      .toHaveAttribute('data-motion-state', 'live');
  });

  it('finishes the hero with the shared animated wave divider', () => {
    const { container } = render(
      <MemoryRouter>
        <AiHeroSection content={aiHero} motionEnabled />
      </MemoryRouter>
    );

    const hero = screen.getByRole('region', { name: /operational ai governance/i });
    const divider = container.querySelector('.wave-divider[aria-hidden="true"]');

    expect(hero).toHaveClass('ai-governance-hero', 'pb-44', 'max-[760px]:pb-48');
    expect(divider).toBeInTheDocument();
    expect(divider.querySelectorAll('svg')).toHaveLength(3);
    expect(divider.querySelector('.wave-divider__wave--front path')).toHaveAttribute('fill', '#F3F8F6');
  });
});
