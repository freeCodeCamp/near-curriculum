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

For this project, you will be making a word guessing game in a NEAR smart contract. Open your `package.json` file. There's a few dependencies in there you will need. Mainly, the `near-sdk-js` package. Run `npm install` to install them.

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

You will be using only JavaScript for this contract. It will be in the `src/word-guess.js` file. Open it and export a `WordGuess` class.

### --tests--

You should have `export class WordGuess { }` as the only thing in your `word-guess.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
assert.match(fileContents, /^\s*export\s+class\s+WordGuess\s*{\s*}\s*;?\s*$/);
```

## 4

### --description--

The smart contract class needs a decorator. At the top of the file, import the `NearBindgen` decorator from the `near-sdk-js` module.

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

### --seed--

#### --"src/word-guess.js"--

```js
export class WordGuess {

}
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
assert.lengthOf(exp?.arguments[0]?.properties, 0, "The 'NearBindgen' object argument should not have any properties");
```

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen } from 'near-sdk-js';

export class WordGuess {

}
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

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen } from 'near-sdk-js';

@NearBindgen({})
export class WordGuess {

}
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

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen } from 'near-sdk-js';

@NearBindgen({})
export class WordGuess {
  constructor() {

  }
}
```

## 8

### --description--

Below the constructor function, add an empty `init` function. Destruct a `secretWord` variable from an object in the parameter. This will be so you can set the secret word to whatever you want after you deploy the contract.

### --tests--

You should have `init({ secretWord }) { }` below your constructor function

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

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen } from 'near-sdk-js';

@NearBindgen({})
export class WordGuess {
  constructor() {
    this.secretWord = '';
  }
}
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

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen } from 'near-sdk-js';

@NearBindgen({})
export class WordGuess {
  constructor() {
    this.secretWord = '';
  }

  init({ secretWord }) {

  }
}
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

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize } from 'near-sdk-js';

@NearBindgen({})
export class WordGuess {
  constructor() {
    this.secretWord = '';
  }

  init({ secretWord }) {

  }
}
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

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize } from 'near-sdk-js';

@NearBindgen({})
export class WordGuess {
  constructor() {
    this.secretWord = '';
  }

  @initialize({})
  init({ secretWord }) {

  }
}
```

## 12

### --description--

Below that, use a template literal to return the string `The secret word has been set to '<secret_word>';`

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

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize } from 'near-sdk-js';

@NearBindgen({})
export class WordGuess {
  constructor() {
    this.secretWord = '';
  }

  @initialize({})
  init({ secretWord }) {
    this.secretWord = secretWord;
  }
}
```

## 13

### --description--

Decorators have options to define characteristics of methods and classes. Where you added your `NearBindgen` class decorator, add `requireInit: true` in the empty object as an option so your contract requires initialization.

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

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize } from 'near-sdk-js';

@NearBindgen({})
export class WordGuess {
  constructor() {
    this.secretWord = '';
  }

  @initialize({})
  init({ secretWord }) {
    this.secretWord = secretWord;
    return `The secret word has been set to '${secretWord}'`;
  }
}
```

## 14

### --description--

Now your contract will need to be initialized with a secret word. Next, you will want to add a way to view the secret word. In your imports, add the `view` decorator so you can create a method for reading your contract state.

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

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
  }

  @initialize({})
  init({ secretWord }) {
    this.secretWord = secretWord;
    return `The secret word has been set to '${secretWord}'`;
  }
}
```

## 15

### --description--

Below your `init` function, add an empty `viewSecretWord` function. Give it the view decorator with an empty object for its options.

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
assert.lengthOf(exp?.arguments[0]?.properties, 0, "The 'view' object argument should not have any properties");
```

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
  }

  @initialize({})
  init({ secretWord }) {
    this.secretWord = secretWord;
    return `The secret word has been set to '${secretWord}'`;
  }
}
```

## 16

### --description--

In your function, use a template literal to return `The secret word is '<secret_word>'`.

### --tests--

You should have ``return `The secret word is '${this.secretWord}'`;`` in your `viewSecretWord` function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const secretFn = babelised?.getType('ClassMethod').find(c => c.key?.name === 'viewSecretWord' && c.key?.scope?.includes('WordGuess'));
const secretCode = babelised?.generateCode(secretFn);
assert.match(secretCode, /{\s*return\s+`The secret word is '\${\s*this\s*\.\s*secretWord\s*}'`\s*;?\s*}\s*$/);
```

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
  }

  @initialize({})
  init({ secretWord }) {
    this.secretWord = secretWord;
    return `The secret word has been set to '${secretWord}'`;
  }

  @view({})
  viewSecretWord() {

  }
}
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

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
  }

  @initialize({})
  init({ secretWord }) {
    this.secretWord = secretWord;
    return `The secret word has been set to '${secretWord}'`;
  }

  @view({})
  viewSecretWord() {
    return `The secret word is '${this.secretWord}'`;
  }
}
```

## 18

### --description--

Your contract was created in the `build/word-guess.wasm` file. The NEAR CLI tools should be installed, check the version of them in the terminal to make sure.

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
assert.include(output, 'near --version');
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

Use the `near dev-deploy` command to deploy your contract. Pass it the path to your contract on the command line. Enter `y` or `n` if prompted.

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

Your contract is deployed to the NEAR testnet. A `neardev` folder was created for its account. The contract name is in the `neardev/dev-account.env` file. Use the `view` command to run the contract's `viewSecretWord` function. Here's the syntax: `near view <contract_id> <function_to_run>`.

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

The contract panicked and cannot run the function because it has not been initialized. Use the `near call` command to run the `init` function and set the secret word to `test`. The syntax looks like this: `near call <contract_name> init '{ "secretWord": "test" }' --accountId <account_id>`. The account ID can be found in the `neardev/dev-account` file. Note that the contract name and account ID are the same.

You can only initialize the contract once. If you set the wrong word, delete your `neardev` folder, redeploy the contract with `near dev-deploy build/word-guess.wasm`, and try again.

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

It should say `The secret word has been set to 'test'`. Run the `viewSecretWord` function again.

### --tests--

You should run `near view <contract_name> viewSecretWord`, where `<contract_name>` is the name from the `neardev/dev-account.env` file

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewSecretWord\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print `"The secret word is 'test'"`

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const output = await __helpers.getTerminalOutput();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewSecretWord\\s*$`, 'g');
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(re);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /"The secret word is 'test'"\s*$/);
```

## 24

### --description--

Now, the contract has been initialized and doesn't panic. There's two more things you want to add to your game, a way to add hints to help guess the secret word, and a way for people to make guesses. In your class constructor, add a `hints` variable set to an empty array.

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

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
  }

  @initialize({})
  init({ secretWord }) {
    this.secretWord = secretWord;
    return `The secret word has been set to '${secretWord}'`;
  }

  @view({})
  viewSecretWord() {
    return `The secret word is '${this.secretWord}'`;
  }
}
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
assert.lengthOf(addHint?.body?.body, 0, "Your 'addHint' function should be empty");
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

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
  }

  @initialize({})
  init({ secretWord }) {
    this.secretWord = secretWord;
    return `The secret word has been set to '${secretWord}'`;
  }

  @view({})
  viewSecretWord() {
    return `The secret word is '${this.secretWord}'`;
  }
}
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

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
  }

  @initialize({})
  init({ secretWord }) {
    this.secretWord = secretWord;
    return `The secret word has been set to '${secretWord}'`;
  }

  @view({})
  viewSecretWord() {
    return `The secret word is '${this.secretWord}'`;
  }

  @call({})
  addHint({ hint }) {

  }
}
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

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
  }

  @initialize({})
  init({ secretWord }) {
    this.secretWord = secretWord;
    return `The secret word has been set to '${secretWord}'`;
  }

  @view({})
  viewSecretWord() {
    return `The secret word is '${this.secretWord}'`;
  }

  @call({})
  addHint({ hint }) {
    this.hints.push(hint);
  }
}
```

