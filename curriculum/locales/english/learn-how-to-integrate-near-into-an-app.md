# NEAR - Learn How to Integrate NEAR into an App

## 1

### --description--

For the duration of this project, you will be working in the `learn-how-to-integrate-near-into-an-app/` directory. Start by changing into that directory in the terminal.

If the tests don't run automatically, trash the terminal labeled `bash` and open a new bash terminal.

### --tests--

You should use the change directory command (`cd`) in the terminal.

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand();
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
assert.match(lastCommand, /^\s*cd/);
```

You should be in the `learn-how-to-integrate-near-into-an-app` directory in your terminal.

```js
await new Promise(res => setTimeout(res, 1000));
const cwdFile = await __helpers.getCWD();
const cwd = cwdFile.split('\n').filter(Boolean).pop();
assert.include(cwd, project.dashedName);
```

## 2

### --description--

You will be adding NEAR to the web app defined in `client/`. There are some dependencies that need to be installed first. Run `npm install` to install them.

### --tests--

You should run `npm install` in the terminal.

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand();
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
assert.match(lastCommand, /^npm\s+(i|install)$/);
```

You should have a `node_modules/near-sdk-js` folder as a result of installing the dependencies.

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory(`${project.dashedName}/node_modules`);
assert.include(dir, 'near-sdk-js');
```

You should have a `node_modules/ts-morph` folder as a result of installing the dependencies.

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory(`${project.dashedName}/node_modules`);
assert.include(dir, 'ts-morph');
```

You should have a `node_modules/near-api-js` folder as a result of installing the dependencies.

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory(`${project.dashedName}/node_modules`);
assert.include(dir, 'near-api-js');
```

## 3

### --description--

Run `npm run build:word-guess` to build the word guessing game smart contract from the previous project.

### --tests--

You should run `npm run build:word-guess` in the terminal.

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand();
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
assert.match(lastCommand, /^npm\s+run\s+build:word-guess$/);
```

You should have a `build/word-guess.wasm` file as a result of building the contract.

```js
await new Promise(res => setTimeout(res, 1000));
const fileExists = await __helpers.fileExists(
  `${project.dashedName}/build/word-guess.wasm`
);
assert.isTrue(fileExists);
```

The terminal should print `Generated build/word-guess.wasm contract successfully!`

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output
  ?.replaceAll(/\s+/g, ' ')
  .split('Doing account.functionCall()');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(
  lastOutput,
  /Generated build\/word-guess\.wasm contract successfully!\s*$/
);
```

## 4

### --description--

Use the `dev-deploy` command to deploy the WASM file you just created to the testnet.

### --tests--

You should run `near dev-deploy build/word-guess.wasm` in the terminal.

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand();
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
assert.match(lastCommand, /near\s+dev-deploy\s+build\/word-guess\.wasm/);
```

You should have a `neardev` folder as a result of deploying the contract.

```js
await new Promise(res => setTimeout(res, 1000));
const learnDir = await __helpers.getDirectory(project.dashedName);
assert.include(learnDir, 'neardev');
```

The terminal output should include `Done deploying to <contract_name>`, where the contract name matches what's in the `neardev` folder.

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile(`${project.dashedName}/neardev/dev-account`);
const output = await __helpers.getTerminalOutput();
const splitOutput = output
  ?.replaceAll(/\s+/g, ' ')
  .split('near dev-deploy build/word-guess.wasm');
const lastOutput = splitOutput[splitOutput.length - 1];
const re = new RegExp(`Done deploying to ${id}\\s*$`);
assert.match(lastOutput, re);
```

## 5

### --description--

Within the `client/` directory, create a `wallet.js` file. This file will contain the code to connect to a NEAR wallet.

### --tests--

You should create a `client/wallet.js` file.

```js
const { access, constants } = await import('fs.promises');
const fileExists = await access(
  `${project.dashedName}/client/wallet.js`,
  constants.F_OK
);
assert.isTrue(fileExists);
```

## 6

### --description--

In a previous project, you used the `UnencryptedFileSystemKeyStore` to create a key store. This time, use the `BrowserLocalStorageKeyStore` to create a key store in `client/wallet.js`:

```js
const keyStore = new keyStores.BrowserLocalStorageKeyStore();
```

### --tests--

You should have `const keyStore = new keyStores.BrowserLocalStorageKeyStore();` in `client/wallet.js`.

```js
const variableDeclaration = babelisedCode.getVariableDeclarations().find(v => {
  return v.declarations?.[0]?.id?.name === 'keyStore';
});
assert.exists(variableDeclaration, 'A variable named `keyStore` should exist');
const memberExpression = variableDeclaration.declarations[0].init.callee;
const { object, property } = memberExpression;
assert.equal(object.name, 'keyStores');
assert.equal(property.name, 'BrowserLocalStorageKeyStore');
```

You should import `keyStores` from `near-api-js` in `client/wallet.js`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source?.value === 'near-api-js';
});
assert.exists(importDeclaration, 'An import from `near-api-js` should exist');

const specifierNames = importDeclaration.specifiers?.map(s => {
  return s?.local?.name;
});
assert.include(
  specifierNames,
  'keyStores',
  'The `keyStores` module should be imported from `near-api-js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/wallet.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 7

