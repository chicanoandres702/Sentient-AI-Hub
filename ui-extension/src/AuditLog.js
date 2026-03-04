import React from 'react';

export default function AuditLog({ logs }) {
  return (
    <div>
      <h2>Audit Log</h2>
      <ul>
        {logs.map((log, i) => (
          <li key={i}>{log}</li>
        ))}
      </ul>
    </div>
  );
}
