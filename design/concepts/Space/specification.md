# concept: Space
*   **concept**: Space [User]
*   **purpose**: To represent a user's living space with support for a hierarchy of storage locations.
*   **principle**: A user can recreate their living space, defining a hierarchy of smaller spaces from rooms down to storage compartments. This structure allows items to be placed within this virtual space, mirroring their real-world locations. 
*   **state**:
    *   A set of `Spaces` with
        *   an `owner` of type `User`
        *   a `name` of type `String`
        *   a `spaceType` of type `String`
        *   a `parent` of type `Space`
        *   a `children` of type `set of Spaces` (optional)
*   **actions**:
    *   `createSpace (user: User, name: String, spaceType: String, parent: Space): (space: Space)`
        *   **requires**: user exists, name unique among parent's children
        *   **effects**: creates and returns new Space with owner User, name String, spaceType String, and parent Space
    *   `moveSpace (user: User, space: Space, newParent: Space)`
        *   **requires**: space and newParent exist; both belong to user
        *   **effects**: changes space's parent to newParent
    *   `renameSpace (user: User space: Space, name: String)`
        *   **requires**: space exists, space belongs to user, name unique among space's parent's children
        *   **effects**: changes space's name to name
    *   `deleteSpace (user: User, space: Space)`
        *   **requires**: space's children set is empty, space belongs to user
        *   **effects**: deletes space from corresponding user's spaces