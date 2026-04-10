#!/usr/bin/env node

import { execSync } from 'node:child_process';

function major(v) {
  const m = String(v).trim().match(/^v?(\d+)/);
  return m ? Number(m[1]) : NaN;
}

const nodeVersion = process.version;
const nodeMajor = major(nodeVersion);

let pnpmVersion = '';
let pnpmMajor = NaN;
let pnpmError = null;
try {
  pnpmVersion = execSync('pnpm -v', { encoding: 'utf8' }).trim();
  pnpmMajor = major(pnpmVersion);
} catch (error) {
  pnpmError = error;
}

const checks = [];
checks.push({
  name: 'Node major',
  ok: nodeMajor === 24,
  found: nodeVersion,
  expected: '24.x'
});

checks.push({
  name: 'pnpm major',
  ok: !Number.isNaN(pnpmMajor) && pnpmMajor === 10,
  found: pnpmVersion || 'not found',
  expected: '10.x'
});

let hasError = false;
for (const check of checks) {
  if (check.ok) {
    console.log(`OK  ${check.name}: ${check.found}`);
  } else {
    hasError = true;
    console.error(`ERR ${check.name}: found ${check.found}, expected ${check.expected}`);
  }
}

if (pnpmError) {
  console.error('ERR pnpm command failed. Ensure pnpm is installed and in PATH.');
}

if (hasError || pnpmError) {
  process.exit(1);
}

console.log('Doctor passed.');
