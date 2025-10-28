/**
 * Space Test Cases
 *
 * Demonstrates all space actions
 */

import UserConcept from "../User/UserConcept.ts";
import SpaceConcept from "./SpaceConcept.ts";

/**
 * Test case 1: Create unique space
 * Demonstrates successfully creating a space if the name is unique
 */
export function testCreateValidSpace(): void {
  console.log("\n🧪 TEST CASE 1: Create unique space");
  console.log("==================================");

  const users = new UserConcept();
  const spaces_test = new SpaceConcept();
  // Register a user
  const user1 = users.registerUser("hanna", "asdf123");
  // Create a space
  console.log("📝 Adding space...");
  if (user1) {
    const space = spaces_test.createSpace(user1, "dresser", "cabinet", null);
    if (space !== undefined) {
      console.assert(
        spaces_test.getSpaces().includes(space),
      );
      console.log(
        "successfully created space: " + spaces_test.getSpaceName(space),
      );
      return;
    }
  }
}

/**
 * Test case 2: Create duplicate space (has parent)
 * Demonstrates failing to create a space if it has a parent and its name is not unique among its parent's children
 */
export function testCreateInvalidSpaceParent(): void {
  console.log("\n🧪 TEST CASE 2: Create duplicate space (has parent)");
  console.log("==================================");

  const users = new UserConcept();
  const spaces_test = new SpaceConcept();
  // Register a user
  const user1 = users.registerUser("hanna", "asdf123");
  // Create a space and a child within the space
  console.log("📝 Adding space...");
  if (user1) {
    const space1 = spaces_test.createSpace(user1, "dresser", "cabinet", null);
    if (space1) {
      const _ = spaces_test.createSpace(
        user1,
        "drawer 1",
        "drawer",
        space1,
      );
      // Try to create a space with a duplicate name within the same parent
      console.log("Attempting to create duplicate space...");
      const space3 = spaces_test.createSpace(
        user1,
        "drawer 1",
        "drawer",
        space1,
      );
      console.assert(
        space3 === undefined,
        "duplicate space was incorrectly created",
      );
      const space1_children = spaces_test.getSpaceChildren(space1);
      if (space1_children) {
        console.assert(
          space1_children.length == 1,
          "wrong number of child spaces",
        );
      }
    }
  }
}

/**
 * Test case 3: Create duplicate space (has no parent)
 * Demonstrates failing to create a space if it doesn't have a parent
 */
export function testCreateInvalidSpaceNoParent(): void {
  console.log("\n🧪 TEST CASE 3: Create duplicate space (has no parent)");
  console.log("==================================");

  const users = new UserConcept();
  const spaces_test = new SpaceConcept();
  // Register a user
  const user1 = users.registerUser("hanna", "asdf123");
  // Create a space
  console.log("📝 Adding space...");
  if (user1) {
    const space1 = spaces_test.createSpace(user1, "dresser", "cabinet", null);
    if (space1) {
      // Try to create a space with a duplicate name that also has no parent
      console.log("Attempting to create duplicate space...");
      const space2 = spaces_test.createSpace(
        user1,
        "dresser",
        "cabinet",
        null,
      );
      console.assert(
        space2 === undefined,
        "duplicate space was incorrectly created",
      );
    }
  }
}

/**
 * Test case 4: Move unique space
 * Demonstrates successfully moving a space
 */
export function testValidSpaceMove(): void {
  console.log("\n🧪 TEST CASE 4: Move unique space");
  console.log("==================================");

  const users = new UserConcept();
  const spaces_test = new SpaceConcept();
  // Register a user
  const user1 = users.registerUser("hanna", "asdf123");
  // Create two spaces
  console.log("📝 Adding spaces...");
  if (user1) {
    const space1 = spaces_test.createSpace(user1, "dresser", "cabinet", null);
    const space2 = spaces_test.createSpace(user1, "shelf", "shelf", null);
    if (space1 && space2) {
      // Create a third space and add it to the first space created above
      const space3 = spaces_test.createSpace(
        user1,
        "drawer 1",
        "drawer",
        space1,
      );
      if (space3) {
        console.log("📝 Moving space...");
        spaces_test.moveSpace(user1, space3, space2);
        const space1_children = spaces_test.getSpaceChildren(space1);
        if (space1_children) {
          console.assert(
            space1_children.length == 0,
            "space was not successfully removed from old parent",
          );
        }
        const space2_children = spaces_test.getSpaceChildren(space2);
        if (space2_children) {
          console.assert(
            space2_children.includes(space3),
            "space was not successfully moved to new parent",
          );
        }
        console.log(
          "Space was successfully moved to: " +
            spaces_test.getSpaceName(space2),
        );
      }
    }
  }
}

