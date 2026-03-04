# Deployment Guide: Sentient Agent Hub GitHub App Dashboard

## Backend (Heroku Example)
- Go to `backend/`
- Run `heroku create sentient-agent-hub-backend`
- Set environment variables: `heroku config:set -a sentient-agent-hub-backend $(cat .env | xargs)`
- Push code: `git push heroku master`
- Your backend will be live at `https://sentient-agent-hub-backend.herokuapp.com`

## Frontend (Vercel Example)
- Go to `frontend/`
- Run `vercel --prod`
- Your dashboard will be live at your Vercel URL

## Automated Deployment
- Run `bash deploy.sh` from the root of `github-app-dashboard/`
- This will deploy both backend and frontend

## Notes
- Update API URLs in frontend to match your backend deployment
- For other platforms (Render, Netlify, etc.), adjust commands accordingly
