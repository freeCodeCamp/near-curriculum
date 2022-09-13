# NEAR - Learn How to Set Up NEAR by Building Hello World

## 1

### --description--

Welcome to the NEAR curriculum! For the duration of this project, you will be working in the `learn-how-to-set-up-near-by-building-hello-world/` directory. Start by changing into that directory in the terminal.

### --tests--

You should use the change directory command (`cd`) in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /^\s*cd/);
```

You should be in the `learn-how-to-set-up-near-by-building-hello-world` directory in your terminal

```js
await new Promise(res => setTimeout(res, 1000));
const cwdFile = await __helpers.getCWD();
const cwd = cwdFile.split('\n').filter(Boolean).pop();
assert.include(cwd, 'learn-how-to-set-up-near-by-building-hello-world');
```

## 2

### --description--

You will be building a simple smart contract and deploying it to the NEAR testnet. To start, run `npm init` in the `learn-how-to-set-up-near-by-building-hello-world` folder to create a `package.json` file. Press enter through all the prompts to use the defaults.

### --tests--

You should run `npm init` in the terminal and press enter through all the prompts

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /npm\s+init/);
```

You should have a `package.json` file in your `learn-how-to-set-up-near-by-building-hello-world` folder

```js
await new Promise(res => setTimeout(res, 1000));
const fileExists = await __helpers.fileExists('learn-how-to-set-up-near-by-building-hello-world/package.json');
assert(fileExists);
```

## 3

### --description--

Open your `package.json` file and add a `type` of `module` to it so you can use module syntax.

### --tests--

Your `package.json` file should have a `type` property of `module`

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/package.json');
const packageJson = JSON.parse(fileContents);
assert.include(packageJson, { type: 'module' });
```

## 4

### --description--

You need a few dependencies for this project. First is typescript, run `npm install --save typescript@4.7.4` to install it. Wait for the command to finish, it will take a moment.

### --tests--

You should run `npm install --save typescript@4.7.4` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /npm\s+(install|i)\s+((--save|-s)\s+typescript@4\.7\.4|typescript@4\.7\.4\s+(--save|-s))/);
```

Your `package.json` file should have `typescript@4.7.4` in its `dependencies` object

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/package.json');
const packageJson = JSON.parse(fileContents);
assert.include(packageJson.dependencies, { typescript: '^4.7.4' });
```

## 5

### --description--

The important one is the NEAR JavaScript SDK. It allows you to use JS code for NEAR contracts. Run `npm install --save near-sdk-js@0.4.0-5` to install it in your project. It will take a moment, as well.

### --tests--

You should run `npm install --save near-sdk-js@0.4.0-5` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /npm\s+(install|i)\s+((--save|-s)\s+near-sdk-js@0\.4\.0-5|near-sdk-js@0\.4\.0-5\s+(--save|-s))/);
```

Your `package.json` file should have `near-sdk-js@0.4.0-5` in its `dependencies` object

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/package.json');
const packageJson = JSON.parse(fileContents);
assert.include(packageJson.dependencies, { 'near-sdk-js': '^0.4.0-5' });
```

## 6

### --description--

You will create your contract in the `src/index.ts` file. Open it and, at the top of the file, import `{ NearContract }` from the `near-sdk-js` module you just installed. `NearContract` is a constructing class for creating smart contracts in NEAR.

### --tests--

You should have `import { NearContract } from 'near-sdk-js';` at the top of your `src/index.ts` file

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/src/index.ts');
assert.match(fileContents, /^\s*import\s*{\s*NearContract\s*}\s*from\s*('|")near-sdk-js\1\s*;?/);
```

## 7

### --description--

Below your import, create an empty class named `MyContract` that extends `NearContract`. Here's an example:

```
class <className> extends <extendedClass> { }
```

### --tests--

