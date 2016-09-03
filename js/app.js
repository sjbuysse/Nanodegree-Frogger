// Enemies our player must avoid
var Enemy = function() {
    // Instantiate enemy anywhere in between left and right of the canvas. 
    this.x = randomInt(0, 505); // 505 is canvas.width
    this.y = getNewEnemyPostionY(); 
    this.speed = getNewSpeed();
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.width = 101; // Width of an enemy (and column)
Enemy.prototype.height = 83; // Height of the enemy (and rows)

function getNewSpeed(){
    return 505 / randomNumber(1,3); // 505 is canvas.width
};
function getNewEnemyPostionY(){
    // return an y-value to place the enemy randomly on the 2nd, 3rd or 4th row;
    // we add 50px to the height because that's where the first row starts
    return 50 + randomInt(1,3) * Enemy.prototype.height;
};

function randomNumber(min, max){
    //return a double in between min and max
    return Math.random() * (max - min) + min;
};

function randomInt(min,max){
    // randomInt returns an integer number in between min and max. We could use the Math.round() function
    // but that would mean that both min and max values only have half the chance of being picked. 
    // Instead we will increase the interval by 1 and alway round down, 
    // so the biggest possible value still is max, 
    // this gives us an even distribution in between min and max. 
    return Math.floor(Math.random() * (max - min + 1)) + min ;
};

// Parameter: dt, a time delta between ticks, so the time that has passed since last tick
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x < ctx.canvas.clientWidth + this.width){
        return;
    }else{
        this.x = 0 - this.width;
        this.y = getNewEnemyPostionY();
        this.speed = getNewSpeed();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    //ctx.fillRect(this.x, this.y, this.width, this.height);
    // subtract 73px from y, because the enemy sprite needs to be displayed 73px higher, 
    // since the image has 73px of transparant space above the bug.
    ctx.drawImage(Resources.get(this.sprite), this.x, (this.y - 73));
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    //this.x = ctx.canvas.clientWidth /2; //middle of canvas
    //this.y = ctx.canvas.clientHeight; //bottom row
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt){
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction){
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player;
var allEnemies = [];
for(var i = 0; i < 3; i++){
    allEnemies[i] = new Enemy();
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
