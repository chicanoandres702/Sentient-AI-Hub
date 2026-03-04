import React from 'react';
import { githubColors, neonGlow } from './githubTheme';

const gates = [
  'Project Structure & Compliance',
  'Refactor & Code Quality',
  'Test Validation & Coverage',
  'AI Code Generation & Q&A',
  'GitHub CLI Automation',
  'GitHub API Automation',
  'Audit Logging'
];

export default function GateStatus({ status }) {
  return (
    <div style={{ margin: '32px 0', padding: 16, background: githubColors.gray, borderRadius: 12, boxShadow: neonGlow }}>
      <h2 style={{ color: githubColors.neonBlue, textShadow: neonGlow }}>CI/CD Gate Status</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {gates.map((gate, i) => (
          <li
            key={gate}
            style={{
              marginBottom: 12,
              color: githubColors.white,
              textShadow: neonGlow,
              fontWeight: 'bold',
              fontSize: '1.1rem',
            }}
          >
            {gate}: <span style={{ color: status[gate] === 'Passed' ? githubColors.blue : githubColors.accent }}>{status[gate] || 'Pending'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
