# NEAR - Learn How to Set Up NEAR by Building a Hello World Smart Contract

## 1

### --description--

Welcome to the second NEAR project! For the duration of this project, you will be working in the `learn-near-smart-contracts-by-building-a-word-guessing-game/` directory. Start by changing into that directory in the terminal.

If the tests don't run automatically, trash the bash terminal and open a new bash terminal.

### --tests--

test text

```js
assert(false);
```

## 2

### --description--

add export class WordGuess

### --tests--

test text

```js
assert(false);
```

## 3

### --description--

import near bindgen

### --tests--

test text

```js
assert(false);
```

## 4

### --description--

add @NearBindgen({})

### --tests--

test text

```js
assert(false);
```

## 5

### --description--

add constructor() {}

### --tests--

test text

```js
assert(false);
```

## 6

### --description--

add this.secretWord = '';

### --tests--

test text

```js
assert(false);
```

## 7

### --description--

import initialize

### --tests--

test text

```js
assert(false);
```

## 8

### --description--

add @initialize({})

### --tests--

test text

```js
assert(false);
```

## 9

### --description--

add init({ secretWord })

### --tests--

test text

```js
assert(false);
```

## 10

### --description--

add this.secretWord = secretWord;

### --tests--

test text

```js
assert(false);
```

## 11

### --description--

add return `The secret word has been set to '${secretWord}'`;

### --tests--

test text

```js
assert(false);
```

## 12

### --description--

add { requireInit: true }

### --tests--

test text

```js
assert(false);
```

## 13

### --description--

import @view

### --tests--

test text

```js
assert(false);
```

## 14

### --description--

add @view + viewSecretWord({}) {}

### --tests--

test text

```js
assert(false);
```

## 15

### --description--

add return this.secretWord;

### --tests--

test text

```js
assert(false);
```

## 16

### --description--

npm run build:word-guess

### --tests--

test text

```js
assert(false);
```

## 17

### --description--

near dev-deploy build/.wasm

### --tests--

test text

```js
assert(false);
```

## 18

### --description--

near view viewSecretWord - not initialized

### --tests--

test text

```js
assert(false);
```

## 19

### --description--

near call init '{"secretWord":"test"}'

### --tests--

test text

```js
assert(false);
```

## 20

### --description--

near view viewSecretWord - now it works

### --tests--

test text

```js
assert(false);
```

## 21

### --description--

add import call

### --tests--

test text

```js
assert(false);
```

## 22

### --description--

add @call({}) + addHint({ hint }) {}

### --tests--

test text

```js
assert(false);
```

## 23

### --description--

add this.hints.push(hint)

### --tests--

test text

```js
assert(false);
```

## 24

### --description--

add return 'Your hint was added'

### --tests--

test text

```js
assert(false);
```

## 25

### --description--

add @view + viewHints() {}

### --tests--

test text

```js
assert(false);
```

## 26

### --description--

add return this.hints

### --tests--

test text

```js
assert(false);
```

## 27

### --description--

npm run build:word-guess

### --tests--

test text

```js
assert(false);
```

## 28

### --description--

near dev-deploy .wasm

### --tests--

test text

```js
assert(false);
```

## 29

### --description--

near view viewSecretWord - no panic cause it still has the state

### --tests--

test text

```js
assert(false);
```

## 30

### --description--

near call addHint - cannot push to undefined

### --tests--

test text

```js
assert(false);
```

## 31

### --description--

near call init - cannot reinitialize

### --tests--

test text

```js
assert(false);
```

## 32

### --description--

mv neardev-1

### --tests--

test text

```js
assert(false);
```

## 33

### --description--

near dev-deploy .wasm - it created a new neardev

### --tests--

test text

```js
assert(false);
```

## 34

### --description--

near viewSecretWord - not initialized

### --tests--

test text

```js
assert(false);
```

## 35

### --description--

