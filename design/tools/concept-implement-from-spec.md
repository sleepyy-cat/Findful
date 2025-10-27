# Extracting from code

The following is an explanation of how concepts are specified, for the purposes of understanding how to implement them.

[@concept-specifications](../background/concept-specifications.md)

# prompt: 

Now, analyze the following Concept Implementation and generate the code implementation based on these instructions:

[@UserConcept](../concepts/User/specification.md)
# response:

To implement the `User` concept, we will create a TypeScript class called `UserConcept`. This class will manage the state for all users and provide methods for registration and authentication, adhering to the specified structure and pre/post conditions.

The `User` type itself will be represented by a `string` (a unique identifier for each user).

```typescript
/**
 * Represents the unique identifier for a User within the system.
 */
type UserId = string;

/**
 * Interface for the data associated with a user in the concept's state.
 */
interface UserData {
  username: string;
  // In a real application, passwords should always be securely hashed and salted,
  // not stored as plain strings. For this conceptual example, we follow the spec.
  password: string;
}

/**
 * Input arguments for the registerUser action.
 */
interface RegisterUserInput {
  username: string;
  password: string;
}

/**
 * Successful output for the registerUser action.
 */
interface RegisterUserSuccessOutput {
  user: UserId;
}

/**
 * Error output for the registerUser action.
 */
interface RegisterUserErrorOutput {
  error: string;
}

/**
 * Input arguments for the authenticateUser action.
 */
interface AuthenticateUserInput {
  username: string;
  password: string;
}

/**
 * Successful output for the authenticateUser action (empty dictionary as per specification).
 */
interface AuthenticateUserSuccessOutput {
  // Intentionally empty for successful authentication
}

/**
 * Error output for the authenticateUser action.
 */
interface AuthenticateUserErrorOutput {
  error: string;
}

/**
 * Implements the User concept as described in the specification.
 *
 * concept: User
 * purpose: To uniquely identify and authenticate individuals for secure access to the application.
 * principle: Each user registers with unique credentials (username and password) that authenticate their
 *            identity and authorize access to personal data and resources.
 */
class UserConcept {
  // State: A map from UserId to UserData
  private users: Map<UserId, UserData>;
  // State: A map from username to UserId for quick lookup and uniqueness checks
  private usernameToUserIdMap: Map<string, UserId>;
  // Internal counter for generating unique UserIds
  private nextUserId: number;

  constructor() {
    this.users = new Map<UserId, UserData>();
    this.usernameToUserIdMap = new Map<string, UserId>();
    this.nextUserId = 1;
  }

  /**
   * Action: registerUser
   *
   * @param input - Contains username and password.
   * @returns A UserId on success, or an error message if the username is taken.
   *
   * requires: username is not taken
   * effects: creates and returns new User with username String and password String
   */
  public registerUser(
    input: RegisterUserInput
  ): RegisterUserSuccessOutput | RegisterUserErrorOutput {
    const { username, password } = input;

    // Precondition check: username is not taken
    if (this.usernameToUserIdMap.has(username)) {
      return { error: `Username '${username}' is already taken.` };
    }

    // Effects: creates new User
    const newUserId: UserId = `user-${this.nextUserId++}`;
    this.users.set(newUserId, { username, password });
    this.usernameToUserIdMap.set(username, newUserId);

    // Effects: returns new User (id)
    return { user: newUserId };
  }

  /**
   * Action: authenticateUser
   *
   * @param input - Contains username and password.
   * @returns An empty object on success, or an error message if authentication fails.
   *
   * requires: username exists, password matches username
   * effects: (no explicit effects on state, implies successful check)
   */
  public authenticateUser(
    input: AuthenticateUserInput
  ): AuthenticateUserSuccessOutput | AuthenticateUserErrorOutput {
    const { username, password } = input;

    // Precondition check: username exists
    const userId = this.usernameToUserIdMap.get(username);
    if (!userId) {
      return { error: "Authentication failed: Invalid username or password." };
    }

    const userData = this.users.get(userId);
    // This check should ideally not be needed if maps are consistent, but good for robustness
    if (!userData) {
      return { error: "Internal error: User data not found for existing username." };
    }

    // Precondition check: password matches username
    if (userData.password !== password) {
      return { error: "Authentication failed: Invalid username or password." };
    }

    // Effects: successful authentication
    return {};
  }

  // --- Internal Helper (Not part of exposed actions/queries, but useful for testing/debugging) ---
  /**
   * (Internal) Retrieves user data by UserId.
   */
  public _getUserData(userId: UserId): UserData | undefined {
    return this.users.get(userId);
  }

  /**
   * (Internal) Retrieves UserId by username.
   */
  public _getUserIdByUsername(username: string): UserId | undefined {
    return this.usernameToUserIdMap.get(username);
  }
}

// --- Example Usage ---
async function main() {
  const userConcept = new UserConcept();

  console.log("--- Registering Users ---");
  const result1 = userConcept.registerUser({ username: "alice", password: "password123" });
  if ('error' in result1) {
    console.log(`Registration failed: ${result1.error}`);
  } else {
    console.log(`Registered Alice: ${JSON.stringify(result1)}`);
  }

  const result2 = userConcept.registerUser({ username: "bob", password: "securepassword" });
  if ('error' in result2) {
    console.log(`Registration failed: ${result2.error}`);
  } else {
    console.log(`Registered Bob: ${JSON.stringify(result2)}`);
  }

  const result3 = userConcept.registerUser({ username: "alice", password: "anotherpassword" }); // Should fail
  if ('error' in result3) {
    console.log(`Attempt to re-register Alice failed (expected): ${result3.error}`);
  } else {
    console.log(`Registered Alice (unexpected success): ${JSON.stringify(result3)}`);
  }

  console.log("\n--- Authenticating Users ---");
  console.log("Authenticating Alice (correct credentials):");
  const auth1 = userConcept.authenticateUser({ username: "alice", password: "password123" });
  if ('error' in auth1) {
    console.log(`Authentication failed: ${auth1.error}`);
  } else {
    console.log("Authentication successful for Alice!");
  }

  console.log("Authenticating Bob (incorrect password):");
  const auth2 = userConcept.authenticateUser({ username: "bob", password: "wrongpassword" });
  if ('error' in auth2) {
    console.log(`Authentication failed: ${auth2.error}`);
  } else {
    console.log("Authentication successful for Bob (unexpected)!");
  }

  console.log("Authenticating Charlie (non-existent user):");
  const auth3 = userConcept.authenticateUser({ username: "charlie", password: "anypassword" });
  if ('error' in auth3) {
    console.log(`Authentication failed: ${auth3.error}`);
  } else {
    console.log("Authentication successful for Charlie (unexpected)!");
  }

  console.log("Authenticating Bob (correct credentials):");
  const auth4 = userConcept.authenticateUser({ username: "bob", password: "securepassword" });
  if ('error' in auth4) {
    console.log(`Authentication failed: ${auth4.error}`);
  } else {
    console.log("Authentication successful for Bob!");
  }
}

main();
```