# NEAR - Build a Sentence Making Smart Contract

## 1

### --description--

For this project, you will be making a NEAR smart contract using JavaScript where you add words to a string, one at a time, to form a sentence. You are started with some boilerplate code and files, you should not need to change any of the boilerplate code.

Start by going into the `build-a-sentence-making-smart-contract` folder in your terminal and running `npm install` to install the dependencies. Then, create your smart contract in the `src/sentence-maker.js` file. When you're ready, run `npm build:sentence-maker` to build your contract, and deploy it with `near dev-deploy build/sentence-maker.wasm`.

You will need to have at least two different accounts (generated when using `dev-deploy`) to fulfill the user stories and pass the tests. Rename one of the generated `neardev` folders to a `neardev-1` folder. The tests will use this to call your contract, you will likely want to use it as well. Once you have deployed and **completely finished** your contract, move the finished contract account info to a `neardev-final` folder.

**User Stories:**

1. You should export a `SentenceMaker` class in your smart contract file

1. Your smart contract should store a sentence

1. Your contract should have an `init` method that accepts a `{ word }` parameter

1. Your contract should require initialization

1. Initializing your contract should add the passed in `word` to the sentence

1. Your contract should have an `addWord` method that accepts a `{ word }` parameter

1. Calling the `addWord` method should add the `word` to the sentence. Depending on how you store the sentence, you may need to automatically add a space in front of the word

1. Your `addWord` method should not allow spaces in the `word` parameter

1. If the last word in your sentence ends with a period (`.`), question mark (`?`), or exclamation point (`!`), the sentence is "complete".

1. If your sentence is "complete" it should return `The sentence is complete, more words cannot be added` when you call its `addWord` method with a valid argument

1. Your contract should have a `viewSentence` method that returns the sentence

1. You should keep track of all the accounts that add a word, and the word they added in the form of `{ id, word }`

1. Your contract should have a `viewWords` method that returns an array of objects in the form of `{ id, word }`, where `id` is the account that added the word, and `word` is the word they added

1. Your contract should not allow the same account to add more that one word in a row

1. If someone tries to add more than one word in a row, your contract should return `You cannot add two words in a row`

1. Only the contract account should be able to run the `viewWords` method

1. All your contract methods should have the appropriate decorators where needed

1. You should use the `Vector` collection at least once

1. You should use `near.log` at least once

1. Running the `viewSentence` method on the contract in your `neardev-final` account should return `I deployed this to the NEAR testnet.`

Hints:

- You can use `near.predecessorAccountId();` to get the account that called a contract
- You can create a vector collection with `new Vector('vector_id');`
- You can transform a vector to an array with `vector.toArray();`

The last test at the bottom deploys your `build/sentence-maker.wasm` contract file and runs the tests below, in the order they are listed, to test the methods on a new contract. You cannot have a `neardev` folder when running the tests for this test to pass:

- Running `near dev-deploy build/sentence-maker.wasm` should deploy the contract
- Running `near view <contract> viewSentence` on the freshly deployed contract should give a `Contract must be initialized` error
- Running `near call <contract> init '{ "word": "A" }' --accountId <contract_account>` should return `Sentence initialized with 'A'`
- Running `near call <contract> addWord '{ "word": "test" }' --accountId <contract_account>` should return `You cannot add two words in a row`
- Running `near call <contract> addWord '{ "word": "te st" }' --accountId <non_contract_account>` should return `You cannot add anything with spaces`
- Running `near call <contract> addWord '{ "word": "test." }' --accountId <non_contract_account>` should return `Your word was added`
- Running `near call <contract> addWord '{ "word": "test." }' --accountId <contract_account>` should return `The sentence is complete, more words cannot be added`
- Running `near view <contract_name> viewSentence` should return `A test.`
- Running `near call <contract_name> viewWords --accountId <non_contract_account>` should give a `Function is private` error 
- Running `near view <contract_name> viewWords --accountId <contract_account>`  should return an array with two objects in the form `{ id, word }` 

### --tests--

You should have `neardev-1` and `neardev-final` folders, each with account info

