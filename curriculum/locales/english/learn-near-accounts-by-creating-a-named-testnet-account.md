# NEAR - Learn NEAR Accounts by Creating a Named Testnet Account

## 1

### --description--

For the duration of this project, you will be working in the `learn-near-accounts-by-creating-a-named-testnet-account/` directory. Start by changing into that directory in the terminal.

If the tests don't run automatically, trash the terminal labelled `bash` and open a new bash terminal.

### --tests--

You should use the change directory command (`cd`) in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
assert.match(lastCommand, /^\s*cd/);
```

You should be in the `learn-near-accounts-by-creating-a-named-testnet-account` directory in your terminal

```js
await new Promise(res => setTimeout(res, 1000));
const cwdFile = await __helpers.getCWD();
const cwd = cwdFile.split('\n').filter(Boolean).pop();
assert.include(cwd, 'learn-near-accounts-by-creating-a-named-testnet-account');
```

## 2

### --description--

You will be creating your own NEAR testnet account and learn how accounts work. There are some dependencies you need, run `npm install` to install them.

### --tests--

You should run `npm install` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
assert.match(lastCommand, /^npm\s+(i|install)$/);
```

You should have a `node_modules/near-sdk-js` folder as a result of installing the dependencies

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account/node_modules');
assert.include(dir, 'near-sdk-js');
```

You should have a `node_modules/ts-morph` folder as a result of installing the dependencies

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account/node_modules');
assert.include(dir, 'ts-morph');
```

You should have a `node_modules/near-seed-phrase` folder as a result of installing the dependencies

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account/node_modules');
assert.include(dir, 'near-seed-phrase');
```

## 3

### --description--

Before you create your own account, you will use the `dev-deploy` command to create an account you can play with. Run `npm run build:word-guess` to build the word guessing game smart contract from the previous project.

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
const fileExists = await __helpers.fileExists('learn-near-accounts-by-creating-a-named-testnet-account/build/word-guess.wasm');
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

## 4

### --description--

Use the `dev-deploy` command to deploy the WASM file you just created to the testnet.

### --tests--

You should run `near dev-deploy build/word-guess.wasm` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
assert.match(lastCommand, /near\s+dev-deploy\s+build\/word-guess\.wasm/);
```

You should have a `neardev` folder as a result of deploying the contract

```js
await new Promise(res => setTimeout(res, 1000));
const learnDir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account')
assert.include(learnDir, 'neardev');
```

The terminal output should include `Done deploying to <contract_name>`, where the contract name matches what's in the `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/neardev/dev-account');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('near dev-deploy build/word-guess.wasm');
const lastOutput = splitOutput[splitOutput.length - 1];
const re = new RegExp(`Done deploying to ${id}\\s*$`);
assert.match(lastOutput, re);
```

## 5

### --description--

It created an account for you in the `neardev` folder. Open the `dev-account` file in there to find the account name and run `near state <account>` to get some information about it.

### --tests--

You should run `near state <account>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/neardev/dev-account');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near\\s+state\\s+${id}`, 'g');
assert.match(lastCommand, re);
```

The `<account>` should match the account name in the `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/neardev/dev-account');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`${id}`, 'g');
assert.match(lastCommand, re);
```

## 6

### --description--

The account should have just under 200 NEAR. Run `near keys <account>` to see the access keys for the account.

### --tests--

You should run `near keys <account>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/neardev/dev-account');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near\\s+keys\\s+${id}`, 'g');
assert.match(lastCommand, re);
```

The `<account>` should match the account name in the `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/neardev/dev-account');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`${id}`, 'g');
assert.match(lastCommand, re);
```

## 7

### --description--

There's one access key for the account stored on the testnet. Credentials are stored locally that allow you to use that key. Run `ls -l ~/.near-credentials/testnet`.

### --tests--

You should run `ls -l ~/.near-credentials/testnet` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
assert.match(lastCommand, /^ls -l ~\/\.near-credentials\/testnet\/?$/);
```

The output should include a JSON file matching your `dev-account`

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/neardev/dev-account');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('.near-credentials/testnet');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.include(lastOutput, `${id}.json`);
```

## 8

### --description--

This is where credentials are stored locally. There should be a JSON file matching the name of your `dev-account`. Use `cat` to view the contents of that file.

### --tests--

You should run `cat ~/.near-credentials/testnet/<account>.json` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/neardev/dev-account');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`cat\\s+~\/\.near-credentials\/testnet\/${id}\.json`, 'g');
assert.match(lastCommand, re);
```

The output should include an object with keys for the `dev-account`

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/neardev/dev-account');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`${id}.json`);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.include(lastOutput, `account_id`);
assert.include(lastOutput, `public_key`);
assert.include(lastOutput, `private_key`);
```

## 9

### --description--

The public key here matches the access key, which means you have the credentials to use the account.

Next, you will make your own account. Choose an account name for yourself, I recommend making it short, and run `near state <account>.testnet` to see if it's available. If it's not available, choose another name and run the command again until it is available.

### --tests--

You should enter `near state <account>.testnet` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near\\s+state\\s+\\w*?\.testnet\\s*$`, 'g');
assert.match(lastCommand, re);
```

The console should output `Account <account>.testnet is not found in testnet`

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const account = lastCommand.split(' ')[2];
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('near state');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.include(lastOutput, `Account ${account} is not found in testnet`);
```

## 10

### --description--

Create an `<account>.json` file, with `<account>` being the available name from the last step. e.g. `account_name.testnet`. This file will only be used for your reference and testing.

### --tests--

You should create an `<account>.testnet.json` file

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json'));
assert.exists(file);
```

You should only have one `.testnet.json` file

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const files = dir.filter(file => file.endsWith('.testnet.json'));
assert.lengthOf(files, 1);
```

Running `near state <account>.testnet` should print `Account <account>.testnet is not found in testnet`

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json'));
const account = file.replace('.json', '');
const output = await __helpers.getCommandOutput(`NEAR_ENV=testnet near state ${account}`, 'learn-near-accounts-by-creating-a-named-testnet-account');
const re = new RegExp(`Account\\s+${account}\\s+is\\s+not\\s+found\\s+in\\s+testnet`, 'g');
assert.match(output?.stdout, re);
```

## 11

### --description--

There are many ways to create an account. Here, you will first generate a keypair and seed phrase you can use to create and recover an account. Create a `generate-seed.js` file, this will be a small script for that.

### --tests--

You should have a `generate-seed.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
assert.include(dir, 'generate-seed.js');
```

## 12

### --description--

At the top of the new file, import `{ generateSeedPhrase }` from the `near-seed-phrase` module.

### --tests--

You should have `import { generateSeedPhrase } from 'near-seed-phrase';` as the only thing in your `generate-seed.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/generate-seed.js');
const babelised = await __helpers.babeliser(code);
const imports = babelised?.getImportDeclarations().find(i => i.source?.value === 'near-seed-phrase');
const method = imports?.specifiers?.find(s => s.local?.name === 'generateSeedPhrase');
assert.exists(method);
```

### --seed--

#### --"generate-seed.js"--

```js

