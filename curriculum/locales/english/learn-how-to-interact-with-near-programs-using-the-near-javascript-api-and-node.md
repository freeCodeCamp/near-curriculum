# NEAR - Learn How to Interact with NEAR Programs Using the NEAR JavaScript API and Node

## 1

### --description--

For the duration of this project, you will be working in the `learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/` directory. Start by changing into that directory in the terminal.

If the tests don't run automatically, trash the terminal labeled `bash` and open a new bash terminal.

### --tests--

You should use the change directory command (`cd`) in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
assert.match(lastCommand, /^\s*cd/);
```

You should be in the `learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node` directory in your terminal

```js
await new Promise(res => setTimeout(res, 1000));
const cwdFile = await __helpers.getCWD();
const cwd = cwdFile.split('\n').filter(Boolean).pop();
assert.include(cwd, 'learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node');
```

## 2

### --description--

You will be using the NEAR JavaScript API to interact with the blockchain in this project. Run `npm install` to install the project dependencies. Included in there is the `near-api-js` package.

### --tests--

You should run `npm install` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
assert.match(lastCommand, /^npm\s+(i|install)$/);
```

You should have a `node_modules/near-api-js` folder as a result of installing the dependencies

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/node_modules');
assert.include(dir, 'near-sdk-js');
```

You should have a `node_modules/near-sdk-js` folder as a result of installing the dependencies

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/node_modules');
assert.include(dir, 'near-sdk-js');
```

You should have a `node_modules/ts-morph` folder as a result of installing the dependencies

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/node_modules');
assert.include(dir, 'ts-morph');
```

You should have a `node_modules/near-seed-phrase` folder as a result of installing the dependencies

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/node_modules');
assert.include(dir, 'near-seed-phrase');
```

## 3

### --description--

You will be using the testnet account you created in the last project. Create a `<account>.testnet` file, with the name of your account. This will be used for tests. Also, make sure you have the credentials to use the account locally.

If you don't have the credentials locally, use your account's seed phrase to create them by running: `near generate-key <account> --seedPhrase "<seed_phrase>"`

If you don't have an account, you can learn how to create one in the `Learn NEAR Accounts by Creating a Named Testnet Account` project

### --tests--

You should have an `<account>.testnet` file

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node');
const file = dir.find(file => file.endsWith('.testnet'));
assert.exists(file);
```

You should have credentials matching that filename in the `~/.near-credentails/testnet` folder

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node');
const account = dir.find(file => file.endsWith('.testnet'));
const home = await __helpers.homeDir();
const nearDir = await __helpers.getAbsoluteDir(`${home}/.near-credentials/testnet`);
assert.include(nearDir, `${account}.json`);
```

Running `near state <your_account>` should print your account information

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node');
const file = dir.find(file => file.endsWith('.testnet'));
const output = await __helpers.getCommandOutput(`NEAR_ENV=testnet near state ${file}`, 'learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node');
const re = new RegExp(`Account\\s+${file}\\s*{\\s*amount`, 'g');
assert.match(output?.stdout, re);
```

You should only have one file ending with `.testnet` in the project folder

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node');
const files = dir.filter(file => file.endsWith('.testnet'));
assert.lengthOf(files, 1);
```

## 4

### --description--

You're going to deploy the word guessing game contract using a sub-account. Run `node generate-seed.js` to create a seed phrase and key for a sub-account. Make sure to save them somewhere safe.

### --tests--

You should run `node generate-seed.js` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^\\s*node generate-seed\.js\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print an object with a `seedPhrase`, `publicKey`, and `privateKey`

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const re = new RegExp(`^\\s*node\\s+generate-seed\.js\\s*$`, 'g');
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(re);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.include(lastOutput, `seedPhrase`);
assert.include(lastOutput, `secretKey`);
assert.include(lastOutput, `publicKey`);
```

## 5

### --description--

Use the public key you just generated to create a `word-guess.<account>.testnet` sub-account from your main account. Give it an initial balance of `20`. As a reminder, here's how you can do that:

```sh
near create-account <sub_account> --masterAccount <account> --publicKey "ed25519:<key>" --initialBalance 20
```

Make sure to use the public key you just generated.

### --tests--

The command should output that your account was created

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`near create-account`);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /("testnet" was created.\s*$|already exists\.)/);
```

Running `near state word-guess.<account>.testnet` should print the state of your sub-account

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node');
const account = dir.find(file => file.endsWith('.testnet'));
const output = await __helpers.getCommandOutput(`NEAR_ENV=testnet near state word-guess.${account}`, 'learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node');
const re = new RegExp(`Account\\s+word-guess.${account}\\s*{\\s*amount`, 'g');
assert.match(output?.stdout, re);
```

## 6

### --description--

Add credentials for the account locally by generating a key for it with your seed phrase. Run `near generate-key <account> --seedPhrase "<seed_phrase>"`

### --tests--

You should have credentials for `word-guess.<account>.testnet` in the `~/.near-credentails/testnet` folder.

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node');
const account = dir.find(file => file.endsWith('.testnet'));
const home = await __helpers.homeDir();
const nearDir = await __helpers.getAbsoluteDir(`${home}/.near-credentials/testnet`);
assert.exists(`word-guess.${account}.json`);
```

## 7

### --description--

