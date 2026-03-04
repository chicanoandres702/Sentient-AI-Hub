import React, { useState } from 'react';
import GateStatus from './GateStatus';
import WorkflowTrigger from './WorkflowTrigger';
import AuditLog from './AuditLog';

function App() {
  const [status, setStatus] = useState({});
  const [logs, setLogs] = useState([]);
  const [running, setRunning] = useState(false);

  // Simulate backend workflow trigger
  const runWorkflow = async () => {
    setRunning(true);
    setLogs([]);
    setStatus({});
    // Simulate each gate
    const gates = [
      'Project Structure & Compliance',
      'Refactor & Code Quality',
      'Test Validation & Coverage',
      'AI Code Generation & Q&A',
      'GitHub CLI Automation',
      'GitHub API Automation',
      'Audit Logging'
    ];
    for (const gate of gates) {
      setLogs(logs => [...logs, `Running: ${gate}`]);
      await new Promise(res => setTimeout(res, 500));
      setStatus(s => ({ ...s, [gate]: 'Passed' }));
      setLogs(logs => [...logs, `Completed: ${gate}`]);
    }
    setRunning(false);
    setLogs(logs => [...logs, 'Workflow completed!']);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Sentient Agent Hub UI</h1>
      <WorkflowTrigger onTrigger={runWorkflow} running={running} />
      <GateStatus status={status} />
      <AuditLog logs={logs} />
    </div>
  );
}

export default App;
