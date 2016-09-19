// This is the superclass of both Player and Enemy
var Character = function(sprite, x, y){
    this.x = x || 0;
    this.y = y || 0;
    this.sprite = sprite || "";
};

Character.prototype.render = function(){
    //ctx.fillRect(this.x , this.y, this.width, this.height);
    // We modify the x and y value of the drawn image, to compensate transparant parts of the sprite
    ctx.drawImage(Resources.get(this.sprite), (this.x - this.leftMargin) , (this.y - this.topMargin ));
};

/****
 * ENEMY CLASS
 ****/
var Enemy = function() {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    var sprite = 'images/enemy-bug.png';
    // return an integer value in between 0 and 505 (canvas width)
    var x = randomInt(0, 505);
    var y = this.getNewRow();
    Character.call(this, sprite, x, y);

    this.setNewSpeed();
};

// Add Character.prototype to the prototype chain of Enemy.protoype
Enemy.prototype = Object.create(Character.prototype);
// Since we've replaced the default protoype object, we have to add the constructor property again to Enemy.prototype
Enemy.prototype.constructor = Enemy;

Enemy.prototype.width = 96; // Width of an enemy
Enemy.prototype.height = 65; // Height of the enemy
Enemy.prototype.leftMargin = 2; // transparant margin in the image left of the enemy sprite
Enemy.prototype.topMargin = 78; // transparant margin in the image on top of the enemy sprite

// Parameter: dt, a time delta between ticks, so the time that has passed since last tick
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x < ctx.canvas.clientWidth + this.width){
        return;
    }else{
        //Position enemy left, just outside of the canvas
        this.x = 0 - this.width;
        this.y = this.getNewRow();
        this.setNewSpeed();
    }
};

Enemy.prototype.setNewSpeed = function(){
    // 505 is canvas. So this method will return a speed 
    // to make the enemy cross the canvas in either 1, 2 or 3 seconds
    this.speed = 505 / randomNumber(1,3); 
};

Enemy.prototype.getNewRow = function(){
    // return a new y-value to place the enemy randomly on the 2nd, 3rd or 4th row
    // we add 50px to the height because that's where the first row starts
    // We then multiply randomly 1,2 or 3 with the row height (83) 
    // and finaly we subtract the transparant margin on top of the enemy image
    return 50 + randomInt(2,4) * 83 - this.topMargin;
};

/****
 * PLAYER CLASS
 ****/
var Player = function(x, y, hearts) {
    var sprite = 'images/char-boy.png';
    Character.call(this, sprite, x, y);
    this.hearts = hearts;
    this.score = 0;
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(){
    //check for collisions with enemies
    for(var i = 0; i< allEnemies.length; i++){
        if (this.x  < allEnemies[i].x + allEnemies[i].width &&
           this.x + this.width > allEnemies[i].x &&
           this.y < allEnemies[i].y + allEnemies[i].height &&
           this.height + this.y > allEnemies[i].y) {
               //collision detected!
               this.hearts--;
               this.x = 220;
               this.y = 465;
        }
    }

    //check if player has reached water
    //50px is where the water begins, and the water row is 83px high
    if (this.y < (50+83)){
        //reached the water!
        this.score += 10;
        this.x = 220;
        this.y = 465;
    }
};

Player.prototype.width = 66; // Width of an player
Player.prototype.height = 75; // Height of the player
Player.prototype.leftMargin = 18; // transparant margin in the image left of the player sprite
Player.prototype.topMargin = 64; // transparant margin in the image on top of the player sprite


Player.prototype.handleInput = function(direction){
    switch(direction){
        case 'left':
            if(this.x > this.leftMargin)  //If the player hasn't reached the left side of the field
                this.x -= 101; //101 is width of column
            break;
        case 'up':
            this.y -= 83; // 83 is height of row
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

/****
 * INSTANTIATION
 ****/
//instantiate player, 201,465 is middle of bottom row in canvas
var player = new Player(220, 465, 3);

//instantiate enemies
var allEnemies = [];
for(var i = 0; i < 3; i++){
    allEnemies[i] = new Enemy(200, 200, 150);
}

/****
 * HELPER FUNCTIONS
 ****/
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


/****
 * EVENT LISTENERS
 ****/

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
