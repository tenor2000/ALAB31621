// Create your game here!
const app = document.getElementById("app");
app.style.display = "flex";
app.style.justifyContent = "center";

app.style.alignItems = "center";
app.style.height = "100vh";
app.style.width = "100vw";
const newEl = (el) => document.createElement(el);

const startButton = newEl("button");
startButton.textContent = "Start";
app.appendChild(startButton);
startButton.addEventListener("click", () => {
  playGame(25);
});

function playGame(size) {
  let userGuesses = [];
  const mysteryNum = Math.floor(Math.random() * size) + 1;

  while (true) {
    createGameboard();
    console.log("Looping");

    const userGuess = promptUser();
    const guessInt = parseInt(userGuess);

    if (isNaN(guessInt)) {
      alert(`${userGuess} is not a number`);
      continue;
    } else if (guessInt < 1 || guessInt > size) {
      alert(`Your guess: ${userGuess} is not in the range`);
      continue;
    }

    if (guessInt === mysteryNum) {
      alert(`You have guessed the correct answer`);
      clearGameboard();
      break;
    } else if (guessInt > mysteryNum) {
      alert("Lower");
    } else if (guessInt < mysteryNum) {
      alert("Higher");
    }

    userGuesses.push(parseInt(userGuess));

    clearGameboard();
  }

  createGameboard(true);

  function createGameboard(victory = false) {
    const xySize = Math.sqrt(size);

    const gameboard = newEl("table");

    let curr = 1;

    for (let i = 0; i < xySize; i++) {
      const row = newEl("tr");

      for (let j = 0; j < xySize; j++) {
        const cell = newEl("td");
        cell.textContent = curr;
        if (userGuesses.includes(curr)) {
          cell.style.backgroundColor = "red";
        } else if (victory && curr == mysteryNum) {
          cell.style.backgroundColor = "lightgreen";
        }
        curr++;
        row.appendChild(cell);
      }
      gameboard.appendChild(row);
    }

    app.appendChild(gameboard);
  }

  function clearGameboard() {
    while (app.firstChild) {
      app.removeChild(app.firstChild);
    }
  }

  function promptUser() {
    const question = `Enter Number Value Between 1 and ${size}: `;
    const guess = window.prompt(question, 0);

    return guess;
  }
}
