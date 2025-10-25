# API Specification: LocationLog Concept

**Purpose:** To track the current location and historical movement of specific items within various spaces.

---

## API Endpoints

### POST /api/LocationLog/createLog

**Description:** Creates a new location log for a given item in a specified space, initializing its location history.

**Requirements:**
- The `thisItem` object must have a `name` property.
- The `currentSpace` object must have a `name` property.
- `thisItem` and `currentSpace` must belong to the same owner (i.e., `thisItem.owner.username` must equal `currentSpace.owner.username`).
- A location log for the given `thisItem` (identified by its `name` and `owner.username`) must not already exist.

**Effects:**
- A new `LocationLog` object is created using the provided `thisItem` and `currentSpace`.
- The `locationHistory` of the new log is initialized with `currentSpace`.
- The newly created `LocationLog` is added to the collection of `locationLogs`.
- The created `LocationLog` is returned.

**Request Body:**
```json
{
  "thisItem": {
    "name": "string",
    "owner": {
      "username": "string"
    }
  },
  "currentSpace": {
    "name": "string",
    "owner": {
      "username": "string"
    }
  }
}
```

**Success Response Body (Action):**
```json
{
  "thisItem": {
    "name": "string",
    "owner": {
      "username": "string"
    }
  },
  "currentSpace": {
    "name": "string",
    "owner": {
      "username": "string"
    }
  },
  "locationHistory": [
    {
      "name": "string",
      "owner": {
        "username": "string"
      }
    }
  ]
}
```

**Error Response Body:**
```json
{
  "error": "string"
}
```

---

### POST /api/LocationLog/placeItem

**Description:** Places an item into a specified space, updating its current location and history, or creating a new log if one doesn't exist for the item.

**Requirements:**
- The `linkItem` object must have a `name` property.
- The `linkSpace` object must have a `name` property.

**Effects:**
- If a log for `linkItem` already exists and its `currentSpace` is `linkSpace`, no changes are made.
- If a log for `linkItem` already exists and its `currentSpace` is *not* `linkSpace`, then `linkSpace` is added to the log's `locationHistory` and the log's `currentSpace` is updated to `linkSpace`.
- If no log exists for `linkItem`, a new log is created for `linkItem` in `linkSpace` (delegating to `createLog` logic, including its preconditions).

**Request Body:**
```json
{
  "linkItem": {
    "name": "string",
    "owner": {
      "username": "string"
    }
  },
  "linkSpace": {
    "name": "string",
    "owner": {
      "username": "string"
    }
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

---

### POST /api/LocationLog/deleteLog

**Description:** Deletes the location log associated with a specific item.

**Requirements:**
- A location log must exist for the `currItem` (identified by its `name` and `owner.username`).

**Effects:**
- The location log corresponding to `currItem` is removed from the collection of `locationLogs`.

**Request Body:**
```json
{
  "currItem": {
    "name": "string",
    "owner": {
      "username": "string"
    }
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

---

### POST /api/LocationLog/_getItemLog

**Description:** Retrieves the location log for a specific item.

**Requirements:**
- The `item` object must have a `name` property and `owner.username` for lookup.

**Effects:**
- Returns the `LocationLog` object for the given `item` if found.
- Returns an empty array if no log is found for the `item`.

**Request Body:**
```json
{
  "item": {
    "name": "string",
    "owner": {
      "username": "string"
    }
  }
}
```

**Success Response Body (Query):**
```json
[
  {
    "thisItem": {
      "name": "string",
      "owner": {
        "username": "string"
      }
    },
    "currentSpace": {
      "name": "string",
      "owner": {
        "username": "string"
      }
    },
    "locationHistory": [
      {
        "name": "string",
        "owner": {
          "username": "string"
        }
      }
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

### POST /api/LocationLog/_getLogs

**Description:** Retrieves all existing location logs.

**Requirements:**
- None.

**Effects:**
- Returns an array containing all `LocationLog` objects currently stored.

**Request Body:**
```json
{}
```

**Success Response Body (Query):**
```json
[
  {
    "thisItem": {
      "name": "string",
      "owner": {
        "username": "string"
      }
    },
    "currentSpace": {
      "name": "string",
      "owner": {
        "username": "string"
      }
    },
    "locationHistory": [
      {
        "name": "string",
        "owner": {
          "username": "string"
        }
      }
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