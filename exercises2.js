let computerMove = "";
let playerMove = "";

function computerMoveF() {
  let random = Math.random();
  if (random >= 0 && random < 1 / 3) {
    computerMove = "scissors";
  } else if (random >= 1 / 3 && random < 2 / 3) {
    computerMove = "rock";
  } else {
    computerMove = "paper";
  }
}

let result = JSON.parse(localStorage.getItem("score")) || {
  draw: 0,
  win: 0,
  loss: 0,
};
let resultHTML = document.querySelector(".result");

function playGame() {
  computerMoveF();
  document.querySelector(
    ".playing"
  ).innerHTML = `<img class="${playerMove}1 diff diff2" src=${playerMove}.svg> <img class="comp diff1 diff3" src=${computerMove}.svg>`;
  if (computerMove === playerMove) {
    resultHTML.innerHTML = "Draw";
    resultHTML.classList.remove("win");
    resultHTML.classList.remove("loss");
  } else if (
    (computerMove === "scissors" && playerMove === "paper") ||
    (computerMove === "rock" && playerMove === "scissors") ||
    (computerMove === "paper" && playerMove === "rock")
  ) {
    result.loss += 1;
    resultHTML.classList.add("loss");
    resultHTML.classList.remove("win");
    resultHTML.innerHTML = "Loss";
  } else if (
    (computerMove === "scissors" && playerMove === "rock") ||
    (computerMove === "rock" && playerMove === "paper") ||
    (computerMove === "paper" && playerMove === "scissors")
  ) {
    result.win += 1;
    resultHTML.classList.add("win");
    resultHTML.classList.remove("loss");
    resultHTML.innerHTML = "Win";
  }
  myWins.innerHTML = `${result.win}`;
  compWins.innerHTML = `${result.loss}`;
  if (computerMove === "scissors") {
    document.querySelector(".comp").classList.add("scissorsComp");
  } else {
    document.querySelector(".comp").classList.remove("scissorsComp");
  }
  if (result.win === 3) {
    setTimeout(() => {
      result.win = 0;
      result.loss = 0;
      document.querySelector(".main").classList.remove("hidden");
      document.querySelector(".winning").classList.add("visibleW");
    }, 2000);
    localStorage.setItem("score", JSON.stringify(result));
  } else if (result.loss === 3) {
    setTimeout(() => {
      result.win = 0;
      result.loss = 0;
      document.querySelector(".main").classList.remove("hidden");
      document.querySelector(".lossing").classList.add("visibleL");
    }, 2000);
    localStorage.setItem("score", JSON.stringify(result));
  }
  if (result.win === 3 || result.loss === 3) {
    document.querySelector(".diff").classList.add("slowmotion");
    document.querySelector(".diff1").classList.add("slowmotion");
    document.querySelector(".diff1").classList.remove("diff3");
    document.querySelector(".diff").classList.remove("diff2");
    setTimeout(() => {
      resetScore();
    }, 2000);
  }

  document.querySelector(".resetButtonW").addEventListener("click", () => {
    resetScore();
    myWins.innerHTML = `${result.win}`;
    compWins.innerHTML = `${result.loss}`;
    document.querySelector(".main").classList.add("hidden");
    document.querySelector(".winning").classList.remove("visibleW");
  });
  document.querySelector(".resetButtonL").addEventListener("click", () => {
    resetScore();
    myWins.innerHTML = `${result.win}`;
    compWins.innerHTML = `${result.loss}`;
    document.querySelector(".main").classList.add("hidden");
    document.querySelector(".lossing").classList.remove("visibleL");
  });
  localStorage.setItem("score", JSON.stringify(result));
}

function resetScore() {
  result.win = 0;
  result.loss = 0;
  document.querySelector(".playing").innerHTML = "";
  document.querySelector(".result").innerHTML = "";
  localStorage.setItem("score", JSON.stringify(result));
}
document.querySelector(".resetButton").addEventListener("click", () => {
  if (result.win === 3 || result.loss === 3) {
    setTimeout(() => {
      resetScore();
    }, 2000);
    return;
  }
  resetScore();
  myWins.innerHTML = `${result.win}`;
  compWins.innerHTML = `${result.loss}`;
});

let myWins = document.querySelector(".myWins");
let compWins = document.querySelector(".compWins");
myWins.innerHTML = `${result.win}`;
compWins.innerHTML = `${result.loss}`;

document.querySelector(".rock").addEventListener("click", () => {
  if (result.win < 3 && result.loss < 3) {
    playerMove = "rock";
    playGame();
  } else {
    return;
  }
});

document.querySelector(".scissors").addEventListener("click", () => {
  if (result.win < 3 && result.loss < 3) {
    playerMove = "scissors";
    playGame();
  } else {
    return;
  }
});

document.querySelector(".paper").addEventListener("click", () => {
  if (result.win < 3 && result.loss < 3) {
    playerMove = "paper";
    playGame();
  } else {
    return;
  }
});
