class Snake {
    constructor(plr, canvas) {
        this.plr = plr;
        this.canvas = canvas;
        this.color = plr ? 270 : 120;
        this.lock = false;
        this.x = 12 * grid;
        this.y = plr ? 18 * grid : 12 * grid;
        this.dx = grid;
        this.dy = 0;
        this.cells = [];
        this.maxCells = 4;
        this.apples = 0;
        this.reset = () => {
            document.getElementById('game').hidden = true;
            document.getElementById('end').hidden = false;
            document.getElementById('apples').innerText = `You got ${this.apples} apple${this.apples - 1 ? 's' : ''}!`;
            cancelAnimationFrame(frame);
        }
    };
    turn(dir) {
        if (this.lock || !dir) return;
        this.lock = true;
        switch (dir.toLowerCase().replace('arrow', '')) {
            case 'left': if (this.dx == 0) {
                this.dx = -grid;
                this.dy = 0
            }; break;
            case 'up': if (this.dy == 0) {
                this.dy = -grid;
                this.dx = 0
            }; break
            case 'right': if (this.dx == 0) {
                this.dx = grid;
                this.dy = 0
            };; break
            case 'down': if (this.dy == 0) {
                this.dy = grid;
                this.dx = 0
            }; break
        }
    };
    move() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x < 0 || this.x >= this.canvas.width || this.y < 0 || this.y >= this.canvas.height) this.reset();
        this.cells.unshift({ x: this.x, y: this.y });
        if (this.cells.length > this.maxCells) this.cells.pop();
        this.lock = false;
    };
};
function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        return Math.round(255 * (l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1))).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}




const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    grid = canvas.width / 25,
    count = 0,
    apple = {
        x: getRandomInt(0, 400 / grid) * grid,
        y: getRandomInt(0, 400 / grid) * grid
    },
    players = [new Snake(0, canvas)],
    frame = null,
    button;
function begin(Button) {
    button = Button;
    players = button.id == 'local' ? [new Snake(0, canvas), new Snake(1, canvas)] : [new Snake(0, canvas)];
    document.getElementById('game').hidden = false;
    document.getElementById('start').hidden = true;
    apple.x = 17 * grid;
    apple.y = 12 * grid;
    function loop() {
        frame = requestAnimationFrame(loop);
        if (++count < 6) return;
        count = 0;
        context.fillStyle = '#050505';
        context.fillRect(0, 0, 400, 400);
        /* context.fillStyle = '#101010';
        context.fillRect(0, 0, 400, 400); */
        
        players.forEach((snake) => {
            snake.move();
            context.fillStyle = '#c20000';
            context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

            snake.cells.forEach((cell, index) => {
                context.fillStyle = hslToHex(snake.color, 100, index ? [20, 20, 25, 25][index % 4] : 15);
                context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
                if (cell.x === apple.x && cell.y === apple.y) {
                    snake.maxCells++;
                    snake.apples++;
                    apple.x = getRandomInt(0, 400 / grid) * grid;
                    apple.y = getRandomInt(0, 400 / grid) * grid;
                }
                if (snake.cells.length > [...new Set(snake.cells.map(JSON.stringify))].map(JSON.parse).length) snake.reset();
            });
        });
    };
    requestAnimationFrame(loop);
}
document.addEventListener('keydown', (e) => {
    if (button.id == 'local') {
        if (e.key.includes('Arrow')) players.find(x => x.plr == 1).turn(e.key);
        else switch (e.key) {
            case 'w': players.find(x => x.plr == 0).turn('up'); break;
            case 'a': players.find(x => x.plr == 0).turn('left'); break;
            case 's': players.find(x => x.plr == 0).turn('down'); break;
            case 'd': players.find(x => x.plr == 0).turn('right'); break;
        }
    } else {
        if (e.key.includes('Arrow')) players[0].turn(e.key);
        else switch (e.key) {
            case 'w': players[0].turn('up'); break;
            case 'a': players[0].turn('left'); break;
            case 's': players[0].turn('down'); break;
            case 'd': players[0].turn('right'); break;
        }
    }
});
Array.from(document.getElementsByClassName('start_but')).forEach(x => x.addEventListener('click', () => begin(x)));
document.querySelectorAll('#but_back').forEach(x => {
    x.addEventListener('click', () => {
        document.getElementById('end').hidden = true;
        document.getElementById('start').hidden = false;
    });
});
document.getElementById('leave_but').onclick = () => {
    location.assign('../games')
}