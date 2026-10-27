// Opt-in composition checks for newly authored Persona apps. Legacy schemas stay valid.
function validatePersonaDashboardLayout(app) {
  const issues = [];
  if (!app?.enabled || app.schemaVersion !== 3) issues.push('Use an enabled schema-version-3 Persona Chat App.');
  const modules = (app?.navigation?.modules || []).filter(module => module.enabled !== false);
  const expected = ['page:dashboard', 'chat-sessions', 'page:signals', 'page:data-feed', 'assets'];
  if (JSON.stringify(modules.map(module => module.id)) !== JSON.stringify(expected)) issues.push('Keep primary navigation to Home, chat history/playbooks, Signals, Data Feed and Media in that order.');
  if (app?.navigation?.defaultModule !== 'page:dashboard') issues.push('Home must be the default app destination.');
  const page = app?.pages?.find(page => page.id === 'dashboard');
  if (page?.template !== 'workspace' || !page?.defaultTab || page.defaultTab === 'coach') issues.push('Home requires a non-coach default workspace tab.');
  if ((page?.tabs || []).some(tab => tab.id === 'coach')) issues.push('Do not author an inline Meet/coach tab on Home; Coach opens in the right-hand sidebar from the floating chat.');
  if (app?.coach?.enabled !== true || app.coach.mode !== 'review' || !Array.isArray(app.coach.allowedActionIds) || app.coach.allowedActionIds.length || !app.coach.reviewDataPointIds?.length) issues.push('Configure an enabled review-only coach with declared evidence and no operational actions.');
  const duplicateTypes = new Set(['goal-list','routine-list','signal-list','schedule-calendar']);
  if (page?.sections?.some(section => section.components?.some(component => duplicateTypes.has(component.type)))) issues.push('Home must not contain milestones/goals, routines, Signals or Schedule panels. Use the Coach milestones control and the Signals destination.');
  for (const candidate of page?.tabs || []) {
    const hasPlaybooks = page.sections.filter(section => candidate.sectionIds?.includes(section.id)).some(section => section.components?.some(component => component.type === 'playbook-list'));
    if (hasPlaybooks && !['playbooks','grocery-playbooks'].includes(candidate.id)) issues.push('Playbooks belong to the sidebar-only canonical destination; never author a visible renamed Home Playbooks tab.');
  }
  for (const candidate of page?.tabs || []) {
    const hasRoi = page.sections.filter(section=>candidate.sectionIds?.includes(section.id)).some(section=>section.components?.some(component=>component.type==='outcome-metrics'));
    if (hasRoi && !['agents','grocery-agents'].includes(candidate.id)) issues.push('ROI is sidebar-only canonical agents metadata; never author a visible Home/Coach ROI tab.');
  }
  for (const signalPage of (app?.pages||[]).filter(page=>page.id.toLowerCase().includes('signal'))) {
    if ((signalPage.tabs||[]).length>1) issues.push('Signals must use its shared inner Signals/Planning controls, never a duplicate outer Signals/Routines tab strip.');
  }
  return issues;
}
module.exports = { validatePersonaDashboardLayout };
