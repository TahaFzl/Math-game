function generateRandomNumber() {
    let numbers = [];
    while (numbers.length < 3) {
        let digit = Math.floor(Math.random() * 10).toString();
        if (!numbers.includes(digit)) numbers.push(digit);
    }
    return numbers.join('');
}

const secretNumber = generateRandomNumber();
let attempts = 0;

function checkGuess(secret, guess) {
    let correct = 0, found = 0;
    for (let i = 0; i < 3; i++) {
        if (guess[i] === secret[i]) correct++;
        else if (secret.includes(guess[i])) found++;
    }
    return { correct, found };
}

function makeGuess() {
    const guessInput = document.getElementById("guessInput");
    const resultDisplay = document.getElementById("result");
    const attemptsDisplay = document.getElementById("attempts");
    const historyList = document.getElementById("historyList");
    const historyBox = document.querySelector(".history-box");

    const guess = guessInput.value.trim();

    if (guess.length !== 3 || isNaN(guess)) {
        resultDisplay.textContent = "Please enter a valid 3-digit number.";
        return;
    }

    attempts++;
    const { correct, found } = checkGuess(secretNumber, guess);

    if (correct === 3) {
        resultDisplay.textContent = `🎉 Correct! Number: ${secretNumber}`;
        guessInput.disabled = true;
    } else {
        resultDisplay.textContent = `Result: ${correct} correct, ${found} found`;
    }
    attemptsDisplay.textContent = `Attempts: ${attempts}`;

    const historyItem = document.createElement("li");
    historyItem.innerHTML = `<strong>${attempts}:</strong> ${guess} → ${correct} correct, ${found} found`;
    historyList.appendChild(historyItem);

    guessInput.value = "";

    setTimeout(() => {
        historyBox.scrollTop = historyBox.scrollHeight;
    }, 50);
}

function handleKeyPress(event) {
    if (event.key === "Enter") makeGuess();
}

function autoSubmit(event) {
    if (event.target.value.length === 3) makeGuess();
}

console.log("Secret Number:", secretNumber);