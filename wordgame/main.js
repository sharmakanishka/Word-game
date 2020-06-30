window.addEventListener('load', init);

// Globals

// Available Levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 1
};

// To change level
const currentLevel = levels.medium;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'bag',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'synonym',
  'laughter',
  'muagic',
  'master',
  'space',
  'definition'
];




// EASY LEVEL
document.getElementById("easy").addEventListener("click", (e)=>{
    // Hid the buttons for level selection and show the game window.
    gameWindow.style.display = "block";
    buttons.style.display = "none";

    currentLevel = levels.easy;
    seconds.innerHTML = currentLevel;
    time = currentLevel;

    // Store difficulty for points variations.
    const target = e.target.id;
    sessionStorage.setItem("checkDifficulty", target);
    init();
})

// MEDIUM LEVEL
document.getElementById("medium").addEventListener("click", (e)=>{
    // Hid the buttons for level selection and show the game window.
    gameWindow.style.display = "block";
    buttons.style.display = "none";

    currentLevel = levels.medium;
    seconds.innerHTML = currentLevel;
    time = currentLevel;

    // Store difficulty for points variations.
    const target = e.target.id;
    sessionStorage.setItem("checkDifficulty", target);
    init();
})
// HARD LEVEL
document.getElementById("hard").addEventListener("click", (e)=>{
    // Hid the buttons for level selection and show the game window.
    gameWindow.style.display = "block";
    buttons.style.display = "none";

    currentLevel = levels.hard;
    seconds.innerHTML = currentLevel;
    time = currentLevel;

    // Store difficulty for points variations.
    const target = e.target.id;
    sessionStorage.setItem("checkDifficulty", target);
    init();
})

// Initialize Game
function init() {
  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;
  // Load word from array
  showWord(words);
  // Start matching on word input
  wordInput.addEventListener('input', startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
    score++;
  }

  // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!!!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}

// Pick & show random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
  // Make sure time is not run out
  if (time > 0) {
    // Decrement
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = 'Game Over!!';
    score = -1;
  }
}function gameOver(){
    // Hide game.
    gameWindow.style.display = "none";
    displayedWord.style.display = "none";
    intro.style.display = "none";

    // Store the highscore in local storage IF its bigger than the score achieved during last game.
    let highscore = localStorage.getItem("highscore");
    if( score > highscore) {
        localStorage.setItem("highscore", score);
        document.getElementById("highscore").innerHTML = highscore;        
    }

    // Display game over menu.
    document.querySelector(".gameOver").style.display = "block";
    
    // Delete highscore.
    document.getElementById("deleteHighscore").addEventListener("click", ()=>{
        // Remove the local storage item for highscore.
        localStorage.removeItem("highscore");
        // Display the change
        highscore = 0
        document.getElementById("highscore").innerHTML = highscore;        
    })
    
    // Display current score.
    document.getElementById("yourScore").innerHTML = score;
    // Display the highscore if it has not changed during last game.
    document.getElementById("highscore").innerHTML = highscore;
    // Display play again button.
    document.getElementById("again").addEventListener("click", ()=>{
        location.reload();
    })
}

// Info button
document.getElementById("infoButton").addEventListener("click", ()=>{
    const infoBox = document.querySelector(".infoBox");
    infoBox.classList.toggle("infoBoxActive");
})

// Clear session storage for difficulty.
window.onload = function clear() {
    sessionStorage.removeItem("checkDifficulty");
}