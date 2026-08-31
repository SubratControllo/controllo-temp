import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import PlatformSection from './PlatformSection';

const renderSection = (motionEnabled = true) => render(
  <MemoryRouter>
    <PlatformSection motionEnabled={motionEnabled} />
  </MemoryRouter>
);

describe('PlatformSection', () => {
  it('opens on Cybersecurity and renders only the selected domain content', () => {
    renderSection(false);

    const selector = screen.getByRole('tablist', { name: /governance domains/i });
    expect(within(selector).getByRole('tab', { name: 'Cybersecurity' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('heading', { name: /implement controls with the evidence and owners attached/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /explore cybersecurity/i })).toHaveAttribute('href', '/solutions/cybersecurity');
    expect(screen.queryByText(/operationalize privacy across data/i)).not.toBeInTheDocument();
  });

  it('changes content only after a visitor selects another domain', async () => {
    const user = userEvent.setup();
    renderSection();

    await user.click(screen.getByRole('tab', { name: 'Privacy' }));

    expect(screen.getByRole('tab', { name: 'Privacy' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('heading', { name: /operationalize privacy across data, systems, and teams/i })).toBeInTheDocument();
    expect(screen.getByText('ROPA')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /explore privacy operations/i })).toHaveAttribute('href', '/solutions/privacy');
    expect(screen.queryByText(/implement controls with the evidence and owners attached/i)).not.toBeInTheDocument();
  });

  it('supports arrow-key selection across the domain controls', async () => {
    const user = userEvent.setup();
    renderSection(false);

    const cybersecurityTab = screen.getByRole('tab', { name: 'Cybersecurity' });
    cybersecurityTab.focus();
    await user.keyboard('{ArrowRight}{ArrowRight}');

    expect(screen.getByRole('tab', { name: 'AI governance' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('heading', { name: /govern every ai system with clear ownership and risk context/i })).toBeInTheDocument();
  });

  it('keeps risk and cloud monitoring subordinate to the governance domains', () => {
    renderSection(false);

    const foundation = screen.getByLabelText('Connected platform capabilities');
    expect(within(foundation).getByRole('link', { name: /explore risk management/i })).toHaveAttribute('href', '/platform/risk-management');
    expect(within(foundation).getByRole('link', { name: /explore cloud monitoring/i })).toHaveAttribute('href', '/platform/cloud-monitoring');
  });
});
