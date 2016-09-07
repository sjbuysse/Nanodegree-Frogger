Since both `Player` and `Enemy` have protoype properties `width`, `height`, `leftMargin`, and a `topMargin`, I feel like this could be refactored somehow, but how? I also don't want to save them as superclass variables, since that would mean that every instance will need to save these variables

I want to see the player and bug sprite overlap for a split second before resetting the game, how can I do that?

There are a few instances where we reset player's position (see player.protoype.update), and I always just set x and y to 218 and 465 respectively. 
Is there a way to refactor this, and can we refactor this so that we can reset the player to any begin value (say you instantiated a player with x=50), rather than always repeating 218.
