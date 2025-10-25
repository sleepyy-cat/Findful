---
timestamp: 'Fri Oct 24 2025 15:56:32 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251024_155632.40d309fa.md]]'
content_id: 81d529dec3a93249fabb6c2827b095cb9cb2f218751aa151acf0bfd142f3c646
---

# API Specification: User Concept

**Purpose:** To manage user registration and authentication within the system.

***

## API Endpoints

### POST /api/User/registerUser

**Description:** Registers a new user with a unique username and a password.

**Requirements:**

* No user with the given `username` already exists in the system.

**Effects:**

* **Success:** A new `User` object is created with the provided `username` and `password`, added to the system, and returned.
* **Error:** If a user with the given `username` already exists, an error message is returned.

**Request Body:**

```json
{
  "username": "string",
  "password": "string"
}
```

**Success Response Body (Action):**

```json
{
  "user": {
    "username": "string",
    "password": "string"
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

### POST /api/User/authenticateUser

**Description:** Authenticates a user based on their username and password.

**Requirements:**

* **Success:** A user with the given `username` must exist in the system, and the provided `password` must match the stored password for that user.
* **Error (Wrong Password):** A user with the given `username` must exist, but the provided `password` does not match its stored password.
* **Error (User Not Found):** No user with the given `username` exists in the system.

**Effects:**

* **Success:** The user is successfully authenticated.
* **Error (Wrong Password):** An error message indicating incorrect password is returned.
* **Error (User Not Found):** An error message indicating the user was not found is returned.

**Request Body:**

```json
{
  "username": "string",
  "password": "string"
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

### POST /api/User/\_getUserName

**Description:** Retrieves the username from a provided user object.

**Requirements:**

* The provided `user` object should be a valid `User` structure. (Note: This implementation does not verify if the user exists in the system; it directly extracts the username from the input object.)

**Effects:**

* Returns the `username` field from the provided `user` object.

**Request Body:**

```json
{
  "user": {
    "username": "string",
    "password": "string"
  }
}
```

**Success Response Body (Query):**

```json
[
  {
    "username": "string"
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

### POST /api/User/\_getUsers

**Description:** Retrieves a list of all registered user objects.

**Requirements:**

* `true` (This query can always be performed.)

**Effects:**

* Returns an array containing all `User` objects currently registered in the system.

**Request Body:**

```json
{}
```

**Success Response Body (Query):**

```json
[
  {
    "username": "string",
    "password": "string"
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

### POST /api/User/\_getUsersString

**Description:** Retrieves a list of all registered usernames.

**Requirements:**

* `true` (This query can always be performed.)

**Effects:**

* Returns an array containing the `username` (string) for each user currently registered in the system.

**Request Body:**

```json
{}
```

**Success Response Body (Query):**

```json
[
  {
    "username": "string"
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