### --description--

Below that, create a `const connectionConfig` variable. Set it to an empty object literal for now.

### --tests--

You should have `const connectionConfig = {}` at the bottom of your `wallet.js` file.

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile(
  join(project.dashedName, 'client/wallet.js')
);
const babelised = await __helpers.babeliser(code);
const testCode = babelised
  .getVariableDeclarations()
  .find(v => v.declarations?.[0]?.id?.name === 'connectionConfig');
const recreatedCode = babelised?.generateCode(testCode, { compact: true });
assert.match(recreatedCode, /const connectionConfig={};/);
```

## 8

### --description--

The connection needs a few things, a `networkId`, a `keyStore` if you want to sign transactions, and a `nodeUrl` that points to the network you want to connect to.

Add these three things to your `connectionConfig`. Set the `networkId` to `"testnet"`, the `keyStore` to your `keyStore` variable, and the `nodeUrl` to `"https://rpc.testnet.near.org"`.

### --tests--

You should have `networkId: "testnet"` in your `connectionConfig` object.

```js
await new Promise(res => setTimeout(res, 1000));
const testCode = __babelised
  .getVariableDeclarations()
  .find(v => v.declarations?.[0]?.id?.name === 'connectionConfig');
const props = testCode?.declarations?.[0]?.init?.properties;
const networkId = props.find(
  p => p.key.name === 'networkId' && p.value?.value === 'testnet'
);
assert.exists(networkId);
```

You should have `keyStore` in your `connectionConfig` object.

```js
const testCode = __babelised
  .getVariableDeclarations()
  .find(v => v.declarations?.[0]?.id?.name === 'connectionConfig');
const props = testCode?.declarations?.[0]?.init?.properties;
const keyStore = props.find(
  p => p.key.name === 'keyStore' && p.value?.name === 'keyStore'
);
assert.exists(keyStore);
```

You should have `nodeUrl: "https://rpc.testnet.near.org"` in your `connectionConfig` object.

```js
await new Promise(res => setTimeout(res, 1000));
const testCode = __babelised
  .getVariableDeclarations()
  .find(v => v.declarations?.[0]?.id?.name === 'connectionConfig');
const props = testCode?.declarations?.[0]?.init?.properties;
const nodeUrl = props.find(
  p =>
    p.key.name === 'nodeUrl' &&
    p.value?.value === 'https://rpc.testnet.near.org'
);
assert.exists(nodeUrl);
```

### --before-all--

```js
const file = await __helpers.getFile(
  join(project.dashedName, 'client/wallet.js')
);
global.__babelised = await __helpers.Babeliser(file);
```

### --after-all--

```js
delete global.__babelised;
```

## 9

### --description--

Time to connect to the network. At the top of the file, import `connect` from the `near-api-js` with the other import.

### --tests--

You should have `import { keyStores, connect } from 'near-api-js';` in your `client/wallet.js` file.

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile(
  join(project.dashedName, 'client/wallet.js')
);
const babelised = await __helpers.babeliser(code);
const imports = babelised
  ?.getImportDeclarations()
  .find(i => i.source?.value === 'near-api-js');
const method = imports?.specifiers?.find(s => s.local?.name === 'connect');
assert.exists(method);
```

## 10

### --description--

At the bottom of the file, create a `const nearConnection` variable. Set the value to await `connect(connectionConfig)`.

### --tests--

You should have `const nearConnection = await connect(connectionConfig);` at the bottom of your `client/wallet.js` file.

```js
const projectLoc = join(project.dashedName, 'client/wallet.js');
const code = await __helpers.getFile(projectLoc);
const babelised = await __helpers.babeliser(code);
const testCode = babelised
  .getVariableDeclarations()
  .find(v => v.declarations?.[0]?.id?.name === 'nearConnection');
const recreatedCode = babelised?.generateCode(testCode, { compact: true });
assert.match(
  recreatedCode,
  /const nearConnection=await connect\(connectionConfig\);/
);
```

