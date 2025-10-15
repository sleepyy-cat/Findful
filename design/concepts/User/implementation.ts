// A single user
export interface User {
  username: string;
  password: string;
}

export class Users {
  private users: User[] = [];

  registerUser(
    username: string,
    password: string,
  ): User | void {
    for (const user of this.users) {
      if (user.username == username) {
        console.error("user with username already exists");
        return;
      }
    }
    const user: User = {
      username,
      password,
    };
    this.users.push(user);
    return user;
  }

  authenticateUser(
    username: string,
    password: string,
  ): void {
    for (const user of this.users) {
      if (user.username == username) {
        if (user.password == password) {
          console.log("success");
          return;
        } else {
          console.log("wrong password, try again");
          return;
        }
      }
    }
    console.error("user not found");
    return;
  }

  //   deleteItem(item: Item): void {
  //     this.items = this.items.filter((a) => a !== item);
  //   }

  //   getItemOwner(item: Item): string {
  //     return item.owner;
  //   }

  //   getItemName(item: Item): string {
  //     return item.name;
  //   }

  //   getItemDescription(item: Item): string {
  //     return item.description;
  //   }

  //   getItemTags(item: Item): string[] {
  //     return item.tags;
  //   }

  //   updateItemDetails(
  //     item: Item,
  //     name?: string,
  //     description = "",
  //     tags = [],
  //   ): void {
  //     if (name) {
  //       item.name = name;
  //     }
  //     if (description) {
  //       item.description = description;
  //     }
  //     if (name) {
  //       item.tags = tags;
  //     }
  //   }

  //   getItems(): Item[] {
  //     const items: Item[] = [];
  //     for (const item of this.items) {
  //       items.push(item);
  //     }
  //     return items;
  //   }

  //   getItemsString(): string[] {
  //     const items: string[] = [];
  //     for (const item of this.items) {
  //       items.push(item.name);
  //     }
  //     return items;
  //   }

  //   itemToString(item: Item): string {
  //     const tags = "[" + item.tags.join(" ") + "]";
  //     return "{owner: " + item.owner + ", name: " + item.name +
  //       ", description: " +
  //       item.description + ", tags: " + tags + "}";
  //   }

  //   itemsToString(items: Item[]): string {
  //     let result = "";
  //     for (const item of items) {
  //       result = result + this.itemToString(item) + ", ";
  //     }
  //     result = result.slice(0, result.length - 2);
  //     return "[" + result + "]";
  //   }

  //   equals(item1: Item, item2: Item): boolean {
  //     let tags_equal = true;
  //     for (let i = 0; i < item1.tags.length; i++) {
  //       if (item1.tags[i] !== item2.tags[i]) {
  //         tags_equal = false;
  //         break;
  //       }
  //     }
  //     return (item1.owner === item2.owner && item1.name === item2.name &&
  //       item1.description === item2.description && tags_equal);
  //   }
}
