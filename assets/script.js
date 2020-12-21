//global variables
var timer = document.querySelector("#timer");
var questionCount = document.querySelector("#question-count");
var questionBlock = document.querySelector("#question-block");
var score = 0;
var startButton = document.querySelector("#start-button");
var initialScreen = document.querySelector("#initial-screen");
var rightOrWrong = document.querySelector("#area-if-rightWrong")
var endTimer = false;

//Questions with options
var questionOne = {
    q: "This is a sample question",
    a: 3,
    options: ["This is false 1", "This is false 2", "This is false 3", "This is true"]
};
var questionTwo = {
    q: "This is the second question",
    a: 0,
    options: ["This is true now", "this is false 1", "this is false 2", "this is false 3"]
}

//List of questions
var questionList = [questionOne];

timer.textContent = score;

startButton.addEventListener("click", function(event){
    if(event.target.matches("button")){


        //Hide starting screen and switch to questions
        initialScreen.style.display = "none";
        questionCount.style.display = "block";
        questionBlock.style.display = "block";

        //set time to max and begin countdown
        score = 15
        scoreCountDown();

        //Show questions
        displayQuestion();


        //for loop to genereate buttons for the questions
        for(i=0; i < questionList[0].options.length; i++){
            console.log("test");
            var newButtonEl = document.createElement("button");
            newButtonEl.textContent = questionList[0].options[i];
            newButtonEl.setAttribute("class", "btn btn-info answer-choices");

            //data value to determine which button is clicked
            newButtonEl.setAttribute("data-value", i);
            questionBlock.appendChild(newButtonEl);

            //event listener for the button
            newButtonEl.addEventListener("click", function(event){
                if(event.target.matches("button")){
                    var rightAnswer = parseInt(event.target.getAttribute("data-value"));
                    console.log(rightAnswer);
                    if(rightAnswer === questionList[0].a){
                        //function to countdown correct being shown
                        correctCD();
                        
                    }
                    else{
                        //function to countdown incorrect being shown
                        incorrectCD();
                    }
                }
            })
        
        }

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

function displayQuestion(){
    var newQuestionEl = document.createElement("h3");
    newQuestionEl.textContent = questionList[0].q;
    questionBlock.appendChild(newQuestionEl);
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