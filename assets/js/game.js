const question = document.getElementById("question");
const answerOptions = document.getElementById('answer-area');
const instructionsBtnHomepage = document.getElementById("intructions-btn-homepage");
const quizHomepageElements = document.querySelectorAll(".quiz-homepage");
const instructionsPage = document.getElementById("instruction-page");
const instructionBtn = document.getElementById("instruction-btn");
const questChoice = document.getElementById("question-choice");
const diffChoice = document.getElementById("difficulty-choice");
const startButton = document.getElementById("submit");
const gameContentArea = document.getElementById("question-number");
const questionCounterElement = document.getElementById("question-counter");
const answerCountersArea = document.getElementById("answer-counters-area");
const resultsPage = document.getElementById("results");
const resultsPageBtns = document.getElementById("results-page-btns");
const score = document.getElementById("score");
const resultsImg = document.getElementById('results-img');
const replayBtn = document.getElementById('replay');
const returnBtn = document.getElementById('return');


let answers = Array.from(document.getElementsByClassName("answers"));
let currentQuestion = {};
let questionCounter = 0;
let correctCount = 0;
let incorrectCount = 0;
let acceptInput = true;

let totalQuestions = [];
let questions = [];


/** Event Listener to show instructions page and hide quiz selection homepage */
instructionsBtnHomepage.addEventListener("click", () => {
    toggleDisplay([
        instructionsBtnHomepage,
        instructionsPage,
        instructionBtn,
        ...quizHomepageElements,
    ]);
});

/** Event Listener to return to quiz selection homepage and hide instructions page */
instructionBtn.addEventListener("click", () => {
    toggleDisplay([
        instructionsBtnHomepage,
        instructionsPage,
        instructionBtn,
        ...quizHomepageElements,
    ]);
});

// Trivia Database API
/** Function to construct the Quiz API URL based on user-selected options */

function getQuestionsData() {
    const quest = questChoice.options[questChoice.selectedIndex].id;
    const diff = diffChoice.options[diffChoice.selectedIndex].id;

    return `https://opentdb.com/api.php?amount=${quest}&category=15&difficulty=${diff}&type=multiple`;
}

/** Function to retrive the data from the Triva DB using the user-selected options
 * it then formats the question and splices the incorrect and correct answers
 * together whist randomising the correct answers position.
 */

function getGameData() {
    fetch(getQuestionsData())
        .then(response => response.json())
        .then(loadedQuestions => {
            questions = loadedQuestions.results.map(loadedQuestion => {
                const formattedQuestion = {
                    question: loadedQuestion.question
                };
                const answerChoices = [...loadedQuestion.incorrect_answers];
                formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
                answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);

                answerChoices.forEach((answers, index) => {
                    formattedQuestion["answers" + (index + 1)] = answers;
                });

                return formattedQuestion;
            });
            if (questions.length > 0) {
                startGame();
            }
        })
        .catch(error => {
            console.error("Error:", error);
            Swal.fire({
                position: 'top',
                title: "Uh Oh! Error!",
                html: `Something went wrong, please try again`,
                icon: 'warning',
                showConfirmButton: false,
                timer: 2500,
                heightAuto: false,
            });
        });
}

/** Function to start the game when the user clicks start, it will reset all 
 * the hud elements to 0 */
function startGame() {
    totalQuestions = [...questions];
    questionCounter = 0;
    correctCount = 0;
    incorrectCount = 0;
    getNextQuestion();
    toggleDisplay([
        instructionsBtnHomepage,
        gameContentArea,
        question,
        answerOptions,
        answerCountersArea,
        ...quizHomepageElements,
    ]);

}
/** Function to get the next question  or end the game once no questions are left */
function getNextQuestion() {
    if (totalQuestions.length == 0) {
        toggleDisplay([
            gameContentArea,
            answerOptions,
            answerCountersArea,
            question,
            resultsImg,
            resultsPage,
            resultsPageBtns,
        ]);
        score.innerHTML = (`You Scored: ${correctCount}/${questChoice.value} `);
    } else {
        questionCounter++;
        questionCounterElement.innerText = (`${questionCounter}/${questChoice.value}`);
        let questIndex = Math.floor(Math.random() * totalQuestions.length);
        currentQuestion = totalQuestions[questIndex];
        question.innerHTML = currentQuestion.question;

        answers.forEach((answer, index) => {
            answer.innerHTML = currentQuestion["answers" + (index + 1)];
        });

        totalQuestions.splice(questIndex, 1);
        questions.splice(questIndex, 1);
        acceptInput = true;
    }
    answerResponse();
}
// Event Listener to start game

startButton.addEventListener('click', () => {
    getGameData();

});

function answerResponse() {
    answers.forEach(answer => {
        answer.addEventListener("click", (event) => {
            const selectedAnswer = event.target;
            if (!acceptInput) return;
            acceptInput = false;
            const selectedAnswerChoice = selectedAnswer.dataset.answer;

            if (selectedAnswerChoice == currentQuestion.answer) {
                correctCount++;
                document.getElementById("correct-count").textContent = correctCount;
                Swal.fire({
                    position: 'center',
                    title: "You're Correct",
                    html: `${currentQuestion["answers" + currentQuestion.answer]} was the correct answer!`,
                    icon: 'success',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    timer: 2500,
                    heightAuto: false,
                }).then(() => getNextQuestion());;
            } else {
                incorrectCount++;
                document.getElementById("incorrect-count").textContent = incorrectCount;
                Swal.fire({
                    position: 'center',
                    title: "You're Incorrect",
                    html: `The correct answer was ${currentQuestion["answers" + currentQuestion.answer]}`,
                    icon: 'error',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    timer: 2500,
                    heightAuto: false,
                }).then(() => getNextQuestion());
            }
        });
    });
}

returnBtn.addEventListener("click", () => {
    toggleDisplay([
        resultsImg,
        resultsPage,
        resultsPageBtns,
        instructionsBtnHomepage,
        ...quizHomepageElements,
    ]);
});

replayBtn.addEventListener("click", () => {
    getGameData();
    toggleDisplay([
        resultsImg,
        resultsPage,
        resultsPageBtns,
        ...quizHomepageElements,
        instructionsBtnHomepage,
    ]);
});
/** Function to toggle the diplay of divs throughout the game */

function toggleDisplay(elements) {
    elements.forEach((element) =>
        element.classList.contains("hide") ? element.classList.remove("hide") : element.classList.add("hide")
    );
}