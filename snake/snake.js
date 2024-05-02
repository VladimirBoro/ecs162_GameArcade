"use stict";

let snakeArray = [];
let snakeHeadSize = 10;
let snakeHead;
let snakeSpeed = 10;
let snakeDirection = "right";
let canMove = true;

let canvas;
let ctx;

let eaten = true;
let foodX = 600;
let foodY = 500;

let gameInterval;

document.addEventListener("DOMContentLoaded", function () {
    // Initial blank canvas
    canvas = document.getElementById("snakeCanvas");
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Keyboard input listener
    document.body.addEventListener("keydown", pressDown);
    
    // Start game button listener
    const startButtons = document.querySelectorAll(".snake");
    startButtons.forEach((button) => { button.addEventListener("click", startSnake) });
});
 
// Player input function
function pressDown(keypress) {
    // console.log("keycode:", keypress.keyCode);
    if ((keypress.keyCode == 83 || keypress.keyCode == 40) && snakeDirection !== "up" && canMove) {
        snakeDirection = "down";
    }
    else if ((keypress.keyCode == 87 || keypress.keyCode == 38) && snakeDirection !== "down" && canMove) {
        snakeDirection = "up";
    }
    else if ((keypress.keyCode == 65 || keypress.keyCode == 37) && snakeDirection !== "right" && canMove) {
        snakeDirection = "left";
    }
    else if ((keypress.keyCode == 68 || keypress.keyCode == 39) && snakeDirection !== "left" && canMove) {
        snakeDirection = "right";
    }
    else if (keypress.keyCode == 27) {
        snakeSpeed = snakeSpeed > 0 ? clearInterval(gameInterval) : setInterval(drawGame, 45);
    }

    canMove = false; // limit direction input to avoid self collision bug
}

function startSnake() {
    // clear out all old stuff
    snakeArray = [];
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
    snakeController(); // snake logic here
    drawFood();
    drawSnake();
}

function drawSnake() {
    let patterPosition;
    for(let i = 0; i < snakeArray.length; i++) {
        patterPosition = i % 5;
        if (patterPosition == 0 || patterPosition == 1) {
            ctx.fillStyle = "DarkOliveGreen";
        }
        else if (patterPosition == 2 || patterPosition == 4) {
            ctx.fillStyle = "IndianRed";
        }
        else {
            ctx.fillStyle = "Indigo";
        }
        
        ctx.fillRect(snakeArray[i][0], snakeArray[i][1], snakeHeadSize, snakeHeadSize);
    }
}

function eatFood() {
    if (snakeHead[0] === foodX && snakeHead[1] === foodY) {
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
        console.log(foodX, foodY);
        eaten = false;
    }
    
    // console.log(canvas.width, canvas.height);
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
    // 4 walls 4 conditions...
    if (snakeHead[0] < 0) {
        snakeHead[0] = 0;
        loseGame();
    }
    if (snakeHead[0] + snakeHeadSize > canvas.width) {
        snakeHead[0] = canvas.width - snakeHeadSize;
        loseGame();
    }
    if (snakeHead[1] < 0) {
        snakeHead[1] = 0;
        loseGame();
    }
    if (snakeHead[1] + snakeHeadSize > canvas.width) {
        snakeHead[1] = canvas.width - snakeHeadSize;
        loseGame();
    }
}

function dragBody() {
    snakeArray.pop(); // pop off the last piece of the tail
    
    /* `[...snakeHead]` is so that we don't add the reference to snakeHead
    instead a new copy is made so that the value persists. */
    snakeArray.unshift([...snakeHead]);
}

// Apply position translation to snake head
function snakeController() {
    // console.log(snakeDirection);
    if (snakeDirection === "down") {
        // calc and lock in x pos (snakeHead[0]) by rounding
        snakeHead[0] = Math.round(snakeHead[0] / snakeHeadSize) * snakeHeadSize;
        snakeHead[1] += snakeSpeed;
    }
    else if (snakeDirection === "up") {
        snakeHead[0] = Math.round(snakeHead[0] / snakeHeadSize) * snakeHeadSize;
        snakeHead[1] -= snakeSpeed;
    }
    else if (snakeDirection === "left") {
        // calc and lock in y pos (snakeHead[1]) by rounding
        snakeHead[1] = Math.round(snakeHead[1] / snakeHeadSize) * snakeHeadSize;
        snakeHead[0] -= snakeSpeed;
    }
    else if (snakeDirection === "right") {
        snakeHead[1] = Math.round(snakeHead[1] / snakeHeadSize) * snakeHeadSize;
        snakeHead[0] += snakeSpeed;
    }

    canMove = true;
    
    wallCollision();
    selfCollision();    // check to see if head hit the body
    eatFood();          // check to see if head hit some food
    dragBody();
}

function loseGame() {
    alert("You Lose\n" + "Score: " + snakeArray.length);
    document.location.reload();
    clearInterval(gameInterval);
}

function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.width);
}