You should have `class MyContract extends NearContract {}` in your `src/index.ts` file

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/src/index.ts');
assert.match(fileContents, /class\s*MyContract\s+extends\s*NearContract\s*{\s*}/);
```

## 8

### --description--

In the import statement at the top of your contract, destruct `NearBindgen` from the module alongside the `NearContract` you already imported.

### --tests--

You should have `import { NearContract, NearBindgen } from 'near-sdk-js';` at the top of your `src/index.ts` file

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/src/index.ts');
assert.match(fileContents, /^\s*import\s*{\s*(NearContract\s*,\s*NearBindgen|NearBindgen\s*,\s*NearContract)\s*}\s*from\s*('|")near-sdk-js\2\s*;?/);
```

## 9

### --description--

`NearBindgen` is a decorator that will compile JavaScript code to the format the NEAR blockchain uses. Right above your class keyword, add `@NearBingen`.

### --tests--

You should have `@NearBingen` in your contract file, right above your class declaration

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/src/index.ts');
assert.match(fileContents, /@NearBindgen\s*class\s+MyContract/);
```

## 10

### --description--

Your smart contract will store a single string on the blockchain that you will be able to look at or change. Since you are using typescript, add a `message` variable that is a `string` as the first part of your class.

### --tests--

You should have `message: string;` as the first thing in your `MyContract` class

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/src/index.ts');
assert.match(fileContents, /class\s*MyContract\s+extends\s*NearContract\s*{\s*message\s*:\s*string\s*;?\s*}/);
```

## 11

### --description--

Below your message type definition, add the `constructor` function and put the `super` function inside of it.

### --tests--

You should have a `constructor() { }` function in your `MyContract` class

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/src/index.ts');
assert.match(fileContents, /MyContract[\s\S]*?{[\s\S]*constructor\s*\(\s*\)\s*{[\s\S]*?}\s*}/);
```

You should have a `super();` function in your `constructor()` function

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/src/index.ts');
assert.match(fileContents, /constructor\s*\(\s*\)\s*{\s*super\s*\(\s*\)\s*;?\s*}/);
```

## 12

### --description--

In your constructor, below the `super` function, set the default of the `message` variable to `Hello`.

### --tests--

