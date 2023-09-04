// Homepage
const instructionsBtnHomepage = document.getElementById("intructions-btn-homepage");
const quizHomepageElements = document.querySelectorAll(".quiz-homepage");
const questChoice = document.getElementById("question-choice");
const diffChoice = document.getElementById("difficulty-choice");
const startButton = document.getElementById("submit");
// Instructions Page
const instructionsPage = document.getElementById("instruction-page");
const instructionBtn = document.getElementById("instruction-btn");
// Game Page
const gameContentArea = document.getElementById("question-number");
const gameQuizArea = document.getElementById("question");
const questionCounter = document.getElementById("question-counter");
const answerCountersArea = document.getElementById("answer-counters-area");
// Results Page
const resultsPage = document.getElementById("results");
const resultsBtns = document.getElementById("results-page-btns");

let answers = Array.from(document.getElementsByClassName("answer"));
let questions = [];
let acceptInput = false;
let currentQuestion = {};


/** Event Listener to show instructions page and hide quiz selection homepage */
instructionsBtnHomepage.addEventListener("click", function () {
    instructionsBtnHomepage.classList.add("hide");
    quizHomepageElements.forEach(function (homepage) {
        homepage.classList.add("hide");
    });

    instructionsPage.classList.remove("hide");
    instructionBtn.classList.remove("hide");
});

/** Event Listener to return to quiz selection homepage and hide instructions page */
instructionBtn.addEventListener("click", function () {
    instructionsBtnHomepage.classList.remove("hide");
    instructionsPage.classList.add("hide");
    instructionBtn.classList.add("hide");

    quizHomepageElements.forEach(function (instructions) {
        instructions.classList.remove("hide");
    });
});

// Trivia Database API
/** Function to construct the Quiz API URL based on user-selected options */

function getQuestionsData() {
    const quest = questChoice.options[questChoice.selectedIndex].id;
    const diff = diffChoice.options[diffChoice.selectedIndex].id;

    return gameUrl = `https://opentdb.com/api.php?amount=${quest}&category=15&difficulty=${diff}&type=multiple`;
}

// Add getQuizData function here, which gets the questions and shuffles the answers

function getQuizData() {

    const gameUrl = getQuestionsData();

    fetch(gameUrl)
        .then(res => res.json())
        .then(loadedQuestions => {
            console.log(loadedQuestions.results);
            questions = loadedQuestions.results.map(loadedQuestion => {
                const formattedQuestion = {
                    question: loadedQuestion.question
                };
                const answerChoices = [...loadedQuestion.incorrect_answers];
                formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
                answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);

                answerChoices.forEach((choice, index) => {
                    formattedQuestion["choice" + (index + 1)] = choice;
                });

                return formattedQuestion;
            });
        });
}

/** Function to start the quiz, calling the get questions function and 
 * hiding the quiz selector homepage and showing the game page */
function startGame() {
    totalQuestions = [...questions];
    questionCount = 0;
    getQuizData();

    quizHomepageElements.forEach(function (game) {
        game.classList.add("hide");
    });

    instructionsBtnHomepage.classList.add("hide");
    gameContentArea.classList.remove("hide");
    gameQuizArea.classList.remove("hide");
    answerCountersArea.classList.remove("hide");
}

startButton.addEventListener('click', function () {
    startGame();
});

// Add nextQuestion function here which progresses the quiz or stops it if the user has run out of questions

function getNextQuestion() {
    if (totalQuestions.length == 0) {
        gameContentArea.classList.add("hide");
        gameQuizArea.classList.add("hide");
        answerCountersArea.classList.add("hide");
        resultsPage.classList.remove("hide");
        resultsBtns.classList.remove("hide");
        // Add final score here
    } else {
        questionCount++;
        questionCounter.innerText = (`${questionCount}/${questChoice.value}`);
        let questionIndex = Math.floor(Math.random() * totalQuestions.length);
        currentQuestion = totalQuestions[questionIndex];
        gameQuizArea.innerHTML = currentQuestion.question;
        answers.forEach(answer => {
            let number = answer.dataset["answer"];
            answer.innerHTML = currentQuestion["choice" + number];
        });
        totalQuestions.splice(questionIndex, 1);
        questions.splice(questionIndex, 1);
        acceptInput = true;
    }
    answerResponse();
}

// Add answerResponse function here which will give the user appropriate feedback if they get the question wrong or right

function answerResponse() {
    answers.forEach(answer => {
        answer.addEventListener("click", function (event) {
            const selectedAnswer = event.target;
            if (!acceptInput) return;
            acceptInput = false;
            const selectedAnswerChoice = selectedAnswer.dataset["answer"];

            if (selectedAnswerChoice == currentQuestion.answer) {
                alert("Correct!");
            } else {
                alert("Incorrect!");
            }
            setTimeout(() => {
                getNextQuestion();
            }, 2000);
        });
    });
}