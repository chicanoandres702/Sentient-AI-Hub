// Git Orchestrator Agent
// Automates milestone/issue provisioning, branch hierarchy, stashing, stale branch policy, and audit logging
const { execSync } = require('child_process');


const AUDIT_LOG = path.join(__dirname, '../docs/audit-logs/agent-actions.md');

class GitOrchestratorAgent {
  constructor(config) {
    this.config = config;
  }

  provisionMilestone(name, desc) {
    try {
      const checkCmd = `gh api repos/${this.config.owner}/${this.config.repo}/milestones --jq ".[] | select(.title==\"${name}\") | .number"`;
      const milestoneId = execSync(checkCmd).toString().trim();
      if (milestoneId) {
        this.logAction('milestone-checked', { name, milestoneId });
        return milestoneId;
      }
      const createCmd = `gh api repos/${this.config.owner}/${this.config.repo}/milestones -f title=\"${name}\" -f description=\"${desc}\"`;
      const result = execSync(createCmd).toString().trim();
      this.logAction('milestone-created', { name, desc, result });
      return result;
    } catch (e) {
      this.logAction('milestone-error', { name, error: e.message });
      throw new Error('Milestone provisioning failed: ' + e.message);
    }
  }

  provisionIssue(title, milestone, type, assignee, body) {
    try {
      const checkCmd = `gh issue list --milestone \"${milestone}\" --search \"${title}\"`;
      const exists = execSync(checkCmd).toString().includes(title);
      if (exists) {
        this.logAction('issue-checked', { title, milestone });
        return title;
      }
      const createCmd = `gh issue create --title \"${title}\" --milestone \"${milestone}\" --label \"${type}\" --assignee \"${assignee}\" --body \"${body}\"`;
      const result = execSync(createCmd).toString().trim();
      this.logAction('issue-created', { title, milestone, type, assignee, result });
      return result;
    } catch (e) {
      this.logAction('issue-error', { title, error: e.message });
      throw new Error('Issue provisioning failed: ' + e.message);
    }
  }

  createIntegrationBranch(milestoneSlug) {
    try {
      execSync(`git checkout -b feature/${milestoneSlug}`);
      execSync(`git push -u origin feature/${milestoneSlug}`);
      this.logAction('integration-branch-created', { milestoneSlug });
    } catch (e) {
      this.logAction('integration-branch-error', { milestoneSlug, error: e.message });
      throw new Error('Integration branch creation failed: ' + e.message);
    }
  }

  createExecutionBranch(milestoneSlug, taskSlug) {
    try {
      execSync(`git checkout feature/${milestoneSlug}`);
      execSync(`git checkout -b feature/${milestoneSlug}/${taskSlug}`);
      execSync(`git push -u origin feature/${milestoneSlug}/${taskSlug}`);
      this.logAction('execution-branch-created', { milestoneSlug, taskSlug });
    } catch (e) {
      this.logAction('execution-branch-error', { milestoneSlug, taskSlug, error: e.message });
      throw new Error('Execution branch creation failed: ' + e.message);
    }
  }

  stashUnrelatedChanges() {
    try {
      execSync(`git stash push -m "context-switch-$(date +%s)"`);
      this.logAction('stash-pushed', {});
    } catch (e) {
      this.logAction('stash-error', { error: e.message });
    }
  }

  restoreStash() {
    try {
      execSync(`git stash pop`);
      this.logAction('stash-popped', {});
    } catch (e) {
      this.logAction('stash-pop-error', { error: e.message });
    }
  }

  flagStaleBranches() {
    try {
      const branches = execSync('git branch -r | grep "feature/"').toString().split('\n');
      branches.forEach(branch => {
        if (branch.trim()) {
          const lastCommit = execSync(`git log -1 --format="%ar" origin/${branch.trim()}`).toString().trim();
          // If last commit > 14 days, log and prompt user
          this.logAction('stale-branch-checked', { branch: branch.trim(), lastCommit });
        }
      });
    } catch (e) {
      this.logAction('stale-branch-error', { error: e.message });
    }
  }

  logAction(action, details) {
    const timestamp = new Date().toISOString();
    const entry = `| ${timestamp} | GitOrchestratorAgent | ${action} | ${JSON.stringify(details)} |\n`;
    fs.appendFileSync(AUDIT_LOG, entry);
  }
}

module.exports = GitOrchestratorAgent;
