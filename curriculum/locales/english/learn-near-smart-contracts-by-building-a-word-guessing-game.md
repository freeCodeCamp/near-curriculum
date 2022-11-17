# NEAR - Learn NEAR Smart Contracts by Building a Word Guessing Game

## 1

### --description--

Welcome to the second NEAR project! For the duration of this project, you will be working in the `learn-near-smart-contracts-by-building-a-word-guessing-game/` directory. Start by changing into that directory in the terminal.

If the tests don't run automatically, trash the bash terminal and open a new bash terminal.

### --tests--

You should use the change directory command (`cd`) in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /^\s*cd/);
```

You should be in the `learn-near-smart-contracts-by-building-a-word-guessing-game` directory in your terminal

```js
await new Promise(res => setTimeout(res, 1000));
const cwdFile = await __helpers.getCWD();
const cwd = cwdFile?.split('\n').filter(Boolean).pop();
assert.include(cwd, 'learn-near-smart-contracts-by-building-a-word-guessing-game');
```

## 2

### --description--

For this project, you will be making a word guessing game with NEAR smart contract. Open your `package.json` file. There's a few dependencies in there you will need. Mainly, the `near-sdk-js` package. Run `npm install` to install them.

### --tests--

You should run `npm install` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand?.trim(), /^npm\s+(i|install)$/);
```

You should have a `node_modules/near-sdk-js` folder as a result of installing the dependencies

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-smart-contracts-by-building-a-word-guessing-game/node_modules');
assert.include(dir, 'near-sdk-js');
```

You should have a `node_modules/ts-morph` folder as a result of installing the dependencies

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-near-smart-contracts-by-building-a-word-guessing-game/node_modules');
assert.include(dir, 'ts-morph');
```

## 3

### --description--

You will be using all JavaScript for your contract. It will be in the `src/word-guess.js` file. Open it and export a `WordGuess` class.

### --tests--

You should have `export class WordGuess { }` as the only thing in your `word-guess.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
assert.match(fileContents, /^\s*export\s+class\s+WordGuess\s*{\s*}\s*;?\s*$/);
```

## 4

### --description--

A smart contract class needs a decorator. At the top of the file, import the `NearBindgen` decorator from the `near-sdk-js` module.

### --tests--

You should have `import { NearBindgen } from 'near-sdk-js';` at the top of your file

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const imports = babelised?.getImportDeclarations().find(i => i.source?.value === 'near-sdk-js');
const method = imports?.specifiers?.find(s => s.local?.name === 'NearBindgen');
assert.exists(method);
```

## 5

### --description--

Above your class declaration, add the `@NearBindgen({})` decorator so the class can be transformed into code the NEAR blockchain can understand.

### --tests--

You should have `@NearBindgen({})` above your class declaration

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const wordGuess = babelised?.getType('ClassDeclaration').find(c => c.id?.name === 'WordGuess');
const exp = wordGuess?.decorators[0]?.expression;
assert.equal(exp?.callee?.name, 'NearBindgen', "You should have a '@NearBindgen()' decorator");
assert.lengthOf(exp?.arguments, 1, "The 'NearBindgen' expression should have one argument");
assert.equal(exp?.arguments[0]?.type, 'ObjectExpression', "The 'NearBindgen' expression argument should be an object");
assert.lengthOf(exp?.arguments[0]?.properties, 0, "The 'NearBindgen' object argument should not have an properties");
```

## 6

### --description--

Add an empty constructor function to your class.

### --tests--

You should have `constructor() { }` at the top of your class

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
assert.match(fileContents, /WordGuess\s*{\s*constructor\s*\(\s*\)\s*{\s*}\s*;?\s*}\s*;?\s*$/);
```

## 7

### --description--

Your contract will have a single secret word that people will try to guess. Add a `secretWord` variable in the constructor. You need to assign it a value so it can correctly be deserialized to its intended type, so make it an empty string for now.

### --tests--

You should have `this.secretWord = '';` in your constructor function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const construct = babelised?.getType('ClassMethod').find(c => c.kind === 'constructor');
const recreatedCode = babelised?.generateCode(construct);
assert.match(recreatedCode, /{\s*this\.secretWord\s*=\s*('|"|`)\1;\s*}/);
```

## 8

### --description--

Below the constructor function, add an empty `init` function. Destruct a `secretWord` variable in the parameter. This will be so you can set the secret word after you deploy the contract.

### --tests--

You should have `init({ secretWord }) { }` below your contructor function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const init = babelised?.getType('ClassMethod').find(c => c.key?.name === 'init' && c.key?.scope?.includes('WordGuess'));
assert.exists(init, "You should have an 'init' function");
assert.lengthOf(init?.params, 1, "Your 'init' function should accept one parameter");
assert.equal(init?.params[0]?.type, 'ObjectPattern', "Your 'init' parameter should be an object");
assert.lengthOf(init?.params[0]?.properties, 1, 'Your object parameter should destruct one variable')
assert.equal(init?.params[0]?.properties[0]?.value?.name, 'secretWord', "You should only destruct 'secretWord' from the object parameter");
assert.lengthOf(init?.body?.body, 0, "Your 'init' function should be empty");
```

