//variables for buttons on the screen
var returnBtn = document.querySelector("#return-button");
var clearBtn = document.querySelector("#clear-button");

//variable for the table section of the page
var tableBody = document.querySelector("#table-body");

//Grab the objects stored in the local storage
var savedChampions = JSON.parse(localStorage.getItem("champion"));

//Run check if previous scores need to be displayed
initialCheck();

//Button to return to home screen
returnBtn.addEventListener("click", function(){
    location.href = "index.html";

});

//function to display the scores in the table
function showHighScores(){

    //clear out the contents in the table
    tableBody.innerHTML = "";

    //Sort the objects into descending order
    savedChampions.sort(function(a, b){
        return b.highScore - a.highScore;
    });

    //for loop to get correct number of table entries
    for(i=0; i < savedChampions.length; i++){

        //Get the data for the table
        var champEntry = savedChampions[i].winnerName;
        var newScore = savedChampions[i].highScore;

        //create new elements for the table
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        var td = document.createElement("td");

        //Assign text content to the elements
        th.textContent = champEntry;
        td.textContent = newScore;

        //Display the elements in the table
        tableBody.appendChild(tr);
        tr.appendChild(th);
        tr.appendChild(td);
    }
}

//Clear the local storage with a button by clearing the winners array, removing the item from the local storage, and redisplaying the table
clearBtn.addEventListener("click", function(){
    savedChampions = [''];
    localStorage.removeItem("champion");
    showHighScores();
})

//Check to see if there are already saved scores to display
function initialCheck(){
    if(savedChampions){
        showHighScores();
  }
}