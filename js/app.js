var Character = function(){
    this.x;
    this.y;
    this.sprite;
};

Character.prototype.width,  // Width of a character 
Character.prototype.height, // Height of a character
Character.prototype.leftMargin, // transparant margin in the image left of the character sprite
Character.prototype.topMargin; // transparant margin in the image on top of the character sprite

var Enemy = function() {
    Character.call(this);
    this.speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.protoype = Object.create(Character.prototype);
Enemy.prototype.construct = Enemy;

Enemy.width = 101; // Width of an enemy (and column)
Enemy.height = 66; // Height of the enemy (and rows)
Enemy.leftMargin = 0; // transparant margin in the image left of the enemy sprite
Enemy.topMargin = 78; // transparant margin in the image on top of the enemy sprite


function getNewEnemySpeed(){
    return 505 / randomNumber(1,3); // 505 is canvas.width
};

function getNewEnemyPostionX(){
    // return an y-value to place the enemy randomly on the 2nd, 3rd or 4th row;
    // we add 50px to the height because that's where the first row starts
    return randomInt(0, 505);
};

function getNewEnemyPostionY(){
    // return an y-value to place the enemy randomly on the 2nd, 3rd or 4th row
    // we add 50px to the height because that's where the first row starts
    // We then multiply randomly 1,2 or 3 with the row height (83) 
    // and finaly we subtract the transparant margin on top of the enemy image
    return 50 + randomInt(2,4) * 83 - Enemy.prototype.topMargin;
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
    if(this.x === undefined){
        this.x = getNewEnemyPostionX();
        this.y = getNewEnemyPostionY();
        this.speed = getNewEnemySpeed();
    }else{
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        if (this.x < ctx.canvas.clientWidth + this.width){
            return;
        }else{
            this.x = 0 - this.width;
            this.y = getNewEnemyPostionY();
            this.speed = getNewEnemySpeed();
        }
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
    this.setInitialPlayerPosition();
    this.sprite = 'images/char-boy.png';
};

Player.prototype.setInitialPlayerPosition = function(){
    this.x = 201; //middle of canvas
    this.y = 465; //bottom row
}

Player.prototype.update = function(){
    for(var i = 0; i< allEnemies.length; i++){
        if ( this.x == allEnemies[i].x )
            this.setInitialPlayerPosition();
    }
};

Player.prototype.width = 70; // Width of an player (and column)
Player.prototype.height = 75; // Height of the enemy (and rows)
Player.prototype.leftMargin = 15; // transparant margin in the image left of the Player sprite
Player.prototype.topMargin = 65; // transparant margin in the image on top of the Player sprite



Player.prototype.render = function(){
    ctx.fillRect(this.x + this.leftMargin , this.y, this.width, this.height);
    // Like the enemies, we have to display the player 73px higher to compensate for the 
    // transparant part above the actual player image
    ctx.drawImage(Resources.get(this.sprite), this.x, (this.y - this.topMargin ));
};

Player.prototype.handleInput = function(direction){
    switch(direction){
        case 'left':
            if(this.x > 0)  //If the player hasn't reached the left side of the field
                this.x -= 101;
            break;
        case 'up':
            if(this.y > (83 + 50)) //If the player hasn't reached the water
                this.y -= 83;
            break;
        case 'right':
            if(this.x < (504 - 101))  //If the player hasn't reached the right side of the field
                this.x += 101;
            break;
        case 'down':
            if(this.y < (50 + 83*5)) //If the player hasn't reached the bottom of the field
                this.y += 83;
    }
};

//instantiate player
var player = new Player;

//instantiate enemies
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
