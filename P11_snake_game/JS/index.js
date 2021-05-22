// Game Variables
const foodSound = new Audio("MUSIC/food.mp3");
const gameOverSound = new Audio("MUSIC/gameover.mp3");
const moveSound = new Audio("MUSIC/move.mp3");
const musicSound = new Audio("MUSIC/music.mp3");
let inpDir = { x: null, y: null };
let speed = 15;
let lastPaintTime = 0;
let snakeArr = [{ x: 5, y: 5 }];
let food = { x: 10, y: 10 };
let score = 0;
const gridSize = 15;
let headRotation = 0;
let isHiScoreCracked = false;
let isGameOver = false;



// Game Functions
function resetGame() {
    musicSound.pause();
    inpDir = { x: null, y: null };
    snakeArr = [{ x: 5, y: 5 }];
    food = { x: 10, y: 10 };
    score = 0;
    isHiScoreCracked = false;
    hiScoreCrack.style.display = "none";
    gameOver.style.display = "none";
    headRotation = 0;
    isGameOver = false;
}

function rotateHead(rot) {
    document.getElementById("head").style.transform = `rotate(${rot}deg)`;
}

function main(cTime) {
    window.requestAnimationFrame(main);
    if ((cTime - lastPaintTime) / 1000 < 1 / speed) return;
    lastPaintTime = cTime;
    gameEngine();
}

function isCollide() {
    if (isGameOver) return false;
    // If you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[i].x === snakeArr[0].x &&
            snakeArr[i].y === snakeArr[0].y) return true;
    }
    if (snakeArr[0].x >= gridSize + 2 && inpDir.x === 1) snakeArr[0].x = 0;
    else if (snakeArr[0].x <= 0 && inpDir.x === -1) snakeArr[0].x = gridSize + 2;
    else if (snakeArr[0].y >= gridSize + 2 && inpDir.y === 1) snakeArr[0].y = 0;
    else if (snakeArr[0].y <= 0 && inpDir.y === -1) snakeArr[0].y = gridSize + 2;
    return false;
}

function gameEngine() {
    // Part 1: Updating snake array & food
    if (isCollide()) {
        musicSound.pause();
        gameOverSound.play();
        gameOver.style.display = "block";
        musicSound.pause();
        inpDir = { x: null, y: null };
        isGameOver = true;
    }

    // After eating food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score++;
        snakeArr.unshift({
            x: food.x + inpDir.x,
            y: food.y + inpDir.y
        });
        snakeArr.forEach(e => {
            while (e.x === food.x && e.y === food.y) {
                food = {
                    x: Math.round(2 + (gridSize - 2) * Math.random()),
                    y: Math.round(2 + (gridSize - 2) * Math.random())
                };
            }
        });
    }
    scoreBox.innerHTML = `Score: ${score}`;
    let hiScore = localStorage.getItem("hiScore");
    let hiScoreVal = 0;
    if (hiScore == null) {
        localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
    }
    else {
        hiScoreVal = JSON.parse(hiScore);
        if (score > hiScoreVal) {
            hiScoreVal = score;
            localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
            if (!isHiScoreCracked) {
                hiScoreCrack.style.display = "block";
                isHiScoreCracked = true;
                setTimeout(() => {
                    hiScoreCrack.style.display = "none";
                }, 1000);
            }
        }
    }
    hiScoreBox.innerHTML = `Hi-Score: ${hiScoreVal}`;

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    if (inpDir.x != null && inpDir.y != null) {
        snakeArr[0].x += inpDir.x;
        snakeArr[0].y += inpDir.y;
    }

    // Part 3: Display food
    board.innerHTML = "";
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);

    // Part 2: Display snake
    snakeArr.forEach((e, i) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (i === 0) {
            snakeElement.classList.add("head");
            snakeElement.id = "head";
        } else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
        rotateHead(headRotation);
    })
}



// Main Logic
resetGame();
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    if ((e.key == "ArrowUp" ||
        e.key == "ArrowDown" ||
        e.key == "ArrowLeft" ||
        e.key == "ArrowRight") && !isGameOver) {
        musicSound.play();
        moveSound.play();
        e.preventDefault();
        switch (e.key) {
            case "ArrowUp":
                if (inpDir.x == 0) break;
                inpDir.x = 0;
                inpDir.y = -1;
                headRotation = 270;
                break;
            case "ArrowDown":
                if (inpDir.x == 0) break;
                inpDir.x = 0;
                inpDir.y = 1;
                headRotation = 90;
                break;
            case "ArrowLeft":
                if (inpDir.y == 0) break;
                inpDir.x = -1;
                inpDir.y = 0;
                headRotation = 180;
                break;
            case "ArrowRight":
                if (inpDir.y == 0) break;
                inpDir.x = 1;
                inpDir.y = 0;
                headRotation = 0;
                break;
            default:
                break;
        }
    } else if (isGameOver) {
        resetGame();
    }
});