#!/bin/bash
# Deploy backend and frontend for GitHub App dashboard

# Deploy backend (example: Heroku CLI)
cd backend
heroku create sentient-agent-hub-backend || true
heroku config:set -a sentient-agent-hub-backend $(cat .env | xargs)
git init && git add . && git commit -m "Deploy backend" || true
heroku git:remote -a sentient-agent-hub-backend
git push heroku master || true
cd ..

# Deploy frontend (example: Vercel CLI)
cd frontend
vercel --prod
cd ..

echo "Deployment complete!"
