const endpoint = import.meta.env.VITE_LEAD_ENDPOINT;

export const LeadService = {
  async submit(payload) {
    if (!endpoint) {
      await new Promise((resolve) => setTimeout(resolve, 650));
      return { ok: true, simulated: true };
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error('We could not send your request. Try again or contact the Controllo team.');
    return response.json().catch(() => ({ ok: true }));
  }
};