/**
 * Test case 5: Move duplicate space
 * Demonstrates failing to move a space if the new location has a space with the same name
 */
export function testInvalidSpaceMoveDuplicate(): void {
  console.log(
    "\n🧪 TEST CASE 5: Move duplicate space",
  );
  console.log("==================================");

  const users = new UserConcept();
  const spaces_test = new SpaceConcept();
  // Register a user
  const user1 = users.registerUser("hanna", "asdf123");
  // Create two spaces
  console.log("📝 Adding spaces...");
  if (user1) {
    const space1 = spaces_test.createSpace(user1, "dresser", "cabinet", null);
    const space2 = spaces_test.createSpace(user1, "shelf", "shelf", null);
    if (space1 && space2) {
      // Create a third space and add it to the first space created above
      const space3 = spaces_test.createSpace(
        user1,
        "drawer 1",
        "drawer",
        space1,
      );
      // Create a fourth space with the same name as third space and add it to the second space above
      const space4 = spaces_test.createSpace(
        user1,
        "drawer 1",
        "drawer",
        space2,
      );
      if (space3 && space4) {
        // Try to move space into new space with a duplicate name
        console.log(
          "Attempting to move space into new space with duplicate name...",
        );
        spaces_test.moveSpace(user1, space3, space2);
        const space2_children = spaces_test.getSpaceChildren(space2);
        if (space2_children) {
          console.assert(
            space2_children.length === 1,
            "duplicate space cannot be moved",
          );
        }
      }
    }
  }
}

/**
 * Test case 6: Move space (wrong owner)
 * Demonstrates failing to move a space if the owner does not have permissions
 */
export function testInvalidSpaceMoveWrongOwner(): void {
  console.log(
    "\n🧪 TEST CASE 6: Move space (wrong owner)",
  );
  console.log("==================================");

  const users = new UserConcept();
  const spaces_test = new SpaceConcept();
  // Register two users
  const user1 = users.registerUser("hanna", "asdf123");
  const user2 = users.registerUser("cat", "asdf321");
  // Create two spaces
  console.log("📝 Adding spaces...");
  if (user1) {
    const space1 = spaces_test.createSpace(user1, "dresser", "cabinet", null);
    const space2 = spaces_test.createSpace(user1, "shelf", "shelf", null);
    if (space1 && space2) {
      // Create a third space and add it to the first space created above
      const space3 = spaces_test.createSpace(
        user1,
        "drawer 1",
        "drawer",
        space1,
      );
      if (space3 && user2) {
        // Try to move space into new space through wrong user
        console.log(
          "Attempting to move space into new space through wrong user...",
        );
        spaces_test.moveSpace(user2, space3, space2);
        const space2_children = spaces_test.getSpaceChildren(space2);
        if (space2_children) {
          console.assert(
            space2_children.length === 0,
            "duplicate space cannot be moved",
          );
        }
      }
    }
  }
}

/**
 * Test case 7: Rename unique space
 * Demonstrates successfully renaming a space
 */
export function testValidRenameSpace(): void {
  console.log("\n🧪 TEST CASE 7: Rename unique space");
  console.log("==================================");

  const users = new UserConcept();
  const spaces_test = new SpaceConcept();
  // Register a user
  const user1 = users.registerUser("hanna", "asdf123");
  // Create space
  console.log("📝 Adding space...");
  if (user1) {
    const space1 = spaces_test.createSpace(user1, "dresser", "cabinet", null);
    if (space1) {
      // Create two more spaces and add them to the first space
      const space2 = spaces_test.createSpace(
        user1,
        "drawer 1",
        "drawer",
        space1,
      );
      const space3 = spaces_test.createSpace(
        user1,
        "drawer 2",
        "drawer",
        space1,
      );
      if (space2 && space3) {
        console.log("📝 Renaming space...");
        spaces_test.renameSpace(user1, space3, "drawer 3");
        const space1_children_string = spaces_test.getSpaceChildrenString(
          space1,
        );
        if (space1_children_string) {
          console.assert(
            space1_children_string[0] === "drawer 1",
            "wrong first space",
          );
          console.assert(
            space1_children_string[1] === "drawer 3",
            "wrong rename",
          );
          console.log(
            "space was successfully renamed to: " +
              spaces_test.getSpaceName(space3),
          );
        }
      }
    }
  }
}

/**
 * Test case 8: Rename duplicate space
 * Demonstrates failing to rename a space if the new name is a duplicate
 */
