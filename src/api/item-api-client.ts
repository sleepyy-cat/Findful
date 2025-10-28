import axios, { AxiosError, AxiosInstance } from "axios";
import {
  // Request Interfaces
  CreateItemRequest,
  // Response Interfaces
  CreateItemSuccessResponse,
  DeleteItemRequest,
  EmptySuccessResponse,
  ErrorResponse,
  GetItemCategoryQueryResponse,
  GetItemDescriptionQueryResponse,
  GetItemDetailRequest,
  GetItemNameQueryResponse,
  GetItemOwnerQueryResponse,
  GetItemsByUserRequest,
  GetItemsStringQueryResponse,
  GetItemsSuccessResponse,
  UpdateItemDetailsRequest,
} from "./item-api-models.ts"; // Adjust path if necessary

/**
 * API client for managing Item operations.
 */
export class ItemApiClient {
  private axiosInstance: AxiosInstance;
  private readonly ITEM_BASE_PATH = "/api/Item";

  /**
   * Constructs the ItemApiClient.
   * @param axiosInstance An already configured Axios instance (e.g., with base URL, headers).
   */
  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  // --- Action Endpoints ---

  /**
   * Creates a new item for a specified owner.
   * POST /api/Item/createItem
   * @param data The item creation details.
   * @returns A Promise resolving to the created item or an ErrorResponse.
   */
  public async createItem(
    data: CreateItemRequest,
  ): Promise<CreateItemSuccessResponse | ErrorResponse> {
    try {
      const response = await this.axiosInstance.post<CreateItemSuccessResponse>(
        `${this.ITEM_BASE_PATH}/createItem`,
        data,
      );
      return response.data;
    } catch (error) {
      return this.handleAxiosError(error);
    }
  }

  /**
   * Deletes a specific item belonging to a specified owner.
   * POST /api/Item/deleteItem
   * @param data The owner and item details for deletion.
   * @returns A Promise resolving to an empty object on success or an ErrorResponse.
   */
  public async deleteItem(
    data: DeleteItemRequest,
  ): Promise<EmptySuccessResponse | ErrorResponse> {
    try {
      const response = await this.axiosInstance.post<EmptySuccessResponse>(
        `${this.ITEM_BASE_PATH}/deleteItem`,
        data,
      );
      return response.data;
    } catch (error) {
      return this.handleAxiosError(error);
    }
  }

  /**
   * Updates the name, description, and/or category of an existing item.
   * POST /api/Item/updateItemDetails
   * @param data The owner, item to update, and optional new details.
   * @returns A Promise resolving to an empty object on success or an ErrorResponse.
   */
  public async updateItemDetails(
    data: UpdateItemDetailsRequest,
  ): Promise<EmptySuccessResponse | ErrorResponse> {
    try {
      const response = await this.axiosInstance.post<EmptySuccessResponse>(
        `${this.ITEM_BASE_PATH}/updateItemDetails`,
        data,
      );
      return response.data;
    } catch (error) {
      return this.handleAxiosError(error);
    }
  }

  // --- Query Endpoints ---
  // Note: All query endpoints are POST and return an array as per your spec.

  /**
   * Retrieves the username of the owner of a specified item.
   * POST /api/Item/_getItemOwner
   * @param data The item whose owner is to be retrieved.
   * @returns A Promise resolving to an array containing the owner's username or an ErrorResponse.
   */
  public async getItemOwner(
    data: GetItemDetailRequest,
  ): Promise<GetItemOwnerQueryResponse | ErrorResponse> {
    try {
      const response = await this.axiosInstance.post<GetItemOwnerQueryResponse>(
        `${this.ITEM_BASE_PATH}/_getItemOwner`,
        data,
      );
      return response.data;
    } catch (error) {
      return this.handleAxiosError(error);
    }
  }

