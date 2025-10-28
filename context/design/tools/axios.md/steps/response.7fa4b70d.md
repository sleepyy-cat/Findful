---
timestamp: 'Tue Oct 28 2025 01:03:51 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251028_010351.4a487645.md]]'
content_id: 7fa4b70d679c030d41198f1e21563817e3179c30d50c3a57c2c9d1a0a76124c0
---

# response:

Okay, here are the `space-api-models.ts` and `space-api-client.ts` files based on your API specification and similar in structure to typical client-side API integrations.

***

### `space-api-models.ts`

This file defines all the TypeScript interfaces for the data structures used in the Space API, including request bodies, response bodies, and the core `Space` entity.

```typescript
// space-api-models.ts

/**
 * Type alias for a unique identifier used across the API.
 * Assuming IDs are string representations.
 */
export type ID = string;

/**
 * Represents the full structure of a Space entity.
 */
export interface SpaceEntity {
  id: ID;
  owner: ID;
  name: string;
  spaceType: string;
  parent: ID | null;
}

/**
 * Common error response structure for API calls.
 */
export interface ErrorResponse {
  error: string;
}

// --- Request Body Interfaces ---

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

export interface GetSpacesRequest {
  // Empty request body
}

export interface GetSpacesStringRequest {
  // Empty request body
}

// --- Success Response Body Interfaces ---

// Action Endpoints
export interface CreateSpaceResponse {
  space: ID;
}

export interface MoveSpaceResponse {
  // Empty response for success
}

export interface RenameSpaceResponse {
  // Empty response for success
}

export interface DeleteSpaceResponse {
  // Empty response for success
}

// Query Endpoints (Note: These often return arrays of the defined type)

export interface GetSpaceOwnerItem {
  owner: ID;
}
export type GetSpaceOwnerResponse = GetSpaceOwnerItem[];

export interface GetSpaceNameItem {
  name: string;
}
export type GetSpaceNameResponse = GetSpaceNameItem[];

export interface GetSpaceTypeItem {
  spaceType: string;
}
export type GetSpaceTypeResponse = GetSpaceTypeItem[];

export interface GetSpaceParentItem {
  parent: ID | null;
}
export type GetSpaceParentResponse = GetSpaceParentItem[];

export interface GetSpaceChildrenItem {
  child: ID;
}
export type GetSpaceChildrenResponse = GetSpaceChildrenItem[];

export interface GetSpaceChildrenStringItem {
  childName: string;
}
export type GetSpaceChildrenStringResponse = GetSpaceChildrenStringItem[];

export interface GetSpacesItem extends SpaceEntity {
  // This already matches SpaceEntity, but keeping it for consistency if it were different
}
export type GetSpacesResponse = GetSpacesItem[];

export interface GetSpacesStringItem {
  spaceName: string;
}
export type GetSpacesStringResponse = GetSpacesStringItem[];
```

***

### `space-api-client.ts`

This file contains the `SpaceApiClient` class, which uses `axios` to interact with the Space API endpoints.

