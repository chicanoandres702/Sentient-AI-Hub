// GitHub App integration (basic scaffold)
const { createAppAuth } = require('@octokit/auth-app');
const { Octokit } = require('octokit');
require('dotenv').config();

const appId = process.env.GITHUB_APP_ID;
const privateKey = process.env.GITHUB_PRIVATE_KEY.replace(/\\n/g, '\n');

const octokit = new Octokit({
  authStrategy: createAppAuth,
  auth: {
    appId,
    privateKey,
    installationId: undefined, // Set dynamically per repo
  },
});

module.exports = octokit;
