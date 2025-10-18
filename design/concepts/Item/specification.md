# concept: Item
*   **concept**: Item [User]
*   **purpose**: To create a comprehensive digital representation of users' individual belongings.
*   **principle**: Each user can create profiles for each of their owned items, with which they can store information about the item such as descriptions of the item and categorization of its use(s).
*   **state**:
    *   A set of `Items` with
        *   an `owner` of type `User`
        *   a `name` of type `String`
        *   a `description` of type `String` (optional)
        *   a `category` of type `String` (optional)
*   **actions**:
    *   `createItem (owner: User, name: String, description: String?, category: String?): (item: Item)`
        *   **requires**: owner exists, item name is unique among owner's items
        *   **effects**: creates and returns new Item belonging to owner with name String and optional description and/or category String
    *   `deleteItem (owner: User, item: Item)`
        *   **requires**: item exists and belongs to owner
        *   **effects**:: removes item
    *   `updateItemDetails(owner: User, item: Item, name: String?, description: String?, category: String?)`
        *   **requires**: item exists and belongs to owner; if item renamed, does not conflict with any of other of user's items
        *   **effects** updates item's name, description, and/or category