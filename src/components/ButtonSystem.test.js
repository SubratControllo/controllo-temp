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
});
