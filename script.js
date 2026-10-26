
const form = document.getElementById("guess-form");
const input = document.getElementById("guess-input");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const numberDisplay = document.querySelector(".number-display");
const restartButton = document.getElementById("restart");

let secretNumber;
let attempts;
let gameOver;

function startGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    gameOver = false;

    attemptsDisplay.textContent = "0";
    numberDisplay.textContent = "?";
    message.textContent = "Ready when you are!";
    message.style.color = "#67e8f9";

    input.value = "";
    input.disabled = false;
    input.focus();

    form.querySelector("button").disabled = false;
    form.querySelector("button").textContent = "CHECK GUESS ↗";
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (gameOver) return;

    const guess = Number(input.value);

    if (
        input.value.trim() === "" ||
        !Number.isInteger(guess) ||
        guess < 1 ||
        guess > 100
    ) {
        message.textContent = "Enter a whole number from 1 to 100.";
        message.style.color = "#fbbf24";
        return;
    }

    attempts++;
    attemptsDisplay.textContent = attempts;

    if (guess === secretNumber) {
        numberDisplay.textContent = secretNumber;
        message.textContent = `🎉 Correct! You won in ${attempts} attempt(s)!`;
        message.style.color = "#4ade80";
        gameOver = true;
        input.disabled = true;
        form.querySelector("button").disabled = true;
    } else if (guess < secretNumber) {
        message.textContent = "⬆ Too low! Try a higher number.";
        message.style.color = "#67e8f9";
    } else {
        message.textContent = "⬇ Too high! Try a lower number.";
        message.style.color = "#c4b5fd";
    }

    if (!gameOver) {
        input.value = "";
        input.focus();
    }
});

restartButton.addEventListener("click", startGame);

startGame();
