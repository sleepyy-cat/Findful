import axios, { AxiosError, AxiosInstance } from "axios";
import {
  AuthenticateUserRequest,
  AuthenticateUserSuccessResponse,
  ErrorResponse,
  GetUserNameRequest,
  GetUserNameSuccessResponse,
  GetUsersStringSuccessResponse,
  GetUsersSuccessResponse,
  RegisterUserRequest,
  RegisterUserSuccessResponse,
} from "./user-api-models.ts"; // Adjust path if needed

/**
 * Client for the User API concept.
 * Handles user registration, authentication, and retrieval.
 */
export class UserApiClient {
  private axiosInstance: AxiosInstance;
  private readonly BASE_PATH = "/api/User";

  /**
   * Creates an instance of UserApiClient.
   * @param baseURL The base URL for the API (e.g., 'http://localhost:3000').
   *                The '/api/User' prefix will be appended automatically.
   * @param instance An optional pre-configured Axios instance. If not provided,
   *                 a new one will be created.
   */
  constructor(baseURL: string = "", instance?: AxiosInstance) {
    if (instance) {
      this.axiosInstance = instance;
    } else {
      this.axiosInstance = axios.create({
        baseURL: `${baseURL}${this.BASE_PATH}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }

  /**
   * Registers a new user.
   * @param data The username and password for the new user.
   * @returns A promise that resolves with the created user object on success.
   * @throws ErrorResponse if a user with the given username already exists.
   */
  public async registerUser(
    data: RegisterUserRequest,
  ): Promise<RegisterUserSuccessResponse> {
    try {
      const response = await this.axiosInstance.post<
        RegisterUserSuccessResponse
      >(
        "/registerUser",
        data,
      );
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  /**
   * Authenticates a user.
   * @param data The username and password to authenticate.
   * @returns A promise that resolves with an empty object on success.
   * @throws ErrorResponse if authentication fails (wrong password or user not found).
   */
  public async authenticateUser(
    data: AuthenticateUserRequest,
  ): Promise<AuthenticateUserSuccessResponse> {
    try {
      const response = await this.axiosInstance.post<
        AuthenticateUserSuccessResponse
      >(
        "/authenticateUser",
        data,
      );
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  /**
   * Retrieves the username from a provided user object.
   * Note: This client-side call relies on the server to simply extract the username
   * from the provided `user` object in the request body, not verify its existence in the system.
   * @param data The user object from which to extract the username.
   * @returns A promise that resolves with an object containing the username.
   */
  public async getUserName(
    data: GetUserNameRequest,
  ): Promise<GetUserNameSuccessResponse> {
    try {
      const response = await this.axiosInstance.post<
        GetUserNameSuccessResponse
      >(
        "/_getUserName",
        data,
      );
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  /**
   * Retrieves a list of all registered user objects.
   * @returns A promise that resolves with an array of User objects.
   */
  public async getUsers(): Promise<GetUsersSuccessResponse> {
    try {
      // Empty request body as per spec
      const response = await this.axiosInstance.post<GetUsersSuccessResponse>(
        "/_getUsers",
        {},
      );
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  /**
   * Retrieves a list of all registered usernames (strings).
   * @returns A promise that resolves with an array of objects, each containing a username string.
   */
  public async getUsersString(): Promise<GetUsersStringSuccessResponse> {
    try {
      // Empty request body as per spec
      const response = await this.axiosInstance.post<
        GetUsersStringSuccessResponse
      >(
        "/_getUsersString",
        {},
      );
      return response.data;
    } catch (error) {
      this.handleAxiosError(error);
    }
  }

  /**
   * Generic error handler for Axios responses.
   * Throws an Error object with the server's error message, or a generic one.
   * @param error The AxiosError object.
   * @throws Error
   */
  private handleAxiosError(error: unknown): never {
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
    throw new Error("An unexpected error occurred.");
  }
}
