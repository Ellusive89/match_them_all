let moves = document.getElementById("moves-count");
let time = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameDiv = document.querySelector(".game");
const gameContainer = document.getElementById("game-box");



// card list array
const cardList = [
    {name: "anna", image: "assets/images/anna.png"},
    {name: "ariel", image: "assets/images/ariel.png"},
    {name: "aurora", image: "assets/images/aurora.png"},
    {name: "belle", image: "assets/images/belle.png"},
    {name: "cinderella", image: "assets/images/cinderella.png"},
    {name: "elsa", image: "assets/images/elsa.png"},
    {name: "jasmine", image: "assets/images/jasmine.png"},
    {name: "merida", image: "assets/images/merida.png"},
    {name: "mirabel", image: "assets/images/mirabel.png"},
    {name: "moana", image: "assets/images/moana.png"},
    {name: "mulan", image: "assets/images/mulan.png"},
    {name: "pocahontas", image: "assets/images/pocahontas.png"},
    {name: "rapunzel", image: "assets/images/rapunzel.png"},
    {name: "snow_white", image: "assets/images/snow_white.png"},
    {name: "tiana", image: "assets/images/tiana.png"}
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
        backFace.style.backgroundImage = 'url(assets/images/question_mark.png)';

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
    } else {
        cardOne.classList.remove('flip');
        cardTwo.classList.remove('flip');
    }

    cardChosen = [];
    cardChosenId = [];
    moveCounter++;
    moves.textContent = `Moves: ${moveCounter}`; //counting how many moves it took to match all cards

    if (cardsWon.length === cardDeck.length) {
        clearInterval(timer);
        alert(`Congratulations! You've won! Moves: ${moveCounter}, Time: ${minutes} minutes ${seconds} seconds.`);
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





