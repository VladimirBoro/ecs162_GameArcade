"use script";

const Card = {
    ZERO: 0,
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
  };

let lives = 3;
let choice1;
let choice2;

let gameRunning = false;

document.addEventListener("DOMContentLoaded", function () {
    const gameArea = document.getElementById("gameArea");
    gameArea.addEventListener('click', function(number) {
        const buttons = Array.from(gameArea.querySelectorAll(".selection button")) 
        const buttonIndex = buttons.indexOf(number.target);
        // flipCard(buttonIndex);
    
        // get the card image so we can flip it
        const clickedButton = number.target;
        const parentSelection = clickedButton.closest(".selection");
        const card = parentSelection.querySelector(".card");
        
        console.log(buttonIndex);
        flipCard(deck[buttonIndex], card);
    });
});

// fill gameArea up
dealCards();

/* 
    8 pairs of cards.
    Will be shuffled, shown and then hidden when staring game. 
*/ 
let deck = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];

function startGame() {
    gameRunning = true;
    deck = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];    
    shuffleDeck();
    flashCards();
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
      return deck;
}

function flipCard(number, card) {
    // change color according to position
    // then time function call to back to back
    switch (number) {
        case Card.ZERO: card.style.backgroundImage = "linear-gradient(to right, red, yellow)"; break;
        case Card.ONE: card.style.backgroundImage = "linear-gradient(to right, orange, black)"; break;
        case Card.TWO: card.style.backgroundImage = "linear-gradient(to right, white, purple)"; break;
        case Card.THREE: card.style.backgroundImage = "linear-gradient(to right, green, blue)"; break;
        case Card.FOUR: card.style.backgroundImage = "linear-gradient(to right, brown, grey)"; break;
        case Card.FIVE: card.style.backgroundImage = "linear-gradient(to right, pink, gold)"; break;
        case Card.SIX: card.style.backgroundImage = "linear-gradient(to right, tomato, dodgerblue)"; break;
        case Card.SEVEN: card.style.backgroundImage = "linear-gradient(to right, violet, slateblue)"; break;
    }

}

function flashCards() {
    // call flip card on whole deck
}

function dealCards() {
    // idk yet...
    // for (let i = 0; i < deck.length; i++) {
    //     const card = document.
    // }
}