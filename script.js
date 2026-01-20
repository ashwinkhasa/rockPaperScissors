const home = document.querySelector(".home-screen");
const gameScreen = document.querySelector(".game-screen");
const startButton = document.querySelector(".start-button");
const restart = document.querySelector(".play-again-button");
const choices = document.querySelector(".choice-container");
const scores = document.getElementsByClassName("score-value");
const winner = document.querySelector(".winner");
const winnerScreen = document.querySelector(".game-over");

let userScore = scores[0];
let compScore = scores[1];

startButton.addEventListener("click", moveToGameScreen);

//updates DOM to start game
function moveToGameScreen() {
    home.style.display = "none";
    gameScreen.style.display = "flex";
}

//updates DOM to show winner
function moveToWinnerScreen() {
    gameScreen.style.display = "none";
    winnerScreen.style.display = "block";
}

//updates DOM to start new game
function moveToHomeScreen() {
    gameScreen.style.display = "none";
    winnerScreen.style.display = "none";
    winner.innerHTML = "&nbsp";
    home.style.display = "flex";
    resetScores();
}

//reset scores for a new game
function resetScores() {
    userScore.textContent = 0;
    compScore.textContent = 0;
}

//updates DOM when user wins a round
function userWonRound(compChoice) {
    let userCount = Number(userScore.textContent);
    userCount++;
    userScore.textContent = userCount;
    winner.textContent = `Won! Computer chose ${compChoice}`;
    winner.style.color = "gold";

    //condition for GAME-OVER
    if (userCount == 5) {
        moveToWinnerScreen();
        winnerScreen.firstElementChild.textContent = `Yay! You Won `;
        winnerScreen.firstElementChild.style.color = "Gold";
    }
}

//updates DOM when computer wins a round
function compWonRound(compChoice) {
    let compCount = Number(compScore.textContent);
    compCount++;
    compScore.textContent = compCount;
    winner.textContent = `Lost! Computer chose ${compChoice}.`;
    winner.style.color = "red";

    //condition for GAME-OVER
    if (compCount == 5) {
        moveToWinnerScreen();
        winnerScreen.firstElementChild.textContent = `Oops! Computer Won`;
        winnerScreen.firstElementChild.style.color = "red";
    }
}

//genrates computer choice
function findCompChoice() {
    let options = ["R", "P", "S"];
    const index = Math.floor(Math.random() * options.length);
    return options[index];
}

//find winner by comparing choices of user and computer
function findWinner(userChoice) {
    let compChoice = findCompChoice();

    if (userChoice == compChoice) {
        winner.textContent = `Tied! Both chose ${userChoice}`;
        winner.style.color = "white";
    } else if (
        (userChoice == "R" && compChoice == "S") ||
        (userChoice == "P" && compChoice == "R") ||
        (userChoice == "S" && compChoice == "P")
    ) {
        userWonRound(compChoice);
    } else {
        compWonRound(compChoice);
    }
}

choices.addEventListener("click", (e) => {
    if (e.target.classList.contains("choice")) {
        const value = e.target.textContent;
        findWinner(value);
    }
});

restart.addEventListener("click", moveToHomeScreen);
