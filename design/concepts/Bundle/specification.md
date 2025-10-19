# concept: Bundle
*   **concept**: Bundle [User, Item]
*   **purpose**: To create and track logical groups of items based on shared usage contexts or activities, independent of their physical locations.
*   **principle**: A user can organize items into purpose-based bundles that function as checklists for specific activities and occasions, independent of physical storage locations.
*   **state**:
    *   A set of `Bundles` with
        *   an `owner` of type `User`
        *   a `name` of type `String`
        *   a `members` of type `set of Items`
*   **actions**:
    *   `createBundle (user: User, name: String): (bundle: Bundle)`
        *   **requires**: user exists, name is unique among user's bundles
        *   **effects**: creates and returns new bundle with name String and owner User with no members
    *   `deleteBundle (user: User, name: String)`
        *   **requires**: bundle with name exists that belongs to user
        *   **effects**: removes bundle with name from user's bundles
    *   `addItemToBundle (user: User, item: Item, bundle: Bundle)`
        *   **requires**: item and bundle exist, both belong to user; item isn't currently in bundle
        *   **effects**: adds item to bundle
    *   `removeItemFromBundle(user: User, item: Item, bundle: Bundle)`
        *   **requires**: item and bundle exist, both item and bundle belong to user, and item is in bundle's members
        *   **effects**: removes item from bundle