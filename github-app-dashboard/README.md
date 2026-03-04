# Sentient Agent Hub GitHub App Dashboard

A native dashboard for your repo, powered by a GitHub App. Shows CI/CD gate status, workflow triggers, and audit logs with GitHub colors and neon blue glow.

## Features
- Native dashboard tab in your repo
- CI/CD gate status
- Workflow trigger button
- Audit log display
- GitHub standard colors + neon blue glow

## Setup
1. Register a new GitHub App at https://github.com/settings/apps/new
2. Set callback URL to your deployed backend (e.g., Render, Vercel, Heroku)
3. Add permissions for repository metadata, actions, issues, and pull requests
4. Clone this folder and run `npm install && npm start` in both `backend/` and `frontend/`
5. Install the app on your repo

## Usage
- Visit the dashboard tab in your repo (once installed)
- Trigger workflows, view gate status, and audit logs

---
For full instructions, see backend/README.md and frontend/README.md