## 29

### --description--

If you are attempting to make a guess, you will want to know what the hints are. Add an empty `viewHints` function. It won't change the contract state so add the appropriate decorate, as well.

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
assert.lengthOf(exp?.arguments[0]?.properties, 0, "The 'view' object argument should not have any properties");
```

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
  }

  @initialize({})
  init({ secretWord }) {
    this.secretWord = secretWord;
    return `The secret word has been set to '${secretWord}'`;
  }

  @view({})
  viewSecretWord() {
    return `The secret word is '${this.secretWord}'`;
  }

  @call({})
  addHint({ hint }) {
    this.hints.push(hint);
    return 'Your hint was added';
  }
}
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

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
  }

  @initialize({})
  init({ secretWord }) {
    this.secretWord = secretWord;
    return `The secret word has been set to '${secretWord}'`;
  }

  @view({})
  viewSecretWord() {
    return `The secret word is '${this.secretWord}'`;
  }

  @call({})
  addHint({ hint }) {
    this.hints.push(hint);
    return 'Your hint was added';
  }

  @view({})
  viewHints() {

  }
}
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

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
  }

  @initialize({})
  init({ secretWord }) {
    this.secretWord = secretWord;
    return `The secret word has been set to '${secretWord}'`;
  }

  @view({})
  viewSecretWord() {
    return `The secret word is '${this.secretWord}'`;
  }

  @call({})
  addHint({ hint }) {
    this.hints.push(hint);
    return 'Your hint was added';
  }

  @view({})
  viewHints() {
    return this.hints;
  }
}
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

The terminal should print `"The secret word is 'test'"`

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const output = await __helpers.getTerminalOutput();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewSecretWord\\s*$`, 'g');
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(re);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /"The secret word is 'test'"\s*$/);
```

## 34

### --description--

The contract is still initialized and has the secret word from before, even though you re-deployed it. Contracts can have their logic updated while retaining their state. So if you re-deploy a contract, the stored data will remain, but the logic will get updated. Call the `addHint` function with `'{ "hint": "test hint" }'` as the argument to add a hint. Don't forget to include the account ID with the command since you are trying to change the state.

### --tests--

You should run `near call <contract_name> addHint '{ "hint": "test hint" }' --accountID <account_id>`, where `<contract_name>` and `<account_id>` match what's in the `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+call\\s+${id}\\s+addHint\\s+'\\s*{\\s*"hint"\\s*:\\s*"test hint"\\s*}\\s*'\\s+--accountId\\s+${id}`, 'g');
assert.match(lastCommand, re);
```

The terminal should print `Smart contract panicked`

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('Doing account.functionCall()');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /Smart contract panicked/);
```

## 35

### --description--

The command panicked. The state of the contract you deployed the first time didn't include a `hints` array. So the logic of the contract got updated, but it still doesn't include the memory allocation to store the hints. Call the `init` function on the contract again with `{ "secretWord": "test" }` as the argument.

### --tests--

You should run `near call <contract_name> init '{ "secretWord": "test" }' --accountId <account_id>`, where `<contract_name>` and `<account_id>` match what's in your `neardev` folder.

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+call\\s+${id}\\s+init\\s+'\\s*{\\s*"secretWord"\\s*:\\s*"test"\\s*}\\s*'\\s+--accountId\\s+${id}`, 'g');
assert.match(lastCommand, re);
```

The terminal should print `Contract already initialized`

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('Doing account.functionCall()');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /Contract already initialized/);
```

## 36

### --description--

It panicked again. It says the contract is already initialized. You can only initialize a contract once. To create an entirely new contract, you will need to use a different account. Rename your `neardev` folder to `neardev-1`.

### --tests--

You should have a `neardev-1` folder

```js
await new Promise(res => setTimeout(res, 1000));
const learnDir = await __helpers.getDirectory('learn-near-smart-contracts-by-building-a-word-guessing-game')
assert.include(learnDir, 'neardev-1');
```

You should not have a `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const learnDir = await __helpers.getDirectory('learn-near-smart-contracts-by-building-a-word-guessing-game')
assert.notInclude(learnDir, 'neardev');
```

Your `neardev-1` folder should have a `dev-account` file

```js
await new Promise(res => setTimeout(res, 1000));
const learnDir = await __helpers.getDirectory('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev-1')
assert.include(learnDir, 'dev-account');
```

Your `neardev-1` folder should have a `dev-account.env` file

```js
await new Promise(res => setTimeout(res, 1000));
const learnDir = await __helpers.getDirectory('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev-1')
assert.include(learnDir, 'dev-account.env');
```

## 37

### --description--

Use the `dev-deploy` command to deploy your contract again. It will create a new account and contract for you when deploying.

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

## 38

### --description--

You have a new account and contract name in the `neardev` folder. Call the `viewSecretWord` function on your new contract.

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

## 39

### --description--

This new contract has a blank state and hasn't been initialized yet. Initialize the new contract (`neardev`), but use the old account (`neardev-1`) account as the `--accountId`. Pass `'{ "secretWord": "freeCodeCamp" }'` to the `init` call to set the secret word.

If you get something wrong, delete the `neardev` folder, redeploy the contract, and try again.

### --tests--

You should run `near call <neardev_contract_name> init '{ "secretWord": "freeCodeCamp" }' --accountId <neardev-1_account>`, with the correct contract name and account

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const id1 = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev-1/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+call\\s+${id}\\s+init\\s+[\\s\\S]*--accountId\\s+${id1}`, 'g');
assert.match(lastCommand, re);
```

The terminal should print `The secret word has been set to 'freeCodeCamp'`

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('Doing account.functionCall()');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /"The secret word has been set to 'freeCodeCamp'"\s*$/i);
```

## 40

### --description--

View the secret word again.

### --tests--

You should run `near view <contract_name> viewSecretWord`, where the contract name matches what is in the `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewSecretWord\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print `"The secret word is 'freeCodeCamp'"`

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const output = await __helpers.getTerminalOutput();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewSecretWord\\s*$`, 'g');
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(re);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /"The secret word is 'freeCodeCamp'"\s*$/i);
```

