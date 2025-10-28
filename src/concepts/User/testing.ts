/**
 * User Test Cases
 *
 * Demonstrates all user actions
 */

import UserConcept from "./UserConcept.ts";

/**
 * Test case 1: Register unique user
 * Demonstrates successfully registering a user if the username is unique
 */
export function testValidRegister(): void {
  console.log("\n🧪 TEST CASE 1: Register unique user");
  console.log("==================================");

  const users_test = new UserConcept();

  // Register a user
  console.log("📝 Registering user...");
  const user = users_test.registerUser("hanna", "asdf123");
  if (user !== undefined) {
    // Check that user has been added successfully
    console.assert(
      users_test.getUsersString().includes(users_test.getUserName(user)),
    );
    console.log(
      "successfully registered user: " + users_test.getUserName(user),
    );
    return;
  }
}

/**
 * Test case 2: Register duplicate user
 * Demonstrates failing to register a user if the username is not unique
 */
export function testInvalidRegister(): void {
  console.log("\n🧪 TEST CASE 2: Register duplicate user");
  console.log("==================================");

  const users_test = new UserConcept();

  // Register a user
  console.log("📝 Registering user...");
  const first_user = users_test.registerUser("hanna", "asdf123");
  if (first_user !== undefined) {
    // Try to register another user with the same username
    console.log("Attempting to register duplicate user...");
    const second_user = users_test.registerUser("hanna", "asdf321");
    // Check that second user was not added
    console.assert(
      second_user === undefined,
      "duplicate user was incorrectly registered",
    );
    console.assert(users_test.getUsers().length == 1, "wrong number of users");
  }
  return;
}

/**
 * Test case 3: Authenticate user correctly
 * Demonstrates successfully authenticating a user if the username and password combination is valid
 */
export function testValidAuthentication(): void {
  console.log("\n🧪 TEST CASE 3: Authenticate user correctly");
  console.log("==================================");

  const users_test = new UserConcept();

  // Register a user
  const _ = users_test.registerUser("hanna", "asdf123");

  // Try to authenticate with correct username/password
  try {
    console.log("📝 Authenticating user...");
    users_test.authenticateUser("hanna", "asdf123");
  } catch (_error) {
    console.log("❌ authentication function incorrect");
  }
}

/**
 * Test case 4: Authenticate user incorrectly
 * Demonstrates failing to authenticate a user if the username and password combination is invalid
 */
export function testInvalidAuthentication(): void {
  console.log("\n🧪 TEST CASE 4: Authenticate user incorrectly");
  console.log("==================================");

  const users_test = new UserConcept();

  // Register a user
  const _ = users_test.registerUser("hanna", "asdf123");
  // Try to authenticate with incorrect username/password
  console.log("Attempting to authenticate with incorrect username/password");
  users_test.authenticateUser("hanna", "asdf321");
}

/**
 * Test case 5: Authenticate invalid user
 * Demonstrates failing to authenticate a user if the username doesn't exist
 */
export function testNonexistentUserAuthentication(): void {
  console.log("\n🧪 TEST CASE 5: Authenticate invalid user");
  console.log("==================================");

  const users_test = new UserConcept();

  // Register a user
  const _ = users_test.registerUser("hanna", "asdf123");

  // Try to authenticate with invalid user
  console.log("Attempting to authenticate with invalid user");
  users_test.authenticateUser("cat", "asdf321");
}

/**
 * Main function to run all test cases
 */
function main(): void {
  console.log("🎓 User Test Suite");
  console.log("========================\n");

  try {
    // Run register unique user test
    testValidRegister();

    // Run register duplicate user test
    testInvalidRegister();

    // Run authenticate user correctly test
    testValidAuthentication();

    // Run authenticate user incorrectly test
    testInvalidAuthentication();

    // Run authenticate invalid user test
    testNonexistentUserAuthentication();

    console.log("\n🎉 All test cases completed successfully!");
  } catch (error) {
    console.error("❌ Test error:", (error as Error).message);
  }
}

main();
