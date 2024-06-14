import { Contract } from "near-api-js";
import { contractAccount, contractName } from "./my-accounts.js";

const contract = new Contract(contractAccount, contractName, {
  changeMethods: ['init']
});

const response = await contract.init({"secretWord": "web3"});
console.log(response);
