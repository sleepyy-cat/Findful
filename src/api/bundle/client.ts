import axios, { AxiosError, AxiosInstance } from "axios";

// --- 1. Data Interfaces for Request and Response Bodies ---

/**
 * Represents a Bundle object as stored and returned by the API.
 */
export interface Bundle {
  owner: string;
  name: string;
  members: string[]; // Array of item IDs
}

/**
 * Request body for creating or deleting a bundle.
 */
export interface BundleModificationRequest {
  user: string;
  name: string;
}

/**
 * Success response for createBundle.
 */
export interface CreateBundleResponse {
  bundle: Bundle;
}

/**
 * Request body for adding or removing an item from a bundle.
 */
export interface ItemBundleModificationRequest {
  user: string;
  item: string;
  bundleName: string;
}

/**
 * Generic error response structure from the API.
 */
export interface ApiErrorResponse {
  error: string;
}

// --- 2. Bundle API Client Class ---

export class BundleApiClient {
  private apiClient: AxiosInstance;
  private readonly BASE_URL = "/api/Bundle"; // Base path for all bundle endpoints

  /**
   * Initializes the BundleApiClient.
   * @param customBaseURL Optional. Override the default base URL if your server is hosted elsewhere.
   *                      E.g., "http://localhost:3000/api/Bundle"
   */
  constructor(customBaseURL?: string) {
    this.apiClient = axios.create({
      baseURL: customBaseURL || this.BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
      // You might add authentication headers here if needed, e.g.:
      // headers: {
      //   'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      // }
    });
  }

  /**
   * Centralized error handling for API calls.
   * Throws a new Error with a more user-friendly message.
   */
  private handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const apiError = error.response.data as ApiErrorResponse;
        if (apiError && apiError.error) {
          throw new Error(
            `API Error: ${apiError.error} (Status: ${error.response.status})`,
          );
        } else {
          throw new Error(
            `Server Error: ${error.response.status} ${error.response.statusText}`,
          );
        }
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error("Network Error: No response received from server.");
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error(`Request Error: ${error.message}`);
      }
    } else {
      throw new Error(`An unexpected error occurred: ${String(error)}`);
    }
  }

  /**
   * POST /api/Bundle/createBundle
   * Creates a new bundle for a specified user with a given name.
   * @param data Request body containing user ID and bundle name.
   * @returns The newly created bundle object.
   * @throws Error if the user does not exist or a bundle with the same name already exists for the user.
   */
  public async createBundle(data: BundleModificationRequest): Promise<Bundle> {
    try {
      const response = await this.apiClient.post<CreateBundleResponse>(
        "/createBundle",
        data,
      );
      return response.data.bundle;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * POST /api/Bundle/deleteBundle
   * Deletes an existing bundle identified by its name, belonging to a specific user.
   * @param data Request body containing user ID and bundle name.
   * @throws Error if the bundle does not exist or does not belong to the specified user.
   */
  public async deleteBundle(data: BundleModificationRequest): Promise<void> {
    try {
      await this.apiClient.post("/deleteBundle", data);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * POST /api/Bundle/addItemToBundle
   * Adds an item to an existing bundle.
   * @param data Request body containing user ID, item ID, and bundle name.
   * @throws Error if the item or bundle does not exist, they don't belong to the user, or the item is already in the bundle.
   */
  public async addItemToBundle(
    data: ItemBundleModificationRequest,
  ): Promise<void> {
    try {
      await this.apiClient.post("/addItemToBundle", data);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * POST /api/Bundle/removeItemFromBundle
   * Removes an item from an existing bundle.
   * @param data Request body containing user ID, item ID, and bundle name.
   * @throws Error if the item or bundle does not exist, they don't belong to the user, or the item is not in the bundle.
   */
  public async removeItemFromBundle(
    data: ItemBundleModificationRequest,
  ): Promise<void> {
    try {
      await this.apiClient.post("/removeItemFromBundle", data);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * POST /api/Bundle/getBundles
   * Retrieves a list of all bundles currently managed by the concept.
   * Note: The spec uses POST for this, which is unusual for a GET operation,
   * but we follow the spec. The request body is empty.
   * @returns A list of all bundles.
   */
  public async getBundles(): Promise<Bundle[]> {
    try {
      // The spec says POST with an empty body
      const response = await this.apiClient.post<Bundle[]>("/getBundles", {});
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}
