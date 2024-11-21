const grid = document.getElementById("grid");
const restartBtn = document.getElementById("restart");
const timerDisplay = document.getElementById("timer");
const movesDisplay = document.getElementById("moves");

let cards = [
  "🥶", "🥶", "😂", "😂", "😏", "😏", 
  "😱", "😱", "🥳",  "🥳",  "🧐",  "🧐", 
  "😘", "😘", "🥸", "🥸", "🥺", "🥺", 
  "🤡", "🤡", "❤‍🔥", "❤‍🔥", "🤧", "🤧",
  "👿", "👿", "👻", "👻", "🫣", "🫣",
  "😡", "😡", "😭", "😭", "👹", "👹",
];

let flippedCards = [];
let matchedCards = [];
let moves = 0;
let timer;
let secondsElapsed = 0;

// Initialize game
function startGame() {
  grid.innerHTML = "";
  matchedCards = [];
  flippedCards = [];
  moves = 0;
  secondsElapsed = 0;
  updateStats();
  shuffleCards();
  createCards();
  startTimer();
}

// Shuffle cards
function shuffleCards() {
  cards.sort(() => Math.random() - 0.5);
}

// Create card elements
function createCards() {
  cards.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;

    card.addEventListener("click", () => handleCardClick(card));

    grid.appendChild(card);
  });
}

// Handle card click
function handleCardClick(card) {
  if (flippedCards.length === 2 || card.classList.contains("flipped") || card.classList.contains("matched")) {
    return;
  }

  card.classList.add("flipped");
  card.textContent = card.dataset.symbol;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    updateStats();
    checkMatch();
  }
}

// Check if two flipped cards match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedCards.push(card1, card2);
    flippedCards = [];

    if (matchedCards.length === cards.length) {
      setTimeout(() => alert(`You win! Time: ${formatTime(secondsElapsed)}, Moves: ${moves}`), 500);
      clearInterval(timer);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.textContent = "";
      card2.textContent = "";
      flippedCards = [];
    }, 1000);
  }
}

// Update stats
function updateStats() {
  movesDisplay.textContent = moves;
  timerDisplay.textContent = formatTime(secondsElapsed);
}

// Start timer
function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    secondsElapsed++;
    updateStats();
  }, 1000);
}

// Format time
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Restart game
restartBtn.addEventListener("click", startGame);

// Initialize
startGame();
