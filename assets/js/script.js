let moves = document.getElementById("moves-count");
let time = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameDiv = document.querySelector(".game");
const gameContainer = document.getElementById("game-box");



// card list array
const cardList = [
    {name: "bee", image: "assets/images/bee.png", alt: "little bee"},
    {name: "cat", image: "assets/images/cat.png", alt: "sitting cat"},
    {name: "corgi", image: "assets/images/corgi.png", alt: "dog of corgi breed"},
    {name: "cow", image: "assets/images/cow.png", alt: "cute cow"},
    {name: "elephant", image: "assets/images/elephant.png", alt: "blue elephant"},
    {name: "fox", image: "assets/images/fox.png", alt: "little fox"},
    {name: "horse", image: "assets/images/horse.png", alt: "brown horse"},
    {name: "lama", image: "assets/images/lama.png", alt: "white lama"},
    {name: "octopus", image: "assets/images/octopus.png", alt: "purple octopus"},
    {name: "panda", image: "assets/images/panda.png", alt: "sleeping panda"},
    {name: "pig", image: "assets/images/pig.png", alt: "cute pig"},
    {name: "racoon", image: "assets/images/racoon.png", alt: "little racoon"},
    {name: "sloth", image: "assets/images/sloth.png", alt: "sloth hanging upside down from a branch"},
    {name: "unicorn", image: "assets/images/unicorn.png", alt: "unicorn"},
    {name: "whale", image: "assets/images/whale.png", alt: "whale with a unicorn-like horn"}
];

let cardDeck;
let board = [];
const rows = 5;
const columns = 6;
let cardChosen = [];
let cardChosenId = [];
let cardsWon = [];
let timer;
let moveCounter = 0;
let seconds = 0;
let minutes = 0;


function shuffleCards() {
// double the card list to create pairs
cardDeck = cardList.concat(cardList);
console.log(cardDeck)
// shuffle cards
for (let i = 0; i < cardDeck.length; i++){
    //get random card list
  let j = Math.floor(Math.random() * cardDeck.length);
  let shuffled = cardDeck[i];
  cardDeck[i] = cardDeck[j];
  cardDeck[j] = shuffled;
  }
  console.log(cardDeck);
}

//creating game board
function createBoard() {
    for (let i = 0; i < cardDeck.length; i++) {
        const card = document.createElement("div");
        card.classList.add("memory-card");
        card.dataset.name = cardDeck[i].name;

        const frontFace = document.createElement("div");
        frontFace.classList.add("front-face");
        frontFace.style.backgroundImage = `url(${cardDeck[i].image})`;

        const backFace = document.createElement("div");
        backFace.classList.add("back-face");
        backFace.style.backgroundImage = 'url(assets/images/paw.png)';

        card.appendChild(frontFace);
        card.appendChild(backFace);

        card.addEventListener("click", flipCard);

        gameContainer.appendChild(card);
    }
}

// creating function for flipping sides of the game cards
function flipCard() {
    if (this === cardChosen[0]) return;
    this.classList.add('flip');
    cardChosen.push(this);
    cardChosenId.push(this.dataset.name);

    if (cardChosen.length === 2) {
        setTimeout(checkForMatch, 200);
    }
}

// checking if two cards match
function checkForMatch() {
    const [cardOne, cardTwo] = cardChosen;
    const [idOne, idTwo] = cardChosenId;

    if (idOne === idTwo) {
        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        cardsWon.push(cardOne);
        cardsWon.push(cardTwo);
    } else { // adding shake effect to the cards that are not a match
        cardOne.classList.add('shake');
        cardTwo.classList.add('shake');
        setTimeout(() => {
          cardOne.classList.remove('flip', 'shake');
          cardTwo.classList.remove('flip', 'shake');
         }, 400);
    }

    cardChosen = [];
    cardChosenId = [];
    moveCounter++;
    moves.textContent = `Moves: ${moveCounter}`; //counting how many moves it took to match all cards

    if (cardsWon.length === cardDeck.length) {
        clearInterval(timer);
        
        // popup message
        const popupMessage = document.getElementById('popup-message');
  const popupMoves = document.getElementById('popup-moves');
  const popupTime = document.getElementById('popup-time');
  const popupCloseBtn = document.getElementById('popup-close-btn');

  popupMoves.textContent = `${moveCounter}`;
  popupTime.textContent = `${minutes} minutes ${seconds} seconds`;

  popupMessage.style.display = 'flex';

  popupCloseBtn.addEventListener('click', () => {
    popupMessage.style.display = 'none';
        });
    }
}

//function to show position of all the cards on the board 
function showAllCards() {
    const cards = document.querySelectorAll('.memory-card');
    cards.forEach(card => {
      card.classList.add('flip');
    });
    setTimeout(() => {
      cards.forEach(card => {
        card.classList.remove('flip');
      });
    }, 2000);
  }

// function for counting how long it took to match all cards
function updateTimer() {
    seconds++;
  
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }
  
    let minutesDisplay = minutes < 10 ? `0${minutes}` : minutes;
    let secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    
    time.textContent = `Time: ${minutesDisplay}:${secondsDisplay}`;
  }

// start and stop button function
startButton.addEventListener('click', () => {
    shuffleCards();
    createBoard();
    showAllCards();
    gameDiv.style.display = "flex";
    startButton.classList.add('hide');
    stopButton.classList.remove('hide');
    timer = setInterval(updateTimer, 1000);
});

stopButton.addEventListener('click', () => {
    location.reload();
});





