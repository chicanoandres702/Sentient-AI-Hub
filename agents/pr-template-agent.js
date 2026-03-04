// PR Template Agent
// Generates PR markdown with milestone, issue, and task checklist
const fs = require('fs');
const path = require('path');
const AUDIT_LOG = path.join(__dirname, '../docs/audit-logs/agent-actions.md');

class PRTemplateAgent {
  generatePR(milestone, issue, tasks) {
    const prBody = `### Milestone: ${milestone}\n### Issue: #${issue}\n\n#### Tasks\n${tasks.map(t => `- [${t.done ? 'x' : ' '}] ${t.desc}`).join('\n')}\n\n#### Summary\nThis PR implements tasks for milestone ${milestone} and issue #${issue}. All changes are mapped for full traceability.\n\n---\n\n> All PRs must pass the 8 CI/CD gates and reference the correct milestone and issue.`;
    this.logAction('pr-generated', { milestone, issue, tasks });
    return prBody;
  }

  logAction(action, details) {
    const timestamp = new Date().toISOString();
    const entry = `| ${timestamp} | PRTemplateAgent | ${action} | ${JSON.stringify(details)} |\n`;
    fs.appendFileSync(AUDIT_LOG, entry);
  }

}

module.exports = PRTemplateAgent;