```

## 13

### --description--

Below that, create a `const seed` variable set to `generateSeedPhrase()`.

### --tests--

You should have `const seed = generateSeedPhrase();` at the bottom of your `generate-seed.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/generate-seed.js');
assert.match(fileContents, /const\s+seed\s*=\s*generateSeedPhrase\s*\(\s*\)\s*;?\s*$/);
```

### --seed--

#### --"generate-seed.js"--

```js
import { generateSeedPhrase } from 'near-seed-phrase';
```

## 14

### --description--

Finally, log your `seed` variable to the console.

### --tests--

You should have `console.log(seed);` at the bottom of your `generate-seed.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/generate-seed.js');
assert.match(fileContents, /console\s*\.\s*log\s*\(\s*seed\s*\)\s*;?\s*$/);
```

### --seed--

#### --"generate-seed.js"--

```js
import { generateSeedPhrase } from 'near-seed-phrase';

const seed = generateSeedPhrase();
```

## 15

### --description--

Run your file to generate a seed.

### --tests--

You should run `node generate-seed.js` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^\\s*node\\s+generate-seed\.js\\s*$`, 'g');
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

### --seed--

#### --"generate-seed.js"--

```js
import { generateSeedPhrase } from 'near-seed-phrase';

const seed = generateSeedPhrase();
console.log(seed);
```

## 16

### --description--

The console printed a seed phrase and a keypair. Copy the whole JSON object from the console and paste it into the `<account>.json` file you created. Add/change the quotes to make it valid JSON. I also recommend saving the seed phrase to your computer somewhere so you don't lose it.

### --tests--

Your `<account>.json` file should have the correct three properties

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const fileName = dir.find(file => file.endsWith('.testnet.json'));
const jsonFile = await __helpers.getJsonFile(`learn-near-accounts-by-creating-a-named-testnet-account/${fileName}`);
assert.isNotEmpty(jsonFile.seedPhrase);
assert.isNotEmpty(jsonFile.secretKey);
assert.isNotEmpty(jsonFile.publicKey);
```

## 17

### --description--

You can call the testnet contract to create an account. Here's how it looks:

```sh
near call testnet create_account '{"new_account_id": "<account>", "new_public_key": "ed25519:<public_key>"}' --deposit 50 --accountId <dev_account>
```

Run the above command using your account (e.g. `account.testnet`), the public key from the `testnet.json` file, and use the `dev-account` as the calling `accountId`.

### --tests--

You should run the suggested command

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json'));
const userAccount = file.replace('.json', '');
const userJson = await __helpers.getJsonFile(`learn-near-accounts-by-creating-a-named-testnet-account/${file}`)
const publicKey = userJson.publicKey;
const devAccount = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/neardev/dev-account');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^near call testnet create_account '\\s*{\\s*"new_account_id"\\s*:\\s*"${userAccount}"\\s*,\\s*"new_public_key"\\s*:\\s*"${publicKey}"\\s*}\\s*'\\s*(--deposit 50 --accountId ${devAccount}|--accountId ${devAccount} --deposit 50)$`, 'g');
assert.match(lastCommand, re);
```

The command should output `true`

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
assert.match(output, /true\s*$/);
```

## 18

### --description--

Now you should have your own account. Enter `near state <account>` to make sure, and see the account info.

### --tests--

You should enter `near state <account>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json'));
const userAccount = file.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^near state ${userAccount}$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print your account information

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json'));
const userAccount = file.replace('.json', '');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`near state ${userAccount}`);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.include(lastOutput, `Account ${userAccount}`);
```

## 19

### --description--

You should have 50 NEAR you got from the initial deposit. View the access keys for you account with `near keys <account>`.

### --tests--

You should enter `near keys <account>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json'));
const userAccount = file.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^near keys ${userAccount}$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print your access keys

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json'));
const userAccount = file.replace('.json', '');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`near state ${userAccount}`);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.include(lastOutput, `Keys for account ${userAccount}`);
```

## 20

### --description--

You have one access key, the public key matches the one you have in the `testnet.json` file. You can use its seed phrase to recover your account. Open a browser, go to <a href="https://testnet.mynearwallet.com" target="_blank">https://testnet.mynearwallet.com</a>, and follow these instructions to recover your account there:

- On the homepage, click `Import Existing Account`
- Find the `Passphrase` option and click `Recover Account`
- Copy the seed phrase from the `testnet.json` file you created, paste it into the input on that page, and click `Find My Account`

It should have found your account, feel free to look around UI a little. When you are done, click the `Run Tests` buttons below.

### --tests--

Your account should have at least a second access key as a result of recovering your account

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json'));
const userAccount = file.replace('.json', '')
const output = await __helpers.getCommandOutput(`NEAR_ENV=testnet near keys ${userAccount}`, 'learn-near-accounts-by-creating-a-named-testnet-account');
const splitOutput = output.stdout.split('[');
const strArr = `[${splitOutput[1]}`;
const strJson = strArr.replaceAll('\n', '').replaceAll("'", '"').replaceAll(/(({|,)\s*)(\w+)/gm, '$1"$3"');
const json = JSON.parse(strJson);
assert.isAtLeast(json.length, 2);
```

## 21

### --description--

You should stay logged in to your account on that browser so you can use it. Back in the terminal, view the access keys for your account again.

### --tests--

You should enter `near keys <account>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json'));
const userAccount = file.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^near keys ${userAccount}$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print at least two access keys for your account

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json'));
const userAccount = file.replace('.json', '');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`Keys for account ${userAccount}`);
const lastOutput = splitOutput[splitOutput.length - 1];
const strJson = lastOutput.replaceAll('\n', '').replaceAll("'", '"').replaceAll(/(({|,)\s*)(\w+)/gm, '$1"$3"');
const json = JSON.parse(strJson);
assert.isAtLeast(json.length, 2);
```

## 22

### --description--

Now there's two. One was created when you recovered your account. The keypair for that access key is stored in your browser storage. In the terminal, send `5` NEAR from the `dev-account` to your account.

### --tests--

You should run `near send <dev-account> <your_account> 5` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json'));
const userAccount = file.replace('.json', '');
const devAccount = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/neardev/dev-account');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near send ${devAccount} ${userAccount} 5`, 'g');
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

## 23

### --description--

View the state of your account again.

### --tests--

You should enter `near state <account>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json'));
const userAccount = file.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^near state ${userAccount}$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print your account information

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json'));
const userAccount = file.replace('.json', '');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`near state ${userAccount}`);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.include(lastOutput, `Account ${userAccount}`);
```

## 24

### --description--

You should have about 55 NEAR. Now, try to send `5` from your account to the `dev-account`. You should get an error.

