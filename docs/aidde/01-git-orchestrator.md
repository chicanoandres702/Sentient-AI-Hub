# Git Orchestrator Law

Defines rules for git orchestration, branching, and compliance.

## 1. Branching Strategy

All feature, bugfix, and release branches must follow strict naming conventions:
	- `feature/<issue-id>-<short-desc>`
	- `bugfix/<issue-id>-<short-desc>`
	- `release/<version>`
No orphaned branches: every branch must be mapped to a tracked issue, feature, or milestone.
Branches must be deleted after merge or completion.

## 2. Branch Protection Rules

Main and release branches are protected:
	- Require PR review and approval by at least one agent and one human.
	- Require passing all CI/CD gate checks before merge.
	- No force pushes allowed.
	- All merges must be via pull request (no direct commits).

## 3. Merge Policies

All merges must be traceable to a mapped issue, feature, or milestone.
Squash merges preferred for feature/bugfix branches; rebase for release branches.
Merge commits must reference related issue numbers and include audit log entries.

## 4. Audit Logging

Every branch creation, merge, deletion, and force-push attempt is logged by the Audit Agent.
Audit logs are immutable and versioned in `/docs/audit-logs/`.
All agent actions must include reasoning and compliance evidence.

## 5. Agent Responsibilities

Git Orchestrator Agent:
	- Enforces branch naming and mapping.
	- Blocks orphaned branches and merges.
	- Delegates merge, review, and audit tasks to subagents.
	- Escalates ambiguous or risky actions to human review.
Audit Agent:
	- Logs all git actions and merges.
	- Flags compliance violations and triggers rollback if needed.

## 6. Compliance & Enforcement

Violations of branch protection, merge policy, or audit logging halt the workflow and require manual intervention.
All compliance rules are enforced by agents and validated by CI/CD gates.
No code, branch, or commit is allowed without full traceability and auditability.


> For expanded law, see `/docs/aidde/` and `/docs/agent-principles.md`.

## 7. Orchestration of Feature Creation and File Stashing

When creating a new feature, the Git Orchestrator Agent must:
	- Review all current features and issues to ensure no duplication or orphaned work.
	- Stash any files or changes that are not directly related to the current issue or feature.
	- Appropriately associate stashed files with a new or existing issue/feature, as determined by context and traceability.
	- Before committing, verify that all changes are mapped to the correct feature and issue.
	- If a file or change does not belong to the current issue, create a new issue or feature and associate the change accordingly.
	- Maintain a clear audit trail of all stashing, association, and commit actions for compliance and traceability.
