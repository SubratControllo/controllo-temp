import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { MotionProvider } from '../context/MotionContext';
import { riskAssessmentContent, riskHero } from '../data/riskManagementContent';
import RiskAssessmentSection from '../sections/risk-management/RiskAssessmentSection';
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
    expect(within(hero).getByRole('img', { name: /controllo dashboard showing overall, asset, organization, and vendor risk visibility/i })).toHaveAttribute('src', '/assets/risk-dashboard.svg');
    expect(hero.querySelector('.wave-divider[aria-hidden="true"]')).toBeInTheDocument();
    expect(hero.querySelector('.wave-divider__wave--front')).toBeInTheDocument();
    expect(screen.queryByText(/built by auditors/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/book a demo/i)).not.toBeInTheDocument();
  });

  it('uses the supplied risk dashboard asset instead of a coded dashboard', () => {
    renderPage();

    const dashboard = screen.getByTestId('risk-hero-dashboard');
    expect(within(dashboard).getByRole('img')).toHaveAttribute('src', '/assets/risk-dashboard.svg');
    expect(within(dashboard).queryByRole('list', { name: /risk workflow/i })).not.toBeInTheDocument();
  });

  it('renders the supplied dashboard asset when motion is disabled', () => {
    render(
      <MemoryRouter>
        <RiskHeroSection content={riskHero} motionEnabled={false} />
      </MemoryRouter>
    );

    expect(within(screen.getByTestId('risk-hero-dashboard')).getByRole('img')).toHaveAttribute('src', '/assets/risk-dashboard.svg');
  });

  it('presents the writer-provided challenge structure without the old generic FAQ', () => {
    renderPage();

    const challengeList = screen.getByRole('list', {
      name: /risk management challenges and responses/i,
    });

    expect(within(challengeList).getAllByRole('listitem')).toHaveLength(4);
    expect(screen.getByText('Risk information is scattered')).toBeInTheDocument();
    expect(screen.getByText('Risk and compliance sit apart')).toBeInTheDocument();
    expect(within(challengeList).getByText('Structured risk workspace')).toBeInTheDocument();
    expect(within(challengeList).getByText('Visible assessment criteria')).toBeInTheDocument();
    expect(within(challengeList).getByText('Accountable ownership')).toBeInTheDocument();
    expect(within(challengeList).getByText('Linked control context')).toBeInTheDocument();
    expect(within(challengeList).getByText('Review starts from one record instead of a document hunt.')).toBeInTheDocument();
    expect(within(challengeList).getByText('Risk priority can be reviewed alongside the controls it affects.')).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: /risk decision outcomes/i })).toHaveTextContent(/priorities reviewable/i);
    expect(screen.queryByText('Questions, answered')).not.toBeInTheDocument();
    expect(screen.queryByText(/automatically remediate/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/autonomous risk decision/i)).not.toBeInTheDocument();
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

  it('presents a clear static risk story without accordion controls when scroll tracking is unavailable', () => {
    render(<RiskAssessmentSection content={riskAssessmentContent} motionEnabled={false} />);

    expect(screen.getByRole('heading', { name: /assess the risk. see where to focus/i })).toBeInTheDocument();
    expect(screen.getByText(/bring assessment details and the wider risk picture together/i)).toBeInTheDocument();
    expect(screen.getByText(/NIST-based assessments/i)).toBeInTheDocument();

    const story = screen.getByRole('list', { name: /risk portfolio story/i });
    expect(within(story).getAllByRole('listitem')).toHaveLength(3);
    expect(within(story).queryByRole('button')).not.toBeInTheDocument();
    const assetOverview = within(story).getByRole('article', { name: /asset risk overview/i });
    const organizationOverview = within(story).getByRole('article', { name: /organization risk overview/i });
    const vendorOverview = within(story).getByRole('article', { name: /vendor risk overview/i });
    expect(assetOverview).not.toHaveTextContent(/unsupported endpoint asset/i);
    expect(organizationOverview).not.toHaveTextContent(/privileged access review/i);
    expect(vendorOverview).not.toHaveTextContent(/vendor evidence gap/i);
    expect(within(story).getByText(/owner · asset owner/i)).toBeInTheDocument();
    expect(within(story).getByText(/owner · security owner/i)).toBeInTheDocument();
    expect(within(story).getByText(/owner · vendor risk owner/i)).toBeInTheDocument();
    expect(within(story).getAllByRole('img', { name: /risk heatmap/i })).toHaveLength(3);
    expect(story.querySelectorAll('[data-risk-heatmap="stepped"]')).toHaveLength(3);
    expect(story.querySelector('.risk-matrix-cell')).not.toBeInTheDocument();
    expect(story.querySelectorAll('[data-risk-selected="true"]')).toHaveLength(3);
    expect(assetOverview.querySelector('[data-risk-selected="true"]')).toHaveAttribute('transform', 'translate(350 150)');
    expect(organizationOverview.querySelector('[data-risk-selected="true"]')).toHaveAttribute('transform', 'translate(450 150)');
    expect(vendorOverview.querySelector('[data-risk-selected="true"]')).toHaveAttribute('transform', 'translate(350 250)');
    expect(screen.getByText(/filter risks by framework and review associated controls/i)).toBeInTheDocument();
    expect(screen.queryByText(/automatically update risk scores/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/completed controls automatically eliminate risk/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/\bautonomous\b/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/automatic remediation/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/real-time/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/\blive\b/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/treatment tracking/i)).not.toBeInTheDocument();
  });

  it('updates the sticky risk view from scroll chapter visibility', () => {
    const animationFrames = [];
    vi.stubGlobal('requestAnimationFrame', (callback) => {
      animationFrames.push(callback);
      return animationFrames.length;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());

    render(<RiskAssessmentSection content={riskAssessmentContent} motionEnabled />);

    const section = screen.getByRole('heading', { name: /assess the risk. see where to focus/i }).closest('section');
    const story = screen.getByRole('list', { name: /risk portfolio story/i });
    const assetChapter = within(story).getAllByText('Asset risks')[0].closest('li');
    const organizationChapter = within(story).getAllByText('Organization risks')[0].closest('li');
    const vendorChapter = within(story).getAllByText('Vendor risks')[0].closest('li');

    expect(section).toHaveAttribute('data-risk-context', 'asset');
    expect(within(screen.getByTestId('risk-story-sticky')).getByRole('article', { name: /asset risk overview/i })).toBeInTheDocument();

    assetChapter.getBoundingClientRect = () => ({ top: -720, bottom: -200 });
    organizationChapter.getBoundingClientRect = () => ({ top: 180, bottom: 620 });
    vendorChapter.getBoundingClientRect = () => ({ top: 820, bottom: 1260 });

    act(() => {
      window.dispatchEvent(new Event('scroll'));
      animationFrames.shift()?.();
    });

    expect(section).toHaveAttribute('data-risk-context', 'organization');
    expect(organizationChapter).toHaveAttribute('aria-current', 'step');
    expect(within(screen.getByTestId('risk-story-sticky')).getByRole('article', { name: /organization risk overview/i })).toBeInTheDocument();

    assetChapter.getBoundingClientRect = () => ({ top: -1320, bottom: -800 });
    organizationChapter.getBoundingClientRect = () => ({ top: -720, bottom: -280 });
    vendorChapter.getBoundingClientRect = () => ({ top: 180, bottom: 620 });

    act(() => {
      window.dispatchEvent(new Event('scroll'));
      animationFrames.shift()?.();
    });

    expect(story).toHaveClass('min-[1081px]:pb-[100svh]');
    expect(section).toHaveAttribute('data-risk-context', 'vendor');
    expect(vendorChapter).toHaveAttribute('aria-current', 'step');
    expect(within(screen.getByTestId('risk-story-sticky')).getByRole('article', { name: /vendor risk overview/i })).toBeInTheDocument();
  });
});
