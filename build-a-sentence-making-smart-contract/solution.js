import { NearBindgen, initialize, view, call, near, Vector } from 'near-sdk-js';

@NearBindgen({ requireInit: true })
export class SentenceMaker {
  constructor() {
    this.sentence = '';
    this.words = new Vector('words');
  }

  @initialize({})
  init({ word }) {
    const id = near.predecessorAccountId();
    this.words.push({ id, word });
    this.sentence += word;

    return `Sentence initialized with '${word}'`;
  }

  @call({})
  addWord({ word }) {
    if (this.sentence.endsWith('.') || this.sentence.endsWith('?') || this.sentence.endsWith('!')) {
      return 'The sentence is complete, more words cannot be added';
    }

    if (word.includes(' ')) {
      return 'You cannot add anything with spaces';
    }

    const wordsArr = this.words.toArray()
    const lastWord = wordsArr[wordsArr.length - 1];
    const id = near.predecessorAccountId();
    if (lastWord?.id === id) {
      return `You cannot add two words in a row`;
    } 

    near.log(id);
    near.log(word);
    this.words.push({ id, word });
    this.sentence += ` ${word}`;

    return 'Your word was added';
  }

  @view({})
  viewSentence() {
    return this.sentence;
  }

  @call({ privateFunction: true })
  viewWords() {
    return this.words.toArray();
  }
}
