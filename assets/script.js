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

//List of questions
var questionList = [questionOne];

timer.textContent = score;

startButton.addEventListener("click", function(event){
    if(event.target.matches("button")){
        console.log("button pressed");

        //Hide starting screen and switch to questions
        initialScreen.style.display = "none";
        questionCount.style.display = "block";
        questionBlock.style.display = "block";

        //set time to max and begin countdown
        score = 15
        scoreCountDown();

        //Show questions
        var newQuestionEl = document.createElement("h3");
        newQuestionEl.textContent = questionList[0].q;
        questionBlock.appendChild(newQuestionEl);


        //for loop to genereate buttons for the questions
        for(i=0; i < questionOne.options.length; i++){
            console.log("test");
            var newButtonEl = document.createElement("button");
            newButtonEl.textContent = questionOne.options[i];
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
                        alert("You win")
                    }
                    else{alert("You lose")}
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