I made a few changes to the LocationLog concept from the Assignment 2 version. 

1. I renamed the concept to "LocationLog", since that makes it more clear what its purpose is without needing 2 names (LocationLog and LocationLogging).
2. I made the generic type for location Space instead of Location, since my concept for storage spaces is named Space and this makes it more clear.
3. I added the createLog function because I needed a way to keep track of the parameters, especially the space history. I did not add anything that was specific to the item or space concepts because that would be conflating concepts--the only **requires** and **effects** that I added were directly related to the LocationLog concept. 

There were no issues when implementing and testing this concept as well. 