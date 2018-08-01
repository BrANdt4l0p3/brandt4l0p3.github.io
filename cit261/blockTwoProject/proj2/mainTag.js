/*This program is heavily flawed and is definitely still a work in progress, however, i had a lot of fun making it and i feel that it definitely shows off some of what i learned this semester.*/

var myGamePiece;
var gamePieceTwo;
var timeStuff = 10;
var tagTitle;
var timer;
var myObstacles = [];
var random = Math.floor(Math.random() * 2) + 1;
var rightit = false;
var leftit = false;

function startGame() {
    myGamePiece = new component(30, 30, "blue", 180, 400);
    gamePieceTwo = new component(30, 30, "blue", screen.availWidth - 200, 400);
    tagTitle = new component("30px", "Consolas", "white", screen.availWidth/2-90, 40, "text"); 
    timer = new component("30px", "Consolas", "white", screen.availWidth/2+18, 80, "text"); 
    var randX = Math.floor(Math.random() * 2) + 1;
    var randY = Math.floor(Math.random() * 2) + 1;
    
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = screen.availWidth-20;
        this.canvas.height = screen.availHeight-200;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        setTimeout(function() {this.interval = setInterval(stuff, 1000);}, 3000);
        
        setTimeout(function() {
            if(random == 2) {
                gamePieceTwo.it();
                rightit = true;
            }
            else {
                myGamePiece.it();
                leftit = true;
            }
        }, 3000);
        
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false; 
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function stuff() {
    timeStuff--;
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.update = function() {
        var ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            if(rightit){
                ctx.fillStyle = "red";
                ctx.fillRect(gamePieceTwo.x, gamePieceTwo.y, gamePieceTwo.width, gamePieceTwo.height);
            }
            else{
                ctx.fillStyle = color;
                ctx.fillRect(gamePieceTwo.x, gamePieceTwo.y, gamePieceTwo.width, gamePieceTwo.height);
            }
            if(leftit){
                ctx.fillStyle = "red";
                ctx.fillRect(myGamePiece.x, myGamePiece.y, myGamePiece.width, myGamePiece.height);
            }
            else{
                ctx.fillStyle = color;
                ctx.fillRect(myGamePiece.x, myGamePiece.y, myGamePiece.width, myGamePiece.height);
            }
        }
    }
    
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.hitSides();        
    }
    
    this.hitSides = function(){
        var rocktop = 0;
        if(this.y < rocktop) {
            this.y = rocktop;
            this.speedY = 0;
        }
        
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.speedY = 0;
        }
        
        var leftSide = 0;
        if(this.x < leftSide) {
            this.x = leftSide;
            this.speedX = 0;
        }
        var rightSide = myGameArea.canvas.width - this.width;
        if (this.x > rightSide) {
            this.x = rightSide;
            this.speedX = 0;
        }
    }
    
    this.it = function() {
        var ctx = myGameArea.context;
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    this.notIt = function() {
        var ctx = myGameArea.context;
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    this.tag = function(){
        if(rightit){
            if(gamePieceTwo.crashWith(myGamePiece)){
                rightit = false;
                leftit = true;
            }
        }
        else{
            if(myGamePiece.crashWith(gamePieceTwo)){
                leftit = false;
                rightit = true;
            }
        }
    }
    
    this.bounce = function(){
        var randX;
        var randY;
        var rocktop = 0;
        if(this.y < rocktop) {
            this.y = rocktop;
            this.speedY *= -1;
        }
        
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.speedY *= -1;
        }
    }
    
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGameArea.frameNo += 1;
    
    if(rightit){
        if(gamePieceTwo.crashWith(myGamePiece)){
            rightit = false;
            leftit = true;
            timeStuff += 10-timeStuff;
        }
    }
    else{
        if(myGamePiece.crashWith(gamePieceTwo)){
            leftit = false;
            rightit = true;
            timeStuff += 10-timeStuff;
        }
    }
     
    for (var i = 0; i < myObstacles.length; i += 1) {
        myGamePiece.crashWith(myObstacles[i]);
        myObstacles[i].update();
    }
    
    if(timeStuff < 0)
        return;
    
    tagTitle.text = "TAG! Red is it!";
    tagTitle.update();
    timer.text = timeStuff;
    timer.update();
    
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0; 
    if (myGameArea.keys && myGameArea.keys[65]) {for(var a=0; a<=10; a+=.005){myGamePiece.speedX = -a} }
    if (myGameArea.keys && myGameArea.keys[68]) {for(var b=0; b<=10; b+=.005){myGamePiece.speedX = b} }
    if (myGameArea.keys && myGameArea.keys[87]) {for(var c=0; c<=10; c+=.005){myGamePiece.speedY = -c} }
    if (myGameArea.keys && myGameArea.keys[83]) {for(var d=0; d<=10; d+=.005){myGamePiece.speedY = d} }    
    myGamePiece.newPos();
    myGamePiece.update();
    
    gamePieceTwo.speedX = 0;
    gamePieceTwo.speedY = 0; 
    if (myGameArea.keys && myGameArea.keys[37]) {for(var e=0; e<=10; e+=.005){gamePieceTwo.speedX = -e} }
    if (myGameArea.keys && myGameArea.keys[39]) {for(var f=0; f<=10; f+=.005){gamePieceTwo.speedX = f} }
    if (myGameArea.keys && myGameArea.keys[38]) {for(var g=0; g<=10; g+=.005){gamePieceTwo.speedY = -g} }
    if (myGameArea.keys && myGameArea.keys[40]) {for(var h=0; h<=10; h+=.005){gamePieceTwo.speedY = h} }    
    gamePieceTwo.newPos();
    gamePieceTwo.update();
}