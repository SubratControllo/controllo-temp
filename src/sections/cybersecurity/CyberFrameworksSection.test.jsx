import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { cyberFrameworks } from '../../data/cybersecurityContent';
import CyberFrameworksSection from './CyberFrameworksSection';

describe('CyberFrameworksSection', () => {
  it('renders eight featured entries with only two direct detail links', () => {
    render(
      <MemoryRouter>
        <CyberFrameworksSection frameworks={cyberFrameworks} motionEnabled={false} />
      </MemoryRouter>,
    );

    const list = screen.getByRole('list', { name: 'Featured cyber and cloud frameworks' });
    expect(within(list).getAllByRole('listitem')).toHaveLength(8);
    expect(within(list).getByRole('link', { name: /Explore SOC 2/i })).toHaveAttribute(
      'href',
      '/frameworks/soc-2',
    );
    expect(within(list).getByRole('link', { name: /Explore ISO\/IEC 27001/i })).toHaveAttribute(
      'href',
      '/frameworks/iso-27001',
    );
    expect(within(list).getAllByRole('link')).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'Explore All Frameworks' })).toHaveAttribute(
      'href',
      '/frameworks',
    );
  });

  it('describes reuse without promising automatic completion', () => {
    render(
      <MemoryRouter>
        <CyberFrameworksSection frameworks={cyberFrameworks} motionEnabled />
      </MemoryRouter>,
    );

    expect(screen.getByText('Shared control workspace')).toBeInTheDocument();
    expect(screen.getByText('Access governance')).toBeInTheDocument();
    expect(
      screen.queryByText(/automatically complete|automatic compliance|one-click certified/i),
    ).not.toBeInTheDocument();
  });
});
