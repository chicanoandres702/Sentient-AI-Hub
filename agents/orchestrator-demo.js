// Orchestrator Demo: End-to-End AIDDE Workflow
const GitOrchestratorAgent = require('./git-orchestrator-agent');
const StaleBranchAgent = require('./stale-branch-agent');
const PRTemplateAgent = require('./pr-template-agent');

const config = {
  owner: 'your-org',
  repo: 'sentient-agent-hub',
};

const gitAgent = new GitOrchestratorAgent(config);
const staleAgent = new StaleBranchAgent(config);
const prAgent = new PRTemplateAgent();

async function runDemo() {
  // 1. Provision Milestone & Issue
  const milestoneId = gitAgent.provisionMilestone('User Authentication', 'Implement secure user auth');
  const issueId = gitAgent.provisionIssue('Add JWT login', 'User Authentication', 'feature', 'andrew', 'See traceability template');

  // 2. Create Branches
  gitAgent.createIntegrationBranch('user-authentication');
  gitAgent.createExecutionBranch('user-authentication', 'add-jwt-login');

  // 3. Stash unrelated changes
  gitAgent.stashUnrelatedChanges();

  // 4. Restore context after switch
  gitAgent.restoreStash();

  // 5. Flag stale branches
  staleAgent.flagStaleBranches();

  // 6. Generate PR template
  const prBody = prAgent.generatePR('User Authentication', issueId, [
    { desc: 'Add password reset endpoint', done: true },
    { desc: 'Integrate JWT authentication', done: true },
    { desc: 'Add OAuth support', done: false },
  ]);
  console.log('PR Body Example:\n', prBody);

  // 7. Log actions (pseudo)
  gitAgent.logAction('provision', { milestoneId, issueId });
}

runDemo();
