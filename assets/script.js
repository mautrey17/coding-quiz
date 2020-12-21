//global variables
var timer = document.querySelector("#timer");
var questionCount = document.querySelector("#question-count");
var questionBlock = document.querySelector("#question-block");
var score = 0;
var startButton = document.querySelector("#start-button");
var initialScreen = document.querySelector("#initial-screen");
var rightOrWrong = document.querySelector("#area-if-rightWrong")
var endTimer = false;
var currentQuestion = document.querySelector("#current-question")
var answerChoices = document.querySelector("#answer-choices")

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

//List of questions
var questionList = [questionOne, questionTwo];

timer.textContent = score;

startButton.addEventListener("click", function(event){
    if(event.target.matches("button")){

        //set time to max and begin countdown
        score = 15
        scoreCountDown();

        //Hide starting screen and switch to questions
        initialScreen.style.display = "none";
        questionCount.style.display = "block";
        questionBlock.style.display = "block";

        

        //Show questions
        displayQuestion(0);
        displayAnswers(0);

        // displayQuestion(1);
        // displayAnswers(1);


        

    }
    
});

function scoreCountDown() {
    var timerInterval = setInterval(function(){
        score--;
        timer.textContent = score;

        //timer break
        if(score === 0 || endTimer){
            clearInterval(timerInterval);

            //HERE PLEASE REPLACE better notification when gameover
            alert("you lose")
        }
    }, 1000);
}

function displayQuestion(qnum){
    currentQuestion.textContent = questionList[qnum].q;
}

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

        //event listener for the button
        newButtonEl.addEventListener("click", function(event){
            if(event.target.matches("button")){
                var rightAnswer = parseInt(event.target.getAttribute("data-value"));
                console.log(rightAnswer);
                answerChoices.remove();
                if(rightAnswer === questionList[qnum].answer){
                    //function to countdown correct being shown
                    correctCD();
                    
                }
                else{
                    //function to countdown incorrect being shown
                    incorrectCD();
                }
                displayQuestion(parseInt(qnum)+1);
                displayAnswers(qnum+1);
            }
        })
    
    }
}



function correctCD() {
    var display = 3;
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
    var display = 3;
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