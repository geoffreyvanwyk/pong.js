const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

setInterval(draw, 10);

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
const ballRadius = 10;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
        dy = -dy;
    }

    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
        dx = -dx;
    }

    x += dx;
    y += dy;
}
