import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import SecuraReadinessSection from '../components/SecuraReadinessSection';
import SecuraReviewFlow from '../components/SecuraReviewFlow';
import SecuraWorkloadTransform from '../components/SecuraWorkloadTransform';
import { MotionProvider } from '../context/MotionContext';
import { securaAiClosing, securaAiContext, securaAiHero, securaAiOutput, securaAiProcess, securaAiReadiness, securaAiValue } from '../data/securaAiContent';
import SecuraAiPage from './SecuraAiPage';

vi.mock('motion/react', async (importOriginal) => ({
  ...await importOriginal(),
  useInView: () => true,
}));

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
    const sampleReview = within(hero).getByRole('link', { name: 'See a sample control review' });
    expect(sampleReview).toHaveAttribute('href', '#secura-output');
    expect(sampleReview).toHaveClass('button', 'button--ghost');
    expect(sampleReview).toHaveClass('hover:!bg-transparent', 'hover:!text-white', 'focus-visible:!bg-transparent', 'focus-visible:!text-white');
    expect(within(hero).getByRole('heading', { level: 1 })).toHaveClass('min-[1180px]:text-[3.65rem]');
    expect(within(hero).getByText(securaAiHero.titleAccent)).toHaveClass('block');
    expect(within(hero).getByText(securaAiHero.titleAccent)).not.toHaveClass('hero-title-accent');
    expect(hero.querySelector('img[src="/assets/secura-mark.svg"]')).toHaveClass('size-8');
    expect(within(hero).getByText(securaAiHero.description)).toHaveClass('lede');
    expect(within(hero).getByRole('article', { name: 'Illustrative Secura control review' })).toBeInTheDocument();
    expect(within(hero).getByText('I’m Secura, Your AI Consultant.')).toBeInTheDocument();
    expect(within(hero).getByText('Fetching control details')).toBeInTheDocument();
    expect(within(hero).getByText(/Secura activates inside the Control Details screen/)).toBeInTheDocument();

    const contextSection = screen.getByRole('heading', { name: securaAiContext.title }).closest('section');
    const contextCore = within(contextSection).getByRole('button', { name: 'Highlight all four Secura AI review connections' });
    const evidence = within(contextSection).getByRole('button', { name: 'Highlight Evidence context' });
    expect(contextCore).toHaveTextContent('4 sources connected');
    fireEvent.mouseEnter(evidence);
    expect(contextCore).toHaveTextContent('Proof context');
    expect(evidence).toHaveAttribute('aria-pressed', 'true');
    fireEvent.mouseLeave(evidence);
    expect(contextCore).toHaveTextContent('4 sources connected');

    const outputSection = screen.getByRole('heading', { name: securaAiOutput.title }).closest('section');
    const walkthrough = within(outputSection).getByRole('figure', { name: 'Scroll through Secura analysis output' });
    expect(within(walkthrough).getByRole('list', { name: 'Secura analysis stages' })).toBeInTheDocument();
    expect(within(walkthrough).getAllByText('Sample Control Review').length).toBeGreaterThan(0);
    expect(within(walkthrough).getAllByText('Ready for team validation').length).toBeGreaterThan(0);
    expect(within(walkthrough).getAllByText('Approval workflow not described').length).toBeGreaterThan(0);

    const valueSection = screen.getByRole('heading', { name: securaAiValue.title }).closest('section');
    const transformation = within(valueSection).getByRole('figure', { name: 'Secura workload transformation' });
    expect(within(transformation).getByText('5 manual review steps')).toBeInTheDocument();
    expect(within(transformation).getByText('Structured first review')).toBeInTheDocument();
    expect(within(transformation).getByText('Ready for team validation')).toBeInTheDocument();

    const readiness = screen.getByRole('figure', { name: 'Review readiness workflow and Secura findings' });
    expect(within(readiness).getByText('Secura review')).toBeInTheDocument();
    expect(within(readiness).getByText('3 findings')).toBeInTheDocument();
    expect(within(readiness).getByText('Findings are prioritized before formal review.')).toBeInTheDocument();

    const closing = screen.getByRole('heading', { name: securaAiClosing.title }).closest('section');
    expect(closing).toHaveClass('cyber-cta-scene', 'secura-cta-scene');
    expect(closing.querySelector('[data-cinematic-cta-video]')).toBeInTheDocument();
    expect(closing.querySelector('[data-cta-content]')).toHaveClass('text-center');
    expect(within(closing).getByRole('link', { name: securaAiClosing.primaryAction.label })).toHaveAttribute('href', '/demo');
    expect(within(closing).getByRole('link', { name: securaAiClosing.secondaryAction.label })).toHaveAttribute('href', '#secura-output');

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

  it('runs the Secura review flow through one controlled loop', () => {
    vi.useFakeTimers();
    renderPage();

    const flow = screen.getByRole('figure', { name: 'Secura review flow from control description to team validation' });
    expect(flow).toHaveAttribute('data-phase', '0');

    act(() => vi.advanceTimersByTime(1600));
    expect(flow).toHaveAttribute('data-phase', '1');
    act(() => vi.advanceTimersByTime(1600));
    expect(flow).toHaveAttribute('data-phase', '2');
    act(() => vi.advanceTimersByTime(2000));
    expect(flow).toHaveAttribute('data-phase', '3');
    act(() => vi.advanceTimersByTime(1800));
    expect(flow).toHaveAttribute('data-phase', '4');
    act(() => vi.advanceTimersByTime(2000));
    expect(flow).toHaveAttribute('data-phase', '5');
    expect(within(flow).getAllByText('Complete')).toHaveLength(5);

    act(() => vi.advanceTimersByTime(1500));
    expect(flow).toHaveAttribute('data-phase', '6');
    act(() => vi.advanceTimersByTime(300));
    expect(flow).toHaveAttribute('data-phase', '0');
    vi.useRealTimers();
  });

  it('renders the completed Secura review flow without a loop when motion is reduced', () => {
    render(<SecuraReviewFlow content={securaAiProcess} motionEnabled={false} />);

    const flow = screen.getByRole('figure', { name: 'Secura review flow from control description to team validation' });
    expect(flow).toHaveAttribute('data-phase', '5');
    expect(within(flow).getAllByText('Complete')).toHaveLength(5);
    expect(within(flow).getByText('Control context assembled → analyzed → prepared for review')).toBeVisible();
  });

  it('runs the workload transformation through one controlled loop', () => {
    vi.useFakeTimers();
    render(<SecuraWorkloadTransform content={securaAiValue} motionEnabled />);

    const transformation = screen.getByRole('figure', { name: 'Secura workload transformation' });
    expect(transformation).toHaveAttribute('data-phase', '0');
    [1500, 1500, 1500, 2000, 1000].forEach((duration, index) => {
      act(() => vi.advanceTimersByTime(duration));
      expect(transformation).toHaveAttribute('data-phase', `${index + 1}`);
    });
    act(() => vi.advanceTimersByTime(1000));
    expect(transformation).toHaveAttribute('data-phase', '6');
    act(() => vi.advanceTimersByTime(350));
    expect(transformation).toHaveAttribute('data-phase', '0');
    vi.useRealTimers();
  });

  it('renders the completed workload transformation when motion is reduced', () => {
    render(<SecuraWorkloadTransform content={securaAiValue} motionEnabled={false} />);

    const transformation = screen.getByRole('figure', { name: 'Secura workload transformation' });
    expect(transformation).toHaveAttribute('data-phase', '5');
    expect(within(transformation).getByText(securaAiValue.highlight)).toBeVisible();
  });

  it('runs the readiness workflow through one controlled loop', () => {
    vi.useFakeTimers();
    render(<SecuraReadinessSection content={securaAiReadiness} motionEnabled />);

    const section = screen.getByRole('heading', { name: securaAiReadiness.title }).closest('section');
    expect(section).toHaveAttribute('data-phase', '0');
    [700, 450, 700, 450, 750, 500, 600, 900, 650, 2200, 350].forEach((duration, index) => {
      act(() => vi.advanceTimersByTime(duration));
      expect(section).toHaveAttribute('data-phase', index === 10 ? '0' : `${index + 1}`);
    });
    vi.useRealTimers();
  });

  it('renders the completed readiness workflow when motion is reduced', () => {
    render(<SecuraReadinessSection content={securaAiReadiness} motionEnabled={false} />);

    const section = screen.getByRole('heading', { name: securaAiReadiness.title }).closest('section');
    expect(section).toHaveAttribute('data-phase', '9');
    expect(within(section).getByText('3 findings')).toBeVisible();
    expect(within(section).getByText(securaAiReadiness.boundary)).toBeVisible();
  });
});
