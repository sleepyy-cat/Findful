# concept: User
*   **concept**: User
*   **purpose**: To uniquely identify and authenticate individuals for secure access to the application.
*   **principle**: Each user registers with unique credentials (unique username and password) that authenticate their identity and authorize access to personal data and resources.
*   **state**:
    *   A set of `Users` with
        *   an `username` of type `String`
        *   a `password` of type `String`
*   **actions**:
    *   `registerUser (username: String, password: String): (user: User)`
        *   **requires**: username is not taken
        *   **effects**: creates and returns new User with username String and password String
    *   `authenticateUser (username: String, password: String)`
        *   **requires**: username exists, password matches username