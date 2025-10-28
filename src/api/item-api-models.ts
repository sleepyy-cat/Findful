/**
 * Interface for the basic owner structure.
 */
export interface Owner {
  username: string;
}

/**
 * Interface for a full item object.
 */
export interface Item {
  owner: Owner;
  name: string;
  description: string;
  category: string;
}

/**
 * Generic error response structure.
 */
export interface ErrorResponse {
  error: string;
}

// --- Request Body Interfaces ---

/**
 * Request body for creating a new item.
 */
export interface CreateItemRequest {
  owner: Owner;
  name: string;
  description: string;
  category: string;
}

/**
 * Request body for deleting an item.
 * Note: The 'item' field is a full Item object as per spec,
 * but for identification, typically owner.username and name would suffice.
 */
export interface DeleteItemRequest {
  owner: Owner; // The owner attempting to delete
  item: Item; // The item to be deleted (full object as per spec)
}

/**
 * Request body for updating item details.
 * The 'name', 'description', and 'category' fields for the update are optional.
 * Note: The 'item' field is a full Item object as per spec for identification of the item to update.
 */
export interface UpdateItemDetailsRequest {
  owner: Owner; // The owner attempting to update
  item: Item; // The item to be updated (full object as per spec)
  name?: string; // Optional new name
  description?: string; // Optional new description
  category?: string; // Optional new category
}

/**
 * Request body for retrieving an item's owner, name, description, or category.
 * Note: The 'item' field is a full Item object as per spec for identification.
 */
export interface GetItemDetailRequest {
  item: Item; // The item whose detail is to be retrieved (full object as per spec)
}

/**
 * Request body for retrieving items by a specific user.
 */
export interface GetItemsByUserRequest {
  user: Owner; // The user whose items are to be retrieved
}

// --- Response Body Interfaces ---

/**
 * Success response for createItem.
 */
export interface CreateItemSuccessResponse {
  item: Item;
}

/**
 * Success response for deleteItem and updateItemDetails.
 * These operations return an empty object on success.
 */
export type EmptySuccessResponse = Record<string, never>; // Represents {}

/**
 * Success response for _getItemOwner.
 */
export interface GetItemOwnerSuccessResponse {
  ownerUsername: string;
}

/**
 * Success response for _getItemName.
 */
export interface GetItemNameSuccessResponse {
  itemName: string;
}

/**
 * Success response for _getItemDescription.
 */
export interface GetItemDescriptionSuccessResponse {
  itemDescription: string;
}

/**
 * Success response for _getItemCategory.
 */
export interface GetItemCategorySuccessResponse {
  itemCategory: string;
}

/**
 * Success response for _getItems and _getItemsByUser.
 */
export type GetItemsSuccessResponse = Item[];

/**
 * Success response for _getItemsString.
 */
export interface GetItemsStringSuccessResponse {
  itemName: string;
}

/**
 * All success responses are typically wrapped in an array for query endpoints,
 * as per your spec, even for single-value returns.
 */
export type GetItemOwnerQueryResponse = GetItemOwnerSuccessResponse[];
export type GetItemNameQueryResponse = GetItemNameSuccessResponse[];
export type GetItemDescriptionQueryResponse =
  GetItemDescriptionSuccessResponse[];
export type GetItemCategoryQueryResponse = GetItemCategorySuccessResponse[];
export type GetItemsStringQueryResponse = GetItemsStringSuccessResponse[];
