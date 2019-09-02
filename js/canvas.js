let drawArea = {};
let board, context;
let size = 300;
var dimension = [document.documentElement.clientWidth, document.documentElement.clientHeight];

function docLoad() {

    board = document.getElementById('board');
    context = board.getContext('2d');

    board.width = dimension[0];
    board.height = dimension[1];

    setInterval(time, -1000);

}

time = function () {
    let date = new Date();
    s = date.getSeconds();
    m = date.getMinutes();
    h = date.getHours();
    context.drawClockHands(s, m, h);
}

CanvasRenderingContext2D.prototype.drawClockHands = function (second, minute, hour) {

    let angle;
    let s = size * 17 / 20, m = size * 13 / 20, h = size / 2;

    this.clearRect(0, 0, dimension[0], dimension[1]);

    context.drawCircle(dimension[0] / 2, dimension[1] / 2, size);

    angle = Math.PI * second / 30;
    this.beginPath();
    this.moveTo(dimension[0] / 2, dimension[1] / 2);
    this.lineWidth = 1;
    this.lineTo(dimension[0] / 2 + (s * Math.sin(angle)), dimension[1] / 2 - (s * Math.cos(angle)));
    this.stroke();

    angle = (Math.PI * minute / 30) + (Math.PI * second / 1800);
    this.beginPath();
    this.moveTo(dimension[0] / 2, dimension[1] / 2);
    this.lineWidth = 3;
    this.lineTo(dimension[0] / 2 + (m * Math.sin(angle)), dimension[1] / 2 - (m * Math.cos(angle)));
    this.stroke();

    if (hour > 12) {
        hour -= 12;
    }

    angle = (Math.PI * hour / 6) + (Math.PI * minute / 360);
    this.beginPath();
    this.moveTo(dimension[0] / 2, dimension[1] / 2);
    this.lineWidth = 5;
    this.lineTo(dimension[0] / 2 + (h * Math.sin(angle)), dimension[1] / 2 - (h * Math.cos(angle)));
    this.stroke();

    this.beginPath();
}

CanvasRenderingContext2D.prototype.drawCircle = function (x, y, r) {

    this.beginPath();
    this.lineWidth = 3;
    this.ellipse(x, y, r, r, 0, 0, Math.PI * 2);
    this.strokeStyle = 'black';
    this.stroke();

    this.fillStyle = 'white';
    this.fill();

    this.setLineDash([0, size * 9 / 10, 0]);

    for (let i = 0; i < 12; i++) {
        this.beginPath();
        this.moveTo(dimension[0] / 2, dimension[1] / 2);
        this.lineTo(dimension[0] / 2 + (size * Math.sin(Math.PI * 2 * i / 12)), dimension[1] / 2 - (size * Math.cos(Math.PI * 2 * i / 12)));
        this.stroke();
    }

    this.setLineDash([0, size * 19 / 20, 0]);

    for (let i = 0; i < 60; i++) {
        this.lineWidth = 1;
        this.beginPath();
        this.moveTo(dimension[0] / 2, dimension[1] / 2);
        this.lineTo(dimension[0] / 2 + (size * Math.sin(Math.PI * 2 * i / 60)), dimension[1] / 2 - (size * Math.cos(Math.PI * 2 * i / 60)));
        this.stroke();
    }



    this.setLineDash([0]);

}

function getRndInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}