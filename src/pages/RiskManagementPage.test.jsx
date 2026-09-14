import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { MotionProvider } from '../context/MotionContext';
import { riskHero } from '../data/riskManagementContent';
import RiskHeroSection from '../sections/risk-management/RiskHeroSection';
import RiskManagementPage from './RiskManagementPage';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/platform/risk-management']}>
      <MotionProvider>
        <RiskManagementPage />
      </MotionProvider>
    </MemoryRouter>
  );
}

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('RiskManagementPage', () => {
  it('renders grounded hero copy and CTA destinations', () => {
    renderPage();

    expect(screen.getByRole('heading', {
      level: 1,
      name: 'Know which risks need your attention.',
    })).toBeInTheDocument();
    expect(screen.getByText(/Assess likelihood and impact, assign owners/i)).toBeInTheDocument();

    const hero = screen.getByRole('heading', {
      name: 'Know which risks need your attention.',
    }).closest('section');

    expect(within(hero).getByRole('link', { name: /start free trial/i })).toHaveAttribute('href', '/pricing');
    expect(within(hero).getByRole('link', { name: /request a demo/i })).toHaveAttribute('href', '/demo');
    expect(within(hero).getAllByRole('list', { name: 'Risk workflow' })).toHaveLength(2);
    expect(within(hero).getAllByText(/Access control · RK2/i)).toHaveLength(2);
    expect(within(hero).getAllByText('Improper privilege management')).toHaveLength(2);
    expect(within(hero).getByText('Treatment timeline')).toBeInTheDocument();
    expect(within(hero).getByText('Implement')).toBeInTheDocument();
    expect(within(hero).getByText('Lower exposure.')).toBeInTheDocument();
    expect(screen.getByTestId('risk-hero-heatmap').querySelectorAll('[data-heatmap-cell]')).toHaveLength(15);
    expect(screen.queryByText(/built by auditors/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/book a demo/i)).not.toBeInTheDocument();
  });

  it('starts the representative sequence from the identified risk state', () => {
    renderPage();

    const dashboard = screen.getByTestId('risk-hero-dashboard');
    expect(dashboard).toHaveAttribute('data-phase', 'identify');
    expect(screen.getByTestId('risk-review-strip')).toBeInTheDocument();
  });

  it('renders the completed risk state when motion is disabled', () => {
    render(
      <MemoryRouter>
        <RiskHeroSection content={riskHero} motionEnabled={false} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('risk-hero-dashboard')).toHaveAttribute('data-phase', 'reduce');
    expect(screen.getAllByText('50 · Moderate')).toHaveLength(2);
  });

  it('presents the writer-provided challenge structure without the old generic FAQ', () => {
    renderPage();

    const challengeList = screen.getByRole('list', {
      name: /risk management challenges and responses/i,
    });

    expect(within(challengeList).getAllByRole('listitem')).toHaveLength(4);
    expect(screen.getByText('Risk information is scattered')).toBeInTheDocument();
    expect(screen.getByText('Risk and compliance sit apart')).toBeInTheDocument();
    expect(screen.queryByText('Questions, answered')).not.toBeInTheDocument();
  });

  it('uses manual risk-context tabs with keyboard support', async () => {
    const user = userEvent.setup();
    renderPage();

    const tablist = screen.getByRole('tablist', { name: /risk contexts/i });
    const organizationTab = within(tablist).getByRole('tab', { name: /organization/i });
    const assetTab = within(tablist).getByRole('tab', { name: /asset/i });
    const aiTab = within(tablist).getByRole('tab', { name: /^ai$/i });

    expect(organizationTab).toHaveAttribute('aria-selected', 'true');
    await user.click(aiTab);
    expect(aiTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel', { name: /^ai$/i })).toHaveTextContent(/make ai risk review accountable/i);

    await user.click(organizationTab);
    organizationTab.focus();
    await user.keyboard('{ArrowRight}');
    expect(assetTab).toHaveAttribute('aria-selected', 'true');
  });

  it('switches between register and heatmap views without unsupported automation claims', async () => {
    const user = userEvent.setup();
    renderPage();

    const visibilityTabs = screen.getByRole('tablist', { name: /risk visibility views/i });
    const registerTab = within(visibilityTabs).getByRole('tab', { name: /risk register/i });
    const heatmapTab = within(visibilityTabs).getByRole('tab', { name: /risk heatmap/i });

    expect(registerTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Framework filter: ISO 27001')).toBeInTheDocument();
    expect(screen.getAllByText('Owner').length).toBeGreaterThan(0);
    expect(screen.getAllByText(/comments/i).length).toBeGreaterThan(0);

    await user.click(heatmapTab);
    expect(heatmapTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Likelihood and impact concentration')).toBeInTheDocument();
    expect(screen.getByRole('list', { name: /risk severity/i })).toHaveTextContent('Critical');
    expect(screen.getByRole('group', {
      name: /twenty-five risk groups. two critical/i,
    })).toBeInTheDocument();
    expect(screen.getAllByRole('img', { name: /risk group/i })).toHaveLength(25);
    expect(document.querySelectorAll('[data-risk-level="critical"]')).toHaveLength(2);
    expect(screen.queryByText(/automatically update risk scores/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/completed controls automatically eliminate risk/i)).not.toBeInTheDocument();
  });
});
