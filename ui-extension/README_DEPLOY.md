# Deploying Sentient Agent Hub UI to Vercel

## Steps

1. Go to [Vercel](https://vercel.com/) and sign in with your GitHub account.
2. Click "New Project" and import your Sentient-AI-Hub repo.
3. Set the project root to `ui-extension/`.
4. Add the environment variable:
   - `REACT_APP_API_URL=https://sentient-ai-hub-ui.vercel.app/agents`
5. Deploy!

## Notes
- The `vercel.json` file rewrites API requests to your backend.
- For full backend integration, deploy your backend (Express server) to a cloud service (e.g., Render, Heroku, or Vercel Serverless Functions) and update the API URL accordingly.
- Your UI will be live at `https://<your-vercel-project>.vercel.app`.

## Customization
- To change the API endpoint, update `.env` and redeploy.
- For advanced routing, edit `vercel.json`.
