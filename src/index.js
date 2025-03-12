// Create your game here!
const app = document.getElementById("app");
app.style.display = "flex";
app.style.flexDirection = "column";
app.style.justifyContent = "center";
app.style.alignItems = "center";
const newEl = (el) => document.createElement(el);

const directions = newEl("h1");
const subtitle = newEl("p");
subtitle.style.marginTop = "0";
directions.textContent = "Guess the Number!";
subtitle.textContent = `Or not, I'm not your mom or anything...`;

app.appendChild(directions);
app.appendChild(subtitle);

const startButton = newEl("button");
startButton.textContent = "Start";
app.appendChild(startButton);
startButton.addEventListener("click", () => {
  playGame(25);
});

function playGame(size) {
  let userGuesses = [];
  const mysteryNum = Math.floor(Math.random() * size) + 1;
  const gameboard = newEl("table");
  app.appendChild(gameboard);

  startButton.remove();

  createGameboard();
  const guessButton = createGuessButton();
  app.appendChild(guessButton);

  function createGameboard(victory = false) {
    const xySize = Math.sqrt(size);

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
  }

  function clearGameboard() {
    while (gameboard.firstChild) {
      gameboard.removeChild(gameboard.firstChild);
    }
  }

  function promptUser() {
    const question = `Enter Number Value Between 1 and ${size}: `;
    const guess = window.prompt(question, 0);
    const guessInt = parseInt(guess);

    if (isNaN(guessInt)) {
      alert(`${guess} is not a number`);
    } else if (guessInt < 1 || guessInt > size) {
      alert(`Your guess (${guess}) is not in the range.`);
      return false;
    }

    if (guessInt === mysteryNum) {
      clearGameboard();
      createGameboard(true);
      app.removeChild(guessButton);
      app.appendChild(tryAgainButton());
      alert("You have chosen the correct number!");
      return;
    } else if (guessInt > mysteryNum) {
      alert("Lower");
    } else if (guessInt < mysteryNum) {
      alert("Higher");
    }

    userGuesses.push(parseInt(guess));

    clearGameboard();
    createGameboard();
  }

  function createGuessButton() {
    const button = newEl("button");
    button.textContent = "Make a Guess";
    button.style.marginTop = "1rem";
    button.addEventListener("click", () => {
      promptUser();
    });
    return button;
  }

  function tryAgainButton() {
    const tryAgain = newEl("button");
    tryAgain.textContent = "Try Again";
    tryAgain.style.marginTop = "1rem";
    tryAgain.addEventListener("click", () => {
      location.reload();
    });
    return tryAgain;
  }
}
