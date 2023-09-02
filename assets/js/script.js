// Homepage
const instructionsBtnHomepage = document.getElementById("intructions-btn-homepage");
const quizHomepageElements = document.querySelectorAll(".quiz-homepage");
const submit = document.getElementById("submit");
const questChoice = document.getElementById("question-choice");
const diffChoice = document.getElementById("difficulty-choice");
// Instructions Page
const instructionsPage = document.getElementById("instruction-page");
const instructionBtn = document.getElementById("instruction-btn");

// Quiz Game Page

const question = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName("answers"));

// Trivia Database API

function getQuestions(start) {
    if (start) {
        gameUrl = (`https://opentdb.com/api.php?amount=${quest}&category=15&difficulty=${diff}&type=multiple`);
    } else {
        gameUrl = ("https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple");
    }

    console.log("API URL:", gameUrl);
}

// Retrieves the users options

submit.addEventListener('click', () => {
    quest = questChoice.options[questChoice.selectedIndex].id;
    diff = diffChoice.options[diffChoice.selectedIndex].id;

    // Call getQuestions(true) with user-selected options
    getQuestions(true);
});