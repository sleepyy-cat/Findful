/**
 * Item Concept - AI Augmented Version
 */

import { GeminiLLM } from "@utils/gemini-llm.ts";

// A single item
export interface Item {
  owner: string;
  name: string;
  description: string;
  tags: string[];
}

export class Items {
  private items: Item[] = [];

  createItem(
    owner: string,
    name: string,
    description = "",
    tags = [],
  ): Item | void {
    for (const item of this.items) {
      if (item.name == name) {
        console.error("item already exists");
        return;
      }
    }
    const item: Item = {
      owner,
      name,
      description,
      tags,
    };
    this.items.push(item);
    return item;
  }

  deleteItem(item: Item): void {
    this.items = this.items.filter((a) => a !== item);
  }

  getItemOwner(item: Item): string {
    return item.owner;
  }

  getItemName(item: Item): string {
    return item.name;
  }

  getItemDescription(item: Item): string {
    return item.description;
  }

  getItemTags(item: Item): string[] {
    return item.tags;
  }

  updateItemDetails(
    item: Item,
    name?: string,
    description = "",
    tags = [],
  ): void {
    if (name) {
      item.name = name;
    }
    if (description) {
      item.description = description;
    }
    if (name) {
      item.tags = tags;
    }
  }

  getItems(): Item[] {
    const items: Item[] = [];
    for (const item of this.items) {
      items.push(item);
    }
    return items;
  }

  getItemsString(): string[] {
    const items: string[] = [];
    for (const item of this.items) {
      items.push(item.name);
    }
    return items;
  }

  itemToString(item: Item): string {
    const tags = "[" + item.tags.join(" ") + "]";
    return "{owner: " + item.owner + ", name: " + item.name +
      ", description: " +
      item.description + ", tags: " + tags + "}";
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
    let tags_equal = true;
    for (let i = 0; i < item1.tags.length; i++) {
      if (item1.tags[i] !== item2.tags[i]) {
        tags_equal = false;
        break;
      }
    }
    return (item1.owner === item2.owner && item1.name === item2.name &&
      item1.description === item2.description && tags_equal);
  }

  async lookupItem(search: string, llm: GeminiLLM): Promise<Item[]> {
    for (const item of this.items) {
      if (item.name == search) {
        return [item];
      }
    }
    try {
      console.log("🤖 Requesting items matching user input from Gemini AI...");
      const prompt = this.createAssignmentPrompt(search);
      const text = await llm.executeLLM(prompt);

      console.log("✅ Received response from Gemini AI!");
      console.log("\n🤖 RAW GEMINI RESPONSE");
      console.log("======================");
      console.log(text);
      console.log("======================\n");

      // Parse and return the items
      const items = this.parseAndReturnItems(text);
      return items;
    } catch (error) {
      console.error("❌ Error calling Gemini API:", (error as Error).message);
      throw error;
    }
  }

  /**
   * Helper functions and queries follow
   */

  /**
   * Create the prompt for Gemini with hardwired preferences
   */
  private createAssignmentPrompt(search: string): string {
    const criticalRequirements = [
      "1. ONLY return items that exist in the user's provided items list",
      "2. Return ALL items that match the user input",
      "3. NEVER modify the original item data in ANY way",
      "4. If no matches are found, return an empty array - don't invent alternatives",
      "5. DO NOT create new items - only use the exact items from the provided list",
    ];
    const itemsList = this.items.map((item) =>
      `"${item.name}": {owner: "${item.owner}", name: "${item.name}", description: "${
        item.description || ""
      }", tags: [${(item.tags || []).map((tag) => `"${tag}"`).join(", ")}]}`
    ).join("\n");
    return `
       
You are a helpful AI assistant that returns items for users matching their search inputs.

USER'S INVENTORY ITEMS (ONLY USE THESE EXACT ITEMS):
${itemsList}

USER SEARCH QUERY: "${search}"

CRITICAL REQUIREMENTS:
${criticalRequirements.join("\n")}

MATCHING RULES:
- Return items where the name OR description contains words related to "${search}"
- Be flexible with typos, synonyms, and related terms
- But ONLY return items that actually exist in the inventory above

USER PREFERENCES:
- Be flexible with typoes, synonyms, related terms, and abbreviations
- Return items where the name or description contains words related to "${search}"
- ONLY return items that actually exist in the inventory above

Return your response as a JSON object with this exact structure:
{
  "items": [list_of_valid_existing_user_item_objects]
}

Return ONLY the JSON object, no additional text.`;
  }

  /**
   * Parse the LLM response and return the generated items
   */
  private parseAndReturnItems(responseText: string): Item[] {
    try {
      // Extract JSON from response (in case there's extra text)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }

      const response = JSON.parse(jsonMatch[0]);

      if (!response.items || !Array.isArray(response.items)) {
        throw new Error("Invalid response format");
      }

      console.log("📝 Applying LLM items...");
      const all_items: Item[] = [];
      const issues: string[] = [];

      console.log("current items = " + this.itemsToString(response.items));

      for (const item of response.items) {
        const owner = this.getItemOwner(item);
        const name = this.getItemName(item);
        const description = this.getItemDescription(item);
        const tags = this.getItemTags(item);
        const curr_item: Item = {
          owner,
          name,
          description,
          tags,
        };
        if (typeof owner !== "string" || owner.trim().length === 0) {
          issues.push("Item is missing a valid owner.");
          continue;
        }
        if (typeof name !== "string" || name.trim().length === 0) {
          issues.push("Item is missing a valid name.");
          continue;
        }
        if (issues.length > 0) {
          throw new Error(
            `LLM provided disallowed items:\n- ${issues.join("\n- ")}`,
          );
        }
        let item_exists = false;
        for (const item of this.items) {
          if (this.equals(item, curr_item)) {
            item_exists = true;
            break;
          }
        }
        console.assert(item_exists, "hallucinated items");
        all_items.push(curr_item);
      }
      return all_items;
    } catch (error) {
      console.error("❌ Error parsing LLM response:", (error as Error).message);
      console.log("Response was:", responseText);
      throw error;
    }
  }
}