```typescript
// space-api-client.ts

import axios, { AxiosInstance, AxiosError } from 'axios';
import {
  ID,
  SpaceEntity,
  ErrorResponse,

  // Request Interfaces
  CreateSpaceRequest,
  MoveSpaceRequest,
  RenameSpaceRequest,
  DeleteSpaceRequest,
  GetSpaceOwnerRequest,
  GetSpaceNameRequest,
  GetSpaceTypeRequest,
  GetSpaceParentRequest,
  GetSpaceChildrenRequest,
  GetSpaceChildrenStringRequest,
  GetSpacesRequest,
  GetSpacesStringRequest,

  // Response Interfaces
  CreateSpaceResponse,
  MoveSpaceResponse,
  RenameSpaceResponse,
  DeleteSpaceResponse,
  GetSpaceOwnerResponse,
  GetSpaceNameResponse,
  GetSpaceTypeResponse,
  GetSpaceParentResponse,
  GetSpaceChildrenResponse,
  GetSpaceChildrenStringResponse,
  GetSpacesResponse,
  GetSpacesStringResponse,
} from './space-api-models'; // Adjust path if necessary

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
        'Content-Type': 'application/json',
      },
    });
  }

  private async post<TRequest, TResponse>(
    path: string,
    data: TRequest
  ): Promise<TResponse> {
    try {
      const response = await this.client.post<TResponse>(path, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response && axiosError.response.data && axiosError.response.data.error) {
          throw new Error(axiosError.response.data.error);
        }
        throw new Error(axiosError.message);
      }
      throw new Error('An unknown error occurred');
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
  async createSpace(
    owner: ID,
    name: string,
    spaceType: string,
    parent: ID | null
  ): Promise<CreateSpaceResponse> {
    const requestBody: CreateSpaceRequest = { owner, name, spaceType, parent };
    return this.post<CreateSpaceRequest, CreateSpaceResponse>('/createSpace', requestBody);
  }

  /**
   * Moves an existing space to a new parent space, updating its hierarchical position.
   * @param owner The ID of the space's owner.
   * @param space The ID of the space to move.
   * @param newParent The ID of the new parent space.
   * @returns A promise that resolves when the move operation is successful.
   */
  async moveSpace(owner: ID, space: ID, newParent: ID): Promise<MoveSpaceResponse> {
    const requestBody: MoveSpaceRequest = { owner, space, newParent };
    return this.post<MoveSpaceRequest, MoveSpaceResponse>('/moveSpace', requestBody);
  }

  /**
   * Renames an existing space.
   * @param owner The ID of the space's owner.
   * @param space The ID of the space to rename.
   * @param newName The new name for the space.
   * @returns A promise that resolves when the rename operation is successful.
   */
  async renameSpace(owner: ID, space: ID, newName: string): Promise<RenameSpaceResponse> {
    const requestBody: RenameSpaceRequest = { owner, space, newName };
    return this.post<RenameSpaceRequest, RenameSpaceResponse>('/renameSpace', requestBody);
  }

  /**
   * Deletes an existing space.
   * @param owner The ID of the space's owner.
   * @param space The ID of the space to delete.
   * @returns A promise that resolves when the delete operation is successful.
   */
  async deleteSpace(owner: ID, space: ID): Promise<DeleteSpaceResponse> {
    const requestBody: DeleteSpaceRequest = { owner, space };
    return this.post<DeleteSpaceRequest, DeleteSpaceResponse>('/deleteSpace', requestBody);
  }

  /**
   * Retrieves the owner of a specific space.
   * @param space The ID of the space.
   * @returns A promise that resolves with an array containing the owner's ID.
   */
  async getSpaceOwner(space: ID): Promise<GetSpaceOwnerResponse> {
    const requestBody: GetSpaceOwnerRequest = { space };
    return this.post<GetSpaceOwnerRequest, GetSpaceOwnerResponse>('/_getSpaceOwner', requestBody);
  }

  /**
   * Retrieves the name of a specific space.
   * @param space The ID of the space.
   * @returns A promise that resolves with an array containing the space's name.
   */
  async getSpaceName(space: ID): Promise<GetSpaceNameResponse> {
    const requestBody: GetSpaceNameRequest = { space };
    return this.post<GetSpaceNameRequest, GetSpaceNameResponse>('/_getSpaceName', requestBody);
  }

  /**
   * Retrieves the type of a specific space.
   * @param space The ID of the space.
   * @returns A promise that resolves with an array containing the space's type.
   */
  async getSpaceType(space: ID): Promise<GetSpaceTypeResponse> {
    const requestBody: GetSpaceTypeRequest = { space };
    return this.post<GetSpaceTypeRequest, GetSpaceTypeResponse>('/_getSpaceType', requestBody);
  }

  /**
   * Retrieves the parent space of a specific space.
   * @param space The ID of the space.
   * @returns A promise that resolves with an array containing the parent's ID or null.
   */
  async getSpaceParent(space: ID): Promise<GetSpaceParentResponse> {
    const requestBody: GetSpaceParentRequest = { space };
    return this.post<GetSpaceParentRequest, GetSpaceParentResponse>('/_getSpaceParent', requestBody);
  }

  /**
   * Retrieves the direct children (by ID) of a specific space.
   * @param space The ID of the space.
   * @returns A promise that resolves with an array of child IDs.
   */
  async getSpaceChildren(space: ID): Promise<GetSpaceChildrenResponse> {
    const requestBody: GetSpaceChildrenRequest = { space };
    return this.post<GetSpaceChildrenRequest, GetSpaceChildrenResponse>('/_getSpaceChildren', requestBody);
  }

  /**
   * Retrieves the names of the direct children of a specific space.
   * @param space The ID of the space.
   * @returns A promise that resolves with an array of child names.
   */
  async getSpaceChildrenString(space: ID): Promise<GetSpaceChildrenStringResponse> {
    const requestBody: GetSpaceChildrenStringRequest = { space };
    return this.post<GetSpaceChildrenStringRequest, GetSpaceChildrenStringResponse>('/_getSpaceChildrenString', requestBody);
  }

  /**
   * Retrieves all spaces managed by the concept, including their properties.
   * @returns A promise that resolves with an array of all Space entities.
   */
  async getSpaces(): Promise<GetSpacesResponse> {
    const requestBody: GetSpacesRequest = {}; // Empty body
    return this.post<GetSpacesRequest, GetSpacesResponse>('/_getSpaces', requestBody);
  }

  /**
   * Retrieves the names of all spaces managed by the concept.
   * @returns A promise that resolves with an array of all space names.
   */
  async getSpacesString(): Promise<GetSpacesStringResponse> {
    const requestBody: GetSpacesStringRequest = {}; // Empty body
    return this.post<GetSpacesStringRequest, GetSpacesStringResponse>('/_getSpacesString', requestBody);
  }
}

/*
// Example Usage:

import { SpaceApiClient } from './space-api-client';

const spaceApi = new SpaceApiClient({
  baseURL: 'http://localhost:8080/api/Space', // Replace with your actual API base URL
});

async function testSpaceApi() {
  try {
    // 1. Create a root space
    const createdRootSpace = await spaceApi.createSpace('owner123', 'My Root Space', 'Folder', null);
    console.log('Created root space:', createdRootSpace.space); // { space: 'some-id-1' }
    const rootSpaceId = createdRootSpace.space;

    // 2. Create a child space
    const createdChildSpace = await spaceApi.createSpace('owner123', 'Child Folder', 'Folder', rootSpaceId);
    console.log('Created child space:', createdChildSpace.space); // { space: 'some-id-2' }
    const childSpaceId = createdChildSpace.space;

    // 3. Get children of root space
    const children = await spaceApi.getSpaceChildren(rootSpaceId);
    console.log('Children of root space:', children); // [ { child: 'some-id-2' } ]

    // 4. Rename a space
    await spaceApi.renameSpace('owner123', childSpaceId, 'Renamed Child Folder');
    console.log('Child space renamed.');

    // 5. Get all spaces
    const allSpaces = await spaceApi.getSpaces();
    console.log('All spaces:', allSpaces);
    // Should contain:
    // [
    //   { id: 'some-id-1', owner: 'owner123', name: 'My Root Space', spaceType: 'Folder', parent: null },
    //   { id: 'some-id-2', owner: 'owner123', name: 'Renamed Child Folder', spaceType: 'Folder', parent: 'some-id-1' }
    // ]

    // 6. Delete the child space (assuming no further children for it)
    await spaceApi.deleteSpace('owner123', childSpaceId);
    console.log('Child space deleted.');

    // 7. Get children again (should be empty)
    const childrenAfterDelete = await spaceApi.getSpaceChildren(rootSpaceId);
    console.log('Children of root space after delete:', childrenAfterDelete); // []

    // 8. Delete the root space
    await spaceApi.deleteSpace('owner123', rootSpaceId);
    console.log('Root space deleted.');

  } catch (error: any) {
    console.error('API Error:', error.message);
  }
}

// testSpaceApi();
*/
```

