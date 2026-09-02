import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { MotionProvider } from '../context/MotionContext';
import { cybersecurityMeta, cyberHero } from '../data/cybersecurityContent';
import CybersecurityPage from './CybersecurityPage';

const renderPage = () => render(
  <MemoryRouter initialEntries={['/solutions/cybersecurity']}>
    <MotionProvider><CybersecurityPage /></MotionProvider>
  </MemoryRouter>
);

describe('CybersecurityPage', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/solutions/cybersecurity');
  });

  it('composes the approved six-section narrative in order', () => {
    renderPage();
    const headings = [
      cyberHero.title,
      'Turn compliance friction into clearer action.',
      'Review each control with Secura before sharing it with an auditor.',
      'See what is connected and where attention is needed.',
      'Start with one framework. Expand when you need to.',
      'Build cyber and cloud compliance you can prove.'
    ].map((name) => screen.getByRole('heading', { name }));
    headings.slice(0, -1).forEach((heading, index) => {
      expect(heading.compareDocumentPosition(headings[index + 1]))
        .toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(screen.queryByText(/Questions, answered|Buying questions/i)).not.toBeInTheDocument();
  });

  it('publishes route metadata without unsupported language', () => {
    renderPage();
    expect(document.title).toBe(`${cybersecurityMeta.title} | Controllo`);
    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute('content', cybersecurityMeta.description);
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute('href', 'https://controllo.ai/solutions/cybersecurity');
  });
});
