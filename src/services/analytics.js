export const Analytics = {
  track(eventName, properties = {}) {
    if (
      typeof window === 'undefined'
      || !import.meta.env.PROD
      || import.meta.env.VITE_ANALYTICS_ENABLED !== 'true'
      || ['preview', 'staging'].includes(import.meta.env.VITE_SITE_ENV)
      || localStorage.getItem('controllo-consent') !== 'accepted'
    ) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...properties });
  }
};
