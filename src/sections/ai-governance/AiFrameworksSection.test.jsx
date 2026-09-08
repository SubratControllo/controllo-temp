import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { aiFrameworks } from '../../data/aiGovernanceContent';
import AiFrameworksSection from './AiFrameworksSection';

const renderSection = (motionEnabled = false) => render(
  <MemoryRouter>
    <AiFrameworksSection content={aiFrameworks} motionEnabled={motionEnabled} />
  </MemoryRouter>
);

describe('AiFrameworksSection', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('manually selects framework context with wrapping arrow and Home/End navigation', async () => {
    const user = userEvent.setup();
    renderSection();

    const isoTab = screen.getByRole('tab', { name: /iso\/iec 42001/i });
    const nistTab = screen.getByRole('tab', { name: /nist ai rmf/i });
    const euTab = screen.getByRole('tab', { name: /eu ai act/i });

    expect(isoTab).toHaveAttribute('aria-selected', 'true');
    await user.click(nistTab);
    expect(nistTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel', { name: /nist ai rmf/i })).toHaveTextContent(/govern.*map.*measure.*manage/i);

    await user.keyboard('{ArrowRight}');
    expect(euTab).toHaveFocus();
    expect(euTab).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{ArrowRight}');
    expect(isoTab).toHaveFocus();

    await user.keyboard('{ArrowLeft}');
    expect(euTab).toHaveFocus();

    await user.keyboard('{Home}');
    expect(isoTab).toHaveFocus();

    await user.keyboard('{End}');
    expect(euTab).toHaveFocus();
  });

  it('keeps framework context present with accessible tab relations and a safe framework CTA', () => {
    renderSection();

    const section = screen.getByRole('region', { name: /ai governance frameworks/i });
    const isoTab = within(section).getByRole('tab', { name: /iso\/iec 42001/i });
    const panel = within(section).getByRole('tabpanel', { name: /iso\/iec 42001/i });

    expect(within(section).getAllByText(/ai system inventory/i).length).toBeGreaterThanOrEqual(1);
    expect(within(section).getAllByText('Ownership').length).toBeGreaterThanOrEqual(1);
    expect(within(section).getAllByText(/risk assessment/i).length).toBeGreaterThanOrEqual(1);
    expect(within(section).getByText('Controls')).toBeInTheDocument();
    expect(within(section).getByText('Evidence')).toBeInTheDocument();
    expect(within(section).queryByText(/controllo operating layer/i)).not.toBeInTheDocument();
    expect(isoTab).toHaveAttribute('aria-controls', 'ai-framework-panel-iso-iec-42001');
    expect(panel).toHaveAttribute('aria-labelledby', 'ai-framework-tab-iso-iec-42001');
    expect(within(section).getByRole('link', { name: /explore frameworks/i })).toHaveAttribute('href', '/frameworks');
    expect(within(section).queryByText(/star for ai|exact mapping/i)).not.toBeInTheDocument();
    expect(within(section).queryByRole('link', { name: /iso.*42001/i })).not.toBeInTheDocument();
  });

  it('moves keyboard focus from the active tab into its panel before the framework CTA', async () => {
    const user = userEvent.setup();
    renderSection();

    const activeTab = screen.getByRole('tab', { name: /iso\/iec 42001/i });
    const panel = screen.getByRole('tabpanel', { name: /iso\/iec 42001/i });

    activeTab.focus();
    await user.keyboard('{Tab}');

    expect(panel).toHaveFocus();
  });

  it('auto-previews framework tabs until the user interacts', async () => {
    vi.useFakeTimers();
    vi.stubGlobal('IntersectionObserver', class {
      constructor(callback) {
        this.callback = callback;
      }

      observe() {
        this.callback([{ isIntersecting: true }]);
      }

      unobserve() {}

      disconnect() {}
    });

    renderSection(true);

    const isoTab = screen.getByRole('tab', { name: /iso\/iec 42001/i });
    const nistTab = screen.getByRole('tab', { name: /nist ai rmf/i });
    const euTab = screen.getByRole('tab', { name: /eu ai act/i });

    expect(isoTab).toHaveAttribute('aria-selected', 'true');

    await act(async () => {});
    act(() => {
      vi.advanceTimersByTime(2800);
    });

    expect(nistTab).toHaveAttribute('aria-selected', 'true');
    expect(nistTab).not.toHaveFocus();

    act(() => {
      vi.advanceTimersByTime(2800);
    });

    expect(euTab).toHaveAttribute('aria-selected', 'true');

    act(() => {
      isoTab.focus();
      vi.advanceTimersByTime(8400);
    });

    expect(isoTab).toHaveAttribute('aria-selected', 'false');
    expect(euTab).toHaveAttribute('aria-selected', 'true');
  });
});
