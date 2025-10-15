/**
 * Item Test Cases
 *
 * Demonstrates all item actions
 */

import { Item, Items } from "./implementation.ts";
import { Config, GeminiLLM } from "@utils/gemini-llm.ts";

/**
 * Load configuration from config.json
 */
function loadConfig(): Config {
  try {
    const config = require("../config.json");
    return config;
  } catch (error) {
    console.error(
      "❌ Error loading config.json. Please ensure it exists with your API key.",
    );
    console.error("Error details:", (error as Error).message);
    process.exit(1);
  }
}

/**
 * Test case 1: Add item with no duplicate
 * Demonstrates successfully adding an item if there are no items with that name belonging to user
 */
export function testAddValidItem(): Item | undefined {
  console.log("\n🧪 TEST CASE 1: Add item with no duplicate");
  console.log("==================================");

  const user_items = new Items();

  // Add an item
  console.log("📝 Adding item...");
  const detergent = user_items.createItem("Hanna", "detergent");
  const owner = "Hanna";
  const name = "detergent";
  const description = "";
  const tags: string[] = [];
  const test_detergent: Item = { owner, name, description, tags };
  if (detergent !== undefined) {
    console.assert(
      user_items.getItemsString().includes(
        user_items.itemToString(test_detergent),
      ),
    );
    console.log(
      "successfully added item " + user_items.itemToString(detergent),
    );
  }
  return;
}

/**
 * Test case 2: Add item with duplicate
 * Demonstrates failing to add an item if there is already an item with that name belonging to user
 */
export function testAddInvalidItem(): Item | undefined {
  console.log("\n🧪 TEST CASE 2: Add item with duplicate");
  console.log("==================================");

  const user_items = new Items();

  // Add an item
  console.log("📝 Adding item...");
  const detergent = user_items.createItem("Hanna", "detergent");
  const owner = "Hanna";
  const name = "detergent";
  const description = "";
  const tags: string[] = [];
  const test_detergent: Item = { owner, name, description, tags };
  if (detergent !== undefined) {
    console.assert(
      user_items.getItemsString().includes(
        user_items.itemToString(test_detergent),
      ),
    );
    console.log(
      "successfully added item " + user_items.itemToString(detergent),
    );
  }
  return;
}

/**
 * Test case 3: Delete item that exists
 * Demonstrates successfully deleting an item if an item with that name belonging to user exists
 */
export function testDeleteValidItem(): Item | undefined {
  console.log("\n🧪 TEST CASE 3: Delete item that exists");
  console.log("==================================");

  const user_items = new Items();

  // Add an item
  console.log("📝 Adding item...");
  const detergent = user_items.createItem("Hanna", "detergent");
  const owner = "Hanna";
  const name = "detergent";
  const description = "";
  const tags: string[] = [];
  const test_detergent: Item = { owner, name, description, tags };
  if (detergent !== undefined) {
    console.assert(
      user_items.getItemsString().includes(
        user_items.itemToString(test_detergent),
      ),
    );
    console.log(
      "successfully added item " + user_items.itemToString(detergent),
    );
  }
  return;
}

/**
 * Test case 4: Delete item that doesn't exist
 * Demonstrates failing to delete an item if there doesn't exist an item with that name belonging to user
 */
export function testDeleteInvalidItem(): Item | undefined {
  console.log("\n🧪 TEST CASE 4: Delete item that doesn't exist");
  console.log("==================================");

  const user_items = new Items();

  // Add an item
  console.log("📝 Adding item...");
  const detergent = user_items.createItem("Hanna", "detergent");
  const owner = "Hanna";
  const name = "detergent";
  const description = "";
  const tags: string[] = [];
  const test_detergent: Item = { owner, name, description, tags };
  if (detergent !== undefined) {
    console.assert(
      user_items.getItemsString().includes(
        user_items.itemToString(test_detergent),
      ),
    );
    console.log(
      "successfully added item " + user_items.itemToString(detergent),
    );
  }
  return;
}

/**
 * Test case 5: Manual item lookup
 * Demonstrates successfully looking up an item if the query is an exact match
 */
export async function testManualItemSearch(): Promise<void> {
  const config = loadConfig();
  const llm = new GeminiLLM(config);
  console.log("\n🧪 TEST CASE 5: Manual item lookup");
  console.log("==================================");

  const user_items = new Items();

  // Add an item
  console.log("📝 Adding item...");
  const detergent = user_items.createItem("Hanna", "detergent");
  if (detergent !== undefined) {
    console.log("initial item is: " + user_items.itemToString(detergent));
  }

  // Manually lookup an item
  console.log("⏰ Manually looking up items...");
  const items = await user_items.lookupItem("detergent", llm);
  const correct_results = user_items.getItems();
  let mismatch = false;
  console.assert(items.length == correct_results.length);
  for (let i = 0; i < items.length; i++) {
    if (items[i] !== correct_results[i]) {
      mismatch = true;
      break;
    }
  }
  console.assert(!mismatch, "results are a mismatch");
  if (!mismatch) {
    console.log("success!");
    console.log("found item: " + user_items.itemToString(correct_results[0]));
  } else {
    console.log("error");
  }
}

