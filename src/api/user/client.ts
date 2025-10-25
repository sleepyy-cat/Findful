import axios, { AxiosError, AxiosInstance } from "axios";
import {
  AuthenticateUserRequest,
  AuthenticateUserSuccessResponse,
  ErrorResponse,
  GetUserNameRequest,
  GetUserNameSuccessResponse,
  GetUsersRequest,
  GetUsersStringRequest,
  GetUsersStringSuccessResponse,
  GetUsersSuccessResponse,
  RegisterUserRequest,
  RegisterUserSuccessResponse,
  User,
  UsernameOnly,
} from "./types.ts"; // Assuming types.ts is in the same directory

/**
 * Configuration for the User API client.
 */
export interface UserApiClientConfig {
  baseURL: string;
  // You might add headers, timeouts, etc. here
}

/**
 * User API Client for managing user registration and authentication.
 */
export class UserApiClient {
  private axiosInstance: AxiosInstance;

  constructor(config: UserApiClientConfig) {
    this.axiosInstance = axios.create({
      baseURL: config.baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      // You can add a timeout here, e.g., timeout: 10000
    });
  }

  /**
   * Helper to handle Axios errors and throw a more specific error message.
   */
  private handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (
        axiosError.response && axiosError.response.data &&
        axiosError.response.data.error
      ) {
        throw new Error(`API Error: ${axiosError.response.data.error}`);
      } else if (axiosError.message) {
        throw new Error(`Network Error: ${axiosError.message}`);
      }
    }
    throw new Error(`An unknown error occurred: ${error}`);
  }

  /**
   * Registers a new user with a unique username and a password.
   * @param data The user registration details (username, password).
   * @returns The newly created User object on success.
   * @throws Error if a user with the given username already exists or other API/network errors occur.
   */
  public async registerUser(
    data: RegisterUserRequest,
  ): Promise<RegisterUserSuccessResponse> {
    try {
      const response = await this.axiosInstance.post<
        RegisterUserSuccessResponse
      >("/api/User/registerUser", data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Authenticates a user based on their username and password.
   * @param data The user's credentials (username, password).
   * @returns An empty object on successful authentication.
   * @throws Error if authentication fails (wrong password, user not found) or other API/network errors occur.
   */
  public async authenticateUser(
    data: AuthenticateUserRequest,
  ): Promise<AuthenticateUserSuccessResponse> {
    try {
      const response = await this.axiosInstance.post<
        AuthenticateUserSuccessResponse
      >("/api/User/authenticateUser", data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Retrieves the username from a provided user object.
   * Note: This implementation does not verify if the user exists in the system;
   * it directly extracts the username from the input object.
   * The spec shows `[{"username": "string"}]` for the response, implying an array.
   * @param data The user object from which to extract the username.
   * @returns An array containing an object with the username.
   * @throws Error if API or network errors occur.
   */
  public async getUserName(
    data: GetUserNameRequest,
  ): Promise<GetUserNameSuccessResponse> {
    try {
      const response = await this.axiosInstance.post<
        GetUserNameSuccessResponse
      >("/api/User/_getUserName", data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Retrieves a list of all registered user objects.
   * @param data An empty object (as per spec, no request body parameters).
   * @returns An array containing all full User objects currently registered in the system.
   * @throws Error if API or network errors occur.
   */
  public async getUsers(
    data: GetUsersRequest = {},
  ): Promise<GetUsersSuccessResponse> {
    try {
      const response = await this.axiosInstance.post<GetUsersSuccessResponse>(
        "/api/User/_getUsers",
        data,
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Retrieves a list of all registered usernames.
   * @param data An empty object (as per spec, no request body parameters).
   * @returns An array containing objects with the username for each user.
   * @throws Error if API or network errors occur.
   */
  public async getUsersString(
    data: GetUsersStringRequest = {},
  ): Promise<GetUsersStringSuccessResponse> {
    try {
      const response = await this.axiosInstance.post<
        GetUsersStringSuccessResponse
      >("/api/User/_getUsersString", data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}
