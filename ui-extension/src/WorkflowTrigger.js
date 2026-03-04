import React from 'react';

export default function WorkflowTrigger({ onTrigger, running }) {
  return (
    <div>
      <button onClick={onTrigger} disabled={running}>
        {running ? 'Running Workflow...' : 'Run Main Agent Workflow'}
      </button>
    </div>
  );
}