### --tests--

You should run `near send <your_account> <dev-account> 5` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json'));
const userAccount = file.replace('.json', '');
const devAccount = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/neardev/dev-account');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near send ${userAccount} ${devAccount} 5`, 'g');
assert.match(lastCommand, re);
```

The transaction should not succeed

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`near send`);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /Can not sign transactions/g);
```

## 25

### --description--

You can't use your account here yet. The NEAR CLI is looking in the `.near-credentials` folder for the credentials of your account. List what's in that folder with `ls -l ~/.near-credentials/testnet`.

### --tests--

You should run `ls -l ~/.near-credentials/testnet` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
assert.match(lastCommand, /^ls -l ~\/\.near-credentials\/testnet\/?$/);
```

## 26

### --description--

The credentials for your account aren't there. Create them by running `near generate-key <account> --seedPhrase "<your_seed_phrase>"`

### --tests--

You should enter `near generate-key <account> --seedPhrase "<seed_phrase>"` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json'));
const userAccount = file.replace('.json', '');
const fileContent = await __helpers.getFile(`learn-near-accounts-by-creating-a-named-testnet-account/${file}`);
const userJson = JSON.parse(fileContent);
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near generate-key ${userAccount} --seedPhrase "${userJson?.seedPhrase}"`, 'g');
assert.match(lastCommand, re);
```

You should have a `~/.near-credentials/testnet/<account>.json` file

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const userFile = dir.find(file => file.endsWith('.testnet.json'));
const credentialsDir = await __helpers.getDirectory('../../root/.near-credentials/testnet');
assert.include(credentialsDir, userFile);
```

The `~/.near-credentials/testnet/<account>.json` file should have the correct account information

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json'));
const userCreds = await __helpers.getJsonFile(`../../root/.near-credentials/testnet/${file}`);
assert.property(userCreds, 'account_id');
assert.property(userCreds, 'public_key');
assert.property(userCreds, 'private_key');
```

## 27

### --description--

List what's in your testnet credentials folder again with `ls -l`

### --tests--

You should run `ls -l ~/.near-credentials/testnet` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
assert.match(lastCommand, /^ls -l ~\/\.near-credentials\/testnet\/?$/);
```

The output should include a `~/.near-credentials/testnet/<account>.json` file

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json'));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`.near-credentials`);
const lastOutput = splitOutput[splitOutput.length - 1];
const re = new RegExp(file, 'g');
assert.match(lastOutput, re);
```

## 28

### --description--

You should have a file with your account name. View what's in it with `cat`.

### --tests--

You should run `cat ~/.near-credentials/testnet/<account>.json` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json'));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`cat ~\/\.near-credentials\/testnet\/${file}`, 'g');
assert.match(lastCommand, re);
```

The output should include an object with keys for your account

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json'));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`${file}.json`);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.include(lastOutput, `account_id`);
assert.include(lastOutput, `public_key`);
assert.include(lastOutput, `private_key`);
```

## 29

### --description--

Now, you should be able to use your account. The public key here matches one of the account's access keys. Try to send 5 NEAR again from your account to the dev account.

### --tests--

You should run `near send <your_account> <dev-account> 5` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json'));
const userAccount = file.replace('.json', '');
const devAccount = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/neardev/dev-account');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near send ${userAccount} ${devAccount} 5`, 'g');
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

## 30

### --description--

The transaction succeeeded. View the state of the dev account.

### --tests--

You should run `near state <dev-account>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/neardev/dev-account');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near state ${id}`, 'g');
assert.match(lastCommand, re);
```

The `<dev-account>` should match the account name in the `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/neardev/dev-account');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`${id}`, 'g');
assert.match(lastCommand, re);
```

## 31

### --description--

It should have about 150 NEAR left. You may need more NEAR in your account so send as many as you can to yourself from the dev account. You should only be able to send about 5 less than the balance.

### --tests--

You should run `near send <dev_account> <your_account> <number>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json'));
const userAccount = file.replace('.json', '');
const devAccount = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/neardev/dev-account');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near send ${devAccount} ${userAccount}`, 'g');
assert.match(lastCommand, re);
```

The transaction should succeed

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`near send`);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.notMatch(lastOutput, /We attempted to send/g);
assert.match(lastOutput, /To see the transaction/g);
```

## 32

### --description--

View your account info to see how many you have now.

### --tests--

You should enter `near state <account>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json'));
const userAccount = file.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^near state ${userAccount}$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print your account information

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json'));
const userAccount = file.replace('.json', '');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`near state ${userAccount}`);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.include(lastOutput, `Account ${userAccount}`);
```

## 33

### --description--

You will want to know a way to give yourself more NEAR in case you run out. Delete the `neardev` folder.

### --tests--

You should not have a `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const learnDir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account')
assert.notInclude(learnDir, 'neardev');
```

## 34

### --description--

Use the `dev-deploy` command do deploy the `build/word-guess.wasm` file again.

### --tests--

You should run `near dev-deploy build/word-guess.wasm` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
assert.match(lastCommand, /near dev-deploy build\/word-guess\.wasm/);
```

You should have a `neardev` folder as a result of deploying the contract

```js
await new Promise(res => setTimeout(res, 1000));
const learnDir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account')
assert.include(learnDir, 'neardev');
```

The terminal output should include `Done deploying to <contract_name>`, where the contract name matches what's in the `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/neardev/dev-account');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('near dev-deploy build/word-guess.wasm');
const lastOutput = splitOutput[splitOutput.length - 1];
const re = new RegExp(`Done deploying to ${id}\\s*$`);
assert.match(lastOutput, re);
```

## 35

### --description--

It created another dev account. View the state of it.

### --tests--

You should run `near state <account>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/neardev/dev-account');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near state ${id}`, 'g');
assert.match(lastCommand, re);
```

The `<account>` should match the account name in the `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/neardev/dev-account');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`${id}`, 'g');
assert.match(lastCommand, re);
```

## 36

### --description--

Send as many NEAR from the dev account to yourself as you can.

### --tests--

You should run `near send <dev-account> <your_account> <number>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json'));
const userAccount = file.replace('.json', '');
const devAccount = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/neardev/dev-account');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near send ${devAccount} ${userAccount}`, 'g');
assert.match(lastCommand, re);
```

The transaction should succeed

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`near send`);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.notMatch(lastOutput, /We attempted to send/g);
assert.match(lastOutput, /To see the transaction/g);
```

## 37

### --description--

View the state of your account.

### --tests--

You should enter `near state <account>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json'));
const userAccount = file.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^near state ${userAccount}$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print your account information

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json'));
const userAccount = file.replace('.json', '');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`near state ${userAccount}`);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.include(lastOutput, `Account ${userAccount}`);
```

## 38

### --description--

You should have enough to last you for a while. Next, you will create a sub-account. They can be useful for organizing your accounts for specific things. Create a `wg.<account>.testnet.json` file.

