import {
  Bundle,
  BundleApiClient,
  BundleModificationRequest,
  ItemBundleModificationRequest,
} from "./bundleApiClient";

// Instantiate the client.
// If your API is hosted at, say, http://localhost:3000, you'd do:
// const bundleApi = new BundleApiClient('http://localhost:3000/api/Bundle');
// For this example, we'll assume the client-side code is served from the same
// origin as the API, so '/api/Bundle' is relative to the current origin.
const bundleApi = new BundleApiClient();

async function runExample() {
  const userId = "user123";
  const otherUserId = "user456"; // For testing ownership rules
  const bundleName1 = "My First Bundle";
  const bundleName2 = "My Second Bundle";
  const item1 = "itemA123";
  const item2 = "itemB456";
  const nonExistentItem = "itemXYZ";

  console.log("--- Starting Bundle API Demo ---");

  try {
    // 1. Create Bundle
    console.log(`\nCreating bundle '${bundleName1}' for user '${userId}'...`);
    const newBundle1: Bundle = await bundleApi.createBundle({
      user: userId,
      name: bundleName1,
    });
    console.log("Created bundle:", newBundle1);

    console.log(`\nCreating bundle '${bundleName2}' for user '${userId}'...`);
    const newBundle2: Bundle = await bundleApi.createBundle({
      user: userId,
      name: bundleName2,
    });
    console.log("Created bundle:", newBundle2);

    // 2. Try to create a duplicate bundle (should fail)
    console.log(
      `\nAttempting to create duplicate bundle '${bundleName1}' for user '${userId}' (expected error)...`,
    );
    try {
      await bundleApi.createBundle({ user: userId, name: bundleName1 });
    } catch (e: any) {
      console.error("Caught expected error:", e.message);
    }

    // 3. Add item to bundle
    console.log(
      `\nAdding item '${item1}' to bundle '${bundleName1}' for user '${userId}'...`,
    );
    await bundleApi.addItemToBundle({
      user: userId,
      item: item1,
      bundleName: bundleName1,
    });
    console.log("Item added successfully.");

    console.log(
      `\nAdding item '${item2}' to bundle '${bundleName1}' for user '${userId}'...`,
    );
    await bundleApi.addItemToBundle({
      user: userId,
      item: item2,
      bundleName: bundleName1,
    });
    console.log("Item added successfully.");

    // 4. Try to add same item again (should fail)
    console.log(
      `\nAttempting to add duplicate item '${item1}' to bundle '${bundleName1}' (expected error)...`,
    );
    try {
      await bundleApi.addItemToBundle({
        user: userId,
        item: item1,
        bundleName: bundleName1,
      });
    } catch (e: any) {
      console.error("Caught expected error:", e.message);
    }

    // 5. Get all bundles to see changes
    console.log("\nRetrieving all bundles...");
    const allBundlesAfterAdd: Bundle[] = await bundleApi.getBundles();
    console.log("All bundles:", JSON.stringify(allBundlesAfterAdd, null, 2));

    // 6. Remove item from bundle
    console.log(
      `\nRemoving item '${item1}' from bundle '${bundleName1}' for user '${userId}'...`,
    );
    await bundleApi.removeItemFromBundle({
      user: userId,
      item: item1,
      bundleName: bundleName1,
    });
    console.log("Item removed successfully.");

    // 7. Try to remove non-existent item from bundle (should fail)
    console.log(
      `\nAttempting to remove non-existent item '${nonExistentItem}' from bundle '${bundleName1}' (expected error)...`,
    );
    try {
      await bundleApi.removeItemFromBundle({
        user: userId,
        item: nonExistentItem,
        bundleName: bundleName1,
      });
    } catch (e: any) {
      console.error("Caught expected error:", e.message);
    }

    // 8. Try to modify another user's bundle (should fail)
    console.log(
      `\nAttempting to add item to '${bundleName1}' using different user '${otherUserId}' (expected error)...`,
    );
    try {
      await bundleApi.addItemToBundle({
        user: otherUserId,
        item: item1,
        bundleName: bundleName1,
      });
    } catch (e: any) {
      console.error("Caught expected error:", e.message);
    }

    // 9. Get all bundles again to see removal
    console.log("\nRetrieving all bundles after item removal...");
    const allBundlesAfterRemove: Bundle[] = await bundleApi.getBundles();
    console.log("All bundles:", JSON.stringify(allBundlesAfterRemove, null, 2));

    // 10. Delete a bundle
    console.log(`\nDeleting bundle '${bundleName2}' for user '${userId}'...`);
    await bundleApi.deleteBundle({ user: userId, name: bundleName2 });
    console.log("Bundle deleted successfully.");

    // 11. Get all bundles one last time
    console.log("\nRetrieving all bundles after bundle deletion...");
    const finalBundles: Bundle[] = await bundleApi.getBundles();
    console.log("Final bundles:", JSON.stringify(finalBundles, null, 2));
  } catch (err: any) {
    console.error(
      "\nAn unhandled error occurred during the demo:",
      err.message,
    );
  }

  console.log("\n--- Bundle API Demo Complete ---");
}

runExample();
