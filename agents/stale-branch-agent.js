// Stale Branch Agent
// Flags branches with no commits in 14+ days and prompts user for action
const { execSync } = require('child_process');

class StaleBranchAgent {
  constructor(config) {
    this.config = config;
  }

  flagStaleBranches() {
    // List all feature branches
    const branches = execSync('git branch -r | grep "feature/"').toString().split('\n');
    branches.forEach(branch => {
      if (branch.trim()) {
        const lastCommit = execSync(`git log -1 --format="%ar" origin/${branch.trim()}`).toString().trim();
        // If last commit > 14 days, flag for user
        // Pseudocode: if (daysSince(lastCommit) > 14) { prompt user: continue | close | reassign }
      }
    });
  }
}

module.exports = StaleBranchAgent;