## 41

### --description--

The contract has been initialized with a secret word. Run the `viewHints` function.

### --tests--

You should run `near view <contract_name> viewHints`, where the contract name matches what's in the `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewHints\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print `[]`

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const output = await __helpers.getTerminalOutput();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewHints\\s*$`, 'g');
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(re);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /\[\]\s*$/);
```

## 42

### --description--

The hints are an empty array. Add a hint using the contract in `neardev`, but the account from `neardev-1` again. Pass it `'{ "hint": "My favorite coding site" }` to add a hint.

### --tests--

You should run `near call <neardev_contract_name> addHint '{ "hint": "My favorite coding site" }' --accountId <neardev-1_account>`, with the correct contract name and account

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const id1 = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev-1/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+call\\s+${id}\\s+addHint\\s+[\\s\\S]*?--accountId\\s+${id1}`, 'g');
assert.match(lastCommand, re);
```

The terminal should print `Your hint was added`

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('Doing account.functionCall()');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /'Your hint was added'\s*$/);
```

## 43

### --description--

View the hints again.

### --tests--

You should run `near view <contract_name> viewHints`, where the contract name matches what's in the `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewHints\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print `[ 'My favorite coding site' ]`

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const output = await __helpers.getTerminalOutput();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewHints\\s*$`, 'g');
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(re);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /'My favorite coding site' \]\s*$/i);
```

## 44

### --description--

Add another hint using the `neardev-1` account again, Make the hint, `It is free`.

### --tests--

You should run `near call <neardev_contract_name> addHint '{ "hint": "It is free" }' --accountId <neardev-1_account>`, with the correct contract name and account

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const id1 = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev-1/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+call\\s+${id}\\s+addHint\\s+[\\s\\S]*?--accountId\\s+${id1}`, 'g');
assert.match(lastCommand, re);
```

The terminal should print `Your hint was added`

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('Doing account.functionCall()');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /'Your hint was added'\s*$/);
```

## 45

### --description--

View the hints one more time.

### --tests--

You should run `near view <contract_name> viewHints`, where the contract name matches what's in the `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewHints\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print `[ 'My favorite coding site', 'It is free' ]`

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const output = await __helpers.getTerminalOutput();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewHints\\s*$`, 'g');
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(re);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /'It is free' \]\s*$/i);
```

## 46

### --description--

You don't want random people to be able to add hints to your contract. In the `addHint` decorator, add `privateFunction: true` in the object parameter to make it so only the contract account can run that method.

### --tests--

You should have a `@call({ privateFunction: true })` as your `addHint` decorator

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const addHint = babelised?.getType('ClassMethod').find(c => c.key?.name === 'addHint' && c.key?.scope?.includes('WordGuess'));
const exp = addHint?.decorators[0]?.expression;
assert.equal(exp?.callee?.name, 'call', "You should have a '@call()' decorator");
assert.lengthOf(exp?.arguments, 1, "The 'call' decorator should have one argument");
assert.equal(exp?.arguments[0]?.type, 'ObjectExpression', "The 'call' decorator argument should be an object");
assert.lengthOf(exp?.arguments[0]?.properties, 1, "The 'call' object argument should have one property");
assert.equal(exp?.arguments[0]?.properties[0]?.key?.name, 'privateFunction', "The 'call' object argument should have a 'privateFunction' property");
assert.equal(exp?.arguments[0]?.properties[0]?.value?.value, true, "The 'call' object argument 'privateFunction' value should be 'true' (boolean)");
```

## 47

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
const fileExists = await __helpers.fileExists('learn-near-smart-contracts-by-building-a-word-guessing-game/build/word-guess.wasm');
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
import { NearBindgen, initialize, view, call } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
  }

  @initialize({})
  init({ secretWord }) {
    this.secretWord = secretWord;
    return `The secret word has been set to '${secretWord}'`;
  }

  @view({})
  viewSecretWord() {
    return `The secret word is '${this.secretWord}'`;
  }

  @call({ privateFunction: true })
  addHint({ hint }) {
    this.hints.push(hint);
    return 'Your hint was added';
  }

  @view({})
  viewHints() {
    return this.hints;
  }
}
```

## 48

### --description--

Use `dev-deploy` to deploy it again.

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

## 49

### --description--

View the hints in your contract.

### --tests--

You should run `near view <contract_name> viewHints` in the terminal, where contract name matches what's in the `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewHints\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should output an array with your hints

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const output = await __helpers.getTerminalOutput();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewHints\\s*$`, 'g');
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(re);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /\[ '[\s\S]*?'[\s\S]*?\]\s*$/);
```

## 50

### --description--

The hints are still there. Try to add another hint using your `neardev-1` account again. Make the hint, `It is 12 letters`.

### --tests--

You should run `near call <contract_name> addHint '{ "hint": "It is 12 letters" }' --accountId <neardev-1_account>`

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const id1 = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev-1/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+call\\s+${id}\\s+addHint\\s+[\\s\\S]*?--accountId\\s+${id1}`, 'g');
assert.match(lastCommand, re);
```

The terminal output should include `Function is private`

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('Doing account.functionCall()');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /Function is private/);
```

## 51

### --description--

It didn't work. It says that the function is private. The `addHint` function can only be called by the contract account. Add the same `It is 12 letters` hint, but use the contract (`neardev`) account to do it.

### --tests--

You should run `near call <contract_name> addHint '{ "hint": "It is 12 letters" }' --accountId <account>`, with the correct two accounts

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+call\\s+${id}\\s+addHint\\s+[\\s\\S]*?--accountId\\s+${id}`, 'g');
assert.match(lastCommand, re);
```

The terminal should print `Your hint was added`

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('Doing account.functionCall()');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /'Your hint was added'\s*$/);
```

## 52

### --description--

It worked that time. View the hints again.

### --tests--

You should run `near view <contract_name> viewHints` in the terminal, where contract name matches what's in the `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewHints\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should output an array with your hints

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const output = await __helpers.getTerminalOutput();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewHints\\s*$`, 'g');
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(re);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /\[ '[\s\S]*?'[\s\S]*?\]\s*$/);
```

## 53

### --description--

So only someone with the contract account credentials will be able to add hints. You want to do the same to the `viewSecretWord` method, except `view` methods are public for everyone. Only `call` methods can be made private, so turn it into a `call` method and make it private.

### --tests--

