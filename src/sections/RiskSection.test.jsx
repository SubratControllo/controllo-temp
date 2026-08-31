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
    expect(screen.getByRole('group', {
      name: /twenty-five risk groups. two critical/i
    })).toBeInTheDocument();
    expect(section.querySelectorAll('[data-risk-cell]')).toHaveLength(25);
    expect(section.querySelectorAll('[data-risk-level="critical"]')).toHaveLength(2);
    expect(section).toHaveTextContent('Risk Management based on NIST');
    expect(screen.getByRole('heading', {
      name: 'Manage Risk Across Your Entire Program'
    })).toBeInTheDocument();
    expect(section).toHaveTextContent(
      'Manage risks across asset, organization, vendor, privacy, and AI.'
    );
    expect(section).toHaveTextContent('Dashboards for Clear Risk Posture');
    expect(section).toHaveTextContent('2high asset risks');
    expect(section).toHaveTextContent('3moderate vendor risks');
    expect(section).toHaveTextContent('5low organisational risks');
    expect(screen.getByRole('link', {
      name: /explore unified risk/i
    })).toHaveAttribute('href', '/platform/risk-management');
  });

  it('explains and renders the complete risk severity scale', () => {
    renderSection(false);

    const legend = screen.getByRole('list', { name: /risk severity/i });
    const cells = screen.getAllByRole('img', { name: /risk group/i });

    expect(legend).toHaveTextContent('Controlled');
    expect(legend).toHaveTextContent('Low');
    expect(legend).toHaveTextContent('Moderate');
    expect(legend).toHaveTextContent('High');
    expect(legend).toHaveTextContent('Critical');
    expect(cells).toHaveLength(25);
    expect(cells.filter((cell) => cell.dataset.riskLevel === 'controlled')).toHaveLength(11);
    expect(cells.filter((cell) => cell.dataset.riskLevel === 'low')).toHaveLength(5);
    expect(cells.filter((cell) => cell.dataset.riskLevel === 'moderate')).toHaveLength(4);
    expect(cells.filter((cell) => cell.dataset.riskLevel === 'high')).toHaveLength(3);
    expect(cells.filter((cell) => cell.dataset.riskLevel === 'critical')).toHaveLength(2);
  });

  it('scatters severity levels across every matrix row', () => {
    renderSection(false);

    const levels = [...document.querySelectorAll('[data-risk-cell]')]
      .map((cell) => cell.dataset.riskLevel);
    const rows = Array.from({ length: 5 }, (_, index) =>
      levels.slice(index * 5, index * 5 + 5)
    );

    expect(rows.every((row) => new Set(row).size >= 3)).toBe(true);
    expect(new Set(rows.map((row) => row.join(','))).size).toBe(5);
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
