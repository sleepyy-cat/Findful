I made a few changes to the Space concept from the Assignment 2 version. 

1. I renamed the concept to "Space", which matches the state. I didn't believe the StorageHierarchy name was necessary, since the hierarchy was apparent in the state of Space (with the parent and children parameters).
2. I clarified the **requires** and **effects** clauses of the **deleteSpace** action: deleting a Space requires it has no children, and thus it will be deleted on its own. This made the action more clear. 

There were no issues when implementing and testing this concept as well. 