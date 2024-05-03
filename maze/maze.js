"use strict";

// player elements
const playerSize = 5;
const playerSpeed = 0.5;
let moveUp = false;
let moveDown = false;
let moveLeft = false;
let moveRight = false;
let playerX;
let playerY;

// map elements
const map = [];
let cellSize;

let lastFrame;

// canvas elements
let canvas;
let ctx;

document.addEventListener("DOMContentLoaded", function () {
    canvas = document.getElementById("mazeCanvas");

    ctx = canvas.getContext("2d");
    clearScreen();    

    // Keyboard input listener
    document.body.addEventListener("keydown", pressDown);
    document.body.addEventListener("keyup", pressUp);
});

function startGame() {
    cancelAnimationFrame(lastFrame);
    spawnPlayer();
    drawGame();
}

function spawnPlayer() {
    let yRange = canvas.height / 8;
    playerX = playerSize + (Math.random() * (canvas.width - playerSize * 2));
    playerY = playerSize + (Math.random() * (yRange - playerSize * 2)) + canvas.height - yRange;
    console.log(playerX, playerY);
    drawCharacter();
}

function updatePlayer() {
    if (moveDown) {
        playerY += playerSpeed;
    }
    if (moveUp) {
        playerY -= playerSpeed;
    }
    if (moveLeft) {
        playerX -= playerSpeed;
    }
    if (moveRight) {
        playerX += playerSpeed;
    }
}

function drawCharacter() {
    ctx.beginPath();
    ctx.arc(playerX, playerY, playerSize, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.fill();
}

function fillMap() {
    ctx.fillStyle = "white";
    // (x,y,width,height)
    ctx.fillRect(0, canvas.height - canvas.height / 8, canvas.width, canvas.height / 8);
    ctx.fillRect(canvas.width - canvas.width / 2, canvas.height - canvas.height / 2, canvas.width / 8, canvas.height / 2);
    ctx.fillRect(canvas.width / 8, canvas.height - canvas.height / 2, 3 * (canvas.width / 8), canvas.height / 16);
}

function drawGame() {
    clearScreen();
    lastFrame = requestAnimationFrame(drawGame);
    updatePlayer();
    drawCharacter();
}

function collsionCheck() {

}

function pressDown(keypress) {
    if ((keypress.keyCode == 83 || keypress.keyCode == 40)) {
        moveDown = true;
    }
    if ((keypress.keyCode == 87 || keypress.keyCode == 38)) {
        moveUp = true;
    }
    if ((keypress.keyCode == 65 || keypress.keyCode == 37)) {
        moveLeft = true;
    }
    if ((keypress.keyCode == 68 || keypress.keyCode == 39)) {
        moveRight = true;
    }
}

function pressUp(keypress) {
    if ((keypress.keyCode == 83 || keypress.keyCode == 40)) {
        moveDown = false;
    }
    if ((keypress.keyCode == 87 || keypress.keyCode == 38)) {
        moveUp = false;
    }
    if ((keypress.keyCode == 65 || keypress.keyCode == 37)) {
        moveLeft = false;
    }
    if ((keypress.keyCode == 68 || keypress.keyCode == 39)) {
        moveRight = false;
    }
}

function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    fillMap();
}