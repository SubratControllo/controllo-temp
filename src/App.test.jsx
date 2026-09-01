import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const renderRoute = (route = '/') => render(
  <MemoryRouter initialEntries={[route]}>
    <App />
  </MemoryRouter>
);

describe('Compliance Current landing page', () => {
  it('opens and closes the responsive navigation', async () => {
    const user = userEvent.setup();
    renderRoute();

    const menuButton = screen.getByRole('button', { name: /open menu/i });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('navigation', { name: /primary/i })).toHaveClass('is-open');

    await user.keyboard('{Escape}');
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('uses operating-system motion preferences without a manual header control', () => {
    renderRoute();

    expect(screen.queryByRole('button', { name: /pause motion/i })).not.toBeInTheDocument();
    expect(screen.getByTestId('site-root')).toHaveAttribute('data-motion', 'playing');
  });

  it('renders the official Controllo wordmarks in the header and footer', () => {
    renderRoute();

    const header = document.querySelector('header.site-header');
    const footer = screen.getByRole('contentinfo');

    expect(header.querySelector('img[src="/assets/logo-dark.svg"]')).toBeInTheDocument();
    expect(footer.querySelector('img[src="/assets/logo-light.svg"]')).toBeInTheDocument();
  });

  it('uses a workflow-specific footer CTA for the demo route', () => {
    renderRoute();

    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getByRole('link', {
      name: /see controllo with your workflow/i
    })).toHaveAttribute('href', '/demo');
    expect(within(footer).queryByText(/book a readiness tour/i)).not.toBeInTheDocument();
  });

  it('keeps shared header CTA targets at the 46px button minimum', () => {
    renderRoute();

    const header = document.querySelector('header.site-header');
    expect(header).toBeInTheDocument();
    const headerCtas = within(header).getAllByRole('link', {
      name: /request a demo/i
    });

    expect(headerCtas).toHaveLength(2);
    headerCtas.forEach((cta) => {
      expect(cta.className).toContain('min-h-11.5');
      expect(cta.className).not.toMatch(/(?:^|\s)min-h-11(?:\s|$)/);
    });
  });

  it('adds a quiet trial action to both desktop and collapsed header navigation', () => {
    renderRoute();

    const header = document.querySelector('header.site-header');
    const trialCtas = within(header).getAllByRole('link', {
      name: /start free trial/i
    });

    expect(trialCtas).toHaveLength(2);
    trialCtas.forEach((cta) => {
      expect(cta).toHaveAttribute('href', '/pricing');
      expect(cta).toHaveClass('button', 'button--ghost');
      expect(cta).not.toHaveClass('button--directional');
      expect(cta.querySelector('svg')).not.toBeInTheDocument();
    });

    const primaryNav = within(header).getByRole('navigation', {
      name: /primary navigation/i
    });
    const desktopTrial = trialCtas.find((cta) => !primaryNav.contains(cta));
    const desktopDemo = within(header)
      .getAllByRole('link', { name: /request a demo/i })
      .find((cta) => !primaryNav.contains(cta));

    expect(desktopTrial.className).toContain('max-[1080px]:hidden');
    expect(desktopDemo.className).toContain('max-[1080px]:hidden');
  });

  it('renders the homepage hero with its current responsive spacing utilities', () => {
    renderRoute();

    const hero = screen.getByRole('region', { name: /continuous compliance hero/i });
    expect(hero).toHaveClass('hero');
    expect(hero.className).toContain('min-h-253');
    expect(hero.className).toContain('-mt-37.5');
    expect(hero.className).toContain('pt-48');
    expect(hero.className).toContain('pb-0');
  });

  it('presents framework and integration proof without another filter interface', () => {
    renderRoute();

    const proof = screen.getByRole('region', { name: 'Frameworks and connectivity' });
    const frameworkCoverage = within(proof).getByRole('list', {
      name: 'Selected framework coverage'
    });
    const integrationCoverage = within(proof).getByRole('list', {
      name: 'Connected integration coverage'
    });

    expect(within(proof).getByRole('heading', {
      name: /more frameworks shouldn’t mean more work/i
    })).toBeInTheDocument();
    expect(within(proof).getByText('100+')).toBeInTheDocument();
    expect(within(proof).getByText('7,000+')).toBeInTheDocument();
    expect(within(proof).getByText('200,000+')).toBeInTheDocument();
    const frameworkGroups = within(frameworkCoverage).getAllByRole('listitem');
    expect(frameworkGroups).toHaveLength(4);
    frameworkGroups.forEach((group) => {
      expect(within(group).getByText('+ More in library')).toBeInTheDocument();
    });
    expect(within(frameworkGroups[0]).getByText('SOC 2')).toBeInTheDocument();
    expect(within(frameworkGroups[0]).getByText('ISO/IEC 27001')).toBeInTheDocument();
    expect(within(frameworkGroups[0]).getByText('NIST CSF 2.0')).toBeInTheDocument();
    expect(within(frameworkGroups[0]).getByText('PCI DSS 4.0')).toBeInTheDocument();
    expect(within(frameworkGroups[1]).getByText('HIPAA')).toBeInTheDocument();
    expect(within(frameworkGroups[1]).getByText('GDPR')).toBeInTheDocument();
    expect(within(frameworkGroups[1]).getByText('ISO/IEC 27701')).toBeInTheDocument();
    expect(within(frameworkGroups[2]).getByText('ISO/IEC 42001')).toBeInTheDocument();
    expect(within(frameworkGroups[2]).getByText('NIST AI RMF')).toBeInTheDocument();
    expect(within(frameworkGroups[3]).getByText('DORA')).toBeInTheDocument();
    expect(within(frameworkGroups[3]).getByText('NIS2')).toBeInTheDocument();
    expect(frameworkCoverage.querySelectorAll('[data-framework-wordmark]')).toHaveLength(16);
    expect(within(integrationCoverage).getAllByRole('listitem')).toHaveLength(3);
    expect(within(integrationCoverage).getByText('AWS')).toBeInTheDocument();
    expect(within(integrationCoverage).getByText('Microsoft Entra ID')).toBeInTheDocument();
    expect(within(integrationCoverage).getByText('Jira')).toBeInTheDocument();
    const integrationLogos = integrationCoverage.querySelectorAll('img[data-brand-logo]');
    expect(integrationLogos).toHaveLength(8);
    expect(integrationCoverage.querySelector('img[src="/assets/brands/aws.svg"]')).toBeInTheDocument();
    expect(integrationCoverage.querySelector('img[src="/assets/brands/microsoft-entra-id-protection.svg"]')).not.toBeInTheDocument();
    expect(within(proof).queryByLabelText('Filter framework paths')).not.toBeInTheDocument();
    expect(within(proof).getByRole('link', { name: 'Explore frameworks' })).toHaveAttribute('href', '/frameworks');
    expect(within(proof).getByRole('link', { name: 'View integrations' })).toHaveAttribute('href', '/integrations');
  });

  it('moves from Secura findings into connected risk before framework proof', () => {
    renderRoute();

    const secura = document.getElementById('secura');
    const risk = screen.getByRole('region', {
      name: /connected risk prioritization/i
    });
    const frameworks = screen.getByRole('region', {
      name: /frameworks and connectivity/i
    });

    expect(secura).toBeInTheDocument();
    expect(secura.compareDocumentPosition(risk)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(risk.compareDocumentPosition(frameworks)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(within(risk).getByRole('link', {
      name: /explore unified risk/i
    })).toHaveAttribute('href', '/platform/risk-management');
  });

  it('uses locally hosted official marks in the integrations directory', async () => {
    renderRoute('/integrations');

    const heading = await screen.findByRole('heading', {
      name: /bring evidence in without pulling teams out/i
    });
    const page = heading.closest('main');
    const integrationLogos = page.querySelectorAll('img[data-brand-logo]');

    expect(integrationLogos).toHaveLength(8);
    integrationLogos.forEach((logo) => {
      expect(logo.getAttribute('src')).toMatch(/^\/assets\/brands\/.+\.svg$/);
      expect(logo).toHaveAttribute('alt', '');
    });
    expect(page.querySelector('img[src="/assets/brands/google-workspace.svg"]')).toBeInTheDocument();
    expect(page.querySelector('img[src="/assets/brands/microsoft-entra-id-protection.svg"]')).not.toBeInTheDocument();
  });

  it('renders product deep links and shared navigation', () => {
    renderRoute('/platform/risk-management');

    const heading = screen.getByRole('heading', { name: /see risk while it is still actionable/i });
    const hero = heading.closest('section');
    const demoLink = within(hero).getByRole('link', { name: /see it in your program/i });
    const platformLink = within(hero).getByRole('link', { name: /explore the platform/i });

    expect(heading).toBeInTheDocument();
    expect(demoLink.querySelector('.lucide-calendar-days')).toBeInTheDocument();
    expect(demoLink).not.toHaveClass('button--directional');
    expect(platformLink.querySelector('svg')).not.toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /controllo home/i })).toHaveLength(2);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('uses the Secura product mark on the Secura AI route', () => {
    renderRoute('/platform/secura-ai');

    const heading = screen.getByRole('heading', {
      name: /guidance that understands the work around the control/i
    });
    const hero = heading.closest('section');
    const mark = hero.querySelector('img[src="/assets/secura-mark.svg"]');

    expect(mark).toBeInTheDocument();
    expect(mark).toHaveAttribute('alt', '');
    expect(mark).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders the locked governance-domain and cloud-monitoring routes', () => {
    const { unmount } = renderRoute('/solutions/privacy');
    expect(screen.getByRole('heading', { name: /operationalize privacy across data, systems, and teams/i })).toBeInTheDocument();

    unmount();
    renderRoute('/platform/cloud-monitoring');
    expect(screen.getByRole('heading', { name: /turn live environment signals into compliance context/i })).toBeInTheDocument();
  });

  it('renders the dedicated Cybersecurity route instead of the generic product template', async () => {
    renderRoute('/solutions/cybersecurity');

    expect(await screen.findByRole('heading', {
      level: 1,
      name: /one platform for cyber readiness and connected environment visibility/i
    })).toBeInTheDocument();
    expect(screen.getByRole('region', {
      name: /see what is connected and where attention is needed/i
    })).toBeInTheDocument();
    expect(screen.queryByText('Clarity at every handoff.')).not.toBeInTheDocument();
  });

  it('separates product privacy from the legal privacy policy', async () => {
    const { unmount } = renderRoute('/privacy-policy');
    expect(await screen.findByRole('heading', { name: /privacy information, written for people/i })).toBeInTheDocument();

    unmount();
    renderRoute('/privacy');
    expect(await screen.findByRole('heading', { name: /operationalize privacy across data, systems, and teams/i })).toBeInTheDocument();
  });

  it('uses accurate Phase 1 demo request language', async () => {
    renderRoute('/demo');

    expect(
      await screen.findByRole('heading', {
        name: /Bring one real workflow. Leave with a clearer path./i
      })
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole('link', { name: /Request a Demo/i })
    ).toHaveLength(2);
    const submitButton = screen.getByRole('button', { name: /Request my demo/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.querySelector('svg')).not.toBeInTheDocument();
  });

  it('renders a branded not found page for unknown routes', () => {
    renderRoute('/not-a-real-page');
    expect(screen.getByRole('heading', { name: /this path has drifted/i })).toBeInTheDocument();
    const returnHome = screen.getByRole('link', { name: /return home/i });
    expect(returnHome).toHaveAttribute('href', '/');
    expect(returnHome).toHaveClass('button--directional');
    expect(returnHome.querySelector('.lucide-arrow-right')).toBeInTheDocument();
  });
});
