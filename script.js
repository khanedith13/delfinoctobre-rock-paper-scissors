let userScore = 0;
let computerScore = 0;
let gameNumber = 1;

let userHistory = {
    rock: 0,
    paper: 0,
    scissor: 0
};

function getComputerChoice(userChoice) {
    const choices = ["rock", "paper", "scissor"];

    // check last user move
    const lastMove = userHistory.lastMove;

    // detect repeat
    const isRepeat = lastMove === userChoice;

    // update last move
    userHistory.lastMove = userChoice;

    // 🎲 RULE: always random if repeat OR "unpredictable behavior"
    if (isRepeat || userHistory[userChoice] >= 2) {
        return choices[Math.floor(Math.random() * 3)];
    }

    // otherwise still random (as per your request = ALWAYS random overall)
    return choices[Math.floor(Math.random() * 3)];
}

function play(userChoice) {
    userHistory[userChoice]++;

    const computerChoice = getComputerChoice();

    const resultDiv = document.getElementById("result");
    const userEl = document.getElementById("user_choice");
    const compEl = document.getElementById("computer_choice");

    userEl.textContent = emoji(userChoice);
    compEl.textContent = emoji(computerChoice);

    // animation reset
    userEl.classList.remove("choice-animate");
    compEl.classList.remove("choice-animate");
    void userEl.offsetWidth;

    userEl.classList.add("choice-animate");
    compEl.classList.add("choice-animate");

    resultDiv.classList.remove("bounce", "shake");

    let resultText = "";

    if (userChoice === computerChoice) {
        resultText = "🤝 It's a Tie!";
        resultDiv.classList.add("bounce");
    }
    else if (
        (userChoice === "rock" && computerChoice === "scissor") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissor" && computerChoice === "paper")
    ) {
        resultText = "✅ You Win!";
        userScore++;
        resultDiv.classList.add("bounce");
    }
    else {
        resultText = "❌ You Lose!";
        computerScore++;
        resultDiv.classList.add("shake");
    }

    resultDiv.textContent = resultText;

    document.getElementById("user-score").textContent = userScore;
    document.getElementById("computer-score").textContent = computerScore;

    gameNumber++;
    document.getElementById("game-number").textContent = gameNumber;
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
    gameNumber = 1;

    userHistory = { rock: 0, paper: 0, scissor: 0 };

    document.getElementById("user-score").textContent = 0;
    document.getElementById("computer-score").textContent = 0;
    document.getElementById("game-number").textContent = 1;

    document.getElementById("result").textContent = "Game Reset!";
    document.getElementById("result").classList.remove("bounce", "shake");

    document.getElementById("user_choice").textContent = "❔";
    document.getElementById("computer_choice").textContent = "❔";
}

function emoji(choice) {
    switch (choice) {
        case "rock": return "👊";
        case "paper": return "🫱";
        case "scissor": return "✌️";
        default: return "❔";
    }
}
