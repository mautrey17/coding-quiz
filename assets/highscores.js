
var returnBtn = document.querySelector("#return-button");
var clearBtn = document.querySelector("#clear-button");
var tableBody = document.querySelector("#table-body");

var savedHighscores = JSON.parse(localStorage.getItem("highScore"));
var savedChampions = JSON.parse(localStorage.getItem("champion"));


console.log(savedHighscores);
console.log(savedChampions);

initialCheck();



returnBtn.addEventListener("click", function(){
    location.href = "index.html";

});

var newTREl
var newTHEl
var newTDEl

function showHighScores(){
    tableBody.innerHTML = "";

    for(i=0; i < savedHighscores.length; i++){
        var champEntry = savedChampions[i];
        var newScore = savedHighscores[i];

        var tr = document.createElement("tr");
        var th = document.createElement("th");
        th.textContent = champEntry;
        var td = document.createElement("td");
        td.textContent = newScore;

        tableBody.appendChild(tr);
        tr.appendChild(th);
        tr.appendChild(td);
    }
}

clearBtn.addEventListener("click", function(){
    savedChampions = [''];
    savedHighscores = [''];
    localStorage.removeItem("highScore");
    localStorage.removeItem("champion");
    showHighScores();
})

function initialCheck(){
    
    if(savedHighscores.length > 0){
        showHighScores();
  }
  
}