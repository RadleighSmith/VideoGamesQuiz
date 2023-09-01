const question = document.getElementById("question");
const answers = Array.from(document.getElementsByClassName("answers"));

// Trivia Database API

fetch("https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple")
    .then(res => {
        return res.json();
    })
    .then(databaseQuestions => {
        console.log(databaseQuestions.results);
        databaseQuestions.results.map(databaseQuestions => {
            const displayQuestion = {
                question: databaseQuestions.question
            };
            console.log(displayQuestion);
        });
    });

