// ----------------------------------
// IMPORT YOUR WALLET CLASS

// ----------------------------------
import {Buffer} from "buffer";
import './style.css'

window.Buffer = Buffer;
window.global = {
  Buffer: Buffer,
  fetch: (...args) => fetch(...args)
}

const guessIn = document.querySelector("#guess");
const hintsOl = document.querySelector("#hints");
const guessBtn = document.querySelector("#guess-btn");
const guessesOl = document.querySelector("#guesses");
const connectWalletBtn = document.querySelector("#connect-wallet");
const responseP = document.querySelector('#response');
const hintsBtn = document.querySelector("#hints-btn");

// -------------------------
// CREATE A WALLET INSTANCE

// -------------------------

window.onload = async () => {
  // -----------------------------------------------------
  // CHECK IF SIGNED IN
  const isSignedIn = null;
  // -----------------------------------------------------

  if (isSignedIn) {
    connectWalletBtn.innerHTML = "Disconnect Wallet";
  } else {
    connectWalletBtn.innerHTML = "Connect Wallet";
  }
  
  // ---------------------------------
  // GET THE GUESSES
  // const guesses = await viewGuesses();
  const guesses = null;
  // ---------------------------------
  for (const guess of guesses) {
    const li = document.createElement('li');
    li.innerText = `${guess.guesser} guessed '${guess.guess}'`;
    guessesOl.append(li);
  }
};

connectWalletBtn.addEventListener('click', () => {
  // -----------------------------------------------------
  // CHECK IF SIGNED IN
  const isSignedIn = null;
  // -----------------------------------------------------
  if (isSignedIn) {
    // --------------
    // SIGN OUT

    // --------------
    connectWalletBtn.innerHTML = "Connect Wallet";
  } else {
    // -------------
    // SIGN IN

    // -------------
    connectWalletBtn.innerHTML = "Disconnect Wallet";
  }
});

guessBtn.addEventListener('click', async () => {
  const guess = guessIn.value;
  // ---------------------------------
  // MAKE A GUESS
  const resp = null;
  // ---------------------------------
  responseP.innerText = resp;
});

hintsBtn.addEventListener('click', async () => {
  // -----------------------------
  // GET THE HINTS
  const hints = null;
  // -----------------------------
  for (const hint of hints) {
    const li = document.createElement("li");
    li.innerText = hint;
    hintsOl.append(li);
  }
});
