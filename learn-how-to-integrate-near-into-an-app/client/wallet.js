import { WalletConnection, keyStores, connect, Contract } from "near-api-js";

const keyStore = new keyStores.BrowserLocalStorageKeyStore();

const connectionConfig = {
  keyStore,
  networkId: 'testnet',
  nodeUrl: 'https://rpc.testnet.near.org',
  walletUrl: "https://testnet.mynearwallet.com"
};

const nearConnection = await connect(connectionConfig);

const contractId = "word-guess.tshaun.testnet";

const contractAccount = await nearConnection.account("tshaun.testnet");

export class Wallet {
  walletConnection;
  contract;
  constructor() {
    this.walletConnection = new WalletConnection(nearConnection, "word-guess");
    this.contract = new Contract(contractAccount, contractId, {
      viewMethods: ['viewHints', 'viewGuesses'],
      changeMethods: ['makeGuess']
    });
  }

  signIn() {
    this.walletConnection.
    this.walletConnection.requestSignIn({
      contractId,
    });
  }

  signOut() {
    this.walletConnection.signOut();
  }

  async call({ method, args = {} }) {
    const response = await this.contract[method](args);
    return response;
  }
}