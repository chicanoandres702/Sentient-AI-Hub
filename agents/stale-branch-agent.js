// Stale Branch Agent
// Flags branches with no commits in 14+ days and prompts user for action

const fs = require('fs');
const path = require('path');
const AUDIT_LOG = path.join(__dirname, '../docs/audit-logs/agent-actions.md');
const { execSync } = require('child_process');

class StaleBranchAgent {
  constructor(config) {
    this.config = config;
  }

  flagStaleBranches() {
    try {
      const branches = execSync('git branch -r | grep "feature/"').toString().split('\n');
      branches.forEach(branch => {
        if (branch.trim()) {
          const lastCommit = execSync(`git log -1 --format="%ar" origin/${branch.trim()}`).toString().trim();
          // Pseudocode: if (daysSince(lastCommit) > 14) { prompt user: continue | close | reassign }
          this.logAction('stale-branch-checked', { branch: branch.trim(), lastCommit });
        }
      });
    } catch (e) {
      this.logAction('stale-branch-error', { error: e.message });
    }
  }

  logAction(action, details) {
    const timestamp = new Date().toISOString();
    const entry = `| ${timestamp} | StaleBranchAgent | ${action} | ${JSON.stringify(details)} |\n`;
    fs.appendFileSync(AUDIT_LOG, entry);
  }
}

module.exports = StaleBranchAgent;