### --tests--

You should have a `wg.<account>.testnet.json` file

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
assert.exists(file);
```

You should only have one `<account>.testnet.json` file

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.filter(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 2);
assert.lengthOf(file, 1);
```

The two files should have the same main account name

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file1 = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 2);
const file2 = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
assert.equal(file2.endsWith(file1), true);
```

## 39

### --description--

You can create a sub-account using your main account like this:

```sh
near create-account <sub_account> --masterAccount <main_account> --initialBalance <number>
```

Create a sub-account, `wg.<account>.testnet`, and give it an initial balance of `20`.

### --tests--

You should run the suggested command

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file1 = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 2);
const file2 = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount1 = file1.replace('.json', '');
const userAccount2 = file2.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^near create-account ${userAccount2} --masterAccount ${userAccount1} --initialBalance 20`, 'g');
assert.match(lastCommand, re);
```

The command should output that your account was created

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`create-account`);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /"testnet" was created.\s*$/);
```

You should have a `~/.near-credentials/testnet/<your_sub_account>.json` file as a result of creating the account

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const userFile = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const credentialsDir = await __helpers.getDirectory('../../root/.near-credentials/testnet');
assert.include(credentialsDir, userFile);
```

## 40

### --description--

Verify your sub-account by checking its state on the testnet.

### --tests--

You should enter `near state <sub_account>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^near state ${userAccount}$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print your sub account information

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`near state ${userAccount}`);
const lastOutput = splitOutput[splitOutput.length - 1];
const re = new RegExp(`Account ${userAccount}\\s*{`, 'g');
assert.match(lastOutput, re);
```

## 41

### --description--

It should have the 20 NEAR you gave it. Just for fun, go to <a href="https://testnet.mynearwallet.com" target="_blank">https://testnet.mynearwallet.com</a> with the browser where you are still logged in with your main account, and follow these instructions to send 30 from your main account to your new sub-account:

- Make sure you are on the `Wallet` page and click the `Send` button
- Type `30` in the input and click `Continue`
- Enter your sub-account in the input for who to send it to and click `Continue`
- Click `Confirm and Send`

When you are done, click the `Run Tests` button below.

### --tests--

Your sub-account should have at least 40 NEAR

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
const output = await __helpers.getCommandOutput(`NEAR_ENV=testnet near state ${userAccount}`, 'learn-near-accounts-by-creating-a-named-testnet-account');
const splitOutput = output?.stdout?.split('{');
const strArr = `{${splitOutput[1]}`;
const strJson = strArr.replaceAll('\n', '').replaceAll("'", '"').replaceAll(/(({|,)\s*)(\w+)/gm, '$1"$3"');
const json = JSON.parse(strJson);
assert.isAtLeast(parseFloat(json?.formattedAmount), 40);
```

## 42

### --description--

A sub-account is its own account, with its own access keys. The master account it was created from has no authority over it. In the terminal, view the keys for your sub-account.

### --tests--

You should enter `near keys <sub_account>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^near keys ${userAccount}$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print at least one access key for your account

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`Keys for account ${userAccount}`);
const lastOutput = splitOutput[splitOutput.length - 1];
const strJson = lastOutput.replaceAll('\n', '').replaceAll("'", '"').replaceAll(/(({|,)\s*)(\w+)/gm, '$1"$3"');
const json = JSON.parse(strJson);
assert.isAtLeast(json?.length, 1);
```

## 43

### --description--

Creating the account added an access key for it. View the testnet credentials folder with `ls -l`.

### --tests--

You should run `ls -l ~/.near-credentials/testnet` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
assert.match(lastCommand, /^ls -l ~\/\.near-credentials\/testnet\/?$/);
```

The output should include a `~/.near-credentials/testnet/<account>.json` file

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`.near-credentials`);
const lastOutput = splitOutput[splitOutput.length - 1];
const re = new RegExp(file, 'g');
assert.match(lastOutput, re);
```

## 44

### --description--

You can see it also added credentials for that access key locally, but you don't have a way to recover that account. Run your script to generate a new seed phrase.

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

## 45

### --description--

Copy the whole JSON object and paste it into the `<sub_account>.json` file you created and add/change the quotes to make it valid JSON.

### --tests--

Your `wg.<account>.testnet.json` file should have the correct three properties

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const fileName = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const jsonFile = await __helpers.getJsonFile(`learn-near-accounts-by-creating-a-named-testnet-account/${fileName}`);
assert.isNotEmpty(jsonFile.seedPhrase);
assert.isNotEmpty(jsonFile.secretKey);
assert.isNotEmpty(jsonFile.publicKey);
```

## 46

### --description--

Since you have credentials for your sub-account, you can create a new access key. Run `near add-key <sub-account> "<publicKey>"` to create a new access key. Use the public key you generated for your sub-account.

### --tests--

You should enter `near add-key <sub_account> "<public_key>"` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
const userFile = await __helpers.getFile(`learn-near-accounts-by-creating-a-named-testnet-account/${file}`);
const userJson = JSON.parse(userFile);
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^near add-key ${userAccount} "${userJson?.publicKey}"$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print `Adding full access key`

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('near add-key');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.include(lastOutput, `Adding full access key`);
```

Your account should have at least a second access key

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '')
const output = await __helpers.getCommandOutput(`NEAR_ENV=testnet near keys ${userAccount}`, 'learn-near-accounts-by-creating-a-named-testnet-account');
const splitOutput = output.stdout.split('[');
const strArr = `[${splitOutput[1]}`;
const strJson = strArr.replaceAll('\n', '').replaceAll("'", '"').replaceAll(/(({|,)\s*)(\w+)/gm, '$1"$3"');
const json = JSON.parse(strJson);
assert.isAtLeast(json.length, 2);
```

## 47

### --description--

Check the keys for your sub-account again.

### --tests--

You should enter `near keys <sub_account>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^near keys ${userAccount}$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print at least two access keys for your account

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`Keys for account ${userAccount}`);
const lastOutput = splitOutput[splitOutput.length - 1];
const strJson = lastOutput.replaceAll('\n', '').replaceAll("'", '"').replaceAll(/(({|,)\s*)(\w+)/gm, '$1"$3"');
const json = JSON.parse(strJson);
assert.isAtLeast(json.length, 2);
```

## 48

### --description--

Now, there's another key created from your seed phrase. So you can use that seed phrase to recover your account. Open the browser where you are logged in with your main account, go to <a href="https://testnet.mynearwallet.com" target="_blank">https://testnet.mynearwallet.com</a>, and follow these instructions to recover this new account there:

- Click your username at the top and click `Import Account` from the dropdown
- Find the `Passphrase` option and click `Recover Account`
- Copy the seed phrase from the `testnet.json` file you created for your sub-account, paste it into the input on that page, and click `Find My Account`

It should have found your account. When you are done, click the `Run Tests` buttons below.

### --tests--

Your account should have at least a third access key as a result of recovering your account

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '')
const output = await __helpers.getCommandOutput(`NEAR_ENV=testnet near keys ${userAccount}`, 'learn-near-accounts-by-creating-a-named-testnet-account');
const splitOutput = output.stdout.split('[');
const strArr = `[${splitOutput[1]}`;
const strJson = strArr.replaceAll('\n', '').replaceAll("'", '"').replaceAll(/(({|,)\s*)(\w+)/gm, '$1"$3"');
const json = JSON.parse(strJson);
assert.isAtLeast(json.length, 3);
```

## 49

### --description--

Now you can use either of your accounts in your browser. You can switch between them by clicking your account at the top right.

In the terminal, check the keys for your sub-account.

### --tests--

You should enter `near keys <sub_account>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^near keys ${userAccount}$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print at least three access keys for your account

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`Keys for account ${userAccount}`);
const lastOutput = splitOutput[splitOutput.length - 1];
const strJson = lastOutput.replaceAll('\n', '').replaceAll("'", '"').replaceAll(/(({|,)\s*)(\w+)/gm, '$1"$3"');
const json = JSON.parse(strJson);
assert.isAtLeast(json.length, 3);
```

## 50

### --description--

So far, you have only ever used the `dev-deploy` command to deploy a contract. You can use `near deploy` if you have an account. Deploy the word guess contract to your sub-account by running `near deploy <sub_account> build/word-guess.wasm`. Make sure you use your sub-account.

### --tests--

You should run `near deploy <sub_account> build/word-guess.wasm` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near deploy ${userAccount} build/word-guess.wasm`);
assert.match(lastCommand, re);
```

The terminal output should include `Done deploying to <sub_account>`

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`deploy ${userAccount}`);
const lastOutput = splitOutput[splitOutput.length - 1];
const re = new RegExp(`Done deploying to ${userAccount}\\s*$`);
assert.match(lastOutput, re);
```

## 51

### --description--

The contract name matches your sub-account name. Call the `init` method on your contract and set the secret word to `web3`. The syntax looks like this:

```sh
near call <contract> <method> '{ "secretWord": "web3" }' --accountId <calling_account>
```

If you set the wrong secret word, there's a `setSecretWord` method with the same syntax you can call to change it.

### --tests--

You should run `near call <sub_account> init '{ "secretWord": "web3" }' --accountId <sub_account>`

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near call ${userAccount} (init|setSecretWord)\\s*'\\s*{\\s*"secretWord"\\s*:\\s*"web3"\\s*}\\s*'\\s*--accountId ${userAccount}`);
assert.match(lastCommand, re);
```

The secret word on your sub-account contract should be set to `web3`

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const account = file.replace('.json', '');
const output = await __helpers.getCommandOutput(`NEAR_ENV=testnet near call ${account} viewSecretWord --accountId ${account}`, 'learn-near-accounts-by-creating-a-named-testnet-account');
assert.match(output?.stdout, /"The secret word is 'web3'"/g)
```

