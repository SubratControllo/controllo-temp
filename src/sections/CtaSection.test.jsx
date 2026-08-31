import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CtaSection from './CtaSection';

const renderSection = (motionEnabled = false) => render(
  <MemoryRouter>
    <CtaSection motionEnabled={motionEnabled} />
  </MemoryRouter>
);

describe('CtaSection', () => {
  it('presents distinct trial and demo actions inside a named conversion region', () => {
    renderSection();

    const section = screen.getByRole('region', {
      name: /a clearer compliance program starts here/i
    });
    const trial = within(section).getByRole('link', { name: /start free trial/i });
    const demo = within(section).getByRole('link', { name: /request a demo/i });

    expect(trial).toHaveAttribute('href', '/pricing');
    expect(trial).toHaveClass('button--directional');
    expect(trial.querySelector('.lucide-arrow-right')).toBeInTheDocument();
    expect(demo).toHaveAttribute('href', '/demo');
    expect(demo).not.toHaveClass('button--directional');
    expect(demo.querySelector('.lucide-calendar-days')).toBeInTheDocument();
    expect(demo.querySelector('.lucide-arrow-right')).not.toBeInTheDocument();
  });

  it('renders one decorative three-segment emblem instead of duplicated marks', () => {
    renderSection();

    const section = screen.getByRole('region', {
      name: /a clearer compliance program starts here/i
    });
    const emblemField = section.querySelector('.cta-emblem-field');
    const emblem = emblemField.querySelector('.cta-emblem-field__svg');

    expect(emblemField).toHaveAttribute('aria-hidden', 'true');
    expect(emblem).toBeInTheDocument();
    expect(emblem.querySelectorAll('path')).toHaveLength(3);
    expect(emblemField.querySelectorAll('img')).toHaveLength(0);
  });

  it('pairs the navbar primary hover treatment with the quieter hero secondary response', () => {
    renderSection(true);

    const trial = screen.getByRole('link', { name: /start free trial/i });
    const demo = screen.getByRole('link', { name: /request a demo/i });

    expect(trial).toHaveClass('group/brand-cta');
    expect(trial.className).toContain('overflow-hidden');
    expect(trial.className).toContain('hover:scale-[1.015]');
    expect(trial.className).toContain('focus-visible:scale-[1.015]');
    expect(screen.getByTestId('final-primary-cta-shine')).toBeInTheDocument();
    expect(screen.getByTestId('final-primary-cta-icon')).toBeInTheDocument();

    expect(demo.className).toContain('hover:translate-y-0');
    expect(demo.className).toContain('hover:bg-white');
    expect(demo.className).toContain('hover:text-teal');
    expect(demo.className).toContain('focus-visible:text-teal');
    expect(demo).not.toHaveClass('group/brand-cta');
  });
});
