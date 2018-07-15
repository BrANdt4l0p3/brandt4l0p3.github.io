var myGamePiece;
var gamePieceTwo;
var puck;
var leftScore;
var rightScore;
var leftScoreNum = 0;
var rightScoreNum = 0;
var myObstacles = [];

function startGame() {
    myGamePiece = new component(10, 100, "red", 40, 400);
    gamePieceTwo = new component(10, 100, "red", screen.availWidth - 60, 400);
    leftScore = new component("30px", "Consolas", "white", 280, 40, "text");
    rightScore = new component("30px", "Consolas", "white", screen.availWidth - 450, 40, "text");
    puck = new component(20, 20, "blue", screen.availWidth/2, screen.availHeight/2);
    var randX = Math.floor(Math.random() * 2) + 1;
    var randY = Math.floor(Math.random() * 2) + 1;
    
    if(randX == 1)
        puck.speedX = 5;
    else
        puck.speedX = -5;
    
    if(randY == 1)
        puck.speedY = 5;
    else
        puck.speedY = -5;
    
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
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
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
    
    this.puckStuff = function() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.bounce();
        this.bounceOffLeft(myGamePiece);
        this.bounceOffRight(gamePieceTwo);
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
        
        var leftSide = 0;
        if(this.x < leftSide) {
            this.x = screen.availWidth/2;
            this.y = screen.availHeight/2;
            rightScoreNum+=1;
            randX = Math.floor(Math.random() * 2) + 1;
            randY = Math.floor(Math.random() * 2) + 1;
    
            if(randX == 1)
                puck.speedX = 5;
            else
                puck.speedX = -5;
    
            if(randY == 1)
                puck.speedY = 5;
            else
                puck.speedY = -5;
        }
        var rightSide = myGameArea.canvas.width - this.width;
        if (this.x > rightSide) {
            this.x = screen.availWidth/2;
            this.y = screen.availHeight/2;
            leftScoreNum+=1;
            randX = Math.floor(Math.random() * 2) + 1;
            randY = Math.floor(Math.random() * 2) + 1;
    
            if(randX == 1)
                puck.speedX = 5;
            else
                puck.speedX = -5;
    
            if(randY == 1)
                puck.speedY = 5;
            else
                puck.speedY = -5;
        }
    }
    this.bounceOffLeft = function(otherobj) {
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        
        if(myleft < otherright && mytop < otherbottom && mybottom > othertop)
            puck.speedX *= -1.2;
    }
    
    this.bounceOffRight = function(otherobj) {
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        
        if(myright > otherleft && mytop < otherbottom && mybottom > othertop)
            puck.speedX *= -1.2;
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
     
    for (var i = 0; i < myObstacles.length; i += 1) {
        myGamePiece.crashWith(myObstacles[i]);
        myObstacles[i].update();
    }
    
    puck.puckStuff();
    puck.update();
    
    leftScore.text="SCORE: " + leftScoreNum;
    leftScore.update();
    rightScore.text="SCORE: " + rightScoreNum;
    rightScore.update();
    
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0; 
    //if (myGameArea.keys && myGameArea.keys[37]) {for(var a=0; a<=5; a+=.005){myGamePiece.speedX = -a} }
    //if (myGameArea.keys && myGameArea.keys[39]) {for(var b=0; b<=5; b+=.005){myGamePiece.speedX = b} }
    if (myGameArea.keys && myGameArea.keys[87]) {for(var a=0; a<=5; a+=.005){myGamePiece.speedY = -a} }
    if (myGameArea.keys && myGameArea.keys[83]) {for(var b=0; b<=5; b+=.005){myGamePiece.speedY = b} }    
    myGamePiece.newPos();
    myGamePiece.update();
    
    gamePieceTwo.speedX = 0;
    gamePieceTwo.speedY = 0; 
    //if (myGameArea.keys && myGameArea.keys[37]) {for(var a=0; a<=5; a+=.005){myGamePiece.speedX = -a} }
    //if (myGameArea.keys && myGameArea.keys[39]) {for(var b=0; b<=5; b+=.005){myGamePiece.speedX = b} }
    if (myGameArea.keys && myGameArea.keys[38]) {for(var c=0; c<=5; c+=.005){gamePieceTwo.speedY = -c} }
    if (myGameArea.keys && myGameArea.keys[40]) {for(var d=0; d<=5; d+=.005){gamePieceTwo.speedY = d} }    
    gamePieceTwo.newPos();
    gamePieceTwo.update();
}