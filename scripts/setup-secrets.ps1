# PowerShell script to upload GitHub App secrets using GitHub CLI
param(
    [string]$RepoPath = "",
    [string]$AppId,
    [string]$PrivateKey,
    [string]$InstallId
)

if (-not $RepoPath) {
    $RepoPath = Read-Host "Enter your GitHub repo (owner/repo)"
}
if (-not $AppId) {
    $AppId = Read-Host "Enter your GitHub App ID"
}
if (-not $PrivateKey) {
    $PrivateKey = Read-Host "Enter your GitHub App Private Key (PEM)"
}
if (-not $InstallId) {
    $InstallId = Read-Host "Enter your GitHub App Install ID"
}

Write-Host "Uploading secrets to $RepoPath..."

gh secret set GITHUB_APP_ID -b "$AppId" -r $RepoPath
gh secret set GITHUB_APP_PRIVATE_KEY -b "$PrivateKey" -r $RepoPath
gh secret set GITHUB_APP_INSTALL_ID -b "$InstallId" -r $RepoPath

Write-Host "Secrets uploaded!"
