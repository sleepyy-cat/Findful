/**
 * Item Test Cases
 *
 * Demonstrates all item actions
 */

import UserConcept from "../User/UserConcept.ts";
import { Item } from "./ItemConcept.ts";
import ItemConcept from "./ItemConcept.ts";

/**
 * Test case 1: Create unique item
 * Demonstrates successfully creating an item if the name is unique
 */
export function testCreateUniqueItem(): void {
  console.log("\n🧪 TEST CASE 1: Create unique item");
  console.log("==================================");

  const users = new UserConcept();
  const items_test = new ItemConcept();
  // Register a user
  const user1 = users.registerUser("hanna", "asdf123");
  // Create an item
  console.log("📝 Adding item...");
  if (user1) {
    const item = items_test.createItem(
      user1,
      "cat sweater",
      "grey with white cat",
      "clothes",
    );
    if (item !== undefined) {
      console.assert(
        items_test.getItems().includes(item),
      );
      console.log(
        "successfully created item: " + items_test.getItemName(item),
      );
    }
  }
}

/**
 * Test case 2: Create duplicate item
 * Demonstrates failing to create an item if the user already has an item with that name
 */
export function testCreateDuplicateItem(): void {
  console.log("\n🧪 TEST CASE 2: Create duplicate item");
  console.log("==================================");

  const users = new UserConcept();
  const items_test = new ItemConcept();
  // Register a user
  const user1 = users.registerUser("hanna", "asdf123");
  // Create an item
  console.log("📝 Adding item...");
  if (user1) {
    const item1 = items_test.createItem(
      user1,
      "cat sweater",
      "grey with white cat",
      "clothes",
    );
    // Try to create another item with the same name
    console.log("Attempting to create duplicate item...");
    const item2 = items_test.createItem(
      user1,
      "cat sweater",
      "grey with white cat",
      "winter clothes",
    );
    if (item1 && item2) {
      const items = items_test.getItemsByUser(user1);
      if (items) {
        console.assert(
          items.length == 1,
          "duplicate item was incorrectly created",
        );
      }
    }
  }
}

/**
 * Test case 3: Delete existing item
 * Demonstrates successfully deleting an existing item
 */
export function testValidDeleteItem(): void {
  console.log("\n🧪 TEST CASE 3: Delete existing item");
  console.log("==================================");

  const users = new UserConcept();
  const items_test = new ItemConcept();
  // Register a user
  const user1 = users.registerUser("hanna", "asdf123");
  // Create an item
  console.log("📝 Adding item...");
  if (user1) {
    const item = items_test.createItem(
      user1,
      "cat sweater",
      "grey with white cat",
      "clothes",
    );
    if (item) {
      console.log("📝 Deleting item...");
      items_test.deleteItem(user1, item);
      const items = items_test.getItemsByUser(user1);
      if (items) {
        console.assert(items.length == 0, "did not delete item properly");
        console.log(
          "successfully deleted item: " + items_test.getItemName(item),
        );
      }
    }
  }
}

/**
 * Test case 4: Delete nonexistent item
 * Demonstrates failing to delete an item if it doesn't exist
 */
export function testInvalidDeleteNonexistentItem(): void {
  console.log(
    "\n🧪 TEST CASE 4: Delete nonexistent item",
  );
  console.log("==================================");

  const users = new UserConcept();
  const items_test = new ItemConcept();
  // Register a user
  const user1 = users.registerUser("hanna", "asdf123");
  // Create an item
  if (user1) {
    const item = items_test.createItem(
      user1,
      "cat sweater",
      "grey with white cat",
      "clothes",
    );
    // Try to delete a nonexistent item
    console.log("Attempting to delete nonexistent item...");
    const delItem: Item = {
      owner: user1,
      name: "cat sweater",
      description: "grey with white cat",
      category: "clothes",
    };
    if (item) {
      items_test.deleteItem(user1, delItem);
      const items = items_test.getItemsByUser(user1);
      if (items) {
        console.assert(items.length == 1, "deleted wrong item");
      }
    }
  }
}

/**
 * Test case 5: Delete no perms item
 * Demonstrates failing to delete another user's item
 */
