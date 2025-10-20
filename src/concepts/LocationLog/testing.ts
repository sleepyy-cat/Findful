/**
 * LocationLog Test Cases
 *
 * Demonstrates all locationLog actions
 */

import { Users } from "@concepts/User/implementation.ts";
import { Items } from "../Item/implementation.ts";
import { Spaces } from "@concepts/Space/implementation.ts";
import { LocationLogs } from "@concepts/LocationLog/implementation.ts";

/**
 * Test case 1: Create unique locationLog
 * Demonstrates successfully creating a locationLog if the item doesn't already have a log
 */
export function testCreateUniqueLog(): void {
  console.log("\n🧪 TEST CASE 1: Create unique locationLog");
  console.log("==================================");

  const users = new Users();
  const items_test = new Items();
  const spaces_test = new Spaces();
  const logs_test = new LocationLogs();
  // Register a user
  const user1 = users.registerUser("hanna", "asdf123");
  // Create an item and a space
  if (user1) {
    const item = items_test.createItem(
      user1,
      "cat sweater",
      "grey with white cat",
      "clothes",
    );
    const space = spaces_test.createSpace(user1, "dresser", "cabinet", null);
    if (item && space) {
      // Create locationLog
      console.log("📝 Adding log...");
      const log = logs_test.createLog(
        item,
        space,
      );
      if (log !== undefined) {
        console.assert(
          logs_test.getLogs().includes(log),
        );
        console.log(
          "successfully created log for item: " + items_test.getItemName(item) +
            " with space: " + spaces_test.getSpaceName(space),
        );
      }
    }
  }
}

/**
 * Test case 2: Create duplicate locationLog
 * Demonstrates failing to create a locationLog if the item already has a log
 */
export function testCreateDuplicateLog(): void {
  console.log("\n🧪 TEST CASE 2: Create duplicate locationLog");
  console.log("==================================");

  const users = new Users();
  const items_test = new Items();
  const spaces_test = new Spaces();
  const logs_test = new LocationLogs();
  // Register a user
  const user1 = users.registerUser("hanna", "asdf123");
  // Create an item and two spaces
  if (user1) {
    const item = items_test.createItem(
      user1,
      "cat sweater",
      "grey with white cat",
      "clothes",
    );
    const space1 = spaces_test.createSpace(user1, "dresser", "cabinet", null);
    const space2 = spaces_test.createSpace(user1, "closet", "cabinet", null);
    if (item && space1 && space2) {
      // Create locationLog
      console.log("📝 Adding log...");
      const log1 = logs_test.createLog(
        item,
        space1,
      );
      // Try to create another log for the same item
      console.log("Attempting to create duplicate log...");
      const log2 = logs_test.createLog(
        item,
        space2,
      );
      if (log1 && log2) {
        const log = logs_test.getItemLog(item);
        if (log) {
          console.assert(
            log.currentSpace.name == space1.name,
            "duplicate log was incorrectly created",
          );
          console.assert(
            log.locationHistory.length == 1,
            "log was incorrectly updated",
          );
        }
      }
    }
  }
}

/**
 * Test case 3: Create no perms locationLog
 * Demonstrates failing to delete another user's item
 */
export function testCreateNoPermsLog(): void {
  console.log("\n🧪 TEST CASE 3: Create no perms locationLog");
  console.log("==================================");

  const users = new Users();
  const items_test = new Items();
  const spaces_test = new Spaces();
  const logs_test = new LocationLogs();
  // Register two users
  const user1 = users.registerUser("hanna", "asdf123");
  const user2 = users.registerUser("cat", "asdf321");
  // Create an item and space belonging to different users
  if (user1 && user2) {
    const item = items_test.createItem(
      user1,
      "cat sweater",
      "grey with white cat",
      "clothes",
    );
    const space = spaces_test.createSpace(user2, "dresser", "cabinet", null);
    if (item && space) {
      // Try to create a locationLog for the item and space
      console.log("Attempting to create invalid log...");
      const _ = logs_test.createLog(
        item,
        space,
      );
      console.assert(logs_test.getLogs.length == 0, "created invalid log");
    }
  }
}

/**
 * Test case 4: Place item, no existing log
 * Demonstrates successfully placing an item that doesn't have a log
 */
export function testPlaceItemNoLog(): void {
  console.log("\n🧪 TEST CASE 4: Place item, no existing log");
  console.log("==================================");

  const users = new Users();
  const items_test = new Items();
  const spaces_test = new Spaces();
  const logs_test = new LocationLogs();
  // Register a user
  const user1 = users.registerUser("hanna", "asdf123");
  // Create an item and space
  if (user1) {
    const item = items_test.createItem(
      user1,
      "cat sweater",
      "grey with white cat",
      "clothes",
    );
    const space = spaces_test.createSpace(user1, "dresser", "cabinet", null);
    if (item && space) {
      // Place item in space
      console.log("📝 Placing item...");
      logs_test.placeItem(item, space);
      const log = logs_test.getItemLog(item);
      console.assert(log !== undefined, "log was not created");
      if (log) {
        console.assert(
          log.thisItem.name == item.name &&
            log.currentSpace.name == space.name,
          "log was incorrectly created",
        );
        console.log(
          "successfully placed item: " + items_test.getItemName(item) +
            " in space: " + spaces_test.getSpaceName(space),
        );
      }
    }
  }
}

/**
 * Test case 5: Place item, same as current location
 * Demonstrates successfully placing an item in its current location
 */