## 9

### --description--

At the top of the file, import the `initialize` decorator next to the other one.

### --tests--

You should import `initialize` from the `near-sdk-js` module

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const imports = babelised?.getImportDeclarations().find(i => i.source?.value === 'near-sdk-js');
const method = imports?.specifiers?.find(s => s.local?.name === 'initialize');
assert.exists(method);
```

## 10

### --description--

Above your `init` function, add the `initialize` decorator. Once this method is invoked, your contract will be considered initialized.

### --tests--

You should have `@initialize({})` above your `init` function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const init = babelised?.getType('ClassMethod').find(c => c.key?.name === 'init' && c.key?.scope?.includes('WordGuess'));
const exp = init?.decorators[0]?.expression;
assert.equal(exp?.callee?.name, 'initialize', "You should have a '@initialize()' decorator");
assert.lengthOf(exp?.arguments, 1, "The 'initialize' expression should have one argument");
assert.equal(exp?.arguments[0]?.type, 'ObjectExpression', "The 'initialize' expression argument should be an object");
assert.lengthOf(exp?.arguments[0]?.properties, 0, "The 'initialize' object argument should not have any properties");
```

## 11

### --description--

In the `init` function, set your contracts `secretWord` to the `secretWord` passed to the function.

### --tests--

You should have `this.secretWord = secretWord;` in your `init` function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const init = babelised?.getType('ClassMethod').find(c => c.key?.name === 'init' && c.key?.scope?.includes('WordGuess'));
const initCode = babelised?.generateCode(init);
assert.match(initCode, /\)\s*{\s*this\.secretWord\s*=\s*secretWord;\s*}/);
```

## 12

### --description--

Below that, use a template literal to return the string `The secret word has been set to '<secretWord>';`

### --tests--

You should have ``return `The secret word has been set to '${secretWord}'`;`` at the bottom of your `init` function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const init = babelised?.getType('ClassMethod').find(c => c.key?.name === 'init' && c.key?.scope?.includes('WordGuess'));
const initCode = babelised?.generateCode(init);
assert.match(initCode, /return\s*`The secret word has been set to '\${secretWord}'`;\s*}/);
```

## 13

### --description--

Decorators have options to define characteristics of methods and classes. Where you added your `NearBindgen` class decorator, add a `requireInit: true` in the empty object as an option so your contract requires initialization.

### --tests--

You should have `@NearBindgen({ requireInit: true })` as your class decorator

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const wordGuess = babelised?.getType('ClassDeclaration').find(c => c.id?.name === 'WordGuess');
const classCode = babelised?.generateCode(wordGuess);
assert.match(classCode, /^@NearBindgen\({\s*requireInit:\s*true\s*}\)/);
```

## 14

### --description--

Now your contract will need to be initialized with a secret word. Next, you will want to add a way to view the secret word. In your imports, add the `view` decorator so you can create a method for reading your contracts state.

### --tests--

You should import `view` from the `near-sdk-js` module

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const imports = babelised?.getImportDeclarations().find(i => i.source?.value === 'near-sdk-js');
const method = imports?.specifiers?.find(s => s.local?.name === 'view');
assert.exists(method);
```

## 15

### --description--

Below your `init` function, add an empty `viewSecretWord` function. Give it the view decorator with an empty object as its options.
add @view + viewSecretWord({}) {}

### --tests--

