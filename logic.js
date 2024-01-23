"strict code";

let currentQuestion;
let countdownTimer = 100;
let countdownInterval;

var initialsInput = document.querySelector("#initials");
let startBtn = document.querySelector("#start");
let timer = document.querySelector("#time");
let feedback = document.querySelector("#feedback");
let endScreen = document.querySelector("#end-screen");
let finalScore = document.querySelector("#final-score");
let submitBtn = document.querySelector("#submit");
let questionScreen = document.querySelector("#questions");
let questionTitle = document.querySelector("#question-title");
let choicesDiv = document.querySelector("#choices");


//startQuiz function 
function startQuiz() {
  let startScreen = document.querySelector("#start-screen");
  startScreen.setAttribute("class", "hide");
  questionScreen.classList.remove("hide");
  feedback.classList.remove("hide");
  //set current question array to 0
  currentQuestion = 0;

  //timer
  countdown();
  //show questions
  renderQuestion();
}

//next question 
function renderQuestion() {
  //clear previous question
  clearQuestion();
  //then make next question
  makeQuestion();
}

//create questions
function makeQuestion() {
  let theQuestion = quizQuestions[currentQuestion].question;
  questionTitle.innerText = theQuestion;

  //ordered list
  let choicesList = document.createElement("ol");
  let answers = quizQuestions[currentQuestion].choices;
  choicesDiv.appendChild(choicesList);

  //loop 
   for (i = 0; i < answers.length; i++) {
    //button with list item 
    //choice quizQuestion
    let choiceButton = document.createElement("button");
    let choices = document.createElement("li");

    choicesList.appendChild(choiceButton);
    choiceButton.appendChild(choices);
    choices.textContent = answers[i];
  }
  choices.addEventListener("click", userChoice);
}

//Clear current question 
function clearQuestion() {
  questionTitle.innerText = "";
  choices.innerText = "";
}

//Answer selection 
function userChoice(e) {
  let selection = e.target.innerText;
  let correctAnswer = quizQuestions[currentQuestion].answer;

  //if selected answer = the correct answer
  if (selection == correctAnswer) {
    feedback.textContent = "Correct!";
      currentQuestion++;
    //checks to see if it is currently last question
    if (currentQuestion === quizQuestions.length) {
      endQuiz();
      //otherwise show next question
    } else {
      renderQuestion();
    }
  } else {
    //otherwise, if wrong
    feedback.textContent = "Wrong!";
   
    // decrease timer by 5s
    countdownTimer -= 5;
  }
}

//Endscreen 
function endQuiz() {
  showScore();
  questionScreen.setAttribute("class", "hide");
  feedback.setAttribute("class", "hide");
  endScreen.classList.remove("hide");
}

//Countdown 
function countdown() {
  countdownInterval = setInterval(function () {
    countdownTimer--;
    timer.textContent = countdownTimer;

    if (countdownTimer <= 0) {
      countdownTimer = 0;
      endQuiz();
    }
  }, 1000);
}

startBtn.addEventListener("click", function () {
  startQuiz();
});

//show score 
function showScore() {
  let finalScore = document.querySelector("#final-score");

  clearInterval(countdownInterval);
  finalScore.innerText = timer.textContent;
}

//place initials 
function saveInitials() {
  let initials = initialsInput.value;
  if (initials) {
    return initials;
  } else {
    return "UNK";
  }
}

//save initials & score
function saveScore() {
  let userInitials = saveInitials();
  let userScore = { name: userInitials, score: timer.textContent };
  //save initials & score - local storage
  let hasScore = localStorage.getItem("userScore");

  let scoresArray = [];
  //check if userScore has content
  if (hasScore) {
    //if true, parse the string - array
    scoresArray = JSON.parse(hasScore);
    //push score - array
    scoresArray.push(userScore);
  } else {
    //else save object - array
    scoresArray = [userScore];
  }
  //save array - local storage
  localStorage.setItem("userScore", JSON.stringify(scoresArray));
}

//Submit button 
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  //retrieve values from local storage
  saveScore();
  //- redirect to highschore.html
  window.location.href = "./highscores.html";
});