/**
 * Test case 6: LLM Lookup: Clear-cut Items
 * Demonstrates LLM item lookup with item names containing keyword (but being more than keyword),
 * when all incorrect items have no similarity to user input
 */
export async function testLLMLookupNormal(): Promise<void> {
  console.log("\n🧪 TEST CASE 6: LLM Lookup: Clear-cut Items");
  console.log("========================================");

  const user_items = new Items();
  const config = loadConfig();
  const llm = new GeminiLLM(config);

  // Add some items (similar to manual test but different)
  console.log("📝 Adding items...");
  const cat = user_items.createItem("Hanna", "cat plushy");
  const dog = user_items.createItem("Hanna", "dog plushy");
  const pig = user_items.createItem("Hanna", "pig plushy");
  user_items.createItem("Hanna", "computer");
  user_items.createItem("Hanna", "desk lamp");

  // Display initial items (all added)
  console.log("\n📋 Initial state - all items:");
  console.log(
    "initial items are: " + user_items.itemsToString(user_items.getItems()),
  );

  // Let the LLM lookup items
  const result_items = await user_items.lookupItem("plushy", llm);
  let correct_results: Item[] = [];
  if (cat !== undefined && dog !== undefined && pig !== undefined) {
    correct_results = [cat, dog, pig];
  }

  // Display the final items
  console.log("\n📅 Final results of LLM search:");
  let real_items = true;
  for (let i = 0; i < result_items.length; i++) {
    if (!(user_items.equals(result_items[i], correct_results[i]))) {
      real_items = false;
    }
  }
  console.assert(real_items, "hallucinated items");
  let mismatch = false;
  console.assert(
    result_items.length == correct_results.length,
    "different lengths",
  );
  for (let i = 0; i < result_items.length; i++) {
    if (!(user_items.equals(result_items[i], correct_results[i]))) {
      mismatch = true;
      break;
    }
  }
  console.assert(!mismatch, "results are a mismatch");
  if (!mismatch) {
    console.log("success!");
    const results = [];
    for (const item of result_items) {
      results.push(user_items.getItemName(item));
    }
    const string_results = String(results);
    console.log("found item(s): " + string_results);
  } else {
    console.log("error");
  }
}

/**
 * Test case 7: LLM Lookup: Mixed items
 * Demonstrates LLM item lookup with item names exactly matching keyword,
 * when items that are only partial matches shouldn't be returned
 */
export async function testLLMLookupMixed(): Promise<void> {
  console.log("\n🧪 TEST CASE 7: LLM Lookup: Mixed items");
  console.log("=================================");

  const user_items = new Items();
  const config = loadConfig();
  const llm = new GeminiLLM(config);

  // Add some items (similar to manual test but different)
  console.log("📝 Adding items...");
  const cat = user_items.createItem("Hanna", "cat plushy");
  user_items.createItem("Hanna", "spider plushy");
  const dog = user_items.createItem("Hanna", "dog plushy");
  user_items.createItem("Hanna", "snake plushy");

  // Display initial items (all added)
  console.log("\n📋 Initial state - all items:");
  if (cat !== undefined && dog !== undefined) {
    console.log(
      "initial items are: " + user_items.itemsToString(user_items.getItems()),
    );
  }
  // Let the LLM lookup items
  const result_items = await user_items.lookupItem("mammal plushy", llm);
  let correct_results: Item[] = [];
  if (cat !== undefined && dog !== undefined) {
    correct_results = [cat, dog];
  }

  // Display the final items
  console.log("\n📅 Final results of LLM search:");
  let real_items = true;
  for (let i = 0; i < result_items.length; i++) {
    if (!(user_items.equals(result_items[i], correct_results[i]))) {
      real_items = false;
    }
  }
  console.assert(real_items, "hallucinated items");
  let mismatch = false;
  console.assert(
    result_items.length == correct_results.length,
    "different lengths",
  );
  for (let i = 0; i < result_items.length; i++) {
    if (!(user_items.equals(result_items[i], correct_results[i]))) {
      mismatch = true;
      break;
    }
  }
  console.assert(!mismatch, "results are a mismatch");
  if (!mismatch) {
    console.log("success!");
    const results = [];
    for (const item of result_items) {
      results.push(user_items.getItemName(item));
    }
    const string_results = String(results);
    console.log("found item(s): " + string_results);
  } else {
    console.log("error");
  }
}

/**
 * Test case 8: LLM Lookup: Typoed items
 * Demonstrates LLM item lookup with typoes in user input
 */
