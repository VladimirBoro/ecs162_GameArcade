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

const CARD_BACK = "radial-gradient(circle, rgb(34, 33, 33), rgb(0, 0, 0))";

let lives = 5;
let choice1Index = -1;
let choice1;
let foundCards; // set for game logic

let gameRunning = false;
/* 
    8 pairs of cards.
    Will be shuffled, shown, and then hidden when staring game. 
*/ 
let deck = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];

// This is like the main "game loop". Input logic is handled here.
document.addEventListener("DOMContentLoaded", function () {
    const gameArea = document.getElementById("gameArea");

    // listen for clicks in the game area
    gameArea.addEventListener('click', function(event) {
        const buttons = Array.from(gameArea.querySelectorAll(".selection button")) 
        const buttonIndex = buttons.indexOf(event.target);
    
        // ignore clicking non buttons in game area
        if (buttonIndex === -1) { return; }

        // Do not allow play if board has not been shuffled by clicking play!
        if (gameRunning === false) { alert("Click play to start the game first."); return;}

        // Ignore clicking cards that are already found and matched.
        if (foundCards.has(buttonIndex)) { return; }

        // get the card image so we can flip it
        const clickedButton = event.target;
        const selection = clickedButton.closest(".selection");
        const card = selection.querySelector(".card");

        // first look, flip card and remember it
        if (choice1Index === -1) {
            console.log(buttonIndex);
            
            choice1Index = buttonIndex;
            choice1 = card;
            flipCard(deck[choice1Index], card);
        }
        // failure of matching
        else if (deck[choice1Index] !== deck[buttonIndex]) {
            lives -= 1;
            
            // game lose check
            checkForloss();
            
            flipCard(deck[buttonIndex], card);

            // if no lose then hold cards for 1.25s and then flip back over
            const card1 = choice1;
            const card2 = card;
            setTimeout( () => {
                hideCards(card1, card2);
            }, 1000);
            
            choice1Index = -1;
            choice1 = null;
        }
        // we have a match!
        else if (choice1Index !== buttonIndex) {
            foundCards.add(buttonIndex);
            foundCards.add(choice1Index);
            flipCard(deck[buttonIndex], card);
            setTimeout(checkForWin, 100); // delay win message for better feel.
            choice1Index = -1;
            choice1 = null;
        }
        
    });
});


// initialize game for start
function startGame() {
    foundCards = new Set();
    gameRunning = true;
    deck = [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7];    
    shuffleDeck();
    flashCards();
    setTimeout(unflashCards, 1500);
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
        case Card.ZERO: card.style.backgroundImage = "radial-gradient(circle, pink, red)"; break;
        case Card.ONE: card.style.backgroundImage = "radial-gradient(circle, black, orange)"; break;
        case Card.TWO: card.style.backgroundImage = "radial-gradient(circle, white, purple)"; break;
        case Card.THREE: card.style.backgroundImage = "radial-gradient(circle, dodgerblue, blue)"; break;
        case Card.FOUR: card.style.backgroundImage = "radial-gradient(circle, lightgrey, grey)"; break;
        case Card.FIVE: card.style.backgroundImage = "radial-gradient(circle, yellow, gold)"; break;
        case Card.SIX: card.style.backgroundImage = "radial-gradient(circle, tomato, green)"; break;
        case Card.SEVEN: card.style.backgroundImage = "radial-gradient(circle, slateblue, violet)"; break;
    }
}

function hideCards(card1, card2) {
    card1.style.backgroundImage = CARD_BACK;
    card2.style.backgroundImage = CARD_BACK;
}

function checkForloss() {
    if (lives <= 0) {
        alert("You messed up 5 times... You Lose!");
        location.reload();
    }
}

function checkForWin() {
    if (foundCards.size === deck.length) {
        alert("Congratulations! You Win!");
        location.reload();
    }
}

function flashCards() {
    // call flip card on whole deck
    let gameArea = document.getElementById("gameArea");
    let cards = gameArea.querySelectorAll(".card");

    for (let i = 0; i < cards.length; i++) {
        flipCard(deck[i], cards[i]);
    }
}

function unflashCards() {
    let gameArea = document.getElementById("gameArea");
    let cards = gameArea.querySelectorAll(".card");

    for (let i = 0; i < cards.length; i++) {
        cards[i].style.backgroundImage = CARD_BACK;
    }
}


