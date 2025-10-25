/**
 * Represents a full User object with username and password.
 * Used for registration, authentication requests, and getting full user details.
 */
export interface User {
  username: string;
  password: string;
}

/**
 * Represents an object containing only a username.
 * Used for responses that only return the username.
 */
export interface UsernameOnly {
  username: string;
}

/**
 * Common error response structure for all API calls.
 */
export interface ErrorResponse {
  error: string;
}

// --- registerUser ---
export type RegisterUserRequest = User; // Same as User interface
export interface RegisterUserSuccessResponse {
  user: User;
}

// --- authenticateUser ---
export type AuthenticateUserRequest = User; // Same as User interface
export interface AuthenticateUserSuccessResponse {} // Empty object

// --- _getUserName ---
export interface GetUserNameRequest {
  user: User;
}
export type GetUserNameSuccessResponse = UsernameOnly[]; // Array of UsernameOnly objects

// --- _getUsers ---
export interface GetUsersRequest {} // Empty object for request
export type GetUsersSuccessResponse = User[]; // Array of full User objects

// --- _getUsersString ---
export interface GetUsersStringRequest {} // Empty object for request
export type GetUsersStringSuccessResponse = UsernameOnly[]; // Array of UsernameOnly objects
