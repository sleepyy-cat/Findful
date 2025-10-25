---
timestamp: 'Fri Oct 24 2025 23:30:58 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251024_233058.a11bae3a.md]]'
content_id: a9328d357ae66e59f2cb3338b10bd7664a4be85df5f026e95b908d53c81b9c41
---

# API Specification: Space Concept

**Purpose:** organize user-owned entities hierarchically, providing a structure for managing nested resources or content.

***

## API Endpoints

### POST /api/Space/createSpace

**Description:** Creates a new space, optionally within an existing parent space, ensuring its name is unique among its siblings or root spaces for the owner.

**Requirements:**

* `owner` must exist (external ID).
* If `parent` is not null, `parent` must exist and belong to `owner`.
* The combination of `owner`, `parent`, and `name` must be unique (i.e., no sibling space with the same name, or no root space for the same owner with the same name).

**Effects:**

* A new `Space` is created with a fresh `ID`.
* Its `owner`, `name`, `spaceType`, and `parent` are set according to the inputs.
* If `parent` is not null, the new space is added to the parent's children.
* The `ID` of the newly created space is returned.

**Request Body:**

```json
{
  "owner": "ID",
  "name": "string",
  "spaceType": "string",
  "parent": "ID | null"
}
```

**Success Response Body (Action):**

```json
{
  "space": "ID"
}
```

**Error Response Body:**

```json
{
  "error": "string"
}
```

***

### POST /api/Space/moveSpace

**Description:** Moves an existing space to a new parent space, updating its hierarchical position.

**Requirements:**

* `space` and `newParent` must exist (IDs).
* `space` and `newParent` must belong to the same `owner`.
* `space` cannot be an ancestor of `newParent`.
* `space`'s name must be unique among `newParent`'s existing children.

**Effects:**

* The `parent` of `space` is updated to `newParent`.
* `space` is removed from its old parent's children (if it had a parent) and added to `newParent`'s children.

**Request Body:**

```json
{
  "owner": "ID",
  "space": "ID",
  "newParent": "ID"
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

### POST /api/Space/renameSpace

**Description:** Renames an existing space.

**Requirements:**

* `space` must exist (ID).
* `space` must belong to `owner`.
* `newName` must be unique among `space`'s siblings (or root spaces for that owner if `space` is a root).

**Effects:**

* The `name` of `space` is updated to `newName`.

**Request Body:**

```json
{
  "owner": "ID",
  "space": "ID",
  "newName": "string"
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

### POST /api/Space/deleteSpace

**Description:** Deletes an existing space.

**Requirements:**

* `space` must exist (ID).
* `space` must belong to `owner`.
* `space` must have no children.

**Effects:**

* `space` is removed from the set of all spaces.
* `space` is removed from its parent's children (if it had a parent).

**Request Body:**

```json
{
  "owner": "ID",
  "space": "ID"
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

### POST /api/Space/\_getSpaceOwner

**Description:** Retrieves the owner of a specific space.

**Requirements:**

* `space` must exist (ID).

**Effects:**

* Returns the `ID` of the `User` who owns the `space`.

**Request Body:**

```json
{
  "space": "ID"
}
```

**Success Response Body (Query):**

```json
[
  {
    "owner": "ID"
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

### POST /api/Space/\_getSpaceName

**Description:** Retrieves the name of a specific space.

**Requirements:**

* `space` must exist (ID).

**Effects:**

* Returns the `name` of the `space`.

**Request Body:**

```json
{
  "space": "ID"
}
```

**Success Response Body (Query):**

```json
[
  {
    "name": "string"
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

### POST /api/Space/\_getSpaceType

**Description:** Retrieves the type of a specific space.

**Requirements:**

* `space` must exist (ID).

**Effects:**

* Returns the `spaceType` of the `space`.

**Request Body:**

```json
{
  "space": "ID"
}
```

**Success Response Body (Query):**

```json
[
  {
    "spaceType": "string"
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

### POST /api/Space/\_getSpaceParent

**Description:** Retrieves the parent space of a specific space.

**Requirements:**

* `space` must exist (ID).

**Effects:**

* Returns the `ID` of the `space`'s parent, or `null` if it's a root space.

**Request Body:**

```json
{
  "space": "ID"
}
```

**Success Response Body (Query):**

```json
[
  {
    "parent": "ID | null"
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

### POST /api/Space/\_getSpaceChildren

**Description:** Retrieves the direct children (by ID) of a specific space.

**Requirements:**

* `space` must exist (ID).

**Effects:**

* Returns a set of `ID`s representing the direct children of the `space`.

**Request Body:**

```json
{
  "space": "ID"
}
```

**Success Response Body (Query):**

```json
[
  {
    "child": "ID"
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

### POST /api/Space/\_getSpaceChildrenString

**Description:** Retrieves the names of the direct children of a specific space.

**Requirements:**

* `space` must exist (ID).

**Effects:**

* Returns a set of `string` names representing the direct children of the `space`.

**Request Body:**

```json
{
  "space": "ID"
}
```

**Success Response Body (Query):**

```json
[
  {
    "childName": "string"
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

### POST /api/Space/\_getSpaces

**Description:** Retrieves all spaces managed by the concept, including their properties.

**Requirements:**

* `true`

**Effects:**

* Returns a set of all `Spaces` with their `ID`, `owner` (ID), `name`, `spaceType`, and `parent` (ID or null).

**Request Body:**

```json
{}
```

**Success Response Body (Query):**

```json
[
  {
    "id": "ID",
    "owner": "ID",
    "name": "string",
    "spaceType": "string",
    "parent": "ID | null"
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

### POST /api/Space/\_getSpacesString

**Description:** Retrieves the names of all spaces managed by the concept.

**Requirements:**

* `true`

**Effects:**

* Returns a set of `string` names of all `Spaces`.

**Request Body:**

```json
{}
```

**Success Response Body (Query):**

```json
[
  {
    "spaceName": "string"
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