## 52

### --description--

Run the `viewSecretWord` method on your contract. It's a call method, so you need use an account ID when running it.

### --tests--

You should run `near call <sub_account> viewSecretWord --accountId <sub_account>`

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near call ${userAccount} viewSecretWord --accountId ${userAccount}`);
assert.match(lastCommand, re);
```

The terminal should print `"The secret word is 'web3'"`

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`viewSecretWord --accountId`);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /"The secret word is 'web3'"/g);
```

## 53

### --description--

Next, you will make some small changes to the contract and re-deploy it. Open the `src/word-guess.js` file and add `this.contractCreator = 'me'` in the constructor.

### --tests--

You should have `this.contractCreator = 'me';` in your constructor function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const construct = babelised?.getType('ClassMethod').find(c => c.kind === 'constructor');
const recreatedCode = babelised?.generateCode(construct);
assert.match(recreatedCode, /this\.contractCreator\s*=\s*('|"|`)me\1;/);
```

## 54

### --description--

In the `init` function, set the `contractCreator` variable to `near.predecessorAccountId()`. Make sure to add it before the `return`. Now, when the contract is initialized, the calling account will be set as the creator of the contract.

### --tests--

You should have `this.contractCreator = near.predecessorAccountId();` in your `init` function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const init = babelised?.getType('ClassMethod').find(c => c.key?.name === 'init' && c.key?.scope?.includes('WordGuess'));
const initCode = babelised?.generateCode(init);
assert.match(initCode, /this\.contractCreator = near\.predecessorAccountId\(\);/);
```

### --seed--

#### --"src/word-guess.js"--

```js
import { Vector, near, view, call, initialize, NearBindgen } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = new Vector('hints');
    this.guesses = new Vector('guesses');
    this.contractCreator = 'me';
  }

  @initialize({})
  init({ secretWord }) {
    this.secretWord = secretWord;
    return `The secret word has been set to '${secretWord}'`;
  }

  @call({ privateFunction: true })
  viewSecretWord() {
    return `The secret word is '${this.secretWord}'`;
  }

  @call({ privateFunction: true })
  addHint({ hint }) {
    this.hints.push(hint);
    return `Your hint was added`;
  }

  @view({})
  viewHints() {
    return this.hints.toArray();
  }

  @view({})
  viewGuesses() {
    return this.guesses.toArray();
  }

  @call({})
  makeGuess({ guess }) {
    const lastGuess = this.guesses[this.guesses.length - 1];

    if(lastGuess?.guess === this.secretWord) {
      return `This game is finished. The secret word, '${this.secretWord}', was guessed by ${lastGuess.guesser}`;
    } else {
      const guesser = near.predecessorAccountId();
      near.log(`\nguesser = ${guesser}`);
      near.log(`\nguess = ${guess}`);

      this.guesses.push({ guesser, guess });

      if (guess === this.secretWord) {
        return `You got it! The secret word is '${this.secretWord}'`;
      } else {
        return `Sorry, '${guess}' is not the secret word`;
      }
    }
  }
}
```

## 55

### --description--

Create a new view function in your contract named `viewContractCreator`. Give it the correct decorator and leave it empty for now.

### --tests--

You should have a `viewContractCreator() { }` function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const viewSecret = babelised?.getType('ClassMethod').find(c => c.key?.name === 'viewContractCreator' && c.key?.scope?.includes('WordGuess'));
assert.exists(viewSecret, "You should have an 'viewContractCreator' function");
assert.lengthOf(viewSecret?.body?.body, 0, "Your 'viewContractCreator' function should be empty");
```

You should have a `@view({})` decorator above the function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const viewSecret = babelised?.getType('ClassMethod').find(c => c.key?.name === 'viewContractCreator' && c.key?.scope?.includes('WordGuess'));
const exp = viewSecret?.decorators[0]?.expression;
assert.equal(exp?.callee?.name, 'view', "You should have a '@view()' decorator");
assert.lengthOf(exp?.arguments, 1, "The 'view' decorator should have one argument");
assert.equal(exp?.arguments[0]?.type, 'ObjectExpression', "The 'view' decorator argument should be an object");
assert.lengthOf(exp?.arguments[0]?.properties, 0, "The 'view' object argument should not have any properties");
```