Ensure you have full access to your account by sending 5 from it to your sub-account. The syntax is `near send <account> <sub-account> 5`

### --tests--

You should run `near send <account> <sub_account> 5` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node');
const account = dir.find(file => file.endsWith('.testnet'));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near send ${account} word-guess.${account} 5`, 'g');
assert.match(lastCommand, re);
```

The transaction should succeed

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`near send`);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /To see the transaction/g);
```

## 8

### --description--

It worked. Make sure you have access to your sub-account by sending 5 from that to your main account.

### --tests--

You should run `near send <sub_account> <account> 5` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node');
const account = dir.find(file => file.endsWith('.testnet'));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near send word-guess.${account} ${account} 5`, 'g');
assert.match(lastCommand, re);
```

The transaction should succeed

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`near send`);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /To see the transaction/g);
```

## 9

### --description--

Now you have some accounts to work with. Create a `near-connection.js` file. You will use this to create a connection to the NEAR testnet with the NEAR JavaScript API.

### --tests--

You should have a `near-connection.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node');
assert.include(dir, 'near-connection.js');
```

## 10

### --description--

If you want to sign transactions, you need to give the connection to NEAR your credentials. Open your new file and import `{ join }` from the `path` module at the top so you can get your credentials directory.

### --tests--

You should have `import { join } from 'path';` at the top of your `near-connection.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/near-connection.js');
const babelised = await __helpers.babeliser(code);
const imports = babelised?.getImportDeclarations().find(i => i.source?.value === 'path');
const method = imports?.specifiers?.find(s => s.local?.name === 'join');
assert.exists(method);
```

## 11

### --description--

Next, import `os` from the `os` module.

### --tests--

You should have `import os from 'os';` in your `near-connection.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/near-connection.js');
const babelised = await __helpers.babeliser(code);
const imports = babelised?.getImportDeclarations().find(i => i.source?.value === 'os');
const method = imports?.specifiers?.find(s => s.local?.name === 'os');
assert.exists(method);
```

## 12

### --description--

Using these two imports, create a `const credentialsPath` variable and set the value to the location of your credentials with `join(os.homedir(), '.near-credentials');`

### --tests--

You should have `const credentialsPath = join(os.homedir(), '.near-credentials');` at the bottom of your `near-connection.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/near-connection.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'credentialsPath');
const recreatedCode = babelised?.generateCode(testCode, { compact: true });
assert.match(recreatedCode, /const credentialsPath=join\(os\.homedir\(\),('|")\.near-credentials\1\);/);
```

## 13

### --description--

At the top of the file, import `{ keyStores }` from the `near-api-js` package. This will be used to create a "keyStore" (place where your keys are stored).

### --tests--

You should have `import { keyStores } from 'near-api-js';` in your `near-connection.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/near-connection.js');
const babelised = await __helpers.babeliser(code);
const imports = babelised?.getImportDeclarations().find(i => i.source?.value === 'near-api-js');
const method = imports?.specifiers?.find(s => s.local?.name === 'keyStores');
assert.exists(method);
```

## 14

### --description--

Below your `credentialsPath` variable, create a `const myKeys` variable and set the value to `new keyStores.UnencryptedFileSystemKeyStore(credentialsPath)`. This will tell the connection to look for your keys in the `credentialsPath` and how your keys are formatted.

### --tests--

You should have `const myKeys = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath)` at the bottom of your `near-connection.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/near-connection.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'myKeys');
const recreatedCode = babelised?.generateCode(testCode, { compact: true });
assert.match(recreatedCode, /const myKeys=new keyStores\.UnencryptedFileSystemKeyStore\(credentialsPath\);/);
```

## 15

### --description--

Below that, create a `const connectionConfig` variable. Set it to an empty object literal for now.

### --tests--

You should have `const connectionConfig = { }` at the bottom of your `near-connection.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/near-connection.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'connectionConfig');
const recreatedCode = babelised?.generateCode(testCode, { compact: true });
assert.match(recreatedCode, /const connectionConfig={};/);
```

## 16

### --description--

The connection needs a few things, a `networkId`, a `keyStore` if you want to sign transactions, and a `nodeUrl` that points to the network you want to connect to.

Add these three things to your `connectionConfig`. Set the `networkId` to `testnet`, the `keyStore` to your `myKeys` variable, and the `nodeUrl` to `https://rpc.testnet.near.org`.

### --tests--

You should have `networkId: 'testnet'` in your `connectionConfig` object

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/near-connection.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'connectionConfig');
const props = testCode?.declarations?.[0]?.init?.properties;
const networkId = props.find(p => p.key.name === 'networkId' && p.value?.value === 'testnet');
assert.exists(networkId);
```

You should have `keyStore: myKeys` in your `connectionConfig` object

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/near-connection.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'connectionConfig');
const props = testCode?.declarations?.[0]?.init?.properties;
const keyStore = props.find(p => p.key.name === 'keyStore' && p.value?.name === 'myKeys');
assert.exists(keyStore);
```

