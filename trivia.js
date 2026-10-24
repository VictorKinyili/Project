const questions = [
    {
        prompt: "What does HTML stand for?",
        choices: ["A. HyperText Markup Language", "B. Hyperlink Text Management Language", "C. HighText Machine Learning"],
        answer: "A"
    },
    {
        prompt: "Which programming language is mainly used to add behavior to web pages?",
        choices: ["A. JavaScript", "B. CSS", "C. HTML"],
        answer: "A"
    },
    {
        prompt: "Which tool is commonly used to track code changes in a project?",
        choices: ["A. Git", "B. Excel", "C. Notepad"],
        answer: "A"
    },
    {
        prompt: "What is the main purpose of CSS in web development?",
        choices: ["A. To style web pages", "B. To store data", "C. To run the server"],
        answer: "A"
    },
    {
        prompt: "Which term describes writing code to test if a program works as expected?",
        choices: ["A. Debugging", "B. Testing", "C. Compiling"],
        answer: "B"
    }
];

let questionIndex = 0;
let score = 0;
let timer;
let answered = false;

const progress = document.getElementById("progress");
const timerDisplay = document.getElementById("timer");
const questionDisplay = document.getElementById("question");
const choicesDisplay = document.getElementById("choices");
const feedback = document.getElementById("feedback");

function showQuestion() {
    if (questionIndex === questions.length) {
        showResults();
        return;
    }

    const question = questions[questionIndex];
    let secondsLeft = 15;
    answered = false;

    progress.textContent = `Question ${questionIndex + 1} of ${questions.length}`;
    questionDisplay.textContent = question.prompt;
    timerDisplay.textContent = `Time remaining: ${secondsLeft} seconds`;
    feedback.textContent = "";
    choicesDisplay.replaceChildren();

    question.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.addEventListener("click", () => submitAnswer(choice[0]));
        choicesDisplay.append(button);
    });

    timer = setInterval(() => {
        secondsLeft--;
        timerDisplay.textContent = `Time remaining: ${secondsLeft} seconds`;
        if (secondsLeft === 0) submitAnswer(null);
    }, 1000);
}

function submitAnswer(answer) {
    if (answered) return;
    answered = true;
    clearInterval(timer);
    choicesDisplay.replaceChildren();

    const correctAnswer = questions[questionIndex].answer;
    if (answer === null) {
        feedback.textContent = "Time is up! You took too long to respond.";
    } else if (answer === correctAnswer) {
        score++;
        feedback.textContent = "Correct!";
    } else {
        feedback.textContent = `Incorrect. The right answer was ${correctAnswer}`;
    }

    questionIndex++;
    setTimeout(showQuestion, 1000);
}

function showResults() {
    progress.hidden = true;
    timerDisplay.hidden = true;
    questionDisplay.hidden = true;
    choicesDisplay.hidden = true;
    document.getElementById("results").hidden = false;
    document.getElementById("score").textContent =
        `Final Score: ${score} / ${questions.length}`;
    document.getElementById("correct-count").textContent =
        `Total Correct Answers: ${score}`;
}

showQuestion();