### --seed--

#### --"src/word-guess.js"--

```js
import { Vector, near, view, call, initialize, NearBindgen } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = new Vector('hints');
    this.guesses = new Vector('guesses');
    this.contractCreator = 'me';
  }

  @initialize({})
  init({ secretWord }) {
    this.secretWord = secretWord;
    this.contractCreator = near.predecessorAccountId();
    return `The secret word has been set to '${secretWord}'`;
  }

  @call({ privateFunction: true })
  viewSecretWord() {
    return `The secret word is '${this.secretWord}'`;
  }

  @call({ privateFunction: true })
  addHint({ hint }) {
    this.hints.push(hint);
    return `Your hint was added`;
  }

  @view({})
  viewHints() {
    return this.hints.toArray();
  }

  @view({})
  viewGuesses() {
    return this.guesses.toArray();
  }

  @call({})
  makeGuess({ guess }) {
    const lastGuess = this.guesses[this.guesses.length - 1];

    if(lastGuess?.guess === this.secretWord) {
      return `This game is finished. The secret word, '${this.secretWord}', was guessed by ${lastGuess.guesser}`;
    } else {
      const guesser = near.predecessorAccountId();
      near.log(`\nguesser = ${guesser}`);
      near.log(`\nguess = ${guess}`);

      this.guesses.push({ guesser, guess });

      if (guess === this.secretWord) {
        return `You got it! The secret word is '${this.secretWord}'`;
      } else {
        return `Sorry, '${guess}' is not the secret word`;
      }
    }
  }
}
```

## 56

### --description--

In the function, return `This contract was created by '<contract_creator>'`;

### --tests--

You should have ``return `This contract was created by '${this.contractCreator}'`;`` in your `viewContractCreator` function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-accounts-by-creating-a-named-testnet-account/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const creator = babelised?.getType('ClassMethod').find(c => c.key?.name === 'viewContractCreator' && c.key?.scope?.includes('WordGuess'));
const creatorCode = babelised?.generateCode(creator);
assert.match(creatorCode, /{\s*return `This contract was created by '\${this\.contractCreator}'`;\s*}/);
```

### --seed--

#### --"src/word-guess.js"--

```js
import { Vector, near, view, call, initialize, NearBindgen } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = new Vector('hints');
    this.guesses = new Vector('guesses');
    this.contractCreator = 'me';
  }

  @initialize({})
  init({ secretWord }) {
    this.secretWord = secretWord;
    this.contractCreator = near.predecessorAccountId();
    return `The secret word has been set to '${secretWord}'`;
  }

  @view({})
  viewContractCreator() {

  }

  @call({ privateFunction: true })
  viewSecretWord() {
    return `The secret word is '${this.secretWord}'`;
  }

  @call({ privateFunction: true })
  addHint({ hint }) {
    this.hints.push(hint);
    return `Your hint was added`;
  }

  @view({})
  viewHints() {
    return this.hints.toArray();
  }

  @view({})
  viewGuesses() {
    return this.guesses.toArray();
  }

  @call({})
  makeGuess({ guess }) {
    const lastGuess = this.guesses[this.guesses.length - 1];

    if(lastGuess?.guess === this.secretWord) {
      return `This game is finished. The secret word, '${this.secretWord}', was guessed by ${lastGuess.guesser}`;
    } else {
      const guesser = near.predecessorAccountId();
      near.log(`\nguesser = ${guesser}`);
      near.log(`\nguess = ${guess}`);

      this.guesses.push({ guesser, guess });

      if (guess === this.secretWord) {
        return `You got it! The secret word is '${this.secretWord}'`;
      } else {
        return `Sorry, '${guess}' is not the secret word`;
      }
    }
  }
}
```

## 57

### --description--

Rebuild your contract.

### --tests--

You should run `npm run build:word-guess` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand.trim(), /^npm\s+run\s+build:word-guess$/);
```

You should have a `build/word-guess.wasm` file as a result of building the contract

```js
await new Promise(res => setTimeout(res, 1000));
const fileExists = await __helpers.fileExists('learn-near-accounts-by-creating-a-named-testnet-account/build/word-guess.wasm');
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

### --seed--

#### --"src/word-guess.js"--

```js
import { Vector, near, view, call, initialize, NearBindgen } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = new Vector('hints');
    this.guesses = new Vector('guesses');
    this.contractCreator = 'me';
  }

  @initialize({})
  init({ secretWord }) {
    this.secretWord = secretWord;
    this.contractCreator = near.predecessorAccountId();
    return `The secret word has been set to '${secretWord}'`;
  }

  @view({})
  viewContractCreator() {
    return `This contract was created by '${this.contractCreator}'`;
  }

  @call({ privateFunction: true })
  viewSecretWord() {
    return `The secret word is '${this.secretWord}'`;
  }

  @call({ privateFunction: true })
  addHint({ hint }) {
    this.hints.push(hint);
    return `Your hint was added`;
  }

  @view({})
  viewHints() {
    return this.hints.toArray();
  }

  @view({})
  viewGuesses() {
    return this.guesses.toArray();
  }

  @call({})
  makeGuess({ guess }) {
    const lastGuess = this.guesses[this.guesses.length - 1];

    if(lastGuess?.guess === this.secretWord) {
      return `This game is finished. The secret word, '${this.secretWord}', was guessed by ${lastGuess.guesser}`;
    } else {
      const guesser = near.predecessorAccountId();
      near.log(`\nguesser = ${guesser}`);
      near.log(`\nguess = ${guess}`);

      this.guesses.push({ guesser, guess });

      if (guess === this.secretWord) {
        return `You got it! The secret word is '${this.secretWord}'`;
      } else {
        return `Sorry, '${guess}' is not the secret word`;
      }
    }
  }
}
```

## 58

### --description--

Deploy the contract to your sub-account again with `near deploy`. As a reminder, here's the sytax:

```sh
near deploy <sub_account> build/word-guess.wasm
```

Make sure to use your sub-account. It will tell you the contract is already deployed. Enter `y` to proceed deploying it.

### --tests--

You should run `near deploy <sub_account> build/word-guess.wasm` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near deploy ${userAccount} build/word-guess.wasm`);
assert.match(lastCommand, re);
```

The terminal output should include `Done deploying to <sub_account>`

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`deploy ${userAccount}`);
const lastOutput = splitOutput[splitOutput.length - 1];
const re = new RegExp(`Done deploying to ${userAccount}\\s*$`);
assert.match(lastOutput, re);
```

## 59

### --description--

Your contract was redployed. Call its `viewSecretWord` method. It's a private `call` method.

