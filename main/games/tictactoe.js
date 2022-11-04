var player = true,
    lineColor = "#fff",
    canvas = document.getElementById('game'),
    context = canvas.getContext('2d'),
    canvasSize = 400,
    sectionSize = canvasSize / 3,
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ],
    toPlace = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];
function begin(button) {
    player = true;
    updateColors();
    context.fillStyle = "#050505";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillRect(canvas.width, canvas.height, 0, 0);
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    document.getElementById('game').hidden = false;
    document.getElementById('start').hidden = true;
    drawLines(6, lineColor);
}

function draw(shape, xCordinate, yCordinate) {
    if (shape == "O") {
        var halfSectionSize = (0.5 * sectionSize);
        var centerX = xCordinate + halfSectionSize;
        var centerY = yCordinate + halfSectionSize;
        var radius = (sectionSize - 75) / 2;

        context.lineWidth = 7.5;
        context.strokeStyle = colors.o;
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    } else {
        context.strokeStyle = colors.x;
        context.lineWidth = 7.5
        context.beginPath();

        var offset = 37;
        context.moveTo(xCordinate + offset, yCordinate + offset);
        context.lineTo(xCordinate + sectionSize - offset, yCordinate + sectionSize - offset);

        context.moveTo(xCordinate + offset, yCordinate + sectionSize - offset);
        context.lineTo(xCordinate + sectionSize - offset, yCordinate + offset);
    }
    context.stroke();
    checkWin([].concat.apply([], board).map(x => x == "O" ? 1 : x == "X" ? 2 : ''))
}

function drawLines(lineWidth, strokeStyle) {
    var lineStart = 0;
    var lineLenght = canvasSize;
    context.lineWidth = lineWidth;
    context.strokeStyle = strokeStyle;
    context.beginPath();
    for (var y = 1; y <= 2; y++) {
        context.moveTo(lineStart, y * sectionSize);
        context.lineTo(lineLenght, y * sectionSize);
    }
    for (var x = 1; x <= 2; x++) {
        context.moveTo(x * sectionSize, lineStart);
        context.lineTo(x * sectionSize, lineLenght);
    }

    context.stroke();
}


canvas.addEventListener('mousedown', function(event) {
    var rect = canvas.getBoundingClientRect(),
        mouse = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    board.forEach((_, y) => _.forEach((_, x) => {
        var xCordinate = x * sectionSize,
            yCordinate = y * sectionSize;

        if (mouse.x >= xCordinate && mouse.x <= xCordinate + sectionSize && mouse.y >= yCordinate && mouse.y <= yCordinate + sectionSize && !board[y][x]) {
            player = !player;
            board[y][x] = player ? 'O' : 'X';
            draw(player ? "O" : "X", xCordinate, yCordinate);
        }
    }))
    drawLines(6, lineColor);
});
function checkWin(Board) {
    const winMap = [123, 456, 789, 147, 258, 369, 357, 159]
    const moves = Board.reduce((players, v, i) => {
        if (v) players[v - 1] += i + 1
        return players
    }, ['', ''])
    const winningMove = winMap.find(comb => moves.some(m => comb.toString().split('').every(c => m.includes(c))))
    let win = winningMove ? ['O', 'X'][Board[winningMove.toString()[0] - 1] - 1] : false;
    if (win) {
        document.getElementById('winner').innerText = `${win} Won!`;
        document.getElementById('game').hidden = true;
        document.getElementById('settings').hidden = true;
        document.getElementById('start').hidden = true;
        document.getElementById('end').hidden = false;
        board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
        toPlace = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
    }
}

Array.from(document.getElementsByClassName('start_but')).forEach(x => x.addEventListener('click', () => begin(x)));
document.querySelectorAll('#but_back').forEach(x => {
    x.addEventListener('click', () => {
        document.getElementById('end').hidden = true;
        document.getElementById('settings').hidden = true;
        document.getElementById('start').hidden = false;
        data = JSON.parse(localStorage.data || '{}');
        data.colors = {
            ...(data.colors || {}),
            o: Number(document.getElementById('Ocolor').value),
            x: Number(document.getElementById('Xcolor').value)
        };
        localStorage.data = JSON.stringify(data);
        updateColors();
    });
    updateColors();
});
document.getElementById('settings_but').addEventListener('click', () => {
    document.getElementById('settings').hidden = false;
    Array.from(document.getElementById('settings').children).forEach(x => x.hidden = false);
    document.getElementById('start').hidden = true;
});
document.getElementById('leave_but').onclick = () => {
    location.assign('../games')
}

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        return Math.round(255 * (l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1))).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}