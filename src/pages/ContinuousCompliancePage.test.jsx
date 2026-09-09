import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { MotionProvider } from '../context/MotionContext';
import ContinuousCompliancePage from './ContinuousCompliancePage';

function renderPage() {
  window.history.replaceState({}, '', '/platform/continuous-compliance');
  return render(
    <MemoryRouter initialEntries={['/platform/continuous-compliance']}>
      <MotionProvider>
        <ContinuousCompliancePage />
      </MotionProvider>
    </MemoryRouter>,
  );
}

describe('ContinuousCompliancePage', () => {
  it('renders the approved six-section narrative in order', () => {
    const { container } = renderPage();

    const heroTitle = screen.getByRole('heading', { level: 1, name: 'Continuous compliance. Beyond the audit.' });
    const hero = heroTitle.closest('section');
    const betweenAuditsTitle = screen.getByRole('heading', { level: 2, name: "Your last audit can't tell you what changed this week." });
    const betweenAuditsSection = betweenAuditsTitle.closest('section');
    const waveDivider = container.querySelector('.wave-divider[aria-hidden="true"]');

    expect(heroTitle).toBeInTheDocument();
    expect(hero).toHaveClass('continuous-hero', 'pb-44', 'max-[1080px]:pb-52', 'max-[760px]:pb-48');
    expect(betweenAuditsSection).toHaveClass('continuous-between-audits', 'pt-6', 'md:pt-8');
    expect(betweenAuditsSection).not.toHaveClass('section');
    expect(waveDivider).toBeInTheDocument();
    expect(waveDivider.querySelectorAll('svg')).toHaveLength(3);
    const changesList = screen.getByRole('list', { name: 'Changes between audits' });
    expect([...changesList.children].map((child) => child.tagName)).toEqual(['LI', 'LI', 'LI', 'LI']);
    expect(within(changesList).getAllByRole('listitem')).toHaveLength(4);
    expect(screen.getByText('SOC 2 Type 2')).toBeInTheDocument();
    const sectionHeadings = screen.getAllByRole('heading', { level: 2 });
    expect(sectionHeadings.map((heading) => heading.textContent)).toEqual([
      "Your last audit can't tell you what changed this week.",
      'Keep the record current, not just the checklist.',
      'Know where things stand before someone asks.',
      "Build on the work you've already done.",
      'Make your next audit a review, not a restart.',
    ]);

    expect(screen.getByRole('figure', { name: 'Representative Compliance Current workspace' })).toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: /breadcrumb/i })).not.toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /start free trial/i })).toHaveLength(2);
    expect(screen.getAllByRole('link', { name: /request a demo/i })).toHaveLength(2);
  });

  it('publishes route metadata without duplicating the brand suffix', () => {
    renderPage();

    expect(document.title).toBe('Continuous Compliance Software and Audit Readiness | Controllo');
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      expect.stringContaining('Secura-assisted review'),
    );
    expect(document.querySelector('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://controllo.ai/platform/continuous-compliance',
    );
    expect(document.querySelector('meta[property="og:url"]')).toHaveAttribute(
      'content',
      'https://controllo.ai/platform/continuous-compliance',
    );
    expect(document.querySelector('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary');
  });

  it('excludes unsupported claims, personal dashboard data, and invented metrics', () => {
    const { container } = renderPage();
    const pageText = container.textContent;

    expect(pageText).not.toMatch(/built by auditors/i);
    expect(pageText).not.toMatch(/always-on|real-time compliance|continuous control testing/i);
    expect(pageText).not.toMatch(/internal chat/i);
    expect(pageText).not.toMatch(/Subrat Jena|Usama Inc/i);
    expect(pageText).not.toContain('%');
    expect(container.querySelector('img[src="/assets/dashboard.webp"]')).not.toBeInTheDocument();
  });
});
