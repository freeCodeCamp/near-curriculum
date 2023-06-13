import { Vector, near, view, call, initialize, NearBindgen } from 'near-sdk-js';

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
      this.guesses.push({ guesser, guess });

      if (guess === this.secretWord) {
        return `You got it! The secret word is '${this.secretWord}'`;
      } else {
        return `Sorry, '${guess}' is not the secret word`;
      }
    }
  }
}
