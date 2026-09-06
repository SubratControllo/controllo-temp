import { act, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { aiClosing } from '../../data/aiGovernanceContent';
import AiCtaSection from './AiCtaSection';

describe('AiCtaSection', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('preserves the approved AI governance conversion path and conservative proof', () => {
    render(
      <MemoryRouter>
        <AiCtaSection content={aiClosing} motionEnabled={false} />
      </MemoryRouter>,
    );

    const cta = screen.getByRole('region', { name: /ai governance, connected/i });
    expect(
      within(cta).getByRole('heading', { name: /know your ai.*manage the risk.*prove readiness/i }),
    ).toBeInTheDocument();
    expect(within(cta).getByRole('link', { name: /start free trial/i })).toHaveAttribute('href', '/pricing');
    expect(within(cta).getByRole('link', { name: /request a demo/i })).toHaveAttribute('href', '/demo');
    expect(
      within(cta).getByRole('list', { name: /ai governance platform proof/i }),
    ).toHaveTextContent(/ai system inventory.*ai risk assessment.*secura ai guidance.*framework readiness/i);
    expect(cta).not.toHaveTextContent(/built by auditors|trusted by|under one minute/i);
  });

  it('uses the cinematic CTA composition with a distinct AI governance field', () => {
    render(
      <MemoryRouter>
        <AiCtaSection content={aiClosing} motionEnabled />
      </MemoryRouter>,
    );

    const cta = screen.getByRole('region', { name: /ai governance, connected/i });
    const field = cta.querySelector('[data-ai-governance-field]');

    expect(cta).toHaveClass('cyber-cta-scene', 'ai-cinematic-cta');
    expect(cta.querySelector('[data-cta-content]')).toHaveClass('text-center');
    expect(field.querySelector('[data-governance-network]')).toBeInTheDocument();
    expect(field.querySelectorAll('[data-governance-node]')).toHaveLength(5);
    expect(field.querySelector('[data-governance-network] ellipse')).not.toBeInTheDocument();
    expect(field.querySelector('[data-governance-pulse]')).not.toBeInTheDocument();
    expect(cta.querySelector('video')).not.toBeInTheDocument();
  });

  it('renders the full governance field in a settled state when motion is disabled', () => {
    render(
      <MemoryRouter>
        <AiCtaSection content={aiClosing} motionEnabled={false} />
      </MemoryRouter>,
    );

    const cta = screen.getByRole('region', { name: /ai governance, connected/i });
    const field = cta.querySelector('[data-ai-governance-field]');

    expect(field).toHaveAttribute('data-motion', 'static');
    expect(field).toHaveAttribute('data-ambient-state', 'still');
    expect(within(cta).getByText(aiClosing.description)).toBeVisible();
    expect(screen.getByTestId('ai-cta-signature')).toBeVisible();
  });

  it('runs the ambient field only while the CTA is visible', () => {
    let intersectionCallback;
    const observe = vi.fn();
    const disconnect = vi.fn();
    class IntersectionObserverStub {
      constructor(callback) {
        intersectionCallback = callback;
      }

      observe = observe;

      disconnect = disconnect;
    }
    vi.stubGlobal('IntersectionObserver', IntersectionObserverStub);

    const { unmount } = render(
      <MemoryRouter>
        <AiCtaSection content={aiClosing} motionEnabled />
      </MemoryRouter>,
    );
    const cta = screen.getByRole('region', { name: /ai governance, connected/i });
    const field = cta.querySelector('[data-ai-governance-field]');

    expect(observe).toHaveBeenCalledWith(cta);
    expect(field.querySelectorAll('[data-governance-current]')).toHaveLength(3);
    act(() => intersectionCallback([{ isIntersecting: true }]));
    expect(field).toHaveAttribute('data-ambient-state', 'active');
    act(() => intersectionCallback([{ isIntersecting: false }]));
    expect(field).toHaveAttribute('data-ambient-state', 'still');

    unmount();
    expect(disconnect).toHaveBeenCalled();
  });

  it('keeps one branded signature and visible focus treatment on both actions', () => {
    render(
      <MemoryRouter>
        <AiCtaSection content={aiClosing} motionEnabled={false} />
      </MemoryRouter>,
    );

    const cta = screen.getByRole('region', { name: /ai governance, connected/i });
    const signature = screen.getByTestId('ai-cta-signature');
    const actions = within(cta).getAllByRole('link');

    expect(signature).toHaveAccessibleName('Controllo AI governance, connected');
    expect(signature.querySelectorAll('img[src="/assets/emblemLogo.svg"]')).toHaveLength(1);
    expect(cta.querySelector('header, nav')).not.toBeInTheDocument();
    actions.forEach((action) => expect(action).toHaveClass('focus-visible:outline-white'));
  });
});
