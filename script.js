
const questions = [
    {
        question: "Which language is used to structure a web page?",
        options: ["Python", "HTML", "Java", "C++"],
        answer: 1
    },
    {
        question: "Which language is used to style a web page?",
        options: ["CSS", "SQL", "C", "Python"],
        answer: 0
    },
    {
        question: "Which language adds interactivity to a website?",
        options: ["HTML", "CSS", "JavaScript", "XML"],
        answer: 2
    },
    {
        question: "What does CPU stand for?",
        options: [
            "Central Process Unit",
            "Central Processing Unit",
            "Computer Personal Unit",
            "Control Processing Utility"
        ],
        answer: 1
    },
    {
        question: "Which company developed Java?",
        options: ["Microsoft", "Apple", "Sun Microsystems", "Google"],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const progressElement = document.getElementById("progress");
const nextButton = document.getElementById("next-btn");
const feedbackElement = document.getElementById("feedback");
const quizElement = document.getElementById("quiz");
const resultElement = document.getElementById("result");
const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");

function loadQuestion() {
    answered = false;

    const current = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreElement.textContent = `Score: ${score}`;

    questionElement.textContent = current.question;
    optionsElement.innerHTML = "";
    feedbackElement.textContent = "";
    nextButton.disabled = true;

    progressElement.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    current.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.className = "option";
        button.textContent =
            `${String.fromCharCode(65 + index)}. ${option}`;

        button.addEventListener("click", () => {
            selectAnswer(index);
        });

        optionsElement.appendChild(button);
    });

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "Submit Quiz ✓"
            : "Next Question →";
}

function selectAnswer(selectedIndex) {
    if (answered) return;

    answered = true;

    const correctIndex = questions[currentQuestion].answer;
    const optionButtons = optionsElement.querySelectorAll(".option");

    optionButtons.forEach((button, index) => {
        button.disabled = true;

        if (index === correctIndex) {
            button.classList.add("correct");
        }

        if (index === selectedIndex && selectedIndex !== correctIndex) {
            button.classList.add("wrong");
        }
    });

    if (selectedIndex === correctIndex) {
        score++;
        feedbackElement.textContent = "Correct answer! Great job!";
        feedbackElement.style.color = "#22a06b";
    } else {
        feedbackElement.textContent = "Incorrect! Check the green answer.";
        feedbackElement.style.color = "#e05260";
    }

    scoreElement.textContent = `Score: ${score}`;
    nextButton.disabled = false;
}

function showResult() {
    quizElement.classList.add("hidden");
    resultElement.classList.remove("hidden");

    progressElement.style.width = "100%";

    finalScore.textContent = `${score} / ${questions.length}`;

    const percentage = (score / questions.length) * 100;

    if (percentage === 100) {
        resultMessage.textContent = "Perfect score! Excellent work!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Great job! Keep learning!";
    } else {
        resultMessage.textContent = "Good try! Practice and try again.";
    }
}

nextButton.addEventListener("click", () => {
    if (!answered) return;

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResult();
    }
});

restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    answered = false;

    resultElement.classList.add("hidden");
    quizElement.classList.remove("hidden");

    loadQuestion();
});

loadQuestion();