### --tests--

You should run `near call <sub_account> viewSecretWord --accountId <sub_account>`

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near call ${userAccount} viewSecretWord --accountId ${userAccount}`);
assert.match(lastCommand, re);
```

The terminal should print `"The secret word is 'web3'"`

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`viewSecretWord --accountId`);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /"The secret word is 'web3'"/g);
```

## 60

### --description--

The contract is still initialized. Call the new `viewContractCreator` method you added. It's a `view` method.

### --tests--

You should run `near view <sub_account> viewContractCreator`

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near view ${userAccount} viewContractCreator`);
assert.match(lastCommand, re);
```

The terminal should print `"This contract was created by 'undefined'"`

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`viewSecretWord --accountId`);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /"This contract was created by 'undefined'"/g);
```

## 61

### --description--

Remember that once you deploy a contract, you are allowed to re-deploy it with changes in the logic, but not the storage. So the new method you added exists, but the new variable you added to storage is `undefined`. If you want to change the storage, you will have to delete your account and recreate it. Run `near delete <sub_account> <main_account>` to delete your sub-account and send all its funds back to your main account. Enter `y` when asked to proceed with the account deletion.

### --tests--

You should run `near delete <sub_account> <main_account>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const sub = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const subAccount = sub.replace('.json', '');
const main = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 2);
const mainAccount = main.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near delete ${subAccount} ${mainAccount}`);
assert.match(lastCommand, re);
```

Running `near state <sub_account>` should print `Account <sub_account> is not found in testnet`

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const account = file.replace('.json', '');
const output = await __helpers.getCommandOutput(`NEAR_ENV=testnet near state ${account}`, 'learn-near-accounts-by-creating-a-named-testnet-account');
const re = new RegExp(`Account\\s+${account}\\s+is\\s+not\\s+found\\s+in\\s+testnet`, 'g');
assert.match(output?.stdout, re);
```

## 62

### --description--

Check the state of your sub-account to verify that the account is gone.

### --tests--

You should enter `near state <sub_account>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^near state ${userAccount}$`, 'g');
assert.match(lastCommand, re);
```

The console should output `Account <sub_account> is not found in testnet`

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const account = lastCommand.split(' ')[2];
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('near state');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.include(lastOutput, `Account ${account} is not found in testnet`);
```

## 63

### --description--

The account is gone. Try to call the `viewContractCreator` method like you did before.

### --tests--

You should enter `near view <sub_account> viewContractCreator` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
let lastCommand = await __helpers.getLastCommand();
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^near view ${userAccount} viewContractCreator$`, 'g');
assert.match(lastCommand, re);
```

The console should output `Account <sub_account> is not found in testnet`

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const account = lastCommand.split(' ')[2];
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('near state');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.include(lastOutput, `Account ${account} is not found in testnet`);
```

## 64

### --description--

The contract is gone as well. Re-create your sub-account using the same name. The syntax looks like this:

```sh
near create-account <sub_account> --masterAccount <main_account> --initialBalance <number>
```

Give your sub-account an initial balance of 50.

### --tests--

You should run the suggested command

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file1 = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 2);
const file2 = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount1 = file1.replace('.json', '');
const userAccount2 = file2.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^near create-account ${userAccount2} --masterAccount ${userAccount1} --initialBalance 50`, 'g');
assert.match(lastCommand, re);
```

The command should output that your account was created

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`create-account`);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /"testnet" was created.\s*$/);
```

## 65

### --description--

View the keys of your new sub-account.

### --tests--

You should enter `near keys <sub_account>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^near keys ${userAccount}$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print at least one access key for your account

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`Keys for account ${userAccount}`);
const lastOutput = splitOutput[splitOutput.length - 1];
const strJson = lastOutput.replaceAll('\n', '').replaceAll("'", '"').replaceAll(/(({|,)\s*)(\w+)/gm, '$1"$3"');
const json = JSON.parse(strJson);
assert.isAtLeast(json?.length, 1);
```

## 66

### --description--

There's only one key again. All the keys you had were removed when you deleted your account. The credentials for this new key were stored locally for you. Deploy the contract to your sub-account again.

### --tests--

You should run `near deploy <sub_account> build/word-guess.wasm` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near deploy ${userAccount} build/word-guess.wasm`);
assert.match(lastCommand, re);
```

The terminal output should include `Done deploying to <sub_account>`

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`deploy ${userAccount}`);
const lastOutput = splitOutput[splitOutput.length - 1];
const re = new RegExp(`Done deploying to ${userAccount}\\s*$`);
assert.match(lastOutput, re);
```

## 67

### --description--

Call the `init` function on your contract. Set the secret word to `web3` again, and use your sub-account as the calling account.

If you set the wrong secret word, there's a `setSecretWord` method you can call to change it.

### --tests--

You should run `near call <sub_account> init '{ "secretWord": "web3" }' --accountId <sub_account>`

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near call ${userAccount} (init|setSecretWord)\\s*'\\s*{\\s*"secretWord"\\s*:\\s*"web3"\\s*}\\s*'\\s*--accountId ${userAccount}`);
assert.match(lastCommand, re);
```

The secret word on your sub-account contract should be set to `web3`

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const account = file.replace('.json', '');
const output = await __helpers.getCommandOutput(`NEAR_ENV=testnet near call ${account} viewSecretWord --accountId ${account}`, 'learn-near-accounts-by-creating-a-named-testnet-account');
assert.match(output?.stdout, /"The secret word is 'web3'"/g)
```

## 68

### --description--

Run the `viewContractCreator` view method on your contract.

### --tests--

You should run `near view <sub_account> viewContractCreator`

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near view ${userAccount} viewContractCreator`);
assert.match(lastCommand, re);
```

