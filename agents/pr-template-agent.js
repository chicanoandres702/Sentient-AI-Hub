// PR Template Agent
// Generates PR markdown with milestone, issue, and task checklist
class PRTemplateAgent {
  generatePR(milestone, issue, tasks) {
    return `### Milestone: ${milestone}\n### Issue: #${issue}\n\n#### Tasks\n${tasks.map(t => `- [${t.done ? 'x' : ' '}] ${t.desc}`).join('\n')}\n\n#### Summary\nThis PR implements tasks for milestone ${milestone} and issue #${issue}. All changes are mapped for full traceability.\n`;
  }
}
module.exports = PRTemplateAgent;
