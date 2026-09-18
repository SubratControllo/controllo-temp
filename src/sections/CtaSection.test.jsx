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
  it('describes framework-first growth without unsupported package claims', () => {
    renderSection();

    const section = screen.getByRole('region', {
      name: /a clearer compliance program starts here/i
    });

    expect(within(section).getByText(
      /start with the frameworks relevant to your business, then connect controls, evidence, risks, and ownership as your assurance program grows/i
    )).toBeInTheDocument();
    expect(within(section).queryByText(/focused package/i)).not.toBeInTheDocument();
  });

  it('presents one demo action while trial promotion is paused', () => {
    renderSection();

    const section = screen.getByRole('region', {
      name: /a clearer compliance program starts here/i
    });
    const demo = within(section).getByRole('link', { name: /request a demo/i });

    expect(within(section).queryByRole('link', { name: /start free trial/i })).not.toBeInTheDocument();
    expect(demo).toHaveAttribute('href', '/demo');
    expect(demo).toHaveClass('button--directional');
    expect(demo.querySelector('.lucide-calendar-days')).toBeInTheDocument();
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
    expect(emblem).toHaveAttribute('viewBox', '-18 -18 317 364');
    expect(emblem.querySelectorAll('path')).toHaveLength(3);
    expect(emblemField.querySelectorAll('img')).toHaveLength(0);
  });

  it('gates emblem hover separation behind the motion preference', () => {
    const { rerender } = renderSection(true);
    const interactiveField = document.querySelector('.cta-emblem-field');

    expect(interactiveField).toHaveAttribute('data-motion', 'interactive');
    expect(interactiveField.querySelectorAll('.cta-emblem-field__segment')).toHaveLength(3);

    rerender(
      <MemoryRouter>
        <CtaSection motionEnabled={false} />
      </MemoryRouter>
    );

    expect(document.querySelector('.cta-emblem-field')).toHaveAttribute('data-motion', 'static');
  });

  it('keeps the temporary demo action primary', () => {
    renderSection(true);

    const demo = screen.getByRole('link', { name: /request a demo/i });

    expect(demo).toHaveClass('button--directional');
    expect(screen.queryByRole('link', { name: /start free trial/i })).not.toBeInTheDocument();
  });
});
