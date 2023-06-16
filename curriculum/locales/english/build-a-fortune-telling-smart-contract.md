# NEAR - Build a Fortune Telling Smart Contract

## 1

### --description--

For this project, you will be making a smart contract that will tell your fortune. You are started with some boilerplate code and files, you should not need to change any of the boilerplate code.

Start by going into the `build-a-fortune-telling-smart-contract` folder in your terminal and running `npm install` to install the dependencies. Then, create your smart contract in the `src/fortune-teller.js` file. When the contract is done, run `npm build:fortune-teller` to build your contract, and deploy it to a `fortune.<account>.testnet` sub-account of yours.

After you deploy your contract, create a Node client in `get-fortune.js` to interact with it.

You will need to create an `<account>.testnet` file with the name of your main account. The tests will use this to find your account name.

**User Stories:**

1. You should create an `<account>.testnet` file that matches the name of your main account

1. You should have credentials to use that account locally. See the hints below if you forgot how to do that

1. You should create a `fortune.<account>.testnet` account and add the credentials to use it locally

1. You should deploy your contract using your `fortune.<account>.testnet` account

1. Your contract should store an array of answers (strings). They should be generic answers that would apply to yes/no questions, like `yes`, `no`, and `maybe`

1. Your array of answers should have at least six items

1. Your fortune teller contract should have at least three methods; `viewAnswers`, `getFortune`, and `viewQuestions`

1. Your contract should have a `viewAnswers` view method that returns the array of answers (strings) stored on your contract

1. Your contract should have a `getFortune` call method that accepts a `{ question }` argument and returns one of the answers (string) from the answer array stored on your contract

1. The `getFortune` method should store all the questions asked, and the answers given, in an array of objects, whose form is `{ question, answer }`

1. Your contract should have a `viewQuestions` method that returns the array of all the previously asked questions, and answers given to those questions

1. You should deploy and, if needed, initialize your contract

1. You should create a Node client in `get-fortune.js` to interact with your contract

1. Your Node client should connect to the NEAR testnet using your local credentials folder

1. Running your Node client on the command line should accept the method to call on the contract as a command line argument and, optionally, any other arguments that method needs as a second command line argument

1. Running your Node client on the command line should log only the result of calling that method to the console

Hints:

- Add account credentials locally with `near generate-key <account>.testnet --seedPhrase "<seed_phrase>"`
- Generate a new seed phrase for a sub-account with `node generate-seed.js`
- Create a new sub-account with `near create-account <sub_account> --masterAccount <main_account> --publicKey "ed25519:<key>" --initialBalance 50`

Note:

- Many of the tests won't pass until the tests before them are completed and passing

### --tests--

You should have an `<account>.testnet` file with credentials stored locally to use that account

```js
// test 1
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory(__projectDir);
const account = dir.filter(file => file.endsWith('.testnet'));
assert.lengthOf(account, 1, "You should have exactly one '<account.testnet>' file");

const home = await __helpers.homeDir();
const nearDir = await __helpers.getAbsoluteDir(`${home}/.near-credentials/testnet`);
assert.include(nearDir, `${account}.json`, "You should have credentials for your account stored locally");
```

A `fortune.<account>.testnet` account should exist and you should have credentials for it stored locally. The `<account>` name should match your main account name

```js
// test 2
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory(__projectDir);
const account = dir.filter(file => file.endsWith('.testnet'));
assert.lengthOf(account, 1, "You should have exactly one '<account.testnet>' file");

const home = await __helpers.homeDir();
const nearDir = await __helpers.getAbsoluteDir(`${home}/.near-credentials/testnet`);
assert.include(nearDir, `fortune.${account}.json`, "You should have credentials for your account stored locally");

const output = await __helpers.getCommandOutput(`NEAR_ENV=testnet near state fortune.${account}`, __projectDir);
const re = new RegExp(`Account\\s+${account}\\s+is\\s+not\\s+found\\s+in\\s+testnet`, 'g');
assert.notMatch(output?.stdout, re);
```

Running `node fortune-teller.js viewAnswers` should print only the array of string answers, stored on your contract, to the console. There should be at least six strings

```js
// test 3
const output = await __helpers.getCommandOutput(`node get-fortune.js viewAnswers`, __projectDir);
const strJson = output?.stdout.replaceAll(/\n/g, '').replaceAll(/\s+'/g, '"').replaceAll(/',/g, '",').replaceAll(/'\]/g, '"]');
const arr = JSON.parse(strJson);
assert.isArray(arr);
assert.isAtLeast(arr.length, 6, "You should have at least six items in your 'viewAnswers' array");
arr.forEach(item => {
  assert.isString(item, "All items in 'viewAnswers' array should be strings");
});
```

Running `node fortune-teller.js getFortune '{ "question": "Is NEAR awesome?" }'` should print only a string answer from the answers stored on your contract, to the console

```js
// test 4
const output1 = await __helpers.getCommandOutput(`node get-fortune.js viewAnswers`, __projectDir);
const strJson = output1?.stdout.replaceAll(/\n/g, '').replaceAll(/\s+'/g, '"').replaceAll(/',/g, '",').replaceAll(/'\]/g, '"]');
const answersArr = JSON.parse(strJson);
assert.isArray(answersArr);

const random = Math.floor(Math.random() * 100000);
const output2 = await __helpers.getCommandOutput(`node get-fortune.js getFortune '{ "question": "Is NEAR awesome ${random}?" }'`, __projectDir);
const log = output2?.stdout?.match(/\n.*\s*$/g);
const answer = output2?.stdout?.replaceAll(/\n/g, '');
assert.include(answersArr, answer);
```

Running `node fortune-teller.js viewQuestions` should print only an array of objects to the console, in the form of `{ question, answer }`, that includes previously asked questions

```js
// test 5
const random = Math.floor(Math.random() * 100000);
const output1 = await __helpers.getCommandOutput(`node get-fortune.js getFortune '{ "question": "Random Question ${random}?" }'`, __projectDir);

const output2 = await __helpers.getCommandOutput(`node get-fortune.js viewQuestions`, __projectDir);

assert.include(output2?.stdout, `Random Question ${random}?`);
assert.include(output2?.stdout, `answer`);
```

### --before-all--

```js
global.__projectDir = `./build-a-fortune-telling-smart-contract`;
```

### --after-all--

```js
delete global.__projectDir;
```

## --fcc-end--
