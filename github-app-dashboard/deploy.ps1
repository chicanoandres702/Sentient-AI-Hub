# PowerShell deployment script for Sentient Agent Hub GitHub App Dashboard

# Deploy backend (Heroku CLI)
Push-Location backend
heroku create sentient-agent-hub-backend
Get-Content .env | ForEach-Object {
    $pair = $_.Split('=')
    if ($pair.Length -eq 2) {
        heroku config:set -a sentient-agent-hub-backend "$($pair[0])=$($pair[1])"
    }
}
if (!(Test-Path .git)) { git init }
git add .
git commit -m "Deploy backend" -ErrorAction SilentlyContinue
heroku git:remote -a sentient-agent-hub-backend
try { git push heroku master } catch {}
Pop-Location

# Deploy frontend (Vercel CLI)
Push-Location frontend
vercel --prod
Pop-Location

Write-Host "Deployment complete!"