```js
// test 1
const learnDir = await __helpers.getDirectory(__projectDir);
assert.include(learnDir, 'neardev-1', "You should have a 'neardev-1' folder");
assert.include(learnDir, 'neardev-final' "You should have a `neardev-final` folder");

const neardev1Dir = await __helpers.getDirectory(__neardev1Dir);
const neardevFinalDir = await __helpers.getDirectory(__neardevFinalDir);
assert.include(neardev1Dir, 'dev-account', "Your 'neardev-1' folder needs a 'dev-account' file")
assert.include(neardevFinalDir, 'dev-account', "Your 'neardev-final' folder should have a 'dev-account' file")

const neardev1File = await __helpers.getFile(`${__neardev1Dir}/dev-account`);
const neardevFinalFile = await __helpers.getFile(`${__neardevFinalDir}/dev-account`);
assert.match(nearadev1File, /dev-d+-d+/, "Your 'neardev-1/dev-account' file should have a dev account id");
assert.match(nearadevFinalFile, /dev-d+-d+/, "Your 'neardev-final/dev-account' file should have a dev account id");
```

Your contract should use a `Vector` collection at least once

```js
// test 2
const file = await __helpers.getFile(__contractFile);
assert.match(file, /new\s+Vector\s*\(/);
```

Your contract should use `near.log` at least once

```js
// test 3
const file = await __helpers.getFile(__contractFile);
assert.match(file, /near\s*\.\s*log\s*\(/);
```

Running the `viewSentence` method on the contract account in your `neardev-final` folder should return `I deployed this to the NEAR testnet.`

```js
// test 4
// validate neardev-final folder
const learnDir = await __helpers.getDirectory(__projectDir);
assert.include(learnDir, 'neardev-final', "You need to have a 'neardev-final' folder to run this test.");
const neardevFinalDir = await __helpers.getDirectory(__neardevFinalDir);
assert.include(neardevFinalDir, 'dev-account', "Your 'neardev-final' folder needs a 'dev-account' file with a dev account");

// call contract
const id = await __helpers.getFile(`${__neardevFinalDir}/dev-account`);
const output = await __helpers.getCommandOutput(`NEAR_ENV=testnet near view ${id} viewSentence`, __projectDir);
assert.match(output?.stdout, /'I deployed this to the NEAR testnet.'\s*$/, "Running the 'viewSentence' method on your 'neardev-final' contract should return 'I deployed this to the NEAR testnet.'");
```

Running the `addWord` method, with a valid parameter, on the contract account in your `neardev-final` folder should return `The sentence is complete, more words cannot be added`

```js
// test 5
// validate neardev-final folder
const learnDir = await __helpers.getDirectory(__projectDir);
assert.include(learnDir, 'neardev-final', "You need to have a 'neardev-final' folder to run this test.");
const neardevFinalDir = await __helpers.getDirectory(__neardevFinalDir);
assert.include(neardevFinalDir, 'dev-account', "Your 'neardev-final' folder needs a 'dev-account' file with a dev account");
const id = await __helpers.getFile(`${__neardevFinalDir}/dev-account`);
const output = await __helpers.getCommandOutput(`NEAR_ENV=testnet near call ${id} addWord '{ "word": "test" }' --accountId ${id}`, __projectDir);
assert.match(output?.stdout, /'The sentence is complete, more words cannot be added'\s*$/, "Running the 'addWord' method on your 'neardev-final' contract should return 'The sentence is complete, more words cannot be added'");
```

Running the `viewWords` method on the contract account in your `neardev-final` folder with a non-contract account should give a `Function is private` error

```js
// test 6
// validate neardev folders
const learnDir = await __helpers.getDirectory(__projectDir);
assert.include(learnDir, 'neardev-final', "You need to have a 'neardev-final' folder to run this test.");
const neardevFinalDir = await __helpers.getDirectory(__neardevFinalDir);
assert.include(neardevFinalDir, 'dev-account', "Your 'neardev-final' folder needs a 'dev-account' file with a dev account to run this test");
assert.include(learnDir, 'neardev-1', "You need to have a 'neardev-1' folder to run this test.");
const neardev1Dir = await __helpers.getDirectory(__neardev1Dir);
assert.include(neardev1Dir, 'dev-account', "Your 'neardev-1' folder needs a 'dev-account' file with a dev account to run this test");

// call contract
const contractId = await __helpers.getFile(`${__neardevFinalDir}/dev-account`);
const otherId = await __helpers.getFile(`${__neardev1Dir}/dev-account`);
const output = await __helpers.getCommandOutput(`NEAR_ENV=testnet near call ${contractId} viewWords --accountId ${otherId}`, __projectDir);
assert.include(output?.stderr, 'Function is private', "Running the 'viewWords' method on your 'neardev-final' contract with a non-contract account should produce a 'Function is private' message");
```