You should have a `viewSecretWord() { }` function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const viewSecret = babelised?.getType('ClassMethod').find(c => c.key?.name === 'viewSecretWord' && c.key?.scope?.includes('WordGuess'));
assert.exists(viewSecret, "You should have an 'viewSecretWord' function");
assert.lengthOf(viewSecret?.body?.body, 0, "Your 'viewSecretWord' function should be empty");
```

You should have a `@view({})` decorator above the function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const viewSecret = babelised?.getType('ClassMethod').find(c => c.key?.name === 'viewSecretWord' && c.key?.scope?.includes('WordGuess'));
const exp = viewSecret?.decorators[0]?.expression;
assert.equal(exp?.callee?.name, 'view', "You should have a '@view()' decorator");
assert.lengthOf(exp?.arguments, 1, "The 'view' decorator should have one argument");
assert.equal(exp?.arguments[0]?.type, 'ObjectExpression', "The 'view' decorator argument should be an object");
assert.lengthOf(exp?.arguments[0]?.properties, 0, "The 'view' object argument should not have an properties");
```

## 16

### --description--

In your function, return the secret word.

### --tests--

You should have `return this.secretWord;` in your `viewSecretWord` function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const secretFn = babelised?.getType('ClassMethod').find(c => c.key?.name === 'viewSecretWord' && c.key?.scope?.includes('WordGuess'));
const secretCode = babelised?.generateCode(secretFn);
assert.match(secretCode, /{\s*return\s+this\.secretWord;\s*}\s*$/);
```

## 17

### --description--

The `package.json` file has a script to build the contract. Open it up to see what it is, and what it does. Then, run the command in the terminal to build it.

### --tests--

You should run `npm run build:word-guess` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand?.trim(), /^npm\s+run\s+build:word-guess$/);
```

You should have a `build/word-guess.wasm` file as a result of building the contract

```js
await new Promise(res => setTimeout(res, 1000));
const fileExists = await __helpers.fileExists('learn-near-smart-contracts-by-building-a-word-guessing-game/build/word-guess.wasm');
assert.isTrue(fileExists);
```

## 18

### --description--

Your contract was created in the `build/word-guess.wasm` file. Check the version of the NEAR CLI tools quick to make sure they're installed.

### --tests--

You should run `near --version` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand?.trim(), /^near\s+--version$/);
```

The terminal should print a version

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('near --version');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /\d+\.\d+\.\d+/);
```

## 19

### --description--

You have them. View the help menu for the CLI tools to remind yourself how you can deploy your contract.

### --tests--

You should run `near --help` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand?.trim(), /^near\s+--help$/);
```

## 20

### --description--

Use the `dev-deploy` command to deploy your contract.

### --tests--

You should run `near dev-deploy build/word-guess.wasm` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /near\s+dev-deploy\s+build\/word-guess\.wasm/);
```

You should have a `neardev` folder as a result of deploying the contract

```js
await new Promise(res => setTimeout(res, 1000));
const learnDir = await __helpers.getDirectory('learn-near-smart-contracts-by-building-a-word-guessing-game')
assert.include(learnDir, 'neardev');
```

## 21

### --description--

Your contract is deployed to the NEAR testnet. A `neardev` folder was created for some accounts. The contract name is in the `neardev/dev-account.env` file. Use the `view` command to run the contract's `viewSecretWord` function. Here's the syntax: `near view <contract_id> <function_to_run>`.

### --tests--

You should run `near view <contract_name> viewSecretWord`, where `<contract_name>` is the name from the `neardev/dev-account.env` file

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewSecretWord\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should include "Contract must be initialized" in its output

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const output = await __helpers.getTerminalOutput();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewSecretWord\\s*$`, 'g');
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(re);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /Contract must be initialized/);
```

## 22

### --description--

The contract panicked and cannot run the function because you required it to be initialized. Use the `near call` command to run the `init` function. The syntax looks like this: `near call <contract_name> <function> <arguments> --accountId <account_id>`. The account ID can be found in the `neardev/dev-account` file. Note that the contract name and account ID are the same. For the arguments, use `'{ "secretWord": "test" }'` to set the secret word.

You can only initialize the contract once, so try not to set the wrong word. If you do, delete your `neardev` folder, redeploy the contract with `near dev-deploy build/word-guess.wasm`, and initilize it again.

### --tests--

You should run `near call <contract_name> init '{ "secretWord": "test" }' --accountId <account_id>`, where `<contract_name>` and `<account_id>` match what's in your `neardev` folder.

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+call\\s+${id}\\s+init\\s+`, 'g');
assert.match(lastCommand, re);
```

