# concept: LocationLog
*   **concept**: LocationLog [Item, Space]
*   **purpose**: To track the current and past locations of items within the spatial storage hierarchy.
*   **principle**: A user can create logs for items' physical journeys, which link an item to its current location and all of its past locations. The log corresponding to each item is updated each time the item is moved.
*   **state**:
    *   A set of `LocationLogs` with
        *   a `thisItem` of type `Item`
        *   a `currentSpace` of type `Space`
        *   a `locationHistory` of type `sequence of Spaces` (that Item has been in, in chronological order)
*   **actions**:
    *   `createLog (thisItem: Item, currentSpace: Space): (locationLog: LocationLog)`
        *   **requires** thisItem and thisSpace exist and have the same owner; thisItem doesn't currently have a locationLog
        *   **effects** creates and returns LocationLog with thisItem Item, currentSpace Space, and locationHistory consisting of a sequence with one space (currentSpace)
    *   `placeItem (linkItem: Item, linkSpace: Space)`
        *   **requires**: linkItem and linkSpace exist
        *   **effects**: if linkItem has no LocationLog, creates log for linkItem with space linkSpace; otherwise updates current LocationLog for linkItem by adding linkSpace to the end of locationHistory of linkItem
    *   `deleteLog (currItem: Item)`
        *   **requires**: locationLog with currItem exists
        *   **effects**: removes locationLog