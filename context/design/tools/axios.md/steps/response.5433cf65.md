---
timestamp: 'Fri Oct 24 2025 23:31:28 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251024_233128.677d88c4.md]]'
content_id: 5433cf65da06f47be8c09a60e7428d4386c766284eac9f76072e6199b042907d
---

# response:

Okay, let's break down how to create an Axios-based TypeScript client for your `Space Concept` API specification.

We'll define:

1. **Type Definitions:** Interfaces for all request and response bodies.
2. **Axios Instance:** A pre-configured Axios instance.
3. **API Client Class:** A class that encapsulates all your API calls, making them easy to consume.
4. **Error Handling:** A consistent way to handle errors from the API.

***

### 1. Project Setup

First, make sure you have Axios installed:

```bash
npm install axios
# or
yarn add axios
```

Then, create a TypeScript file (e.g., `spaceApiClient.ts`).

***

### 2. `spaceApiClient.ts`

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

***

### 3. How to Use

You can import and use this `SpaceApiClient` in your application:

```typescript
import { SpaceApiClient, SpaceApiError } from './spaceApiClient'; // Adjust path as needed

// Instantiate the client.
// If your API is hosted at a different base URL (e.g., 'http://localhost:3000'),
// you can pass it to the constructor: new SpaceApiClient('http://localhost:3000')
const spaceClient = new SpaceApiClient();

async function exampleUsage() {
  const ownerId = 'user-123';
  let mySpaceId: string;

  try {
    // 1. Create a root space
    const newSpaceResponse = await spaceClient.createSpace({
      owner: ownerId,
      name: 'My Root Space',
      spaceType: 'Folder',
      parent: null,
    });
    mySpaceId = newSpaceResponse.space;
    console.log(`Created space with ID: ${mySpaceId}`);

    // 2. Rename the space
    await spaceClient.renameSpace({
      owner: ownerId,
      space: mySpaceId,
      newName: 'My Renamed Space',
    });
    console.log('Space renamed successfully.');

    // 3. Get the new name
    const nameResponse = await spaceClient.getSpaceName({ space: mySpaceId });
    console.log(`Space new name: ${nameResponse[0].name}`);

    // 4. Create a child space
    const childSpaceResponse = await spaceClient.createSpace({
      owner: ownerId,
      name: 'Child Folder',
      spaceType: 'Folder',
      parent: mySpaceId,
    });
    const childSpaceId = childSpaceResponse.space;
    console.log(`Created child space with ID: ${childSpaceId}`);

    // 5. Get children of the root space
    const childrenIds = await spaceClient.getSpaceChildren({ space: mySpaceId });
    console.log('Children IDs:', childrenIds);

    const childrenNames = await spaceClient.getSpaceChildrenString({ space: mySpaceId });
    console.log('Children Names:', childrenNames.map(c => c.childName));

    // 6. Get all spaces for this owner (assuming they are the only owner for simplicity)
    const allSpaces = await spaceClient.getSpaces();
    console.log('All spaces:', allSpaces);

    // 7. Delete the child space (must have no children)
    await spaceClient.deleteSpace({ owner: ownerId, space: childSpaceId });
    console.log('Child space deleted.');

    // 8. Delete the parent space
    await spaceClient.deleteSpace({ owner: ownerId, space: mySpaceId });
    console.log('Parent space deleted.');

  } catch (error) {
    if (error instanceof SpaceApiError) {
      console.error(`API Error (${error.statusCode || 'N/A'}): ${error.message}`);
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}

exampleUsage();
```

***

### Explanation:

1. **`ID` Type:** A simple alias for `string` for better readability and semantic meaning.
2. **`Space` Interface:** Defines the structure of a space entity based on the `_getSpaces` endpoint.
3. **`ApiErrorResponse`:** A universal interface for error bodies.
4. **Request & Response Types:**
   * For each endpoint, a specific interface is created for its request body.
   * For **Action** endpoints (create, move, rename, delete), the success response is usually `EmptySuccessResponse` (an empty object `{}`, represented by `Record<string, never>`) or a specific object like `CreateSpaceSuccessResponse`.
   * For **Query** endpoints (`_get...`), the specification states they return an *array* of objects (e.g., `[{ "owner": "ID" }]`). So, the return types are `Promise<GetSpaceOwnerResponse[]>`, `Promise<Space[]>`, etc.
5. **`SpaceApiError` Class:** A custom error class to wrap Axios errors, making error handling more consistent and readable in your application. It provides access to the `message` and `statusCode`.
6. **`SpaceApiClient` Class:**
   * **`axiosInstance`:** An `axios.create()` instance is used. This is good practice as it allows you to configure a base URL, headers, and interceptors once for all calls made through this client.
   * **`constructor(baseURL?: string)`:** Allows you to specify the base URL for your API when instantiating the client.
   * **`handleError(error: unknown)`:** A private helper method to centralize error handling logic. It checks if the error is an `AxiosError`, extracts the API's error message, and re-throws it as a `SpaceApiError`. This keeps your individual API methods cleaner.
   * **Endpoint Methods:** Each API endpoint maps to an `async` method in the class.
     * They take a typed `data` object for the request body.
     * They use `this.axiosInstance.post<ResponseType>(url, data)` for the actual call.
     * The generic type argument `<ResponseType>` on `post` tells TypeScript what the expected shape of `response.data` will be.
     * Each method includes a `try...catch` block that delegates error handling to `this.handleError`.
7. **Usage Example:** Demonstrates how to instantiate the client and call its methods, including basic error handling.

This structured approach provides strong type safety, good organization, and consistent error handling for your API interactions.