## 11

### --description--

You will be using the testnet account you created in the last project. Create a `<account>.testnet` file, with the name of your account. This will be used for tests.

If you don't have an account, you can learn how to create one in the `Learn NEAR Accounts by Creating a Named Testnet Account` project.

### --tests--

You should have an `<account>.testnet` file.

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory(project.dashedName);
const file = dir.find(file => file.endsWith('.testnet'));
assert.exists(file);
```

Running `near state <your_account>` should print your account information.

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory(project.dashedName);
const file = dir.find(file => file.endsWith('.testnet'));
const output = await __helpers.getCommandOutput(
  `NEAR_ENV=testnet near state ${file}`,
  project.dashedName
);
const re = new RegExp(`Account\\s+${file}\\s*{\\s*amount`, 'g');
assert.match(output?.stdout, re);
```

You should only have one file ending with `.testnet` in the project folder.

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory(project.dashedName);
const files = dir.filter(file => file.endsWith('.testnet'));
assert.lengthOf(files, 1);
```

## 12

### --description--

The word guess contract is in the `src` folder, run `npm run build:word-guess` to build it.

### --tests--

You should run `npm run build:word-guess` in the terminal.

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand();
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
assert.match(lastCommand, /^npm\s+run\s+build:word-guess$/);
```

You should have a `build/word-guess.wasm` file as a result of building the contract.

```js
await new Promise(res => setTimeout(res, 1000));
const fileExists = await __helpers.fileExists(
  join(project.dashedName, '/build/word-guess.wasm')
);
assert.isTrue(fileExists);
```

The terminal should print `Generated build/word-guess.wasm contract successfully!`.

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output
  ?.replaceAll(/\s+/g, ' ')
  .split('Doing account.functionCall()');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(
  lastOutput,
  /Generated build\/word-guess\.wasm contract successfully!\s*$/
);
```

## 13

### --description--

Run the `deploy-contract.js` file to deploy the contract.

### --tests--

You should run `node deploy-contract.js` in the terminal.

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand();
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^\\s*node deploy-contract\.js\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print that the deployment was successful.

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output
  ?.replaceAll(/\s+/g, ' ')
  .split('node deploy-contract.js');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /{\s*receipts_outcome/);
```

## 14

### --description--

Run the `init-contract.js` file to initialize the contract.

### --tests--

You should run `node init-contract.js` in the terminal.

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand();
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^\\s*node init-contract\.js\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print that the contract was initialized.

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output
  ?.replaceAll(/\s+/g, ' ')
  .split('node init-contract.js');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /The secret word has been set/);
```

## 15

### --description--

At the bottom of your `client/wallet.js` file, create a `const contractId` variable with the name of your testnet contract.

### --tests--

You should have `const contractId = "<ACCOUNT_NAME>.testnet"` at the bottom of your `client/wallet.js` file.

```js
// TODO
const accountName = '';
const expectedCodeString = `const contractId = "${accountName}.testnet"`;
const babelisedCode = new __helpers.Babeliser(codeString);
const actualCodeString = babelisedCode.generateCode(babelisedCode.parsedCode, {
  compact: true
});
assert.include(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/wallet.js`
);
global.__codeString = codeString;
```

### --after-all--

```js
delete global.__codeString;
```

## 16

### --description--

Create a `const contractAccount` variable, and set the value to await `nearConnection.account("<ACCOUNT_NAME>")`.

### --tests--

You should have `const contractAccount = await nearConnection.account("<ACCOUNT_NAME>");` at the bottom of your `client/wallet.js` file

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'client/wallet.js')
);
const babelisedCode = await __helpers.babeliser(code);
const variableDeclaration = babelised
  .getVariableDeclarations()
  .find(v => v.declarations?.[0]?.id?.name === 'contractAccount');
const generatedCode = babelisedCode.generateCode(testCode, { compact: true });
const rebabelisedCode = new __helpers.Babeliser(generatedCode);
const actualCodeString = rebabelisedCode.generateCode(
  rebabelisedCode.parsedCode,
  { compact: true }
);

const expectedCodeString = `const contractAccount=await nearConnection.account(`;
assert.include(actualCodeString, expectedCodeString);
```

## 17

### --description--

Export a class named `Wallet` from `client/wallet.js`.

### --tests--

You should have `export class Wallet {}` in your `client/wallet.js` file.

```js
const exportDeclaration = babelisedCode
  .getType('ExportNamedDeclaration')
  .find(e => e.declaration?.id?.name === 'Wallet');
