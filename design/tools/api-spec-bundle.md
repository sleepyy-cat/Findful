# API Specification: Bundle Concept

**Purpose:** To allow users to create and manage collections (bundles) of items they own, facilitating organization and grouping of digital assets.

---

## API Endpoints

### POST /api/Bundle/createBundle

**Description:** Creates a new bundle for a specified user with a given name.

**Requirements:**
- The provided `user` (identified by its ID) must exist.
- A bundle with the given `name` must not already exist for that `user`.

**Effects:**
- A new bundle is created with the specified `owner` (user ID) and `name`.
- The new bundle's `members` list is initialized as empty.
- The newly created bundle object is returned.

**Request Body:**
```json
{
  "user": "string",
  "name": "string"
}
```

**Success Response Body (Action):**
```json
{
  "bundle": {
    "owner": "string",
    "name": "string",
    "members": [
      "string"
    ]
  }
}
```

**Error Response Body:**
```json
{
  "error": "string"
}
```

---

### POST /api/Bundle/deleteBundle

**Description:** Deletes an existing bundle identified by its name, belonging to a specific user.

**Requirements:**
- A bundle with the given `name` must exist within the concept's state.
- The identified bundle must belong to the specified `user` (identified by its ID).

**Effects:**
- The specified bundle is removed from the collection of bundles.

**Request Body:**
```json
{
  "user": "string",
  "name": "string"
}
```

**Success Response Body (Action):**
```json
{}
```

**Error Response Body:**
```json
{
  "error": "string"
}
```

---

### POST /api/Bundle/addItemToBundle

**Description:** Adds an item to an existing bundle, provided both belong to the specified user.

**Requirements:**
- The `item` (identified by its ID) must exist.
- The `bundle` (identified by `bundleName`) must exist.
- Both the `item` and the `bundle` must belong to the specified `user` (identified by its ID).
- The `item` must not already be a member of the `bundle`.

**Effects:**
- The `item` (identified by its ID) is added to the `members` list of the specified `bundle`.

**Request Body:**
```json
{
  "user": "string",
  "item": "string",
  "bundleName": "string"
}
```

**Success Response Body (Action):**
```json
{}
```

**Error Response Body:**
```json
{
  "error": "string"
}
```

---

### POST /api/Bundle/removeItemFromBundle

**Description:** Removes an item from an existing bundle, provided both belong to the specified user.

**Requirements:**
- The `item` (identified by its ID) must exist.
- The `bundle` (identified by `bundleName`) must exist.
- Both the `item` and the `bundle` must belong to the specified `user` (identified by its ID).
- The `item` must be an existing member of the `bundle`.

**Effects:**
- The `item` (identified by its ID) is removed from the `members` list of the specified `bundle`.

**Request Body:**
```json
{
  "user": "string",
  "item": "string",
  "bundleName": "string"
}
```

**Success Response Body (Action):**
```json
{}
```

**Error Response Body:**
```json
{
  "error": "string"
}
```

---

### POST /api/Bundle/getBundles

**Description:** Retrieves a list of all bundles currently managed by the concept.

**Requirements:**
- true (This action is always allowed.)

**Effects:**
- Returns a list containing all bundles managed by the concept.

**Request Body:**
```json
{}
```

**Success Response Body (Query):**
```json
[
  {
    "owner": "string",
    "name": "string",
    "members": [
      "string"
    ]
  }
]
```

**Error Response Body:**
```json
{
  "error": "string"
}
```

---