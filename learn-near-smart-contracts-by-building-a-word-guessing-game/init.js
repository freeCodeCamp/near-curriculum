import { readFile } from 'fs/promises';
import { execSync } from 'child_process';

console.log('Initializing contract...');

async function main() {
  try {
    const id = await readFile('/workspace/near-curriculum/learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account', 'utf8');
    
    execSync(`NEAR_ENV=testnet near call ${id} init '{ "secretWord": "teapot" }' --accountId ${id}`, {
      shell: '/bin/bash'
    });

    console.log('Contract initialized. Adding hint...');
    execSync(`NEAR_ENV=testnet near call ${id} addHint '{ "hint": "Im a..." }' --accountId ${id}`, {
      shell: '/bin/bash'
    });

    console.log('Hint added. Your game is ready.');

  } catch (e) {
    console.log(e);
    console.log('An error occurred. Failed to initialize contract.');
    process.exit(1);
  }
};

await main();