export function testInvalidDeleteOtherUsersItem(): void {
  console.log("\n🧪 TEST CASE 5: Delete no perms item");
  console.log("==================================");

  const users = new UserConcept();
  const items_test = new ItemConcept();
  // Register two users
  const user1 = users.registerUser("hanna", "asdf123");
  const user2 = users.registerUser("cat", "asdf321");
  // Create an item
  console.log("📝 Adding item...");
  if (user1 && user2) {
    const item = items_test.createItem(
      user1,
      "cat sweater",
      "grey with white cat",
      "clothes",
    );
    if (item) {
      // Try to delete another user's item
      console.log("Attempting to delete another user's item...");
      items_test.deleteItem(user2, item);
      const items = items_test.getItemsByUser(user1);
      if (items) {
        console.assert(items.length == 1, "user shouldn't have delete perms");
      }
    }
  }
}

/**
 * Test case 6: Update unique item
 * Demonstrates successfully updating an item
 */
export function testValidUpdateItem(): void {
  console.log("\n🧪 TEST CASE 6: Update unique item");
  console.log("==================================");

  const users = new UserConcept();
  const items_test = new ItemConcept();
  // Register a user
  const user1 = users.registerUser("hanna", "asdf123");
  // Create an item
  console.log("📝 Adding item...");
  if (user1) {
    const item = items_test.createItem(
      user1,
      "cat sweater",
      "grey with white cat",
      "clothes",
    );
    if (item) {
      console.log("📝 Updating item...");
      items_test.updateItemDetails(
        user1,
        item,
        "kitty sweater",
        "gray, white cat",
        "winter clothes",
      );
      console.assert(
        items_test.getItemOwner(item) == user1.username,
        "user mistakenly changed while updating",
      );
      console.assert(
        items_test.getItemName(item) == "kitty sweater",
        "item name updated incorrectly",
      );
      console.assert(
        items_test.getItemDescription(item) == "gray, white cat",
        "item description updated incorrectly",
      );
      console.assert(
        items_test.getItemCategory(item) == "winter clothes",
        "item category updated incorrectly",
      );
      console.log(
        "successfully updated item to: " + items_test.getItemName(item),
      );
    }
  }
}

/**
 * Test case 7: Update duplicate item
 * Demonstrates failing to update an item if the new name is a duplicate
 */
export function testInvalidUpdateItem(): void {
  console.log(
    "\n🧪 TEST CASE 7: Update duplicate item",
  );
  console.log("==================================");

  const users = new UserConcept();
  const items_test = new ItemConcept();
  // Register a user
  const user1 = users.registerUser("hanna", "asdf123");
  // Create two items
  console.log("📝 Adding items...");
  if (user1) {
    const item1 = items_test.createItem(
      user1,
      "cat sweater",
      "grey with white cat",
      "clothes",
    );
    const item2 = items_test.createItem(
      user1,
      "kitty sweater",
      "red with black cat",
      "clothes",
    );
    if (item1 && item2) {
      // Try to update one item to a name that already exists
      console.log("Attempting to update to duplicate item...");
      items_test.updateItemDetails(
        user1,
        item1,
        "kitty sweater",
        "gray, white cat",
        "winter clothes",
      );
      console.assert(
        items_test.getItemOwner(item1) == user1.username,
        "user mistakenly changed while updating",
      );
      console.assert(
        items_test.getItemName(item1) == "cat sweater",
        "item name updated to duplicate",
      );
      console.assert(
        items_test.getItemDescription(item1) == "gray, white cat",
        "item description should still be updated",
      );
      console.assert(
        items_test.getItemCategory(item1) == "winter clothes",
        "item category should still be updated",
      );
    }
  }
}

/**
 * Main function to run all test cases
 */
function main(): void {
  console.log("🎓 Item Test Suite");
  console.log("========================\n");

  try {
    // Run create unique item test
    testCreateUniqueItem();

    // Run create duplicate item test
    testCreateDuplicateItem();

    // Run delete existing item test
    testValidDeleteItem();

    // Run delete nonexistent item test
    testInvalidDeleteNonexistentItem();

    // Run delete no perms item test
    testInvalidDeleteOtherUsersItem();

    // Run update unique item test
    testValidUpdateItem();

    // Run update duplicate item test
    testInvalidUpdateItem();

    console.log("\n🎉 All test cases completed successfully!");
  } catch (error) {
    console.error("❌ Test error:", (error as Error).message);
  }
}

main();
