import axios, { AxiosError, AxiosInstance } from "axios";
import {
  // Request Interfaces
  CreateSpaceRequest,
  // Response Interfaces
  CreateSpaceResponse,
  DeleteSpaceRequest,
  DeleteSpaceResponse,
  ErrorResponse,
  GetSpaceChildrenRequest,
  GetSpaceChildrenResponse,
  GetSpaceChildrenStringRequest,
  GetSpaceChildrenStringResponse,
  GetSpaceNameRequest,
  GetSpaceNameResponse,
  GetSpaceOwnerRequest,
  GetSpaceOwnerResponse,
  GetSpaceParentRequest,
  GetSpaceParentResponse,
  GetSpacesRequest,
  GetSpacesResponse,
  GetSpacesStringRequest,
  GetSpacesStringResponse,
  GetSpaceTypeRequest,
  GetSpaceTypeResponse,
  ID,
  MoveSpaceRequest,
  MoveSpaceResponse,
  RenameSpaceRequest,
  RenameSpaceResponse,
} from "./space-api-models.ts"; // Adjust path if necessary

/**
 * Configuration for the Space API client.
 */
export interface SpaceApiClientConfig {
  /** The base URL for the Space API endpoints (e.g., 'http://localhost:3000/api/Space'). */
  baseURL: string;
  /** Optional Axios instance to use, allowing for custom configurations like interceptors. */
  axiosInstance?: AxiosInstance;
}

/**
 * Client for interacting with the Space API.
 */
export class SpaceApiClient {
  private readonly client: AxiosInstance;

