import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import BlogSection from './BlogSection';

const verifiedArticles = [
  {
    title: 'Continuous Compliance – Simplify Security & Regulatory Management',
    href: '/blog/continuous-compliance/'
  },
  {
    title: 'ISO 27001 vs SOC 2—Which Is Best for Your Business?',
    href: '/blog/iso-27001-vs-soc-2-which-is-best/'
  },
  {
    title: 'How ISO 42001 Enhances AI Governance and Ethics',
    href: '/blog/iso-42001-enhances-ai-governance/'
  }
];

describe('BlogSection', () => {
  it('presents each story as a named article landmark', () => {
    render(<BlogSection motionEnabled={false} />);

    const section = screen.getByRole('region', {
      name: /practical guidance for compliance work that keeps changing/i
    });

    verifiedArticles.forEach(({ title }) => {
      expect(within(section).getByRole('article', { name: title })).toBeInTheDocument();
    });
  });

  it('uses the verified WordPress destinations for the archive and articles', () => {
    render(<BlogSection motionEnabled={false} />);

    expect(screen.getByRole('link', { name: /explore all articles/i })).toHaveAttribute('href', '/blogs/');

    verifiedArticles.forEach(({ title, href }) => {
      const article = screen.getByRole('article', { name: title });
      expect(within(article).getByRole('link', { name: /read article/i })).toHaveAttribute('href', href);
    });
  });
});
