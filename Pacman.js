let canvas = document.querySelector('#canvas'),
    c = canvas.getContext('2d');
c.imageSmoothingEnabled = false;
cellSize = 40;
ghostCoords = [9, 10];
playerCoords = [9, 16];
fruitPos = [9, 12];
const asGridCoord = n => n * cellSize + cellSize / 2;
const fromGridCoord = n => Math.floor((n - cellSize / 2) / cellSize)
noUps = [
    [8, 8], [10, 8],
    [8, 16], [10, 16]
].map(x => x.map(asGridCoord));
const fruits = {
    cherry: {
        src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAKBJREFUOE+lk90RgCAMg9tRdCPGcCLHYCMdBS9ouVhB4eSJv3xNW1D5OfSnXoYB2xoSgs5LzNpugAnNcTeAI2JuQgO9OvCCT0ASyflh7GsoeWJdE99q4MXTEjNIRbQlbgIoPwUYbhjIrS81yBe3JNN8biGyuWKAnT2KWC5fEAb4x4azahe4DgZgV5xaVxu9q2EABOzK5z/0lFufrvsvtAAHoqdQERIoaSQAAAAASUVORK5CYII=',
        points: 100
    },
    strawberry: {
        src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAJZJREFUOE+lk9ENwCAIRGGUsv9MOgqNVioilDT6qXfPExDhcOGhH1JAKcxEGOr8AwaWZKUy0KVkuF66ARgeM76I+UgeaoQJWQBi1nVpIDG2/VoYLuoxuncDiMAW1+6HADGKIQKmAK+9GuYCmqk9WQu9BGERBZAN1ydAQ2wSb6DCCXNbarq2tdGLPsbg5yhnRVDn6WfKWDcQ6T8RThYFwwAAAABJRU5ErkJggg==',
        points: 300
    },
    orange: {
        src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAH1JREFUOE9jZKAQMFKon4E4A/4z/AdbxIipHq8B96YH/lfKWI/pSCSDCBuQuZ6RAeYCLK7AMOD/9kCwc+8/QFisqIBgM3quR9GDwoFphikHGYKsGSaObAjcAHTNhGIHZshwMgDkZ2LDAWsgUsUAWMjjcgl6GoCkKwoBxQYAAP1FNBHNJY5HAAAAAElFTkSuQmCC',
        points: 500
    },
    apple: {
        src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAIdJREFUOE/Vk9sRwBAQRa9S6EgZKlKGjihFxiTLEuxMfMUf9p59KxwedaiHCIjeZuPC0q77yECmiBSgHnF7BIrHTlMvXEyQ5C20C68sOWQL2NWHID8DpJihzR30pxS2gEKddaJ2ZOL9iaTVegfgHZm2kQwkyHKQuAeCFONxOsfZEHdBWrZjwAWn5y0RVYjNbwAAAABJRU5ErkJggg==',
        points: 700
    },
    melon: {
        src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAALRJREFUOE+lk8ENwjAMRX9GgQujFI7tFkzEFuVIOwqXMoqRJRNix66R6C2K/f7/dlPw51e8/uEx03qZ3DtbHxYxxBZ70FQlc7MPIND2IhwPBShwa30AodoflhnrefqmMaAeQCBuup1GXJ931VxhDcQFsFyrzDEULARI5khZxRGIdiD2P5mtsjpHgM6uiVOn6QL4VjbQDrIb6C9DtINU512AuLD791bIpemfWJWDx5W+hey1vwGLFHYRXKCJIQAAAABJRU5ErkJggg==',
        points: 1000
    },
    galaxian: {
        src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAJhJREFUOE+1k2sOgzAMg52jwP3PBEcx8jRPXulDGlr/FEL8OW1C4eGqh3osAQRYGOd9AbaNPM/6xCR2hQnJvCEgxS1kCjiO8JK/LLyLRGDfCVd6q+AFyGVAxKYA5d0gjViv3Qr0QeczpApFgt7lnGI9d9toiFwMyFh7wu4s+aYTkC2Ozsxn0YBR1noS33fwM2D1rywr+DvgAoooWBEdGePvAAAAAElFTkSuQmCC',
        points: 2000
    },
    bell: {
        src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAI1JREFUOE+1ktENgCAMBek0jiKO4kSOIo7iNDUohSItkKD8QehxLzwwgwsG500VgGjQPwCg3xMBbPAWxBsjgwoADWvR3jYqACC9zGFdAG1YipEZ8OyUW4rCLf4BtLohGvTqE5wgMcJngJZ+1cC6UDlG2aZns57p0FmI9c5+Yd7Lz5MAx+KbEurdq6zduwAtST0Rc8AWqwAAAABJRU5ErkJggg==',
        points: 3000
    },
    key: {
        src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAGdJREFUOE9jZKAQMFKonwGnAe7b//+HGb7TkxGnOgwJmMadnggp9+0Qs7AZhNMAbF4bIgbAnH7v3v//SkqMDPfu/WdQUiIhELEZABLDZQjO6KGaC6AuIj4dDKMwAHkFGpB4MxzFuREA1gZJEbkI4UQAAAAASUVORK5CYII=',
        points: 5000
    },
}
class Player {
    constructor({ x, y, radius }) {
        this.x = x * cellSize + cellSize / 2;
        this.y = y * cellSize + cellSize / 2;
        this.lastX = this.x;
        this.lastY = this.y;
        this.radius = radius;
        this.velocity = { x: 0, y: 0 };
        this.speed = 4;
        this.score = 0;
        this.radians = 0;
        this.openRate = 0.12;
        this.rotation = 0;
        this.facing = 'right';
    }
    update() {
        this.lastX = this.x;
        this.lastY = this.y;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.draw();
        if (this.radians < 0 || this.radians > 0.75) this.openRate = -this.openRate
        if (this.lastX != this.x || this.lastY != this.y) this.radians += this.openRate;
    }
    draw() {
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.rotation);
        c.translate(-this.x, -this.y)
        c.beginPath();
        c.arc(this.x, this.y, this.radius, this.radians, 2 * Math.PI - this.radians);
        c.lineTo(this.x, this.y);
        c.fillStyle = 'yellow';
        c.fill();
        c.closePath();
        c.restore();
    }
    colliding(boundary, circle) {
        const padding = Boundary.width / 2 - circle.radius - 2;
        return (circle.y - circle.radius + circle.velocity.y <= boundary.y + boundary.height + padding &&
            circle.x + circle.radius + circle.velocity.x >= boundary.x - padding &&
            circle.y + circle.radius + circle.velocity.y >= boundary.y - padding &&
            circle.x - circle.radius + circle.velocity.x <= boundary.x + boundary.width + padding)
    }
}
class Ghost {
    static speed = 2;
    constructor({ x, y, radius, speed, color, timeLeave, leave, home, target, counter, count, caged = true }) {
        this.x = x * cellSize + cellSize / 2;
        this.y = y * cellSize + cellSize / 2;
        this.lastX = this.x;
        this.lastY = this.y;
        this.radius = radius;
        this.velocity = { x: 0, y: -Ghost.speed };
        this.speed = speed;
        this.color = color;
        this.prevCollisions = [];
        this.scared = false;
        this.caged = caged;
        this.path = [];
        this.flash = false;
        this.timeLeave = timeLeave || false;
        this.leave = leave || 2 * 60;
        this.home = home || [...ghostCoords];
        this.target = target || [...home];
        this.counter = counter || 0;
        this.count = count || false;
    }
    update() {
        if (this.caged) this.velocity = { x: 0, y: 0 };
        this.lastX = this.x;
        this.lastY = this.y;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        if (this.timeLeave) {
            if (this.leave > 0) this.leave--;
            else {
                this.caged = false;
                this.velocity.y = -this.speed
                this.timeLeave = false;
            }
        }
        if (this.count && !this.counter && this.caged) {
            this.caged = false;
            this.velocity.y = -this.speed;
            this.counter = this.color == '#00ffff' ? 30 : 60;
        }
        if (chase) {
            if (this.color == 'red') this.target = [fromGridCoord(player.x), fromGridCoord(player.y)];
            else if (this.color == 'pink') {
                if (player.facing == 'up') this.target = [fromGridCoord(player.x) - 2, fromGridCoord(player.y) - 2];
                else if (player.facing == 'down') this.target = [fromGridCoord(player.x), fromGridCoord(player.y) + 2];
                else if (player.facing == 'left') this.target = [fromGridCoord(player.x) - 2, fromGridCoord(player.y)];
                else if (player.facing == 'right') this.target = [fromGridCoord(player.x) + 2, fromGridCoord(player.y)];
            }
            else if (this.color == '#00ffff') {
                let pacPos;
                let blinkyPos = ghosts.find(x => x.color == 'red') ? [fromGridCoord(ghosts.find(x => x.color == 'red').x), fromGridCoord(ghosts.find(x => x.color == 'red').y)] : ghostCoords;
                if (player.facing == 'up') pacPos = [fromGridCoord(player.x) - 1, fromGridCoord(player.y) - 1];
                else if (player.facing == 'down') pacPos = [fromGridCoord(player.x), fromGridCoord(player.y) + 1];
                else if (player.facing == 'left') pacPos = [fromGridCoord(player.x) - 1, fromGridCoord(player.y)];
                else if (player.facing == 'right') pacPos = [fromGridCoord(player.x) + 1, fromGridCoord(player.y)];
                let distance = [blinkyPos[0] - pacPos[0], blinkyPos[1] - pacPos[1]];
                this.target = [blinkyPos[0] + (distance[0]), blinkyPos[1] + (distance[1])];
            } else {
                let curPos = [fromGridCoord(this.x), fromGridCoord(this.y)];
                let pacPos = [fromGridCoord(player.x), fromGridCoord(player.y)];
                if (Math.hypot(pacPos[0] - curPos[0], pacPos[1] - curPos[1]) >= 4) this.target = pacPos;
                else this.target = [...this.home]
            }
        }
        this.draw();
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.fillStyle = this.scared ? this.flash ? 'white' : 'blue' : this.color;
        c.fill();
        c.closePath();
    }
    colliding(boundary, circle) {
        const padding = Boundary.width / 2 - circle.radius - 2;
        return (circle.y - circle.radius + circle.velocity.y <= boundary.y + boundary.height + padding &&
            circle.x + circle.radius + circle.velocity.x >= boundary.x - padding &&
            circle.y + circle.radius + circle.velocity.y >= boundary.y - padding &&
            circle.x - circle.radius + circle.velocity.x <= boundary.x + boundary.width + padding)
    }
}
class Remains {
    static speed = 8;
    constructor({ x, y, speed, ghost }) {
        this.x = asGridCoord(fromGridCoord(x || ghostCoords[0]));
        this.y = asGridCoord(fromGridCoord(y || ghostCoords[1]));
        this.lastX = this.x;
        this.lastY = this.y;
        this.velocity = { x: 0, y: 0 };
        this.speed = speed;
        this.path = pathFind([fromGridCoord(this.x), fromGridCoord(this.y)].reverse(), [...ghostCoords], grid);
        this.finishedMoving = true;
        this.moveIndex = 0;
        this.ghost = { ...ghost, velocity: { x: 0, y: 0 }, caged: true, x: ghostCoords[0], y: ghostCoords[1], timeLeave: ghost.color == 'pink' || ghost.color == 'red' ? true : false };
    }
    move(dir) {
        this.finishedMoving = false;
        switch (dir) {
            case 'up':
                this.velocity.x = 0;
                this.velocity.y = -this.speed;
                break;
            case 'down':
                this.velocity.x = 0;
                this.velocity.y = this.speed;
                break;
            case 'left':
                this.velocity.y = 0;
                this.velocity.x = -this.speed;
                break;
            case 'right':
                this.velocity.y = 0;
                this.velocity.x = this.speed;
                break;
        }
    }
    update() {
        if (!this.finishedMoving) {
            this.lastX = this.x;
            this.lastY = this.y;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            let newCoords = [fromGridCoord(this.x), fromGridCoord(this.y)];
            if ((this.x == asGridCoord(newCoords[0]) && this.velocity.y == 0) || (this.y == asGridCoord(newCoords[1]) && this.velocity.x == 0)) this.finishedMoving = true;
        }
        this.draw();
        if (!this.path.length) {
            ghost = new Ghost(this.ghost);
            ghosts.push(ghost);
            remains.splice(remains.indexOf(remains.find(x => x.ghost.color = this.ghost.color)), 1);
        };
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, 12.5, 0, 2 * Math.PI);
        c.fillStyle = 'white';
        c.fill();
        c.closePath();
    }
}
class Pellet {
    constructor({ x, y }) {
        this.x = x * cellSize + cellSize / 2;
        this.y = y * cellSize + cellSize / 2;
        this.radius = 3;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.fillStyle = 'white';
        c.fill();
        c.closePath();
    }
    colliding() {
        return Math.hypot(this.x - player.x, this.y - player.y) < this.radius + player.radius
    }
}
class PowerPellet {
    constructor({ x, y }) {
        this.x = x * cellSize + cellSize / 2;
        this.y = y * cellSize + cellSize / 2;
        this.radius = 8;
    }
    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.fillStyle = 'white';
        c.fill();
        c.closePath();
    }
    colliding() {
        return Math.hypot(this.x - player.x, this.y - player.y) < this.radius + player.radius
    }
}
class Boundary {
    static width = cellSize;
    static height = cellSize;
    constructor({ x, y, type }) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.height = cellSize;
        this.width = cellSize;
        this.flash = false;
        this.surroundings = {
            up: grid[this.y / cellSize - 1] ? grid[this.y / cellSize - 1][this.x / cellSize] === '-' : false,
            down: grid[this.y / cellSize + 1] ? grid[this.y / cellSize + 1][this.x / cellSize] === '-' : false,
            left: grid[this.y / cellSize] ? grid[this.y / cellSize][this.x / cellSize - 1] === '-' : false,
            right: grid[this.y / cellSize] ? grid[this.y / cellSize][this.x / cellSize + 1] === '-' : false,
            upleft: grid[this.y / cellSize - 1] ? grid[this.y / cellSize - 1][this.x / cellSize - 1] === '-' : false,
            upright: grid[this.y / cellSize - 1] ? grid[this.y / cellSize - 1][this.x / cellSize + 1] === '-' : false,
            downleft: grid[this.y / cellSize + 1] ? grid[this.y / cellSize + 1][this.x / cellSize - 1] === '-' : false,
            downright: grid[this.y / cellSize + 1] ? grid[this.y / cellSize + 1][this.x / cellSize + 1] === '-' : false,
        };
        this.corners = {
            upleft: this.surroundings.up && this.surroundings.left,
            upright: this.surroundings.up && this.surroundings.right,
            downleft: this.surroundings.down && this.surroundings.left,
            downright: this.surroundings.down && this.surroundings.right,
        };
    }
    draw() {
        c.fillStyle = this.flash ? 'white' : '#0000bf';
        let walls = Object.keys(this.surroundings).filter(x => !this.surroundings[x]);
        let corners = Object.keys(this.corners).filter(x => this.corners[x]);
        if (walls.includes('up')) c.fillRect(this.x, this.y, this.width, 5);
        if (walls.includes('down')) c.fillRect(this.x, this.y + this.width - 5, this.width, 5);
        if (walls.includes('left')) c.fillRect(this.x, this.y, 5, this.height);
        if (walls.includes('right')) c.fillRect(this.x + this.width - 5, this.y, 5, this.height);
        if (corners.includes('upleft') && walls.includes('upleft')) c.fillRect(this.x, this.y, 5, 5);
        if (corners.includes('upright') && walls.includes('upright')) c.fillRect(this.x + this.width - 5, this.y, 5, 5);
        if (corners.includes('downleft') && walls.includes('downleft')) c.fillRect(this.x, this.y + this.height - 5, 5, 5);
        if (corners.includes('downright') && walls.includes('downright')) c.fillRect(this.x + this.width - 5, this.y + this.height - 5, 5, 5);
    }
}

