"strict code";

let currentQuestion;
let countdownTimer = 60;
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

/*let rightBuzz = new Audio("./assets/sfx/correct.wav");
let wrongBuzz = new Audio("./assets/sfx/incorrect.wav");*/

//startQuiz function to start quiz
function startQuiz() {
  let startScreen = document.querySelector("#start-screen");
  //change class from start to hide
  startScreen.setAttribute("class", "hide");
  //unhide question screen
  questionScreen.classList.remove("hide");
  //unhide feedback footer
  feedback.classList.remove("hide");
  //set current question array to 0
  currentQuestion = 0;

  //start timer
  countdown();
  //show question
  renderQuestion();
}

//show next question function
function renderQuestion() {
  //clear previous question
  clearQuestion();
  //then draw next question
  drawQuestion();
}

//create questions
function drawQuestion() {
  let theQuestion = quizQuestions[currentQuestion].question;
  questionTitle.innerText = theQuestion;

  //create an ordered list of answers
  let choicesList = document.createElement("ol");
  let answers = quizQuestions[currentQuestion].choices;

  //append the ordered list inside the choices div
  choicesDiv.appendChild(choicesList);

  //create a for loop that will loop through all the choices
  //within the quizQuestions Array
  for (i = 0; i < answers.length; i++) {
    //create a button with an ordered list item inside
    //for each choice within quizQuestion
    let choiceButton = document.createElement("button");
    let choices = document.createElement("li");

    choicesList.appendChild(choiceButton);
    choiceButton.appendChild(choices);
    choices.textContent = answers[i];
  }
  choices.addEventListener("click", userChoice);
}

//Clear current question function
function clearQuestion() {
  questionTitle.innerText = "";
  choices.innerText = "";
}

//Answer selection function
function userChoice(e) {
  let selection = e.target.innerText;
  let correctAnswer = quizQuestions[currentQuestion].answer;

  //answer logic
  //if selected answer = the right answer
  if (selection == correctAnswer) {
    feedback.textContent = "Correct!";
    // rightBuzz.play();
    //increment currentQuestion array
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
    // wrongBuzz.play();
    // decrease timer by 5s
    countdownTimer -= 5;
  }
}

//Endscreen function
function endQuiz() {
  showScore();
  questionScreen.setAttribute("class", "hide");
  feedback.setAttribute("class", "hide");
  endScreen.classList.remove("hide");
}

//Countdown Function
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

//Logic for Scores

//show score function
function showScore() {
  let finalScore = document.querySelector("#final-score");

  clearInterval(countdownInterval);
  finalScore.innerText = timer.textContent;
}

//initials input
function submitInitials() {
  let initials = initialsInput.value;
  if (initials) {
    return initials;
  } else {
    return "UNK";
  }
}

//save initials and score function
function saveScore() {
  let userInitials = submitInitials();
  let userScoreProfile = { name: userInitials, score: timer.textContent };
  //save score and initials to local storage
  let hasScore = localStorage.getItem("userScoreProfile");

  let scoresArray = [];
  //check if userScoreProfile has content
  if (hasScore) {
    //if true, parse the string into array
    scoresArray = JSON.parse(hasScore);
    //push score into array
    scoresArray.push(userScoreProfile);
  } else {
    //else save object inside the array
    scoresArray = [userScoreProfile];
  }
  //save array into local storage
  localStorage.setItem("userScoreProfile", JSON.stringify(scoresArray));
}

//Submit button listens for a click event
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  //retrieve values from local storage
  saveScore();
  //- redirect to highschore.html
  window.location.href = "./highscores.html";
});