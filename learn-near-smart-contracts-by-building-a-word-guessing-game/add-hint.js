import { readFile } from 'fs/promises';
import { execSync } from 'child_process';

console.log('Getting previous hints...');

const hints = [
  'Im a...',
  '418',
  'Its six letters',
  'HTTP response',
  'The server refused to brew coffee because its a...',
  't_____',
  't____t',
  't___ot',
  'te__ot',
  'tea_ot',
  'teapot',
  'Its teapot',
  'Guess teapot'
]

async function main() {
  try {
    const id = await readFile('/workspace/near-curriculum/learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account', 'utf8');
    const res = execSync(`NEAR_ENV=testnet near view ${id} viewHints`, {
      shell: '/bin/bash'
    });

    const resString = res.toString();
    const resSplit = resString.split(')');
    const hintsJson = JSON.parse(resSplit[1].replaceAll(/'/g, '"'));

    console.log('Previous hints founds. Adding hint...');

    if (hintsJson.length === hints.length) {
      console.log('There are no more hints to add.');
      process.exit(0); 
    }

    const nextHint = hints[hintsJson.length];
    execSync(`NEAR_ENV=testnet near call ${id} addHint '{ "hint": "${nextHint}" }' --accountId ${id}`, {
       shell: '/bin/bash'
    });

    console.log('Hint added.');

  } catch (e) {
    console.log(e);
    console.log('An error occurred. Failed to add hint.');
    process.exit(1);
  }
};

await main();