let grid = [
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", ".", ".", ".", ".", ".", ".", ".", ".", "-", ".", ".", ".", ".", ".", ".", ".", ".", "-"],
    ["-", "o", "-", "-", ".", "-", "-", "-", ".", "-", ".", "-", "-", "-", ".", "-", "-", "o", "-"],
    ["-", ".", "-", "-", ".", "-", "-", "-", ".", "-", ".", "-", "-", "-", ".", "-", "-", ".", "-"],
    ["-", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "-"],
    ["-", ".", "-", "-", ".", "-", ".", "-", "-", "-", "-", "-", ".", "-", ".", "-", "-", ".", "-"],
    ["-", ".", ".", ".", ".", "-", ".", ".", ".", "-", ".", ".", ".", "-", ".", ".", ".", ".", "-"],
    ["-", "-", "-", "-", ".", "-", "-", "-", " ", "-", " ", "-", "-", "-", ".", "-", "-", "-", "-"],
    [" ", " ", " ", "-", ".", "-", " ", " ", " ", " ", " ", " ", " ", "-", ".", "-", " ", " ", " "],
    ["-", "-", "-", "-", ".", "-", " ", "-", "-", " ", "-", "-", " ", "-", ".", "-", "-", "-", "-"],
    [" ", " ", " ", " ", ".", " ", " ", "-", " ", " ", " ", "-", " ", " ", ".", " ", " ", " ", " "],
    ["-", "-", "-", "-", ".", "-", " ", "-", "-", "-", "-", "-", " ", "-", ".", "-", "-", "-", "-"],
    [" ", " ", " ", "-", ".", "-", " ", " ", " ", " ", " ", " ", " ", "-", ".", "-", " ", " ", " "],
    ["-", "-", "-", "-", ".", "-", " ", "-", "-", "-", "-", "-", " ", "-", ".", "-", "-", "-", "-"],
    ["-", ".", ".", ".", ".", ".", ".", ".", ".", "-", ".", ".", ".", ".", ".", ".", ".", ".", "-"],
    ["-", ".", "-", "-", ".", "-", "-", "-", ".", "-", ".", "-", "-", "-", ".", "-", "-", ".", "-"],
    ["-", "o", ".", "-", ".", ".", ".", ".", ".", " ", ".", ".", ".", ".", ".", "-", ".", "o", "-"],
    ["-", "-", ".", "-", ".", "-", ".", "-", "-", "-", "-", "-", ".", "-", ".", "-", ".", "-", "-"],
    ["-", ".", ".", ".", ".", "-", ".", ".", ".", "-", ".", ".", ".", "-", ".", ".", ".", ".", "-"],
    ["-", ".", "-", "-", "-", "-", "-", "-", ".", "-", ".", "-", "-", "-", "-", "-", "-", ".", "-"],
    ["-", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", ".", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]
]
let player,
    pressedKeys = [],
    boundaries = [],
    pellets = [],
    powerpellets = [],
    ghosts = [
        new Ghost({ x: ghostCoords[0], y: ghostCoords[1], radius: 15, color: 'red', speed: Ghost.speed, caged: false, home: [16, -1] }),
        new Ghost({ x: ghostCoords[0], y: ghostCoords[1], radius: 15, color: 'pink', speed: Ghost.speed, timeLeave: true, leave: 60, home: [2, -1] }),
        new Ghost({ x: ghostCoords[0], y: ghostCoords[1], radius: 15, color: '#00ffff', speed: Ghost.speed, home: [18, 22], counter: 30, count: true }),
        new Ghost({ x: ghostCoords[0], y: ghostCoords[1], radius: 15, color: '#ff8000', speed: Ghost.speed, home: [0, 22], counter: 60, count: true }),
    ],
    remains = [],
    scareTimeout = 0,
    totalPellets = 0,
    currentPellets = 0,
    seconds = 0,
    eatenGhosts = 0,
    gameOver = false,
    win = false,
    chase = false,
    wait = 61,
    levelWait = 61,
    score = 0,
    time = 0,
    level = 0,
    lives = 2,
    lifeScore = 0,
    oldScore = 0,
    timer = 4 * 60,
    curFruit = Object.keys(fruits)[0],
    fruit = new Image();
fruit.src = fruits[curFruit].src;
function start() {
    player = new Player({ x: playerCoords[0], y: playerCoords[1], radius: 15 });
    boundaries = [],
        pellets = [],
        powerpellets = [],
        ghosts = [
            new Ghost({ x: ghostCoords[0], y: ghostCoords[1], radius: 15, color: 'red', speed: Ghost.speed, caged: false, home: [16, -1] }),
            new Ghost({ x: ghostCoords[0], y: ghostCoords[1], radius: 15, color: 'pink', speed: Ghost.speed, timeLeave: true, leave: 60, home: [2, -1] }),
            new Ghost({ x: ghostCoords[0], y: ghostCoords[1], radius: 15, color: '#00ffff', speed: Ghost.speed, home: [18, 22], counter: 30, count: true }),
            new Ghost({ x: ghostCoords[0], y: ghostCoords[1], radius: 15, color: '#ff8000', speed: Ghost.speed, home: [0, 22], counter: 60, count: true }),
        ],
        remains = [],
        scareTimeout = 0,
        totalPellets = 0,
        currentPellets = 0,
        seconds = 0,
        eatenGhosts = 0,
        gameOver = false,
        win = false,
        chase = false,
        wait = 61,
        levelWait = 61,
        score = 0,
        time = 0,
        level = 0,
        lives = 2,
        lifeScore = 0,
        oldScore = 0,
        timer = 4 * 60,
        curFruit = Object.keys(fruits)[0],
        fruit = new Image();
    fruit.src = fruits[curFruit].src;
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] == '-') boundaries.push(new Boundary({ x: x * cellSize, y: y * cellSize }));
            else if (grid[y][x] == '.') pellets.push(new Pellet({ x, y }));
            else if (grid[y][x] == 'o') powerpellets.push(new PowerPellet({ x, y }))
        }
    }
    totalPellets = pellets.length + powerpellets.length;
    currentPellets = pellets.length + powerpellets.length;
    requestAnimationFrame(game);
}
function reset(type) {
    remains = [];
    time = 0;
    player = new Player({ x: playerCoords[0], y: playerCoords[1], radius: 15 });
    player.radians = 0;
    player.x = asGridCoord(playerCoords[0]);
    player.y = asGridCoord(playerCoords[1]);
    player.velocity = { x: 0, y: 0 };
    if (type == 'win') {
        win = false;
        level += 1
        pellets = [];
        powerPellets = [];
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x] == '.') pellets.push(new Pellet({ x, y }));
                else if (grid[y][x] == 'o') powerpellets.push(new PowerPellet({ x, y }))
            }
        };
        currentPellets = pellets.length + powerpellets.length;
        levelWait = 61;
        if (!curFruit) {
            if (level >= 7) curFruit = 'key';
            else switch (level) {
                case 6: curFruit = 'bell'; break;
                case 5: curFruit = 'galaxian'; break;
                case 4: curFruit = 'melon'; break;
                case 3: curFruit = 'apple'; break;
                case 2: curFruit = 'orange'; break;
                case 1: curFruit = 'strawberry'; break;
                default: 'cherry';
            }
            fruit.src = fruits[curFruit].src;
        }
    } else {
        if (!lives) {
            cancelAnimationFrame(animationId)
            document.getElementById('game').hidden = true;
            document.getElementById('end').hidden = false;
            endScore.innerHTML = score;
        } else lives -= 1;
        gameOver = false;
    }
    ghosts = [
        new Ghost({ x: ghostCoords[0], y: ghostCoords[1], radius: 15, color: 'red', speed: Ghost.speed, caged: false, home: [16, -1] }),
        new Ghost({ x: ghostCoords[0], y: ghostCoords[1], radius: 15, color: 'pink', speed: Ghost.speed, timeLeave: true, leave: 60, home: [2, -1] }),
        new Ghost({ x: ghostCoords[0], y: ghostCoords[1], radius: 15, color: '#00ffff', speed: Ghost.speed, home: [18, 22], counter: 30, count: true }),
        new Ghost({ x: ghostCoords[0], y: ghostCoords[1], radius: 15, color: '#ff8000', speed: Ghost.speed, home: [0, 22], counter: 60, count: true }),
    ];
}
let animationId;
let ghostOrder = ['red', 'pink', '#00ffff', '#ff8000'];
function game() {
    time++;
    if (timer) timer--;
    scoreEl.innerText = score;
    liveEl.innerText = lives;
    levelEl.innerText = level;
    if (scareTimeout > 0) scareTimeout--;
    animationId = requestAnimationFrame(game);
    seconds = Math.floor(time / 60);
    /* if (totalPellets - currentPellets >= 30 && ghosts.find(x => x.color == '#00ffff') && ghosts.find(x => x.color == '#00ffff').caged && !ghosts.find(x => x.color == '#00ffff').timeLeave) {
        inky = ghosts.find(x => x.color == '#00ffff');
        inky.caged = false;
        inky.velocity.y = -Ghost.speed
    }
    if (currentPellets / totalPellets < (1 / 3) && ghosts.find(x => x.color == '#ff8000') && ghosts.find(x => x.color == '#ff8000').caged && !ghosts.find(x => x.color == '#ff8000').timeLeave) {
        clyde = ghosts.find(x => x.color == '#ff8000');
        clyde.caged = false;
        clyde.velocity.y = -Ghost.speed
    } */
    if (seconds >= 7) {
        if (seconds >= 84) chase = true;
        else if (seconds >= 79) chase = false;
        else if (seconds >= 59) chase = true;
        else if (seconds >= 54) chase = false;
        else if (seconds >= 34) chase = true;
        else if (seconds >= 27) chase = false;
        chase = true;
    } else chase = false;
    c.clearRect(0, 0, canvas.width, canvas.height);
    remains.forEach(remain => {
        remain.update();
        if (remain.finishedMoving && remain.path.length) {
            remain.move(remain.path.shift());
        }
    })
    if (pressedKeys.length) {
        player.facing = pressedKeys[0];
        switch (pressedKeys[0]) {
            case 'up':
                for (boundary of boundaries) {
                    if (player.colliding(boundary, { ...player, velocity: { x: 0, y: -player.speed } })) { player.velocity.y = 0; break }
                    else player.velocity.y = -player.speed
                };
                break;
            case 'down':
                for (boundary of boundaries) {
                    if (player.colliding(boundary, { ...player, velocity: { x: 0, y: player.speed } }) || (player.x == asGridCoord(ghostCoords[0]) && player.y == asGridCoord(ghostCoords[1] - 2))) { player.velocity.y = 0; break }
                    else player.velocity.y = player.speed
                };
                break;
            case 'left':
                for (boundary of boundaries) {
                    if (player.colliding(boundary, { ...player, velocity: { x: -player.speed, y: 0 } })) { player.velocity.x = 0; break }
                    else player.velocity.x = -player.speed
                };
                break;
            case 'right':
                for (boundary of boundaries) {
                    if (player.colliding(boundary, { ...player, velocity: { x: player.speed, y: 0 } })) { player.velocity.x = 0; break }
                    else player.velocity.x = player.speed
                };
                break;
        }
    }
    boundaries.concat([{ x: ghostCoords[0] * cellSize, y: ghostCoords[1] - 1 * cellSize, height: Boundary.height, width: Boundary.width }]).forEach(boundary => {
        boundary.draw && boundary.draw();
        if (player.colliding(boundary, player)) {
            player.velocity = { x: 0, y: 0 };
        }
    });
    if (curFruit) c.drawImage(fruit, fruitPos[0] * cellSize, fruitPos[1] * cellSize, cellSize, cellSize);
    if (curFruit && Math.hypot((asGridCoord(fruitPos[0]) + cellSize / 2) - player.x, (asGridCoord(fruitPos[1]) + cellSize / 2) - player.y) < player.radius + cellSize / 4) {
        score += fruits[curFruit].points;
        curFruit = '';
    }
    for (let i = ghosts.length - 1; i > -1; i--) {
        ghost = ghosts[i];
        if (Math.hypot(ghost.x - player.x, ghost.y - player.y) < (ghost.radius + player.radius) / 2) {
            if (ghost.scared) {
                let remainings = new Remains({ x: ghost.x, y: ghost.y, speed: Remains.speed, ghost });
                remains.push(remainings);
                ghosts.splice(i, 1);
                eatenGhosts++;
                if (eatenGhosts >= 4) score += 1600;
                else if (eatenGhosts == 3) score += 800;
                else if (eatenGhosts == 2) score += 400;
                else score += 200;
            } else {
                gameOver = true;
                if (wait > 60) wait = 60;
            }
        }
    }

    for (let i = pellets.length - 1; i > -1; i--) {
        let pellet = pellets[i]
        pellet.draw();
        if (pellet.colliding()) {
            pellets.splice(i, 1);
            score += 10;
            let counters = ghosts.filter(x => x.caged && x.count).sort(x => ghostOrder.indexOf(x.color));
            if (counters.length) counters[0].counter -= 1;
            timer = 4 * 60;
        }
    }
    for (let i = powerpellets.length - 1; i > -1; i--) {
        let pellet = powerpellets[i]
        pellet.draw();
        if (pellet.colliding()) {
            powerpellets.splice(i, 1);
            score += 50;
            scareTimeout = 8 * 60;
            ghosts.forEach(ghost => {
                if (!ghost.scared) {
                    ghost.scared = true;
                    if (!(fromGridCoord(ghost.x) == ghostCoords[0] && fromGridCoord(ghost.y) == ghostCoords[1])) ghost.velocity = { x: -ghost.velocity.x, y: -ghost.velocity.y }
                }
                ghost.flash = false;
            })
            timer = 4 * 60;
        }
    }

    if (!currentPellets) win = true;

    if (gameOver) {
        if (wait > 0) {
            wait -= 1;
            ghosts.forEach(x => x.draw());
            return player.draw();
        }
        player.radians += Math.abs(player.openRate * 0.5);
        if (player.radians > Math.PI) {
            player.radians = Math.PI
            reset('lose')
        }
        player.draw();
        return;
    };
    if (win) {
        if (levelWait > 0) {
            levelWait -= 1;
            if (!(levelWait % 12)) boundaries.forEach(x => x.flash = !x.flash);
            return player.draw();
        }
        if (levelWait <= 0) {
            cancelAnimationFrame(game);
            return reset('win');
        }
        player.draw();
        return;
    }
    player.update();
    //console.log([Math.floor(player.x / cellSize), Math.floor(player.y / cellSize)])
    if (player.x < 0) player.x = (grid[0].length - 1) * cellSize + cellSize / 2;
    if (player.x > (grid[0].length - 1) * cellSize + cellSize / 2) player.x = 0;
    let caged = ghosts.filter(x => x.caged && x.count).sort(x => ghostOrder.indexOf(x.color));
    if (caged.length && !timer) {
        caged[0].counter = 0;
        timer = 4 * 60;
    }
    ghosts.forEach(ghost => {
        ghost.update();
        if (scareTimeout <= 0 && ghost.scared) ghost.scared = false;
        if (Math.floor(scareTimeout / 60) <= 2 && !(scareTimeout % 12)) ghost.flash = !ghost.flash;
        if (ghost.x < 0) ghost.x = (grid[0].length - 1) * cellSize + cellSize / 2;
        if (ghost.x > (grid[0].length - 1) * cellSize + cellSize / 2) ghost.x = 0;
        let collisions = [];
        if (currentPellets <= 20 && ghost.color == 'red') {
            if (ghost.scared) ghost.speed = Ghost.speed;
            else ghost.speed = 4;
        }
        boundaries.forEach(boundary => {
            if (!collisions.includes('up') && ghost.colliding(boundary, { ...ghost, velocity: { x: 0, y: -ghost.speed } })) collisions.push('up')
            if (!collisions.includes('down') && (ghost.colliding(boundary, { ...ghost, velocity: { x: 0, y: ghost.speed } }) ||
                (ghost.x == asGridCoord(ghostCoords[0]) && ghost.y == asGridCoord(ghostCoords[1] - 2)))) collisions.push('down')
            if (!collisions.includes('left') && ghost.colliding(boundary, { ...ghost, velocity: { x: -ghost.speed, y: 0 } })) collisions.push('left')
            if (!collisions.includes('right') && ghost.colliding(boundary, { ...ghost, velocity: { x: ghost.speed, y: 0 } })) collisions.push('right')
            noUps.forEach(coords => {
                if ((ghost.x == coords[0] && ghost.y == coords[1]) && !collisions.includes('up')) collisions.push('up');
            })
        });
        if (collisions.length > ghost.prevCollisions.length) ghost.prevCollisions = collisions;
        if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
            if (ghost.velocity.y < 0) ghost.prevCollisions.push('up');
            if (ghost.velocity.y > 0) ghost.prevCollisions.push('down');
            if (ghost.velocity.x < 0) ghost.prevCollisions.push('left');
            if (ghost.velocity.x > 0) ghost.prevCollisions.push('right');
            const pathways = ghost.prevCollisions.filter(x => !collisions.includes(x));
            let direction;
            if (ghost.scared) direction = pathways[Math.floor(Math.random() * pathways.length)];
            else {
                let curPos = [fromGridCoord(ghost.x), fromGridCoord(ghost.y)];
                let target = chase ? ghost.target : ghost.home;
                let distancePos = [curPos[0] - target[0], curPos[1] - target[1]];
                let choice = pathways.map(dir => {
                    if (dir == 'up') return [Math.hypot(distancePos[0], distancePos[1] - 1), 'up'];
                    else if (dir == 'down') return [Math.hypot(distancePos[0], distancePos[1] + 1), 'down'];
                    else if (dir == 'left') return [Math.hypot(distancePos[0] - 1, distancePos[1]), 'left'];
                    else if (dir == 'right') return [Math.hypot(distancePos[0] + 1, distancePos[1]), 'right'];
                }).sort((a, b) => {
                    return Array.from(a)[0] - b[0];
                })[0];
                direction = choice ? choice[1] : pathways[Math.floor(Math.random() * pathways.length)];
            }
            ghost.velocity = { x: 0, y: 0 };
            switch (direction) {
                case 'up':
                    ghost.velocity.x = 0;
                    ghost.velocity.y = -ghost.speed;
                    break;
                case 'down':
                    ghost.velocity.x = 0;
                    ghost.velocity.y = ghost.speed;
                    break;
                case 'left':
                    ghost.velocity.y = 0;
                    ghost.velocity.x = -ghost.speed;
                    break;
                case 'right':
                    ghost.velocity.y = 0;
                    ghost.velocity.x = ghost.speed;
                    break;
                default: console.log(direction, 69)
            }
            ghost.prevCollisions = [];
        }
    })
    if (player.velocity.x > 0) player.rotation = 0;
    if (player.velocity.x < 0) player.rotation = Math.PI;
    if (player.velocity.y > 0) player.rotation = Math.PI / 2;
    if (player.velocity.y < 0) player.rotation = Math.PI * 1.5;
    currentPellets = pellets.length + powerpellets.length;
    let lifeadd = score - oldScore;
    if (lifeadd) {
        lifeScore += lifeadd;
        if (lifeScore >= 10000) {
            lifeScore %= 10000;
            lives += 1;
        };
        oldScore += lifeadd;
    }
}

let map = {
    ArrowUp: 'up',
    KeyW: 'up',
    ArrowDown: 'down',
    KeyS: 'down',
    ArrowLeft: 'left',
    KeyA: 'left',
    ArrowRight: 'right',
    KeyD: 'right',
};

addEventListener('keydown', e => {
    const dir = map[e.code];
    if (dir && !pressedKeys.includes(dir)) pressedKeys.unshift(dir);
});
addEventListener('keyup', e => {
    const dir = map[e.code];
    const index = pressedKeys.indexOf(dir)
    if (index > -1) pressedKeys.splice(index, 1)
});

Array.from(document.getElementsByClassName('start_but')).forEach(x => x.addEventListener('click', () => {
    document.getElementById('game').hidden = false;
    document.getElementById('start').hidden = true;
    start();
}));
document.querySelectorAll('#but_back').forEach(x => {
    x.addEventListener('click', () => {
        document.getElementById('end').hidden = true;
        document.getElementById('start').hidden = false;
    });
});
document.getElementById('leave_but').onclick = () => {
    location.assign('../games')
}