You should have `@call({ privateFunction: true })` as your `viewSecretWord` decorator

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const viewSecret = babelised?.getType('ClassMethod').find(c => c.key?.name === 'viewSecretWord' && c.key?.scope?.includes('WordGuess'));
const exp = viewSecret?.decorators[0]?.expression;
assert.equal(exp?.callee?.name, 'call', "You should have a '@call()' decorator on your 'viewSecretWord' function");
assert.lengthOf(exp?.arguments, 1, "The 'call' decorator should have one argument");
assert.equal(exp?.arguments[0]?.type, 'ObjectExpression', "The 'call' decorator argument should be an object");
assert.lengthOf(exp?.arguments[0]?.properties, 1, "The 'call' object argument should have one property");
assert.equal(exp?.arguments[0]?.properties[0]?.key?.name, 'privateFunction', "The 'call' object argument should have a 'privateFunction' property");
assert.equal(exp?.arguments[0]?.properties[0]?.value?.value, true, "The 'call' object argument 'privateFunction' value should be 'true' (boolean)");
```

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
  }

  @initialize({})
  init({ secretWord }) {
    this.secretWord = secretWord;
    return `The secret word has been set to '${secretWord}'`;
  }

  @view({})
  viewSecretWord() {
    return `The secret word is '${this.secretWord}'`;
  }

  @call({ privateFunction: true })
  addHint({ hint }) {
    this.hints.push(hint);
    return 'Your hint was added';
  }

  @view({})
  viewHints() {
    return this.hints;
  }
}
```

## 54

### --description--

Next, you need a way for people to view and make guesses. Add a `guesses` array in your constructor to store the guesses.

### --tests--

You should have `this.guesses = []` at the bottom of your constructor

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const construct = babelised?.getType('ClassMethod').find(c => c.kind === 'constructor');
const recreatedCode = babelised?.generateCode(construct);
assert.match(recreatedCode, /this\.guesses\s*=\s*\[\s*\];\s*}/);
```

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
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
    return 'Your hint was added';
  }

  @view({})
  viewHints() {
    return this.hints;
  }
}
```

## 55

### --description--

Below your `viewHints` function, create an empty `viewGuesses` function. Be sure to add the correct decorator for reading from the contract.

### --tests--

You should have a `viewGuesses() { }` function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const viewGuesses = babelised?.getType('ClassMethod').find(c => c.key?.name === 'viewGuesses' && c.key?.scope?.includes('WordGuess'));
assert.exists(viewGuesses, "You should have a 'viewGuesses' function");
assert.lengthOf(viewGuesses?.body?.body, 0, "Your 'viewGuesses' function should be empty");
```

You should have a `@view({})` decorator above the function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const viewGuesses = babelised?.getType('ClassMethod').find(c => c.key?.name === 'viewGuesses' && c.key?.scope?.includes('WordGuess'));
const exp = viewGuesses?.decorators[0]?.expression;
assert.equal(exp?.callee?.name, 'view', "You should have a '@view()' decorator");
assert.lengthOf(exp?.arguments, 1, "The 'view' decorator should have one argument");
assert.equal(exp?.arguments[0]?.type, 'ObjectExpression', "The 'view' decorator argument should be an object");
assert.lengthOf(exp?.arguments[0]?.properties, 0, "The 'view' object argument should not have any properties");
```

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
    this.guesses = [];
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
    return 'Your hint was added';
  }

  @view({})
  viewHints() {
    return this.hints;
  }
}
```

## 56

### --description--

In the function, return the guesses array.

### --tests--

You should have `return this.guesses;` in your `viewGuesses` function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const viewGuesses = babelised?.getType('ClassMethod').find(c => c.key?.name === 'viewGuesses' && c.key?.scope?.includes('WordGuess'));
const recreatedCode = babelised?.generateCode(viewGuesses);
assert.match(recreatedCode, /{\s*return\s+this\.guesses;\s*}\s*$/);
```

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
    this.guesses = [];
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
    return 'Your hint was added';
  }

  @view({})
  viewHints() {
    return this.hints;
  }

  @view({})
  viewGuesses() {

  }
}
```

## 57

### --description--

Lastly, create an empty `makeGuess` function that destructs `guess` from an object parameter. Be sure to give it the decorator that allows writing to the contract state.

### --tests--

You should have a `makeGuess({ guess }) { }` function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const makeGuess = babelised?.getType('ClassMethod').find(c => c.key?.name === 'makeGuess' && c.key?.scope?.includes('WordGuess'));
assert.exists(makeGuess, "You should have a 'makeGuess' function");
assert.lengthOf(makeGuess?.params, 1, "Your 'makeGuess' function should accept one parameter");
assert.equal(makeGuess?.params[0]?.type, 'ObjectPattern', "Your 'makeGuess' parameter should be an object");
assert.lengthOf(makeGuess?.params[0]?.properties, 1, 'Your object parameter should destruct one variable')
assert.equal(makeGuess?.params[0]?.properties[0]?.value?.name, 'guess', "You should only destruct 'guess' from the object parameter");
assert.lengthOf(makeGuess?.body?.body, 0, "Your 'makeGuess' function should be empty");
```

You should have a `@call({})` decorator above the function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const makeGuess = babelised?.getType('ClassMethod').find(c => c.key?.name === 'makeGuess' && c.key?.scope?.includes('WordGuess'));
const exp = makeGuess?.decorators[0]?.expression;
assert.equal(exp?.callee?.name, 'call', "You should have a '@call()' decorator");
assert.lengthOf(exp?.arguments, 1, "The 'call' decorator should have one argument");
assert.equal(exp?.arguments[0]?.type, 'ObjectExpression', "The 'call' decorator argument should be an object");
assert.lengthOf(exp?.arguments[0]?.properties, 0, "The 'call' object argument should not have any properties");
```

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
    this.guesses = [];
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
    return 'Your hint was added';
  }

  @view({})
  viewHints() {
    return this.hints;
  }

  @view({})
  viewGuesses() {
    return this.guesses;
  }
}
```

## 58

### --description--

In the `makeGuess` function, add a `const lastGuess` variable. Set it to the last item in the `guesses` array with `this.guesses[this.guesses.length - 1]`.

### --tests--

You should only have `const lastGuess = this.guesses[this.guesses.length - 1];` in your `makeGuess` function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const makeGuess = babelised?.getType('ClassMethod').find(c => c.key?.name === 'makeGuess' && c.key?.scope?.includes('WordGuess'));
const recreatedCode = babelised?.generateCode(makeGuess);
assert.match(recreatedCode, /{\s*const lastGuess = this\.guesses\[this\.guesses\.length - 1\];\s*}\s*$/);
```

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
    this.guesses = [];
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
    return 'Your hint was added';
  }

  @view({})
  viewHints() {
    return this.hints;
  }

  @view({})
  viewGuesses() {
    return this.guesses;
  }

  @call({})
  makeGuess({ guess }) {

  }
}
```

## 59

### --description--

The guesses array will keep track of the `guess` and who made it. Add an `if` condition that checks if `lastGuess?.guess` is equal to the secret word. This will be for if the word has been guessed and the game is over.

### --tests--

You should have `if (lastGuess?.guess === this.secretWord) { }` in your `makeGuess` function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const makeGuess = babelised?.getType('ClassMethod').find(c => c.key?.name === 'makeGuess' && c.key?.scope?.includes('WordGuess'));
const recreatedCode = babelised?.generateCode(makeGuess);
assert.match(recreatedCode, /if \(lastGuess\?\.guess === this\.secretWord\) {}\s*}\s*$/);
```

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
    this.guesses = [];
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
    return 'Your hint was added';
  }

  @view({})
  viewHints() {
    return this.hints;
  }

  @view({})
  viewGuesses() {
    return this.guesses;
  }

  @call({})
  makeGuess({ guess }) {
    const lastGuess = this.guesses[this.guesses.length - 1];

  }
}
```