You should have `this.message = 'Hello';` in your constructor function

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/src/index.ts');
assert.match(fileContents, /constructor\s*\(\s*\)\s*{[\s\S]*super[\s\S]*this\s*\.message\s*=\s*('|"|`)Hello\1\s*;?\s*}/);
```

## 13

### --description--

Below your constructor, create an empty `default` function. This will run when you initialize your contract on the blockchain.

### --tests--

You should have a `default() { }` function in your `MyContract` class

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/src/index.ts');
assert.match(fileContents, /MyContract[\s\S]*default\s*\(\s*\)\s*{\s*}\s*}\s*$/);
```

## 14

### --description--

Inside the `default` function, return a new instance of `MyContract` so when you initilize your contract on the blockchain, it stores this new instance for you.

### --tests--

You should have `return new MyContract();` in your `default` function

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/src/index.ts');
assert.match(fileContents, /default\s*\(\s*\)\s*{\s*return\s+new\s+MyContract\s*\(\s*\)\s*;?\s*}/);
```

## 15

### --description--

Below your `default` function, create an empty `getGreeting` function and set its return type to `string`. This will be for reading the string stored on your contract.

### --tests--

You should have a `getGreeting(): string { }` function in your `MyContract` class

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/src/index.ts');
assert.match(fileContents, /default[\s\S]*?}\s*getGreeting\s*\(\s*\)\s*:\s*string\s*{\s*}\s*}/);
```

## 16

### --description--

In the `getGreeting` function, return the message.

### --tests--

You should have `return this.message;` in your `getGreeting` function

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/src/index.ts');
assert.match(fileContents, /getGreeting[\s\S]*{\s*return\s+this\s*\.\s*message\s*;?\s*}/);
```

## 17

### --description--

You need to tell the blockchain if your `getGreeting` function will modify anything. Include `view` in your import statement with the rest of your imports so you can use it as a decorator.

### --tests--

You should have `import { NearContract, NearBindgen, view } from 'near-sdk-js';` at the top of your contract file

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/src/index.ts');
assert.match(fileContents, /^\s*import\s*({\s*view\s*,[\s\S*]*}|{[\s\S]*,\s*view\s*,[\s\S]*}|{[\s\S]*,\s*view\s*})\s*from\s*('|")near-sdk-js\2\s*;?/);
```

## 18

### --description--

The `view` decorator means that this function will only read data from the blockchain. Add `@view` right above your `getGreeting` function.

### --tests--

You should have a `@view` decorator right above your `getGreeting` function

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/src/index.ts');
assert.match(fileContents, /@view\s*getGreeting/);
```

## 19

### --description--

You are ready to deploy your contract. In your `package.json` file, add a `build:contract` key in the `scripts` object. Give it a value of `near-sdk-js build src/index.ts build/hello-near.wasm`. 

### --tests--

Your `package.json` file should have a `build:contract` key in the `scripts` object whose value is `near-sdk-js build src/index.ts build/hello-near.wasm`

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/package.json');
const packageJson = JSON.parse(fileContents);
assert.include(packageJson.scripts, { 'build:contract': 'near-sdk-js build src/index.ts build/hello-near.wasm' });
```

## 20

### --description--

That command will turn your contract file (`index.ts`) into WebAssembly (Wasm), code the NEAR blockchain can understand. The Wasm code will be in `hello-near.wasm`.

In the terminal, run `npm run build:contract` to build your contract. Wait for the command to finish, it will take a moment. 

### --tests--

You should run `npm run build:contract` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /npm\s+run\s+build:contract/);
```

You should have a `build/hello-near.wasm` file

```js
await new Promise(res => setTimeout(res, 1000));
const fileExists = await __helpers.fileExists('learn-how-to-set-up-near-by-building-hello-world/build/hello-near.wasm');
assert(fileExists);
```

## 21

### --description--

The command created that `build` folder for you. In there, you will find the `hello-near.wasm` you told it to create. That's the file that will go to the blockchain.

Next, run `npm install -g near-cli@3.4.2` to install the NEAR CLI tools so you can deploy your contract. This will take a moment, as well.

### --tests--

You should run `npm install -g near-cli@3.4.2` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /npm\s+(install|i)\s+((-g|--global)\s+near-cli@3\.4\.2|near-cli@3\.4\.2\s+(-g|--global))/);
```

## 22

### --description--

Enter `near --version` in the terminal to make sure it got installed.

### --tests--

You should run `near --version` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /near\s+--version/);
```

## 23

### --description--

It worked. Enter `near --help` to see what the CLI tools have to offer.

### --tests--

You should run `near --help` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /near\s+--help/);
```

## 24

### --description--

There are commands in there for working directly with the blockchain. You're going to use that `dev-deploy` command to deploy your built contract to the testnet. Enter `near dev-deploy build/hello-near.wasm` to do that. Enter `y` or `n` when prompted.

### --tests--

You should enter `near dev-deploy build/hello-near.wasm` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /near\s+dev-deploy\s+build\/hello-near\.wasm/);
```

You should have a `neardev` folder as a result of deploying the contract

```js
await new Promise(res => setTimeout(res, 1000));
const learnDir = await __helpers.getDirectory('learn-how-to-set-up-near-by-building-hello-world')
assert.include(learnDir, 'neardev');
```

## 25

### --description--

You contract has been deployed, there's some feedback about it in the terminal. Check that help menu for the NEAR CLI tools again.

### --tests--

You should enter `near --help` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /near\s+--help/);
```

## 26

### --description--

You need to use that `call` command to initialize your contract. Here's an example:

```
near call <contract_id> init --accountId <account_id>
```

Deploying your contract created that `neardev` folder for you. In there, you will find files with your contract name and account id (they are the same). Initialize your contract using that example and the information from those files.

### --tests--

You should run `near call <contract_id> init --accountId <account_id>` with the correct information from your `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`near\\s+call\\s+${id}\\s+init\\s+--accountId\\s+${id}`, 'g');
assert.match(lastCommand, re);
```

## 27

### --description--

Now that your contract is initialized, you can call your `view` or other functions on it. Here's an example:

```sh
near view <contract_name> <function_name>
```