You should have `nodeUrl: 'https://rpc.testnet.near.org'` in your `connectionConfig` object

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/near-connection.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'connectionConfig');
const props = testCode?.declarations?.[0]?.init?.properties;
const nodeUrl = props.find(p => p.key.name === 'nodeUrl' && p.value?.value === 'https://rpc.testnet.near.org');
assert.exists(nodeUrl);
```

## 17

### --description--

Time to connect to the network. At the top of the file, import `connect` from the `near-api-js` with the other import.

### --tests--

You should have `import { keyStores, connect } from 'near-api-js';` in your `near-connection.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/near-connection.js');
const babelised = await __helpers.babeliser(code);
const imports = babelised?.getImportDeclarations().find(i => i.source?.value === 'near-api-js');
const method = imports?.specifiers?.find(s => s.local?.name === 'connect');
assert.exists(method);
```

## 18

### --description--

At the bottom of the file, export a `const nearConnection` variable. Set the value to await `connect(connectionConfig)`

### --tests--

You should have `export const nearConnection = await connect(connectionConfig);` at the bottom of your `near-connection.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const { nearConnection } = (await import(join(ROOT, `learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/near-connection.js?update=${Date.now()}`)));
assert.exists(nearConnection);

const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/near-connection.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'nearConnection');
const recreatedCode = babelised?.generateCode(testCode, { compact: true });
assert.match(recreatedCode, /const nearConnection=await connect\(connectionConfig\);/);
```

## 19

### --description--

Below that, log your `nearConnection` to the console.

### --tests--

You should have `console.log(nearConnection);` at the bottom of your `near-connection.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/near-connection.js');
assert.match(code, /console\s*\.\s*log\s*\(\s*nearConnection\s*\)\s*;?\s*$/);
```

## 20

### --description--

It should work. In the terminal, run your file with node.

### --tests--

You should run `node near-connection.js` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^\\s*node near-connection\.js\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print your connection object

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('node near-connection.js');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /Near\s*{\s*config/);
```

## 21

### --description--

It looks like it worked. Your connection was logged to the console. Delete the log to the console.

### --tests--

You should not have any `console.log` statements in your `near-connection.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/near-connection.js');
const babelised = await __helpers.babeliser(fileContents);
const e = babelised.getExpressionStatements().filter(e => e.expression?.callee?.object?.name === 'console' && e.expression?.callee?.property?.name === 'log');
assert.lengthOf(e, 0);
```

## 22

### --description--

You will use this connection in the rest of the files you create. Create a `my-accounts.js` file. This will be for getting your accounts from the network.

### --tests--

You should have a `my-accounts.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node');
assert.include(dir, 'my-accounts.js');
```

## 23

### --description--

At the top of your new file, import `{ nearConnection }` from your connection file.

### --tests--

You should have `import { nearConnection } from './near-connection.js';` at the top of your `my-accounts.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/my-accounts.js');
const babelised = await __helpers.babeliser(code);
const imports = babelised?.getImportDeclarations().find(i => i.source?.value === './near-connection.js');
const method = imports?.specifiers?.find(s => s.local?.name === 'nearConnection');
assert.exists(method);
```

## 24

### --description--

Next, export a `const mainAccount` variable, set the value to await `nearConnection.account('<account>')`. Use your main account in place of `<account>`.

### --tests--