## 60

### --description--

In the `if` condition, use a template literal to return `This game is finished. The secret word, '<secret_word>', was guessed by ${lastGuess.guesser}`.

### --tests--

You should have ``return `This game is finished. The secret word, '${this.secretWord}', was guessed by ${lastGuess.guesser}`;`` in your `if` condition

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const makeGuess = babelised?.getType('ClassMethod').find(c => c.key?.name === 'makeGuess' && c.key?.scope?.includes('WordGuess'));
const ifCond = makeGuess?.body?.body[1]?.consequent?.body[0];
const recreatedCode = babelised?.generateCode(ifCond);
assert.match(recreatedCode, /^\s*return `This game is finished\. The secret word, '\${this\.secretWord}', was guessed by \${lastGuess\.guesser}`;\s*$/);
```

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
    this.guesses = [];
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
    return 'Your hint was added';
  }

  @view({})
  viewHints() {
    return this.hints;
  }

  @view({})
  viewGuesses() {
    return this.guesses;
  }

  @call({})
  makeGuess({ guess }) {
    const lastGuess = this.guesses[this.guesses.length - 1];

    if (lastGuess?.guess === this.secretWord) {

    }
  }
}
```

## 61

### --description--

Add an empty `else` area to your `if` condition for when the game is still not finished.

### --tests--

You should have `else { }` at the bottom of your `if` condition

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const ifCond = babelised?.getType('IfStatement').find(i => i.scope.includes('makeGuess') && i.scope.includes('WordGuess'));
assert.isNotNull(ifCond?.alternate, "Your 'if' condition should have an 'else' area");
assert.isEmpty(ifCond?.alternate?.body, "Your 'else' area should be empty");
```

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
    this.guesses = [];
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
    return 'Your hint was added';
  }

  @view({})
  viewHints() {
    return this.hints;
  }

  @view({})
  viewGuesses() {
    return this.guesses;
  }

  @call({})
  makeGuess({ guess }) {
    const lastGuess = this.guesses[this.guesses.length - 1];

    if (lastGuess?.guess === this.secretWord) {
      return `This game is finished. The secret word, '${this.secretWord}', was guessed by ${lastGuess.guesser}`;
    }
  }
}
```

## 62

### --description--

In this area, you will find the account that made the guess, and push the guess to the guesses array. Then, figure out if the guess is correct or not. First, import `near` with the rest of the imports so you can find the calling account.

### --tests--

You should import `near` from the `near-sdk-js` module

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const imports = babelised?.getImportDeclarations().find(i => i.source?.value === 'near-sdk-js');
const method = imports?.specifiers?.find(s => s.local?.name === 'near');
assert.exists(method);
```

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
    this.guesses = [];
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
    return 'Your hint was added';
  }

  @view({})
  viewHints() {
    return this.hints;
  }

  @view({})
  viewGuesses() {
    return this.guesses;
  }

  @call({})
  makeGuess({ guess }) {
    const lastGuess = this.guesses[this.guesses.length - 1];

    if (lastGuess?.guess === this.secretWord) {
      return `This game is finished. The secret word, '${this.secretWord}', was guessed by ${lastGuess.guesser}`;
    } else {

    }
  }
}
```

## 63

### --description--

Back in the empty `else` area, create a `const guesser` variable and set it to `near.predecessorAccountId()` to get the account making the guess.

### --tests--

You should have `const guesser = near.predecessorAccountId();` as the only thing in your `else` area

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const ifCond = babelised?.getType('IfStatement').find(i => i.scope.includes('makeGuess') && i.scope.includes('WordGuess'));
const elseArea = ifCond?.alternate?.body[0];
assert.equal(elseArea?.kind, 'const');
assert.equal(elseArea?.declarations[0]?.id?.name, 'guesser');
const callee = elseArea?.declarations[0]?.init?.callee;
assert.equal(callee?.type, 'MemberExpression');
assert.equal(callee?.object?.name, 'near');
assert.equal(callee?.property?.name, 'predecessorAccountId');
```

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call, near } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
    this.guesses = [];
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
    return 'Your hint was added';
  }

  @view({})
  viewHints() {
    return this.hints;
  }

  @view({})
  viewGuesses() {
    return this.guesses;
  }

  @call({})
  makeGuess({ guess }) {
    const lastGuess = this.guesses[this.guesses.length - 1];

    if (lastGuess?.guess === this.secretWord) {
      return `This game is finished. The secret word, '${this.secretWord}', was guessed by ${lastGuess.guesser}`;
    } else {

    }
  }
}
```

## 64

### --description--

Below that, add a `near.log` that uses a template literal to print `\nguesser = ${guesser}`.

### --tests--

You should have ``near.log(`\nguesser = ${guesser}`);`` at the bottom of your `else` area

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const ifCond = babelised?.getType('IfStatement').find(i => i.scope.includes('makeGuess') && i.scope.includes('WordGuess'));
const nearLog = ifCond?.alternate?.body[1];
const recreatedCode = babelised?.generateCode(nearLog);
assert.match(recreatedCode, /^\s*near\.log\(`\\nguesser = \${guesser}`\);\s*$/);
```

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call, near } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
    this.guesses = [];
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
    return 'Your hint was added';
  }

  @view({})
  viewHints() {
    return this.hints;
  }

  @view({})
  viewGuesses() {
    return this.guesses;
  }

  @call({})
  makeGuess({ guess }) {
    const lastGuess = this.guesses[this.guesses.length - 1];

    if (lastGuess?.guess === this.secretWord) {
      return `This game is finished. The secret word, '${this.secretWord}', was guessed by ${lastGuess.guesser}`;
    } else {
      const guesser = near.predecessorAccountId();

    }
  }
}
```

## 65

### --description--

Add another log below that to log the `guess` in the same format.

### --tests--

You should have ``near.log(`\nguess = ${guess}`);`` at the bottom of your `else` area

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const ifCond = babelised?.getType('IfStatement').find(i => i.scope.includes('makeGuess') && i.scope.includes('WordGuess'));
const nearLog = ifCond?.alternate?.body[2];
const recreatedCode = babelised?.generateCode(nearLog);
assert.match(recreatedCode, /^\s*near\.log\(`\\nguess = \${guess}`\);\s*$/);
```

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call, near } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
    this.guesses = [];
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
    return 'Your hint was added';
  }

  @view({})
  viewHints() {
    return this.hints;
  }

  @view({})
  viewGuesses() {
    return this.guesses;
  }

  @call({})
  makeGuess({ guess }) {
    const lastGuess = this.guesses[this.guesses.length - 1];

    if (lastGuess?.guess === this.secretWord) {
      return `This game is finished. The secret word, '${this.secretWord}', was guessed by ${lastGuess.guesser}`;
    } else {
      const guesser = near.predecessorAccountId();
      near.log(`\nguesser = ${guesser}`);

    }
  }
}
```

