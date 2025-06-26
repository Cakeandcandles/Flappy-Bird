const bird = document.getElementById('bird');
const game = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const startScreen = document.getElementById('start-screen');

let birdY = 250;
let velocity = 0;
let gravity = 0.5;
let isGameOver = false;
let gameStarted = false;
let score = 0;
let pipeInterval;

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        if (!gameStarted) {
            startGame();
        }
        velocity = -8;
    }
});

function startGame() {
    gameStarted = true;
    startScreen.style.display = 'none';
    pipeInterval = setInterval(createPipe, 2000);
    gameLoop();
}

function createPipe() {
    if (isGameOver) return;

    const gap = 150;
    const pipeTopHeight = Math.floor(Math.random() * 300) + 50;
    const pipeBottomHeight = 600 - pipeTopHeight - gap;

    const topPipe = document.createElement('div');
    topPipe.classList.add('pipe');
    topPipe.style.height = pipeTopHeight + 'px';
    topPipe.style.top = '0px';
    topPipe.style.left = '400px';

    const bottomPipe = document.createElement('div');
    bottomPipe.classList.add('pipe');
    bottomPipe.style.height = pipeBottomHeight + 'px';
    bottomPipe.style.bottom = '0px';
    bottomPipe.style.left = '400px';

    game.appendChild(topPipe);
    game.appendChild(bottomPipe);

    let pipeX = 400;
    const pipeMove = setInterval(() => {
        if (isGameOver) {
            clearInterval(pipeMove);
            topPipe.remove();
            bottomPipe.remove();
            return;
        }

        pipeX -= 2;
        topPipe.style.left = pipeX + 'px';
        bottomPipe.style.left = pipeX + 'px';

        // Collision Detection
        if (
            pipeX < 120 && pipeX + 60 > 80 &&
            (birdY < pipeTopHeight || birdY > pipeTopHeight + gap)
        ) {
            gameOver();
        }

        // Score
        if (pipeX === 80) {
            score++;
            scoreDisplay.innerText = 'Score: ' + score;
        }
    }, 16);
}

function gameLoop() {
    if (isGameOver) return;

    velocity += gravity;
    birdY += velocity;

    if (birdY < 0) birdY = 0;
    if (birdY > 560) gameOver();

    bird.style.top = birdY + 'px';

    requestAnimationFrame(gameLoop);
}

function gameOver() {
    isGameOver = true;
    clearInterval(pipeInterval);
    alert('Game Over! Your Score: ' + score);
    location.reload();
}
