// Integration Test for All Agents
const GhOrchestratorAgent = require('../.github/agent/gh-orchestrator-agent');
const GeminiAgent = require('../.github/agent/gemini-agent');
const SoftwareArchitectAgent = require('../.github/agent/software-architect-agent');
const RefactorAgent = require('../.github/agent/refactor-agent');
const AuditAgent = require('../.github/agent/audit-agent');
const TestValidatorAgent = require('../.github/agent/test-validator-agent');
const GitHubAgent = require('../.github/agent/github-agent');

(async () => {
  try {
    // Architect
    const structure = SoftwareArchitectAgent.designProjectStructure();
    console.log('Architect structure:', structure);

    // Refactor
    const refactorMsg = RefactorAgent.suggestRefactor('integration.test.js');
    console.log('Refactor:', refactorMsg);

    // Test Validator
    const testResult = TestValidatorAgent.validateTests();
    console.log('Test Validator:', testResult);

    // Gemini
    const code = await GeminiAgent.generateCode('Create a Node.js hello world');
    console.log('Gemini codegen:', code);

    // GitHub CLI
    const issueResult = GhOrchestratorAgent.createIssue('Integration Test Issue', 'Created by integration.test.js');
    console.log('GH Issue:', issueResult);

    // GitHub API
    const repoInfo = await GitHubAgent.getRepoInfo('chicanoandres702', 'Sentient-AI-Hub');
    console.log('GH Repo Info:', repoInfo);

    // Audit
    AuditAgent.logAction('Integration test completed', 'All agents executed');

    console.log('Integration test completed successfully.');
  } catch (err) {
    console.error('Integration test error:', err);
  }
})();
