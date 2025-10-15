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
        *   **requires**: user exists, name is unique to user
        *   **effects**: creates and returns new bundle with name String and owner user with no members
    *   `deleteBundle (user: User, bundle: Bundle)`
        *   **requires**: bundle exists, bundle belongs to user
        *   **effects**: removes bundle from user's bundles
    *   ``addItemToBundle (user: User, item: Item, bundle: Bundle)`
        *   **requires**: item and bundle exist, both belong to user
        *   **effects**: adds item to bundle
    *   ``removeItemFromBundle(user: User, item: Item, bundle: Bundle)`
        *   **requires**: item is in bundle's members, both item and bundle belong to user
        *   **effects**: removes item from bundle