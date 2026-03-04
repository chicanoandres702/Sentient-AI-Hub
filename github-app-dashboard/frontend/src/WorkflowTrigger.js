import React from 'react';
import { githubColors, neonGlow } from './githubTheme';

export default function WorkflowTrigger({ onTrigger, running }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <button
        onClick={onTrigger}
        disabled={running}
        style={{
          background: githubColors.neonBlue,
          color: githubColors.dark,
          border: 'none',
          borderRadius: 8,
          padding: '12px 32px',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          boxShadow: neonGlow,
          textShadow: neonGlow,
          cursor: running ? 'not-allowed' : 'pointer',
          transition: 'box-shadow 0.2s',
        }}
      >
        {running ? 'Running Workflow...' : 'Run Main Agent Workflow'}
      </button>
    </div>
  );
}
