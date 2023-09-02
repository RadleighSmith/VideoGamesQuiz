// Homepage
const instructionsBtnHomepage = document.getElementById("intructions-btn-homepage");
const quizHomepageElements = document.querySelectorAll(".quiz-homepage");
const startButton = document.getElementById("submit");
// Instructions Page
const instructionsPage = document.getElementById("instruction-page");
const instructionBtn = document.getElementById("instruction-btn");
// Game Page
const gameContentArea = document.getElementById("question-number");
const gameQuizArea = document.getElementById("question");
const answerCountersArea = document.getElementById("answer-counters-area");

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

function getQuestions() {
    const questChoice = document.getElementById("question-choice");
    const diffChoice = document.getElementById("difficulty-choice");

    const quest = questChoice.options[questChoice.selectedIndex].id;
    const diff = diffChoice.options[diffChoice.selectedIndex].id;

    const gameUrl = `https://opentdb.com/api.php?amount=${quest}&category=15&difficulty=${diff}&type=multiple`;

    console.log("Quiz API URL:", gameUrl);

}

/** Function to start the quiz, calling the get questions function and 
 * hiding the quiz selector homepage and showing the game page */
function startGame() {

    getQuestions();

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