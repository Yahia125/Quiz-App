// Quiz App

let numOfQuestion = Number(document.getElementById("num-of-question").textContent);
const nextBtn = document.getElementById("next-btn");
const score = document.getElementById("score");
const correct = document.getElementById("correct");
const wrong = document.getElementById("wrong");

let numOfCorrect = 0;
let numOfWrong = 0;
let answered = false;
let i = 0;

const correctAnswers = [
    "56",
    "63",
    "720",
    "95",
    "102",
    "127",
    "63",
    "52",
    "53",
    "217",
    "No Norks are Tars",
    "156",
    "312211",
    "E",
    "92"
];

function answer(button) {
    if (answered) return;

    let choice = button.textContent.trim();

    if (choice === correctAnswers[i]) {
        button.classList.add("correct-choice");
        numOfCorrect++;
    } else {
        button.classList.add("wrong-choice");
        numOfWrong++;
    }

    const currentQuestionCard = document.getElementById(`question${numOfQuestion}`);
    currentQuestionCard.querySelectorAll(".choice").forEach(btn => {
        btn.disabled = true;
    });

    score.textContent = `${numOfCorrect} / 15`;
    correct.textContent = numOfCorrect;
    wrong.textContent = numOfWrong;

    answered = true;
}

function showResults() {
    document.getElementById(`question${numOfQuestion}`).classList.add("non-display");
    document.getElementById("result").classList.remove("non-display");
    nextBtn.classList.add("non-display");
    document.getElementById("questions-number").classList.add("non-display");

    let accuracy = Math.round((numOfCorrect / 15) * 100);
    
    const accuracyElement = document.querySelector("#result .result-details p:nth-child(3) span");
    if (accuracyElement) {
        accuracyElement.textContent = `${accuracy}%`;
    }

    const resultMessage = document.querySelector(".result-message");
    if (resultMessage) {
        if (accuracy >= 80) {
            resultMessage.textContent = "Excellent! 🧠";
        } else if (accuracy >= 50) {
            resultMessage.textContent = "Good Job! 👍";
        } else {
            resultMessage.textContent = "Keep Practicing! 💪";
        }
    }
}

function nextQuestion() {
    if (!answered) {
        alert("Please select an answer first!");
        return;
    }

    if (numOfQuestion >= 15) {
        showResults();
        return;
    }

    document.getElementById(`question${numOfQuestion}`).classList.add("non-display");

    numOfQuestion++;
    i++;

    const nextQuestionCard = document.getElementById(`question${numOfQuestion}`);
    nextQuestionCard.classList.remove("non-display");
    document.getElementById("num-of-question").textContent = numOfQuestion;

    answered = false;
    nextQuestionCard.querySelectorAll(".choice").forEach(button => {
        button.disabled = false;
        button.classList.remove("wrong-choice", "correct-choice");
    });
}

function tryAgain() {
    numOfQuestion = 1;
    i = 0;
    numOfCorrect = 0;
    numOfWrong = 0;
    answered = false;

    correct.textContent = 0;
    wrong.textContent = 0;
    score.textContent = "0 / 15";

    document.getElementById("result").classList.add("non-display");
    nextBtn.classList.remove("non-display");
    document.getElementById("questions-number").classList.remove("non-display");

    for (let j = 1; j <= 15; j++) {
        const qCard = document.getElementById(`question${j}`);
        if (qCard) {
            qCard.classList.add("non-display");
        }
    }

    const firstQuestionCard = document.getElementById("question1");
    firstQuestionCard.classList.remove("non-display");
    document.getElementById("num-of-question").textContent = 1;

    document.querySelectorAll(".choice").forEach(button => {
        button.disabled = false;
        button.classList.remove("wrong-choice", "correct-choice");
    });
}