You should have `export const mainAccount = await nearConnection.account('<account>');` at the bottom of your `my-accounts.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node');
const account = dir.find(file => file.endsWith('.testnet'));
const { mainAccount } = (await import(join(ROOT, `learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/my-accounts.js?update=${Date.now()}`)));
assert.exists(mainAccount);

const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/my-accounts.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'mainAccount');
const recreatedCode = babelised?.generateCode(testCode, { compact: true });
const re = new RegExp(`const mainAccount=await nearConnection\\.account\\(('|")${account}\\1\\);`, 'g');
assert.match(recreatedCode, re);
```

## 25

### --description--

This gets your account from the blockchain. Log your `mainAccount` variable to the console.

### --tests--

You should have `console.log(mainAccount);` at the bottom of your `my-accounts.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/my-accounts.js');
assert.match(code, /console\s*\.\s*log\s*\(\s*mainAccount\s*\)\s*;?\s*$/);
```

## 26

### --description--

Run the file to make sure it's working.

### --tests--

You should run `my-accounts.js` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^\\s*node my-accounts\.js\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print your account object

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('node my-accounts.js');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /Account\s*{\s*accessKeyByPublicKeyCache/);
```

## 27

### --description--

You are getting your account from the blockchain. You can do anything with accounts using the API that can do with the CLI. Create a new `const accountInfo` variable. Set the value to await `mainAccount.getAccountBalance()`.

### --tests--

You should have `const accountInfo = await mainAccount.getAccountBalance();` in your `my-accounts.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/my-accounts.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'accountInfo');
const recreatedCode = babelised?.generateCode(testCode, { compact: true });
assert.match(recreatedCode, /const accountInfo=await mainAccount\.getAccountBalance\(\);/);
```

## 28

### --description--

Change your log to print the `accountInfo` and make sure it's at the bottom.

### --tests--

You should have `console.log(accountInfo);` at the bottom of your `my-accounts.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/my-accounts.js');
assert.match(code, /console\s*\.\s*log\s*\(\s*accountInfo\s*\)\s*;?\s*$/);
```

You should only have one `console.log` statement in your `my-accounts.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/my-accounts.js');
const babelised = await __helpers.babeliser(fileContents);
const e = babelised.getExpressionStatements().filter(e => e.expression?.callee?.object?.name === 'console' && e.expression?.callee?.property?.name === 'log');
assert.lengthOf(e, 1);
```

## 29

### --description--

Run the file again.

### --tests--

You should run `my-accounts.js` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^\\s*node my-accounts\.js\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print your account information

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('node my-accounts.js');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /{\s*total/);
```

## 30

### --description--

Change the method to `getAccessKeys` to get your account's access keys.

### --tests--

You should have `const accountInfo = await mainAccount.getAccessKeys();` in your `my-accounts.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/my-accounts.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'accountInfo');
const recreatedCode = babelised?.generateCode(testCode, { compact: true });
assert.match(recreatedCode, /const accountInfo=await mainAccount\.getAccessKeys\(\);/);
```

## 31

### --description--

Run the file again.

### --tests--

You should run `my-accounts.js` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^\\s*node my-accounts\.js\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print your account access keys

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('node my-accounts.js');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /{\s*access_key/);
```

## 32

### --description--

Delete the `accountInfo` variable and the log to the console.

### --tests--

You should not have an `accountInfo` variable in your `my-accounts.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/my-accounts.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'accountInfo');
assert.notExists(testCode);
```

You should not have any `console.log` statements in your `my-accounts.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/my-accounts.js');
const babelised = await __helpers.babeliser(fileContents);
const e = babelised.getExpressionStatements().filter(e => e.expression?.callee?.object?.name === 'console' && e.expression?.callee?.property?.name === 'log');
assert.lengthOf(e, 0);
```

## 33

### --description--

You are going to deploy the word guess contract from a node script. Export a new `const conractAccount` variable, and set the value get your sub-account from the blockchain.

### --tests--

You should have `export const contractAccount = await nearConnection.account('<sub-account>');` at the bottom of your `my-accounts.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node');
const account = dir.find(file => file.endsWith('.testnet'));
const { contractAccount } = (await import(join(ROOT, `learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/my-accounts.js?update=${Date.now()}`)));
assert.exists(contractAccount);

const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/my-accounts.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'contractAccount');
const recreatedCode = babelised?.generateCode(testCode, { compact: true });
const re = new RegExp(`const contractAccount=await nearConnection\\.account\\(('|")word-guess\\.${account}\\1\\);`, 'g');
assert.match(recreatedCode, re);
```

## 34

### --description--

Export one last variable, `contractName`, and set it to a string that matches the name of your sub-account.

### --tests--

You should have `export const contractName = '<sub-account>';` at the bottom of your `my-accounts.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node');
const account = dir.find(file => file.endsWith('.testnet'));
const { contractName } = (await import(join(ROOT, `learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/my-accounts.js?update=${Date.now()}`)));
assert.exists(contractName);

const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/my-accounts.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'contractName');
const recreatedCode = babelised?.generateCode(testCode, { compact: true });
const re = new RegExp(`const contractName=('|")word-guess\\.${account}\\1;`, 'g');
assert.match(recreatedCode, re);
```

## 35

### --description--

The word guess contract is in the `src` folder, run `npm run build:word-guess` to build it.

### --tests--

You should run `npm run build:word-guess` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
assert.match(lastCommand, /^npm\s+run\s+build:word-guess$/);
```

You should have a `build/word-guess.wasm` file as a result of building the contract

```js
await new Promise(res => setTimeout(res, 1000));
const fileExists = await __helpers.fileExists('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/build/word-guess.wasm');
assert.isTrue(fileExists);
```

The terminal should print `Generated build/word-guess.wasm contract successfully!`

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('Doing account.functionCall()');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /Generated build\/word-guess\.wasm contract successfully!\s*$/);
```

## 36

### --description--

Create a `deploy-contract.js` file. You will use this to deploy your conract.

### --tests--

You should have a `deploy-contract.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node');
assert.include(dir, 'deploy-contract.js');
```

## 37

### --description--

At the top of your new file, import `{ readFileSync }` from the `fs` module so you can get the WASM file of your contract.

### --tests--

You should have `import { readFileSync } from 'fs';` at the top of your `deploy-contract.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/deploy-contract.js');
const babelised = await __helpers.babeliser(code);
const imports = babelised?.getImportDeclarations().find(i => i.source?.value === 'fs');
const method = imports?.specifiers?.find(s => s.local?.name === 'readFileSync');
assert.exists(method);
```

## 38

### --description--

Next, import your `{ contractAccount }` from your accounts file.

### --tests--

You should have `import { contractAccount } from './my-accounts.js';` in your `deploy-contract.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/deploy-contract.js');
const babelised = await __helpers.babeliser(code);
const imports = babelised?.getImportDeclarations().find(i => i.source?.value === './my-accounts.js');
const method = imports?.specifiers?.find(s => s.local?.name === 'contractAccount');
assert.exists(method);
```

## 39

### --description--

Create a `const contractFile` variable. Set the value to use `readFileSync` to get your contract file. Use `./build/word-guess.wasm` as the path.

### --tests--

You should have `const contractFile = readFileSync('./build/word-guess.wasm');` at the bottom of your `deploy-contract.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/deploy-contract.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'contractFile');
const recreatedCode = babelised?.generateCode(testCode, { compact: true });
assert.match(recreatedCode, /const contractFile=readFileSync\(('|")\.\/build\/word-guess\.wasm\1\);/);
```

## 40

### --description--

Now you can deploy the contract. Add a new `const response` variable. Set the value to await `contractAccount.deployContract(contractFile)`.

### --tests--

You should have `const response = await contractAccount.deployContract(contractFile);` at the bottom of your `deploy-contract.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/deploy-contract.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'response');
const recreatedCode = babelised?.generateCode(testCode, { compact: true });
assert.match(recreatedCode, /const response=await contractAccount\.deployContract\(contractFile\);/);
```

## 41

### --description--

Lastly, log the response to the console.

### --tests--

You should have `console.log(response);` at the bottom of your `deploy-contract.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/deploy-contract.js');
assert.match(code, /console\s*\.\s*log\s*\(\s*response\s*\)\s*;?\s*$/);
```

## 42

### --description--

Run the file to deploy the contract.

### --tests--

You should run `node deploy-contract.js` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^\\s*node deploy-contract\.js\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print that the deployment was successful

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('node deploy-contract.js');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /{\s*receipts_outcome/);
```

## 43

### --description--

There's a lot of stuff there, it looks like it worked. Next you need to initialize the contract. Create an `init-contract.js` file.

### --tests--

You should have an `init-contract.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node');
assert.include(dir, 'init-contract.js');
```

## 44

### --description--

At the top of the file, import `{ Contract }` from `near-api-js`.

### --tests--

You should have `import { Contract } from 'near-api-js';` at the top of your `init-contract.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/init-contract.js');
const babelised = await __helpers.babeliser(code);
const imports = babelised?.getImportDeclarations().find(i => i.source?.value === 'near-api-js');
const method = imports?.specifiers?.find(s => s.local?.name === 'Contract');
assert.exists(method);
```

## 45

### --description--

Below that, import the `contractAccount` and `contractName` variables from your accounts file.

### --tests--

You should have `import { contractAccount, contractName } from './my-accounts.js';` in your `init-contract.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/init-contract.js');
const babelised = await __helpers.babeliser(code);
const imports = babelised?.getImportDeclarations().find(i => i.source?.value === './my-accounts.js');
const method1 = imports?.specifiers?.find(s => s.local?.name === 'contractAccount');
const method2 = imports?.specifiers?.find(s => s.local?.name === 'contractName');
assert.exists(method1);
assert.exists(method2);
```

## 46

### --description--

Create a new `const contract` variable. Set the value to a `new Contract()`.

### --tests--

You should have `const contract = new Contract();` at the bottom of your `init-contract.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/init-contract.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'contract');
const recreatedCode = babelised?.generateCode(testCode, { compact: true });
assert.match(recreatedCode, /const contract=new Contract\(\);/);
```

## 47

### --description--

The `Contract` contractor takes three arguments, the account that is connecting to the contract, the contract name, and a method you want to call on the contract.

Add `contractAccount`, `contractName`, and an empty object literal (`{}`), in that order, to your `Contract` constructor.

### --tests--

You should have `contractAccount` as the first parameter of the `new Contract()` constructor

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/init-contract.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'contract');
const arg = testCode?.declarations?.[0]?.init?.arguments?.[0]?.name;
assert.equal(arg, 'contractAccount');
```

You should have `contractName` as the second parameter of the `new Contract()` constructor

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/init-contract.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'contract');
const arg = testCode?.declarations?.[0]?.init?.arguments?.[1]?.name;
assert.equal(arg, 'contractName');
```

You should have an empty object literal (`{}`) as the third parameter of the `new Contract()` constructor

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/init-contract.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'contract');
const arg = testCode?.declarations?.[0]?.init?.arguments?.[2];
assert.equal(arg?.type, 'ObjectExpression');
assert.equal(arg?.properties.length, 0);
```

## 48

### --description--

In the empty object, add a `changeMethods` variable. Set the value to an array with `init` (string) in it. This is the `init` method on the contract.

### --tests--

You should have `changeMethods: ['init']` in the object of the third parameter of the `new Contract()` constructor

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/init-contract.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'contract');
const props = testCode?.declarations?.[0]?.init?.arguments?.[2]?.properties;
assert.lengthOf(props, 1);
assert.equal(props?.[0]?.key?.name, 'changeMethods');
const el = props?.[0].value?.elements;
assert.lengthOf(el, 1);
assert.equal(el?.[0]?.value, 'init');
```