Running the `viewWords` method on the contract account in your `neardev-final` folder with a contract account should return an array with 7 objects in the form of `{ id, word }`

```js
// test 7
// validate neardev-final folder
const learnDir = await __helpers.getDirectory(__projectDir);
assert.include(learnDir, 'neardev-final', "You need to have a 'neardev-final' folder to run this test.");
const neardevFinalDir = await __helpers.getDirectory(__neardevFinalDir);
assert.include(neardevFinalDir, 'dev-account', "Your 'neardev-final' folder needs a 'dev-account' file with a dev account");

// call contract
const id = await __helpers.getFile(`${__neardevFinalDir}/dev-account`);
const { stdout } = await __helpers.getCommandOutput(`NEAR_ENV=testnet near call ${id} viewWords --accountId ${id}`, __projectDir);
const i = stdout?.indexOf('[');
const sub = stdout.substring(i, stdout.length).replaceAll("'", '"').replaceAll('id', '"id"').replaceAll('word', '"word"');
const json = JSON.parse(sub);
assert.isArray(json, "Running the 'viewWords' method on your `nead-final` contract, with the contract account, should return an array");
json.forEach(obj => {
  assert.property(obj, 'id', "Running the 'viewWords' method on your `nead-final` contract, with the contract account, should return an array of objects, each with an 'id' property");
  assert.property(obj, 'word', "Running the 'viewWords' method on your `nead-final` contract, with the contract account, should return an array of objects, each with a 'word' property");
})
```

You should be able to deploy the `build/sentence-maker.wasm` contract file, and pass all the tests listed at the bottom of the instructions