The terminal should print `The secret word has been set to 'test'`

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('Doing account.functionCall()');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /"The secret word has been set to 'test'"\s*$/);
```

## 23

### --description--

Run the `viewSecretWord` function again.

### --tests--

You should run `near view <contract_name> viewSecretWord`, where `<contract_name>` is the name from the `neardev/dev-account.env` file

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewSecretWord\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print `'test'`

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const output = await __helpers.getTerminalOutput();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewSecretWord\\s*$`, 'g');
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(re);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /'test'\s*$/);
```

## 24

### --description--

Now it works. There's two more things you need to add to your game, a way to add hints to help guess the secret word, and a way for people to make guesses. In your class constructor, add a `hints` variable set to an empty array.

### --tests--

You should have `this.hints = [];` at the bottom of your constructor function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const construct = babelised?.getType('ClassMethod').find(c => c.kind === 'constructor');
const recreatedCode = babelised?.generateCode(construct);
assert.match(recreatedCode, /this\.hints\s*=\s*\[\s*\];\s*}/);
```

## 25

### --description--

Next, you will create a function to add hints. At the top of the file, import the `call` decorator with the rest of the imports.

### --tests--

You should import `call` from the `near-sdk-js` module

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const imports = babelised?.getImportDeclarations().find(i => i.source?.value === 'near-sdk-js');
const method = imports?.specifiers?.find(s => s.local?.name === 'call');
assert.exists(method);
```

## 26

### --description--

Below your `viewSecretWord` function, create an empty `addHint` function that destructs `hint` from an object parameter. Also, add the call decorator with no options above the function since this will change the contract state.

### --tests--

You should have an `addHint({ hint }) { }` function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const addHint = babelised?.getType('ClassMethod').find(c => c.key?.name === 'addHint' && c.key?.scope?.includes('WordGuess'));
assert.exists(addHint, "You should have an 'addHint' function");
assert.lengthOf(addHint?.params, 1, "Your 'addHint' function should accept one parameter");
assert.equal(addHint?.params[0]?.type, 'ObjectPattern', "Your 'addHint' parameter should be an object");
assert.lengthOf(addHint?.params[0]?.properties, 1, 'Your object parameter should destruct one variable')
assert.equal(addHint?.params[0]?.properties[0]?.value?.name, 'hint', "You should only destruct 'hint' from the object parameter");
assert.lengthOf(addHin?.body?.body, 0, "Your 'addHint' function should be empty");
```

You should have a `@call({})` decorator above the function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const addHint = babelised?.getType('ClassMethod').find(c => c.key?.name === 'addHint' && c.key?.scope?.includes('WordGuess'));
const exp = addHint?.decorators[0]?.expression;
assert.equal(exp?.callee?.name, 'call', "You should have a '@call()' decorator");
assert.lengthOf(exp?.arguments, 1, "The 'call' decorator should have one argument");
assert.equal(exp?.arguments[0]?.type, 'ObjectExpression', "The 'call' decorator argument should be an object");
assert.lengthOf(exp?.arguments[0]?.properties, 0, "The 'call' object argument should not have any properties");
```

## 27

### --description--

In the function, push the passed in `hint` argument to the contract's `hints` variable.

### --tests--

You should have `this.hints.push(hint);` in your `addHint` function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const addHint = babelised?.getType('ClassMethod').find(c => c.key?.name === 'addHint' && c.key?.scope?.includes('WordGuess'));
const recreatedCode = babelised?.generateCode(addHint);
assert.match(recreatedCode, /{\s*this\.hints\.push\(hint\);\s*}\s*$/);
```

## 28

### --description--

Below that, return the string `Your hint was added`.

### --tests--

