//Navigation between sections
const introNav = document.querySelector("#introNav");
const plasticNav = document.querySelector("#plasticNav");
const climateNav = document.querySelector("#climateNav");
const intro = document.querySelector("#intro");
const plastic = document.querySelector("#plastic");
const climate = document.querySelector("#climate");

function hideall() {
  intro.style.display = "none";
  plastic.style.display = "none";
  climate.style.display = "none";
  intro.classList.remove("fade-in");
  plastic.classList.remove("fade-in");
  climate.classList.remove("fade-in");
}

introNav.addEventListener("click", function () {
  hideall();
  intro.style.display = "block";
  intro.classList.add("fade-in");
});

plasticNav.addEventListener("click", function () {
  hideall();
  plastic.style.display = "block";
  plastic.classList.add("fade-in");
});

climateNav.addEventListener("click", function () {
  hideall();
  climate.style.display = "block";
  climate.classList.add("fade-in");
});

// Show intro section on page load
hideall();
intro.style.display = "block";

//Game (clicking plastic)
const plasticId = document.getElementById("plasticId");

//Random plastic position on screen (to move the plastic)
function GetRandom(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function MovePlastic() {
  plasticId.style.left = GetRandom(-150, 150) + "px";
  plasticId.style.top = GetRandom(0, 200) + "px";
}

//Call MovePlastic every 1 second
var movePlasticId = setInterval(MovePlastic, 1000);

//Add 1 to score for each click
const scoreBoxGame = document.getElementById("scoreBoxGame");
const collectAudio = new Audio("audio/plastic.mp3");
var scoreGame = 0;

function plasticClick() {
  scoreGame++;
  scoreBoxGame.innerHTML = "Score: " + scoreGame;
  collectAudio.play();

  // Temporarily hide plastic
  plasticId.style.visibility = "hidden";
  clearInterval(movePlasticId);
  setTimeout(function () {
    MovePlastic();
    plasticId.style.visibility = "visible";
    movePlasticId = setInterval(MovePlastic, 1000);
  }, 1000);
}

plasticId.addEventListener("click", plasticClick);

//MCQ
const btnSubmit = document.querySelector("#btnSubmit");
btnSubmit.addEventListener("click", CheckAns);
const scoreBoxMCQ = document.querySelector("#scoreBoxMCQ");

var q1, q2, q3, scoreMCQ = 0;

function CheckAns() {
  scoreMCQ = 0; //reset score to 0, check ans and give score if correct

  //read the value of the selected radio button for q1
  try {
    q1 = document.querySelector("input[name='q1']:checked").value;
    console.log(q1); //check q1 value retrieved
    if (q1 == "q13") scoreMCQ++;
  } catch (e) { }

  //read the value of the selected radio button for q2
  try {
    q2 = document.querySelector("input[name='q2']:checked").value;
    console.log(q2); //check q2 value retrieved
    if (q2 == "q21") scoreMCQ++;
  } catch (e) { }

  //read the value of the selected radio button for q3
  try {
    q3 = document.querySelector("input[name='q3']:checked").value;
    console.log(q3); //check q3 value retrieved
    if (q3 == "q34") scoreMCQ++;
  } catch (e) { }

  scoreBoxMCQ.innerHTML = "Calculating...";
  setTimeout(function () {
    scoreBoxMCQ.innerHTML = "Score: " + scoreMCQ;
  }, 2000);
}

// JavaScript active nav marker
const navLinks = document.querySelectorAll("ul li a");
navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.forEach(function (l) {
      l.classList.remove("active");
    });
    this.classList.add("active");
  });
});

// Reset Button to clear game + MCQ + bring user back to intro section
document.getElementById("resetButton").addEventListener("click", function () {
  scoreGame = 0;
  scoreMCQ = 0;
  scoreBoxGame.innerHTML = "Score: 0";
  scoreBoxMCQ.innerHTML = "Not submitted";

  q1 = null;
  q2 = null;
  q3 = null;

  //Clear all MCQ radio buttons
  var radios = document.querySelectorAll("input[type='radio']");
  radios.forEach(function (radio) {
    radio.checked = false;
  });

  // Remove nav active class
  navLinks.forEach(function (link) {
    link.classList.remove("active");
  });

  hideall();
  intro.style.display = "block";
  window.location.hash = "#top";
});

// Fullscreen toggle button
const fullscreenBtn = document.getElementById("fullscreenBtn");
fullscreenBtn.addEventListener("click", function () {
  var docElm = document.documentElement;

  if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm.webkitRequestFullscreen) {
      docElm.webkitRequestFullscreen();
    } else if (docElm.msRequestFullscreen) {
      docElm.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
});
