/**
 * Bundle Test Cases
 *
 * Demonstrates all bundle actions
 */

import UserConcept from "../User/UserConcept.ts";
import ItemConcept from "../Item/ItemConcept.ts";
import BundleConcept from "./BundleConcept.ts";

/**
 * Test case 1: Create unique bundle
 * Demonstrates successfully creating a bundle if the name is unique
 */
export function testCreateUniqueBundle(): void {
  console.log("\n🧪 TEST CASE 1: Create unique bundle");
  console.log("==================================");

  const users = new UserConcept();
  const bundles_test = new BundleConcept();
  // Register a user
  const user1 = users.registerUser("hanna", "asdf123");
  // Create a bundle
  if (user1) {
    console.log("📝 Adding bundle...");
    const bundle = bundles_test.createBundle(user1, "ice skating");
    if (bundle) {
      console.assert(
        bundles_test.getBundles().includes(bundle),
      );
      console.log(
        "successfully created bundle with name: " + bundle.name,
      );
    }
  }
}

/**
 * Test case 2: Create duplicate bundle
 * Demonstrates failing to create a bundle if the user already has a bundle by that name
 */
export function testCreateDuplicateBundle(): void {
  console.log("\n🧪 TEST CASE 2: Create duplicate bundle");
  console.log("==================================");

  const users = new UserConcept();
  const bundles_test = new BundleConcept();
  // Register a user
  const user1 = users.registerUser("hanna", "asdf123");
  // Create a bundle
  if (user1) {
    console.log("📝 Adding bundle...");
    const bundle1 = bundles_test.createBundle(user1, "ice skating");
    // Try to create another bundle for the same user
    console.log("Attempting to create duplicate bundle...");
    const bundle2 = bundles_test.createBundle(user1, "ice skating");
    const bundles = bundles_test.getBundles();
    if (bundles && bundle1 && bundle2) {
      console.assert(
        bundles.length == 1,
        "duplicate bundle was incorrectly created",
      );
      console.assert(
        bundles[0].name == bundle1.name,
        "incorrect bundle creation",
      );
    }
  }
}

/**
 * Test case 3: Delete valid bundle
 * Demonstrates successfully deleting a bundle
 */
export function testDeleteValidBundle(): void {
  console.log("\n🧪 TEST CASE 3: Delete valid bundle");
  console.log("==================================");

  const users = new UserConcept();
  const bundles_test = new BundleConcept();
  // Register a user
  const user = users.registerUser("hanna", "asdf123");
  if (user) {
    // Create a bundle
    console.log("📝 Adding bundle...");
    const bundle = bundles_test.createBundle(user, "ice skating");
    if (bundle) {
      // Delete the bundle
      console.log("📝 Deleting bundle...");
      bundles_test.deleteBundle(user, "ice skating");
      console.assert(
        bundles_test.getBundles().length == 0,
        "did not delete bundle properly",
      );
      console.log("successfully deleted bundle with name: " + bundle.name);
    }
  }
}

/**
 * Test case 4: Delete nonexistent bundle
 * Demonstrates failing to delete a bundle that doesn't exist
 */
export function testDeleteNonexistentBundle(): void {
  console.log("\n🧪 TEST CASE 4: Delete nonexistent bundle");
  console.log("==================================");

  const users = new UserConcept();
  const bundles_test = new BundleConcept();
  // Register a user
  const user = users.registerUser("hanna", "asdf123");
  if (user) {
    // Create a bundle
    console.log("📝 Adding bundle...");
    const _ = bundles_test.createBundle(user, "ice skating");
    // Try to delete a nonexistent bundle
    console.log("Attempting to delete a nonexistent bundle...");
    bundles_test.deleteBundle(user, "gym");
    console.assert(
      bundles_test.getBundles().length == 1,
      "deleted wrong bundle",
    );
  }
}

/**
 * Test case 5: Delete other user's bundle
 * Demonstrates failing to delete a bundle that belongs to another uesr
 */
export function testDeleteOtherUsersBundle(): void {
  console.log("\n🧪 TEST CASE 5: Delete other user's bundle");
  console.log("==================================");

  const users = new UserConcept();
  const bundles_test = new BundleConcept();
  // Register two users
  const user1 = users.registerUser("hanna", "asdf123");
  const user2 = users.registerUser("cat", "asdf321");
  if (user1 && user2) {
    // Create a bundle
    console.log("📝 Adding bundle...");
    const _ = bundles_test.createBundle(user1, "ice skating");
    // Try to delete another user's bundle
    console.log("Attempting to delete another user's bundle...");
    bundles_test.deleteBundle(user2, "ice skating");
    console.assert(
      bundles_test.getBundles().length == 1,
      "deleted wrong bundle",
    );
  }
}

/**
 * Test case 6: Add new item to bundle
 * Demonstrates successfully adding an item to a bundle
 */
