# Orchestrator Agent Wiring

This document describes how to wire up all AIDDE agents for a complete, automated workflow.

## Agents
- **GitOrchestratorAgent**: Milestone/issue/branch provisioning, stashing, audit logging
- **StaleBranchAgent**: Flags and manages stale branches
- **PRTemplateAgent**: Generates PR markdown with milestone, issue, and task checklist

## Integration Steps
1. **Initialize agents** with repo config
2. **Provision milestone and issue** before any branch creation
3. **Create integration and execution branches** following hierarchy
4. **Stash unrelated changes** before switching context
5. **Restore stashed changes** after context switch
6. **Flag stale branches** and prompt user for action
7. **Generate PR template** for every pull request
8. **Log all actions** for compliance and traceability

## Example Usage
```js
const GitOrchestratorAgent = require('./git-orchestrator-agent');
const StaleBranchAgent = require('./stale-branch-agent');
const PRTemplateAgent = require('./pr-template-agent');

const config = { owner: 'your-org', repo: 'sentient-agent-hub' };
const gitAgent = new GitOrchestratorAgent(config);
const staleAgent = new StaleBranchAgent(config);
const prAgent = new PRTemplateAgent();

// Provision milestone/issue, create branches, stash/restore, flag stale, generate PR, log actions
```

## Compliance
- All steps must follow AIDDE law and CI/CD gates
- No orphaned code, branch, or issue
- All actions are auditable