***

**Explanation:**

1. **`space-api-models.ts`**:
   * `ID` is defined as `string`. You can change this if your `ID` type is different (e.g., `number` or a more complex object).
   * `SpaceEntity` provides a full type definition for a Space object, useful for `_getSpaces` response.
   * `ErrorResponse` is a standard way to type API errors.
   * Separate interfaces are created for each `Request Body` and `Success Response Body` (both action-specific and query-specific). For queries that return an array, I've defined an `Item` interface and then a `Response` type as an array of that item (e.g., `GetSpaceOwnerItem` and `GetSpaceOwnerResponse = GetSpaceOwnerItem[]`). This provides clarity on the structure of individual elements within the response array.

2. **`space-api-client.ts`**:
   * **`SpaceApiClientConfig`**: Allows you to configure the `baseURL` for your API and optionally provide your own `axiosInstance` for advanced scenarios (e.g., adding global interceptors for authentication).
   * **`constructor`**: Initializes `axios` with the provided `baseURL` and `Content-Type` header.
   * **`post<TRequest, TResponse>` private helper**: This generic method abstracts the `axios.post` call, making the individual endpoint methods cleaner. It also includes basic error handling, attempting to extract a custom error message from the API's `ErrorResponse`.
   * **Public Methods**: Each method corresponds to an API endpoint.
     * They take arguments that directly map to the fields in the respective request body.
     * They construct the `requestBody` object.
     * They call the `post` helper with the appropriate path and request body, explicitly defining the request and response types.
     * The paths are relative to the `baseURL` (e.g., `/createSpace` assumes `baseURL` is `http://your-api.com/api/Space`).

