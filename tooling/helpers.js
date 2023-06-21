import { Babeliser } from 'babeliser';
import os from 'os';
import { readdirSync } from 'fs';

export async function babeliser(codeString) {
  return new Babeliser(codeString, {
    plugins: [ 'decorators' ]
  });
}

export async function homeDir() {
  return os.homedir();
}

export async function getAbsoluteDir(path) {
  return readdirSync(path);
}