export function testPlaceItemCurrentLocation(): void {
  console.log(
    "\n🧪 TEST CASE 5: place item, same as current location",
  );
  console.log("==================================");

  const users = new Users();
  const items_test = new Items();
  const spaces_test = new Spaces();
  const logs_test = new LocationLogs();
  // Register a user
  const user1 = users.registerUser("hanna", "asdf123");
  // Create an item and a space
  if (user1) {
    const item = items_test.createItem(
      user1,
      "cat sweater",
      "grey with white cat",
      "clothes",
    );
    const space = spaces_test.createSpace(user1, "dresser", "cabinet", null);
    if (item && space) {
      // Create locationLog
      console.log("📝 Adding log...");
      const log1 = logs_test.createLog(
        item,
        space,
      );
      // Place item in space
      console.log("📝 Placing item...");
      logs_test.placeItem(item, space);
      const log2 = logs_test.getItemLog(item);
      if (log1 && log2) {
        console.assert(
          logs_test.equals(log1, log2),
          "log was incorrectly modified",
        );
        console.log("log was unchanged");
        console.log(
          "successfully placed item: " + items_test.getItemName(item) +
            " in space: " + spaces_test.getSpaceName(space),
        );
      }
    }
  }
}

/**
 * Test case 6: Place item, different from current location
 * Demonstrates successfully placing an item in a different current location
 */
export function testPlaceItemDifferentLocation(): void {
  console.log("\n🧪 TEST CASE 6: Place item, different from current location");
  console.log("==================================");

  const users = new Users();
  const items_test = new Items();
  const spaces_test = new Spaces();
  const logs_test = new LocationLogs();
  // Register a user
  const user1 = users.registerUser("hanna", "asdf123");
  // Create an item and two spaces
  if (user1) {
    const item = items_test.createItem(
      user1,
      "cat sweater",
      "grey with white cat",
      "clothes",
    );
    const space1 = spaces_test.createSpace(user1, "dresser", "cabinet", null);
    const space2 = spaces_test.createSpace(user1, "closet", "cabinet", null);
    if (item && space1 && space2) {
      // Create locationLog for item and first space
      console.log("📝 Adding log...");
      const log1 = logs_test.createLog(
        item,
        space1,
      );
      // Place item in second space
      console.log("📝 Placing item...");
      logs_test.placeItem(item, space2);
      const log2 = logs_test.getItemLog(item);
      if (log1 && log2) {
        console.assert(
          log2.thisItem.name == item.name &&
            log2.currentSpace.name == space2.name,
          "log was incorrectly created",
        );
        console.log(
          "successfully moved item: " + items_test.getItemName(item) +
            " to space: " + spaces_test.getSpaceName(space2),
        );
      }
    }
  }
}

/**
 * Test case 7: Delete existing locationLog
 * Demonstrates successfully deleting an existing log
 */
export function testValidDeleteLog(): void {
  console.log("\n🧪 TEST CASE 7: Delete existing LocationLog");
  console.log("==================================");

  const users = new Users();
  const items_test = new Items();
  const spaces_test = new Spaces();
  const logs_test = new LocationLogs();
  // Register a user
  const user1 = users.registerUser("hanna", "asdf123");
  // Create an item and a space
  if (user1) {
    const item = items_test.createItem(
      user1,
      "cat sweater",
      "grey with white cat",
      "clothes",
    );
    const space = spaces_test.createSpace(user1, "dresser", "cabinet", null);
    if (item && space) {
      // Create locationLog
      const _ = logs_test.createLog(
        item,
        space,
      );
      console.log("📝 Deleting log...");
      logs_test.deleteLog(item);
      const logs = logs_test.getLogs();
      if (logs) {
        console.assert(logs.length == 0, "did not delete log properly");
        console.log(
          "successfully deleted log for: " + items_test.getItemName(item),
        );
      }
    }
  }
}

/**
 * Test case 8: Delete nonexistent locationLog
 * Demonstrates failing to delete a locationLog if it doesn't exist
 */
export function testInvalidDeleteNonexistentLog(): void {
  console.log(
    "\n🧪 TEST CASE 8: Delete nonexistent locationLog",
  );
  console.log("==================================");

  const users = new Users();
  const items_test = new Items();
  const spaces_test = new Spaces();
  const logs_test = new LocationLogs();
  // Register a user
  const user1 = users.registerUser("hanna", "asdf123");
  // Create two items and a space
  if (user1) {
    const item1 = items_test.createItem(
      user1,
      "cat sweater",
      "grey with white cat",
      "clothes",
    );
    const item2 = items_test.createItem(
      user1,
      "dog sweater",
      "black with brown dog",
      "clothes",
    );
    const space = spaces_test.createSpace(user1, "dresser", "cabinet", null);
    if (item1 && space) {
      const _ = logs_test.createLog(
        item1,
        space,
      );
      // Try to delete a nonexistent locationLog
      console.log("Attempting to delete nonexistent locationLog...");
      if (item1 && item2 && space) {
        logs_test.deleteLog(item2);
        const logs = logs_test.getLogs();
        if (logs) {
          console.assert(logs.length == 1, "deleted wrong item");
        }
      }
    }
  }
}

/**
 * Main function to run all test cases
 */
function main(): void {
  console.log("🎓 LocationLog Test Suite");
  console.log("========================\n");

  try {
    // Run create unique locationLog test
    testCreateUniqueLog();

    // Run create duplicate locationLog test
    testCreateDuplicateLog();

    // Run create no perms locationLog test
    testCreateNoPermsLog();

    // Run place item, no existing log test
    testPlaceItemNoLog();

    // Run place item, same as current location test
    testPlaceItemCurrentLocation();

    // Run place item, different from current location test
    testPlaceItemDifferentLocation();

    // Run delete existing locationLog test
    testValidDeleteLog();

    // Run delete nonexistent locationLog test
    testInvalidDeleteNonexistentLog();

    console.log("\n🎉 All test cases completed successfully!");
  } catch (error) {
    console.error("❌ Test error:", (error as Error).message);
  }
}

main();
