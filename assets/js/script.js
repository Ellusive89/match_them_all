let moves = document.getElementById("moves-count");
let time = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");


// card list array
const cardList = [
    {name: "anna", image: "anna.png"},
    {name: "ariel", image: "ariel.png"},
    {name: "aurora", image: "aurora.png"},
    {name: "belle", image: "belle.png"},
    {name: "cinderella", image: "cinderella"},
    {name: "elsa", image: "elsa.png"},
    {name: "jasmine", image: "jasmine.png"},
    {name: "merida", image: "merida.png"},
    {name: "mirabel", image: "mirabel.png"},
    {name: "moana", image: "moana.png"},
    {name: "mulan", image: "mulan.png"},
    {name: "pocahontas", image: "pocahontas.png"},
    {name: "rapunzel", image: "rapunzel.png"},
    {name: "snow_white", image: "snow_white.png"},
    {name: "tiana", image: "tiana.png"}
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



