# Backend for Sentient Agent Hub GitHub App

## Features
- GitHub App authentication (JWT)
- REST API for dashboard data: gate status, workflow trigger, audit logs
- Webhook handler for repo events

## Setup
1. Create a GitHub App and download the private key
2. Add `.env` with:
   - `GITHUB_APP_ID=your-app-id`
   - `GITHUB_PRIVATE_KEY=your-private-key`
   - `WEBHOOK_SECRET=your-webhook-secret`
3. Run `npm install`
4. Start with `npm start`

## Endpoints
- `GET /status` — CI/CD gate status
- `POST /trigger` — Trigger workflow
- `GET /audit` — Audit logs
