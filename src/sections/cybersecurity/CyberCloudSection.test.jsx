import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { cyberCloudViews } from '../../data/cybersecurityContent';
import CyberCloudSection from './CyberCloudSection';

describe('CyberCloudSection', () => {
  it('starts with a source-to-signal board using the reviewed cloud brand marks', () => {
    render(<CyberCloudSection views={cyberCloudViews} motionEnabled={false} />);

    expect(screen.getByRole('tab', { name: 'Cloud Assets' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Identities & Devices' })).toHaveAttribute('aria-selected', 'false');

    const panel = screen.getByRole('tabpanel', { name: 'Cloud Assets' });
    expect(within(panel).getByRole('heading', { name: 'Connected sources' })).toBeInTheDocument();
    expect(within(panel).getByRole('heading', { name: 'Visible signals' })).toBeInTheDocument();
    expect(within(panel).getByRole('heading', { name: 'Attention needed' })).toBeInTheDocument();
    expect(within(panel).getByText('GCP assets')).toBeInTheDocument();
    expect(within(panel).getByText('Synced')).toBeInTheDocument();
    expect(within(panel).getByText('Illustrative product view')).toBeInTheDocument();

    expect([...panel.querySelectorAll('[data-brand-logo]')].map((image) => image.getAttribute('src'))).toEqual([
      '/assets/brands/aws.svg',
      '/assets/brands/microsoft-azure.svg',
      '/assets/brands/google-cloud.svg',
    ]);
  });

  it('uses exact workforce product names for branded sources', async () => {
    const user = userEvent.setup();
    render(<CyberCloudSection views={cyberCloudViews} motionEnabled={false} />);

    await user.click(screen.getByRole('tab', { name: 'Identities & Devices' }));

    const panel = screen.getByRole('tabpanel', { name: 'Identities & Devices' });
    expect(within(panel).getByText('Microsoft Intune')).toBeInTheDocument();
    expect(within(panel).getByText('Microsoft Defender')).toBeInTheDocument();
    expect(within(panel).getByText('Google Workspace')).toBeInTheDocument();
  });

  it('supports wrapping Arrow keys plus Home and End', async () => {
    const user = userEvent.setup();
    render(<CyberCloudSection views={cyberCloudViews} motionEnabled />);

    const cloud = screen.getByRole('tab', { name: 'Cloud Assets' });
    cloud.focus();

    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Alerts & Exposure' })).toHaveFocus();
    expect(screen.getByRole('tabpanel', { name: 'Alerts & Exposure' })).toBeInTheDocument();

    await user.keyboard('{Home}');
    expect(cloud).toHaveFocus();

    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Alerts & Exposure' })).toHaveFocus();
  });

  it('does not claim that operational signals update controls', () => {
    render(<CyberCloudSection views={cyberCloudViews} motionEnabled={false} />);

    expect(screen.queryByText(/automatically map|update control status|continuous control mapping/i)).not.toBeInTheDocument();
    expect(document.querySelector('[data-cloud-control-connector]')).not.toBeInTheDocument();
  });
});