## 66

### --description--

Now you have the guess and who it's from. Push `{ guesser, guess }` to your `guesses` array below your logs.

### --tests--

You should have `this.guesses.push({ guesser, guess });` in the `else` area

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const ifCond = babelised?.getType('IfStatement').find(i => i.scope.includes('makeGuess') && i.scope.includes('WordGuess'));
const newGuess = ifCond?.alternate?.body[3];
const recreatedCode = babelised?.generateCode(newGuess);
assert.match(recreatedCode, /^\s*this\.guesses\.push\({\s*guesser,\s*guess\s*}\);\s*$/);
```

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call, near } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
    this.guesses = [];
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
    return 'Your hint was added';
  }

  @view({})
  viewHints() {
    return this.hints;
  }

  @view({})
  viewGuesses() {
    return this.guesses;
  }

  @call({})
  makeGuess({ guess }) {
    const lastGuess = this.guesses[this.guesses.length - 1];

    if (lastGuess?.guess === this.secretWord) {
      return `This game is finished. The secret word, '${this.secretWord}', was guessed by ${lastGuess.guesser}`;
    } else {
      const guesser = near.predecessorAccountId();
      near.log(`\nguesser = ${guesser}`);
      near.log(`\nguess = ${guess}`);

    }
  }
}
```

## 67

### --description--

Add another empty `if` condition at the bottom of your `else` area. Make it check if `guess` is equal to the secret word for when the guess is correct.

### --tests--

You should have `if (guess === this.secretWord) { }` at the bottom of your `else` area

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const ifCond1 = babelised?.getType('IfStatement').find(i => i.scope.includes('makeGuess') && i.scope.includes('WordGuess'));
const ifCond2 = ifCond1?.alternate?.body[4];
const recreatedCode = babelised?.generateCode(ifCond2);
console.log(recreatedCode)
assert.match(recreatedCode, /^\s*if \(guess === this\.secretWord\) {}\s*$/);
```

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call, near } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
    this.guesses = [];
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
    return 'Your hint was added';
  }

  @view({})
  viewHints() {
    return this.hints;
  }

  @view({})
  viewGuesses() {
    return this.guesses;
  }

  @call({})
  makeGuess({ guess }) {
    const lastGuess = this.guesses[this.guesses.length - 1];

    if (lastGuess?.guess === this.secretWord) {
      return `This game is finished. The secret word, '${this.secretWord}', was guessed by ${lastGuess.guesser}`;
    } else {
      const guesser = near.predecessorAccountId();
      near.log(`\nguesser = ${guesser}`);
      near.log(`\nguess = ${guess}`);
      this.guesses.push({ guesser, guess });

    }
  }
}
```

## 68

### --description--

If the guess is the secret word, use a template literal to return `You got it! The secret word is '<secret_word>'`;

### --tests--

You should have ``return `You got it! The secret word is '${this.secretWord}'`;``

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const ifCond1 = babelised?.getType('IfStatement').find(i => i.scope.includes('makeGuess') && i.scope.includes('WordGuess'));
const ifCond2 = ifCond1?.alternate?.body[4];
const recreatedCode = babelised?.generateCode(ifCond2);
assert.match(recreatedCode, /{\s*return `You got it! The secret word is '\${this\.secretWord}'`;\s*}/);
```

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call, near } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
    this.guesses = [];
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
    return 'Your hint was added';
  }

  @view({})
  viewHints() {
    return this.hints;
  }

  @view({})
  viewGuesses() {
    return this.guesses;
  }

  @call({})
  makeGuess({ guess }) {
    const lastGuess = this.guesses[this.guesses.length - 1];

    if (lastGuess?.guess === this.secretWord) {
      return `This game is finished. The secret word, '${this.secretWord}', was guessed by ${lastGuess.guesser}`;
    } else {
      const guesser = near.predecessorAccountId();
      near.log(`\nguesser = ${guesser}`);
      near.log(`\nguess = ${guess}`);
      this.guesses.push({ guesser, guess });

      if (guess === this.secretWord) {

      }
    }
  }
}
```

## 69

### --description--

Add an empty `else` area for when the guess isn't the secret word.

### --tests--

You should have an `else { }` area with your second `if` statement

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const ifCond1 = babelised?.getType('IfStatement').find(i => i.scope.includes('makeGuess') && i.scope.includes('WordGuess'));
const ifCond2 = ifCond1?.alternate?.body[4];
assert.isNotNull(ifCond2?.alternate, "Your second 'if' condition should have an 'else' area");
assert.isEmpty(ifCond2?.alternate?.body, "Your 'else' area should be empty");
```

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call, near } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
    this.guesses = [];
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
    return 'Your hint was added';
  }

  @view({})
  viewHints() {
    return this.hints;
  }

  @view({})
  viewGuesses() {
    return this.guesses;
  }

  @call({})
  makeGuess({ guess }) {
    const lastGuess = this.guesses[this.guesses.length - 1];

    if (lastGuess?.guess === this.secretWord) {
      return `This game is finished. The secret word, '${this.secretWord}', was guessed by ${lastGuess.guesser}`;
    } else {
      const guesser = near.predecessorAccountId();
      near.log(`\nguesser = ${guesser}`);
      near.log(`\nguess = ${guess}`);
      this.guesses.push({ guesser, guess });

      if (guess === this.secretWord) {
        return `You got it! The secret word is '${this.secretWord}'`;
      }
    }
  }
}
```

## 70

### --description--

In the `else` area, use a template literal to return `Sorry, '<guess>' is not the secret word`.

### --tests--

You should have ``return `Sorry, '${guess}' is not the secret word`;`` in your second `else` area

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const ifCond1 = babelised?.getType('IfStatement').find(i => i.scope.includes('makeGuess') && i.scope.includes('WordGuess'));
const ifCond2 = ifCond1?.alternate?.body[4];
const recreatedCode = babelised?.generateCode(ifCond2);
assert.match(recreatedCode, /{\s*return `Sorry, '\${guess}' is not the secret word`;\s*}\s*$/);
```

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call, near } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
    this.guesses = [];
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
    return 'Your hint was added';
  }

  @view({})
  viewHints() {
    return this.hints;
  }

  @view({})
  viewGuesses() {
    return this.guesses;
  }

  @call({})
  makeGuess({ guess }) {
    const lastGuess = this.guesses[this.guesses.length - 1];

    if (lastGuess?.guess === this.secretWord) {
      return `This game is finished. The secret word, '${this.secretWord}', was guessed by ${lastGuess.guesser}`;
    } else {
      const guesser = near.predecessorAccountId();
      near.log(`\nguesser = ${guesser}`);
      near.log(`\nguess = ${guess}`);
      this.guesses.push({ guesser, guess });

      if (guess === this.secretWord) {
        return `You got it! The secret word is '${this.secretWord}'`;
      } else {

      }
    }
  }
}
```

## 71

### --description--

Time to test it. Run the command to rebuild your contract.

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

