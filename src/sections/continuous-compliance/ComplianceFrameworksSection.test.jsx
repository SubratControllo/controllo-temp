import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { complianceFrameworksContent } from '../../data/continuousComplianceContent';
import ComplianceFrameworksSection from './ComplianceFrameworksSection';

describe('ComplianceFrameworksSection', () => {
  it('shows eight framework names but links only published detail routes', () => {
    render(
      <MemoryRouter>
        <ComplianceFrameworksSection content={complianceFrameworksContent} motionEnabled={false} />
      </MemoryRouter>,
    );

    const list = screen.getByRole('list', { name: 'Featured frameworks' });
    const support = screen.getByRole('list', { name: 'Reusable control support' });

    expect(screen.getByText('Shared control model')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'One control record can support more than one framework.' })).toBeInTheDocument();
    expect(within(support).getAllByRole('listitem')).toHaveLength(4);
    expect(within(support).getByText('Current description')).toBeInTheDocument();
    expect(within(support).getByText('Linked support')).toBeInTheDocument();
    expect(within(support).getByText('Reviewable by scope')).toBeInTheDocument();
    expect(within(support).getByText('Preserved')).toBeInTheDocument();
    expect(within(list).getAllByRole('listitem')).toHaveLength(8);
    expect(within(list).getByRole('link', { name: 'SOC 2' })).toHaveAttribute('href', '/frameworks/soc-2');
    expect(within(list).getByRole('link', { name: 'ISO/IEC 27001' })).toHaveAttribute('href', '/frameworks/iso-27001');
    expect(within(list).queryByRole('link', { name: 'GDPR' })).not.toBeInTheDocument();
    expect(within(list).queryByRole('link', { name: 'ISO/IEC 42001' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Explore frameworks' })).toHaveAttribute('href', '/frameworks');
    expect(screen.queryByText(/explore all 100\+/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
    expect(screen.queryByText(/autonomous|real-time|continuous control testing/i)).not.toBeInTheDocument();
  });
});
