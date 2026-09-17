import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { MotionProvider } from '../context/MotionContext';
import SecuraAiPage from './SecuraAiPage';

function renderPage() {
  render(
    <MotionProvider>
      <MemoryRouter initialEntries={['/platform/secura-ai']}><SecuraAiPage /></MemoryRouter>
    </MotionProvider>,
  );
}

describe('SecuraAiPage', () => {
  it('renders the complete seven section content flow in order', () => {
    renderPage();

    const headings = [
      'Know what’s missing. Know what to review next.',
      'One control. Every relevant source in context.',
      'Deep gap analysis, structured for review.',
      'Not just a finding. The full picture.',
      'Spend less time assembling the first review. Focus on what needs attention.',
      'Review potential gaps before formal assessment.',
      'Give Secura a control. See what your team may have missed.',
    ].map((name) => screen.getByRole('heading', { name }));

    headings.slice(0, -1).forEach((heading, index) => {
      expect(heading.compareDocumentPosition(headings[index + 1])).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });
    const pageSections = [...document.body.firstElementChild.children].filter((element) => element.tagName === 'SECTION');
    expect(pageSections).toHaveLength(7);
  });

  it('keeps claims reviewable and CTA destinations explicit', () => {
    renderPage();

    const hero = screen.getByRole('heading', { level: 1 }).closest('section');
    expect(within(hero).getByRole('link', { name: 'Request a demo' })).toHaveAttribute('href', '/demo');
    const securaBanner = within(hero).getByRole('link', { name: 'Request a Secura AI demo' });
    expect(securaBanner).toHaveAttribute('href', '/demo');
    expect(securaBanner).toHaveAttribute('data-banner-visible', 'false');
    fireEvent.mouseEnter(securaBanner);
    expect(securaBanner).toHaveAttribute('data-banner-visible', 'false');
    fireEvent.mouseLeave(securaBanner);
    fireEvent.focus(securaBanner);
    expect(securaBanner).toHaveAttribute('data-banner-visible', 'true');
    fireEvent.blur(securaBanner);
    expect(securaBanner).toHaveAttribute('data-banner-visible', 'false');
    expect(within(hero).getByRole('link', { name: 'See a sample control review' })).toHaveAttribute('href', '#secura-output');
    expect(within(hero).getByRole('article', { name: 'Illustrative Secura control review' })).toBeInTheDocument();
    expect(within(hero).getByText('I’m Secura, Your AI Consultant.')).toBeInTheDocument();
    expect(within(hero).getByText('Fetching control details')).toBeInTheDocument();
    expect(within(hero).getByText(/Secura activates inside the Control Details screen/)).toBeInTheDocument();
    expect(screen.getByText(/your team and auditor remain responsible for the final judgment/i)).toBeInTheDocument();
    expect(screen.queryByText(/in seconds/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/all file types/i)).not.toBeInTheDocument();
    expect(document.title).toBe('Secura AI for Compliance Gap Analysis | Controllo');
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute('content', expect.stringContaining('prepares next actions for human review'));
  });

  it('runs the complete centralized hero timeline', () => {
    vi.useFakeTimers();
    renderPage();

    const demo = screen.getByRole('article', { name: 'Illustrative Secura control review' });
    expect(demo).toHaveAttribute('data-phase', 'idle');

    act(() => vi.advanceTimersByTime(2000));
    expect(demo).toHaveAttribute('data-phase', 'activate');
    expect(demo.querySelector('[data-baked-banner-mask]')).toHaveAttribute('data-baked-banner-mask', 'true');

    act(() => vi.advanceTimersByTime(1200));
    expect(demo).toHaveAttribute('data-phase', 'expand');

    act(() => vi.advanceTimersByTime(1000));
    expect(demo).toHaveAttribute('data-phase', 'analyze');
    expect(within(demo).getByText('Analysis progress')).toBeInTheDocument();
    expect(within(demo).queryByText('3 sections missing')).not.toBeInTheDocument();

    fireEvent.mouseEnter(demo);
    act(() => vi.advanceTimersByTime(3000));
    expect(demo).toHaveAttribute('data-phase', 'reveal');
    expect(within(demo).getByText('Executive Summary')).toBeInTheDocument();
    expect(within(demo).getByText(/If a covered provider licenses its GenAI system/)).toBeInTheDocument();
    expect(within(demo).getByText('Human validation required before action.')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(3300));
    expect(demo).toHaveAttribute('data-phase', 'hold');
    expect(within(demo).getByText('3 sections missing')).toBeInTheDocument();

    act(() => vi.advanceTimersByTime(12000));
    expect(demo).toHaveAttribute('data-phase', 'hold');
    vi.useRealTimers();
  });
});
