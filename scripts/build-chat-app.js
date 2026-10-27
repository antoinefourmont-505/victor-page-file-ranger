#!/usr/bin/env node
// Deterministic authoring build: canonical definition -> projection and dependency metadata.
const fs=require('fs'),path=require('path'),crypto=require('crypto'),{execFileSync}=require('child_process');
const root=process.cwd(),read=name=>JSON.parse(fs.readFileSync(path.join(root,name),'utf8'));
const stable=value=>Array.isArray(value)?`[${value.map(stable).join(',')}]`:value&&typeof value==='object'?`{${Object.entries(value).sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>`${JSON.stringify(k)}:${stable(v)}`).join(',')}}`:JSON.stringify(value);
try{
 const asset=read('assets/chat-app.json'),config=read('assets/chat-config.json'),workspace=read('references/workspace.json');
 execFileSync(process.execPath,[path.join(__dirname,'validate-chat-app.js'),path.join(root,'assets/chat-app.json')],{stdio:'pipe'});
 config.publishedConfig.chatApp=asset.chatApp;config.publishedConfig.chatAppRef={resourceKey:asset.resourceKey};
 let node=workspace.nodes.find(n=>n.kind==='chat_app'&&n.portable?.resourceKey===asset.resourceKey);
 if(node?.path)throw new Error('Use the pinned child workflow for an external Chat App.');
 if(!node){node={id:`chat_app:${asset.resourceKey}`,kind:'chat_app',displayName:'Persona Chat App',assetPaths:['assets/chat-app.json']};workspace.nodes.push(node);}
 node.portable={resourceKey:asset.resourceKey,assetPath:'assets/chat-app.json',definitionFingerprint:crypto.createHash('sha256').update(stable(asset)).digest('hex')};
 workspace.edges=workspace.edges.filter(e=>!(e.from===node.id&&['dataPoint','capture'].includes(e.relation)));
 if(!workspace.edges.some(e=>e.from==='persona'&&e.to===node.id))workspace.edges.push({from:'persona',to:node.id,relation:'chatAppRef',source:'publishedConfig.chatAppRef'});
 for(const point of asset.chatApp.dataPoints||[]){if(!['list','workspace'].includes(point.source)||!point.listRef)continue;const target=workspace.nodes.find(n=>n.kind==='list'&&n.portable?.resourceKey===point.listRef.resourceKey);if(!target)throw new Error(`Undeclared dependency ${point.listRef.resourceKey}`);workspace.edges.push({from:node.id,to:target.id,relation:'dataPoint',source:`publishedConfig.chatApp.dataPoints.${point.id}`});}
 for(const point of asset.chatApp.dataPoints||[]){if(!point.capture)continue;const target=workspace.nodes.find(n=>n.kind==='workflow'&&n.portable?.resourceKey===point.capture.workflowRef.resourceKey);if(!target)throw new Error(`Undeclared capture workflow ${point.capture.workflowRef.resourceKey}`);workspace.edges.push({from:node.id,to:target.id,relation:'capture',source:`publishedConfig.chatApp.dataPoints.${point.id}.capture`});}
 workspace.nodes.sort((a,b)=>a.id.localeCompare(b.id));workspace.edges.sort((a,b)=>`${a.from}:${a.to}:${a.source}`.localeCompare(`${b.from}:${b.to}:${b.source}`));
 const files={'assets/chat-config.json':config,'references/workspace.json':workspace};
 const changed=Object.entries(files).filter(([name,value])=>stable(read(name))!==stable(value));
 if(process.argv.includes('--check')){if(changed.length)throw new Error(`Rebuild Chat App: ${changed.map(([name])=>name).join(', ')}`);}
 else for(const [name,value]of changed)fs.writeFileSync(path.join(root,name),JSON.stringify(value,null,2)+'\n');
 execFileSync(process.execPath,[path.join(__dirname,'validate-chat-app.js'),path.join(root,'assets/chat-app.json'),path.join(root,'assets/chat-config.json')],{stdio:'inherit'});
 console.log('Chat App projection and dependency fingerprints match.');
}catch(error){console.error(error.stderr?.toString()||error.message);process.exitCode=1;}