  /**
   * Retrieves the name of a specified item.
   * POST /api/Item/_getItemName
   * @param data The item whose name is to be retrieved.
   * @returns A Promise resolving to an array containing the item's name or an ErrorResponse.
   */
  public async getItemName(
    data: GetItemDetailRequest,
  ): Promise<GetItemNameQueryResponse | ErrorResponse> {
    try {
      const response = await this.axiosInstance.post<GetItemNameQueryResponse>(
        `${this.ITEM_BASE_PATH}/_getItemName`,
        data,
      );
      return response.data;
    } catch (error) {
      return this.handleAxiosError(error);
    }
  }

  /**
   * Retrieves the description of a specified item.
   * POST /api/Item/_getItemDescription
   * @param data The item whose description is to be retrieved.
   * @returns A Promise resolving to an array containing the item's description or an ErrorResponse.
   */
  public async getItemDescription(
    data: GetItemDetailRequest,
  ): Promise<GetItemDescriptionQueryResponse | ErrorResponse> {
    try {
      const response = await this.axiosInstance.post<
        GetItemDescriptionQueryResponse
      >(
        `${this.ITEM_BASE_PATH}/_getItemDescription`,
        data,
      );
      return response.data;
    } catch (error) {
      return this.handleAxiosError(error);
    }
  }

  /**
   * Retrieves the category of a specified item.
   * POST /api/Item/_getItemCategory
   * @param data The item whose category is to be retrieved.
   * @returns A Promise resolving to an array containing the item's category or an ErrorResponse.
   */
  public async getItemCategory(
    data: GetItemDetailRequest,
  ): Promise<GetItemCategoryQueryResponse | ErrorResponse> {
    try {
      const response = await this.axiosInstance.post<
        GetItemCategoryQueryResponse
      >(
        `${this.ITEM_BASE_PATH}/_getItemCategory`,
        data,
      );
      return response.data;
    } catch (error) {
      return this.handleAxiosError(error);
    }
  }

  /**
   * Retrieves a list of all items currently in the collection.
   * POST /api/Item/_getItems
   * @returns A Promise resolving to an array of all items or an ErrorResponse.
   */
  public async getItems(): Promise<GetItemsSuccessResponse | ErrorResponse> {
    try {
      const response = await this.axiosInstance.post<GetItemsSuccessResponse>(
        `${this.ITEM_BASE_PATH}/_getItems`,
        {}, // Empty request body as per spec
      );
      return response.data;
    } catch (error) {
      return this.handleAxiosError(error);
    }
  }

  /**
   * Retrieves a list of names for all items in the collection.
   * POST /api/Item/_getItemsString
   * @returns A Promise resolving to an array of item names or an ErrorResponse.
   */
  public async getItemsString(): Promise<
    GetItemsStringQueryResponse | ErrorResponse
  > {
    try {
      const response = await this.axiosInstance.post<
        GetItemsStringQueryResponse
      >(
        `${this.ITEM_BASE_PATH}/_getItemsString`,
        {}, // Empty request body as per spec
      );
      return response.data;
    } catch (error) {
      return this.handleAxiosError(error);
    }
  }

  /**
   * Retrieves all items owned by a specified user.
   * POST /api/Item/_getItemsByUser
   * @param data The user whose items are to be retrieved.
   * @returns A Promise resolving to an array of items owned by the user or an ErrorResponse.
   */
  public async getItemsByUser(
    data: GetItemsByUserRequest,
  ): Promise<GetItemsSuccessResponse | ErrorResponse> {
    try {
      const response = await this.axiosInstance.post<GetItemsSuccessResponse>(
        `${this.ITEM_BASE_PATH}/_getItemsByUser`,
        data,
      );
      return response.data;
    } catch (error) {
      return this.handleAxiosError(error);
    }
  }

  /**
   * Handles Axios errors, converting them into the common ErrorResponse format.
   * @param error The Axios error object.
   * @returns An ErrorResponse object.
   */
  private handleAxiosError(error: unknown): ErrorResponse {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response?.data) {
        // If the backend sent a specific error response
        return axiosError.response.data;
      } else if (axiosError.message) {
        // Fallback to Axios's default error message
        return { error: axiosError.message };
      }
    }
    // Generic error for non-Axios or unknown errors
    return { error: "An unexpected error occurred." };
  }
}
