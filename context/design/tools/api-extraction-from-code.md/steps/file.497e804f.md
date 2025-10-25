---
timestamp: 'Fri Oct 24 2025 23:27:31 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251024_232731.5fa4b2c5.md]]'
content_id: 497e804ffdd53875975ce296344f5b03288ee32e132047d2f581b718a96c8a2e
---

# file: src\concepts\Item\ItemConcept.ts

```typescript
import { User } from "@concepts/User/implementation.ts";

// A single item
export interface Item {
  owner: User;
  name: string;
  description: string;
  category: string;
}

export class Items {
  private items: Item[] = [];

  createItem(
    owner: User,
    name: string,
    description = "",
    category = "",
  ): Item | void {
    // Check that item name is unique among user's items
    for (const item of this.items) {
      if (item.owner.username == owner.username && item.name == name) {
        console.log("item already exists in user's inventory");
        return;
      }
    }
    const item: Item = {
      owner,
      name,
      description,
      category,
    };
    // Add item to list of items
    this.items.push(item);
    return item;
  }

  deleteItem(owner: User, item: Item): void {
    if (item.owner.username !== owner.username) {
      console.log("item does not belong to this user");
      return;
    }
    if (!this.items.includes(item)) {
      console.log("item does not exist");
      return;
    }
    this.items = this.items.filter((a) => a !== item);
  }

  updateItemDetails(
    owner: User,
    item: Item,
    name?: string,
    description = "",
    category = "",
  ): void {
    if (!this.items.includes(item)) {
      console.log("item does not exist");
      return;
    }
    if (item.owner.username !== owner.username) {
      console.log("item does not belong to user");
      return;
    }
    if (name) {
      let duplicate_name = false;
      for (const currItem of this.items) {
        if (
          !this.equals(currItem, item) &&
          currItem.owner.username === owner.username &&
          currItem.name === name
        ) {
          console.log("item name already exists in user's inventory");
          duplicate_name = true;
          break;
        }
      }
      if (!duplicate_name) {
        item.name = name;
      }
    }
    if (description) {
      item.description = description;
    }
    if (category) {
      item.category = category;
    }
  }

  getItemOwner(item: Item): string {
    return item.owner.username;
  }

  getItemName(item: Item): string {
    return item.name;
  }

  getItemDescription(item: Item): string {
    return item.description;
  }

  getItemCategory(item: Item): string {
    return item.category;
  }

  getItems(): Item[] {
    return this.items;
  }

  getItemsString(): string[] {
    const items: string[] = [];
    for (const item of this.items) {
      items.push(item.name);
    }
    return items;
  }

  getItemsByUser(user: User): Item[] {
    const items: Item[] = [];
    for (const item of this.items) {
      if (item.owner.username == user.username) {
        items.push(item);
      }
    }
    return items;
  }

  itemToString(item: Item): string {
    return "{owner: " + item.owner.username + ", name: " + item.name +
      ", description: " +
      item.description + ", category: " + item.category + "}";
  }

  itemsToString(items: Item[]): string {
    let result = "";
    for (const item of items) {
      result = result + this.itemToString(item) + ", ";
    }
    result = result.slice(0, result.length - 2);
    return "[" + result + "]";
  }

  equals(item1: Item, item2: Item): boolean {
    return (item1.owner.username === item2.owner.username &&
      item1.name === item2.name &&
      item1.description === item2.description &&
      item1.category === item2.category);
  }
}

```
