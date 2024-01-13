"strict code";
let clearBtn = document.querySelector("#clear");

//final highscore function
function showHighscore() {
  let highscoreList = document.getElementById("highscores");

  let userScoreProfileString = localStorage.getItem("userScoreProfile");
  let userScoreProfiles = JSON.parse(userScoreProfileString);

  for (i = 0; i < userScoreProfiles.length; i++) {
    let highscoreListItem = document.createElement("li");
    highscoreList.appendChild(highscoreListItem);
    highscoreListItem.textContent = `${userScoreProfiles[i].name} - ${userScoreProfiles[i].score}`;
  }
}

showHighscore();

//clear highscore function
clearBtn.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});