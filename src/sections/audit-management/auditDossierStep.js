export function getAuditDossierStep(progress, total) {
  if (total <= 1) return 0;
  return Math.min(total - 1, Math.floor(Math.max(0, progress) * total));
}
