import { Babeliser } from 'babeliser';

export async function babeliser(codeString) {
  return new Babeliser(codeString, {
    plugins: [ 'decorators' ]
  });
}