You should have `return 'Your hint was added';` at the bottom of your `addHint` function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const addHint = babelised?.getType('ClassMethod').find(c => c.key?.name === 'addHint' && c.key?.scope?.includes('WordGuess'));
const recreatedCode = babelised?.generateCode(addHint);
assert.match(recreatedCode, /return\s+('|"|`)Your hint was added\1;\s*}\s*$/);
```

## 29

### --description--

If you are attempting to make a guess, you will want to know what the hints are. Add an empty `viewHints` function. It won't change the contract state so add the appropriate decorate, as well.

add @view + viewHints() {}

### --tests--

You should have a `viewHints() { }` function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const viewHints = babelised?.getType('ClassMethod').find(c => c.key?.name === 'viewHints' && c.key?.scope?.includes('WordGuess'));
assert.exists(viewHints, "You should have an 'viewHints' function");
assert.lengthOf(viewHints?.body?.body, 0, "Your 'viewHints' function should be empty");
```

You should have a `@view({})` decorator above the function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const viewHints = babelised?.getType('ClassMethod').find(c => c.key?.name === 'viewHints' && c.key?.scope?.includes('WordGuess'));
const exp = viewHints?.decorators[0]?.expression;
assert.equal(exp?.callee?.name, 'view', "You should have a '@view()' decorator");
assert.lengthOf(exp?.arguments, 1, "The 'view' decorator should have one argument");
assert.equal(exp?.arguments[0]?.type, 'ObjectExpression', "The 'view' decorator argument should be an object");
assert.lengthOf(exp?.arguments[0]?.properties, 0, "The 'view' object argument should not have an properties");
```

## 30

### --description--

In the function, return the `hints` array.

### --tests--

You should have `return this.hints;` in the `viewHints` function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const viewHints = babelised?.getType('ClassMethod').find(c => c.key?.name === 'viewHints' && c.key?.scope?.includes('WordGuess'));
const recreatedCode = babelised?.generateCode(viewHints);
assert.match(recreatedCode, /{\s*return\s+this\.hints;\s*}\s*$/);
```

## 31

### --description--

Run the command to re-build your contract.

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
const fileExists = await __helpers.fileExists('learn-near-smart-contracts-by-building-a-word-guessing-game/build/word-guess.wasm');
assert.isTrue(fileExists);
```

Your `build/methods.h` file should have a `viewHints` method as a result of building your contract

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/build/methods.h');
assert.match(code, /viewHints/);
```

## 32

### --description--

Use the `dev-deploy` command to deploy your contract again. Here's a reminder of the syntax: `near dev-deploy <path_to_wasm_file>`.

### --tests--

You should run `near dev-deploy build/word-guess.wasm` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /near\s+dev-deploy\s+build\/word-guess\.wasm/);
```

You should have a `neardev` folder as a result of deploying the contract

```js
await new Promise(res => setTimeout(res, 1000));
const learnDir = await __helpers.getDirectory('learn-near-smart-contracts-by-building-a-word-guessing-game')
assert.include(learnDir, 'neardev');
```

The terminal output should include `Done deploying to <contract_name>`, where the contract name matches what's in the `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('near dev-deploy build/word-guess.wasm');
const lastOutput = splitOutput[splitOutput.length - 1];
const re = new RegExp(`Done deploying to ${id}\\s*$`);
assert.match(lastOutput, re);
```

## 33

### --description--

Run the `viewSecretWord` function on your contract to see if you need to initialize your contract again.

### --tests--

You should run `near view <contract_name> viewSecretWord`, where `<contract_name>` is the name from the `neardev/dev-account.env` file

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewSecretWord\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print `'test'`

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const output = await __helpers.getTerminalOutput();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewSecretWord\\s*$`, 'g');
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(re);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /'test'\s*$/);
```

## 34

### --description--

The contract is still initialized and has the secret word from earlier, even though you re-deployed it. NEAR contracts can have their logic updated while retaining their state. So if you re-deploy a contract, the stored data will remain, but the logic will get updated. Call the `addHint` function with `'{ hint: 'test hint' }'` as the argument to add a hint. Don't forget to include the account ID with the command.

### --tests--

You should run `near call <contract_name> addHint`

```js
assert(false);
```

## 35

### --description--

The state of the contract you deployed the first time didn't include a `hints` array. So when the logic of the contract got updated to include your new `addHint` function, the state stayed the same and there was nowhere to store the data. Call the `init` on the contract again with `{ "secretWord": "test" }` as the argument again.

### --tests--

test text

```js
assert(false);
```

## 36

### --description--

mv neardev-1

### --tests--

test text

```js
assert(false);
```

## 37

### --description--

near dev-deploy .wasm - it created a new neardev

### --tests--

test text

```js
assert(false);
```

## 38

### --description--

near viewSecretWord - not initialized

### --tests--

test text

```js
assert(false);
```

## 39

### --description--

near call init '{ "secretWord": "freeCodeCamp" }' - use neardev-1

### --tests--

test text

```js
assert(false);
```

## 40

### --description--

near viewSecretWord

### --tests--

test text

```js
assert(false);
```

## 41

### --description--

near viewHints

### --tests--

test text

```js
assert(false);
```

## 42

### --description--

near call addHint {"hint":"best coding site"}

### --tests--

test text

```js
assert(false);
```

## 43

### --description--

near viewHints - shows best coding site

### --tests--

test text

```js
assert(false);
```

## 44

### --description--

near call addHint {"hint":"it's free"} with neardev-1

### --tests--

test text

```js
assert(false);
```

## 45

### --description--

near viewHints

### --tests--

test text

```js
assert(false);
```

## 46

### --description--

add { privateFunction: true } to addHint

### --tests--

test text

```js
assert(false);
```

## 47

### --description--

npm run build:word-guess

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
const fileExists = await __helpers.fileExists('learn-near-smart-contracts-by-building-a-word-guessing-game/build/word-guess.wasm');
assert.isTrue(fileExists);
```

