// Navigation Logic
const introNav = document.querySelector("#introNav");
const plasticNav = document.querySelector("#plasticNav");
const climateNav = document.querySelector("#climateNav");
// const effectsNav = document.querySelector("#effectsNav");
const intro = document.querySelector("#intro");
const plastic = document.querySelector("#plastic");
const climate = document.querySelector("#climate");
// const effects = document.querySelector("#effects");

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
// effectsNav.addEventListener("click", function () {
//     hideall();
//     effects.style.display = "block";
// });
hideall();
intro.style.display = "block";

// Plastic Pollution Minigame
const plasticId = document.getElementById("plasticId");
function GetRandom(min, max) {
    //this will select a number between min and max
    return Math.round(Math.random() * (max - min)) + min;
}
function MovePlastic() {
    plasticId.style.left = GetRandom(-200, 200) + "px";
    plasticId.style.top = GetRandom(0, 200) + "px";
}
var movePlasticId = setInterval(MovePlastic, 1000);

const scoreBoxGame = document.getElementById("scoreBoxGame");
const collectAudio = new Audio("audio/plastic.mp3")
var scoreGame = 0;
function plasticClick() {
    scoreGame++;
    scoreBoxGame.innerHTML = "Score: " + scoreGame;
    collectAudio.play();

    // Hide and stop movement
    plasticId.style.visibility = "hidden";
    clearInterval(movePlasticId);

    // After 2 seconds, move and show again, resume movement
    setTimeout(() => {
        MovePlastic();
        plasticId.style.visibility = "visible";
        movePlasticId = setInterval(MovePlastic, 1000); // resume moving
    }, 1000);
}
plasticId.addEventListener("click", plasticClick)

// MCQ Quiz
const btnSubmit = document.querySelector("#btnSubmit");
btnSubmit.addEventListener("click", CheckAns);
const scoreBoxMCQ = document.querySelector("#scoreBoxMCQ");
var q1, q2, q3, scoreMCQ = 0;
function CheckAns() {
    scoreMCQ = 0; //reset score to 0, check ans and give score if correct
    //read the value of the selected radio button for q1
    q1 = document.querySelector("input[name='q1']:checked").value;
    console.log(q1); //check q1 value retrieved
    if (q1 == "q13") scoreMCQ++;
    //read the value of the selected radio button for q2
    q2 = document.querySelector("input[name='q2']:checked").value;
    console.log(q2); //check q2 value retrieved
    if (q2 == "q21") scoreMCQ++;
    //read the value of the selected radio button for q3
    q3 = document.querySelector("input[name='q3']:checked").value;
    console.log(q3); //check q3 value retrieved
    if (q3 == "q34") scoreMCQ++;
    
    // timed event mcq score
    scoreBoxMCQ.innerHTML = "Calculating...";
    setTimeout(() => {
        scoreBoxMCQ.innerHTML = "Score: " + scoreMCQ;
    }, 2000);
}

// update CSS properties
const navLinks = document.querySelectorAll("ul li a");

navLinks.forEach(link => {
    link.addEventListener("click", function () {
        navLinks.forEach(l => l.classList.remove("active")); // remove from all
        this.classList.add("active"); // add to clicked
    });
});

// reset button
document.getElementById("resetButton").addEventListener("click", () => {
    // Reset variables
    scoreGame, scoreMCQ = 0;
    scoreBoxGame.innerHTML = "Score: 0";
    scoreBoxMCQ.innerHTML = "Not submitted";

    q1 = null;
    q2 = null;
    q3 = null;
    
    //reset radio buttons
    const radios = document.querySelectorAll("input[type='radio']");
    radios.forEach(radio => radio.checked = false);

    // Reset navigation styling
    document.querySelectorAll("ul li a").forEach(link => {
        link.classList.remove("active");
    });

    // Send back to intro
    hideall();
    intro.style.display = "block";
    window.location.hash = "#top";
});

// fullscreen
const fullscreenBtn = document.getElementById("fullscreenBtn");

  fullscreenBtn.addEventListener("click", () => {
    const docElm = document.documentElement;

    if (!document.fullscreenElement) {
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.webkitRequestFullscreen) { /* Safari */
        docElm.webkitRequestFullscreen();
      } else if (docElm.msRequestFullscreen) { /* IE11 */
        docElm.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
    }
  });
