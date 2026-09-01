import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { cyberClosing } from '../../data/cybersecurityContent';
import CyberCtaSection from './CyberCtaSection';

describe('CyberCtaSection', () => {
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
});
