import { act, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { gsap } from 'gsap';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cyberFrameworks } from '../../data/cybersecurityContent';
import CyberFrameworksSection from './CyberFrameworksSection';

class IntersectionObserverStub {
  static instances = [];

  constructor(callback) {
    this.callback = callback;
    IntersectionObserverStub.instances.push(this);
  }

  observe() {}
  disconnect() {}

  trigger(entry) {
    this.callback([entry]);
  }
}

class ResizeObserverStub {
  static instances = [];

  constructor(callback) {
    this.callback = callback;
    ResizeObserverStub.instances.push(this);
  }

  observe() {}
  disconnect() {}

  trigger() {
    this.callback([]);
  }
}

const rect = (left, top, width = 8, height = 8) => ({
  bottom: top + height,
  height,
  left,
  right: left + width,
  top,
  width,
  x: left,
  y: top,
  toJSON: () => ({}),
});

describe('CyberFrameworksSection', () => {
  afterEach(() => {
    gsap.globalTimeline.timeScale(1);
    IntersectionObserverStub.instances = [];
    ResizeObserverStub.instances = [];
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('keeps all eight framework entries illustrative and outside the section action path', () => {
    render(
      <MemoryRouter>
        <CyberFrameworksSection frameworks={cyberFrameworks} motionEnabled={false} />
      </MemoryRouter>,
    );

    const list = screen.getByRole('list', { name: 'Featured cyber and cloud frameworks' });
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(8);
    items.forEach((item, index) => {
      if (index % 2 === 0) expect(item).toHaveClass('flex-row-reverse');
      else expect(item).not.toHaveClass('flex-row-reverse');
    });
    expect(within(list).queryByRole('link')).not.toBeInTheDocument();
    expect(within(list).queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Explore All Frameworks' })).toHaveAttribute(
      'href',
      '/frameworks',
    );
  });

  it('presents reusable controls and all framework endpoints as separate visible regions', () => {
    render(
      <MemoryRouter>
        <CyberFrameworksSection frameworks={cyberFrameworks} motionEnabled={false} />
      </MemoryRouter>,
    );

    const visual = screen.getByRole('region', { name: 'Reusable framework coverage' });
    expect(
      within(visual).getByRole('heading', { name: 'Shared controls, distinct framework scope' }),
    ).toBeInTheDocument();
    expect(within(visual).getAllByRole('list')).toHaveLength(2);
    expect(within(visual).queryByText('Reusable control areas')).not.toBeInTheDocument();
    expect(within(visual).queryByText('Frameworks in view')).not.toBeInTheDocument();
    expect(within(visual).queryByText('01—08')).not.toBeInTheDocument();
  });

  it('exposes the framework visual as an accessible mapping diagram instead of a dashboard', () => {
    render(
      <MemoryRouter>
        <CyberFrameworksSection frameworks={cyberFrameworks} motionEnabled={false} />
      </MemoryRouter>,
    );

    const diagram = screen.getByRole('figure', {
      name: /shared controls mapped to distinct framework scope/i,
    });
    expect(
      within(diagram).getByRole('list', { name: 'Reusable control areas' }),
    ).toBeInTheDocument();
    expect(
      within(diagram).getByRole('list', { name: 'Featured cyber and cloud frameworks' }),
    ).toBeInTheDocument();
    expect(within(diagram).getByTestId('framework-field-emblem')).toHaveAttribute(
      'src',
      '/assets/emblemLogo.svg',
    );
    expect(diagram.querySelectorAll('[data-flow="control"]')).toHaveLength(3);
    expect(diagram.querySelectorAll('[data-flow="coverage"]')).toHaveLength(10);
    expect(diagram.querySelectorAll('[data-framework-endpoint]')).toHaveLength(8);
    expect(diagram.querySelectorAll('[data-connector-svg]')).toHaveLength(1);
    expect(diagram.querySelector('[data-connector-svg]')).not.toHaveAttribute('preserveAspectRatio', 'none');
    expect(diagram.querySelector('[data-connector-field]')).toHaveClass(
      'grid-cols-[31%_28%_41%]',
    );
    expect(diagram.querySelector('[data-connector-hub]')?.parentElement).toHaveClass(
      'justify-end',
      'max-[760px]:justify-center',
    );
    diagram.querySelectorAll('[data-flow]').forEach((path) => {
      expect(path).toHaveAttribute('stroke-width', '1.35');
    });
    expect(diagram.querySelectorAll('[data-connector-dot]')).toHaveLength(11);
    diagram.querySelectorAll('[data-connector-dot]').forEach((dot) => {
      expect(dot).toHaveClass('size-2');
    });
  });

  it('measures real anchors and recalculates connector geometry after resize', async () => {
    let firstTargetLeft = 700;
    vi.stubGlobal('ResizeObserver', ResizeObserverStub);
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function getRect() {
      if (this.matches('[data-connector-field]')) return rect(40, 80, 812, 436);
      if (this.matches('[data-connector-hub]')) return rect(410, 275, 20, 20);

      const sourceIndex = this.getAttribute('data-control-anchor');
      if (sourceIndex !== null) return rect(140, 120 + Number(sourceIndex) * 130, 10, 10);

      const targetIndex = this.getAttribute('data-framework-endpoint');
      if (targetIndex !== null) {
        const index = Number(targetIndex);
        const left = index === 0 ? firstTargetLeft : 700 + (index % 2) * 70;
        return rect(left, 110 + Math.floor(index / 2) * 96);
      }

      return rect(0, 0, 0, 0);
    });

    render(
      <MemoryRouter>
        <CyberFrameworksSection frameworks={cyberFrameworks} motionEnabled={false} />
      </MemoryRouter>,
    );

    const diagram = screen.getByRole('figure', {
      name: /shared controls mapped to distinct framework scope/i,
    });
    const svg = diagram.querySelector('[data-connector-svg]');
    const firstBranch = diagram.querySelector('[data-flow-target="0"]');
    const pairedBranch = diagram.querySelector('[data-flow-target="1"]');
    const branches = [...diagram.querySelectorAll('[data-flow-target]')];

    await waitFor(() => {
      expect(svg).toHaveAttribute('viewBox', '0 0 812 436');
      expect(firstBranch?.getAttribute('d')).toMatch(/664 34$/);
      expect(pairedBranch?.getAttribute('d')).toMatch(/734 34$/);
      for (let index = 0; index < branches.length; index += 2) {
        const left = branches[index].getAttribute('d').match(
          /^M ([\d.]+) ([\d.]+) L ([\d.]+) ([\d.]+)$/,
        );
        const right = branches[index + 1].getAttribute('d').match(
          /^M ([\d.]+) ([\d.]+) L ([\d.]+) ([\d.]+)$/,
        );
        expect(left?.[1]).toBe(right?.[1]);
        expect(left?.[2]).toBe(right?.[2]);
        expect(left?.[2]).toBe(left?.[4]);
        expect(right?.[2]).toBe(right?.[4]);
        expect(Number(left?.[3])).toBeLessThan(Number(left?.[1]));
        expect(Number(right?.[3])).toBeGreaterThan(Number(right?.[1]));
        expect(Number(left?.[1])).toBe((Number(left?.[3]) + Number(right?.[3])) / 2);
      }
    });

    firstTargetLeft = 730;
    act(() => ResizeObserverStub.instances[0].trigger());

    await waitFor(() => {
      expect(firstBranch?.getAttribute('d')).toMatch(/694 34$/);
    });
  });

  it('remeasures committed anchor reordering when the content props are unchanged', async () => {
    let firstTargetLeft = 700;
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function getRect() {
      if (this.matches('[data-connector-field]')) return rect(40, 80, 812, 436);
      if (this.matches('[data-connector-hub]')) return rect(410, 275, 20, 20);

      const sourceIndex = this.getAttribute('data-control-anchor');
      if (sourceIndex !== null) return rect(140, 120 + Number(sourceIndex) * 130, 10, 10);

      const targetIndex = this.getAttribute('data-framework-endpoint');
      if (targetIndex !== null) {
        const index = Number(targetIndex);
        const left = index === 0 ? firstTargetLeft : 700 + (index % 2) * 70;
        return rect(left, 110 + Math.floor(index / 2) * 96);
      }

      return rect(0, 0, 0, 0);
    });

    const renderSection = () => (
      <MemoryRouter>
        <CyberFrameworksSection frameworks={cyberFrameworks} motionEnabled={false} />
      </MemoryRouter>
    );
    const { rerender } = render(renderSection());
    const firstBranch = document.querySelector('[data-flow-target="0"]');

    await waitFor(() => expect(firstBranch).toHaveAttribute('d', 'M 699 34 L 664 34'));

    firstTargetLeft = 730;
    rerender(renderSection());

    await waitFor(() => expect(firstBranch).toHaveAttribute('d', 'M 714 34 L 694 34'));
  });

  it('reserves hover and focus feedback for the real section destination', () => {
    render(
      <MemoryRouter>
        <CyberFrameworksSection frameworks={cyberFrameworks} motionEnabled={false} />
      </MemoryRouter>,
    );

    const allFrameworks = screen.getByRole('link', { name: 'Explore All Frameworks' });
    expect(allFrameworks).toHaveClass('hover:text-navy', 'focus-visible:text-navy');
    expect(
      within(screen.getByRole('figure', {
        name: /shared controls mapped to distinct framework scope/i,
      })).queryByRole('link'),
    ).not.toBeInTheDocument();
  });

  it('renders all framework entries statically when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    render(
      <MemoryRouter>
        <CyberFrameworksSection frameworks={cyberFrameworks} motionEnabled />
      </MemoryRouter>,
    );

    const items = within(
      screen.getByRole('list', { name: 'Featured cyber and cloud frameworks' }),
    ).getAllByRole('listitem');
    const diagram = screen.getByRole('figure', {
      name: /shared controls mapped to distinct framework scope/i,
    });

    expect(diagram).toHaveAttribute('data-motion', 'static');
    expect(items).toHaveLength(8);
    items.forEach((item) => {
      expect(item).toHaveAttribute('data-motion', 'static');
      expect(item).not.toHaveStyle({ opacity: '0' });
    });
    diagram.querySelectorAll('[data-flow]').forEach((path) => {
      expect(path).not.toHaveStyle({ strokeDashoffset: '1' });
    });
  });

  it('uses normalized SVG dash attributes for the viewport draw sequence', () => {
    vi.stubGlobal('IntersectionObserver', IntersectionObserverStub);
    render(
      <MemoryRouter>
        <CyberFrameworksSection frameworks={cyberFrameworks} motionEnabled />
      </MemoryRouter>,
    );

    const diagram = screen.getByRole('figure', {
      name: /shared controls mapped to distinct framework scope/i,
    });
    expect(diagram).toHaveAttribute('data-motion', 'animated');
    diagram.querySelectorAll('[data-flow]').forEach((path) => {
      expect(path).toHaveAttribute('pathLength', '1');
      expect(path).toHaveAttribute('stroke-dasharray', '1');
      expect(path).toHaveAttribute('stroke-dashoffset', '1');
    });
  });

  it('resolves every connector to a complete visible path after entering the viewport', async () => {
    vi.stubGlobal('IntersectionObserver', IntersectionObserverStub);
    render(
      <MemoryRouter>
        <CyberFrameworksSection frameworks={cyberFrameworks} motionEnabled />
      </MemoryRouter>,
    );

    const diagram = screen.getByRole('figure', {
      name: /shared controls mapped to distinct framework scope/i,
    });
    gsap.globalTimeline.timeScale(100);
    act(() => {
      IntersectionObserverStub.instances[0].trigger({
        isIntersecting: true,
        intersectionRatio: 1,
      });
    });

    await waitFor(() => {
      diagram.querySelectorAll('[data-flow]').forEach((path) => {
        expect(path).toHaveAttribute('stroke-dashoffset', '0');
      });
    });
  });

  it('describes reuse without promising automatic completion', () => {
    render(
      <MemoryRouter>
        <CyberFrameworksSection frameworks={cyberFrameworks} motionEnabled />
      </MemoryRouter>,
    );

    expect(screen.getByText('Shared controls, distinct framework scope')).toBeInTheDocument();
    expect(screen.getByText('Access governance')).toBeInTheDocument();
    expect(
      screen.queryByText(/automatically complete|automatic compliance|one-click certified/i),
    ).not.toBeInTheDocument();
  });
});
