// API utility for UI <-> backend integration
export async function runMainAgentWorkflow() {
  const res = await fetch('http://localhost:3000/agents/run', { method: 'POST' });
  if (!res.ok) throw new Error('Workflow failed');
  return await res.json();
}

export async function getAuditLog() {
  const res = await fetch('http://localhost:3000/agents/audit');
  if (!res.ok) throw new Error('Failed to fetch audit log');
  return await res.json();
}
