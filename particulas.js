const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

//  Variables
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const cellSize = 200;
const ballSize = 15;
const cellGap = 3;
const gameGrid = [];
const speed = 5;
const keys = {};
const colors = ["brown", "green", "blue", "red", "orange"];
let playing = false;
let lives = 1000;
let points = 0;
let direction = "down";
let instructionY = canvas.height;

// Jugador Ball
const playerBall = {
    x: canvasWidth / 2,
    y: canvasHeight - 50,
    r: 20,
    color: "yellow",
    speed: 4,
};


function playCollisionSound() {
  const collisionSound = new Audio("crash.mp3");
  collisionSound.play().catch(err => console.error("Error reproduciendo sonido de colisión:", err));
}
class Ball {
    constructor(x, y, r, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.fallSpeed = randomNum(1.5, 3);
        this.horizontalSpeed = randomNum(-2, 2);
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.9;
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.y += this.fallSpeed;
        this.x += this.horizontalSpeed;

        if (this.x < 0 || this.x > canvasWidth) {
            this.horizontalSpeed *= -1;
        }
        if (this.y > canvasHeight) {
            this.y = 0;
            this.x = randomNum(20, canvasWidth - 20);
        }
    }

    checkCollision() {
        const dx = playerBall.x - this.x;
        const dy = playerBall.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= playerBall.r + this.r) {
            lives -= 10;
            playCollisionSound();
        }
    }
}

// Numero aleatorio
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function clearCanvas() {
    ctx.fillStyle = "rgba(0, 0, 100, 0.4)";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function displayStats() {
    ctx.font = "30px Gill Sans";
    ctx.fillStyle = "yellow";
    ctx.fillText(`${gameGrid.length} BOLAS`, 10, 25);
    ctx.fillText(`VIDA: ${lives}`, canvasWidth / 2 - 100, 25);
    ctx.fillText(`PUNTOS: ${points}`, canvasWidth - 220, 25);
}

function createRandomBall() {
    const x = randomNum(20, canvasWidth - 20);
    const y = randomNum(20, canvasHeight - 20);
    const color = colors[randomNum(0, colors.length - 1)];
    const radius = ballSize + randomNum(-10, 10);
    gameGrid.push(new Ball(x, y, radius, color));
}

function drawPlayerBall() {
    ctx.beginPath();
    ctx.arc(playerBall.x, playerBall.y, playerBall.r, 0, Math.PI * 2);
    ctx.fillStyle = playerBall.color;
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 10;
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fill();
    ctx.closePath();
}

function movePlayerBall() {
    if (keys["ArrowUp"] && playerBall.y > playerBall.r) {
        playerBall.y -= playerBall.speed;
    }
    if (keys["ArrowDown"] && playerBall.y < canvasHeight - playerBall.r) {
        playerBall.y += playerBall.speed;
    }
    if (keys["ArrowLeft"] && playerBall.x > playerBall.r) {
        playerBall.x -= playerBall.speed;
    }
    if (keys["ArrowRight"] && playerBall.x < canvasWidth - playerBall.r) {
        playerBall.x += playerBall.speed;
    }
}

function animate() {
    clearCanvas();
    movePlayerBall();
    drawPlayerBall();
    gameGrid.forEach((ball) => {
        ball.update();
        ball.draw();
        ball.checkCollision();
    });
    displayStats();

    if (lives > 0) {
        requestAnimationFrame(animate);
    } else {
        ctx.font = "50px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("GAME OVER", canvasWidth / 2 - 150, canvasHeight / 2);
    }
}

function startGame() {
    setInterval(createRandomBall, 1500);
    animate();
}

// Teclado
window.addEventListener("load", () => {
    startGame();
});

window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
    delete keys[e.key];
});

canvas.addEventListener("mousemove", (e) => {
    playerBall.x = e.offsetX;
    playerBall.y = e.offsetY;
});
