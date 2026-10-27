#!/usr/bin/env node
const fs = require('node:fs');
const { validatePlaygroundDefinition } = require('./playground.cjs');
function validate(file = 'assets/playground.json') {
  const errors = validatePlaygroundDefinition(JSON.parse(fs.readFileSync(file, 'utf8')));
  if (errors.length) throw new Error(errors.join('\n'));
  return true;
}
module.exports = { validate };
if (require.main === module) {
  try { validate(process.argv[2]); process.stdout.write('Playground definition valid.\n'); }
  catch (error) { process.stderr.write(`${error.message}\n`); process.exitCode = 1; }
}