export function testAddValidItem(): void {
  console.log("\n🧪 TEST CASE 6: Add new item to bundle");
  console.log("==================================");

  const users = new UserConcept();
  const items_test = new ItemConcept();
  const bundles_test = new BundleConcept();
  // Register a user
  const user = users.registerUser("hanna", "asdf123");
  if (user) {
    // Create a bundle and item
    console.log("📝 Adding bundle and item...");
    const bundle = bundles_test.createBundle(user, "ice skating");
    const item = items_test.createItem(user, "skates");
    if (bundle && item) {
      // Add item to bundle
      console.log("📝 Adding item to bundle...");
      bundles_test.addItemToBundle(user, item, bundle);
      console.assert(
        bundle.members.length == 1,
        "did not add item correctly",
      );
      console.log(
        "successfully added item with name: " + item.name +
          " to bundle with name: " + bundle.name,
      );
    }
  }
}

/**
 * Test case 7: Add duplicate item to bundle
 * Demonstrates failing to add a duplicate item to a bundle
 */
export function testAddDuplicateItem(): void {
  console.log("\n🧪 TEST CASE 7: Add duplicate item to bundle");
  console.log("==================================");

  const users = new UserConcept();
  const items_test = new ItemConcept();
  const bundles_test = new BundleConcept();
  // Register a user
  const user = users.registerUser("hanna", "asdf123");
  if (user) {
    // Create a bundle and item
    console.log("📝 Adding bundle and item...");
    const bundle = bundles_test.createBundle(user, "ice skating");
    const item = items_test.createItem(user, "skates");
    if (bundle && item) {
      // Add item to bundle
      console.log("📝 Adding item to bundle...");
      bundles_test.addItemToBundle(user, item, bundle);
      // Try to add item to bundle again
      console.log("Attempting to add duplicate item to bundle...");
      bundles_test.addItemToBundle(user, item, bundle);
      console.assert(
        bundle.members.length == 1,
        "added duplicate item",
      );
    }
  }
}

/**
 * Test case 8: Delete valid item from bundle
 * Demonstrates successfully deleting an item from a bundle
 */
export function testDeleteValidItem(): void {
  console.log("\n🧪 TEST CASE 8: Delete valid item from bundle");
  console.log("==================================");

  const users = new UserConcept();
  const items_test = new ItemConcept();
  const bundles_test = new BundleConcept();
  // Register a user
  const user = users.registerUser("hanna", "asdf123");
  if (user) {
    // Create a bundle and item
    console.log("📝 Adding bundle and item...");
    const bundle = bundles_test.createBundle(user, "ice skating");
    const item = items_test.createItem(user, "skates");
    if (bundle && item) {
      // Add item to bundle
      console.log("📝 Adding item to bundle...");
      bundles_test.addItemToBundle(user, item, bundle);
      // Delete item from bundle
      console.log("📝 Deleting item from bundle...");
      bundles_test.removeItemFromBundle(user, item, bundle);
      console.assert(
        bundle.members.length == 0,
        "did not delete item correctly",
      );
      console.log(
        "successfully deleted item with name: " + item.name +
          " from bundle with name: " + bundle.name,
      );
    }
  }
}

/**
 * Test case 9: Delete nonexistent item from bundle
 * Demonstrates failing to delete a nonexistent item from a bundle
 */
export function testDeleteNonexistentItem(): void {
  console.log("\n🧪 TEST CASE 9: Delete nonexistent item from bundle");
  console.log("==================================");

  const users = new UserConcept();
  const items_test = new ItemConcept();
  const bundles_test = new BundleConcept();
  // Register a user
  const user = users.registerUser("hanna", "asdf123");
  if (user) {
    // Create a bundle and two items
    console.log("📝 Adding bundle and item...");
    const bundle = bundles_test.createBundle(user, "ice skating");
    const item1 = items_test.createItem(user, "skates");
    const item2 = items_test.createItem(user, "mittens");
    if (bundle && item1 && item2) {
      // Add first item to bundle
      console.log("📝 Adding first item to bundle...");
      bundles_test.addItemToBundle(user, item1, bundle);
      // Try to delete second item from bundle
      console.log("Attempting to delete second item from bundle...");
      bundles_test.removeItemFromBundle(user, item2, bundle);
      console.assert(
        bundle.members.length == 1 && bundle.members[0].name == item1.name,
        "deleted wrong item(s)",
      );
    }
  }
}

/**
 * Main function to run all test cases
 */
function main(): void {
  console.log("🎓 Bundle Test Suite");
  console.log("========================\n");

  try {
    // Run create unique bundle test
    testCreateUniqueBundle();

    // Run create duplicate bundle test
    testCreateDuplicateBundle();

    // Run delete valid bundle test
    testDeleteValidBundle();

    // Run delete nonexistent bundle test
    testDeleteNonexistentBundle();

    // Run delete other user's bundle test
    testDeleteOtherUsersBundle();

    // Run add new item to bundle test
    testAddValidItem();

    // Run add duplicate item to bundle test
    testAddDuplicateItem();

    // Run delete valid item from bundle test
    testDeleteValidItem();

    // Run delete nonexistent item from bundle test
    testDeleteNonexistentItem();

    console.log("\n🎉 All test cases completed successfully!");
  } catch (error) {
    console.error("❌ Test error:", (error as Error).message);
  }
}

main();
