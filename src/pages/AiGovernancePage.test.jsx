import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';
import { MotionProvider } from '../context/MotionContext';
import AiGovernancePage from './AiGovernancePage';

const renderPage = () => render(
  <MemoryRouter initialEntries={['/solutions/ai-governance']}>
    <MotionProvider><AiGovernancePage /></MotionProvider>
  </MemoryRouter>
);

describe('AiGovernancePage', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/solutions/ai-governance');
  });

  it('composes the approved six-section narrative in order with route metadata', () => {
    renderPage();

    const headings = [
      'Turn AI standards into structured, actionable governance.',
      'Turn AI governance challenges into structured action.',
      'From AI inventory to risk assessment—in one workflow.',
      'Turn AI governance documentation into a readiness check.',
      'One operating layer for evolving AI requirements.',
      'Know your AI. Manage the risk. Prove readiness.'
    ].map((name) => screen.getByRole('heading', { name }));
    headings.slice(0, -1).forEach((heading, index) => {
      expect(heading.compareDocumentPosition(headings[index + 1]))
        .toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(document.title).toBe('Operational AI governance and risk | Controllo');
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://controllo.ai/solutions/ai-governance'
    );
  });
});
