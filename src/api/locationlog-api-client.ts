import axios, { AxiosInstance, AxiosResponse } from "axios";
import {
  // Request Bodies
  CreateLogRequest,
  // Response Bodies
  CreateLogResponse,
  DeleteLogRequest,
  DeleteLogResponse,
  ErrorResponse,
  GetItemLogRequest,
  GetItemLogResponse,
  GetLogsRequest,
  GetLogsResponse,
  PlaceItemRequest,
  PlaceItemResponse,
} from "./locationlog-api-models.ts"; // Adjust path if needed

/**
 * Base URL for the LocationLog API.
 * You might want to make this configurable via environment variables or constructor.
 */
const BASE_URL = "http://localhost:3000/api/LocationLog"; // Replace with your actual API base URL

/**
 * Client for interacting with the LocationLog API.
 */
export class LocationLogApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string = BASE_URL, customAxiosInstance?: AxiosInstance) {
    this.axiosInstance = customAxiosInstance || axios.create({ baseURL });
  }

  /**
   * Creates a new location log for a given item in a specified space.
   *
   * @param request The item and current space to create the log for.
   * @returns A Promise resolving to the newly created LocationLog object.
   * @throws An error if the API call fails or preconditions are not met.
   */
  public async createLog(
    request: CreateLogRequest,
  ): Promise<CreateLogResponse> {
    try {
      const response: AxiosResponse<CreateLogResponse> = await this
        .axiosInstance.post(
          "/createLog",
          request,
        );
      return response.data;
    } catch (error) {
      this.handleError(error, "createLog");
    }
  }

  /**
   * Places an item into a specified space, updating its current location and history,
   * or creating a new log if one doesn't exist.
   *
   * @param request The item and space to link.
   * @returns A Promise resolving to an empty object on success (void for practical use).
   * @throws An error if the API call fails or preconditions are not met.
   */
  public async placeItem(request: PlaceItemRequest): Promise<void> {
    try {
      await this.axiosInstance.post<PlaceItemResponse>("/placeItem", request);
      // No data returned, so we resolve with void
    } catch (error) {
      this.handleError(error, "placeItem");
    }
  }

  /**
   * Deletes the location log associated with a specific item.
   *
   * @param request The item whose log should be deleted.
   * @returns A Promise resolving to an empty object on success (void for practical use).
   * @throws An error if the API call fails or the log does not exist.
   */
  public async deleteLog(request: DeleteLogRequest): Promise<void> {
    try {
      await this.axiosInstance.post<DeleteLogResponse>("/deleteLog", request);
      // No data returned, so we resolve with void
    } catch (error) {
      this.handleError(error, "deleteLog");
    }
  }

  /**
   * Retrieves the location log for a specific item.
   *
   * @param request The item to retrieve the log for.
   * @returns A Promise resolving to an array containing the LocationLog object (if found) or an empty array.
   * @throws An error if the API call fails.
   */
  public async getItemLog(
    request: GetItemLogRequest,
  ): Promise<GetItemLogResponse> {
    try {
      const response: AxiosResponse<GetItemLogResponse> = await this
        .axiosInstance.post(
          "/_getItemLog",
          request,
        );
      return response.data;
    } catch (error) {
      this.handleError(error, "getItemLog");
    }
  }

  /**
   * Retrieves all existing location logs.
   *
   * @returns A Promise resolving to an array containing all LocationLog objects.
   * @throws An error if the API call fails.
   */
  public async getLogs(): Promise<GetLogsResponse> {
    try {
      // The request body is an empty object {}
      const request: GetLogsRequest = {};
      const response: AxiosResponse<GetLogsResponse> = await this.axiosInstance
        .post(
          "/_getLogs",
          request,
        );
      return response.data;
    } catch (error) {
      this.handleError(error, "getLogs");
    }
  }

  /**
   * A private helper method to handle API errors.
   * It logs the error and re-throws it, potentially transforming it into a custom error type.
   * @param error The error object caught from the axios call.
   * @param methodName The name of the client method where the error occurred.
   */
  private handleError(error: unknown, methodName: string): never {
    if (axios.isAxiosError(error)) {
      const errorData: ErrorResponse | undefined = error.response?.data;
      const errorMessage = errorData?.error || error.message;
      console.error(
        `LocationLogApiClient - ${methodName} failed: ${errorMessage}`,
        error.response || error,
      );
      throw new Error(`API Error in ${methodName}: ${errorMessage}`);
    } else {
      console.error(`An unexpected error occurred in ${methodName}:`, error);
      throw new Error(`Unexpected error in ${methodName}: ${String(error)}`);
    }
  }
}
