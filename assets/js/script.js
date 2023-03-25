let moves = document.getElementById("moves-count");
let time = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameBox = document.getElementsByClassName("game-box");


// card list array
const cardList = [
    {name: "anna", image: "assets/images/anna.png"},
    {name: "ariel", image: "assets/images/ariel.png"},
    {name: "aurora", image: "assets/images/aurora.png"},
    {name: "belle", image: "assets/images/belle.png"},
    {name: "cinderella", image: "assets/images/cinderella"},
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
const rows = 6;
const columns = 5;


function shuffleCards() {
// double the card list to create pairs
cardDeck = cardList.concat(cardList);
console.log(cardDeck)
// shuffle cards
for (let i=0; i < cardDeck.length; i++){
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

        gameBox.appendChild(card);
    }
}






