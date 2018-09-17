const CANVAS = document.getElementById('game');
const CTX = CANVAS.getContext('2d');

let rightPressed = false;
let leftPressed = false;

let gameStorage = {
    alerted: false,
    setItem: function (key, value) {
        this[key] = value;
    },
    getItem: function (key) {
        return this[key];
    }
};

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 39) {
        rightPressed = true;
    } else if (event.keyCode === 37) {
        leftPressed = true;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.keyCode === 39) {
        rightPressed = false;
    } else if (event.keyCode === 37) {
        leftPressed = false;
    }
});

function makeBall(position, radius, color) {
    return {
        position,
        radius,
        color,
        direction: {
            x: +1, // Rightwards
            y: -1, // Upwards
        },
        draw: function () {
            CTX.beginPath();
            CTX.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2);
            CTX.fillStyle = this.color;
            CTX.fill();
            CTX.closePath();
        },
        move: function (distance) {
            let vector = {
                x: this.direction.x * Math.abs(distance.x),
                y: this.direction.y * Math.abs(distance.y)
            };

            if (this.isTouchingLeftWall(vector) ||
                this.isTouchingRightWall(vector)
            ) {
                this.direction.x *= -1;
            }

            if (this.isTouchingRoof(vector)) {
                this.direction.y *= -1;
            } else if (this.isTouchingFloor(vector)) {
                if (! gameStorage.getItem('alerted')) {
                    alert('GAME OVER');
                    gameStorage.setItem('alerted', true);
                    document.location.reload();
                }
            }

            this.position.x += this.direction.x * distance.x;
            this.position.y += this.direction.y * distance.y;
        },
        isTouchingLeftWall: function (vector) {
            return this.position.x + vector.x < this.radius;
        },
        isTouchingRightWall: function (vector) {
            return this.position.x + vector.x > CANVAS.width - this.radius;
        },
        isTouchingRoof: function (vector) {
            return this.position.y + vector.y < this.radius;
        },
        isTouchingFloor: function (vector) {
            return this.position.y + vector.y > CANVAS.height + 2 * this.radius;
        }
    };
}

function makePaddle(geometry, color) {
    const position = {
        x: CANVAS.width/2 - geometry.width/2,
        y: CANVAS.height - geometry.height
    };

    return  {
        width: geometry.width,
        height: geometry.height,
        x: position.x,
        y: position.y,
        draw: function () {
            CTX.beginPath();
            CTX.rect(this.x, this.y, this.width, this.height);
            CTX.fillStyle = color;
            CTX.fill();
            CTX.closePath();
        },
        move: function (distance) {
            if (rightPressed && this.x < CANVAS.width - this.width) {
                this.x += distance;
            } else if (leftPressed && this.x > 0) {
                this.x -= distance;
            }
        }
    };
}

let ball = makeBall(
    {
        x: CANVAS.width / 2,
        y: CANVAS.height - 30
    },
    10,
    '#0095DD'
);

let paddle = makePaddle({
    width: 75,
    height: 10
}, '#0095DD');

function eraseCanvas() {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
}

function draw() {
    eraseCanvas();
    ball.draw();
    paddle.draw();
    ball.move({x: 2, y: 2});
    paddle.move(7);
}

setInterval(draw, 7);

