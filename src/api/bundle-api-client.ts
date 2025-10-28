import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import {
  AddItemToBundleRequest,
  Bundle,
  CreateBundleRequest,
  CreateBundleResponse,
  DeleteBundleRequest,
  EmptySuccessResponse,
  ErrorResponse,
  GetBundlesRequest, // Although empty, useful for explicit typing
  GetBundlesResponse,
  RemoveItemFromBundleRequest,
} from "./bundle-api-models.ts"; // Adjust path if your models file is elsewhere

/**
 * Client for interacting with the Bundle API.
 * Provides methods for creating, deleting, and managing bundles and their items.
 */
export class BundleApiClient {
  private axiosInstance: AxiosInstance;
  private readonly BUNDLE_BASE_PATH: string = "/api/Bundle"; // Base path for all bundle endpoints

  /**
   * Constructs a new BundleApiClient instance.
   * @param baseURL The base URL for the API (e.g., 'http://localhost:3000').
   * @param axiosInstance An optional custom Axios instance. If not provided, a default one will be created.
   *                      Useful for injecting pre-configured instances (e.g., with interceptors, auth headers).
   */
  constructor(baseURL: string, axiosInstance?: AxiosInstance) {
    this.axiosInstance = axiosInstance || axios.create({
      baseURL: baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Creates a new bundle for a specified user with a given name.
   *
   * Endpoint: POST /api/Bundle/createBundle
   *
   * @param request The data for creating the bundle.
   * @returns A promise that resolves with the newly created Bundle object.
   * @throws AxiosError<ErrorResponse> if the API call fails.
   */
  public async createBundle(request: CreateBundleRequest): Promise<Bundle> {
    try {
      const response: AxiosResponse<CreateBundleResponse> = await this
        .axiosInstance.post(
          `${this.BUNDLE_BASE_PATH}/createBundle`,
          request,
        );
      return response.data.bundle;
    } catch (error) {
      this.handleError(error, "createBundle");
      throw error; // Re-throw the handled error for upstream consumption
    }
  }

  /**
   * Deletes an existing bundle identified by its name, belonging to a specific user.
   *
   * Endpoint: POST /api/Bundle/deleteBundle
   *
   * @param request The data for identifying the bundle to delete.
   * @returns A promise that resolves with an empty object on successful deletion.
   * @throws AxiosError<ErrorResponse> if the API call fails.
   */
  public async deleteBundle(
    request: DeleteBundleRequest,
  ): Promise<EmptySuccessResponse> {
    try {
      const response: AxiosResponse<EmptySuccessResponse> = await this
        .axiosInstance.post(
          `${this.BUNDLE_BASE_PATH}/deleteBundle`,
          request,
        );
      return response.data;
    } catch (error) {
      this.handleError(error, "deleteBundle");
      throw error;
    }
  }

  /**
   * Adds an item to an existing bundle, provided both belong to the specified user.
   *
   * Endpoint: POST /api/Bundle/addItemToBundle
   *
   * @param request The data for adding an item to a bundle.
   * @returns A promise that resolves with an empty object on successful addition.
   * @throws AxiosError<ErrorResponse> if the API call fails.
   */
  public async addItemToBundle(
    request: AddItemToBundleRequest,
  ): Promise<EmptySuccessResponse> {
    try {
      const response: AxiosResponse<EmptySuccessResponse> = await this
        .axiosInstance.post(
          `${this.BUNDLE_BASE_PATH}/addItemToBundle`,
          request,
        );
      return response.data;
    } catch (error) {
      this.handleError(error, "addItemToBundle");
      throw error;
    }
  }

  /**
   * Removes an item from an existing bundle, provided both belong to the specified user.
   *
   * Endpoint: POST /api/Bundle/removeItemFromBundle
   *
   * @param request The data for removing an item from a bundle.
   * @returns A promise that resolves with an empty object on successful removal.
   * @throws AxiosError<ErrorResponse> if the API call fails.
   */
  public async removeItemFromBundle(
    request: RemoveItemFromBundleRequest,
  ): Promise<EmptySuccessResponse> {
    try {
      const response: AxiosResponse<EmptySuccessResponse> = await this
        .axiosInstance.post(
          `${this.BUNDLE_BASE_PATH}/removeItemFromBundle`,
          request,
        );
      return response.data;
    } catch (error) {
      this.handleError(error, "removeItemFromBundle");
      throw error;
    }
  }

  /**
   * Retrieves a list of all bundles currently managed by the concept.
   *
   * Endpoint: POST /api/Bundle/getBundles
   * Note: This is a POST request with an empty body as per specification.
   *
   * @returns A promise that resolves with an array of Bundle objects.
   * @throws AxiosError<ErrorResponse> if the API call fails.
   */
  public async getBundles(): Promise<Bundle[]> {
    try {
      const requestBody: GetBundlesRequest = {}; // Empty request body
      const response: AxiosResponse<GetBundlesResponse> = await this
        .axiosInstance.post(
          `${this.BUNDLE_BASE_PATH}/getBundles`,
          requestBody,
        );
      return response.data;
    } catch (error) {
      this.handleError(error, "getBundles");
      throw error;
    }
  }

  /**
   * Generic error handler for Axios requests.
   * Logs the error details and provides a consistent way to handle API errors.
   *
   * @param error The raw error object caught from an Axios request.
   * @param methodName The name of the client method where the error occurred, for better logging.
   */
  private handleError(error: unknown, methodName: string): void {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>; // Cast for specific error response type
      if (axiosError.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx.
        console.error(
          `BundleApiClient - ${methodName} failed: Status ${axiosError.response.status}`,
          `Data:`,
          axiosError.response.data,
          `Headers:`,
          axiosError.response.headers,
        );
        if (axiosError.response.data?.error) {
          console.error(
            `BundleApiClient - ${methodName} error message: ${axiosError.response.data.error}`,
          );
        }
      } else if (axiosError.request) {
        // The request was made but no response was received.
        // `error.request` is an instance of XMLHttpRequest in the browser and an http.ClientRequest in node.js
        console.error(
          `BundleApiClient - ${methodName} failed: No response received.`,
          axiosError.request,
        );
      } else {
        // Something happened in setting up the request that triggered an Error.
        console.error(
          `BundleApiClient - ${methodName} failed: Request setup error.`,
          axiosError.message,
        );
      }
    } else {
      // Handle non-Axios errors (e.g., programming errors, network issues not caught by Axios)
      console.error(
        `BundleApiClient - ${methodName} failed: An unexpected error occurred.`,
        error,
      );
    }
    // Optionally, you could throw a custom client-specific error here
    // e.g., throw new BundleApiError(errorMessage, originalError);
  }
}
