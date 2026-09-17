export const cloudMonitoringMeta = {
  title: 'Cloud Security & Compliance Monitoring | Controllo',
  description:
    'Monitor supported AWS, Azure, GCP, Microsoft 365, and Google Workspace environments with current asset, configuration, identity, security, and available exposure context.',
};

export const cloudMonitoringHero = {
  eyebrow: 'Live cloud monitoring',
  title: 'See your cloud.',
  titleAccent: 'Know the risk.',
  description:
    'Connect supported cloud and end-user environments to Controllo for a current view of assets, configurations, security signals, endpoint, and identity metrics.',
  detail:
    'From AWS, Azure, and GCP to Microsoft 365 and Google Workspace, bring environment context into one connected view so your team can see what needs attention without switching between platforms.',
  support: 'Current assets. Security signals. Compliance context. One view.',
  providers: [
    { name: 'AWS', brandKey: 'aws', sync: 'Recently refreshed', resources: 'Asset inventory', state: 'Connected', detail: 'Asset inventory and configuration context' },
    { name: 'Microsoft Azure', brandKey: 'microsoftAzure', sync: 'Recently refreshed', resources: 'Asset inventory', state: 'Connected', detail: 'Asset inventory and configuration context' },
    { name: 'Google Cloud', brandKey: 'googleCloud', sync: 'Synchronized', resources: 'Supported assets', state: 'Connected', detail: 'Supported asset synchronization' },
    { name: 'Microsoft 365', brandKey: 'microsoft365', sync: 'Recently refreshed', resources: 'Identity & endpoint', state: 'Connected', detail: 'Identity and endpoint signals' },
    { name: 'Google Workspace', brandKey: 'googleWorkspace', sync: 'Recently refreshed', resources: 'Users & devices', state: 'Connected', detail: 'Account, device, and activity context' },
  ],
};

export const cloudVisibility = {
  eyebrow: 'Cloud asset visibility',
  title: 'Know what’s running and how it’s configured.',
  description:
    'Cloud environments change constantly. New resources appear, configurations change, and services expand across regions. Controllo gives your team a centralized view of connected cloud assets and the configuration context behind them.',
  providers: [
    ['AWS', 'View connected AWS services, resources, regions, and relevant configuration information.', 'aws'],
    ['Microsoft Azure', 'Bring Azure assets and cloud configuration details into the same monitoring experience.', 'microsoftAzure'],
    ['Google Cloud Platform', 'Synchronize supported GCP resources and services into the shared asset register.', 'googleCloud'],
  ],
  highlight: 'AWS + Azure + GCP → One connected cloud view',
};

export const cloudSignals = {
  eyebrow: 'Security & compliance signals',
  title: 'Don’t just inventory assets. Understand what needs attention.',
  description:
    'Knowing that a cloud resource exists is only the first step. Controllo surfaces relevant configuration and security context across connected environments, helping your team identify assets that may require further review.',
  steps: [
    ['Asset configuration', 'View configuration information for supported connected cloud assets.'],
    ['Security signals', 'Surface conditions that may introduce security concerns.'],
    ['Compliance context', 'Review configuration information alongside the compliance work it may inform.'],
    ['Resource context', 'See which provider, service, region, and asset the signal relates to.'],
  ],
  highlight: 'Review each finding with its provider, service, region, and asset context.',
};

export const identityVisibility = {
  eyebrow: 'Beyond cloud infrastructure',
  title: 'Your cloud risk doesn’t stop at the infrastructure layer.',
  description:
    'Users, identities, and endpoints are part of the same security picture. Controllo brings supported Microsoft 365 and Google Workspace account, identity, device, and activity context into regularly refreshed operational views.',
  sources: [
    ['Microsoft 365', 'Review supported user, identity, endpoint, alert, and access context from your connected Microsoft environment.'],
    ['Google Workspace', 'Bring supported account, identity, device, alert, and activity information into the same monitoring experience.'],
  ],
  signals: ['Identity visibility', 'Endpoint metrics', 'Access activity', 'Security alerts'],
  highlight: 'Cloud. Identity. Endpoint. Connected.',
};

export const exposureMonitoring = {
  eyebrow: 'Exposure monitoring',
  title: 'Know when user-level exposure needs investigation.',
  description:
    'Some risks begin outside your cloud environment. When available, Controllo surfaces detected exposure indicators associated with organizational users so security teams can investigate relevant credential data alongside wider monitoring activity.',
  signals: [
    ['User exposure', 'Identify organizational accounts associated with available exposure indicators.'],
    ['Credential indicators', 'Review available password or hash indicators without treating them as proof of active compromise.'],
    ['Centralized monitoring', 'Keep exposure context visible beside cloud, identity, and endpoint activity.'],
    ['Faster awareness', 'Give security teams another signal to review before deciding the next action.'],
  ],
  highlight: 'Cloud monitoring shows what is happening inside. Exposure indicators add context from outside.',
};

export const connectedWorkflows = {
  eyebrow: 'Connected workflows',
  title: 'See the issue. Get the right team moving.',
  description:
    'When findings need follow-up, teams can use Controllo’s supported Jira integration to create, assign, and track tickets.',
  steps: ['Finding', 'Ticket', 'Owner', 'Status'],
  destinations: [
    ['Jira integration', 'Create and manage follow-up tickets through the supported Jira integration.', 'jira'],
    ['Review owner', 'Assign Jira issues to keep follow-up ownership visible.'],
    ['Action record', 'Use issue status, comments, worklogs, and history to retain the follow-up record.'],
  ],
};

export const cloudMonitoringClosing = {
  eyebrow: 'Bring your cloud into view',
  title: 'See more than your assets.',
  description:
    'Connect your cloud, identity and end-user environments to understand what is running, how it is configured and where security or compliance signals need attention.',
  detail:
    'Add dark-web exposure monitoring and connected team workflows, and your cloud security picture becomes much easier to act on.',
  supportingLine: 'From cloud assets to identity exposure—see the signals that matter.',
};
