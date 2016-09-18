both `Enemy` and `Player` have a `width`, `height`, `leftMargin`, and a `topMargin` properties in their prototype object. 
Is there a way of refactoring this? Could these properties perhaps be part of the `Character` superclass? How would that implementation work? 
I have a similar question for the `update` method, that both `Enemy` and `Player` have.
Both classes have this method. Even though the implementation is completely different, would it make sense to add this method to the `Character` class or not? 
