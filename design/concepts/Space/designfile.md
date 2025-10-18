I made a few changes to the Space concept from the Assignment 2 version. 

1. I renamed the concept to "Space", which matches the state. I didn't believe the StorageHierarchy name was necessary, since the hierarchy was apparent in the state of Space (with the parent and children parameters).
2. I clarified the **requires** and **effects** clauses of the **deleteSpace** action: deleting a Space requires it has no children, and thus it will be deleted on its own. This made the action more clear. 
3. I added user parameters to the actions and added corresponding requirements to those actions to ensure that actions on Spaces can only be performed by the user who owns the Space. 
4. I added the requirement in **moveSpace** that the space's name must be unique among newParent's children, since otherwise the move would not be valid.

There were no issues when implementing and testing this concept as well. 