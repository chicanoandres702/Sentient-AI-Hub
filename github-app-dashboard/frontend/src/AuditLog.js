import React from 'react';
import { githubColors, neonGlow } from './githubTheme';

export default function AuditLog({ logs }) {
  return (
    <div style={{ margin: '32px 0', padding: 16, background: githubColors.dark, borderRadius: 12, boxShadow: neonGlow }}>
      <h2 style={{ color: githubColors.neonBlue, textShadow: neonGlow }}>Audit Log</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {logs.map((log, i) => (
          <li
            key={i}
            style={{
              color: githubColors.white,
              textShadow: neonGlow,
              marginBottom: 8,
              fontSize: '1rem',
            }}
          >
            {log}
          </li>
        ))}
      </ul>
    </div>
  );
}