```js
// test 8
// validate neardev and neardev-1 folders
const learnDir = await __helpers.getDirectory(__projectDir);
assert.notInclude(learnDir, 'neardev', "You cannot have a 'neardev' folder when running the tests for this test to pass. Rename or delete it.");
assert.include(learnDir, 'neardev-1', "You need to have a 'neardev-1' folder to run these tests");

// validate neardev-1 file
const neardev1Dir = await __helpers.getDirectory(__neardev1Dir);
assert.include(neardev1Dir, 'dev-account', "Your 'neardev-1' folder needs a 'dev-account' file with a dev account")

// validate build/sentence-maker.wasm file
const buildDir = await __helpers.getDirectory(`${__projectDir}/build`);
assert.include(buildDir, 'sentence-maker.wasm', "'build/sentence-maker.wasm' file not found. Build your contract to run these tests");

// add .near-config so the test isn't prompted (doesn't hang) when deploying the contract if it's not set
const configDir = await __helpers.getDirectory('../../root');
if (!configDir.includes('.near-config')) {
  await __helpers.makeDirectory('../../root/.near-config');
  await __helpers.writeJsonFile('../../root/.near-config/settings.json', {
    "trackingEnabled": false,
    "trackingAccountID": false
  });
}

// Running `near dev-deploy build/sentence-maker.wasm` should deploy the contract
const deployOut = await __helpers.getCommandOutput(`NEAR_ENV=testnet near dev-deploy build/sentence-maker.wasm`, __projectDir);
assert.include(deployOut?.stdout, 'Done deploying', "Something went wrong trying to deploy the test contract")

// get the two accounts used to call the contract
const contractId = await __helpers.getFile(`${__neardevDir}/dev-account`);
const otherId = await __helpers.getFile(`${neardev1Dir}/dev-account`);

// Running `near view <contract> viewSentence` on the freshly deployed contract should give a `Contract must be initialized` error
const uninitOut = await __helpers.getCommandOutput(`NEAR_ENV=testnet near view ${contractId} viewSentence`, __projectDir);
assert.include(uninitOut?.stderr, 'Contract must be initialized', "Running the 'viewSentence' method on the uninitilialized contract should give a 'Contract must be initialized' error");

// Running `near call <contract> init '{ "word": "A" }' --accountId <contract_account>` should return `Sentence initialized with 'A'`
const initOut = await __helpers.getCommandOutput(`NEAR_ENV=testnet near call ${contractId} init '{ "word": "A" }' --accountId ${contractId}`, __projectDir);
assert.match(initOut?.stdout, /"Sentence initialized with 'A'"\s*$/, `Running the 'addWord' method with a '{ "word": "A" }' argument should return "Sentence initialized with 'A'"`);

// Running `near call <contract> addWord '{ "word": "test" }' --accountId <contract_account>` should return `You cannot add two words in a row`
const noTwoWordsOut = await __helpers.getCommandOutput(`NEAR_ENV=testnet near call ${contractId} addWord '{ "word": "test" }' --accountId ${contractId}`, __projectDir);
assert.match(noTwoWordsOut?.stdout, /'You cannot add two words in a row'\s*$/, `Running the 'addWord' method with a '{ "word": "test" }' argument should return 'You cannot add two words in a row'`);

// Running `near call <contract> addWord '{ "word": "te st" }' --accountId <non_contract_account>` should return `You cannot add anything with spaces`
const noSpacesOut = await __helpers.getCommandOutput(`NEAR_ENV=testnet near call ${contractId} addWord '{ "word": "te st" }' --accountId ${contractId}`, __projectDir);
assert.match(noSpacesOut?.stdout, /'You cannot add anything with spaces'\s*$/, `Running the 'addWord' method with a '{ "word": "te st" }' argument should return "You cannot add anything with spaces"`);

// Running `near call <contract> addWord '{ "word": "test." }' --accountId <non_contract_account>` should return `Your word was added`
const addWordOut = await __helpers.getCommandOutput(`NEAR_ENV=testnet near call ${contractId} addWord '{ "word": "test." }' --accountId ${otherId}`, __projectDir);
assert.match(addWordOut?.stdout, /'Your word was added'\s*$/, `Running the 'addWord' method with a '{ "word": "test." }' argument should return 'Your word was added'`);

// Running `near call <contract> addWord '{ "word": "test." }' --accountId <contract_account>` should return `The sentence is complete, more words cannot be added`
const completedOut = await __helpers.getCommandOutput(`NEAR_ENV=testnet near call ${contractId} addWord '{ "word": "test." }' --accountId ${contractId}`, __projectDir);
assert.match(completedOut?.stdout, /'The sentence is complete, more words cannot be added'\s*$/, `Running the 'addWord' method with a '{ "word": "test." }' argument should return 'The sentence is complete, more words cannot be added'`);

// Running `near view <contract_name> viewSentence` should return `A test.`
const viewOut = await __helpers.getCommandOutput(`NEAR_ENV=testnet near view ${contractId} viewSentence`, __projectDir);
assert.match(viewOut?.stdout, /'A test.'\s*$/, `Running the 'viewSentence' method should return 'A test.'`);

// Running `near call <contract_name> viewWords --accountId <non_contract_account>` should give a `Function is private error`
const cantViewWordsOut = await __helpers.getCommandOutput(`NEAR_ENV=testnet near call ${contractId} viewWords --accountId ${otherId}`, __projectDir);
assert.include(cantViewWordsOut?.stderr, 'Function is private', `Running the 'viewWords' method with a non-contract account should give a 'Function is private' error`);

// Running `near view <contract_name> viewWords --accountId <contract_account>`  should return an array with two objects in the form `{ id, word }` 
const { stdout } = await __helpers.getCommandOutput(`NEAR_ENV=testnet near call ${contractId} viewWords --accountId ${contractId}`, __projectDir);
const i = stdout?.indexOf('[');
const sub = stdout.substring(i, stdout.length).replaceAll("'", '"').replaceAll('id', '"id"').replaceAll('word', '"word"');
const json = JSON.parse(sub);
assert.isArray(json, "Running the 'viewWords' method should return an array");
json.forEach(obj => {
  assert.property(obj, 'id', "Running the 'viewWords' method should return an array of objects, each with an 'id' property");
  assert.property(obj, 'word', "Running the 'viewWords' method should return an array of objects, each with a 'word' property");
})
```

### --before-all--

```js
global.__projectDir = `./build-a-sentence-making-smart-contract`;
global.__neardevDir = `${__projectDir}/neardev`;
global.__neardev1Dir = `${__projectDir}/neardev-1`;
global.__neardevFinalDir = `${__projectDir}/neardev-final`;
global.__contractFile = `${__projectDir}/src/sentence-maker.js`
```

### --after-all--

```js
delete global.__projectDir;
delete global.__neardevDir;
delete global.__neardev1Dir;
delete global.__neardevFinalDir;
```

## --fcc-end--
