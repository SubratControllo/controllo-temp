import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { MotionProvider } from '../context/MotionContext';
import { auditHero } from '../data/auditManagementContent';
import AuditHeroSection from '../sections/audit-management/AuditHeroSection';
import AuditManagementPage from './AuditManagementPage';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/platform/audit-management']}>
      <MotionProvider><AuditManagementPage /></MotionProvider>
    </MemoryRouter>
  );
}

describe('AuditManagementPage', () => {
  it('uses the approved route title and grounded hero and closing actions', () => {
    renderPage();

    expect(document.title).toBe('Audit management software for compliance & GRC');
    expect(document.querySelector('meta[name="description"]')?.content).toMatch(/framework scope, linked policy and evidence records, auditor assignments/i);
    const hero = screen.getByRole('heading', { level: 1, name: 'Keep audit scope, evidence, and reviewers aligned.' }).closest('section');
    expect(within(hero).getByRole('link', { name: 'Request a demo' })).toHaveAttribute('href', '/demo');
    expect(within(hero).getByRole('link', { name: /Explore the workspace/i })).toHaveAttribute('href', '#audit-workspace');
    expect(screen.getByRole('heading', { name: 'Four views. One reviewable audit context.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Walk through your next audit handoff.' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Request a demo' })).toHaveLength(2);
    expect(document.body.textContent).not.toMatch(/policy templates|secondary auditor|subscription|Confluence|automatic request routing|complete audit trail|live badge/i);
  });

  it('switches repository records manually with pointer and keyboard input', async () => {
    const user = userEvent.setup();
    renderPage();
    const tablist = screen.getByRole('tablist', { name: 'Audit documentation views' });
    const policies = within(tablist).getByRole('tab', { name: 'Policies' });
    const evidence = within(tablist).getByRole('tab', { name: 'Evidence' });

    expect(policies).toHaveAttribute('aria-selected', 'true');
    await user.click(evidence);
    expect(evidence).toHaveAttribute('aria-selected', 'true');
    await screen.findByText('Supporting file');
    expect(screen.getByRole('tabpanel', { name: 'Evidence' })).toHaveTextContent('Supporting file');
    await user.keyboard('{ArrowLeft}');
    expect(policies).toHaveFocus();
    expect(policies).toHaveAttribute('aria-selected', 'true');
    await screen.findByText('Policy file');
    expect(screen.getByRole('tabpanel', { name: 'Policies' })).toHaveTextContent('Policy file');
  });

  it('renders the representative hero as a complete static state when motion is disabled', () => {
    render(<MemoryRouter><AuditHeroSection content={auditHero} motionEnabled={false} /></MemoryRouter>);
    const figure = screen.getByRole('figure', { name: /Representative audit review/i });
    expect(figure).toBeInTheDocument();
    expect(within(figure).getByText('Access review control')).toBeVisible();
    expect(within(figure).getByText('Access review policy')).toBeVisible();
    expect(within(figure).getByText('Access review evidence')).toBeVisible();
    expect(within(figure).getByText('Auditor assignments')).toBeVisible();
    expect(within(figure).getByText('XLSX framework export')).toBeVisible();
    expect(within(figure).getByText('Linked control records')).toBeVisible();
    expect(within(figure).getByText('Policy file · Evidence file')).toBeVisible();
    expect(within(figure).getByText('Generate framework report')).toBeVisible();
    expect(within(figure).getAllByText('Assigned')).toHaveLength(2);
    const sidebar = within(figure).getByTestId('audit-hero-sidebar');
    expect(sidebar.querySelectorAll('img[src="/assets/emblemLogo.svg"]')).toHaveLength(1);
    expect(sidebar.textContent).toBe('');
    expect(sidebar.querySelectorAll('svg')).toHaveLength(6);
    expect(figure.querySelectorAll('.lucide')).toHaveLength(0);
    const hero = figure.closest('section');
    expect(hero).toHaveAttribute('data-motion', 'static');
    expect(figure.querySelector('.audit-hero-orbit')).not.toBeNull();
    expect(hero.querySelector('.wave-divider__wave--front')).not.toBeNull();
    expect(within(figure).queryByText('Generate report')).not.toBeInTheDocument();
    expect(screen.getByText('Representative product view · Not customer data')).toBeInTheDocument();
  });
});
