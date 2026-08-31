import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TrustStrip from './TrustStrip';

describe('TrustStrip', () => {
  it('keeps the proof copy fixed beside an expanded framework marquee', () => {
    const { container } = render(<TrustStrip motionEnabled={false} />);

    const strip = screen.getByRole('region', {
      name: /popular compliance framework landscape/i
    });
    const frameworks = within(strip).getByRole('list', {
      name: /popular compliance frameworks/i
    });

    expect(strip).toHaveAttribute('data-motion', 'static');
    expect(strip).toHaveTextContent('Compliance is always evolving.');
    expect(strip).toHaveTextContent('So are we.');
    expect(within(frameworks).getAllByRole('listitem')).toHaveLength(8);
    expect(within(frameworks).getByText('SOC 2')).toBeInTheDocument();
    expect(within(frameworks).getByText('ISO/IEC 27001')).toBeInTheDocument();
    expect(within(frameworks).getByText('NIST CSF 2.0')).toBeInTheDocument();
    expect(within(frameworks).getByText('PCI DSS')).toBeInTheDocument();
    expect(within(frameworks).getByText('CIS Controls v8.1')).toBeInTheDocument();
    expect(container.querySelectorAll('[data-framework-item]')).toHaveLength(16);
    expect(container.querySelectorAll('[data-framework-wordmark]')).toHaveLength(16);
    expect(container.querySelectorAll('[data-framework-emblem]')).toHaveLength(0);
  });

  it('enables the continuous marquee only when site motion is enabled', () => {
    render(<TrustStrip motionEnabled />);

    expect(screen.getByRole('region', {
      name: /popular compliance framework landscape/i
    })).toHaveAttribute('data-motion', 'marquee');
  });
});
