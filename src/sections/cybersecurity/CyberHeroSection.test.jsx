import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { cyberHero } from '../../data/cybersecurityContent';
import CyberHeroSection from './CyberHeroSection';

const renderHero = (motionEnabled = false) => render(
  <MemoryRouter>
    <CyberHeroSection content={cyberHero} motionEnabled={motionEnabled} />
  </MemoryRouter>
);

describe('CyberHeroSection', () => {
  it('presents the approved outcome and three distinct actions', () => {
    renderHero();
    const hero = screen.getByRole('region', { name: cyberHero.title });
    expect(within(hero).getByRole('heading', { level: 1, name: cyberHero.title })).toBeInTheDocument();
    expect(within(hero).getByRole('link', { name: 'Start Free Trial' })).toHaveAttribute('href', '/pricing');
    expect(within(hero).getByRole('link', { name: 'Request a Demo' })).toHaveAttribute('href', '/demo');
    expect(within(hero).getByRole('link', { name: 'Explore the Platform' })).toHaveAttribute('href', '/platform');
  });

  it('separates assurance work from operational context without connectors', () => {
    renderHero();
    const graphic = screen.getByRole('img', { name: 'Illustrative assurance and environment overview' });
    expect(within(graphic).getByText('Assurance work')).toBeInTheDocument();
    expect(within(graphic).getByText('Operational context')).toBeInTheDocument();
    expect(graphic.querySelector('[data-cloud-control-connector]')).not.toBeInTheDocument();
  });

  it('renders its resolved state when motion is disabled', () => {
    renderHero(false);
    expect(screen.getByTestId('assurance-horizon')).toHaveAttribute('data-motion', 'static');
    expect(screen.getByTestId('assurance-horizon')).toHaveAttribute('data-state', 'resolved');
  });
});
