import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cyberClosing } from '../../data/cybersecurityContent';
import CyberCtaSection from './CyberCtaSection';

describe('CyberCtaSection', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('uses restrained proof and the approved conversion actions', () => {
    render(
      <MemoryRouter>
        <CyberCtaSection content={cyberClosing} motionEnabled={false} />
      </MemoryRouter>,
    );

    const section = screen.getByRole('region', { name: cyberClosing.title });
    expect(within(section).getByRole('link', { name: 'Start Free Trial' })).toHaveAttribute(
      'href',
      '/pricing',
    );
    expect(within(section).getByRole('link', { name: 'Request a Demo' })).toHaveAttribute(
      'href',
      '/demo',
    );
    expect(
      within(section).getByRole('list', { name: 'Cybersecurity platform proof' }),
    ).toHaveTextContent('100+ frameworks');
    expect(section).not.toHaveTextContent(/customer|trusted by|under a minute/i);
  });

  it('renders one branded focal point and a settled background under reduced motion', () => {
    render(
      <MemoryRouter>
        <CyberCtaSection content={cyberClosing} motionEnabled={false} />
      </MemoryRouter>,
    );

    const brand = screen.getByTestId('cyber-brand-mark');
    expect(brand).toHaveAttribute('data-motion', 'static');
    expect(brand).toHaveAccessibleName('Controllo connected assurance');
    expect(brand.querySelectorAll('img[src="/assets/emblemLogo.svg"]')).toHaveLength(1);
    expect(brand.querySelector('[data-assurance-packet]')).not.toBeInTheDocument();
  });

  it('keeps the foreground simple while the assurance field owns the ambient motion', () => {
    render(
      <MemoryRouter>
        <CyberCtaSection content={cyberClosing} motionEnabled={true} />
      </MemoryRouter>,
    );

    const section = screen.getByRole('region', { name: cyberClosing.title });
    const background = section.querySelector('[data-assurance-field-background]');
    const brand = screen.getByTestId('cyber-brand-mark');

    expect(background.querySelectorAll('[data-aurora-layer]')).toHaveLength(2);
    expect(background).toHaveAttribute('data-motion', 'animated');
    expect(brand).toHaveAttribute('data-motion', 'animated');
    expect(brand).toHaveAttribute('data-ambient-motion', 'active');
    expect(brand.querySelector('[data-brand-halo]')).toBeInTheDocument();
    expect(brand.querySelector('svg, [data-assurance-packet], [data-assurance-signal]')).not.toBeInTheDocument();
    expect(section.querySelectorAll('img[src="/assets/emblemLogo.svg"]')).toHaveLength(1);
  });

  it('keeps text, focus, and button surfaces distinct against the CTA field', () => {
    render(
      <MemoryRouter>
        <CyberCtaSection content={cyberClosing} motionEnabled={false} />
      </MemoryRouter>,
    );

    const section = screen.getByRole('region', { name: cyberClosing.title });
    const proof = within(section).getByRole('list', { name: 'Cybersecurity platform proof' });
    const trial = within(section).getByRole('link', { name: 'Start Free Trial' });
    const demo = within(section).getByRole('link', { name: 'Request a Demo' });

    expect(within(section).getByText(cyberClosing.eyebrow)).toHaveClass('text-white');
    expect(within(section).getByText(cyberClosing.description)).toHaveClass('text-white');
    expect(proof).toHaveClass('text-white');
    [trial, demo].forEach((link) => expect(link).toHaveClass('focus-visible:outline-white'));
    expect(trial).toHaveClass('button', 'button--mint', 'button--directional');
    expect(demo).toHaveClass('button', 'button--light');
    expect(section).toHaveClass('cyber-cta-scene');
  });

  it('keeps the brand visible when motion is disabled', () => {
    render(
      <MemoryRouter>
        <CyberCtaSection content={cyberClosing} motionEnabled={false} />
      </MemoryRouter>,
    );

    const brand = screen.getByTestId('cyber-brand-mark');
    expect(brand).toHaveAttribute('data-motion', 'static');
    expect(brand).toHaveAttribute('data-ambient-motion', 'still');
    expect(brand).not.toHaveStyle({ opacity: '0' });
    expect(brand.querySelector('img')).toBeVisible();
  });
});
