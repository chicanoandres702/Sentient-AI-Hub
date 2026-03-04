// API utility for frontend <-> backend integration
export async function getStatus() {
  const res = await fetch('/api/status');
  if (!res.ok) throw new Error('Failed to fetch status');
  return await res.json();
}

export async function triggerWorkflow() {
  const res = await fetch('/api/trigger', { method: 'POST' });
  if (!res.ok) throw new Error('Failed to trigger workflow');
  return await res.json();
}

export async function getAuditLog() {
  const res = await fetch('/api/audit');
  if (!res.ok) throw new Error('Failed to fetch audit log');
  return await res.json();
}