assert.exists(exportDeclaration);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/wallet.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 18

### --description--

Add a `constructor` to the `Wallet` class.

### --tests--

You should have a `constructor` in your `Wallet` class.

```js
const classDeclaration = babelisedCode
  .getType('ClassDeclaration')
  .find(c => c.id?.name === 'Wallet');
assert.exists(
  classDeclaration,
  `A class named Wallet should exist in the client/wallet.js file`
);

const classMethod = classDeclaration.body?.body?.find(
  b => b.key?.name === 'constructor'
);
assert.exists(classMethod, `A constructor should exist in the Wallet class`);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/wallet.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 19

### --description--

Within the `constructor`, initialize a `this.walletConnection` property. Set it to `new WalletConnection(nearConnection, <UNIQUE_NAME>)`.

### --tests--

You should have `this.walletConnection = new WalletConnection(nearConnection, <UNIQUE_NAME>);` in your `Wallet` class.

```js
const classMethod = babelisedCode
  .getType('ClassMethod')
  .find(c => c.key?.name === 'constructor');
const expressionStatement = classMethod.body.body.find(
  b => b.expression?.left?.property?.name === 'walletConnection'
);
const newExpression = expressionStatement.expression.right;
assert.equal(newExpression.callee.name, 'WalletConnection');
const [firstArg, secondArg] = newExpression.arguments;
assert.equal(firstArg.name, 'nearConnection');
assert.equal(secondArg.type, 'StringLiteral');
```

You should import `WalletConnection` from `near-api-js`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source?.value === 'near-api-js';
});
assert.exists(importDeclaration, 'An import from `near-api-js` should exist');

const specifierNames = importDeclaration.specifiers?.map(s => {
  return s?.local?.name;
});
assert.include(
  specifierNames,
  'WalletConnection',
  'The `WalletConnection` class should be imported from `near-api-js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/wallet.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 20

### --description--

Within the `constructor`, initialize a `this.contract` property. Set it to `new Contract(contractAccount, contractId, {})`.

### --tests--

You should have `this.contract = new Contract(contractAccount, contractId, {});` in your `Wallet` class.

```js
const classMethod = babelisedCode
  .getType('ClassMethod')
  .find(c => c.key?.name === 'constructor');
const expressionStatement = classMethod.body.body.find(
  b => b.expression?.left?.property?.name === 'contract'
);
const newExpression = expressionStatement.expression.right;
assert.equal(newExpression.callee.name, 'Contract');
const [firstArg, secondArg, thirdArg] = newExpression.arguments;
assert.equal(firstArg.name, 'contractAccount');
assert.equal(secondArg.name, 'contractId');
assert.equal(thirdArg.type, 'ObjectExpression');
```

You should import `Contract` from `near-api-js`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source?.value === 'near-api-js';
});
assert.exists(importDeclaration, 'An import from `near-api-js` should exist');

