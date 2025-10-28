// Basic User structure used in requests and some responses
export interface User {
  username: string;
  password: string; // Note: In a real-world app, you'd never send/receive raw passwords like this.
  // This is for demonstration based on your spec.
}

// Common Error Response
export interface ErrorResponse {
  error: string;
}

// --- POST /api/User/registerUser ---
export interface RegisterUserRequest {
  username: string;
  password: string;
}

export interface RegisterUserSuccessResponse {
  user: User;
}

// --- POST /api/User/authenticateUser ---
export interface AuthenticateUserRequest {
  username: string;
  password: string;
}

// The success response is an empty object
export interface AuthenticateUserSuccessResponse {}

// --- POST /api/User/_getUserName ---
export interface GetUserNameRequest {
  user: User;
}

export interface GetUserNameSuccessResponse {
  username: string;
}

// --- POST /api/User/_getUsers ---
export interface GetUsersSuccessResponse {
  // The spec shows an array directly, not an object containing an array.
  // So, the response type is an array of User objects.
  // Example: [{ username: "user1", password: "pwd1" }, { username: "user2", password: "pwd2" }]
  [index: number]: User;
}

// --- POST /api/User/_getUsersString ---
export interface GetUsersStringSuccessResponse {
  // The spec shows an array of objects, each with a 'username' property.
  // Example: [{ username: "user1" }, { username: "user2" }]
  [index: number]: { username: string };
}
