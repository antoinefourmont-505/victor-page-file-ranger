#!/usr/bin/env node
const fs=require('node:fs');
const {validatePersonaOntology,validateOntologyReference,resolveOntology,materializeOntology,ontologyScopeSelection}=require('./ontology.cjs');
try {
  const args=process.argv.slice(2),preview=args.includes('--preview'),json=args.includes('--json');
  const option=(name)=>{const i=args.indexOf(name);return i<0?undefined:args[i+1];};
  const files=args.filter((arg,i)=>!arg.startsWith('--')&&!['--scope','--language','--context'].includes(args[i-1]));
  if(!files[0])throw new Error('Usage: validate-ontology.cjs ontology.json [feed.json ...] [--json] [--preview --scope global --language nl | --context context.json]');
  const ontology=validatePersonaOntology(JSON.parse(fs.readFileSync(files[0],'utf8')));
  const context=option('--context')?JSON.parse(fs.readFileSync(option('--context'),'utf8')):{};
  const resolved=option('--scope')?materializeOntology(ontology,ontologyScopeSelection(ontology,option('--scope'),option('--language'))):resolveOntology(ontology,{...context.locale,...(option('--language')?{language:option('--language')}:{})},context.audience);
  let checked=0;
  for(const file of files.slice(1)) {
    const raw=JSON.parse(fs.readFileSync(file,'utf8')),definition=raw.definition||raw;
    const l=definition.localization;
    const country=context.locale?.countryCode?.toUpperCase();
    const region=l?.regions?.find(r=>r.countryCodes.includes(country));
    const {selectPersonaContext}=require('./context-selection.cjs');
    const selected=selectPersonaContext(l||{},context.locale||{},context.audience||{userId:'',answers:{}});
    let effective=definition;
    const layers=[l,region,l?.personalizations?.find(p=>p.id===selected.personalizationId)];
    for(const layer of layers){if(layer?.definition)effective=layer.definition;const v=layer?.variants?.[selected.language]||layer?.variants?.[selected.language.split('-')[0]]||layer?.variants?.[layer?.defaultLanguage||l?.sourceLanguage];if(v)effective=v.definition;}
    if(effective.ontology)validateOntologyReference(resolved.definition,effective.ontology);checked++;
  }
  console.log(preview?JSON.stringify(resolved,null,2):json?JSON.stringify({valid:true,resourceKey:ontology.resourceKey,version:ontology.version,checkedFeeds:checked}):`Valid ${ontology.resourceKey} ${ontology.version}; ${checked} feed files checked for the selected context.`);
}catch(error){console.error(JSON.stringify({valid:false,issues:[{code:error.code||'INVALID_ONTOLOGY',message:error.message}]}));process.exitCode=1;}
