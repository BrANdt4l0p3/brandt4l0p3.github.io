var canvas;
var ctx;

var head;
var apple;
var body;

var size;
var apple_x;
var apple_y;

var leftDirection = false;
var rightDirection = true;
var upDirection = false;
var downDirection = false;
var inGame = true;    

const unitSize = 10;
const delay = 140;
const canvasHeight = 600;
const canvasWidth = canvasHeight;   
const spaces = (canvasHeight*canvasWidth)/100; //3600
const rand = (canvasHeight/10)-1; //59

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;

var x = new Array(spaces);
var y = new Array(spaces);   

function init() {
    
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    loadImages();
    createSnake();
    placeApple();
    setTimeout("continuous()", delay);
}    

function loadImages() {
    
    head = new Image();
    head.src = 'head.png';    
    
    body = new Image();
    body.src = 'body.png'; 
    
    apple = new Image();
    apple.src = 'apple.png'; 
}

function createSnake() {

    size = 3;

    for (var a = 0; a < size; a++) {
        x[a] = 50 - a * 10;
        y[a] = 50;
    }
}

function eat() {

    if ((x[0] == apple_x) && (y[0] == apple_y)) {

        size++;
        placeApple();
    }
}    

function draw() {
    
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    if (inGame) {

        ctx.drawImage(apple, apple_x, apple_y);

        for (var z = 0; z < size; z++) {
            
            if (z == 0) {
                ctx.drawImage(head, x[z], y[z]);
            } else {
                ctx.drawImage(body, x[z], y[z]);
            }
        }    
    } else {

        gameOver();
    }        
}

function gameOver() {
    
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle'; 
    ctx.textAlign = 'center'; 
    ctx.font = 'normal bold 18px serif';
    
    ctx.fillText('Game over', canvasWidth/2, canvasHeight/2);
}

function move() {

    for (var z = size; z > 0; z--) {
    
        x[z] = x[(z - 1)];
        y[z] = y[(z - 1)];
    }

    if (leftDirection) {
    
        x[0] -= unitSize;
    }

    if (rightDirection) {
    
        x[0] += unitSize;
    }

    if (upDirection) {
    
        y[0] -= unitSize;
    }

    if (downDirection) {
    
        y[0] += unitSize;
    }
}    

function bounds() {

    for (var z = size; z > 0; z--) {

        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
            inGame = false;
        }
    }

    if (y[0] >= canvasHeight) {
    
        inGame = false;
    }

    if (y[0] < 0) {
    
       inGame = false;
    }

    if (x[0] >= canvasWidth) {
    
      inGame = false;
    }

    if (x[0] < 0) {
    
      inGame = false;
    }
}

function placeApple() {

    var r = Math.floor(Math.random() * rand);
    apple_x = r * unitSize;

    r = Math.floor(Math.random() * rand);
    apple_y = r * unitSize;
}    

function continuous() {
    
    if (inGame) {

        eat();
        bounds();
        move();
        draw();
        setTimeout("continuous()", delay);
    }
}

onkeydown = function(i) {
    
    var key = i.keyCode;
    
    if ((key == LEFT_KEY) && (!rightDirection)) {
        
        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == RIGHT_KEY) && (!leftDirection)) {
        
        rightDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == UP_KEY) && (!downDirection)) {
        
        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    if ((key == DOWN_KEY) && (!upDirection)) {
        
        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    }        
}; 