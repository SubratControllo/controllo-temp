import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { aiFrameworks } from '../../data/aiGovernanceContent';
import AiFrameworksSection from './AiFrameworksSection';

const renderSection = () => render(
  <MemoryRouter>
    <AiFrameworksSection content={aiFrameworks} motionEnabled={false} />
  </MemoryRouter>
);

describe('AiFrameworksSection', () => {
  it('manually selects framework context with wrapping arrow and Home/End navigation', async () => {
    const user = userEvent.setup();
    renderSection();

    const isoTab = screen.getByRole('tab', { name: 'ISO/IEC 42001' });
    const nistTab = screen.getByRole('tab', { name: 'NIST AI RMF' });
    const euTab = screen.getByRole('tab', { name: 'EU AI Act' });

    expect(isoTab).toHaveAttribute('aria-selected', 'true');
    await user.click(nistTab);
    expect(nistTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel', { name: 'NIST AI RMF' })).toHaveTextContent(/govern.*map.*measure.*manage/i);

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

  it('keeps the Controllo operating layer present with accessible tab relations and a safe framework CTA', () => {
    renderSection();

    const section = screen.getByRole('region', { name: /ai governance frameworks/i });
    const isoTab = within(section).getByRole('tab', { name: 'ISO/IEC 42001' });
    const panel = within(section).getByRole('tabpanel', { name: 'ISO/IEC 42001' });

    expect(within(section).getByText(/ai system inventory/i)).toBeInTheDocument();
    expect(within(section).getByText('Ownership')).toBeInTheDocument();
    expect(within(section).getByText(/risk assessment/i)).toBeInTheDocument();
    expect(within(section).getByText('Controls')).toBeInTheDocument();
    expect(within(section).getByText('Evidence')).toBeInTheDocument();
    expect(isoTab).toHaveAttribute('aria-controls', 'ai-framework-panel-iso-iec-42001');
    expect(panel).toHaveAttribute('aria-labelledby', 'ai-framework-tab-iso-iec-42001');
    expect(within(section).getByRole('link', { name: /explore frameworks/i })).toHaveAttribute('href', '/frameworks');
    expect(within(section).queryByText(/star for ai|exact mapping/i)).not.toBeInTheDocument();
    expect(within(section).queryByRole('link', { name: /iso.*42001/i })).not.toBeInTheDocument();
  });
});
