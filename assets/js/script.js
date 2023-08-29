//Variable declarations

var highScoreBtn = document.querySelector("#high-scores-button");
var timer = document.querySelector("#timer");

var menu = document.querySelector(".menu");
var startBtn = document.querySelector("#start-button");

var quiz = document.querySelector(".quiz");
var question = document.querySelector("#question");

var answerButtons = [
document.querySelector("#answer1"),
document.querySelector("#answer2"),
document.querySelector("#answer3"),
document.querySelector("#answer4")
]

var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");

result = document.querySelector("#result");

var questions = [
{
    question: "What is the correct syntax for referring to an external script called script.js?",
    answers: ["1. <script src=\"script.js\"", "2. <script name=\"script.js\"", 
    "3. <script href=\"script.js\"", "4. <link src=\"script.js\""],
    correctAnswer: 0
},

{
    question: "How do you write an IF statement in JS?",
    answers: ["1. if i = 5", "2. if (i == 5)", "3. if i == 5 then", "4. if i = 5 then"],
    correctAnswer: 1
},

{
    question: "How do you write a FOR loop in JS?",
    answers: ["1. for i = 1 to 5", "2. for (i = 0; i <= 5; i++",
    "3. for (i = 0; i <= 5)", "4. for (i <= 5; i++)"],
    correctAnswer: 1
},

{
    question: "How do you write a comment in JS?",
    answers: ["1. <!--Comment--!>", "2. !!Comment", "3. 'Comment'", "4. //Comment"],
    correctAnswer: 3
},

{
    question: "Which of the following keywords is used to define a variable in JS",
    answers: ["1. var", "2. let", "3. Both of these", "4. None of these"],
    correctAnswer: 2
}]

var questionsNumber = 0;

quiz.style.display = "none";
result.style.display = "none";

function startQuiz()
{
    menu.style.display = "none";
    quiz.style.display = "flex";

    askQuestion();
}

function askQuestion()
{
    question.textContent = questions[questionsNumber].question;
    for (var i = 0; i < 4; i++)
    {
        answerButtons[i].textContent = questions[questionsNumber].answers[i];
    }
}

function pickAnswer(userAnswer)
{
    if (userAnswer == questions[questionsNumber].correctAnswer)
    {
        result.textContent = "Correct!";
        result.style.color = "darkgreen";
    }
    else
    {
        result.textContent = "Incorrect!";
        result.style.color = "red";
    }

    result.style.display = "flex";

    questionsNumber++;
    askQuestion();

    setTimeout(function(){
    result.style.display = "none";
}, 500);
}

startBtn.addEventListener('click', startQuiz);

answer1.addEventListener('click', function() {
    pickAnswer(0);
});

answer2.addEventListener('click', function() {
    pickAnswer(1);
});

answer3.addEventListener('click', function() {
    pickAnswer(2);
});

answer4.addEventListener('click', function() {
    pickAnswer(3);
});