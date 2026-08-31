import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import RiskSection from './RiskSection';

const renderSection = (motionEnabled) => render(
  <MemoryRouter>
    <RiskSection motionEnabled={motionEnabled} />
  </MemoryRouter>
);

describe('RiskSection', () => {
  it('presents the connected-risk proof and its product destination', () => {
    renderSection(false);

    const section = screen.getByRole('region', {
      name: /connected risk prioritization/i
    });

    expect(section).toHaveAttribute('data-motion', 'static');
    expect(screen.getByRole('img', {
      name: /twenty-five risk groups. two critical/i
    })).toBeInTheDocument();
    expect(section.querySelectorAll('[data-risk-cell]')).toHaveLength(25);
    expect(section.querySelectorAll('[data-risk-level="critical"]')).toHaveLength(2);
    expect(screen.getByRole('link', {
      name: /explore unified risk/i
    })).toHaveAttribute('href', '/platform/risk-management');
  });

  it('removes the decorative scan when motion is reduced', () => {
    renderSection(false);

    expect(screen.queryByTestId('risk-scan')).not.toBeInTheDocument();
  });

  it('adds one sequenced scan to the motion-enabled product proof', () => {
    renderSection(true);

    const section = screen.getByRole('region', {
      name: /connected risk prioritization/i
    });

    expect(section).toHaveAttribute('data-motion', 'sequenced');
    expect(screen.getByTestId('risk-scan')).toBeInTheDocument();
  });

  it('adds a motion-gated pointer glow surface to the risk grid', () => {
    const { rerender } = renderSection(true);
    const hoverField = screen.getByTestId('risk-matrix-hover-field');
    const firstCell = hoverField.querySelector('[data-risk-cell]');

    expect(hoverField).toHaveAttribute('data-risk-hover', 'enabled');

    fireEvent.mouseMove(hoverField, { clientX: 48, clientY: 52 });

    expect(hoverField.style.getPropertyValue('--risk-glow-opacity')).toBe('1');
    expect(firstCell.style.getPropertyValue('--risk-cell-glow-opacity')).toBe('');
    expect(hoverField.querySelector('[data-risk-hot="true"]')).not.toBeInTheDocument();

    fireEvent.mouseLeave(hoverField);

    expect(hoverField.style.getPropertyValue('--risk-glow-opacity')).toBe('0');
    expect(hoverField.querySelector('[data-risk-hot="true"]')).not.toBeInTheDocument();

    rerender(
      <MemoryRouter>
        <RiskSection motionEnabled={false} />
      </MemoryRouter>
    );

    const staticHoverField = screen.getByTestId('risk-matrix-hover-field');

    expect(staticHoverField).toHaveAttribute('data-risk-hover', 'disabled');

    fireEvent.mouseMove(staticHoverField, { clientX: 48, clientY: 52 });

    expect(staticHoverField.style.getPropertyValue('--risk-glow-opacity')).toBe('0');
  });
});
