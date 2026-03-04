# Sentient Agent Hub Usage Guide

## Authentication Options
Sentient Agent Hub supports two authentication methods:

### 1. GitHub CLI (`gh`)
- Install GitHub CLI: https://cli.github.com/
- Run `gh auth login` to authenticate with your account (all permissions).
- Agents will use `gh` CLI for all actions if available.

### 2. GitHub App Credentials
- Create a GitHub App and obtain:
  - App ID
  - Private Key (PEM)
  - Install ID
- Add these to your `.env` file:
  - `AIDDE_APP_ID`, `AIDDE_APP_PRIVATE_KEY`, `AIDDE_INSTALL_ID`
- Agents will use App credentials if `gh` CLI is not available.

## How It Works
- The system auto-detects authentication:
  - If `gh` CLI is installed and authenticated, it is used for all repo actions.
  - If not, agents fall back to GitHub App credentials.
- You can switch methods at any time—just ensure one is configured.

## Automated GitHub App Installation Token Retrieval

1. Edit `scripts/github-app-config.json` and fill in your App ID, Install ID, and private key path.
2. Run:
   ```sh
   node scripts/get-installation-token.js
   ```
3. The script will print your installation token and expiration time.

Use this token for advanced GitHub App API automation.

## Setup
1. Install Node.js, Python, npm, and GitHub CLI (`gh`).
2. Clone the repo and run `npm install`.
3. Set up your GitHub App and add credentials to `.env`:
   - `AIDDE_APP_ID`, `AIDDE_APP_PRIVATE_KEY`, `AIDDE_INSTALL_ID`
4. Authenticate with GitHub CLI: `gh auth login`

## Running Agents
- Use the orchestrator demo or agent modules to provision milestones, issues, branches, and PRs.
- All actions are logged for audit and compliance.
- Run `node agents/orchestrator-demo.js` for a workflow example.

## Testing
- Run `npm test` to execute automated agent tests in `tests/agent.test.js`.

## Deployment
- Use `scripts/deploy.sh` to install dependencies and start the server.

## Troubleshooting
- Ensure all environment variables are set.
- Check audit logs in `docs/audit-logs/agent-actions.md` for errors.
- For GitHub App issues, verify authentication with `gh auth status`.
- Review wiring summary in `docs/wiring-summary.md` for architecture clarity.