export function testInvalidSpaceRename(): void {
  console.log(
    "\n🧪 TEST CASE 8: Rename duplicate space",
  );
  console.log("==================================");

  const users = new UserConcept();
  const spaces_test = new SpaceConcept();
  // Register a user
  const user1 = users.registerUser("hanna", "asdf123");
  // Create space
  console.log("📝 Adding space...");
  if (user1) {
    const space1 = spaces_test.createSpace(user1, "dresser", "cabinet", null);
    if (space1) {
      // Create two more spaces and add them to the first space
      const space2 = spaces_test.createSpace(
        user1,
        "drawer 1",
        "drawer",
        space1,
      );
      const space3 = spaces_test.createSpace(
        user1,
        "drawer 2",
        "drawer",
        space1,
      );
      if (space2 && space3) {
        // Try to rename space to a duplicate name
        console.log(
          "Attempting to rename space to duplicate name...",
        );
        spaces_test.renameSpace(user1, space3, "drawer 2");
        const space1_children_string = spaces_test.getSpaceChildrenString(
          space1,
        );
        if (space1_children_string) {
          console.assert(
            space1_children_string[0] === "drawer 1",
            "wrong first space",
          );
          console.assert(
            space1_children_string[1] === "drawer 2",
            "space was renamed to duplicate name",
          );
        }
      }
    }
  }
}

/**
 * Test case 9: Delete empty space
 * Demonstrates successfully deleting an empty space
 */
export function testValidDeleteSpace(): void {
  console.log("\n🧪 TEST CASE 9: Delete empty space");
  console.log("==================================");

  const users = new UserConcept();
  const spaces_test = new SpaceConcept();
  // Register a user
  const user1 = users.registerUser("hanna", "asdf123");
  // Create space
  console.log("📝 Adding space...");
  if (user1) {
    const space1 = spaces_test.createSpace(user1, "dresser", "cabinet", null);
    if (space1) {
      // Create another space and add it to the first space
      const space2 = spaces_test.createSpace(
        user1,
        "drawer 1",
        "drawer",
        space1,
      );
      if (space2) {
        // Delete second space (which is empty)
        console.log("📝 Deleting space...");
        spaces_test.deleteSpace(user1, space2);
        const space1_children_string = spaces_test.getSpaceChildrenString(
          space1,
        );
        if (space1_children_string) {
          console.assert(
            space1_children_string.length === 0,
            "delete not successful",
          );
          console.log(
            "space was successfully deleted",
          );
        }
      }
    }
  }
}

/**
 * Test case 10: Delete non-empty space
 * Demonstrates failing to delete a space if the space is not empty
 */
export function testInvalidDeleteSpace(): void {
  console.log(
    "\n🧪 TEST CASE 10: Delete non-empty space",
  );
  console.log("==================================");

  const users = new UserConcept();
  const spaces_test = new SpaceConcept();
  // Register a user
  const user1 = users.registerUser("hanna", "asdf123");
  // Create space
  console.log("📝 Adding space...");
  if (user1) {
    const space1 = spaces_test.createSpace(user1, "dresser", "cabinet", null);
    if (space1) {
      // Create another space and add it to the first space
      const space2 = spaces_test.createSpace(
        user1,
        "drawer 1",
        "drawer",
        space1,
      );
      if (space2) {
        // Trying to delete first space (which is not empty)
        console.log("Attempting to delete non-empty space...");
        spaces_test.deleteSpace(user1, space1);
        const spaces = spaces_test.getSpaces();
        if (spaces) {
          console.assert(
            spaces.length === 2,
            "deleted non-empty space",
          );
        }
      }
    }
  }
}

/**
 * Main function to run all test cases
 */
function main(): void {
  console.log("🎓 Space Test Suite");
  console.log("========================\n");

  try {
    // Run create unique space test
    testCreateValidSpace();

    // Run create duplicate space (has parent) test
    testCreateInvalidSpaceParent();

    // Run create duplicate space (has no parent) test
    testCreateInvalidSpaceNoParent();

    // Run move unique space test
    testValidSpaceMove();

    // Run move duplicate space test
    testInvalidSpaceMoveDuplicate();

    // Run move space (wrong owner) test
    testInvalidSpaceMoveWrongOwner();

    // Run rename unique space test
    testValidRenameSpace();

    // Run rename duplicate space test
    testInvalidSpaceRename();

    // Run delete empty space test
    testValidDeleteSpace();

    // Run delete non-empty space test
    testInvalidDeleteSpace();

    console.log("\n🎉 All test cases completed successfully!");
  } catch (error) {
    console.error("❌ Test error:", (error as Error).message);
  }
}

main();