  constructor(config: SpaceApiClientConfig) {
    this.client = config.axiosInstance || axios.create({
      baseURL: config.baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  private async post<TRequest, TResponse>(
    path: string,
    data: TRequest,
  ): Promise<TResponse> {
    try {
      const response = await this.client.post<TResponse>(path, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (
          axiosError.response && axiosError.response.data &&
          axiosError.response.data.error
        ) {
          throw new Error(axiosError.response.data.error);
        }
        throw new Error(axiosError.message);
      }
      throw new Error("An unknown error occurred");
    }
  }

  /**
   * Creates a new space, optionally within an existing parent space.
   * @param owner The ID of the owner.
   * @param name The name of the new space.
   * @param spaceType The type of the new space.
   * @param parent The ID of the parent space, or null for a root space.
   * @returns A promise that resolves with the ID of the newly created space.
   */
  createSpace(
    owner: ID,
    name: string,
    spaceType: string,
    parent: ID | null,
  ): Promise<CreateSpaceResponse> {
    const requestBody: CreateSpaceRequest = { owner, name, spaceType, parent };
    return this.post<CreateSpaceRequest, CreateSpaceResponse>(
      "/createSpace",
      requestBody,
    );
  }

  /**
   * Moves an existing space to a new parent space, updating its hierarchical position.
   * @param owner The ID of the space's owner.
   * @param space The ID of the space to move.
   * @param newParent The ID of the new parent space.
   * @returns A promise that resolves when the move operation is successful.
   */
  moveSpace(
    owner: ID,
    space: ID,
    newParent: ID,
  ): Promise<MoveSpaceResponse> {
    const requestBody: MoveSpaceRequest = { owner, space, newParent };
    return this.post<MoveSpaceRequest, MoveSpaceResponse>(
      "/moveSpace",
      requestBody,
    );
  }

  /**
   * Renames an existing space.
   * @param owner The ID of the space's owner.
   * @param space The ID of the space to rename.
   * @param newName The new name for the space.
   * @returns A promise that resolves when the rename operation is successful.
   */
  renameSpace(
    owner: ID,
    space: ID,
    newName: string,
  ): Promise<RenameSpaceResponse> {
    const requestBody: RenameSpaceRequest = { owner, space, newName };
    return this.post<RenameSpaceRequest, RenameSpaceResponse>(
      "/renameSpace",
      requestBody,
    );
  }

  /**
   * Deletes an existing space.
   * @param owner The ID of the space's owner.
   * @param space The ID of the space to delete.
   * @returns A promise that resolves when the delete operation is successful.
   */
  deleteSpace(owner: ID, space: ID): Promise<DeleteSpaceResponse> {
    const requestBody: DeleteSpaceRequest = { owner, space };
    return this.post<DeleteSpaceRequest, DeleteSpaceResponse>(
      "/deleteSpace",
      requestBody,
    );
  }

  /**
   * Retrieves the owner of a specific space.
   * @param space The ID of the space.
   * @returns A promise that resolves with an array containing the owner's ID.
   */
  getSpaceOwner(space: ID): Promise<GetSpaceOwnerResponse> {
    const requestBody: GetSpaceOwnerRequest = { space };
    return this.post<GetSpaceOwnerRequest, GetSpaceOwnerResponse>(
      "/_getSpaceOwner",
      requestBody,
    );
  }

  /**
   * Retrieves the name of a specific space.
   * @param space The ID of the space.
   * @returns A promise that resolves with an array containing the space's name.
   */
  getSpaceName(space: ID): Promise<GetSpaceNameResponse> {
    const requestBody: GetSpaceNameRequest = { space };
    return this.post<GetSpaceNameRequest, GetSpaceNameResponse>(
      "/_getSpaceName",
      requestBody,
    );
  }

  /**
   * Retrieves the type of a specific space.
   * @param space The ID of the space.
   * @returns A promise that resolves with an array containing the space's type.
   */
  getSpaceType(space: ID): Promise<GetSpaceTypeResponse> {
    const requestBody: GetSpaceTypeRequest = { space };
    return this.post<GetSpaceTypeRequest, GetSpaceTypeResponse>(
      "/_getSpaceType",
      requestBody,
    );
  }

  /**
   * Retrieves the parent space of a specific space.
   * @param space The ID of the space.
   * @returns A promise that resolves with an array containing the parent's ID or null.
   */
  getSpaceParent(space: ID): Promise<GetSpaceParentResponse> {
    const requestBody: GetSpaceParentRequest = { space };
    return this.post<GetSpaceParentRequest, GetSpaceParentResponse>(
      "/_getSpaceParent",
      requestBody,
    );
  }

  /**
   * Retrieves the direct children (by ID) of a specific space.
   * @param space The ID of the space.
   * @returns A promise that resolves with an array of child IDs.
   */
  getSpaceChildren(space: ID): Promise<GetSpaceChildrenResponse> {
    const requestBody: GetSpaceChildrenRequest = { space };
    return this.post<GetSpaceChildrenRequest, GetSpaceChildrenResponse>(
      "/_getSpaceChildren",
      requestBody,
    );
  }

  /**
   * Retrieves the names of the direct children of a specific space.
   * @param space The ID of the space.
   * @returns A promise that resolves with an array of child names.
   */
  getSpaceChildrenString(
    space: ID,
  ): Promise<GetSpaceChildrenStringResponse> {
    const requestBody: GetSpaceChildrenStringRequest = { space };
    return this.post<
      GetSpaceChildrenStringRequest,
      GetSpaceChildrenStringResponse
    >("/_getSpaceChildrenString", requestBody);
  }

  /**
   * Retrieves all spaces managed by the concept, including their properties.
   * @returns A promise that resolves with an array of all Space entities.
   */
  getSpaces(): Promise<GetSpacesResponse> {
    const requestBody: GetSpacesRequest = {}; // Empty body
    return this.post<GetSpacesRequest, GetSpacesResponse>(
      "/_getSpaces",
      requestBody,
    );
  }

  /**
   * Retrieves the names of all spaces managed by the concept.
   * @returns A promise that resolves with an array of all space names.
   */
  getSpacesString(): Promise<GetSpacesStringResponse> {
    const requestBody: GetSpacesStringRequest = {}; // Empty body
    return this.post<GetSpacesStringRequest, GetSpacesStringResponse>(
      "/_getSpacesString",
      requestBody,
    );
  }
}
