document.addEventListener("DOMContentLoaded", function () {
    const startButtons = document.querySelectorAll(".snake");
    startButtons.forEach((button) => { 
        button.addEventListener("click", function() {window.location.href = "snake/snake.html";}); 
    });
});