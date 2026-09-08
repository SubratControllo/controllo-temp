import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HeroTitleText from './HeroTitleText';

describe('HeroTitleText', () => {
  it('colors the selected phrase without adding emphasis markup', () => {
    render(
      <h1>
        <HeroTitleText accent="AI standards" title="Turn AI standards into action." />
      </h1>,
    );

    const accent = screen.getByText('AI standards');
    expect(accent.tagName).toBe('SPAN');
    expect(accent).toHaveClass('hero-title-accent');
    expect(screen.getByRole('heading').querySelector('em')).toBeNull();
  });

  it('preserves the original title when the configured phrase is stale', () => {
    render(
      <h1>
        <HeroTitleText accent="Old phrase" title="Updated title" />
      </h1>,
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Updated title');
    expect(screen.queryByText('Old phrase')).not.toBeInTheDocument();
  });
});
