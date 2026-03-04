# Setup Guide: Sentient Agent Hub GitHub App Dashboard

## 1. Backend Setup
- Go to `github-app-dashboard/backend/`
- Copy `.env.example` to `.env` and fill in your GitHub App credentials
- Run `npm install`
- Start backend: `npm start`

## 2. Frontend Setup
- Go to `github-app-dashboard/frontend/`
- Run `npm install`
- Start frontend: `npm start`

## 3. Register & Install GitHub App
- Go to https://github.com/settings/apps/new
- Set callback URL to your backend (e.g., Render, Heroku)
- Add permissions for repo metadata, actions, issues, pull requests
- Download private key and fill `.env`
- Install the app on your repo

## 4. Usage
- Visit the dashboard tab in your repo (once installed)
- Trigger workflows, view gate status, and audit logs

---
For advanced integration, see backend/README.md and frontend/README.md
