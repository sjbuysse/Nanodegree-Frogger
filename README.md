I have an `Enemy` and `Player` class. Both classes will have a `width`, `height`, `leftMargin`, and a `topMargin` variable. 
These variables will be the same for each instance of the classes, does this mean that they have to be stored in the prototype object? (Since we've learned that all commonalities are part of the prototype object)
So for example `Enemy.prototype.width = 101` and `Player.protoype.width = 70`;

I also would like to make a superclass `Character` for the `Enemy` and `Player` subclasses.
Since both `Enemy` and `Player` have these 4 variables, I'm guessing it's good coding style to make them part of the `Character` class. How would that implementation work? 

Is it "allright" to instantiate x,y and speed in the update method? Or does that not make sense?
