// item-api.types.ts
import { ErrorResponse, Item, Owner } from "./types.ts"; // Adjust path as needed

// General Query Request for a specific item (used by multiple _getItem methods)
export interface GetItemQueryRequest {
  item: Item;
}

// --- POST /api/Item/createItem ---
export interface CreateItemRequest {
  owner: Owner;
  name: string;
  description: string;
  category: string;
}

export interface CreateItemSuccessResponse {
  item: Item;
}

// --- POST /api/Item/deleteItem ---
export interface DeleteItemRequest {
  owner: Owner; // The user initiating the deletion
  item: Item; // The item to be deleted (full details for identification/validation)
}
// Success response is an empty object {}

// --- POST /api/Item/updateItemDetails ---
export interface UpdateItemDetailsRequest {
  owner: Owner; // The user initiating the update
  item: Item; // The original item to identify (full details for identification/validation)
  name?: string; // Optional new name
  description?: string; // Optional new description
  category?: string; // Optional new category
}
// Success response is an empty object {}

// --- POST /api/Item/_getItemOwner ---
// Request: GetItemQueryRequest
export interface GetItemOwnerSuccessResponse {
  ownerUsername: string;
}
// Note: Your spec shows this as an array: `[{ "ownerUsername": "string" }]`.
// For a single item, `GetItemOwnerSuccessResponse` without the array is more common.
// I'll implement it as an array to match your spec exactly, but typically it would be just the object.
export type GetItemOwnerArrayResponse = GetItemOwnerSuccessResponse[];

// --- POST /api/Item/_getItemName ---
// Request: GetItemQueryRequest
export interface GetItemNameSuccessResponse {
  itemName: string;
}
export type GetItemNameArrayResponse = GetItemNameSuccessResponse[];

// --- POST /api/Item/_getItemDescription ---
// Request: GetItemQueryRequest
export interface GetItemDescriptionSuccessResponse {
  itemDescription: string;
}
export type GetItemDescriptionArrayResponse =
  GetItemDescriptionSuccessResponse[];

// --- POST /api/Item/_getItemCategory ---
// Request: GetItemQueryRequest
export interface GetItemCategorySuccessResponse {
  itemCategory: string;
}
export type GetItemCategoryArrayResponse = GetItemCategorySuccessResponse[];

// --- POST /api/Item/_getItems ---
// Request: {} (empty object)
export type GetItemsSuccessResponse = Item[]; // An array of full Item objects

// --- POST /api/Item/_getItemsString ---
// Request: {} (empty object)
export interface ItemNameOnly {
  itemName: string;
}
export type GetItemsStringSuccessResponse = ItemNameOnly[]; // An array of objects with itemName

// --- POST /api/Item/_getItemsByUser ---
export interface GetItemsByUserRequest {
  user: Owner; // The user whose items are to be retrieved
}
export type GetItemsByUserSuccessResponse = Item[]; // An array of full Item objects
