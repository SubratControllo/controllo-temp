import { render, screen } from '@testing-library/react';
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
      name: /risk heatmap with a high asset risk selected/i
    })).toBeInTheDocument();
    expect(section.querySelectorAll('[data-risk-cell]')).toHaveLength(25);
    expect(section.querySelectorAll('[data-risk-level="critical"]')).toHaveLength(1);
    expect(section).not.toHaveTextContent('A1');
    expect(section).not.toHaveTextContent('B1');
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

  it('renders the product-style stepped heatmap', () => {
    renderSection(false);

    const heatmap = screen.getByRole('img', { name: /risk heatmap with a high asset risk selected/i });

    expect(heatmap).toHaveAttribute('data-risk-heatmap', 'product');
    expect(heatmap.querySelector('[data-risk-selected="true"]')).toHaveAttribute('transform', 'translate(350 150)');
    expect(screen.queryByRole('list', { name: /risk severity/i })).not.toBeInTheDocument();
  });

  it('matches the stepped color distribution from the product reference', () => {
    renderSection(false);

    const levels = [...document.querySelectorAll('[data-risk-cell]')]
      .map((cell) => cell.dataset.riskLevel);

    expect(levels).toEqual([
      'low', 'low', 'moderate', 'high', 'critical',
      'low', 'low', 'moderate', 'high', 'high',
      'low', 'low', 'low', 'moderate', 'moderate',
      'low', 'low', 'low', 'low', 'low',
      'very-low', 'very-low', 'very-low', 'none', 'very-low',
    ]);
  });

  it('keeps the marker static when motion is reduced', () => {
    renderSection(false);

    expect(screen.queryByTestId('risk-scan')).not.toBeInTheDocument();
    expect(document.querySelector('[data-risk-selected="true"] animateTransform')).not.toBeInTheDocument();
  });

  it('animates the marker between heatmap squares when motion is enabled', () => {
    renderSection(true);

    const section = screen.getByRole('region', {
      name: /connected risk prioritization/i
    });

    expect(section).toHaveAttribute('data-motion', 'sequenced');
    expect(screen.queryByTestId('risk-scan')).not.toBeInTheDocument();
    expect(document.querySelector('[data-risk-selected="true"] animateTransform')).toHaveAttribute('values', '350 150;450 50;350 250;250 150;350 150');
  });

});
