import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const projectFile = (path) => readFileSync(resolve(process.cwd(), path), 'utf8');

describe('site favicon', () => {
  it('uses a dedicated square browser icon instead of the full-size page emblem', () => {
    const indexHtml = projectFile('index.html');
    const favicon = projectFile('public/favicon.svg');

    expect(indexHtml).toContain('rel="icon" type="image/svg+xml" href="/favicon.svg"');
    expect(favicon).toContain('viewBox="0 0 64 64"');
  });
});
