---
timestamp: 'Fri Oct 24 2025 23:37:10 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251024_233710.32b7bccb.md]]'
content_id: 0a3517a9b566f13d45890c5083bc35461f3564bb600324b1972b4b752efdab9f
---

# API Specification: Item Concept

**Purpose:** Manage a collection of user-owned items with details, supporting creation, deletion, updates, and various retrieval methods.

***

## API Endpoints

### POST /api/Item/createItem

**Description:** Creates a new item for a specified owner with a given name, description, and category.

**Requirements:**

* No item with the same name already exists for the given owner.

**Effects:**

* A new item is created and added to the collection with the provided owner, name, description, and category.
* The newly created item is returned.

**Request Body:**

```json
{
  "owner": {
    "username": "string"
  },
  "name": "string",
  "description": "string",
  "category": "string"
}
```

**Success Response Body (Action):**

```json
{
  "item": {
    "owner": {
      "username": "string"
    },
    "name": "string",
    "description": "string",
    "category": "string"
  }
}
```

**Error Response Body:**

```json
{
  "error": "string"
}
```

***

### POST /api/Item/deleteItem

**Description:** Deletes a specific item from the collection, ensuring it belongs to the specified owner.

**Requirements:**

* The item must exist in the collection.
* The item must belong to the specified owner.

**Effects:**

* The specified item is removed from the collection.

**Request Body:**

```json
{
  "owner": {
    "username": "string"
  },
  "item": {
    "owner": {
      "username": "string"
    },
    "name": "string",
    "description": "string",
    "category": "string"
  }
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

***

### POST /api/Item/updateItemDetails

**Description:** Updates the name, description, and/or category of an existing item, ensuring it belongs to the specified owner and that any new name is unique.

**Requirements:**

* The item must exist in the collection.
* The item must belong to the specified owner.
* If a new `name` is provided, no other item belonging to the same owner should have that `name`.

**Effects:**

* The specified item's `name`, `description`, and `category` are updated with the provided values if they are valid.

**Request Body:**

```json
{
  "owner": {
    "username": "string"
  },
  "item": {
    "owner": {
      "username": "string"
    },
    "name": "string",
    "description": "string",
    "category": "string"
  },
  "name": "string",
  "description": "string",
  "category": "string"
}
```

*Note: `name`, `description`, and `category` fields are optional in the request body; only provided fields will be updated.*

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

***

### POST /api/Item/\_getItemOwner

**Description:** Retrieves the username of the owner of a specified item.

**Requirements:**

* The item must exist in the collection.

**Effects:**

* Returns the username of the item's owner.

**Request Body:**

```json
{
  "item": {
    "owner": {
      "username": "string"
    },
    "name": "string",
    "description": "string",
    "category": "string"
  }
}
```

**Success Response Body (Query):**

```json
[
  {
    "ownerUsername": "string"
  }
]
```

**Error Response Body:**

```json
{
  "error": "string"
}
```

***

### POST /api/Item/\_getItemName

**Description:** Retrieves the name of a specified item.

**Requirements:**

* The item must exist in the collection.

**Effects:**

* Returns the name of the item.

**Request Body:**

```json
{
  "item": {
    "owner": {
      "username": "string"
    },
    "name": "string",
    "description": "string",
    "category": "string"
  }
}
```

**Success Response Body (Query):**

```json
[
  {
    "itemName": "string"
  }
]
```

**Error Response Body:**

```json
{
  "error": "string"
}
```

***

### POST /api/Item/\_getItemDescription

**Description:** Retrieves the description of a specified item.

**Requirements:**

* The item must exist in the collection.

**Effects:**

* Returns the description of the item.

**Request Body:**

```json
{
  "item": {
    "owner": {
      "username": "string"
    },
    "name": "string",
    "description": "string",
    "category": "string"
  }
}
```

**Success Response Body (Query):**

```json
[
  {
    "itemDescription": "string"
  }
]
```

**Error Response Body:**

```json
{
  "error": "string"
}
```

***

### POST /api/Item/\_getItemCategory

**Description:** Retrieves the category of a specified item.

**Requirements:**

* The item must exist in the collection.

**Effects:**

* Returns the category of the item.

**Request Body:**

```json
{
  "item": {
    "owner": {
      "username": "string"
    },
    "name": "string",
    "description": "string",
    "category": "string"
  }
}
```

**Success Response Body (Query):**

```json
[
  {
    "itemCategory": "string"
  }
]
```

**Error Response Body:**

```json
{
  "error": "string"
}
```

***

### POST /api/Item/\_getItems

**Description:** Retrieves a list of all items currently in the collection.

**Requirements:**

* None.

**Effects:**

* Returns an array of all items.

**Request Body:**

```json
{}
```

**Success Response Body (Query):**

```json
[
  {
    "owner": {
      "username": "string"
    },
    "name": "string",
    "description": "string",
    "category": "string"
  }
]
```

**Error Response Body:**

```json
{
  "error": "string"
}
```

***

### POST /api/Item/\_getItemsString

**Description:** Retrieves a list of names for all items in the collection.

**Requirements:**

* None.

**Effects:**

* Returns an array containing the names of all items.

**Request Body:**

```json
{}
```

**Success Response Body (Query):**

```json
[
  {
    "itemName": "string"
  }
]
```

**Error Response Body:**

```json
{
  "error": "string"
}
```

***

### POST /api/Item/\_getItemsByUser

**Description:** Retrieves all items owned by a specified user.

**Requirements:**

* The user must exist.

**Effects:**

* Returns an array of items owned by the specified user.

**Request Body:**

```json
{
  "user": {
    "username": "string"
  }
}
```

**Success Response Body (Query):**

```json
[
  {
    "owner": {
      "username": "string"
    },
    "name": "string",
    "description": "string",
    "category": "string"
  }
]
```

**Error Response Body:**

```json
{
  "error": "string"
}
```
