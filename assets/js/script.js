//TODO - Add timer, Add highscore screen

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

var result = document.querySelector("#result");

var scoreScreen = document.querySelector(".score-screen");
var quizScore = document.querySelector("#quiz-score");
var initialsInput = document.querySelector("#initials");
var submitButton = document.querySelector("#submit-button");

var highScoreScreen = document.querySelector(".high-scores");
var highScoreInitials = document.querySelector("#high-score-initials");
var highScore = document.querySelector("#high-score");
var backButton = document.querySelector("#back-button");
var clearButton = document.querySelector("#clear-button")

var questions = [
{
    question: "What is the correct syntax for referring to an external script called script.js?",
    answers: ["1. <script src=\"script.js\"", "2. <script name=\"script.js\"", 
    "3. <script href=\"script.js\"", "4. <link src=\"script.js\""],
    correctAnswer: 1
},

{
    question: "How do you write an IF statement in JS?",
    answers: ["1. if i = 5", "2. if (i == 5)", "3. if i == 5 then", "4. if i = 5 then"],
    correctAnswer: 2
},

{
    question: "How do you write a FOR loop in JS?",
    answers: ["1. for i = 1 to 5", "2. for (i = 0; i <= 5; i++",
    "3. for (i = 0; i <= 5)", "4. for (i <= 5; i++)"],
    correctAnswer: 2
},

{
    question: "How do you write a comment in JS?",
    answers: ["1. <!--Comment--!>", "2. !!Comment", "3. 'Comment'", "4. //Comment"],
    correctAnswer: 4
},

{
    question: "Which of the following keywords is used to define a variable in JS",
    answers: ["1. var", "2. let", "3. Both of these", "4. None of these"],
    correctAnswer: 3
}]

var timerInterval;
var secondsLeft = 90;

var questionsNumber = 0;
var questionsCorrect = 0;

quiz.style.display = "none";
result.style.display = "none";
scoreScreen.style.display = "none";
highScoreScreen.style.display = "none";

//Function declarations
function startQuiz()
{
    menu.style.display = "none";
    quiz.style.display = "flex";

    askQuestion();
    startTimer();
}

function askQuestion()
{
    console.log(questionsNumber);
    question.textContent = questions[questionsNumber].question;
    for (var i = 0; i < 4; i++)
    {
        answerButtons[i].textContent = questions[questionsNumber].answers[i];
    }
}

function startTimer()
{
    timerInterval = setInterval(function() {
    secondsLeft--;

    timer.textContent = "TIME: " + secondsLeft;
    
    if(secondsLeft === 0) 
    {
        clearInterval(timerInterval);
        showScore();
    }
}, 1000);
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

        secondsLeft = secondsLeft - 10
    }

    result.style.display = "flex";


    if (questionsNumber < 4)
    {
        questionsNumber++;
        askQuestion();
    }
    else{
        questionsNumber = 0;
        
        clearInterval(timerInterval);
        
        timer.textContent = "TIME: " + secondsLeft;
        showScore();
    }

    setTimeout(function(){
    result.style.display = "none";
    }, 500);
}

function showScore()
{
    quiz.style.display = "none";
    scoreScreen.style.display = "block";

    quizScore.textContent = "Your score is: " + secondsLeft;
}

function showHighScores()
{
    clearInterval(timerInterval);

    secondsLeft = 90;
    timer.textContent = "TIME: " + secondsLeft;

    quiz.style.display = "none";
    menu.style.display = "none";
    scoreScreen.style.display = "none";
    highScoreScreen.style.display = "block";

    var lastScore = JSON.parse(localStorage.getItem("userScore"));
    if (lastScore !== null)
    {
        highScoreInitials.textContent = lastScore.initials;
        highScore.textContent = lastScore.score;
    }
}

function showMenu()
{
    highScoreScreen.style.display = "none";
    menu.style.display = "block";
}

//Event declaration
startBtn.addEventListener('click', startQuiz);

submitButton.addEventListener('click', function(event) {
    event.preventDefault();

    var userScore = {
        initials: initialsInput.value,
        score: secondsLeft
    }

    localStorage.setItem("userScore", JSON.stringify(userScore));

    scoreScreen.style.display = "none";
    menu.style.display = "block";

    secondsLeft = 90;
    timer.textContent = "TIME: " + secondsLeft;
});

answer1.addEventListener('click', function() {
    pickAnswer(1);
});

answer2.addEventListener('click', function() {
    pickAnswer(2);
});

answer3.addEventListener('click', function() {
    pickAnswer(3);
});

answer4.addEventListener('click', function() {
    pickAnswer(4);
});

highScoreBtn.addEventListener('click', showHighScores);

backButton.addEventListener('click', showMenu);

clearButton.addEventListener('click', function() {
    localStorage.clear();

    highScoreInitials.textContent = "--";
    highScore.textContent = "--";
})