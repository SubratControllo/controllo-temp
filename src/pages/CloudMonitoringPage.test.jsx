import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { MotionProvider } from '../context/MotionContext';
import CloudMonitoringPage from './CloudMonitoringPage';

function renderPage() {
  return render(
    <MemoryRouter>
      <MotionProvider>
        <CloudMonitoringPage />
      </MotionProvider>
    </MemoryRouter>
  );
}

describe('CloudMonitoringPage', () => {
  it('renders the dedicated monitoring narrative and connected orbit system', () => {
    renderPage();

    expect(screen.getByRole('heading', { level: 1, name: 'See your cloud. Know the risk.' })).toBeInTheDocument();
    expect(screen.getByRole('list', { name: /cloud monitoring proof points/i })).toHaveTextContent('Current assets');
    expect(screen.getByRole('list', { name: /cloud monitoring proof points/i })).toHaveTextContent('Security signals');
    expect(screen.getByRole('list', { name: /cloud monitoring proof points/i })).toHaveTextContent('Compliance context');
    expect(screen.getByRole('heading', { name: 'Know what’s running and how it’s configured.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Know when user-level exposure needs investigation.' })).toBeInTheDocument();

    const signals = screen.getByRole('heading', { name: 'Don’t just inventory assets. Understand what needs attention.' }).closest('section');
    expect(within(signals).getByRole('list', { name: /from cloud asset to actionable signal/i })).toBeInTheDocument();
    expect(signals.querySelectorAll('[data-signal-card]')).toHaveLength(4);
    expect(signals.querySelector('[data-background-pixel-grid]')).toBeInTheDocument();
    expect(signals.querySelector('[data-background-pixel-stars] canvas')).toBeInTheDocument();

    const planet = screen.getByRole('figure', { name: /interactive controllo cloud orbit system/i });
    expect(planet.querySelector('.cyber-hero-orbit-field')).not.toBeNull();
    expect(planet.querySelectorAll('.cloud-hero-orbit-track')).toHaveLength(2);
    expect(screen.getByRole('heading', { level: 1 }).closest('section').querySelector('.wave-divider')).not.toBeNull();
    const sources = within(planet).getByRole('list', { name: /connected cloud and workforce environments/i });
    expect(within(sources).getAllByRole('listitem')).toHaveLength(5);
    expect(within(sources).getByRole('button', { name: /microsoft 365: identity & endpoint/i })).toBeInTheDocument();
    expect(planet.querySelector('img[src="/assets/brands/microsoft-365.png"]')).toBeInTheDocument();
    expect(within(planet).getByText('Controllo')).toBeInTheDocument();
    expect(within(planet).getByText('Cloud monitoring')).toBeInTheDocument();
    expect(within(planet).getByText('Cloud and workforce coverage')).toBeInTheDocument();
    expect(within(planet).getByText('Assets, alerts, and access activity')).toBeInTheDocument();
    expect(within(planet).queryByText(/signals need attention/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/real-time compliance/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/automatically map/i)).not.toBeInTheDocument();
  });

  it('keeps CTA destinations and SEO metadata explicit', () => {
    renderPage();

    const hero = screen.getByRole('heading', { level: 1 }).closest('section');
    expect(within(hero).getByRole('link', { name: /request a demo/i })).toHaveAttribute('href', '/demo');
    expect(within(hero).getByRole('link', { name: /view monitoring signals/i })).toHaveAttribute('href', '#cloud-visibility');
    expect(screen.getAllByRole('link', { name: /explore cloud monitoring/i }).at(-1)).toHaveAttribute('href', '/demo');
    expect(document.title).toBe('Cloud Security & Compliance Monitoring | Controllo');
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute('content', expect.stringContaining('AWS, Azure, GCP'));
  });

  it('presents cloud visibility as a provider flow without a section CTA', () => {
    renderPage();

    const section = screen.getByRole('heading', { name: 'Know what’s running and how it’s configured.' }).closest('section');
    const providers = within(section).getByRole('list', { name: /cloud infrastructure providers/i });

    expect(within(section).getByText('AWS + Azure + GCP → One connected cloud view')).toBeInTheDocument();
    expect(within(providers).getAllByRole('listitem')).toHaveLength(3);
    expect(within(providers).getByText('Microsoft Azure').closest('li')).toHaveTextContent('Bring Azure assets and cloud configuration details into the same monitoring experience.');
    expect(within(section).getByText('Controllo')).toBeInTheDocument();
    expect(within(section).queryByRole('button')).not.toBeInTheDocument();
    expect(within(section).queryByRole('link')).not.toBeInTheDocument();
  });

  it('reveals provider context with keyboard focus', () => {
    renderPage();

    const planet = screen.getByRole('figure', { name: /interactive controllo cloud orbit system/i });
    const sources = within(planet).getByRole('list', { name: /connected cloud and workforce environments/i });
    const nodes = within(sources).getAllByRole('listitem');
    fireEvent.focus(within(nodes[0]).getByRole('button'));

    expect(within(nodes[0]).getByRole('tooltip')).toHaveClass('opacity-100');
    expect(nodes[1]).toHaveClass('opacity-55');
  });

  it('fires a source-to-core signal pulse on click', () => {
    renderPage();

    const planet = screen.getByRole('figure', { name: /interactive controllo cloud orbit system/i });
    const sources = within(planet).getByRole('list', { name: /connected cloud and workforce environments/i });
    const nodes = within(sources).getAllByRole('listitem');

    fireEvent.click(within(nodes[0]).getByRole('button'));
    expect(nodes[0]).toHaveAttribute('data-signal-active', 'true');
    expect(within(nodes[0]).getByText('Cloud assets')).toBeInTheDocument();

    fireEvent.click(within(nodes[3]).getByRole('button'));
    expect(nodes[3]).toHaveAttribute('data-signal-active', 'true');
    expect(within(nodes[3]).getByText('Identity & endpoint')).toBeInTheDocument();
  });

  it('keeps node selection keyboard operable with Enter and Space', () => {
    renderPage();

    const planet = screen.getByRole('figure', { name: /interactive controllo cloud orbit system/i });
    const sources = within(planet).getByRole('list', { name: /connected cloud and workforce environments/i });
    const nodes = within(sources).getAllByRole('listitem');

    const azure = within(nodes[1]).getByRole('button');
    azure.focus();
    fireEvent.keyDown(azure, { key: 'Enter' });
    fireEvent.click(azure);
    expect(nodes[1]).toHaveAttribute('data-signal-active', 'true');
    expect(within(nodes[1]).getByText('Configuration signals')).toBeInTheDocument();

    const workspace = within(nodes[4]).getByRole('button');
    workspace.focus();
    fireEvent.keyDown(workspace, { key: ' ' });
    fireEvent.click(workspace);
    expect(nodes[4]).toHaveAttribute('data-signal-active', 'true');
    expect(within(nodes[4]).getByText('Workspace identities')).toBeInTheDocument();
  });

  it('uses only the verified public workflow integration', () => {
    renderPage();

    const workflow = screen.getByRole('heading', { name: 'See the issue. Get the right team moving.' }).closest('section');
    expect(within(workflow).getByText('Jira')).toBeInTheDocument();
    expect(within(workflow).queryByText('Slack')).not.toBeInTheDocument();
    expect(within(workflow).queryByText('Asana')).not.toBeInTheDocument();
  });
});
