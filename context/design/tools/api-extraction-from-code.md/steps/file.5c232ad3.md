---
timestamp: 'Fri Oct 24 2025 22:24:27 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251024_222427.1db14840.md]]'
content_id: 5c232ad38876ad7d764dc22cf9c95150ac2684ee4bc6aca4063e026fd1556b1c
---

# file: src\concepts\Space\SpaceConcept.ts

```typescript
import { User } from "@concepts/User/implementation.ts";

// A single space
export interface Space {
  owner: User;
  name: string;
  spaceType: string;
  parent: Space | null;
  children?: Space[];
}

export class Spaces {
  private spaces: Space[] = [];
  createSpace(
    owner: User,
    name: string,
    spaceType: string,
    parent: Space | null,
  ): Space | void {
    // Check that space name is unique
    if (parent && parent.children) {
      // Check among children of space's parent
      for (const child of parent.children) {
        if (child.name == name) {
          console.log("space with name already exists");
          return;
        }
      }
    } else {
      // Check among all spaces with no parent belonging to user
      for (const space of this.spaces) {
        if (
          space.parent == null && space.owner.username == owner.username &&
          space.name == name
        ) {
          console.log("space with name already exists");
          return;
        }
      }
    }
    const space: Space = {
      owner,
      name,
      spaceType,
      parent,
    };
    this.spaces.push(space);
    if (parent) {
      // Add space to its parent's children (if it has a parent)
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(space);
    }
    return space;
  }

  moveSpace(owner: User, space: Space, newParent: Space): void {
    // Check that space and newParent exist
    if (!this.spaces.includes(space) || !this.spaces.includes(newParent)) {
      console.log("space or newParent does not exist");
      return;
    }
    // Check that space and newParent belong to owner
    if (
      space.owner.username !== owner.username ||
      newParent.owner.username !== owner.username
    ) {
      console.log("space or newParent does not belong to owner");
      return;
    }
    if (newParent.children) {
      // Check that space's name is unique among newParent's children (if it has children)
      for (const child of newParent.children) {
        if (child.name === space.name) {
          console.log(
            "space with name already exists among new parent's children",
          );
          return;
        }
      }
    }
    // Remove space from its previous parent's children if it had a parent
    if (space.parent) {
      const oldParent = space.parent;
      if (oldParent.children) {
        oldParent.children = oldParent.children.filter((child) =>
          child !== space
        );
      }
    }
    // Add space to newParent's children
    if (!newParent.children) {
      newParent.children = [];
    }
    newParent.children.push(space);
    // Update space's parent parameter
    space.parent = newParent;
  }

  renameSpace(owner: User, space: Space, newName: string): void {
    // Check that space exists
    if (!this.spaces.includes(space)) {
      console.log("space does not exist");
      return;
    }
    // Check that space belongs to owner
    if (
      space.owner.username !== owner.username
    ) {
      console.log("space does not belong to owner");
      return;
    }
    // If space has a parent and that parent has children
    if (space.parent && space.parent.children) {
      for (const child of space.parent.children) {
        if (child.name === newName) {
          console.log(
            "cannot rename space: its parent already has a space with that name",
          );
          return;
        }
      }
    } // If space doesn't have a parent
    else {
      // Check among all spaces with no parent belonging to user
      for (const space of this.spaces) {
        if (
          space.parent == null && space.owner.username == owner.username &&
          space.name == newName
        ) {
          console.log(
            "cannot rename space: a space with this name already exists",
          );
          return;
        }
      }
    }
    // Rename space
    space.name = newName;
  }

  deleteSpace(owner: User, space: Space): void {
    // Check that space exists
    if (!this.spaces.includes(space)) {
      console.log("space does not exist");
      return;
    }
    // Check that space belongs to owner
    if (
      space.owner.username !== owner.username
    ) {
      console.log("space does not belong to owner");
      return;
    }
    // Check that space has no children
    if (space.children && space.children.length > 0) {
      console.log("cannot delete a non-empty space");
      return;
    }
    // Remove space from its parent's children (if it has a parent)
    if (space.parent) {
      if (space.parent.children) {
        space.parent.children = space.parent.children.filter((child) =>
          child !== space
        );
      }
    }
    // Remove space from spaces
    this.spaces = this.spaces.filter((curr_space) => curr_space !== space);
  }

  getSpaceOwner(space: Space): User {
    return space.owner;
  }

  getSpaceName(space: Space): string {
    return space.name;
  }

  getSpaceType(space: Space): string {
    return space.spaceType;
  }

  getSpaceParent(space: Space): Space | null {
    if (space.parent) {
      return space.parent;
    }
    return null;
  }

  getSpaceChildren(space: Space): Space[] | void {
    if (space.children) {
      return space.children;
    }
    return;
  }

  getSpaceChildrenString(space: Space): string[] | void {
    const chlidren_string: string[] = [];
    if (space.children) {
      for (const child of space.children) {
        chlidren_string.push(child.name);
      }
      return chlidren_string;
    }
    return;
  }

  getSpaces(): Space[] {
    return this.spaces;
  }

  getSpacesString(): string[] {
    const spaces: string[] = [];
    for (const space of this.spaces) {
      spaces.push(space.name);
    }
    return spaces;
  }

  equals(space1: Space, space2: Space): boolean {
    return (space1.owner.username === space2.owner.username &&
      space1.name == space2.name && space1.spaceType == space2.spaceType);
  }
}

```