const specifierNames = importDeclaration.specifiers?.map(s => {
  return s?.local?.name;
});
assert.include(
  specifierNames,
  'Contract',
  'The `Contract` class should be imported from `near-api-js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/wallet.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 21

### --description--

For the contract, allow the `viewHints`, `viewGuesses`, and `makeGuess` methods to be called.

### --tests--

You should have `this.contract = new Contract(contractAccount, contractId, { viewMethods: ['viewHints', 'viewGuesses'], changeMethods: ['makeGuess'] });` in your `Wallet` class.

```js
const classMethod = babelisedCode
  .getType('ClassMethod')
  .find(c => c.key?.name === 'constructor');
const expressionStatement = classMethod.body.body.find(
  b => b.expression?.left?.property?.name === 'contract'
);
const newExpression = expressionStatement.expression.right;
const [firstArg, secondArg, thirdArg] = newExpression.arguments;
const options = thirdArg.properties;
const viewMethods = options.find(o => o.key.name === 'viewMethods');
const changeMethods = options.find(o => o.key.name === 'changeMethods');
assert.exists(viewMethods);
assert.exists(changeMethods);
const viewMethodsArray = viewMethods.value.elements;
const changeMethodsArray = changeMethods.value.elements;
assert.equal(viewMethodsArray[0].value, 'viewHints');
assert.equal(viewMethodsArray[1].value, 'viewGuesses');
assert.equal(changeMethodsArray[0].value, 'makeGuess');
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/wallet.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 22

### --description--

Add an asynchronous method to your `Wallet` class named `call`.

### --tests--

You should have an asynchronous `call` method in your `Wallet` class.

```js
const classMethod = babelisedCode
  .getType('ClassMethod')
  .find(c => c.key?.name === 'call');
assert.exists(
  classMethod,
  `A method named call should exist in the Wallet class`
);
assert.equal(classMethod.async, true, `The call method should be asynchronous`);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/wallet.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 23

### --description--

The `call` method should expect a parameter of `{method, args}`. Default the `args` to an empty object literal.

### --tests--

You should have `async call({method, args = {}}) {}` in your `Wallet` class.

```js
const classMethod = babelisedCode
  .getType('ClassMethod')
  .find(c => c.key?.name === 'call');
const params = classMethod.params;
assert.lengthOf(params, 1);
const [firstParam] = params;
assert.equal(firstParam.type, 'ObjectPattern');
const { properties } = firstParam;
assert.lengthOf(properties, 2);
const method = properties.find(p => p.key.name === 'method');
const args = properties.find(p => p.key.name === 'args');
assert.exists(method);
assert.exists(args);
assert.equal(args.value.type, 'AssignmentPattern');
assert.equal(args.value.right.type, 'ObjectExpression');
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/wallet.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 24

### --description--

Within the `call` method, create a `const response` variable. Set it to `await this.contract[method](args)`.

### --tests--

You should have `const response = await this.contract[method](args)` in your `call` method.

```js
const classMethod = babelisedCode
  .getType('ClassMethod')
  .find(c => c.key?.name === 'call');
const blockStatement = classMethod.body;
const actualCodeString = babelisedCode.generateCode(body, {
  compact: true
});
const expectedCodeString = `const response=await this.contract[method](args)`;
assert.include(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/wallet.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 25

### --description--

Within the `call` method, return the `response`.

### --tests--

You should have `return response;` in your `call` method.

```js
const classMethod = babelisedCode
  .getType('ClassMethod')
  .find(c => c.key?.name === 'call');
const blockStatement = classMethod.body;
const actualCodeString = babelisedCode.generateCode(body, {
  compact: true
});
const expectedCodeString = `return response`;
assert.include(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/wallet.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 26

### --description--

In order to use a wallet for a transaction, you must be signed in to it.

Add a `signIn` method to your `Wallet` class.

### --tests--

You should have a `signIn` method in your `Wallet` class.

```js
const classMethod = babelisedCode
  .getType('ClassMethod')
  .find(c => c.key?.name === 'signIn');
assert.exists(
  classMethod,
  `A method named signIn should exist in the Wallet class`
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/wallet.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 27

### --description--

Within the `signIn` method, call the `requestSignIn` method on `this.walletConnection`.

### --tests--

You should have `this.walletConnection.requestSignIn();` in your `signIn` method.

```js
const classMethod = babelisedCode
  .getType('ClassMethod')
  .find(c => c.key?.name === 'signIn');
const blockStatement = classMethod.body;
const actualCodeString = babelisedCode.generateCode(body, {
  compact: true
});
const expectedCodeString = `this.walletConnection.requestSignIn()`;
assert.include(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/wallet.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 28

### --description--

The `requestSignIn` method expects a `contractId` field where the `contractId` is the NEAR account where the contract is deployed.

Pass `{contractId}` to the `requestSignIn` method.

### --tests--

You should have `this.walletConnection.requestSignIn({contractId});` in your `signIn` method.

```js
const classMethod = babelisedCode
  .getType('ClassMethod')
  .find(c => c.key?.name === 'signIn');
const blockStatement = classMethod.body;
const actualCodeString = babelisedCode.generateCode(body, {
  compact: true
});
const expectedCodeString = `this.walletConnection.requestSignIn({contractId})`;
assert.include(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/wallet.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 29

### --description--

People using your app should be allowed to sign their wallet out of the app.

Add a `signOut` method to your `Wallet` class.

### --tests--

You should have a `signOut` method in your `Wallet` class.

```js
const classMethod = babelisedCode
  .getType('ClassMethod')
  .find(c => c.key?.name === 'signOut');
assert.exists(
  classMethod,
  `A method named signOut should exist in the Wallet class`
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/wallet.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 30

### --description--

Within the `signOut` method, call the `signOut` method on `this.walletConnection`.

### --tests--

You should have `this.walletConnection.signOut();` in your `signOut` method.

```js
const classMethod = babelisedCode
  .getType('ClassMethod')
  .find(c => c.key?.name === 'signOut');
const blockStatement = classMethod.body;
const actualCodeString = babelisedCode.generateCode(body, {
  compact: true
});
const expectedCodeString = `this.walletConnection.signOut()`;
assert.include(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/wallet.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 31

### --description--

Your `Wallet` class is finished. Now, use it in the `client/main.js` file.

Start by importing it at the top of the `client/main.js` file.

### --tests--

You should have `import { Wallet } from './wallet.js';` at the top of your `client/main.js` file.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source?.value === './wallet.js';
});
assert.exists(importDeclaration, 'An import from `./wallet.js` should exist');

const specifierNames = importDeclaration.specifiers?.map(s => {
  return s?.local?.name;
});
assert.include(
  specifierNames,
  'Wallet',
  'The `Wallet` class should be imported from `./wallet.js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/main.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 32

### --description--

Create a `const wallet` variable. Set it to a new instance of your `Wallet` class.

### --tests--

You should have `const wallet = new Wallet();` in your `client/main.js` file.

```js
const variableDeclaration = babelisedCode.getVariableDeclarations().find(v => {
  return v.declarations?.[0]?.id?.name === 'wallet';
});
assert.exists(variableDeclaration, 'A variable named `wallet` should exist');
const newExpression = variableDeclaration.declarations[0].init;
assert.equal(newExpression.callee.name, 'Wallet');
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/main.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 33

### --description--

Within the `window.onload` function, replace the `isSignedIn` value with the result of `wallet.walletConnection.isSignedIn()`.

### --tests--

You should have `const isSignedIn = wallet.walletConnection.isSignedIn();` in your `client/main.js` file.

```js
const callExpression = babelisedCode
  .getType('CallExpression')
  .find(
    c =>
      c.callee?.object?.name === 'window' &&
      c.callee?.property?.name === 'onload'
  );
const body = callExpression.arguments[0].body;
const actualCodeString = babelisedCode.generateCode(body, {
  compact: true
});
const expectedCodeString = `const isSignedIn=wallet.walletConnection.isSignedIn()`;
assert.include(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/main.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 34

### --description--

Within the `connectWalletBtn` click event listener callback, replace the `isSignedIn` value with the appropriate value.

### --tests--

You should have `const isSignedIn = wallet.walletConnection.isSignedIn();` in your `client/main.js` file.

```js
const callExpression = babelisedCode
  .getType('CallExpression')
  .find(
    c =>
      c.callee?.object?.name === 'connectWalletBtn' &&
      c.callee?.property?.name === 'addEventListener'
  );
const body = callExpression.arguments[1].body;
const actualCodeString = babelisedCode.generateCode(body, {
  compact: true
});
const expectedCodeString = `const isSignedIn=wallet.walletConnection.isSignedIn()`;
assert.include(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/main.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 35

### --description--

Within the `connectWalletBtn` click event listener callback, if the wallet is signed in, call the `signOut` method on the `wallet`.

### --tests--

You should have `wallet.signOut();` in your `client/main.js` file.

```js
const callExpression = babelisedCode
  .getType('CallExpression')
  .find(
    c =>
      c.callee?.object?.name === 'connectWalletBtn' &&
      c.callee?.property?.name === 'addEventListener'
  );
const body = callExpression.arguments[1].body;
const actualCodeString = babelisedCode.generateCode(body, {
  compact: true
});
const expectedCodeString = `wallet.signOut()`;
assert.include(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/main.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 36

### --description--

Within the `connectWalletBtn` click event listener callback, if the wallet is not signed in, call the `signIn` method on the `wallet`.

### --tests--

You should have `wallet.signIn();` in your `client/main.js` file.

```js
const callExpression = babelisedCode
  .getType('CallExpression')
  .find(
    c =>
      c.callee?.object?.name === 'connectWalletBtn' &&
      c.callee?.property?.name === 'addEventListener'
  );
const body = callExpression.arguments[1].body;
const actualCodeString = babelisedCode.generateCode(body, {
  compact: true
});
const expectedCodeString = `wallet.signIn()`;
assert.include(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/main.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 37

### --description--

At the bottom of the `client/main.js` file, declare an asynchronous function named `viewHints`.

### --tests--

You should have an asynchronous `viewHints` function at the bottom of your `client/main.js` file.

```js
const functionDeclaration = babelisedCode
  .getType('FunctionDeclaration')
  .find(f => f.id?.name === 'viewHints');
assert.exists(
  functionDeclaration,
  `A function named viewHints should exist in the client/main.js file`
);
assert.equal(
  functionDeclaration.async,
  true,
  `The viewHints function should be asynchronous`
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/main.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 38

### --description--

Within the `viewHints` function, create a `const hints` variable, and assign it the result of calling the `call` method on the `wallet` such that the `word-guess` contract's `viewHints` method is called.

### --tests--

You should have `const hints = await wallet.call({ method: 'viewHints' });` in your `viewHints` function.

```js
const functionDeclaration = babelisedCode
  .getType('FunctionDeclaration')
  .find(f => f.id?.name === 'viewHints');
const body = functionDeclaration.body;
const actualCodeString = babelisedCode.generateCode(body, {
  compact: true
});
const expectedCodeString = `const hints=await wallet.call({method:'viewHints'})`;
assert.include(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/main.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 39

### --description--

Within the `viewHints` function, return the hints.

### --tests--

You should have `return hints;` in your `viewHints` function.

```js
const functionDeclaration = babelisedCode
  .getType('FunctionDeclaration')
  .find(f => f.id?.name === 'viewHints');
const body = functionDeclaration.body;
const actualCodeString = babelisedCode.generateCode(body, {
  compact: true
});
const expectedCodeString = `return hints`;
assert.include(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/main.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 40

### --description--

At the bottom of the `client/main.js` file, declare an asynchronous function named `viewGuesses`.

### --tests--

You should have an asynchronous `viewGuesses` function at the bottom of your `client/main.js` file.

```js
const functionDeclaration = babelisedCode
  .getType('FunctionDeclaration')
  .find(f => f.id?.name === 'viewGuesses');
assert.exists(
  functionDeclaration,
  `A function named viewGuesses should exist in the client/main.js file`
);
assert.equal(
  functionDeclaration.async,
  true,
  `The viewGuesses function should be asynchronous`
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/main.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 41

### --description--

Within the `viewGuesses` function, create a `const guesses` variable, and assign it the result of calling the `call` method on the `wallet` such that the `word-guess` contract's `viewGuesses` method is called.

### --tests--

You should have `const guesses = await wallet.call({ method: 'viewGuesses' });` in your `viewGuesses` function.

```js
const functionDeclaration = babelisedCode
  .getType('FunctionDeclaration')
  .find(f => f.id?.name === 'viewGuesses');
const body = functionDeclaration.body;
const actualCodeString = babelisedCode.generateCode(body, {
  compact: true
});
const expectedCodeString = `const guesses=await wallet.call({method:'viewGuesses'})`;
assert.include(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/main.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 42

### --description--

Within the `viewGuesses` function, return the guesses.

### --tests--

You should have `return guesses;` in your `viewGuesses` function.

```js
const functionDeclaration = babelisedCode
  .getType('FunctionDeclaration')
  .find(f => f.id?.name === 'viewGuesses');
const body = functionDeclaration.body;
const actualCodeString = babelisedCode.generateCode(body, {
  compact: true
});
const expectedCodeString = `return guesses`;
assert.include(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/main.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 43

### --description--

At the bottom of the `client/main.js` file, declare an asynchronous function named `makeGuess`.

### --tests--

You should have an asynchronous `makeGuess` function at the bottom of your `client/main.js` file.

```js
const functionDeclaration = babelisedCode
  .getType('FunctionDeclaration')
  .find(f => f.id?.name === 'makeGuess');
assert.exists(
  functionDeclaration,
  `A function named makeGuess should exist in the client/main.js file`
);
assert.equal(
  functionDeclaration.async,
  true,
  `The makeGuess function should be asynchronous`
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/main.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 44

### --description--

Set the `makeGuess` function to have a parameter named `guess`.

### --tests--

You should have `async makeGuess(guess) {}` in your `client/main.js` file.

```js
const functionDeclaration = babelisedCode
  .getType('FunctionDeclaration')
  .find(f => f.id?.name === 'makeGuess');
const params = functionDeclaration.params;
assert.lengthOf(params, 1);
const [firstParam] = params;
assert.equal(firstParam.name, 'guess');
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/main.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 45

### --description--

Within the `makeGuess` function, create a `const resp` variable, and assign it the result of calling the `call` method on the `wallet` such that the `word-guess` contract's `makeGuess` method is called with the `guess` argument.

### --tests--

You should have `const resp = await wallet.call({ method: 'makeGuess', args: { guess } });` in your `makeGuess` function.

```js
const functionDeclaration = babelisedCode
  .getType('FunctionDeclaration')
  .find(f => f.id?.name === 'makeGuess');
const body = functionDeclaration.body;
const actualCodeString = babelisedCode.generateCode(body, {
  compact: true
});
const expectedCodeString = `const resp=await wallet.call({method:'makeGuess',args:{guess}})`;
assert.include(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/main.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 46

### --description--

Within the `makeGuess` function, return the response.

### --tests--

You should have `return resp;` in your `makeGuess` function.

```js
const functionDeclaration = babelisedCode
  .getType('FunctionDeclaration')
  .find(f => f.id?.name === 'makeGuess');
const body = functionDeclaration.body;
const actualCodeString = babelisedCode.generateCode(body, {
  compact: true
});
const expectedCodeString = `return resp`;
assert.include(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/main.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 47

### --description--

Within the `window.onload` function, replace the `guesses` value with the result of calling the `viewGuesses` function.

### --tests--

You should have `const guesses = await viewGuesses();` in your `client/main.js` file.

```js
const callExpression = babelisedCode
  .getType('CallExpression')
  .find(
    c =>
      c.callee?.object?.name === 'window' &&
      c.callee?.property?.name === 'onload'
  );
const body = callExpression.arguments[0].body;
const actualCodeString = babelisedCode.generateCode(body, {
  compact: true
});
const expectedCodeString = `const guesses=await viewGuesses()`;
assert.include(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/main.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 48

### --description--

Within the `guessBtn` click event listener callback, replace the `resp` value with the result of calling the `makeGuess` function with the `guess` value.

### --tests--

You should have `const resp = await makeGuess(guess);` in your `client/main.js` file.

```js
const callExpression = babelisedCode
  .getType('CallExpression')
  .find(
    c =>
      c.callee?.object?.name === 'guessBtn' &&
      c.callee?.property?.name === 'addEventListener'
  );
const body = callExpression.arguments[1].body;
const actualCodeString = babelisedCode.generateCode(body, {
  compact: true
});
const expectedCodeString = `const resp=await makeGuess(guess)`;
assert.include(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/main.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 49

### --description--

Within the `hintsBtn` click event listener callback, replace the `hints` value with the result of calling the `viewHints` function.

### --tests--

You should have `const hints = await viewHints();` in your `client/main.js` file.

```js
const callExpression = babelisedCode
  .getType('CallExpression')
  .find(
    c =>
      c.callee?.object?.name === 'hintsBtn' &&
      c.callee?.property?.name === 'addEventListener'
  );
const body = callExpression.arguments[1].body;
const actualCodeString = babelisedCode.generateCode(body, {
  compact: true
});
const expectedCodeString = `const hints=await viewHints()`;
assert.include(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/client/main.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 50

### --description--

Run `npm run dev` to serve the web app on port `5173`.

### --tests--

You should have the app running on port `5173`.

```js
try {
  const response = await fetch('http://localhost:5173');
  assert.equal(response.status, 200);
} catch (e) {
  assert.fail('The app should be running on port 5173');
}
```

## 51

### --description--

Use the app to sign in to your wallet.

### --tests--

You should sign in to your wallet using the app.

```js
const userAccount = await __helpers.getFile(
  `${project.dashedName}/neardev/dev-account`
);
const output = await __helpers.getCommandOutput(
  `NEAR_ENV=testnet near keys ${userAccount}`,
  project.dashedName
);
const splitOutput = output.stdout.split('[');
const strArr = `[${splitOutput[1]}`;
const strJson = strArr
  .replaceAll('\n', '')
  .replaceAll("'", '"')
  .replaceAll(/(({|,)\s*)(\w+)/gm, '$1"$3"');
const json = JSON.parse(strJson);
assert.isAtLeast(
  json.length,
  2,
  "There should be at least 2 access keys for the app's account"
);
```

## 52

### --description--

Signing in should create an access key for the app.
Run `near keys <your_account>` to see the access key.

### --tests--

You should run `near keys <your_account>` in the terminal.

```js
const id = await __helpers.getFile(`${project.dashedName}/neardev/dev-account`);
let lastCommand = await __helpers.getLastCommand();
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near\\s+keys\\s+${id}`, 'g');
assert.match(lastCommand, re);
```

## 53

### --description--

Use the app to make at least one guess.

### --tests--

You should make at least one guess using the app.

```js
const contractAccount = await __helpers.getFile(
  `${project.dashedName}/neardev/dev-account`
);
const command = `near view-state ${contractAccount} --finality optimistic --utf8 guesses`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
try {
  const jsonOut = JSON.parse(stdout);
  assert.isAtLeast(
    jsonOut.length,
    1,
    'There should be at least one guess in the contract state'
  );
} catch (e) {
  assert.fail(
    e,
    'If this fail, you might need to manually re-run the tests until your guess/transaction is confirmed.'
  );
}
```

## 54

### --description--

This is the last step. Feel free to play the game and mess with the UI.

When you are done, enter `done` in the terminal.

### --tests--

You should enter `done` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand();
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
assert.match(lastCommand, /^\s*done\s*$/);
```

## --fcc-end--