Call your `getGreeting` function. Remember that your contract name is in the `neardev` folder.

### --tests--

You should run `near view <contract_name> getGreeting` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`near\\s+view\\s+${id}\\s+getGreeting`, 'g');
assert.match(lastCommand, re);
```

## 28

### --description--

Your contract works! It printed the message. Next, you are going to add a way to change the message. In your contract file below your `getGreeting` function, create an empty `setGreeting` function.

### --tests--

You should have `setGreeting() { }` in your `index.js` file

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/src/index.ts');
assert.match(fileContents, /MyContract\s+extends[\s\S]*?{[\s\S]*setGreeting\s*\(\s*\)\s*{\s*}\s*}\s*$/);
```

## 29

### --description--

Add a parameter to your `setGreeting` function that destructs `message` from an object passed to it. Set it as a type of `string`. It looks like this:

```js
{ message }: { message: string }
```

### --tests--

You should have `setGreeting({ message }: { message: string })` in your contract file

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/src/index.ts');
assert.match(fileContents, /setGreeting\s*\(\s*{\s*message\s*}\s*:\s*{\s*message\s*:\s*string\s*}\)\s*{\s*}\s*/);
```

## 30

### --description--

In the `setGreeting` function, set the `message` of the contract to the message passed into the function.

### --tests--

You should have `this.message = message` in your `setGreeting` function

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/src/index.ts');
assert.match(fileContents, /setGreeting[\s\S]*?\)\s*{\s*this\s*\.\s*message\s*=\s*message\s*;?\s*}/);
```

## 31

### --description--

You used the `view` decorator for the `getGreeting` function because the function only reads data from the blockchain. At the top of the file, add `call` in your list of imports from `near-sdk-js`

### --tests--

You should have `import { NearContract, NearBindgen, view, call } from 'near-sdk-js';` at the top of your contract file

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/src/index.ts');
assert.match(fileContents, /^\s*import\s*({\s*call\s*,[\s\S*]*}|{[\s\S]*,\s*call\s*,[\s\S]*}|{[\s\S]*,\s*call\s*})\s*from\s*('|")near-sdk-js\2\s*;?/);
```

## 32

### --description--

Add the `call` decorator right above your `setGreeting` function to tell the blockchain that this function will modify the state of the contract.

### --tests--

You should have `@call` right above your `setGreeting` function

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/src/index.ts');
assert.match(fileContents, /@call\s*setGreeting/);
```

## 33

### --description--

There's one more thing you should know about. Import `near` at the top of your file with the rest of the imports.

### --tests--

You should have `import { NearContract, NearBindgen, view, call, near } from 'near-sdk-js';` at the top of your contract file

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/src/index.ts');
assert.match(fileContents, /^\s*import\s*({\s*near\s*,[\s\S*]*}|{[\s\S]*,\s*near\s*,[\s\S]*}|{[\s\S]*,\s*near\s*})\s*from\s*('|")near-sdk-js\2\s*;?/);
```

## 34

### --description--

`near` contains some methods for working with the blockchain. For example, if you wanted to send a transaction in a contract function, you would use one of its methods. You also can log things with `near.log()`.

In your `setGreeting` function, use `near` to log `Saving greeting to '<message>'`, where `<message>` is the new message. Use a template literal.

### --tests--

You should have ``near.log(`Saving greeting to '${message}'`)`` in your `setGreeting` function

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/src/index.ts');
assert.match(fileContents, /setGreeting[\s\S]*?\)\s*{[\s\S]*near\s*\.\s*log\s*\(\s*`Saving greeting to '\${message}'`\s*\)\s*;?[\s\S]*?}\s*}/);
```

## 35

### --description--

You will re-deploy you contract in a minute. Change the initial message of your contract to `Hello world` so you can be sure you are looking at the new contract.

### --tests--

You should have `this.message = 'Hello world'` in your constructor function

```js
await new Promise(res => setTimeout(res, 1000));
const fileContents = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/src/index.ts');
assert.match(fileContents, /constructor\s*\(\s*\)\s*{[\s\S]*super[\s\S]*this\s*\.message\s*=\s*('|"|`)Hello world\1\s*;?\s*}/);
```

## 36

### --description--

In the terminal, run your command to build the contract. Again, it will take a moment.

### --tests--

You should run `npm run build:contract` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /npm\s+run\s+build:contract/);
```

You should be in the `learn-how-to-set-up-near-by-building-hello-world` folder when you run the above command

```js
await new Promise(res => setTimeout(res, 1000));
const cwdFile = await __helpers.getCWD();
const cwd = cwdFile.split('\n').filter(Boolean).pop();
assert.include(cwd, 'learn-how-to-set-up-near-by-building-hello-world');
```

## 37

### --description--

You have a new Wasm file in the `build` folder with your updated contract now.

In the terminal, use the move command to change the name of your `neardev` folder to `oldneardev`. `mv <folder> <destination>` is the syntax. This is only so it creates a second account when you deploy, for you to work with.

### --tests--

You should run `mv neardev oldneardev` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /mv[\s\S]*oldneardev\/?/);
```

You should have an `oldneardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const learnDir = await __helpers.getDirectory('learn-how-to-set-up-near-by-building-hello-world')
assert.include(learnDir, 'oldneardev');
```

You should not have a `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const learnDir = await __helpers.getDirectory('learn-how-to-set-up-near-by-building-hello-world')
assert.notInclude(learnDir, 'neardev');
```

## 38

### --description--

Deploy your new contract file using the `dev-deploy` command like you did before. Wait for the command to finish, it will take a moment.

### --tests--

You should run `near dev-deploy build/hello-near.wasm` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /near\s+dev-deploy\s+build\/hello-near\.wasm/);
```

