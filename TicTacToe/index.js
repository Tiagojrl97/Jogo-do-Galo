let newGameBtn = document.querySelector(".newGame");
let popup = document.querySelector(".popup");
let restartBtn = document.querySelector(".restart");
const cells = document.querySelectorAll(".cell");
const tabuleiro = document.querySelector(".tabuleiro");
let title = document.querySelector(".title");
let currentPlayer = "X";
let gameEnded = false;
let winsO = 0;
let winsX = 0;
let winsOElement = document.querySelector(".wins-o");
let winsXElement = document.querySelector(".wins-x");

newGameBtn.addEventListener("click", startNewGame);
restartBtn.addEventListener("click", restartGame);

function startNewGame() {
  newGameBtn.style.display = "none";
  popup.style.display = "none";
  tabuleiro.style.display = "grid";
  restartBtn.style.display = "block";
  title.style.display = "block";
  winsXElement.style.display = "flex";
  winsOElement.style.display = "flex";

  cells.forEach((cell) => {
    cell.style.display = "flex";
    cell.addEventListener("click", cellClick);
  });
}

function cellClick(event) {
  const clickedCell = event.target;

  if (clickedCell.textContent !== "") {
    return;
  }
  if (gameEnded) {
    return;
  }

  clickedCell.textContent = currentPlayer;

  if (checkWin()) {
    endGame(`O jogador ${currentPlayer} venceu!`);
    return;
  }

  if (checkDraw()) {
    endGame("O jogo terminou empatado!");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Linhas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Colunas
    [0, 4, 8],
    [2, 4, 6], // Diagonais
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;

    if (
      cells[a].textContent === currentPlayer &&
      cells[b].textContent === currentPlayer &&
      cells[c].textContent === currentPlayer
    ) {
      if (currentPlayer === "X") {
        winsX++;
        winsXElement.textContent = `Vitórias X: ${winsX}`;
      } else {
        winsO++;
        winsOElement.textContent = `Vitórias O: ${winsO}`;
      }
      return true;
    }
  }

  return false;
}

function checkDraw() {
  for (let cell of cells) {
    if (cell.textContent === "") {
      return false;
    }
  }
  return true;
}

function endGame(message) {
  gameEnded = true;
  alert(message);
  if (winsX === 3 || winsO === 3) {
    restartGame();
    alert(`O jogador ${currentPlayer} venceu o jogo!`)
  }
}

function restartGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
  });

  currentPlayer = "X";
  gameEnded = false;
  if (winsO === 3 || winsX === 3) {
    winsX = "";
    winsO = "";
    winsXElement.textContent = `Vitórias X: ${winsX}`;
    winsOElement.textContent = `Vitórias O: ${winsO}`;
  }
}
