// GitHub App Authentication Module
// Loads credentials from environment and validates connection
const { execSync } = require('child_process');

function checkGitHubAppAuth() {
  const appId = process.env.AIDDE_APP_ID;
  const privateKey = process.env.AIDDE_APP_PRIVATE_KEY;
  const installId = process.env.AIDDE_INSTALL_ID;
  if (!appId || !privateKey || !installId) {
    throw new Error('Missing GitHub App credentials. Please set AIDDE_APP_ID, AIDDE_APP_PRIVATE_KEY, and AIDDE_INSTALL_ID in your environment.');
  }
  try {
    const status = execSync('gh auth status').toString();
    if (!status.includes('Logged in')) {
      throw new Error('GitHub CLI is not authenticated. Run "gh auth login".');
    }
    return true;
  } catch (e) {
    throw new Error('GitHub App authentication failed: ' + e.message);
  }
}

module.exports = { checkGitHubAppAuth };