## 49

### --description--

At the bottom, add a `const response` variable. Set the value to await `contract.init({ 'secretWord': 'web3' })`. This will call the `init` method and pass it the object with a `secretWord` to set.

Note that the method is private, so only the `contractAccount` can call it, which you set in the contract instance.

### --tests--

You should have `const response = await contract.init({ 'secretWord': 'web3' });` at the bottom of your `init-contract.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/init-contract.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'response');
const recreatedCode = babelised?.generateCode(testCode, { compact: true });
assert.match(recreatedCode, /const response=await contract\.init\({('|")secretWord\1:('|")web3\2}\);/);
```

## 50

### --description--

Log the `response` to the console.

### --tests--

You should have `console.log(response);` at the bottom of your `init-contract.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/init-contract.js');
assert.match(code, /console\s*\.\s*log\s*\(\s*response\s*\)\s*;?\s*$/);
```

## 51

### --description--

Run the file to initialize the contract.

### --tests--

You should run `node init-contract.js` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^\\s*node init-contract\.js\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print that the contract was initialized

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('node init-contract.js');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /The secret word has been set/);
```

## 52

### --description--

Next, you will make a script to add hints to the contract. Create an `add-hint.js` file.

### --tests--

You should have an `add-hint.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node');
assert.include(dir, 'add-hint.js');
```

## 53

### --description--

At the top, import the `Contract` constructor from the NEAR JavaScript API.

### --tests--

You should have `import { Contract } from 'near-api-js';` at the top of your `add-hint.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/add-hint.js');
const babelised = await __helpers.babeliser(code);
const imports = babelised?.getImportDeclarations().find(i => i.source?.value === 'near-api-js');
const method = imports?.specifiers?.find(s => s.local?.name === 'Contract');
assert.exists(method);
```

## 54

### --description--

Next, import the contract account and name from your `my-accounts.js` file.

### --tests--

You should have `import { contractAccount, contractName } from './my-accounts.js';` in your `add-hint.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/add-hint.js');
const babelised = await __helpers.babeliser(code);
const imports = babelised?.getImportDeclarations().find(i => i.source?.value === './my-accounts.js');
const method1 = imports?.specifiers?.find(s => s.local?.name === 'contractAccount');
const method2 = imports?.specifiers?.find(s => s.local?.name === 'contractName');
assert.exists(method1);
assert.exists(method2);
```

## 55

### --description--

Below that, create a `const contract` variable and set the value to a new contract instance. Don't add any arguments yet.

### --tests--

You should have `const contract = new Contract();` at the bottom of your `add-hint.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/add-hint.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'contract');
const recreatedCode = babelised?.generateCode(testCode, { compact: true });
assert.match(recreatedCode, /const contract=new Contract\(\);/);
```

## 56

### --description--

Add your `contractAccount`, `contractName`, and an empty object literal to the contract constructor so you can call your contract.

### --tests--

You should have `contractAccount` as the first parameter of the `new Contract()` constructor

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/add-hint.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'contract');
const arg = testCode?.declarations?.[0]?.init?.arguments?.[0]?.name;
assert.equal(arg, 'contractAccount');
```

