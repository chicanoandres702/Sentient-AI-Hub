import React from 'react';

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
    <div>
      <h2>CI/CD Gate Status</h2>
      <ul>
        {gates.map((gate, i) => (
          <li key={gate}>
            {gate}: <strong>{status[gate] || 'Pending'}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
