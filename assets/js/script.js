//global variables
//Elements shown on page launch
var initialScreen = document.querySelector("#initial-screen");
var timer = document.querySelector("#timer");

//buttons
var startButton = document.querySelector("#start-button");
var highScoreButton = document.querySelector("#highscore-button");
var refreshButton = document.querySelector("#refresh-button");
var viewScoresButton = document.querySelector("#view-scores-button");

//Areas during the quiz with questions and answers
var questionCount = document.querySelector("#question-count");
var questionBlock = document.querySelector("#question-block");
var currentQuestion = document.querySelector("#current-question");
var answerChoices = document.querySelector("#answer-choices");
var rightOrWrong = document.querySelector("#area-if-rightWrong");

//End screen after quiz
var highScoreForm = document.querySelector("#highscore-form");
var nameInput = document.querySelector("#name-input");
var finalScore = document.querySelector("#final-score");
var lossDiv = document.querySelector("#loss-div");

//initial variable of score, previous winners, timer being active, and global index
var score = 0;
var endTimer = false;
var champions = [];
var qnum = 0;

//List of questions
var questionOne = {
    q: "Commonly used data types DO NOT include:",
    answer: 2,
    options: ["strings", "booleans", "alerts", "numbers"]
};
var questionTwo = {
    q: "The condition in an if / else statement is enclosed within _____",
    answer: 0,
    options: ["parentheses", "quotes", "curly brackets", "square brackets"]
}
var questionThree = {
    q: "Arrays in JavaScript can be used to store ______",
    answer: 3,
    options: ["numbers and strings", "other arrays", "booleans", "all of the above"]
}
var questionFour = {
    q: "String values must be enclosed within ____ when being assigned to variables.",
    answer: 2,
    options: ["commas", "curly brackets", "quotes", "parentheses"]
}
var questionFive = {
    q: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answer: 1,
    options: ["JavaScript", "console.log", "terminal/bash", "for loops"]
}

//List of questions as array
var questionList = [questionOne, questionTwo, questionThree, questionFour, questionFive];

//set value of timer
timer.textContent = score;

//check if there are previous winners in storage
storageCheck();

//Button on start page to launch the quiz
startButton.addEventListener("click", function(event){
    if(event.target.matches("button")){

        //set time to max and begin countdown
        score = 50;
        scoreCountDown();

        //Hide starting screen and switch to questions
        initialScreen.style.display = "none";
        questionCount.style.display = "block";
        questionBlock.style.display = "block";

        //Run functions to display the first question and answer choices
        displayQuestion(0);
        displayAnswers(0);
    }
});

//Function to countdown the score
function scoreCountDown() {
    var timerInterval = setInterval(function(){
        score--;
        timer.textContent = score;

        //timer break
        if(score <= 0) {
            clearInterval(timerInterval);
            score = 0;
            alert("You are out of time. Please answer the final question to end the quiz.");
            //HERE PLEASE REPLACE better notification when gameover
        }
        else if(endTimer){
            clearInterval(timerInterval);
        }
    }, 1000);
}

//Function to display the next question
//qnum is index of question
function displayQuestion(qnum){
    currentQuestion.textContent = questionList[qnum].q;
}

//Function to generate answer choices as buttons
function displayAnswers(qnum){

    if(score>0){
    //for loop to genereate buttons for the questions
        for(i=0; i < questionList[qnum].options.length; i++){

            //create button with attributes, text, and data and append
            var newButtonEl = document.createElement("button");
            newButtonEl.textContent = questionList[qnum].options[i];
            newButtonEl.setAttribute("class", "btn btn-info answer-choices");

            newButtonEl.setAttribute("data-value", i);
            answerChoices.appendChild(newButtonEl);

            //event listener for the answer choice buttons
            newButtonEl.addEventListener("click", function(event){
                if(event.target.matches("button")){
                    var rightAnswer = parseInt(event.target.getAttribute("data-value"));
                    
                    if(rightAnswer === questionList[qnum].answer){
                        //function to countdown correct being shown
                        correctCD();
                        
                    }
                    else{
                        //function to countdown incorrect being shown
                        incorrectCD();
                        score = score - 10;
                    }
                    answerChoices.innerHTML = '';
                    qnum++;
                    if(parseInt(qnum)< questionList.length){
                        displayQuestion(parseInt(qnum));
                        displayAnswers(parseInt(qnum));
                    }
                    else{
                        endOfGame();
                    } 
                }
            })
        }
    }
else{
    endOfGame();
}
}


//Function for when correct answer is chosen: time is the same and correct is displayed
function correctCD() {
    var display = 2;
    var timerInterval = setInterval(function(){
        rightOrWrong.textContent = "CORRECT"
        display--;

        //countdown break
        if (display === 0){
            clearInterval(timerInterval);
            rightOrWrong.textContent = "";
        }
    }, 1000)
}

//Function for when correct answer is chosen: time is subtracted and correct is displayed
function incorrectCD() {
    var display = 2;
    var timerInterval = setInterval(function(){
        display--;
        rightOrWrong.textContent = "INCORRECT"

        //countdown break
        if (display === 0){
            clearInterval(timerInterval);
            rightOrWrong.textContent = "";
        }
    }, 1000)
}

//Function to end the game
function endOfGame(){
    endTimer = true;
    //If game ends because all of the questions are answered
    if (score > 0){
        //Display the winning text and form to submit name for the leaderboard
        currentQuestion.textContent = "Congratulations Champ! You have completed the World's Hardest Coding Quiz! Please enter your name to be on the leaderboard";
        currentQuestion.setAttribute("class", "text-center");
        questionBlock.style.border = "none";
        finalScore.textContent = ": " + score;
        highScoreForm.style.display = "block";
    }
    //If game ends because the timer runs out
    else{
        currentQuestion.textContent = "Aww, you will get them next time, champ! Don't give up!";
        currentQuestion.setAttribute("class", "text-center");
        lossDiv.style.display = "block";
    }
}

//Button to save name to leaderboard and display the leaderboard
highScoreButton.addEventListener("click", function(event){
    event.preventDefault();
    var savedObject = {
        highScore: score,
        winnerName: nameInput.value
    }
    //Add new entry to saved entries and save to localStorage
    champions.push(savedObject);
    savedChampions = JSON.stringify(champions);
    localStorage.setItem("champion", savedChampions);
    //Take user to leaderboard
    location.href = "highscores.html";
});

function storageCheck() {
    // Check if there are previous winners saved in the localStorage
    // If so, parse the value from localStorage and assign it to the saved winners variable
    var savedChampions = JSON.parse(localStorage.getItem("champion"));
    
    if(savedChampions){
    
      champions = savedChampions;
    }
};

//Button on game loss to restart the game
refreshButton.addEventListener("click", function(){
    location.reload();
})

//Button on game loss to view the leaderboard
viewScoresButton.addEventListener("click", function(){
    location.href = "highscores.html";
})