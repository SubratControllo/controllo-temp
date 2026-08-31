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

  it('uses a framework readiness console for the Cybersecurity preview', () => {
    renderSection(false);

    const consolePreview = screen.getByRole('img', {
      name: /soc 2 cybersecurity readiness console/i
    });

    expect(consolePreview).toHaveAttribute('data-motion', 'static');
    expect(consolePreview.querySelectorAll('[data-readiness-track]')).toHaveLength(3);
    expect(consolePreview).toHaveTextContent('82%');
    expect(consolePreview).toHaveTextContent('Implementation');
    expect(consolePreview).toHaveTextContent('Policies & procedures');
    expect(consolePreview).toHaveTextContent('Evidence');
    expect(consolePreview).toHaveTextContent('Access reviews');
    expect(consolePreview).toHaveTextContent('Owner assigned');
    expect(consolePreview).toHaveTextContent('Audit ready');
  });

  it('changes content only after a visitor selects another domain', async () => {
    const user = userEvent.setup();
    renderSection();

    await user.click(screen.getByRole('tab', { name: 'Privacy' }));

    expect(screen.getByRole('tab', { name: 'Privacy' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('heading', { name: /operationalize privacy across data, systems, and teams/i })).toBeInTheDocument();
    expect(screen.getByText('ROPA')).toBeInTheDocument();
    expect(screen.getByText('Data Flows & PII')).toBeInTheDocument();
    expect(screen.getByText('Consent management')).toBeInTheDocument();
    expect(screen.getByText('Current status')).toBeInTheDocument();
    expect(screen.queryByText('Current signal')).not.toBeInTheDocument();
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

  it('uses a themed data-flow diagram for the Privacy preview', async () => {
    const user = userEvent.setup();
    renderSection(false);

    await user.click(screen.getByRole('tab', { name: 'Privacy' }));

    const diagram = screen.getByRole('img', {
      name: /customer onboarding data flow diagram/i
    });

    expect(diagram).toHaveAttribute('data-motion', 'static');
    expect(diagram.querySelectorAll('[data-flow-node]')).toHaveLength(5);
    expect(diagram.querySelectorAll('[data-flow-edge]')).toHaveLength(5);
    expect(diagram.querySelectorAll('[data-flow-edge]')[0]).toHaveAttribute('d', 'M25 46 C30 46 32 20 37 20');
    expect(diagram.querySelectorAll('[data-flow-edge]')[1]).toHaveAttribute('d', 'M63 20 C69 20 69 46 73 46');
    expect(diagram).toHaveTextContent('Customer');
    expect(diagram).toHaveTextContent('Signup service');
    expect(diagram).toHaveTextContent('Customer records');
    expect(diagram).toHaveTextContent('Consent record');
    expect(diagram).toHaveTextContent('CRM');
    expect(screen.getByText('PII flows mapped')).toBeInTheDocument();
    expect(screen.queryByText('mapped nodes')).not.toBeInTheDocument();
    expect(screen.queryByText('consent link')).not.toBeInTheDocument();
    expect(screen.queryByText('Processing purpose')).not.toBeInTheDocument();
  });

  it('uses an AI system passport for the AI Governance preview', async () => {
    const user = userEvent.setup();
    renderSection(false);

    await user.click(screen.getByRole('tab', { name: 'AI governance' }));

    const passport = screen.getByRole('img', {
      name: /support assistant ai governance passport/i
    });

    expect(passport).toHaveAttribute('data-motion', 'static');
    expect(passport).toHaveTextContent('Governed in production');
    expect(passport).toHaveTextContent('Customer operations');
    expect(passport).toHaveTextContent('Medium');
    expect(passport).toHaveTextContent('Review required');
    expect(passport.querySelectorAll('[data-assessment-step]')).toHaveLength(4);
  });

  it('keeps risk and cloud monitoring subordinate to the governance domains', () => {
    renderSection(false);

    const foundation = screen.getByLabelText('Connected platform capabilities');
    expect(within(foundation).getByRole('link', { name: /explore risk management/i })).toHaveAttribute('href', '/platform/risk-management');
    expect(within(foundation).getByRole('link', { name: /explore cloud monitoring/i })).toHaveAttribute('href', '/platform/cloud-monitoring');
  });
});
