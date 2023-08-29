//Variable declarations

//Elements in the header
var highScoreBtn = document.querySelector("#high-scores-button");
var timer = document.querySelector("#timer");

//Elements in the menu section
var menu = document.querySelector(".menu");
var startBtn = document.querySelector("#start-button");

//Elements in the quiz section
var quiz = document.querySelector(".quiz");
var question = document.querySelector("#question");

//Array for the 4 answer buttons inside the quiz section
var answerButtons = [
document.querySelector("#answer1"),
document.querySelector("#answer2"),
document.querySelector("#answer3"),
document.querySelector("#answer4")
]

//Separate variables to add listeners to buttons
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");

//Result text when each question is answered
var result = document.querySelector("#result");

//Elements in the score section
var scoreScreen = document.querySelector(".score-screen");
var quizScore = document.querySelector("#quiz-score");
var initialsInput = document.querySelector("#initials");
var submitButton = document.querySelector("#submit-button");


//Elements in the high score section
var highScoreScreen = document.querySelector(".high-scores");
var highScoreInitials = document.querySelector("#high-score-initials");
var highScore = document.querySelector("#high-score");
var backButton = document.querySelector("#back-button");
var clearButton = document.querySelector("#clear-button")

//Array of question objects to hold question text, possible answers, 
//and the index number of the correct answer
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

//Variable for timer control
var timerInterval;
var secondsLeft = 90;

//Variable to keep track of which question the user is on
var questionsNumber = 0;

//Sets elements to not display when the page is pulled up
quiz.style.display = "none";
result.style.display = "none";
scoreScreen.style.display = "none";
highScoreScreen.style.display = "none";

//Function declarations

//Function will run when the start button is clicked
function startQuiz()
{
    //Hides menu and shows quiz
    menu.style.display = "none";
    quiz.style.display = "flex";

    askQuestion();
    startTimer();
}

function askQuestion()
{
    //Changes the text of the question elements to the question in the array
    //with the index of what question the quiz is currently on
    question.textContent = questions[questionsNumber].question;

    //Sets each button's text to the pre-written answers for the current question
    for (var i = 0; i < 4; i++)
    {
        answerButtons[i].textContent = questions[questionsNumber].answers[i];
    }
}

function startTimer()
{
    //Starts countdown timer from 90 seconds when the quiz starts
    timerInterval = setInterval(function() {
    secondsLeft--;

    //Changes countdown text to how many seconds are left in the countdown
    timer.textContent = "TIME: " + secondsLeft;
    
    if(secondsLeft === 0) 
    {
        //Ends the countdown and shows the user's score
        clearInterval(timerInterval);
        showScore();
    }
}, 1000);
}

function pickAnswer(userAnswer)
{
    //Compares the button clicked to the answer index for the question currently in the quiz

    if (userAnswer == questions[questionsNumber].correctAnswer) //Answer is correct
    {
        //Sets the text to the result of the answer and changes the color
        result.textContent = "Correct!";
        result.style.color = "darkgreen";
    }
    else //Answer is incorrect
    {
        //Sets the text to the result of the answer and changes the color
        result.textContent = "Incorrect!";
        result.style.color = "red";

        //Decreases time left by 10 seconds
        secondsLeft = secondsLeft - 10
    }

    //Displays result
    result.style.display = "flex";


    if (questionsNumber < 4) //If there is another question, change variable and ask it
    {
        questionsNumber++;
        askQuestion();
    }
    else //If last question, reset quiz, stop timer, and show the score
    {
        questionsNumber = 0;
        
        clearInterval(timerInterval);
        
        timer.textContent = "TIME: " + secondsLeft;
        showScore();
    }

    setTimeout(function(){
    //Removes display after half a second
    result.style.display = "none";
    }, 500);
}

//Hide quiz and show score
function showScore()
{
    quiz.style.display = "none";
    scoreScreen.style.display = "block";

    quizScore.textContent = "Your score is: " + secondsLeft;
}

//Runs when the high score button is clicked
function showHighScores()
{
    //Stops timer
    clearInterval(timerInterval);

    //Resets timer
    secondsLeft = 90;
    timer.textContent = "TIME: " + secondsLeft;

    //Hides all elements besides the high score screen
    quiz.style.display = "none";
    menu.style.display = "none";
    scoreScreen.style.display = "none";
    highScoreScreen.style.display = "block";

    //Renders the initials and score stored in local memory
    var lastScore = JSON.parse(localStorage.getItem("userScore"));

    if (lastScore !== null) //If there is data is local memory, render it
    {
        highScoreInitials.textContent = lastScore.initials;
        highScore.textContent = lastScore.score;
    }
    else //If there is no data to render, render blank scores and initials
    {
        highScoreInitials.textContent = "--";
        highScore.textContent = "--";
    }
}

//Runs when the back button is clicked
function showMenu()
{
    //Hides high score and shows menu
    highScoreScreen.style.display = "none";
    menu.style.display = "block";
}

//Event declaration
startBtn.addEventListener('click', startQuiz);

submitButton.addEventListener('click', function(event) {
    event.preventDefault();

    //Object to store user initials and score
    var userScore = {
        initials: initialsInput.value,
        score: secondsLeft
    }

    //Adds object to local storage
    localStorage.setItem("userScore", JSON.stringify(userScore));

    //Hides score screen and renders menu
    scoreScreen.style.display = "none";
    menu.style.display = "block";

    //Resets timer
    secondsLeft = 90;
    timer.textContent = "TIME: " + secondsLeft;
});

//Adds listener to each button and passes argument depending on which button was clicked
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
    //Clears local storage
    localStorage.clear();
})