You should have a `neardev` folder as a result of deploying the contract

```js
await new Promise(res => setTimeout(res, 1000));
const learnDir = await __helpers.getDirectory('learn-how-to-set-up-near-by-building-hello-world')
assert.include(learnDir, 'neardev');
```

## 39

### --description--

Your contract should be deployed, and you should have a new `neardev` folder with the contract name and the account that deployed it. Initialize your new contract, here's a reminder of the syntax: `near call <contract_name> init --accountId <account_id>`

### --tests--

You should run `near call <contract_name> init --accountId <account_id>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`near\\s+call\\s+${id}\\s+init\\s+--accountId\\s+${id}`, 'g');
assert.match(lastCommand, re);
```

## 40

### --description--

Call the `viewGreeting` function on your new contract to make sure it has the correct initial message.

### --tests--

You should run `near view <contract_name> getGreeting` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`near\\s+view\\s+${id}\\s+getGreeting`, 'g');
assert.match(lastCommand, re);
```

## 41

### --description--

It works. You used the `call` command to initialize your contract. You can use it to run your `setGreeting` function as well. Here's an example:

```sh
near call <contract_name> setGreeting '{ "message": "Hello WORLD!" }' --accountId <account_id>
```

Use the `call` command to run your `setGreeting` function and change the `message` value on your contract to `Hello NEAR`.

### --tests--

You should run `near call <contract_name> setGreeting '{ "message": "Hello NEAR" }' --accountId <account_id>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`near\\s+call\\s+${id}\\s+setGreeting\\s+'\\s*{\\s*"message"\\s*:\\s*"Hello NEAR"\\s*}\\s*'`, 'g');
assert.match(lastCommand, re);
```

Your contract should currently have a `message` value of `Hello NEAR`

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/neardev/dev-account');
const output = await __helpers.getCommandOutput(`near view ${id} getGreeting`, 'learn-how-to-set-up-near-by-building-hello-world');
const { stdout } = output;
assert.match(stdout, /'Hello NEAR'/);
```

## 42

### --description--

You can see your log in there that it is changing the message. Run the `getGreeting` function again to make sure.

### --tests--

