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
  it('renders the dedicated monitoring narrative and connected planet', () => {
    renderPage();

    expect(screen.getByRole('heading', { level: 1, name: 'See your cloud. Know the risk.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Know what’s running—and how it’s configured.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Know when user-level exposure needs investigation.' })).toBeInTheDocument();

    const planet = screen.getByRole('figure', { name: /moving cloud monitoring planet/i });
    const sources = within(planet).getByRole('list', { name: /connected cloud and workforce environments/i });
    expect(within(sources).getAllByRole('listitem')).toHaveLength(5);
    expect(within(sources).getAllByText('Microsoft 365')).toHaveLength(2);
    expect(within(planet).getByText('Configuration risk')).toBeInTheDocument();
    expect(within(planet).getByText('2 configuration risks')).toBeInTheDocument();
    expect(screen.queryByText(/real-time compliance/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/automatically map/i)).not.toBeInTheDocument();
  });

  it('keeps CTA destinations and SEO metadata explicit', () => {
    renderPage();

    const hero = screen.getByRole('heading', { level: 1 }).closest('section');
    expect(within(hero).getByRole('link', { name: /explore cloud monitoring/i })).toHaveAttribute('href', '#cloud-visibility');
    expect(within(hero).getByRole('link', { name: /request a demo/i })).toHaveAttribute('href', '/demo');
    expect(screen.getAllByRole('link', { name: /explore cloud monitoring/i }).at(-1)).toHaveAttribute('href', '/demo');
    expect(document.title).toBe('Cloud Security & Compliance Monitoring | Controllo');
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute('content', expect.stringContaining('AWS, Azure, GCP'));
  });

  it('reveals provider context with keyboard focus', () => {
    renderPage();

    const planet = screen.getByRole('figure', { name: /moving cloud monitoring planet/i });
    const sources = within(planet).getByRole('list', { name: /connected cloud and workforce environments/i });
    const nodes = within(sources).getAllByRole('listitem');
    fireEvent.focus(nodes[0]);

    expect(within(nodes[0]).getByRole('tooltip')).toHaveClass('opacity-100');
    expect(nodes[1]).toHaveClass('opacity-55');
  });

  it('uses only the verified public workflow integration', () => {
    renderPage();

    const workflow = screen.getByRole('heading', { name: 'See the issue. Get the right team moving.' }).closest('section');
    expect(within(workflow).getByText('Jira')).toBeInTheDocument();
    expect(within(workflow).queryByText('Slack')).not.toBeInTheDocument();
    expect(within(workflow).queryByText('Asana')).not.toBeInTheDocument();
  });
});
