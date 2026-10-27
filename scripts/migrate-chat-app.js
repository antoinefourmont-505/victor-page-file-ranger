#!/usr/bin/env node
const fs=require('fs');
const {migrateChatAppDashboards,validateChatAppConfig}=require('./chat-app-model.cjs');
const file=process.argv[2]||'assets/chat-app.json';
const profile=process.argv[3];
const doc=JSON.parse(fs.readFileSync(file,'utf8'));
if(![1,2].includes(doc.schemaVersion))throw new Error('Unsupported schemaVersion');
const chatApp=migrateChatAppDashboards(doc.chatApp,profile);
const issues=validateChatAppConfig(chatApp);if(issues.length)throw new Error(JSON.stringify(issues));
fs.writeFileSync(file,JSON.stringify({...doc,schemaVersion:2,chatApp},null,2)+'\n');
