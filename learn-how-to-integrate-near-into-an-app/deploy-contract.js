import {readFileSync } from 'fs';
import { contractAccount } from './my-accounts.js';

const contractFile = readFileSync('./build/word-guess.wasm');

const response = await contractAccount.deployContract(contractFile);
console.log(response);