**How to Use:**

1. Save the files as `space-api-models.ts` and `space-api-client.ts` in your project.
2. Make sure you have `axios` installed (`npm install axios` or `yarn add axios`).
3. Instantiate the client and call its methods:

   ```typescript
   import { SpaceApiClient } from './space-api-client';

   // Initialize the client with your API's base URL
   const spaceApiClient = new SpaceApiClient({
     baseURL: 'http://localhost:8080/api/Space', // IMPORTANT: Replace with your actual API base URL
     // If you have an existing axios instance with auth, interceptors, etc.:
     // axiosInstance: myAuthAxiosInstance
   });

   async function manageSpaces() {
     try {
       // Example: Create a new root space
       const newSpace = await spaceApiClient.createSpace(
         'user_alice',
         'My Documents',
         'Folder',
         null
       );
       console.log('Created Space ID:', newSpace.space); // e.g., '1a2b3c4d'
       const rootSpaceId = newSpace.space;

       // Example: Create a child space
       const childSpace = await spaceApiClient.createSpace(
         'user_alice',
         'Reports',
         'Folder',
         rootSpaceId
       );
       console.log('Created Child Space ID:', childSpace.space);
       const reportsSpaceId = childSpace.space;

       // Example: Get children of the root space
       const children = await spaceApiClient.getSpaceChildren(rootSpaceId);
       console.log('Children of My Documents:', children.map(c => c.child));

       // Example: Rename a space
       await spaceApiClient.renameSpace('user_alice', reportsSpaceId, 'Financial Reports');
       console.log('Space renamed successfully!');

       // Example: Get all spaces
       const allSpaces = await spaceApiClient.getSpaces();
       console.log('All Spaces:', allSpaces);

       // Example: Get parent of a space
       const parentOfReports = await spaceApiClient.getSpaceParent(reportsSpaceId);
       console.log('Parent of Reports:', parentOfReports.length > 0 ? parentOfReports[0].parent : 'N/A');

       // Example: Delete a space (make sure it has no children first, as per API spec)
       // For demonstration, let's assume 'Financial Reports' has no children or we'd delete them first
       await spaceApiClient.deleteSpace('user_alice', reportsSpaceId);
       console.log('Financial Reports space deleted.');

     } catch (error) {
       console.error('API call failed:', error instanceof Error ? error.message : error);
     }
   }

   manageSpaces();
   ```