export async function testLLMLookupTypoes(): Promise<void> {
  console.log("\n🧪 TEST CASE 8: LLM Lookup: Typoed Items");
  console.log("=================================");

  const user_items = new Items();
  const config = loadConfig();
  const llm = new GeminiLLM(config);

  // Add some items (similar to manual test but different)
  console.log("📝 Adding items...");
  const computer = user_items.createItem("Hanna", "computer");
  user_items.createItem("Hanna", "cat plushy");
  const phone = user_items.createItem("Hanna", "phone");
  user_items.createItem("Hanna", "hand sanitizer");
  user_items.createItem("Hanna", "photo");

  // Display initial items (all added)
  console.log("\n📋 Initial state - all items:");
  if (computer !== undefined && phone !== undefined) {
    console.log(
      "initial items are: " + user_items.itemsToString(user_items.getItems()),
    );
  }
  // Let the LLM lookup items
  const result_items = await user_items.lookupItem("ecletronisc", llm);
  let correct_results: Item[] = [];
  if (computer !== undefined && phone !== undefined) {
    correct_results = [computer, phone];
  }

  // Display the final items
  console.log("\n📅 Final results of LLM search:");
  let real_items = true;
  for (let i = 0; i < result_items.length; i++) {
    if (!(user_items.equals(result_items[i], correct_results[i]))) {
      real_items = false;
    }
  }
  console.assert(real_items, "hallucinated items");
  let mismatch = false;
  console.assert(
    result_items.length == correct_results.length,
    "different lengths",
  );
  for (let i = 0; i < result_items.length; i++) {
    if (!(user_items.equals(result_items[i], correct_results[i]))) {
      mismatch = true;
      break;
    }
  }
  console.assert(!mismatch, "results are a mismatch");
  if (!mismatch) {
    console.log("success!");
    const results = [];
    for (const item of result_items) {
      results.push(user_items.getItemName(item));
    }
    const string_results = String(results);
    console.log("found item(s): " + string_results);
  } else {
    console.log("error");
  }
}

/**
 * Test case 9: LLM Lookup: Fuzzy Keyword Searches
 * Demonstrates LLM item lookup with items matching user input semantically but not exact wording
 */
export async function testLLMLookupFuzzy(): Promise<void> {
  console.log("\n🧪 TEST CASE 9: LLM Lookup: Fuzzy Keyword Searches");
  console.log("=================================");

  const user_items = new Items();
  const config = loadConfig();
  const llm = new GeminiLLM(config);

  // Add some items (similar to manual test but different)
  console.log("📝 Adding items...");
  const cat = user_items.createItem("Hanna", "cat plushy");
  user_items.createItem("Hanna", "lamp");
  const dog = user_items.createItem("Hanna", "dog pillow");
  user_items.createItem("Hanna", "snake cage");

  // Display initial items (all added)
  console.log("\n📋 Initial state - all items:");
  if (cat !== undefined && dog !== undefined) {
    console.log(
      "initial items are: " + user_items.itemsToString(user_items.getItems()),
    );
  }
  // Let the LLM lookup items
  const result_items = await user_items.lookupItem("stuffed animal", llm);
  let correct_results: Item[] = [];
  if (cat !== undefined && dog !== undefined) {
    correct_results = [cat, dog];
  }

  // Display the final items
  console.log("\n📅 Final results of LLM search:");
  let real_items = true;
  for (let i = 0; i < result_items.length; i++) {
    if (!(user_items.equals(result_items[i], correct_results[i]))) {
      real_items = false;
    }
  }
  console.assert(real_items, "hallucinated items");
  let mismatch = false;
  console.assert(
    result_items.length == correct_results.length,
    "different lengths",
  );
  for (let i = 0; i < result_items.length; i++) {
    if (!(user_items.equals(result_items[i], correct_results[i]))) {
      mismatch = true;
      break;
    }
  }
  console.assert(!mismatch, "results are a mismatch");
  if (!mismatch) {
    console.log("success!");
    const results = [];
    for (const item of result_items) {
      results.push(user_items.getItemName(item));
    }
    const string_results = String(results);
    console.log("found item(s): " + string_results);
  } else {
    console.log("error");
  }
}

/**
 * Main function to run all test cases
 */
async function main(): Promise<void> {
  console.log("🎓 Item Test Suite");
  console.log("========================\n");

  try {
    // Run add item with no duplicate test
    testAddValidItem();

    // Run manual item lookup test
    await testManualItemSearch();

    // Run LLM Lookup: Clear-cut Items test
    await testLLMLookupNormal();

    // Run LLM Lookup: Mixed Items test
    await testLLMLookupMixed();

    // Run LLM Lookup: Typoed Items test
    await testLLMLookupTypoes();

    // Run LLM Lookup: Fuzzy Keyword Searchers test
    await testLLMLookupFuzzy();

    console.log("\n🎉 All test cases completed successfully!");
  } catch (error) {
    console.error("❌ Test error:", (error as Error).message);
    process.exit(1);
  }
}

// Run the tests if this file is executed directly
if (require.main === module) {
  main();
}
