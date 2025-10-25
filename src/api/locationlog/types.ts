// src/api/locationLog/types.ts

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
 * Represents a space where an item can be located.
 */
export interface Space {
  name: string;
  owner: Owner;
}

/**
 * Represents a full location log for an item.
 */
export interface LocationLog {
  thisItem: Item;
  currentSpace: Space;
  locationHistory: Space[];
}

/**
 * Standard error response body from the API.
 */
export interface ApiErrorResponse {
  error: string;
}

// Custom error class for better client-side error handling
export class LocationLogApiError extends Error {
  public readonly statusCode?: number;
  public readonly originalError?: unknown;

  constructor(message: string, statusCode?: number, originalError?: unknown) {
    super(message);
    this.name = "LocationLogApiError";
    this.statusCode = statusCode;
    this.originalError = originalError;

    // Set the prototype explicitly to make 'instanceof' work correctly in ES5/ES6.
    Object.setPrototypeOf(this, LocationLogApiError.prototype);
  }
}
