const canvas = document.querySelector('#canvas')
const images = {};
const songs = { game_on: new Audio('./songs/game_on.mp3') };
images.note = new Image();
images.note.src = './images/note.png';
let pushes = [];
class Note {
    constructor({ time, slot, hold, test }) {
        this.time = time * 60;
        this.slot = slot;
        this.holdTime = hold || 0;
        this.hitTime = time * 60 + 77;
        this.releaseTime = this.holdTime ? (time + this.holdTime) * 60 + 77 : null;
        this.pressing = false;
        this.draw = this.draw.bind(this);
    }
    draw(canvas, ctx, time) {
        ctx.fillStyle = '#8000ff';
        if (Math.abs(this.hitTime - time) <= 10 || (this.hitTime < time && time < this.releaseTime)) ctx.fillStyle = 'green';
        if (Math.abs(this.releaseTime - time) <= 10) ctx.fillStyle = 'red';
        let holdHeight = this.holdTime ? this.holdTime * 600 : 50;
        ctx.fillRect(50 + (this.slot * (550 / 4)) + (this.slot * 50), canvas.height - (this.time - time) * 10 - holdHeight, 275 / 2, holdHeight);
    }
}
class Song {
    constructor({ media, author, notes, wait }) {
        this.media = media;
        this.author = author;
        this.wait = wait;
        this.notes = notes.map(x => new Note(x));
        this.notes.forEach(note => note.time += this.wait);
        this.play = this.play.bind(this);
    }
    play(time) {
        this.media.currentTime = time;
        this.media.play();
    }
}
const [gameOn] = [new Song({
    media: songs.game_on, author: "Avenza", wait: 80, notes: [
        /* { time: 0, slot: 0, hold: 4 },
        { time: 4, slot: 1, hold: 2 },
        { time: 4, slot: 2, hold: 2 },
        { time: 6, slot: 3, hold: 2 },

        { time: 8.3, slot: 0, hold: 4 },
        { time: 12.3, slot: 1, hold: 2 },
        { time: 12.3, slot: 2, hold: 2 },
        { time: 14.3, slot: 3, hold: 2 },

        { time: 16.5, slot: 1 },
        { time: 16.5, slot: 2 },

        { time: 17, slot: 0 },
        { time: 17.5, slot: 2 },

        { time: 18.4, slot: 1 },
        { time: 18.6, slot: 3 },

        { time: 19.2, slot: 2 },
        { time: 19.4, slot: 0 },

        { time: 20, slot: 1 },
        { time: 20, slot: 2 }, */

        { time: 0, slot: 0, hold: 4 },
        { time: 4, slot: 1, hold: 2 },
        { time: 4, slot: 2, hold: 2 },
        { time: 6, slot: 3, hold: 2 },
        { time: 8.3, slot: 0, hold: 4 },
        { time: 12.3, slot: 1, hold: 2 },
        { time: 12.3, slot: 2, hold: 2 },
        { time: 14.3, slot: 3, hold: 2 },

        { time: 16.4, slot: 1 },
        { time: 16.4, slot: 2 },

        { time: 17, slot: 0 },
        { time: 17.5, slot: 2 },
        { time: 18.3, slot: 1 },
        { time: 18.5, slot: 3 },
        { time: 19.2, slot: 2 },
        { time: 19.4, slot: 0 },
        { time: 20, slot: 3 },

        { time: 21.1, slot: 0 },
        { time: 21.6, slot: 2 },
        { time: 22.3, slot: 1 },
        { time: 22.6, slot: 3 },
        { time: 23.3, slot: 2 },
        { time: 23.5, slot: 0 },
        { time: 24.1, slot: 3 },
        { time: 24.1, slot: 2 },

        
        { time: 25.2, slot: 0 },
        { time: 25.8, slot: 2 },
        { time: 26.5, slot: 1 },
        { time: 26.8, slot: 3 },
        { time: 27.5, slot: 2 },
        { time: 27.7, slot: 0 },
        { time: 28.3, slot: 3 },

        { time: 29.4, slot: 0 },
        { time: 30.0, slot: 2 },
        { time: 30.7, slot: 1 },
        { time: 31.0, slot: 3 },
        { time: 31.7, slot: 2 },
        { time: 31.9, slot: 0 },
        { time: 32.5, slot: 3 },
    ]
})];
class Game {
    constructor() {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.state = {
            songs: [gameOn],
            song: null,
            notes: [],
            time: null,
            play: false,
            pushes: [],
            oldPushes: []
        };
        this.step = this.step.bind(this);
        this.choose = this.choose.bind(this);
        this.init = this.init.bind(this);
    }
    step() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.state.play) {
            if (this.state.song && this.state.notes.length) this.state.notes.forEach(note => {
                if (Math.abs(note.time - this.state.time) <= 600) {
                    note.draw(this.canvas, this.ctx, this.state.time);
                }
            });
            this.state.time++;
            this.ctx.strokeStyle = 'blue';
            this.ctx.strokeRect(50, this.canvas.height - 75, 275 / 2, 50);
            this.ctx.strokeRect(237.5, this.canvas.height - 75, 275 / 2, 50);
            this.ctx.strokeRect(425, this.canvas.height - 75, 275 / 2, 50);
            this.ctx.strokeRect(612.5, this.canvas.height - 75, 275 / 2, 50)
        }
        requestAnimationFrame(this.step);
    }
    choose(song) {
        let time = 0
        this.state.song = this.state.songs[song];
        this.state.notes = this.state.song.notes;
        this.state.play = true;
        this.state.time = time * 60;
        setTimeout(() => {

            this.state.song.play(time);
        }, 1000)
    }
    init() {
        requestAnimationFrame(this.step);
    }
}
const game = new Game();
game.init();
canvas.onclick = () => {
    game.choose(0);
    canvas.onclick = () => { }
}
//window.onerror = e => alert(e)
window.onkeypress = e => {
    game.state.pushes.includes((game.state.time) / 60) || (game.state.pushes.push(game.state.time / 60), console.log(game.state.pushes))
}