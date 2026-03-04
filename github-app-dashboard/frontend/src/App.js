import React, { useState } from 'react';
import GateStatus from './GateStatus';
import WorkflowTrigger from './WorkflowTrigger';
import AuditLog from './AuditLog';
import { githubColors, neonGlow } from './githubTheme';
import { getStatus, triggerWorkflow, getAuditLog } from './api';

function App() {
  const [status, setStatus] = useState({});
  const [logs, setLogs] = useState([]);
  const [running, setRunning] = useState(false);

  // Fetch gate status from backend
  const fetchStatus = async () => {
    try {
      const data = await getStatus();
      setStatus(data.gates || {});
    } catch (e) {
      setStatus({});
    }
  };

  // Trigger workflow and fetch audit log
  const runWorkflow = async () => {
    setRunning(true);
    setLogs([]);
    try {
      await triggerWorkflow();
      await fetchStatus();
      const audit = await getAuditLog();
      setLogs(audit);
    } catch (e) {
      setLogs([`Error: ${e.message}`]);
    }
    setRunning(false);
  };

  React.useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: githubColors.dark,
        color: githubColors.white,
        padding: 20,
        fontFamily: 'Segoe UI, Arial, sans-serif',
        boxShadow: neonGlow,
      }}
    >
      <h1
        style={{
          color: githubColors.accent,
          textShadow: neonGlow,
          fontSize: '2.5rem',
          marginBottom: 24,
        }}
      >
        Sentient Agent Hub Dashboard
      </h1>
      <WorkflowTrigger onTrigger={runWorkflow} running={running} />
      <GateStatus status={status} />
      <AuditLog logs={logs} />
    </div>
  );
}

export default App;
