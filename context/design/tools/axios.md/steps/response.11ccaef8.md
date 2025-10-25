---
timestamp: 'Fri Oct 24 2025 23:35:59 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251024_233559.a32bdc4c.md]]'
content_id: 11ccaef891be574c501b244a86852f0e6d47a216e933d1c19cca2725a40fd54c
---

# response:

It seems there might be a slight misunderstanding, as the previous response **already provided the complete API client** for the specification you gave, including all type definitions and the `SpaceApiClient` class with all the methods.

The code I provided in the previous response is *exactly* the API client you're asking for.

Here is the complete `spaceApiClient.ts` file again for your convenience:

***

### `spaceApiClient.ts` (Complete API Client)

```typescript
import axios, { AxiosInstance, AxiosError } from 'axios';

// --- Core Type Definitions ---
type ID = string; // Represents any ID in the system (owner, space, parent)

/**
 * Interface for a full Space entity, as returned by _getSpaces.
 */
export interface Space {
  id: ID;
  owner: ID;
  name: string;
  spaceType: string;
  parent: ID | null;
}

/**
 * Generic error response structure from the API.
 */
export interface ApiErrorResponse {
  error: string;
}

// --- Request Body Type Definitions ---

export interface CreateSpaceRequest {
  owner: ID;
  name: string;
  spaceType: string;
  parent: ID | null;
}

export interface MoveSpaceRequest {
  owner: ID;
  space: ID;
  newParent: ID;
}

export interface RenameSpaceRequest {
  owner: ID;
  space: ID;
  newName: string;
}

export interface DeleteSpaceRequest {
  owner: ID;
  space: ID;
}

export interface GetSpaceOwnerRequest {
  space: ID;
}

export interface GetSpaceNameRequest {
  space: ID;
}

export interface GetSpaceTypeRequest {
  space: ID;
}

export interface GetSpaceParentRequest {
  space: ID;
}

export interface GetSpaceChildrenRequest {
  space: ID;
}

export interface GetSpaceChildrenStringRequest {
  space: ID;
}

// For _getSpaces and _getSpacesString, the request body is empty.
// We use Record<string, never> to explicitly indicate an empty object.
type EmptyRequest = Record<string, never>;


// --- Response Body Type Definitions ---

// Action responses that return an empty object {}
export type EmptySuccessResponse = Record<string, never>;

export interface CreateSpaceSuccessResponse {
  space: ID;
}

// Query responses - notice they return an array of these objects
export interface GetSpaceOwnerResponse {
  owner: ID;
}

export interface GetSpaceNameResponse {
  name: string;
}

export interface GetSpaceTypeResponse {
  spaceType: string;
}

export interface GetSpaceParentResponse {
  parent: ID | null;
}

export interface GetSpaceChildrenResponse {
  child: ID;
}

export interface GetSpaceChildrenStringResponse {
  childName: string;
}

export interface GetSpacesStringResponse {
  spaceName: string;
}

/**
 * Custom error class for API-specific errors.
 */
export class SpaceApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'SpaceApiError';
  }
}

/**
 * API client for the Space Concept endpoints.
 */
export class SpaceApiClient {
  private axiosInstance: AxiosInstance;
  private readonly baseUrl = '/api/Space'; // Base path for all Space endpoints

  constructor(baseURL?: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL || '/', // Use provided baseURL or root if none
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Centralized error handler
  private handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      const errorMessage = axiosError.response?.data?.error || axiosError.message;
      const statusCode = axiosError.response?.status;
      throw new SpaceApiError(errorMessage, statusCode);
    }
    // If it's not an Axios error, just re-throw as a generic error
    throw new SpaceApiError(`An unexpected error occurred: ${error}`, undefined);
  }

  // --- API Endpoints ---

  /**
   * POST /api/Space/createSpace
   * Creates a new space.
   */
  async createSpace(data: CreateSpaceRequest): Promise<CreateSpaceSuccessResponse> {
    try {
      const response = await this.axiosInstance.post<CreateSpaceSuccessResponse>(`${this.baseUrl}/createSpace`, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * POST /api/Space/moveSpace
   * Moves an existing space to a new parent space.
   */
  async moveSpace(data: MoveSpaceRequest): Promise<EmptySuccessResponse> {
    try {
      const response = await this.axiosInstance.post<EmptySuccessResponse>(`${this.baseUrl}/moveSpace`, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * POST /api/Space/renameSpace
   * Renames an existing space.
   */
  async renameSpace(data: RenameSpaceRequest): Promise<EmptySuccessResponse> {
    try {
      const response = await this.axiosInstance.post<EmptySuccessResponse>(`${this.baseUrl}/renameSpace`, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * POST /api/Space/deleteSpace
   * Deletes an existing space.
   */
  async deleteSpace(data: DeleteSpaceRequest): Promise<EmptySuccessResponse> {
    try {
      const response = await this.axiosInstance.post<EmptySuccessResponse>(`${this.baseUrl}/deleteSpace`, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * POST /api/Space/_getSpaceOwner
   * Retrieves the owner of a specific space.
   */
  async getSpaceOwner(data: GetSpaceOwnerRequest): Promise<GetSpaceOwnerResponse[]> {
    try {
      const response = await this.axiosInstance.post<GetSpaceOwnerResponse[]>(`${this.baseUrl}/_getSpaceOwner`, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * POST /api/Space/_getSpaceName
   * Retrieves the name of a specific space.
   */
  async getSpaceName(data: GetSpaceNameRequest): Promise<GetSpaceNameResponse[]> {
    try {
      const response = await this.axiosInstance.post<GetSpaceNameResponse[]>(`${this.baseUrl}/_getSpaceName`, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * POST /api/Space/_getSpaceType
   * Retrieves the type of a specific space.
   */
  async getSpaceType(data: GetSpaceTypeRequest): Promise<GetSpaceTypeResponse[]> {
    try {
      const response = await this.axiosInstance.post<GetSpaceTypeResponse[]>(`${this.baseUrl}/_getSpaceType`, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * POST /api/Space/_getSpaceParent
   * Retrieves the parent space of a specific space.
   */
  async getSpaceParent(data: GetSpaceParentRequest): Promise<GetSpaceParentResponse[]> {
    try {
      const response = await this.axiosInstance.post<GetSpaceParentResponse[]>(`${this.baseUrl}/_getSpaceParent`, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * POST /api/Space/_getSpaceChildren
   * Retrieves the direct children (by ID) of a specific space.
   */
  async getSpaceChildren(data: GetSpaceChildrenRequest): Promise<GetSpaceChildrenResponse[]> {
    try {
      const response = await this.axiosInstance.post<GetSpaceChildrenResponse[]>(`${this.baseUrl}/_getSpaceChildren`, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * POST /api/Space/_getSpaceChildrenString
   * Retrieves the names of the direct children of a specific space.
   */
  async getSpaceChildrenString(data: GetSpaceChildrenStringRequest): Promise<GetSpaceChildrenStringResponse[]> {
    try {
      const response = await this.axiosInstance.post<GetSpaceChildrenStringResponse[]>(`${this.baseUrl}/_getSpaceChildrenString`, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * POST /api/Space/_getSpaces
   * Retrieves all spaces managed by the concept, including their properties.
   */
  async getSpaces(): Promise<Space[]> {
    try {
      const response = await this.axiosInstance.post<Space[]>(`${this.baseUrl}/_getSpaces`, {});
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * POST /api/Space/_getSpacesString
   * Retrieves the names of all spaces managed by the concept.
   */
  async getSpacesString(): Promise<GetSpacesStringResponse[]> {
    try {
      const response = await this.axiosInstance.post<GetSpacesStringResponse[]>(`${this.baseUrl}/_getSpacesString`, {});
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}
```