near call init '{ "secretWord": "freeCodeCamp" }' - use neardev-1

### --tests--

test text

```js
assert(false);
```

## 36

### --description--

near viewSecretWord

### --tests--

test text

```js
assert(false);
```

## 37

### --description--

near viewHints

### --tests--

test text

```js
assert(false);
```

## 38

### --description--

near call addHint {"hint":"best coding site"}

### --tests--

test text

```js
assert(false);
```

## 39

### --description--

near viewHints - shows best coding site

### --tests--

test text

```js
assert(false);
```

## 40

### --description--

near call addHint {"hint":"it's free"} with neardev-1

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

add { privateFunction: true } to addHint

### --tests--

test text

```js
assert(false);
```

## 43

### --description--

npm run build:word-guess

### --tests--

test text

```js
assert(false);
```

## 44

### --description--

near dev-deploy .wasm

### --tests--

test text

```js
assert(false);
```

## 45

### --description--

near view hints - they're still there

### --tests--

test text

```js
assert(false);
```

## 46

### --description--

near call addHint {"hint":"it has 12 letters"} with neardev-1 - panicked

### --tests--

test text

```js
assert(false);
```

## 47

### --description--

near call addHintnear call addHint {"hint":"it has 12 letters"} with neardev - it works

### --tests--

test text

```js
assert(false);
```

## 48

### --description--

near viewHints

### --tests--

test text

```js
assert(false);
```

## 49

### --description--

add { privateFunction: true } to init

### --tests--

test text

```js
assert(false);
```

## 50

### --description--

add { privateFunction: true } to viewSecretWord

### --tests--

test text

```js
assert(false);
```

## 51

### --description--

add this.guesses = []

### --tests--

test text

```js
assert(false);
```

## 52

### --description--

add @view({}) + viewGuesses

### --tests--

test text

```js
assert(false);
```

## 53

### --description--

add return this.guesses

### --tests--

test text

```js
assert(false);
```

## 54

### --description--

add @call({}) + makeGuess({ guess })

### --tests--

test text

```js
assert(false);
```

## 55

### --description--

add const lastGuess

### --tests--

test text

```js
assert(false);
```

## 56

### --description--

add if (lastGuess === this.secretWord) {}

### --tests--

test text

```js
assert(false);
```

## 57

### --description--

add return `This game is finished. The secret word was '${this.secretWord}'`;

### --tests--

test text

```js
assert(false);
```

## 58

### --description--

add else {}

### --tests--

test text

```js
assert(false);
```

## 59

### --description--

add this.guesses.push(guess)

### --tests--

test text

```js
assert(false);
```

## 60

### --description--

add if(guess === secretWord) {}

### --tests--

test text

```js
assert(false);
```

## 61

### --description--

add return `You got it! The secret word was '${this.secretWord}'`;

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

add return `Sorry, '${guess}' is not the secret word`;

### --tests--

test text

```js
assert(false);
```

## 64

### --description--

npm run build:word-guess

### --tests--

test text

```js
assert(false);
```

## 65

### --description--

mv neardev -> neardev-2 - because you added a new state...

### --tests--

test text

```js
assert(false);
```

## 66

### --description--

near dev-deploy .wasm

### --tests--

test text

```js
assert(false);
```

## 67

### --description--

near call init '{  }' with neardev-2 - doesn't work

### --tests--

test text

```js
assert(false);
```

## 68

### --description--

near call init '{}' with neardev - works

### --tests--

test text

```js
assert(false);
```

## 69

### --description--

near view viewSecretWord with neardev-2 - doesn't work

### --tests--

test text

```js
assert(false);
```

## 70

### --description--

near viewSecretWord with neardev

### --tests--

test text

```js
assert(false);
```

## 71

### --description--

near call addHint with neardev

### --tests--

test text

```js
assert(false);
```

## 72

### --description--

near call addGuess 

### --tests--

test text

```js
assert(false);
```

## --fcc-end--