You should run `near view <contract_name> getGreeting`

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`near\\s+view\\s+${id}\\s+getGreeting`, 'g');
assert.match(lastCommand, re);
```

## 43

### --description--

It worked. Change the greeting one more time to `Hello NEAR!`

### --tests--

You should run `near call <contract_name> setGreeting '{ "message": "Hello NEAR!" }' --accountId <account_id>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`near\\s+call\\s+${id}\\s+setGreeting\\s+'\\s*{\\s*"message"\\s*:\\s*"Hello NEAR!"\\s*}\\s*'`, 'g');
assert.match(lastCommand, re);
```

Your contract should currently have a `message` value of `Hello NEAR`

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/neardev/dev-account');
const output = await __helpers.getCommandOutput(`near view ${id} getGreeting`, 'learn-how-to-set-up-near-by-building-hello-world');
const { stdout } = output;
assert.match(stdout, /'Hello NEAR!'/);
```

## 44

### --description--

You can see that a transaction took place to make the change to your contract. The transaction hash is in the terminal output at the end of that URL. View more info about the transaction in the terminal by running `near tx-status <hash> --accountId <account_id>`

### --tests--

You should run `near tx-status <hash> --accountId <account_id>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`near\\s+tx-status\\s+\\S\{44\}\\s+--accountId\\s+${id}`, 'g');
assert.match(lastCommand, re);
```

Your terminal output should include the transaction object after running the above command

```js
await new Promise(res => setTimeout(res, 1000));
const terminalOutput = await __helpers.getTerminalOutput();
assert.match(terminalOutput, /receipts_outcome/);
```

## 45

### --description--

There's all sorts of information about the transaction you made to change your greeting. The block it's in, the gas costs, even your `near.log` is in there. You should take a look at it.

View the help menu of the CLI tools again to see what else you can do.

### --tests--

You should run `near --help` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /near\s+--help/);
```

## 46

### --description--

Looks like you can see some infomation about accounts with `near state <account_id>`. View the info about the first account you created, the one in the `oldneardev` folder.

### --tests--

You should run `near state <account_id>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const oldId = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/oldneardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`near\\s+state\\s+${oldId}`, 'g');
assert.match(lastCommand, re);
```

The `<account_id>` should match the account name in the `oldneardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const oldId = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/oldneardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`${oldId}`, 'g');
assert.match(lastCommand, re);
```

## 47

### --description--

You've got a lot of coins. Check the state of your new account, the one in the `neardev` folder.

### --tests--

You should run `near state <account_id>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`near\\s+state\\s+${id}`, 'g');
assert.match(lastCommand, re);
```

The `<account_id>` should match the account name in the `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`${id}`, 'g');
assert.match(lastCommand, re);
```

## 48

### --description--

You can see the `formattedAmount` at the bottom. Both accounts should have about the same amounts. View the help menu again.

### --tests--

You should run `near --help` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /near\s+--help/);
```

## 49

### --description--

It looks like you can use the CLI to send tokens from one account to another with `near send <sender_id> <receiver_id> <amount>`. Send 20 tokens from your `oldneardev` account to the new one.

### --tests--

You should run `near send <sender_id> <receiver_id> 20` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const oldId = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/oldneardev/dev-account');
const id = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`near\\s+send\\s+${oldId}\\s+${id}\\s+20`, 'g');
assert.match(lastCommand, re);
```

The `<sender_id>` should match the account name in the `oldneardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const oldId = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/oldneardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`${oldId}`, 'g');
assert.match(lastCommand, re);
```

The `<reciever_id>` should match the account name in the `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`${id}`, 'g');
assert.match(lastCommand, re);
```

## 50

### --description--

Check the state of your newer account to see if it worked.

### --tests--

You should run `near state <account_id>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`near\\s+state\\s+${id}`, 'g');
assert.match(lastCommand, re);
```

The `<account_id>` should match the account name in the `neardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`${id}`, 'g');
assert.match(lastCommand, re);
```

## 51

### --description--

You should have 20 more coins in the amount at the bottom. Check the state of your old account.

### --tests--

You should run `near state <account_id>` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const oldId = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/oldneardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`near\\s+state\\s+${oldId}`, 'g');
assert.match(lastCommand, re);
```

The `<account_id>` should match the account name in the `oldneardev` folder