You should have `contractName` as the second parameter of the `new Contract()` constructor

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/add-hint.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'contract');
const arg = testCode?.declarations?.[0]?.init?.arguments?.[1]?.name;
assert.equal(arg, 'contractName');
```

You should have an empty object literal (`{}`) as the third parameter of the `new Contract()` constructor

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/add-hint.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'contract');
const arg = testCode?.declarations?.[0]?.init?.arguments?.[2];
assert.equal(arg?.type, 'ObjectExpression');
assert.equal(arg?.properties.length, 0);
```

## 57

### --description--

In the empty object, add the `addHint` function from your contract as the only change method.

### --tests--

You should have `changeMethods: ['addHint']` in the object of the third parameter of the `new Contract()` constructor

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/add-hint.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'contract');
const props = testCode?.declarations?.[0]?.init?.arguments?.[2]?.properties;
assert.lengthOf(props, 1);
assert.equal(props?.[0]?.key?.name, 'changeMethods');
const el = props?.[0].value?.elements;
assert.lengthOf(el, 1);
assert.equal(el?.[0]?.value, 'addHint');
```

## 58

### --description--

Create a `const response` variable and set the value to the result of calling the `addHint` method on your contract. The `addHint` method needs a `hint`, so give it a hint of `new web`. 

### --tests--

You should have `const response = await contract.addHint({ "hint": "new web" });` at the bottom of your `add-hint.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/add-hint.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'response');
const recreatedCode = babelised?.generateCode(testCode, { compact: true });
assert.match(recreatedCode, /const response=await contract\.addHint\({('|")hint\1:('|")new web\2}\);/);
```

## 59

### --description--

Log the response to the console.

### --tests--

You should have `console.log(response);` at the bottom of your `add-hint.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/add-hint.js');
assert.match(code, /console\s*\.\s*log\s*\(\s*response\s*\)\s*;?\s*$/);
```

## 60

### --description--

Run the file with node to see the response.

### --tests--

You should run `node add-hint.js` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^\\s*node add-hint\.js\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print that the hint was added

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('node add-hint.js');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /Your hint was added/);
```

## 61

### --description--

Instead of specifying the hint in the file, add a `const hint` variable set to the command line argument (`process.argv[2]`) so you can pass a hint in through there.

### --tests--

You should have `const hint = process.argv[2];` above your `contract` declaration

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/add-hint.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'hint');
const recreatedCode = babelised?.generateCode(testCode, { compact: true });
assert.match(recreatedCode, /const hint=process\.argv\[2\];/);
```

## 62

### --description--

Change the contract call so it uses the hint passed in.

### --tests--

You should have `const response = await contract.addHint({ hint });` in your `add-hint.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/add-hint.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'response');
const recreatedCode = babelised?.generateCode(testCode, { compact: true });
assert.match(recreatedCode, /const response=await contract\.addHint\({(hint|('|"|)hint\2:hint)}\);/);
```

## 63

### --description--

Run `node add-hint.js "web 1 + 2"` to add another hint.

### --tests--

You should run `node add-hint.js "web 1 + 2"` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^\\s*node add-hint\\.js\\s*"web 1 \\+ 2"\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print that the hint was added

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('node add-hint.js');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /Your hint was added/);
```

## 64

### --description--

The hint was added. Create a `view-hints.js` file so you can create a way to view the hints.

### --tests--

You should have a `view-hints.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node');
assert.include(dir, 'view-hints.js');
```

## 65

### --description--

At the top of the file, import the `Contract` constuctor and your `mainAccount` and `contractName` variables.

### --tests--

You should have `import { Contract } from 'near-api-js;` in your `view-hints.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/view-hints.js');
const babelised = await __helpers.babeliser(code);
const imports = babelised?.getImportDeclarations().find(i => i.source?.value === 'near-api-js');
const method = imports?.specifiers?.find(s => s.local?.name === 'Contract');
assert.exists(method);
```

You should have `import { mainAccount, contractName } from './my-accounts.js;` in your `view-hints.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/view-hints.js');
const babelised = await __helpers.babeliser(code);
const imports = babelised?.getImportDeclarations().find(i => i.source?.value === './my-accounts.js');
const method1 = imports?.specifiers?.find(s => s.local?.name === 'mainAccount');
const method2 = imports?.specifiers?.find(s => s.local?.name === 'contractName');
assert.exists(method1);
assert.exists(method2);
```

## 66

### --description--

Below that, create a `const contract` variable. Set it to a new contract instance of your contract that uses your `mainAccount` as the connecting account. Leave the third argument an empty object literal.

### --tests--

You should have `const contract = new Contract(mainAccount, contractName, {});` at the bottom of your `view-hints.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/view-hints.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'contract');
assert.exists(testCode);
const args = testCode?.declarations?.[0]?.init?.arguments;
assert.equal(args?.[0]?.name, 'mainAccount');
assert.equal(args?.[1]?.name, 'contractName');
assert.equal(args?.[2]?.type, 'ObjectExpression');
assert.equal(args?.[2]?.properties?.length, 0);
```

## 67

### --description--

In the empty object, add a `viewMethods` property and set the value to an array with only `'viewHints'` in it. Note that you can use your `mainAccount` to call the view (non-private) methods.

### --tests--

You should have `viewMethods: ['viewHints']` in the object of the third parameter of the `new Contract()` contsructor

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/view-hints.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'contract');
const props = testCode?.declarations?.[0]?.init?.arguments?.[2]?.properties;
assert.lengthOf(props, 1);
assert.equal(props?.[0]?.key?.name, 'viewMethods');
const el = props?.[0].value?.elements;
assert.lengthOf(el, 1);
assert.equal(el?.[0]?.value, 'viewHints');
```

## 68

### --description--

At the bottom, create a `const response` variable that is set to the result of calling the `viewHints` method.

### --tests--

You should have `const response = await contract.viewHints();` at the bottom of your `view-hints.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/view-hints.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'response');
const recreatedCode = babelised?.generateCode(testCode, { compact: true });
assert.match(recreatedCode, /const response=await contract\.viewHints\(\);/);
```

## 69

### --description--

Log the response to the console.

### --tests--

You should have `console.log(response);` at the bottom of your `view-hints.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/view-hints.js');
assert.match(code, /console\s*\.\s*log\s*\(\s*response\s*\)\s*;?\s*$/);
```

## 70

### --description--

Use node to run the file and view the hints.

### --tests--

You should run `node view-hints.js` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^\\s*node view-hints\.js\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print the hints

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('node init-contract.js');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /new web/);
```

## 71

### --description--

You should see your hints. Finally, create a `word-guess.js` file. This one will be able to call any of the methods on your contract.

### --tests--

You should have a `word-guess.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node');
assert.include(dir, 'word-guess.js');
```

## 72

### --description--

At the top of the file, import the `Contract` constructor and your `contractAccount` and `contractName` variables.

### --tests--

You should have `import { Contract } from 'near-api-js';` in your `word-guess.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/word-guess.js');
const babelised = await __helpers.babeliser(code);
const imports = babelised?.getImportDeclarations().find(i => i.source?.value === 'near-api-js');
const method = imports?.specifiers?.find(s => s.local?.name === 'Contract');
assert.exists(method);
```

You should have `import { contractAccount, contractName } from 'near-api-js';` in your `word-guess.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/word-guess.js');
const babelised = await __helpers.babeliser(code);
const imports = babelised?.getImportDeclarations().find(i => i.source?.value === './my-accounts.js');
const method1 = imports?.specifiers?.find(s => s.local?.name === 'contractAccount');
const method2 = imports?.specifiers?.find(s => s.local?.name === 'contractName');
assert.exists(method1);
assert.exists(method2);
```

## 73

### --description--

Next, create a `const method` variable set to the first command line argument.

### --tests--

You should have `const method = process.argv[2];` at the bottom of your `word-guess.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/word-guess.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'method');
const recreatedCode = babelised?.generateCode(testCode, { compact: true });
assert.match(recreatedCode, /const method=process\.argv\[2\];/);
```

## 74

### --description--

After that, create a `const args` variable. Set it to a ternary expression the checks if there's a second command line argument (`process.argv[3]`). If it exists, use `JSON.parse` to make the argument JSON format. If it doesn't exist, make it an empty object literal.

### --tests--

You should have `const args = process.argv[3] ? JSON.parse(process.argv[3]) : {};` at the bottom of your `word-guess.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/word-guess.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'args');
const recreatedCode = babelised?.generateCode(testCode, { compact: true });
assert.match(recreatedCode, /const args=process\.argv\[3\]\?JSON\.parse\(process\.argv\[3\]\):{}/);
```

## 75

### --description--

Below those, create a `const contract` variable. Set it to a new contract instance of your contract. Use your `contractAccount` as the connecting account, and an empty object as the third argument for now.

### --tests--

You should have `const contract = new Contract(contractAccount, contractName, {});` at the bottom of your `word-guess.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/word-guess.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'contract');
assert.exists(testCode);
const args = testCode?.declarations?.[0]?.init?.arguments;
assert.equal(args?.[0]?.name, 'contractAccount');
assert.equal(args?.[1]?.name, 'contractName');
assert.equal(args?.[2]?.type, 'ObjectExpression');
assert.equal(args?.[2]?.properties?.length, 0);
```

## 76

### --description--

In the empty object, add your `viewHints` and `viewGuesses` methods as the `viewMethods`.

### --tests--

You should have `viewMethods: ['viewHints', 'viewGuesses']` in the object of the third parameter to the `new Contract()` constructor 

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/word-guess.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'contract');
const props = testCode?.declarations?.[0]?.init?.arguments?.[2]?.properties;
const viewMethods = props.find(p => p.key?.name === 'viewMethods');
assert.exists(viewMethods);
assert.lengthOf(viewMethods.value?.elements, 2);
const viewHints = viewMethods?.value?.elements?.find(el => el.value === 'viewHints');
assert.exists(viewHints);
const viewGuesses = viewMethods?.value?.elements?.find(el => el.value === 'viewGuesses');
assert.exists(viewGuesses);
```

## 77

### --description--

Add the `viewSecretWord`, `addHint`, and `makeGuess` methods as the `changeMethods`.

### --tests--

You should have `changeMethods: ['viewSecretWord', 'addHint', 'makeGuess']` in the object of the third parameter to the `new Contract()` constructor

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/word-guess.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'contract');
const props = testCode?.declarations?.[0]?.init?.arguments?.[2]?.properties;
const changeMethods = props.find(p => p.key?.name === 'changeMethods');
assert.exists(changeMethods);
assert.lengthOf(changeMethods.value?.elements, 3);
const viewWord = changeMethods?.value?.elements?.find(el => el.value === 'viewSecretWord');
assert.exists(viewWord);
const addHint = changeMethods?.value?.elements?.find(el => el.value === 'addHint');
assert.exists(addHint);
const makeGuess = changeMethods?.value?.elements?.find(el => el.value === 'makeGuess');
assert.exists(makeGuess);
```

## 78

### --description--

At the bottom, create a `const response` variable. Set the value to call the contract method that is passed in to the command line and give the method any arguments passed in as well.

### --tests--

You should have `const response = await contract[method](args);` at the bottom of your `word-guess.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/word-guess.js');
const babelised = await __helpers.babeliser(code);
const testCode = babelised.getVariableDeclarations().find(v => v.declarations?.[0]?.id?.name === 'response');
const recreatedCode = babelised?.generateCode(testCode, { compact: true });
assert.match(recreatedCode, /const response=await contract\[method\]\(args\);/);
```

## 79

### --description--

Log the response to the console.

### --tests--

You should have `console.log(response);` at the bottom of your `word-guess.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-how-to-interact-with-near-programs-using-the-near-javascript-api-and-node/word-guess.js');
assert.match(code, /console\s*\.\s*log\s*\(\s*response\s*\)\s*;?\s*$/);
```

## 80

### --description--

Run your file and call the `viewHints` method.

### --tests--

You should run `node word-guess.js viewHints` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^\\s*node word-guess\.js viewHints\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print the hints

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('node word-guess.js viewHints');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /new web/);
```

## 81

### --description--

Run your file and call the `makeGuess` function. Pass it `'{ "guess": "internet" }'` to make a guess.

### --tests--

You should run `node word-guess.js makeGuess '{ "guess": "internet" }'` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^\\s*node word-guess\.js makeGuess\\s*'\\s*{\\s*"guess"\\s*:\\s*"internet"\\s*}\\s*'$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print that the guess what incorrect

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('node word-guess.js makeGuess');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /Sorry, 'internet' is not the secret word/);
```

## 82

### --description--

Run the `viewGuesses` method.

### --tests--

You should run `node word-guess.js viewGuesses` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^\\s*node word-guess\.js viewGuesses\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print the guesses

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('node word-guess.js makeGuess');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /internet/);
```

## 83

### --description--

This is the last step, feel free to run the other methods on your contract. When you are ready to finish, use your script to guess the secret word.

### --tests--

You should run `node word-guess.js makeGuess "{ 'guess': 'web3' }"` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^\\s*node word-guess\.js makeGuess\\s*'\\s*{\\s*"guess"\\s*:\\s*"web3"\\s*}\\s*'$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print that the guess was correct

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('node word-guess.js makeGuess');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /(You got it! The secret word is 'web3'|This game is finished)/);
```

## --fcc-end--
