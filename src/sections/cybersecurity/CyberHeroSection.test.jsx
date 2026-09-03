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
  it('presents the focused outcome and two distinct actions', () => {
    renderHero();
    const hero = screen.getByRole('region', { name: cyberHero.title });
    expect(within(hero).getByRole('heading', { level: 1, name: cyberHero.title })).toBeInTheDocument();
    expect(within(hero).getByRole('link', { name: 'Start Free Trial' })).toHaveAttribute('href', '/pricing');
    expect(within(hero).getByRole('link', { name: 'Request a Demo' })).toHaveAttribute('href', '/demo');
    expect(within(hero).queryByRole('link', { name: 'Explore the Platform' })).not.toBeInTheDocument();
  });

  it('builds the central branded product object without the old dashboard image', () => {
    renderHero();
    const graphic = screen.getByRole('figure', { name: 'Controllo connected assurance proof cluster' });
    const dashboard = within(graphic).getByTestId('cyber-hero-dashboard');
    expect(within(dashboard).getByTestId('cyber-dashboard-emblem')).toHaveAttribute('src', '/assets/emblemLogo.svg');
    expect(dashboard.querySelector('img[src="/assets/dashboard.webp"]')).not.toBeInTheDocument();
    expect(within(dashboard).getByRole('heading', { level: 3, name: 'Access review' })).toBeInTheDocument();
    expect(within(dashboard).getByText('SOC 2 · CC6.2B')).toBeInTheDocument();
    expect(within(dashboard).getByText('Control workspace')).toBeInTheDocument();
    expect(dashboard.querySelectorAll('[data-dashboard-sheet]')).toHaveLength(0);
    const sidebar = within(dashboard).getByTestId('cyber-dashboard-navigation');
    expect(sidebar).toHaveAttribute('aria-hidden', 'true');
    expect(sidebar.querySelectorAll('svg')).toHaveLength(7);
    expect(within(graphic).queryByText('Product view')).not.toBeInTheDocument();
    expect(within(graphic).queryByText('One connected view')).not.toBeInTheDocument();
    expect(graphic).toHaveClass('pointer-events-none', 'select-none');
  });

  it('keeps accountable review context visible inside the workspace', () => {
    renderHero();
    const dashboard = screen.getByTestId('cyber-hero-dashboard');
    const context = within(dashboard).getByRole('list', { name: 'Review context' });
    expect(within(context).getAllByRole('listitem')).toHaveLength(3);
    expect(within(context).getByRole('listitem', { name: 'Owner: Assigned' })).toBeInTheDocument();
    expect(within(context).getByRole('listitem', { name: 'Evidence freshness: Review needed' })).toBeInTheDocument();
    expect(within(context).getByRole('listitem', { name: 'Audit scope: Scoped' })).toBeInTheDocument();
  });

  it('uses product-verified control states and connected artifacts', () => {
    renderHero();
    const dashboard = screen.getByTestId('cyber-hero-dashboard');
    const reviewStates = within(dashboard).getByRole('list', { name: 'Control review states' });
    expect(within(reviewStates).getAllByRole('listitem')).toHaveLength(4);
    expect(within(reviewStates).getByRole('listitem', { name: 'Implementation: Current' })).toBeInTheDocument();
    expect(within(reviewStates).getByRole('listitem', { name: 'Policy & Procedure: Linked' })).toBeInTheDocument();
    expect(within(reviewStates).getByRole('listitem', { name: 'Evidence: Review needed' })).toBeInTheDocument();
    expect(within(reviewStates).getByRole('listitem', { name: 'Audit: Scoped' })).toBeInTheDocument();

    const artifacts = within(dashboard).getByRole('list', { name: 'Connected control artifacts' });
    expect(within(artifacts).getAllByRole('listitem')).toHaveLength(2);
    expect(within(artifacts).getByRole('listitem', { name: 'Access review record: Evidence' })).toBeInTheDocument();
    expect(within(artifacts).getByRole('listitem', { name: 'User access management: Policy & Procedure' })).toBeInTheDocument();
  });

  it('surrounds the product with four connected assurance signals', () => {
    renderHero();
    const graphic = screen.getByRole('figure', { name: 'Controllo connected assurance proof cluster' });
    const signals = within(graphic).getByRole('list', { name: 'Connected assurance proof cards' });
    expect(signals.children).toHaveLength(4);
    [...signals.children].forEach((signal) => {
      expect(signal).toHaveAttribute('data-motion-origin', 'dashboard');
    });
    const securaCard = within(signals).getByRole('listitem', { name: 'Secura AI: 2 gaps identified' });
    expect(within(securaCard).getByTestId('cyber-secura-mark')).toHaveAttribute('src', '/assets/secura-mark.svg');
    const cloudCard = within(signals).getByRole('listitem', { name: 'Cloud security: 3 configuration risks' });
    expect(within(cloudCard).getByText('Updated now')).toBeInTheDocument();
    const cloudSources = within(cloudCard).getByRole('list', { name: 'Supported cloud sources' });
    expect(within(cloudSources).getAllByRole('listitem')).toHaveLength(3);
    expect(within(cloudSources).getByRole('listitem', { name: 'AWS' })).toBeInTheDocument();
    expect(within(cloudSources).getByRole('listitem', { name: 'Microsoft Azure' })).toBeInTheDocument();
    expect(within(cloudSources).getByRole('listitem', { name: 'Google Cloud' })).toBeInTheDocument();
    expect([...cloudSources.querySelectorAll('[data-brand-logo]')].map((logo) => logo.getAttribute('src'))).toEqual([
      '/assets/brands/aws.svg',
      '/assets/brands/microsoft-azure.svg',
      '/assets/brands/google-cloud.svg'
    ]);
    const identityCard = within(signals).getByRole('listitem', { name: 'Identity & endpoint risk: 1 exposed identity' });
    expect(within(identityCard).getByText('Microsoft 365 · Dark Web')).toBeInTheDocument();
    expect(within(identityCard).getByTestId('identity-risk-sparkline')).toHaveAttribute('aria-hidden', 'true');
    expect(within(signals).getByRole('listitem', { name: 'Framework coverage: Mapped' })).toBeInTheDocument();
    expect(within(signals).queryByRole('listitem', { name: 'Evidence: Reviewable' })).not.toBeInTheDocument();
  });

  it('connects the evidence attention state to the Secura result', () => {
    renderHero(true);
    const evidence = screen.getByRole('listitem', { name: 'Evidence: Review needed' });
    const secura = screen.getByRole('listitem', { name: 'Secura AI: 2 gaps identified' });

    expect(evidence).toHaveAttribute('data-story-signal', 'source');
    expect(secura).toHaveAttribute('data-story-signal', 'response');
  });

  it('uses one transient dashboard-origin signal only when motion is enabled', () => {
    const { unmount } = renderHero(true);
    expect(screen.getByTestId('cyber-hero-signal-burst')).toHaveAttribute('aria-hidden', 'true');

    unmount();
    renderHero(false);
    expect(screen.queryByTestId('cyber-hero-signal-burst')).not.toBeInTheDocument();
  });

  it('renders its resolved state when motion is disabled', () => {
    renderHero(false);
    expect(screen.getByTestId('assurance-horizon')).toHaveAttribute('data-motion', 'static');
    expect(screen.getByTestId('assurance-horizon')).toHaveAttribute('data-state', 'resolved');
  });

  it('keeps the three-dimensional dashboard opaque and unscaled from its first animated frame', () => {
    renderHero(true);
    const dashboard = screen.getByTestId('cyber-hero-dashboard');

    expect(dashboard).toHaveStyle({ opacity: '1' });
    expect(dashboard.style.transform).not.toContain('scale');
  });

  it('moves two official Controllo marks forward on one background orbit', () => {
    renderHero(true);
    const graphic = screen.getByRole('figure', { name: 'Controllo connected assurance proof cluster' });
    const field = within(graphic).getByTestId('cyber-hero-orbit-field');
    const emblems = within(field).getAllByTestId('cyber-hero-orbit-emblem');
    const tracks = field.querySelectorAll('.cyber-hero-orbit-track');

    expect(graphic.querySelectorAll('.cyber-hero-orbit')).toHaveLength(1);
    expect(tracks).toHaveLength(1);
    expect(within(tracks[0]).getAllByTestId('cyber-hero-orbit-emblem')).toHaveLength(2);
    expect(field).toHaveAttribute('data-motion', 'animated');
    expect(field).toHaveAttribute('data-layer', 'behind-dashboard');
    expect(field).toHaveAttribute('aria-hidden', 'true');
    expect(emblems).toHaveLength(2);
    emblems.forEach((emblem) => {
      expect(emblem).toHaveAttribute('src', '/assets/emblemLogo.svg');
      expect(emblem.closest('.cyber-hero-orbit-planet')).toHaveAttribute('data-direction', 'forward');
    });
  });
});
