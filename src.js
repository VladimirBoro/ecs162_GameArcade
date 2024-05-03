document.addEventListener("DOMContentLoaded", function () {
    const snakeButtons = document.querySelectorAll(".snake");
    snakeButtons.forEach((button) => { 
        button.addEventListener("click", function() {window.location.href = "snake/snake.html";}); 
    });

    const pongButton = document.getElementById("pong");
    pongButton.addEventListener("click", function() {window.location.href = "pong/pong.html";});
    // pongButtons.forEach((button) => { 
        //     button.addEventListener("click", function() {window.location.href = "pong/index.html";}); 
        // });

    const mazeButton = document.getElementById("cardMatching");
    mazeButton.addEventListener("click", function() {window.location.href = "cardMatching/cardMatching.html";});
});