Your `build/methods.h` file should have a `viewGuesses` method as a result of building your contract

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/build/methods.h');
assert.match(code, /viewGuesses/);
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
import { NearBindgen, initialize, view, call, near } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
    this.guesses = [];
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
    return 'Your hint was added';
  }

  @view({})
  viewHints() {
    return this.hints;
  }

  @view({})
  viewGuesses() {
    return this.guesses;
  }

  @call({})
  makeGuess({ guess }) {
    const lastGuess = this.guesses[this.guesses.length - 1];

    if (lastGuess?.guess === this.secretWord) {
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

## 72

### --description--

You added some new things your contract will store so you need to use a new account. Delete your `neardev` folder so it will make a new one. Be sure to leave the `neardev-1` folder.

### --tests--

You should not have a `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const learnDir = await __helpers.getDirectory('learn-near-smart-contracts-by-building-a-word-guessing-game')
assert.notInclude(learnDir, 'neardev');
```

You should still have a `neardev-1` folder

```js
await new Promise(res => setTimeout(res, 1000));
const learnDir = await __helpers.getDirectory('learn-near-smart-contracts-by-building-a-word-guessing-game')
assert.include(learnDir, 'neardev-1');
```

## 73

### --description--

Deploy your contract using the `dev-deploy` command.

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

## 74

### --description--

Call the `init` function on your contract. Set the secret word to `HTML`.

### --tests--

You should run `near call <contract_name> init '{ "secretWord": "HTML" }' --accountId <account>`, with the correct contract name and account

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+call\\s+${id}\\s+init\\s+[\\s\\S]*--accountId\\s+${id}`, 'g');
assert.match(lastCommand, re);
```

The terminal should print `The secret word has been set to 'HTML'`

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('Doing account.functionCall()');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /"The secret word has been set to 'HTML'"\s*$/i);
```

## 75

### --description--

Run the function to view the secret word.

### --tests--

You should run `near call <contract_name> viewSecretWord --accountId <account>`, where the contract name and account match what's in the `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+call\\s+${id}\\s+viewSecretWord\\s+--accountId\\s+${id}\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print `"The secret word is 'HTML'"`

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const output = await __helpers.getTerminalOutput();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewSecretWord\\s*$`, 'g');
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(re);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /"The secret word is 'HTML'"\s*$/i);
```

## 76

### --description--

Add a hint of `Language for coding websites`.

### --tests--

You should run `near call <contract_name> addHint '{ "hint": "Language for coding websites" }' --accountId <account>`, with the correct contract name and account

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+call\\s+${id}\\s+addHint\\s+[\\s\\S]*?Language for coding websites[\\s\\S]*?--accountId\\s+${id}`, 'g');
assert.match(lastCommand, re);
```

The terminal should print `Your hint was added`

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('Doing account.functionCall()');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /'Your hint was added'\s*$/);
```

## 77

### --description--

Your contract account set up the game. Now use your `neardev-1` account to play the game. First, view the hints.

### --tests--

You should run `near view <contract_name> viewHints` in the terminal, where contract name matches what's in the `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewHints\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should output an array with your hints

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const output = await __helpers.getTerminalOutput();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewHints\\s*$`, 'g');
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(re);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /\[ '[\s\S]*?'[\s\S]*?\]\s*$/);
```

## 78

### --description--

Use the `neardev-1` account to make a guess of `JavaScript`.

### --tests--

You should run `near call <neardev_contract_name> makeGuess '{ "guess": "JavaScript" }' --accountId <neardev-1_account>`, with the correct contract name and account

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const id1 = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev-1/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+call\\s+${id}\\s+makeGuess\\s+[\\s\\S]*?JavaScript[\\s\\S]*?--accountId\\s+${id1}`, 'g');
assert.match(lastCommand, re);
```

The terminal should print `Sorry, 'JavaScript' is not the secret word`

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('Doing account.functionCall()');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /"Sorry, 'JavaScript' is not the secret word"\s*$/);
```

## 79

### --description--

You can see your logs there for the guess and who made the guess. The guesser matches your `neardev-1` account. Run the method to view the guesses.

### --tests--

You should run `near view <contract_name> viewGuesses` in the terminal, where contract name matches what's in the `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewGuesses\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should output an array with your guesses

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const output = await __helpers.getTerminalOutput();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewHints\\s*$`, 'g');
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(re);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /\[\s*{\s*guesser[\s\S]*?guess[\s\S]*?}\s*\]\s*$/);
```

## 80

### --description--

Guess the correct secret word with your `neardev-1` account.

### --tests--

You should run `near call <neardev_contract_name> makeGuess '{ "guess": "HTML" }' --accountId <neardev-1_account>`, with the correct contract name and account

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const id1 = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev-1/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+call\\s+${id}\\s+makeGuess\\s+[\\s\\S]*?HTML[\\s\\S]*?--accountId\\s+${id1}`, 'g');
assert.match(lastCommand, re);
```

The terminal should print `"You got it! The secret word is 'HTML'"`

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('Doing account.functionCall()');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /"You got it! The secret word is 'HTML'"\s*$/);
```

## 81

### --description--

Make the same guess again.

### --tests--

You should run `near call <neardev_contract_name> makeGuess '{ "guess": "HTML" }' --accountId <neardev-1_account>`, with the correct contract name and account

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const id1 = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev-1/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+call\\s+${id}\\s+makeGuess\\s+[\\s\\S]*?HTML[\\s\\S]*?--accountId\\s+${id1}`, 'g');
assert.match(lastCommand, re);
```

The terminal should print `"This game is finished. The secret word, 'HTML', was guessed by <account>"`

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('Doing account.functionCall()');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /"This game is finished. The secret word, 'HTML', was guessed by [\s\S]*?"\s*$/);
```

## 82

### --description--

Looks like everything is working. There's one last thing to do. To optimize the way your contract data is stored, you should prefer to use collections from the `near-sdk-js` package for things stored on the blockchain.

There are collections for vectors, sets, and maps. You will use the `Vector` collection, which is similar to an array. At the top, import `Vector` with the rest of the imports.

### --tests--

