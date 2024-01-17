"strict code";
let clearBtn = document.querySelector("#clear");

//highscore function
function highScore() {
  let highscoreList = document.getElementById("highscores");

  let userScoreString = localStorage.getItem("userScore");
  let userScore = JSON.parse(userScoreString);

  for (i = 0; i < userScore.length; i++) {
    let highscoreListItem = document.createElement("li");
    highscoreList.appendChild(highscoreListItem);
    highscoreListItem.textContent = `${userScore[i].name} - ${userScore[i].score}`;
  }
}

highScore();

//clear highscore function
clearBtn.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});