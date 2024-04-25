let snakeArray = [[]];
let snakeHeadSize = 10;
let snakeHead;
let snakeSpeed = 10;
let snakeDirection = "right";

let canvas;
let ctx;

document.addEventListener("DOMContentLoaded", function () {
    canvas = document.getElementById("snakeCanvas");
    ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

let eaten = false;
let foodX = 600;
let foodY = 500;

let gameInterval;

document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener("keydown", pressDown);
    
    // const startButton = document.getElementById("snake");
    // startButton.addEventListener("click", function() {
    //     startSnake();
    // });

    const startButtons = document.querySelectorAll(".snake");
    startButtons.forEach((button) => { button.addEventListener("click", startSnake) });
});
 
// player input function
function pressDown(keypress) {
    if (keypress.keyCode == 83) {
        snakeDirection = "down";
    }
    else if (keypress.keyCode == 87) {
        snakeDirection = "up";
    }
    else if (keypress.keyCode == 65) {
        snakeDirection = "left";
    }
    else if (keypress.keyCode == 68) {
        snakeDirection = "right";
    }
    else if (keypress.keyCode == 27) {
        snakeSpeed = snakeSpeed > 0 ? clearInterval(gameInterval) : setInterval(drawGame, 45);
    }
}

function startSnake() {
    // clear out all old stuff
    snakeArray = [[]];
    var x = document.getElementById("loseScreen");
    x.style.display = "none";
    clearInterval(gameInterval);
    clearScreen();

    // initialize snake
    snakeHead = [0, 0];
    snakeDirection = "right";
    grow();
    grow();

    // serves as game loop
    gameInterval = setInterval(drawGame, 45); 
}

function drawGame() {
    clearScreen();
    snakeController();
    drawFood();
    wallCollision();
    ctx.fillStyle = "grey";
    snakeArray.forEach((block) => ctx.fillRect(block[0], block[1], snakeHeadSize, snakeHeadSize));
}

function eatFood() {
    if (snakeHead[0] == foodX && snakeHead[1] == foodY) {
        grow();
        grow();
        grow();
        eaten = true;
    }
}

function grow() {
    snakeArray.push([0,0]);
}

function drawFood() {
    if (eaten) {
        foodX = Math.round(Math.random() * (canvas.width / snakeHeadSize)) * snakeHeadSize;
        foodY = Math.round(Math.random() * (canvas.height / snakeHeadSize)) * snakeHeadSize;
        eaten = false;
    }

    ctx.fillStyle = "red";
    ctx.fillRect(foodX, foodY, snakeHeadSize, snakeHeadSize); 
}

function selfCollision() {
    if (snakeArray.find((block) => block.toString() === snakeHead.toString()) != undefined) {
        console.log("You Lose!!");
        loseGame();
    }
}

function wallCollision() {
    if (snakeHead[0] < 0) {
        snakeHead[0] = 0;
        console.log("You Lose!!");
        loseGame();
    }
    if (snakeHead[0] + snakeHeadSize > 1000) {
        snakeHead[0] = 1000 - snakeHeadSize;
        console.log("You Lose!!");
        loseGame();
    }
    if (snakeHead[1] < 0) {
        snakeHead[1] = 0;
        console.log("You Lose!!");
        loseGame();
    }
    if (snakeHead[1] + snakeHeadSize > 750) {
        snakeHead[1] = 750 - snakeHeadSize;
        console.log("You Lose!!");
        loseGame();
    }
}

function dragBody() {
    snakeArray.pop(); // pop off the last piece of the tail

    /* [... ] is so that we don't add the reference to snakeHead
        instead a new copy is made so that the value persists. */
    snakeArray.unshift([...snakeHead]);
}

function snakeController() {
    if (snakeDirection === "down") {
        // calc and lock in x pos
        snakeHead[0] = Math.round(snakeHead[0] / snakeHeadSize) * snakeHeadSize;
        snakeHead[1] += snakeSpeed;
    }
    else if (snakeDirection === "up") {
        snakeHead[0] = Math.round(snakeHead[0] / snakeHeadSize) * snakeHeadSize;
        snakeHead[1] -= snakeSpeed;
    }
    else if (snakeDirection === "left") {
        snakeHead[1] = Math.round(snakeHead[1] / snakeHeadSize) * snakeHeadSize;
        snakeHead[0] -= snakeSpeed;
    }
    else if (snakeDirection === "right") {
        snakeHead[1] = Math.round(snakeHead[1] / snakeHeadSize) * snakeHeadSize;
        snakeHead[0] += snakeSpeed;
    }
    
    selfCollision();
    eatFood();
    dragBody();
}

function loseGame() {
    clearInterval(gameInterval);
    var x = document.getElementById("loseScreen");
    x.style.display = "block";
    // x.style.display = "none";
}

function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 750, 750);
}
