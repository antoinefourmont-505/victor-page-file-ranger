#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { validateChatAppConfig, validateChatAppDependencies, stableChatAppJson } = require('./chat-app-model.cjs');
const { validatePersonalizationAsset } = require('./validate-personalization.cjs');
const args = process.argv.slice(2).filter(arg => arg !== '--dashboard-first');
const file = args[0] || 'assets/chat-app.json';
const mirror = args[1];
try {
  const doc = JSON.parse(fs.readFileSync(file, 'utf8'));
  const issues = [];
  if (process.argv.includes('--dashboard-first')) issues.push(...require('./dashboard-layout.cjs').validatePersonaDashboardLayout(doc.chatApp));
  for (const key of Object.keys(doc)) if (!['schemaVersion', 'resourceKey', 'runtimeDataPolicy', 'chatApp', 'commitMessage'].includes(key)) issues.push(`root.${key}: unknown field`);
  if (![1, 2, 3].includes(doc.schemaVersion)) issues.push('Unsupported schemaVersion');
  if (doc.runtimeDataPolicy !== 'definitions_only') issues.push('runtimeDataPolicy must be definitions_only');
  if (!/^chat_app\.[a-z0-9][a-z0-9._-]*$/i.test(doc.resourceKey || '')) issues.push('Invalid resourceKey');
  if ((doc.chatApp?.schemaVersion ?? 1) !== doc.schemaVersion) issues.push('Runtime and portable schemaVersion must match');
  issues.push(...validateChatAppConfig(doc.chatApp).map(i => `${i.path}: ${i.message}`));
  if (mirror) {
    const config = JSON.parse(fs.readFileSync(mirror, 'utf8'));
    if (stableChatAppJson(config.publishedConfig?.chatApp) !== stableChatAppJson(doc.chatApp)) issues.push('publishedConfig.chatApp differs from the canonical app');
    if (config.publishedConfig?.chatAppRef?.resourceKey !== doc.resourceKey) issues.push('chatAppRef differs from canonical resourceKey');
  }
  const root = path.resolve(path.dirname(file), '..');
  const registryPath = path.join(root, 'references/registry.json');
  const configPath = mirror || path.join(root,'assets/chat-config.json');
  if (fs.existsSync(configPath)) {
    const registry=fs.existsSync(registryPath)?JSON.parse(fs.readFileSync(registryPath,'utf8')):{repos:[]};
    const dependencyRepos=doc.schemaVersion>=2?(registry.repos||[]):[];
    const sources={lists:[],pipelines:[],workflowKeys:dependencyRepos.filter(r=>r.kind==='workflow').map(r=>r.resourceKey)};
    for(const ref of dependencyRepos) {
      if(!['list','pipeline'].includes(ref.kind))continue;
      const filename=path.resolve(root,ref.path,ref.assetPath);
      if(!filename.startsWith(root+path.sep))throw new Error('Unsafe resource path');
      const definition=JSON.parse(fs.readFileSync(filename,'utf8'));
      if(definition.resourceKey!==ref.resourceKey)throw new Error('Resource key mismatch');
      sources[ref.kind==='list'?'lists':'pipelines'].push(definition);
    }
    const config=JSON.parse(fs.readFileSync(configPath,'utf8'));
    const commands=(config.publishedConfig?.agentTopology?.slashCommands||[]).filter(c=>c.enabled!==false);
    sources.commandIds=commands.map(c=>c.id).filter(id=>typeof id==='string'&&id.length>0);
    sources.commandTriggers=commands.map(c=>c.trigger);
    sources.commandCatalog=commands.map(c=>({id:c.id,trigger:c.trigger,supportsAttachments:Boolean(c.attachmentInput?.inputKey),supportsIntake:Boolean(c.preRunIntake?.steps?.length),supportsVoice:c.voiceAgent?.enabled===true}));
    // Canvas task ids each command's workflow declares, so chatApp.learning can be checked against them.
    const collectTaskIds=(node,out)=>{ if(Array.isArray(node)) node.forEach(item=>collectTaskIds(item,out)); else if(node&&typeof node==='object'){ if(node.canvasTask&&typeof node.canvasTask.taskId==='string') out.push(node.canvasTask.taskId); Object.values(node).forEach(item=>collectTaskIds(item,out)); } return out; };
    sources.canvasTasks={};
    for(const command of commands) {
      const repo=dependencyRepos.find(r=>r.kind==='workflow'&&r.resourceKey===command.execution?.workflowRef?.resourceKey);
      if(!repo||typeof command.id!=='string')continue;
      const filename=path.resolve(root,repo.path,repo.assetPath||'assets/workflow.json');
      if(!filename.startsWith(root+path.sep)||!fs.existsSync(filename))continue;
      sources.canvasTasks[command.id]=collectTaskIds(JSON.parse(fs.readFileSync(filename,'utf8')),[]);
    }
    sources.profileId=config.publishedConfig?.roiMonitoring?.profileId;
    sources.metricIds=config.publishedConfig?.roiMonitoring?.metrics?.map(m=>m.id);
    issues.push(...validatePersonalizationAsset(config.publishedConfig?.personalization, { sources }));
    issues.push(...validateChatAppDependencies(doc.chatApp,sources).map(i=>`${i.path}: ${i.message}`));
  }
  if (issues.length) throw new Error(issues.join('\n'));
  console.log(`Chat App valid: ${path.resolve(file)}`);
} catch (error) { console.error(error.message); process.exitCode = 1; }
