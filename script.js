const home = document.getElementsByClassName("home-screen")[0];
const gameScreen = document.getElementsByClassName("game-screen")[0];
const startButton = document.getElementsByClassName("start-button")[0];
const restart = document.getElementsByClassName("play-again-button")[0];
const choices = document.querySelectorAll(".choice-container")[0];
const scores = document.getElementsByClassName("score-value");
const winner = document.getElementsByClassName("winner")[0];
const winnerScreen = document.getElementsByClassName("game-over")[0];

let userScore = scores[0];
let compScore = scores[1];

startButton.addEventListener("click", (e) => {
    home.style.display = "none";
    gameScreen.style.display = "flex";
});

function findWinner(userChoice) {
    let choices = ["R", "P", "S"];
    const index = Math.floor(Math.random() * choices.length);
    const compChoice = choices[index];

    if (userChoice == compChoice) {
        winner.textContent = `Tied!`;
        winner.style.color = "white";
    } else if (
        (userChoice == "R" && compChoice == "S") ||
        (userChoice == "P" && compChoice == "R") ||
        (userChoice == "S" && compChoice == "P")
    ) {
        let userCount = userScore.textContent;
        userCount++;
        userScore.textContent = userCount;
        winner.textContent = `Won! Computer chose ${compChoice}`;
        winner.style.color = "gold";
        if (userCount == 5) {
            gameScreen.style.display = "none";
            winnerScreen.firstElementChild.textContent = `Yay! You Won `;
            winnerScreen.firstElementChild.style.color = "Gold";
            winnerScreen.style.display = "block";
        }
    } else {
        let compCount = compScore.textContent;
        compCount++;
        compScore.textContent = compCount;
        winner.textContent = `Lost! Computer chose ${compChoice}.`;
        winner.style.color = "red";
        if (compCount == 5) {
            gameScreen.style.display = "none";
            winnerScreen.firstElementChild.textContent = `Oops! Computer Won`;
            winnerScreen.style.display = "block";
            winnerScreen.firstElementChild.style.color = "red";
        }
    }
}

choices.addEventListener("click", (e) => {
    if (e.target.classList.contains("choice")) {
        const value = e.target.textContent;
        findWinner(value);
    }
});

restart.addEventListener("click", () => {
    home.style.display = "flex";
    gameScreen.style.display = "none";
    winnerScreen.style.display = "none";
    winner.innerHTML = "&nbsp";
    userScore.textContent = 0;
    compScore.textContent = 0;
});