You should import `Vector` from the `near-sdk-js` module

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const imports = babelised?.getImportDeclarations().find(i => i.source?.value === 'near-sdk-js');
const method = imports?.specifiers?.find(s => s.local?.name === 'Vector');
assert.exists(method);
```

## 83

### --description--

To create a vector collection, you can use `new Vector('id')`. The ID is required and can be anything unique. Change the `hints` declaration in your constructor to use a vector, give it an id of `hints`.

### --tests--

You should have `this.hints = new Vector('hints');` in your constructor function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const construct = babelised?.getType('ClassMethod').find(c => c.kind === 'constructor');
const recreatedCode = babelised?.generateCode(construct);
assert.match(recreatedCode, /this\.hints = new Vector\(('|"|`)hints\1\);/);
```

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call, near, Vector } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = [];
    this.guesses = [];
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
    return 'Your hint was added';
  }

  @view({})
  viewHints() {
    return this.hints;
  }

  @view({})
  viewGuesses() {
    return this.guesses;
  }

  @call({})
  makeGuess({ guess }) {
    const lastGuess = this.guesses[this.guesses.length - 1];

    if (lastGuess?.guess === this.secretWord) {
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

## 84

### --description--

Change the guesses array to a vector, as well. Use `guesses` for the ID.

### --tests--

You should have `this.guesses = new Vector('guesses');` in your constructor function

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const construct = babelised?.getType('ClassMethod').find(c => c.kind === 'constructor');
const recreatedCode = babelised?.generateCode(construct);
assert.match(recreatedCode, /this\.guesses = new Vector\(('|"|`)guesses\1\);/);
```

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call, near, Vector } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = new Vector('hints');
    this.guesses = [];
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
    return 'Your hint was added';
  }

  @view({})
  viewHints() {
    return this.hints;
  }

  @view({})
  viewGuesses() {
    return this.guesses;
  }

  @call({})
  makeGuess({ guess }) {
    const lastGuess = this.guesses[this.guesses.length - 1];

    if (lastGuess?.guess === this.secretWord) {
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

## 85

### --description--

Vectors aren't arrays, but they have many similar methods like `push`, `pop`, and `length`. So where you use those methods, the code shouldn't need to change. Some other methods are `clear`, `isEmpty`, and `toArray`. Where you return the `hints` variable in the `viewHints` function, transform the vector to an array.

### --tests--

You should have `return this.hints.toArray()` in your `viewHints` method.

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const viewHints = babelised?.getType('ClassMethod').find(c => c.key?.name === 'viewHints' && c.key?.scope?.includes('WordGuess'));
const recreatedCode = babelised?.generateCode(viewHints);
assert.match(recreatedCode, /{\s*return this\.hints\.toArray\(\);\s*}/);
```

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call, near, Vector } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = new Vector('hints');
    this.guesses = new Vector('guesses');
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
    return 'Your hint was added';
  }

  @view({})
  viewHints() {
    return this.hints;
  }

  @view({})
  viewGuesses() {
    return this.guesses;
  }

  @call({})
  makeGuess({ guess }) {
    const lastGuess = this.guesses[this.guesses.length - 1];

    if (lastGuess?.guess === this.secretWord) {
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

## 86

### --description--

Do the same for the guesses in the `viewGuesses` method.

### --tests--

You should have `return this.guesses.toArray()` in your `viewGuesses` method.

```js
await new Promise(res => setTimeout(res, 1000));
const code = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/src/word-guess.js');
const babelised = await __helpers.babeliser(code?.replace('export',''));
const viewGuesses = babelised?.getType('ClassMethod').find(c => c.key?.name === 'viewGuesses' && c.key?.scope?.includes('WordGuess'));
const recreatedCode = babelised?.generateCode(viewGuesses);
assert.match(recreatedCode, /{\s*return this\.guesses\.toArray\(\);\s*}/);
```

### --seed--

#### --"src/word-guess.js"--

```js
import { NearBindgen, initialize, view, call, near, Vector } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = new Vector('hints');
    this.guesses = new Vector('guesses');
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
    return 'Your hint was added';
  }

  @view({})
  viewHints() {
    return this.hints.toArray();
  }

  @view({})
  viewGuesses() {
    return this.guesses;
  }

  @call({})
  makeGuess({ guess }) {
    const lastGuess = this.guesses[this.guesses.length - 1];

    if (lastGuess?.guess === this.secretWord) {
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

## 87

### --description--

I think the contract is complete. Rebuild it one more time.

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
import { NearBindgen, initialize, view, call, near, Vector } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.hints = new Vector('hints');
    this.guesses = new Vector('guesses');
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
    return 'Your hint was added';
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

    if (lastGuess?.guess === this.secretWord) {
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

## 88

### --description--

Since you are changing how the contract stores data, delete the `neardev` folder so it will create a new contract.

### --tests--

You should not have a `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const learnDir = await __helpers.getDirectory('learn-near-smart-contracts-by-building-a-word-guessing-game')
assert.notInclude(learnDir, 'neardev');
```

You should still have a `neardev-1` folder

```js
await new Promise(res => setTimeout(res, 1000));
const learnDir = await __helpers.getDirectory('learn-near-smart-contracts-by-building-a-word-guessing-game')
assert.include(learnDir, 'neardev-1');
```

## 89

### --description--

Deploy the contract one more time.

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

## 90

### --description--

I made a small script that will initialize your contract. Enter `node init.js` in the terminal to run it.

### --tests--

You should run `node init.js` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*node\\s+init\.js\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print `Your game is ready.`

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const output = await __helpers.getTerminalOutput();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewHints\\s*$`, 'g');
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(re);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /Your game is ready\.\s*$/);
```

## 91

### --description--

I initialized the contract and added the first hint. Call the contract to view the hint.

### --tests--

You should run `near view <contract_name> viewHints`, where the contract name matches what's in the `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewHints\\s*$`, 'g');
assert.match(lastCommand, re);
```

The terminal should print `[ 'Its three numbers' ]`

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const output = await __helpers.getTerminalOutput();
const re = new RegExp(`^\\s*near\\s+view\\s+${id}\\s+viewHints\\s*$`, 'g');
const splitOutput = output?.replaceAll(/\s+/g, ' ').split(re);
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /\[ 'Im a...' \]\s*$/);
```

## 92

### --description--

Use your `neardev-1` account to make a guess of what the secret word is.

### --tests--

You should run `near call <neardev_contract_name> makeGuess '{ "guess": "<your_guess>" }' --accountId <neardev-1_account>`, with the correct contract name and account

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const id1 = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev-1/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+call\\s+${id}\\s+makeGuess\\s+[\\s\\S]*?--accountId\\s+${id1}`, 'g');
assert.match(lastCommand, re);
```

The terminal should print the response for a correct or incorrect guess

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('Doing account.functionCall()');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /(You got it!|is not the secret word)/);
```

## 93

### --description--

This is the last step. Use your `neardev-1` account to guess the word and finish playing the game. If you want me to add more hints, run `node add-hint.js`.

### --tests--

You should run `near call <neardev_contract_name> makeGuess '{ "guess": "<your_guess>" }' --accountId <neardev-1_account>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev/dev-account');
const id1 = await __helpers.getFile('learn-near-smart-contracts-by-building-a-word-guessing-game/neardev-1/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`^\\s*near\\s+call\\s+${id}\\s+makeGuess\\s+[\\s\\S]*?--accountId\\s+${id1}`, 'g');
assert.match(lastCommand, re);
```

The terminal should print the `You got it!` or `This game is finished` message

```js
await new Promise(res => setTimeout(res, 1000));
const output = await __helpers.getTerminalOutput();
const splitOutput = output?.replaceAll(/\s+/g, ' ').split('Doing account.functionCall()');
const lastOutput = splitOutput[splitOutput.length - 1];
assert.match(lastOutput, /(You got it!|This game is finished)/);
```

## --fcc-end--
