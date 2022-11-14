import { NearBindgen, call, view, initialize, Vector } from "near-sdk-js";

@NearBindgen({ requireInit: true })
export class WordGuess {
  constructor() {
    this.secretWord = '';
    this.guesses = []; // new Vector('guesses');
    this.hints = []; // new Vector('hints');
  }

  @initialize({ privateFunction: true })
  init({ secretWord }) {
    this.secretWord = secretWord;
    return `The secret word has been set to '${secretWord}'`;
  }

  @view({ privateFunction: true })
  viewSecretWord() {
    return this.secretWord;
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
    const lastGuess = this.guesses[this.guesses.length-1];
    if (lastGuess === this.secretWord) {
      return `This game is finished. The secret word was '${this.secretWord}'`;
    } else {
      this.guesses.push(guess);

      if (guess === this.secretWord) {
        return `You got it! The secret word was '${this.secretWord}'`;
      } else {
        return `Sorry, '${guess}' is not the secret word`;
      }
    }
  }

  @call({ privateFunction: true })
  addHint({ hint }) {
    this.hints.push(hint);
  }
}