The terminal should print `"This contract was created by '<sub_account>'"`

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`viewSecretWord --accountId`);
const lastOutput = splitOutput[splitOutput.length - 1];
const re = new RegExp(`"This contract was created by '${userAccount}'"`);
assert.match(lastOutput, re);
```

## 69

### --description--

The new contract stored the `contractCreator` variable now and printed your sub-account. So if you need to change your contract storage, you have to delete your account and re-deploy the contract.

Another type of access key is a functional access key. You can create one like this:

```sh
near add-key <sub_account> "<public_key>" --contractId <sub_account>
```

Since you deleted your account, the key in the `<sub_account>.json` file you created isn't used anymore. Create a functional access key, using the public key in that file, and make the key limited to the contract with your sub-account name.

### --tests--

Your account should have a functional access key limited to the contract with the name of your sub-account

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const account = file.replace('.json', '');
const output = await __helpers.getCommandOutput(`NEAR_ENV=testnet near keys ${account}`, 'learn-near-accounts-by-creating-a-named-testnet-account');
const splitOutput = output?.stdout?.split('[');
splitOutput.shift()
const joined = splitOutput.join('[');
const strArr = `[${joined}`;
const strJson = strArr.replaceAll('\n', '').replaceAll("'", '"').replaceAll(/(({|,)\s*)(\w+)/gm, '$1"$3"');
const json = JSON.parse(strJson);
const functionalKey = json.find(key => key.access_key?.permission?.FunctionCall?.receiver_id === account);
assert.exists(functionalKey);
```

## 70

### --description--

Functional access keys make it so using those credentials can only be used in limited ways. In this case, the key you created can only be used to call methods on the contract with the name of your sub-account. View the keys for your sub-account to see the new functional key.

### --tests--

You should enter `near keys <sub_account>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`^near keys ${userAccount}$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print at least one functional access key

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`Keys for account ${userAccount}`);
const lastOutput = splitOutput[splitOutput.length - 1];
const strJson = lastOutput.replaceAll('\n', '').replaceAll("'", '"').replaceAll(/(({|,)\s*)(\w+)/gm, '$1"$3"');
const json = JSON.parse(strJson);
const functionalKey = json.find(key => key.access_key?.permission?.FunctionCall?.receiver_id === userAccount);
assert.exists(functionalKey);
```

## 71

### --description--

Because you supplied a contract ID when creating the key, it created a functional key. In order to make it so your contract logic and state can't change, you can delete all but the functional keys. Run `near delete-key <sub_account> "<public_key>"` to delete the full access key for your sub-account. Make sure you don't delete the functional key.

Read the prompts and enter `y` to proceed.

### --tests--

Running `near keys <sub_account>` should print a single key, the functional key

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const account = file.replace('.json', '');
const output = await __helpers.getCommandOutput(`NEAR_ENV=testnet near keys ${account}`, 'learn-near-accounts-by-creating-a-named-testnet-account');
const splitOutput = output?.stdout?.split('[');
splitOutput.shift()
const joined = splitOutput.join('[');
const strArr = `[${joined}`;
const strJson = strArr.replaceAll('\n', '').replaceAll("'", '"').replaceAll(/(({|,)\s*)(\w+)/gm, '$1"$3"');
const json = JSON.parse(strJson);
const functionalKey = json.find(key => key.access_key?.permission?.FunctionCall?.receiver_id === account);
assert.lengthOf(json, 1);
assert.exists(functionalKey);
```

## 72

### --description--

The full access key you just deleted is what you had stored locally to use the account. Set your local credentials to the functional key with `near generate-key <sub_account> --seedPhrase "<seed_phrase>"`. Use the seed phrase from the JSON file you created for your sub-account, since that's the same as the access key.

### --tests--

You should enter `near generate-key <sub_account> --seedPhrase "<seed_phrase>"` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
const fileContent = await __helpers.getFile(`learn-near-accounts-by-creating-a-named-testnet-account/${file}`);
const userJson = JSON.parse(fileContent);
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near generate-key ${userAccount} --seedPhrase ("|')${userJson?.seedPhrase}\\1`, 'g');
assert.match(lastCommand, re);
```

The public key in the `~/.near-credentials/testnet/<account>.json` file should match the public key in your sub-account JSON file

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const jsonFile = await __helpers.getJsonFile(`learn-near-accounts-by-creating-a-named-testnet-account/${file}`)
const userCreds = await __helpers.getJsonFile(`../../root/.near-credentials/testnet/${file}`);
assert.property(userCreds, 'account_id');
assert.property(userCreds, 'public_key');
assert.property(userCreds, 'private_key');
assert.equal(jsonFile?.publicKey, userCreds?.public_key);
```

## 73

### --description--

Use `cat` to view the local credentials for your sub-account.

### --tests--

You should run `cat ~/.near-credentials/testnet/<sub_account>.json` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`cat ~\/\.near-credentials\/testnet\/${file}`, 'g');
assert.match(lastCommand, re);
```

The output should include an object with keys for your sub-account

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`${file}.json`);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.include(lastOutput, `account_id`);
assert.include(lastOutput, `public_key`);
assert.include(lastOutput, `private_key`);
```

## 74

### --description--

Now, you are using the functional key with this account. Try to send 5 NEAR from your sub-account to your main account.

### --tests--

You should run `near send <sub-account> <main_account> 5` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const mainFile = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 2);
const subFile = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const mainAccount = mainFile.replace('.json', '');
const subAccount = subFile.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near send ${subAccount} ${mainAccount} 5`, 'g');
assert.match(lastCommand, re);
```

The transaction should not succeed

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`near send`);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /We attempted to send/g);
assert.match(lastOutput, /something went wrong/g);
```

## 75

### --description--

With the functional key, you aren't allowed to send funds. Try to deploy the contract again. Enter `y` to proceed when prompted.

### --tests--

You should run `near deploy <sub_account> build/word-guess.wasm` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near deploy ${userAccount} build/word-guess.wasm`);
assert.match(lastCommand, re);
```

The terminal should print an error message

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`near deploy ${userAccount}`);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /We attempted to send/g);
assert.match(lastOutput, /something went wrong/g);
```

## 76

### --description--

You can't re-deploy the contract either. Try to delete the account with `near delete <sub_account> <main_account>`. Enter `y` when prompted.

### --tests--

You should run `near delete <sub_account> <main_account>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const sub = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const subAccount = sub.replace('.json', '');
const main = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 2);
const mainAccount = main.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near delete ${subAccount} ${mainAccount}`);
assert.match(lastCommand, re);
```

The terminal should print an error message

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`near delete ${userAccount}`);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /We attempted to send/g);
assert.match(lastOutput, /something went wrong/g);
```

## 77

### --description--

You can't delete the account either. With a functional key, you can only use it to call the contract specified. Call the `viewSecretWord` method on your contract. It's a call method. Use your sub-account as the calling account.

### --tests--

You should run `near call <sub_account> viewSecretWord --accountId <sub_account>`

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
const re = new RegExp(`near call ${userAccount} viewSecretWord --accountId ${userAccount}`);
assert.match(lastCommand, re);
```

The terminal should print `"The secret word is 'web3'"`

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-accounts-by-creating-a-named-testnet-account');
const file = dir.find(file => file.endsWith('.testnet.json') && file.match(/\./g).length === 3);
const userAccount = file.replace('.json', '');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(`viewSecretWord --accountId`);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /"The secret word is 'web3'"/g);
```

## 78

### --description--

This is the last step. With all but the functional key deleted. The account and contract are effectively stuck, ensuring that neither of them can be changed. But you can still use the functional key to call the methods the key allows.

Make sure you have the seed for your main account saved somewhere, you will need it for the upcoming courses. When you are done, enter `done` in the terminal.

### --tests--

You should enter `done` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
let lastCommand = await __helpers.getLastCommand()
lastCommand = lastCommand?.trim().replaceAll(/\s+/g, ' ');
assert.match(lastCommand, /^\s*done\s*$/);
```

## --fcc-end--
