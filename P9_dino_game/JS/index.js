// Grabbing elements
const gameOver = document.getElementById('gameOver');
const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');
const scoreCount = document.getElementById('scoreCount');

// Global variables
let score = 0;
let crossed = true;
let gameOvered = false;

// Moving dino
document.onkeydown = (e) => {
    let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    if (e.keyCode == 38) {
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 600);
    } else if (e.keyCode == 39 & dinoX <= 1200) {
        dino.style.left = dinoX + 100 + "px";
    } else if (e.keyCode == 37 & dinoX >= 0) {
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX - 100 + "px";
    }
}

setInterval(() => {
    // Finding positions
    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('bottom'));
    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('bottom'));

    // Calculating difference
    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);

    // Chekcing collision
    if (offsetX < 50 & offsetY < 50) {
        gameOver.style.visibility = 'visible';
        obstacle.classList.remove('animateObstacle');
        gameOvered = true;
        score -= 1;
    } else if (offsetX < 100 & crossed & !gameOvered) {
        score += 1;
        updateScore(score);
        crossed = false;
        setTimeout(() => {
            crossed = true;
            let animDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            if (animDur >= 3) {
                obstacle.style.animationDuration = `${animDur - 0.02}s`;
            }
        }, 1000);
    }
}, 10);

// Increasing score
function updateScore(curScore) {
    scoreCount.innerHTML = `Your Score: ${curScore}`;
}