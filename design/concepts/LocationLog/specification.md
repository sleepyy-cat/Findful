# concept: LocationLog
*   **concept**: LocationLog [Item, Space]
*   **purpose**: To track the current and past locations of items within the spatial storage hierarchy.
*   **principle**: A user can create logs for items' physical journeys, which link an item to its current location and all of its past locations. The log corresponding to each item is updated each time the item is moved.
*   **state**:
    *   A set of `LocationLogs` with
        *   an `Item` of type `Item`
        *   a `currentSpace` of type `Space`
        *   a `locationHistory` of type `sequence of Spaces` (that Item has been in, in reverse chronological order)
*   **actions**:
    *   `placeItem (item: Item, space: Space)`
        *   **requires**: item and space exist
        *   **effects**: updates current LocationLog for item by adding space to the most recent end of locationHistory of item and setting current Space of item to space
    *   `deleteLog (locationLog: LocationLog)`
        *   **requires**: locationLog exists
        *   **effects**: removes locationLog