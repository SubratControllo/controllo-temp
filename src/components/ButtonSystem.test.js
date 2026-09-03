import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const styles = readFileSync(resolve('src/styles.css'), 'utf8');

describe('shared button interaction system', () => {
  it('moves icons only when an action is explicitly directional', () => {
    expect(styles).not.toMatch(/\.button:hover\s*>\s*svg/);
    expect(styles).toMatch(/\.button--directional:hover\s*>\s*svg/);
  });

  it('defines tactile, disabled, and reduced-motion behavior centrally', () => {
    expect(styles).toMatch(/\.button:active/);
    expect(styles).toMatch(/\.button:disabled/);
    expect(styles).toMatch(
      /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.button/s,
    );
  });

  it('reuses the approved scale and clipped shine for primary variants', () => {
    expect(styles).toMatch(
      /\.button:not\(\.button--ghost\):not\(\.button--light\):not\(\.group\\\/brand-cta\)::before/,
    );
    expect(styles).toMatch(
      /\.button:not\(\.button--ghost\):not\(\.button--light\):not\(\.group\\\/brand-cta\):is\(:hover, :focus-visible\)::before[\s\S]*animation: header-cta-shine/,
    );
    expect(styles).toMatch(
      /\.button:not\(\.button--ghost\):not\(\.button--light\):hover[\s\S]*scale\(1\.015\)/,
    );
  });

  it('uses the quiet approved white-surface response for light and ghost buttons', () => {
    expect(styles).toMatch(
      /\.button--ghost:is\(:hover, :focus-visible\),[\s\S]*\.button--light:is\(:hover, :focus-visible\)[\s\S]*background-color: var\(--color-white\)[\s\S]*color: var\(--color-teal\)/,
    );
  });

  it('keeps global shine and transforms still under reduced motion', () => {
    expect(styles).toMatch(
      /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.button::before[\s\S]*animation: none !important[\s\S]*transform: translateX\(-100%\) !important/,
    );
  });
});
