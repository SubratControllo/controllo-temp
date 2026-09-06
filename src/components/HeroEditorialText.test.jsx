import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HeroEditorialText from './HeroEditorialText';

describe('HeroEditorialText', () => {
  it('marks the selected phrase without changing the complete title', () => {
    render(
      <h1>
        <HeroEditorialText
          accent="AI standards"
          title="Turn AI standards into structured governance."
        />
      </h1>,
    );

    expect(screen.getByRole('heading')).toHaveTextContent(
      'Turn AI standards into structured governance.',
    );
    expect(screen.getByText('AI standards')).toHaveClass(
      'hero-editorial-accent',
    );
  });

  it('renders the original title once when the accent is not present', () => {
    render(
      <h1>
        <HeroEditorialText
          accent="Outdated phrase"
          title="A newly edited hero title."
        />
      </h1>,
    );

    expect(screen.getByRole('heading')).toHaveTextContent(
      'A newly edited hero title.',
    );
    expect(screen.queryByText('Outdated phrase')).not.toBeInTheDocument();
  });
});
