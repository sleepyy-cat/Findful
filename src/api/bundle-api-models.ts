/**
 * Interface for a generic error response from the API.
 */
export interface ErrorResponse {
  error: string;
}

/**
 * Type alias for an empty object success response.
 * Many POST actions return an empty object {} on success.
 */
export type EmptySuccessResponse = Record<string, never>; // Represents {}

// --- Core Bundle Entity ---

/**
 * Represents a Bundle object, containing its owner, name, and a list of item IDs.
 */
export interface Bundle {
  owner: string; // The ID of the user who owns this bundle
  name: string; // The unique name of the bundle for the owner
  members: string[]; // An array of item IDs (strings) that belong to this bundle
}

// --- Request Body Interfaces ---

/**
 * Request body for POST /api/Bundle/createBundle.
 */
export interface CreateBundleRequest {
  user: string; // The ID of the user creating the bundle
  name: string; // The desired name for the new bundle
}

/**
 * Request body for POST /api/Bundle/deleteBundle.
 */
export interface DeleteBundleRequest {
  user: string; // The ID of the user who owns the bundle
  name: string; // The name of the bundle to delete
}

/**
 * Request body for POST /api/Bundle/addItemToBundle.
 */
export interface AddItemToBundleRequest {
  user: string; // The ID of the user who owns the bundle and item
  item: string; // The ID of the item to add
  bundleName: string; // The name of the bundle to add the item to
}

/**
 * Request body for POST /api/Bundle/removeItemFromBundle.
 */
export interface RemoveItemFromBundleRequest {
  user: string; // The ID of the user who owns the bundle and item
  item: string; // The ID of the item to remove
  bundleName: string; // The name of the bundle to remove the item from
}

/**
 * Request body for POST /api/Bundle/getBundles.
 * This endpoint has an empty request body.
 */
export type GetBundlesRequest = EmptySuccessResponse; // Use EmptySuccessResponse for clarity
// Alternatively, you could just use {} in the client call directly.

// --- Success Response Body Interfaces ---

/**
 * Success response body for POST /api/Bundle/createBundle.
 */
export interface CreateBundleResponse {
  bundle: Bundle; // The newly created bundle object
}

/**
 * Success response body for POST /api/Bundle/getBundles.
 * This returns an array of Bundle objects.
 */
export type GetBundlesResponse = Bundle[];
