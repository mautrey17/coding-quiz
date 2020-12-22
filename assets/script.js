//global variables
var timer = document.querySelector("#timer");
var questionCount = document.querySelector("#question-count");
var questionBlock = document.querySelector("#question-block");
var score = 0;
var startButton = document.querySelector("#start-button");
var initialScreen = document.querySelector("#initial-screen");
var rightOrWrong = document.querySelector("#area-if-rightWrong")
var endTimer = false;
var currentQuestion = document.querySelector("#current-question");
var answerChoices = document.querySelector("#answer-choices");
var highScoreForm = document.querySelector("#highscore-form");
var finalScore = document.querySelector("#final-score");
var highScoreButton = document.querySelector("#highscore-button");
var nameInput = document.querySelector("#name-input");
var highscores = [];
var champions = [];

//Questions with options
var questionOne = {
    q: "This is a sample question",
    answer: 3,
    options: ["This is false 1", "This is false 2", "This is false 3", "This is true"]
};
var questionTwo = {
    q: "This is the second question",
    answer: 0,
    options: ["This is true now", "this is false 1", "this is false 2", "this is false 3"]
}
var questionThree = {
    q: "This is the third question",
    answer: 1,
    options: ["This is false 1", "This is now the true option", "This is false 2", "This is the final false"]
}
var questionFour = {
    q: "Welcome to question 4",
    answer: 2,
    options: ["Please do not pick this", "This is wrong", "Yay right answer", "Final one that is wrong"]
}
var questionFive = {
    q: "It's the final question",
    answer: 0,
    options: ["Hey pick me", "but like not me", "or me!!!", "I am definitely wrong"]
}

//List of questions
var questionList = [questionOne, questionTwo, questionThree, questionFour, questionFive];

timer.textContent = score;

//Button on start page to launch the quiz
startButton.addEventListener("click", function(event){
    if(event.target.matches("button")){

        //set time to max and begin countdown
        score = 15;
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
        if(score === 0 || endTimer){
            clearInterval(timerInterval);

            //HERE PLEASE REPLACE better notification when gameover
            
        }
    }, 1000);
}

//Function to display the next question
function displayQuestion(qnum){
    currentQuestion.textContent = questionList[qnum].q;
}

//Function to generate answer choices as buttons
function displayAnswers(qnum){
    //for loop to genereate buttons for the questions
    for(i=0; i < questionList[qnum].options.length; i++){
        console.log("test");
        var newButtonEl = document.createElement("button");
        newButtonEl.textContent = questionList[qnum].options[i];
        newButtonEl.setAttribute("class", "btn btn-info answer-choices");

        //data value to determine which button is clicked
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
                    score = score - 5;
                }
                answerChoices.innerHTML = '';

                if((parseInt(qnum)+1)< questionList.length){
                    displayQuestion(parseInt(qnum)+1);
                    displayAnswers(parseInt(qnum)+1);
                }
                else{
                    endOfGame();
                }
                
            }
        })
    
    }
}



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

function endOfGame(){
    endTimer = true;
    currentQuestion.textContent = "Congratulations Champ! You have completed the World's Hardest Coding Quiz! Please enter your name to be on the leaderboard";
    currentQuestion.setAttribute("class", "text-center");
    questionBlock.style.border = "none";
    finalScore.textContent = ": " + score;
    highScoreForm.style.display = "block";
}

highScoreButton.addEventListener("click", function(event){
    event.preventDefault();
    champions.push(nameInput.value);
    highscores.push(parseInt(score));
    savedChampions = JSON.stringify(champions);
    savedHighscores = JSON.stringify(highscores);
    localStorage.setItem("highScore", savedHighscores);
    localStorage.setItem("champion", savedChampions);
    location.href = "highscores.html";
});