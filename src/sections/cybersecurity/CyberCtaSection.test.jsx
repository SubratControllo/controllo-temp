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

  it('resolves all three quiet states under reduced motion', () => {
    render(
      <MemoryRouter>
        <CyberCtaSection content={cyberClosing} motionEnabled={false} />
      </MemoryRouter>,
    );

    const band = screen.getByTestId('cyber-resolution-band');
    expect(band).toHaveAttribute('data-motion', 'static');
    expect(within(band).getAllByRole('listitem')).toHaveLength(3);
  });

  it('keeps text, focus, and button surfaces distinct against the teal section', () => {
    render(
      <MemoryRouter>
        <CyberCtaSection content={cyberClosing} motionEnabled={false} />
      </MemoryRouter>,
    );

    const section = screen.getByRole('region', { name: cyberClosing.title });
    const eyebrow = within(section).getByText(cyberClosing.eyebrow);
    const description = within(section).getByText(cyberClosing.description);
    const proof = within(section).getByRole('list', { name: 'Cybersecurity platform proof' });
    const trial = within(section).getByRole('link', { name: 'Start Free Trial' });
    const demo = within(section).getByRole('link', { name: 'Request a Demo' });
    const statuses = within(screen.getByTestId('cyber-resolution-band')).getAllByText(/^0[1-3]$/);

    [eyebrow, description, proof, ...statuses].forEach((element) => {
      expect(element).toHaveClass('text-white');
      expect(element).not.toHaveClass('text-mint', 'text-conversion-copy');
    });
    [trial, demo].forEach((link) => expect(link).toHaveClass('focus-visible:outline-white'));
    expect(trial).toHaveClass('hover:bg-mint-soft');
    expect(demo).toHaveClass('hover:bg-mist');
    expect(trial).not.toHaveClass('hover:bg-teal');
    expect(demo).not.toHaveClass('hover:bg-teal');
  });

  it('renders the resolved band without viewport behavior when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    render(
      <MemoryRouter>
        <CyberCtaSection content={cyberClosing} motionEnabled />
      </MemoryRouter>,
    );

    const band = screen.getByTestId('cyber-resolution-band');
    expect(band).toHaveAttribute('data-motion', 'static');
    expect(band).not.toHaveStyle({ opacity: '0' });
    expect(within(band).getAllByRole('listitem')).toHaveLength(3);
  });
});
