var express = require('express'),
    app = express(),
    serv = require('http').Server(app);
app.get('/', (_, res) => res.sendFile(__dirname + '/index.html'));
app.get('/games', (_, res) => res.sendFile(__dirname + '/main/games.html'));

['2048', 'snake', 'test', 'tetris', 'tictactoe', 'pacman'].forEach(game => {
    app.get('/games/' + game, (_, res) => res.sendFile(__dirname + '/main/games/'+game+'.html'))
})

app.use(express.static('main'));

serv.listen(process.env.PORT || 2000);
