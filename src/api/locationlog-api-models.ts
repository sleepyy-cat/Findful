/**
 * Represents the owner of an item or space.
 */
export interface Owner {
  username: string;
}

/**
 * Represents an item being tracked.
 */
export interface Item {
  name: string;
  owner: Owner;
}

/**
 * Represents a physical or logical space.
 */
export interface Space {
  name: string;
  owner: Owner;
}

/**
 * The core LocationLog object, tracking an item's current location and history.
 */
export interface LocationLog {
  thisItem: Item;
  currentSpace: Space;
  locationHistory: Space[];
}

/**
 * Generic error response body.
 */
export interface ErrorResponse {
  error: string;
}

// --- Request Body Interfaces ---

/**
 * Request body for POST /api/LocationLog/createLog
 */
export interface CreateLogRequest {
  thisItem: Item;
  currentSpace: Space;
}

/**
 * Request body for POST /api/LocationLog/placeItem
 */
export interface PlaceItemRequest {
  linkItem: Item;
  linkSpace: Space;
}

/**
 * Request body for POST /api/LocationLog/deleteLog
 */
export interface DeleteLogRequest {
  currItem: Item;
}

/**
 * Request body for POST /api/LocationLog/_getItemLog
 */
export interface GetItemLogRequest {
  item: Item;
}

/**
 * Request body for POST /api/LocationLog/_getLogs
 * (Note: The spec shows an empty object, but explicit type is good)
 */
export type GetLogsRequest = Record<string, never>; // Represents an empty object {}

// --- Response Body Interfaces ---

/**
 * Success response body for POST /api/LocationLog/createLog
 * (It's directly the LocationLog object)
 */
export type CreateLogResponse = LocationLog;

/**
 * Success response body for POST /api/LocationLog/placeItem
 * (Returns an empty object)
 */
export type PlaceItemResponse = Record<string, never>; // Represents an empty object {}

/**
 * Success response body for POST /api/LocationLog/deleteLog
 * (Returns an empty object)
 */
export type DeleteLogResponse = Record<string, never>; // Represents an empty object {}

/**
 * Success response body for POST /api/LocationLog/_getItemLog
 * (Returns an array of LocationLog, typically 0 or 1 for a specific item)
 */
export type GetItemLogResponse = LocationLog[];

/**
 * Success response body for POST /api/LocationLog/_getLogs
 * (Returns an array of all LocationLog objects)
 */
export type GetLogsResponse = LocationLog[];
