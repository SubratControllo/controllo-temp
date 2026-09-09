import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { continuousComplianceClosing } from '../../data/continuousComplianceContent';
import ContinuousComplianceCtaSection from './ContinuousComplianceCtaSection';

function renderSection(motionEnabled = false) {
  return render(
    <MemoryRouter>
      <ContinuousComplianceCtaSection
        content={continuousComplianceClosing}
        motionEnabled={motionEnabled}
      />
    </MemoryRouter>,
  );
}

describe('ContinuousComplianceCtaSection', () => {
  it('preserves the complete heading and selected conversion destinations', () => {
    const { container } = renderSection();
    const conversion = container.querySelector('.continuous-cta__conversion');

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Make your next audit a review, not a restart.',
      }),
    ).toBeInTheDocument();
    expect(within(conversion).getByRole('link', { name: 'Start free trial' })).toHaveAttribute(
      'href',
      '/pricing',
    );
    expect(within(conversion).getByRole('link', { name: 'Request a demo' })).toHaveAttribute(
      'href',
      '/demo',
    );
    expect(within(conversion).getByText(continuousComplianceClosing.proof)).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('uses a decorative Controllo watermark without the former network artwork', () => {
    const { container } = renderSection();
    const field = container.querySelector('[data-continuous-cta-field]');
    const watermark = container.querySelector('[data-continuous-cta-watermark]');

    expect(field).toHaveAttribute('aria-hidden', 'true');
    expect(watermark).toHaveAttribute('src', '/assets/emblemLogo.svg');
    expect(watermark).toHaveAttribute('alt', '');
    const accent = container.querySelector('[data-gradient-flow]');

    expect(accent).toHaveClass('continuous-cta__title-accent');
    expect(accent).toHaveTextContent('a review, not a restart.');
    expect(container.querySelector('.continuous-cta__node')).not.toBeInTheDocument();
    expect(container.querySelector('.continuous-cta__core')).not.toBeInTheDocument();
    expect(field.querySelector('svg')).not.toBeInTheDocument();
    expect(container.querySelector('form, video, canvas')).not.toBeInTheDocument();
  });

  it('renders the completed composition immediately when motion is paused', () => {
    const { container } = renderSection(false);
    const section = screen.getByRole('region', {
      name: 'Make your next audit a review, not a restart.',
    });

    expect(section).toHaveAttribute('data-motion', 'static');
    expect(container.querySelector('[data-continuous-cta-field]')).toHaveAttribute(
      'data-motion',
      'static',
    );
    expect(screen.getByText(continuousComplianceClosing.description)).toBeVisible();
    expect(screen.getByText(continuousComplianceClosing.proof)).toBeVisible();
  });

  it('does not import claims or identifying content from the visual reference', () => {
    const { container } = renderSection();
    const text = container.textContent;

    expect(text).not.toMatch(/Amplemarket|Gartner|G2|sales superpowers/i);
    expect(text).not.toMatch(/award|10\+ hours|bounce rate|meetings/i);
    expect(text).not.toMatch(/always-on|autonomous|real-time|continuous control testing/i);
    expect(text).not.toContain('%');
  });
});
