const readline = require("readline");

/********************************* CONSTANTS *********************************/
const VALID_MOVES = {
  r: {
    name: "Rock",
    winsAgainst: "s",
  },
  p: {
    name: "Paper",
    winsAgainst: "r",
  },
  s: {
    name: "Scissors",
    winsAgainst: "p",
  },
};

/********************************* GAME DATA *********************************/
let wins = 0;
let losses = 0;
let ties = 0;

/* DO NOT CHANGE THE CODE ABOVE */

/***************************** HELPER FUNCTIONS ******************************/
function printHelp(cmd) {
  if (cmd === "h") {
    console.log("\nHelp:\n");
    console.log("  Type 'r' for Rock");
    console.log("  Type 'p' for Paper");
    console.log("  Type 's' for Scissors");
    console.log("  Type 'q' to quit");
    console.log("  Type 'h' for a list of valid commands\n");
  } else if (cmd === "q") {
    rl.close();
    return;
  }
}

function getWinner(move1, move2) {
  if (move1 === move2) {
    return "tie";
  } else if (VALID_MOVES[move1].winsAgainst === move2) {
    return "player";
  } else {
    return "cpu";
  }
}

function getCPUMove() {
  const validMoveKeys = Object.keys(VALID_MOVES);
  const randomIndex = Math.floor(Math.random() * validMoveKeys.length);
  return validMoveKeys[randomIndex];
}

function processMove(cmd, cpu) {
  const winner = getWinner(cmd, cpu);

  if (winner === "tie") {
    console.log("You tie.\n");
    ties++;
  } else if (winner === "player") {
    console.log("You win!\n");
    wins++;
  } else {
    console.log("You lose...\n");
    losses++;
  }
}

/******************************* MAIN FUNCTION *******************************/
function promptInput(rl) {
  console.log(`${wins} wins - ${losses} losses - ${ties} ties`);
  rl.question("> ", (cmd) => {
    cmd = cmd.toLowerCase();

    if (cmd === "h") {
      printHelp(cmd);
    } else if (cmd === "q") {
      rl.close();
      return;
    } else if (VALID_MOVES[cmd]) {
      const cpu = getCPUMove();

      console.log(`You pick ${cmd}, computer picks ${cpu}.`);

      processMove(cmd, cpu);
    } else {
      console.log("\nInvalid command.\n");
      printHelp(cmd); 
    }

    promptInput(rl);
  });
}
/****************************** INITIALIZE GAME ******************************/
function initializeGame() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  console.log("Welcome to Rock/Paper/Scissors\n");
  console.log("  Type 'r' for Rock");
  console.log("  Type 'p' for Paper");
  console.log("  Type 's' for Scissors");
  console.log("  Type 'q' to quit");
  console.log("  Type 'h' for a list of valid commands\n");

  promptInput(rl);
}

// start the game if running this file directly, `node game.js`
// do not start the game if running test specs
if (typeof require !== "undefined" && require.main === module) {
  initializeGame();
}

/**************************************************************************/
/* DO NOT CHANGE THE CODE BELOW */
module.exports = {
  printHelp,
  getWinner,
  getCPUMove,
  processMove,
  promptInput,
};
