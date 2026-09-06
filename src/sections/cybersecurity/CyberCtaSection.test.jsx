import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cyberClosing } from '../../data/cybersecurityContent';
import CyberCtaSection from './CyberCtaSection';

const CTA_VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4';

describe('CyberCtaSection', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('keeps the approved conversion content instead of importing unsupported reference claims', () => {
    render(
      <MemoryRouter>
        <CyberCtaSection content={cyberClosing} motionEnabled={false} />
      </MemoryRouter>,
    );

    const section = screen.getByRole('region', { name: cyberClosing.title });
    expect(within(section).getByRole('link', { name: 'Start Free Trial' })).toHaveAttribute(
      'href',
      '/pricing',
    );
    expect(within(section).getByRole('link', { name: 'Request a Demo' })).toHaveAttribute(
      'href',
      '/demo',
    );
    expect(
      within(section).getByRole('list', { name: 'Cybersecurity platform proof' }),
    ).toHaveTextContent('100+ frameworks');
    expect(section).not.toHaveTextContent(/trusted by|platform uptime|context windows|2000\+/i);
  });

  it('uses the supplied film as a decorative full-bleed background', () => {
    render(
      <MemoryRouter>
        <CyberCtaSection content={cyberClosing} motionEnabled />
      </MemoryRouter>,
    );

    const section = screen.getByRole('region', { name: cyberClosing.title });
    const video = section.querySelector('video[data-cyber-cta-video]');
    const source = video.querySelector('source');

    expect(video).toHaveAttribute('aria-hidden', 'true');
    expect(video).toHaveAttribute('autoplay');
    expect(video).toHaveAttribute('loop');
    expect(video).toHaveAttribute('playsinline');
    expect(video).toHaveAttribute('preload', 'metadata');
    expect(video).toHaveProperty('muted', true);
    expect(source).toHaveAttribute('src', CTA_VIDEO_URL);
    expect(source).toHaveAttribute('type', 'video/mp4');
  });

  it('renders a settled media fallback when motion is disabled', () => {
    render(
      <MemoryRouter>
        <CyberCtaSection content={cyberClosing} motionEnabled={false} />
      </MemoryRouter>,
    );

    const section = screen.getByRole('region', { name: cyberClosing.title });
    const field = section.querySelector('[data-cinematic-field]');
    const video = section.querySelector('video[data-cyber-cta-video]');

    expect(field).toHaveAttribute('data-motion', 'static');
    expect(video).not.toHaveAttribute('autoplay');
    expect(video).toHaveAttribute('data-motion', 'static');
    expect(within(section).getByText(cyberClosing.description)).toBeVisible();
  });

  it('pauses the decorative film offscreen and resumes it when the CTA returns', () => {
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
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});

    const { unmount } = render(
      <MemoryRouter>
        <CyberCtaSection content={cyberClosing} motionEnabled />
      </MemoryRouter>,
    );
    const video = screen
      .getByRole('region', { name: cyberClosing.title })
      .querySelector('video[data-cyber-cta-video]');

    expect(observe).toHaveBeenCalledWith(video);
    intersectionCallback([{ isIntersecting: false }]);
    expect(pause).toHaveBeenCalled();
    intersectionCallback([{ isIntersecting: true }]);
    expect(play).toHaveBeenCalled();

    unmount();
    expect(disconnect).toHaveBeenCalled();
  });

  it('keeps one centered brand signature and distinct keyboard-focus surfaces', () => {
    render(
      <MemoryRouter>
        <CyberCtaSection content={cyberClosing} motionEnabled={false} />
      </MemoryRouter>,
    );

    const section = screen.getByRole('region', { name: cyberClosing.title });
    const signature = screen.getByTestId('cyber-cta-signature');
    const trial = within(section).getByRole('link', { name: 'Start Free Trial' });
    const demo = within(section).getByRole('link', { name: 'Request a Demo' });

    expect(signature).toHaveAccessibleName('Controllo connected assurance');
    expect(signature.querySelectorAll('img[src="/assets/emblemLogo.svg"]')).toHaveLength(1);
    expect(section.querySelector('header, nav')).not.toBeInTheDocument();
    [trial, demo].forEach((link) => expect(link).toHaveClass('focus-visible:outline-white'));
    expect(section.querySelector('[data-cta-content]')).toHaveClass('text-center');
  });
});
