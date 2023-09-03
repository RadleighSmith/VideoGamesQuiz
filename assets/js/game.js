const question = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName("answers"));
const instructionsBtnHomepage = document.getElementById("intructions-btn-homepage");
const quizHomepageElements = document.querySelectorAll(".quiz-homepage");
const instructionsPage = document.getElementById("instruction-page");
const instructionBtn = document.getElementById("instruction-btn");
const questChoice = document.getElementById("question-choice");
const diffChoice = document.getElementById("difficulty-choice");
const startButton = document.getElementById("submit");


let currentQuestion = {};
let questionCounter = 0;
let correctCount = 0;
let incorrectCount = 0;
let acceptingAnswers = true;


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

startButton.addEventListener('click', function () {
    console.log(getQuestionsData());
})

