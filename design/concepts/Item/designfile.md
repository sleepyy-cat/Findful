I made a few changes to the Item concept from the Assignment 2 version. 

1. I changed the updateItemDetails function so that it will be valid even if none of the parameters are entered, since that would just be a no-change situation. I felt like the requirement that at least one of the parameters has to exist was unnecessary. 
2. I added the lookupItem function (which was added in Assignment 3). I recognize that this is a query and is not normally added in the "actions" state of a concept specification, but due to my previous implementation I have chosen to add it. 
3. I added user parameters to the actions and added corresponding requirements to those actions to ensure that actions on Items can only be performed by the user who owns the Item. 

There were no issues when implementing and testing this concept as well. 