```js
await new Promise(res => setTimeout(res, 1000));
const oldId = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/oldneardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`${oldId}`, 'g');
assert.match(lastCommand, re);
```

## 52

### --description--

You are done with your contract. You created it from scratch and deployed it. There's an easier way to set this all up. Run `npm install -g create-near-app@4.0.0` in the terminal to install the `create-near-app` package.

### --tests--

You should run `npm install -g create-near-app@4.0.0` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /npm\s+(install|i)\s+((-g|--global)\s+create-near-app@4\.0\.0|create-near-app@4\.0\.0\s+(-g|--global))/);
```

## 53

### --description--

Next, run `npx create-near-app`. When prompted, select `JavaScript` for the language, `No frontend` for the frontend, `hello-near` for the project name, and enter `y` to install the dependencies right away. Wait for the command to finish, it will take a moment.

### --tests--

You should run `npx create-near-app` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /npx\s+create-near-app/);
```

You should be in the `learn-how-to-set-up-near-by-building-hello-world` directory in your terminal

```js
await new Promise(res => setTimeout(res, 1000));
const cwdFile = await __helpers.getCWD();
const cwd = cwdFile.split('\n').filter(Boolean).pop();
assert.include(cwd, 'learn-how-to-set-up-near-by-building-hello-world');
```

You should have a `hello-near` folder as a result of running the command

```js
await new Promise(res => setTimeout(res, 1000));
const learnDir = await __helpers.getDirectory('learn-how-to-set-up-near-by-building-hello-world')
assert.include(learnDir, 'hello-near');
```

## 54

### --description--

It created a `hello-near` folder for you. It has a contract, similar to the one you just created, in `client/src/contract.ts`. Open it if you want to take a look. Then, in the terminal, change to the new `hello-near` folder.

### --tests--

You should run `cd hello-near` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /cd\s+hello-near/);
```

You should be in the `hello-near` directory in your terminal

```js
await new Promise(res => setTimeout(res, 1000));
const cwdFile = await __helpers.getCWD();
const cwd = cwdFile.split('\n').filter(Boolean).pop();
assert.include(cwd, 'hello-near');
```

## 55

### --description--

When you are ready, run `npm run deploy` to build, deploy, and initialize the contract all in one step. You will be prompted, enter `y` or `n` to proceed.

### --tests--

You should run `npm run deploy` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /npm\s+run\s+deploy/);
```

You should be in the `hello-near` directory in your terminal

```js
await new Promise(res => setTimeout(res, 1000));
const cwdFile = await __helpers.getCWD();
const cwd = cwdFile.split('\n').filter(Boolean).pop();
assert.include(cwd, 'hello-near');
```

You should have a `hello-near/contract/neardev` folder as a result of deploying the contract

```js
await new Promise(res => setTimeout(res, 1000));
const dir = await __helpers.getDirectory('learn-how-to-set-up-near-by-building-hello-world/hello-near/contract')
console.log(dir);
assert.include(dir, 'neardev');
```

## 56

### --description--

This is a really easy way to get started with NEAR if you want to try it on your own. Run the `get_greeting` function on your newly deployed contract to make sure it worked. It's a `view` function and you can find the contract name in the new `contract/neardev` folder.

### --tests--

You should run `near view <contract_name> get_greeting`

```js
await new Promise(res => setTimeout(res, 1000));
const id = await __helpers.getFile('learn-how-to-set-up-near-by-building-hello-world/hello-near/contract/neardev/dev-account');
const lastCommand = await __helpers.getLastCommand();
const re = new RegExp(`near\\s+view\\s+${id}\\s+get_greeting`, 'g');
assert.match(lastCommand, re);
```

## 57

### --description--

You didn't have to build and deploy separately, or initialize the contract. It was all automatic.

This is the last step, feel free to play with your contracts and accounts. When you are ready to finish, type `goodbye` in the terminal.

### --tests--

You should enter `goodbye` in the terminal

```js
await new Promise(res => setTimeout(res, 1000));
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /goodbye/);
```

## --fcc-end--
