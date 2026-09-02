import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cyberFrameworks } from '../../data/cybersecurityContent';
import CyberFrameworksSection from './CyberFrameworksSection';

describe('CyberFrameworksSection', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('renders eight featured entries with only two direct detail links', () => {
    render(
      <MemoryRouter>
        <CyberFrameworksSection frameworks={cyberFrameworks} motionEnabled={false} />
      </MemoryRouter>,
    );

    const list = screen.getByRole('list', { name: 'Featured cyber and cloud frameworks' });
    const soc2Link = within(list).getByRole('link', { name: /Explore SOC 2/i });
    const iso27001Link = within(list).getByRole('link', { name: /Explore ISO\/IEC 27001/i });
    expect(within(list).getAllByRole('listitem')).toHaveLength(8);
    expect(soc2Link).toHaveAttribute('href', '/frameworks/soc-2');
    expect(iso27001Link).toHaveAttribute('href', '/frameworks/iso-27001');
    expect(soc2Link).toHaveClass('min-h-11.5');
    expect(soc2Link).not.toHaveClass('min-h-11');
    expect(iso27001Link).toHaveClass('min-h-11.5');
    expect(iso27001Link).not.toHaveClass('min-h-11');
    expect(within(list).getAllByRole('link')).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'Explore All Frameworks' })).toHaveAttribute(
      'href',
      '/frameworks',
    );
  });

  it('provides restrained hover and focus feedback for framework destinations', () => {
    render(
      <MemoryRouter>
        <CyberFrameworksSection frameworks={cyberFrameworks} motionEnabled={false} />
      </MemoryRouter>,
    );

    const allFrameworks = screen.getByRole('link', { name: 'Explore All Frameworks' });
    const soc2 = screen.getByRole('link', { name: /Explore SOC 2/i });
    expect(allFrameworks).toHaveClass('hover:text-navy', 'focus-visible:text-navy');
    expect(soc2).toHaveClass('hover:bg-mint-soft', 'focus-visible:bg-mint-soft');
  });

  it('renders all framework entries statically when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    render(
      <MemoryRouter>
        <CyberFrameworksSection frameworks={cyberFrameworks} motionEnabled />
      </MemoryRouter>,
    );

    const items = within(
      screen.getByRole('list', { name: 'Featured cyber and cloud frameworks' }),
    ).getAllByRole('listitem');
    expect(items).toHaveLength(8);
    items.forEach((item) => {
      expect(item).toHaveAttribute('data-motion', 'static');
      expect(item).not.toHaveStyle({ opacity: '0' });
    });
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
