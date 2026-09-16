import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { MotionProvider } from '../context/MotionContext';
import { auditClosing, auditHero, auditRepositoryViews } from '../data/auditManagementContent';
import { getAuditDossierStep } from '../sections/audit-management/auditDossierStep';
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
  it('maps audit dossier scroll progress to bounded steps', () => {
    expect(getAuditDossierStep(-0.2, 4)).toBe(0);
    expect(getAuditDossierStep(0.24, 4)).toBe(0);
    expect(getAuditDossierStep(0.25, 4)).toBe(1);
    expect(getAuditDossierStep(0.99, 4)).toBe(3);
    expect(getAuditDossierStep(1, 4)).toBe(3);
  });

  it('uses the approved route title and grounded hero and closing actions', () => {
    renderPage();

    expect(document.title).toBe('Audit management software for compliance & GRC');
    expect(document.querySelector('meta[name="description"]')?.content).toMatch(/framework scope, linked policy and evidence records, auditor assignments/i);
    const hero = screen.getByRole('heading', { level: 1, name: 'Keep audit scope, evidence, and reviewers aligned.' }).closest('section');
    expect(within(hero).getByText(auditHero.titleAccent)).toHaveClass('hero-title-accent');
    expect(within(hero).getByRole('link', { name: 'Request a demo' })).toHaveAttribute('href', '/demo');
    expect(within(hero).getByRole('link', { name: /Explore the workspace/i })).toHaveAttribute('href', '#audit-workspace');
    expect(within(hero).queryByText(auditHero.supporting)).not.toBeInTheDocument();
    const workspace = screen.getByRole('heading', { name: 'Four views. One reviewable audit context.' }).closest('section');
    expect(workspace).toHaveClass('pt-20', 'pb-12', 'md:pt-24', 'md:pb-16', 'min-[1081px]:min-h-[200vh]');
    expect(workspace?.querySelector('.absolute.inset-x-0.top-0.h-px.bg-line')).toBeNull();
    expect(workspace?.querySelector('.min-\\[1081px\\]\\:top-\\[116px\\]')).toBeInTheDocument();
    expect(workspace?.querySelector('.min-\\[1081px\\]\\:h-\\[calc\\(100svh-116px\\)\\]')).toBeInTheDocument();
    expect(workspace?.querySelector('.min-\\[1081px\\]\\:min-h-\\[170vh\\]')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Walk through your next audit handoff.' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Request a demo' })).toHaveLength(2);
    expect(screen.getByRole('link', { name: 'View pricing' })).toHaveAttribute('href', '/pricing');
    expect(document.body.textContent).toContain(auditClosing.proof);
    expect(document.body.textContent).not.toMatch(/policy templates|secondary auditor|subscription|Confluence|automatic request routing|complete audit trail|live badge|Read-Only Access|setup in under|no credit card|full team access|twelve seats|flat per-seat|download/i);
  });

  it('renders repository records as a passive enterprise deck', () => {
    renderPage();
    const repository = screen.getByRole('heading', { name: 'Keep policy and evidence records linked to their controls.' }).closest('section');
    const panel = screen.getByRole('tabpanel', { name: 'Rotating policy and evidence records' });
    const frontCard = panel.querySelector('[data-stack-position="0"]');

    expect(screen.queryByRole('tablist', { name: 'Audit documentation views' })).not.toBeInTheDocument();
    expect(frontCard).toHaveTextContent('Access review policy');
    expect(frontCard).toHaveTextContent('Access_Review_Policy_2026.pdf');
    expect(repository).not.toHaveTextContent(/24 Active Policies|182 Evidence Records|Verified Records/i);
    expect(repository).not.toHaveTextContent(/Policy files|Evidence files/i);
  });

  it('auto-rotates the repository visual through records', () => {
    vi.useFakeTimers();
    try {
      renderPage();
      const panel = screen.getByRole('tabpanel', { name: 'Rotating policy and evidence records' });

      expect(panel.querySelector('[data-stack-position="0"]')).toHaveTextContent('Access review policy');
      act(() => {
        vi.advanceTimersByTime(3600);
      });
      expect(panel.querySelector('[data-stack-position="0"]')).toHaveTextContent('Data classification standard');
    } finally {
      vi.useRealTimers();
    }
  });

  it('keeps repository examples grounded in representative policy and evidence records', () => {
    expect(JSON.stringify(auditRepositoryViews)).not.toMatch(/automated|142|AWS|zero critical|Verified Records|Active Policies|Evidence Records/i);
  });

  it('keeps the audit dossier views claim-safe when selected manually', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: /Evidence/i }));
    await screen.findByText('Supporting evidence file attached and mapped to active controls');
    expect(document.body.textContent).not.toMatch(/Verification Hash|sha256/i);

    await user.click(screen.getByRole('button', { name: /Auditor management/i }));
    await screen.findByText('Assigned review paths');
    expect(document.body.textContent).not.toMatch(/Sarah Jenkins|KPMG|Read-Only Auditor Access/i);
  });

  it('renders auditor assignments without auditor-access claims or personal data', () => {
    renderPage();
    const auditor = screen.getByRole('heading', { name: 'See who reviews each framework.' }).closest('section');

    expect(within(auditor).getByText('Contacts tied to assigned frameworks')).toBeInTheDocument();
    expect(within(auditor).getByText('Internal audit')).toBeInTheDocument();
    expect(within(auditor).getByText('External audit')).toBeInTheDocument();
    expect(auditor).not.toHaveTextContent(/Read-Only|Sarah Jenkins|KPMG|final approval|commercial entitlement/i);
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
    expect(within(figure).getByText('SOC 2 · In scope')).toBeVisible();
    expect(within(figure).getByText('Linked control records')).toBeVisible();
    expect(within(figure).getByText('Effective date recorded')).toBeVisible();
    expect(within(figure).getByText('Generate framework report')).toBeVisible();
    expect(within(figure).getAllByText('Assigned')).toHaveLength(2);
    expect(within(figure).queryByText('Audit orbit map')).toBeNull();
    expect(figure.querySelectorAll('img[src="/assets/emblemLogo.svg"]')).toHaveLength(1);
    expect(figure.querySelector('.audit-hero-float-card')).toBeNull();
    expect(figure.querySelectorAll('.lucide')).toHaveLength(0);
    const hero = figure.closest('section');
    expect(hero).toHaveAttribute('data-motion', 'static');
    expect(figure.querySelector('.audit-hero-orbit')).not.toBeNull();
    expect(hero.querySelector('.wave-divider__wave--front')).not.toBeNull();
    expect(within(figure).queryByText('Generate report')).not.toBeInTheDocument();
    expect(screen.queryByText('Representative product view · Not customer data')).not.toBeInTheDocument();
  });
});