## 48

### --description--

near dev-deploy .wasm

### --tests--

test text

```js
assert(false);
```

## 49

### --description--

near view hints - they're still there

### --tests--

test text

```js
assert(false);
```

## 50

### --description--

near call addHint {"hint":"it has 12 letters"} with neardev-1 - panicked

### --tests--

test text

```js
assert(false);
```

## 51

### --description--

near call addHintnear call addHint {"hint":"it has 12 letters"} with neardev - it works

### --tests--

test text

```js
assert(false);
```

## 52

### --description--

near viewHints

### --tests--

test text

```js
assert(false);
```

## 53

### --description--

add { privateFunction: true } to init

### --tests--

test text

```js
assert(false);
```

## 54

### --description--

add { privateFunction: true } to viewSecretWord

### --tests--

test text

```js
assert(false);
```

## 55

### --description--

add this.guesses = []

### --tests--

test text

```js
assert(false);
```

## 56

### --description--

add @view({}) + viewGuesses

### --tests--

test text

```js
assert(false);
```

## 57

### --description--

add return this.guesses

### --tests--

test text

```js
assert(false);
```

## 58

### --description--

add @call({}) + makeGuess({ guess })

### --tests--

test text

```js
assert(false);
```

## 59

### --description--

add const lastGuess

### --tests--

test text

```js
assert(false);
```

## 60

### --description--

add if (lastGuess === this.secretWord) {}

### --tests--

test text

```js
assert(false);
```

## 61

### --description--

add return `This game is finished. The secret word was '${this.secretWord}'`;

### --tests--

test text

```js
assert(false);
```

## 62

### --description--

add else {}

### --tests--

test text

```js
assert(false);
```

## 63

### --description--

add this.guesses.push(guess)

### --tests--

test text

```js
assert(false);
```

## 64

### --description--

add if(guess === secretWord) {}

### --tests--

test text

```js
assert(false);
```

## 65

### --description--

add return `You got it! The secret word was '${this.secretWord}'`;

### --tests--

test text

```js
assert(false);
```

## 66

### --description--

add else {}

### --tests--

test text

```js
assert(false);
```

## 67

### --description--

add return `Sorry, '${guess}' is not the secret word`;

### --tests--

test text

```js
assert(false);
```

## 68

### --description--

npm run build:word-guess

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
const fileExists = await __helpers.fileExists('learn-near-smart-contracts-by-building-a-word-guessing-game/build/word-guess.wasm');
assert.isTrue(fileExists);
```

## 69

### --description--

mv neardev -> neardev-2 - because you added a new state...

### --tests--

test text

```js
assert(false);
```

## 70

### --description--

near dev-deploy .wasm

### --tests--

test text

```js
assert(false);
```

## 71

### --description--

near call init '{  }' with neardev-2 - doesn't work

### --tests--

test text

```js
assert(false);
```

## 72

### --description--

near call init '{}' with neardev - works

### --tests--

test text

```js
assert(false);
```

## 73

### --description--

near view viewSecretWord with neardev-2 - doesn't work

### --tests--

test text

```js
assert(false);
```

## 74

### --description--

near viewSecretWord with neardev

### --tests--

test text

```js
assert(false);
```

## 75

### --description--

near call addHint with neardev

### --tests--

test text

```js
assert(false);
```

## 76

### --description--

near call addGuess 

### --tests--

test text

```js
assert(false);
```

## --fcc-end--
