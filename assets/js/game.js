const question = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName("answers"));

let currentQuestion = {};
let questionCounter = 0;
let correctCount = 0;
let incorrectCount = 0;
let acceptingAnswers = true;
