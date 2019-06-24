/**
 * Comparisons with other Node.js frameworks.
 */

const { execSync } = require('child_process');

const files = [
  'fastify',
  'express',
  'bare',
  'lieve',
];

const { log } = console;

execSync('npm install --save-dev express fastify', { stdio: 'pipe' });

log('FRAMEWORKS COMPARISON');

for (const file of files) {
  const child = execSync(`node ${__dirname}/frameworks/${file}.js`);
  const str = child.toString();
  // Strip last new line
  log(str.substr(0, str.length - 1));
}

execSync('npm install remove express fastify', { stdio: 'pipe' });
