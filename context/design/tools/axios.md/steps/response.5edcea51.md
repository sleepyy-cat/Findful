---
timestamp: 'Tue Oct 28 2025 00:56:42 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251028_005642.7d9c222e.md]]'
content_id: 5edcea5134f514b64b2c0933aac8de9ffe71c96364c6e2f72ce61ffc6435f8f5
---

# response:

This is a great API specification! Building an Axios client in TypeScript for this will give you excellent type safety and a clear way to interact with your backend.

Here's how you'd code it up, broken down into types, the Axios client instance, and functions for each endpoint.

```typescript
import axios, { AxiosInstance, AxiosError } from 'axios';

// --- 1. Common Types and Constants ---

/**
 * A generic type for identifiers used in the API.
 */
export type ID = string;

/**
 * The common error response structure.
 */
export interface ErrorResponse {
  error: string;
}

/**
 * Interface representing a Space entity with all its properties.
 * Useful for responses that return full space details (e.g., _getSpaces).
 */
export interface SpaceDetails {
  id: ID;
  owner: ID;
  name: string;
  spaceType: string;
  parent: ID | null;
}

// --- 2. Axios Client Configuration ---

const API_BASE_URL = 'http://localhost:3000/api/Space'; // <<< IMPORTANT: Update this to your actual API base URL

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Generic error handler for API calls.
 * Extracts the error message from AxiosError or provides a default.
 * @param error The error object caught during an API call.
 * @returns The error message string.
 */
function handleApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response?.data?.error) {
      return axiosError.response.data.error;
    } else if (axiosError.message) {
      return `API Error: ${axiosError.message}`;
    }
  }
  return `An unexpected error occurred: ${String(error)}`;
}

// --- 3. API Endpoint Functions and Their Specific Types ---

// 3.1. POST /api/Space/createSpace
export interface CreateSpaceRequest {
  owner: ID;
  name: string;
  spaceType: string;
  parent: ID | null;
}

export interface CreateSpaceResponse {
  space: ID;
}

export async function createSpace(data: CreateSpaceRequest): Promise<ID> {
  try {
    const response = await apiClient.post<CreateSpaceResponse>('/createSpace', data);
    return response.data.space;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}

// 3.2. POST /api/Space/moveSpace
export interface MoveSpaceRequest {
  owner: ID;
  space: ID;
  newParent: ID;
}

// No specific success response body, just an empty object.
export type MoveSpaceResponse = Record<string, never>;

export async function moveSpace(data: MoveSpaceRequest): Promise<void> {
  try {
    await apiClient.post<MoveSpaceResponse>('/moveSpace', data);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}

// 3.3. POST /api/Space/renameSpace
export interface RenameSpaceRequest {
  owner: ID;
  space: ID;
  newName: string;
}

// No specific success response body, just an empty object.
export type RenameSpaceResponse = Record<string, never>;

export async function renameSpace(data: RenameSpaceRequest): Promise<void> {
  try {
    await apiClient.post<RenameSpaceResponse>('/renameSpace', data);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}

// 3.4. POST /api/Space/deleteSpace
export interface DeleteSpaceRequest {
  owner: ID;
  space: ID;
}

// No specific success response body, just an empty object.
export type DeleteSpaceResponse = Record<string, never>;

export async function deleteSpace(data: DeleteSpaceRequest): Promise<void> {
  try {
    await apiClient.post<DeleteSpaceResponse>('/deleteSpace', data);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}

// 3.5. POST /api/Space/_getSpaceOwner
export interface GetSpaceOwnerRequest {
  space: ID;
}

export interface GetSpaceOwnerResponseItem {
  owner: ID;
}

export async function getSpaceOwner(data: GetSpaceOwnerRequest): Promise<ID | undefined> {
  try {
    const response = await apiClient.post<GetSpaceOwnerResponseItem[]>('/_getSpaceOwner', data);
    // Assuming the API returns an array, and we want the first (and likely only) owner
    return response.data[0]?.owner;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}

// 3.6. POST /api/Space/_getSpaceName
export interface GetSpaceNameRequest {
  space: ID;
}

export interface GetSpaceNameResponseItem {
  name: string;
}

export async function getSpaceName(data: GetSpaceNameRequest): Promise<string | undefined> {
  try {
    const response = await apiClient.post<GetSpaceNameResponseItem[]>('/_getSpaceName', data);
    return response.data[0]?.name;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}

// 3.7. POST /api/Space/_getSpaceType
export interface GetSpaceTypeRequest {
  space: ID;
}

export interface GetSpaceTypeResponseItem {
  spaceType: string;
}

export async function getSpaceType(data: GetSpaceTypeRequest): Promise<string | undefined> {
  try {
    const response = await apiClient.post<GetSpaceTypeResponseItem[]>('/_getSpaceType', data);
    return response.data[0]?.spaceType;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}

// 3.8. POST /api/Space/_getSpaceParent
export interface GetSpaceParentRequest {
  space: ID;
}

export interface GetSpaceParentResponseItem {
  parent: ID | null;
}

export async function getSpaceParent(data: GetSpaceParentRequest): Promise<ID | null | undefined> {
  try {
    const response = await apiClient.post<GetSpaceParentResponseItem[]>('/_getSpaceParent', data);
    return response.data[0]?.parent; // Can be null if it's a root space
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}

// 3.9. POST /api/Space/_getSpaceChildren
export interface GetSpaceChildrenRequest {
  space: ID;
}

export interface GetSpaceChildrenResponseItem {
  child: ID;
}

export async function getSpaceChildren(data: GetSpaceChildrenRequest): Promise<ID[]> {
  try {
    const response = await apiClient.post<GetSpaceChildrenResponseItem[]>('/_getSpaceChildren', data);
    return response.data.map(item => item.child);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}

// 3.10. POST /api/Space/_getSpaceChildrenString
export interface GetSpaceChildrenStringRequest {
  space: ID;
}

export interface GetSpaceChildrenStringResponseItem {
  childName: string;
}

export async function getSpaceChildrenString(data: GetSpaceChildrenStringRequest): Promise<string[]> {
  try {
    const response = await apiClient.post<GetSpaceChildrenStringResponseItem[]>('/_getSpaceChildrenString', data);
    return response.data.map(item => item.childName);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}

// 3.11. POST /api/Space/_getSpaces
// Request body is empty, so we just use Record<string, never> or empty object literal
export type GetSpacesRequest = Record<string, never>;

export async function getSpaces(): Promise<SpaceDetails[]> {
  try {
    const response = await apiClient.post<SpaceDetails[]>('/_getSpaces', {});
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}

// 3.12. POST /api/Space/_getSpacesString
// Request body is empty
export type GetSpacesStringRequest = Record<string, never>;

export interface GetSpacesStringResponseItem {
  spaceName: string;
}

export async function getSpacesString(): Promise<string[]> {
  try {
    const response = await apiClient.post<GetSpacesStringResponseItem[]>('/_getSpacesString', {});
    return response.data.map(item => item.spaceName);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}


// --- 4. Example Usage (How you'd use these functions) ---

async function main() {
  const OWNER_ID: ID = "user123"; // Replace with a real owner ID
  let rootSpaceId: ID | undefined;
  let childSpaceId: ID | undefined;

  try {
    console.log('--- Creating Root Space ---');
    rootSpaceId = await createSpace({
      owner: OWNER_ID,
      name: "My Root Space",
      spaceType: "Folder",
      parent: null,
    });
    console.log(`Created root space with ID: ${rootSpaceId}`);

    console.log('\n--- Creating Child Space ---');
    childSpaceId = await createSpace({
      owner: OWNER_ID,
      name: "Documents",
      spaceType: "Folder",
      parent: rootSpaceId,
    });
    console.log(`Created child space with ID: ${childSpaceId}`);

    console.log('\n--- Getting Root Space Children ---');
    const childrenIds = await getSpaceChildren({ space: rootSpaceId });
    console.log(`Root space children IDs: ${childrenIds.join(', ')}`);

    console.log('\n--- Getting Child Space Name ---');
    const childName = await getSpaceName({ space: childSpaceId });
    console.log(`Child space name: ${childName}`);

    console.log('\n--- Renaming Child Space ---');
    await renameSpace({
      owner: OWNER_ID,
      space: childSpaceId,
      newName: "Important Documents",
    });
    const newChildName = await getSpaceName({ space: childSpaceId });
    console.log(`Child space renamed to: ${newChildName}`);

    console.log('\n--- Moving Child Space (example: moving to another root, this would fail if no other root) ---');
    // For a real test, you'd need another root space or parent
    // For demonstration, let's assume moving it to a non-existent parent will throw an error
    try {
      // This call will likely fail without another valid parent for the same owner
      await moveSpace({
        owner: OWNER_ID,
        space: childSpaceId,
        newParent: "nonExistentParent123" as ID,
      });
    } catch (e: any) {
      console.error(`Expected error during moveSpace: ${e.message}`);
    }


    console.log('\n--- Getting All Spaces ---');
    const allSpaces = await getSpaces();
    console.log('All spaces:', JSON.stringify(allSpaces, null, 2));

    console.log('\n--- Getting All Space Names ---');
    const allSpaceNames = await getSpacesString();
    console.log('All space names:', allSpaceNames.join(', '));

  } catch (error: any) {
    console.error(`Operation failed: ${error.message}`);
  } finally {
    // Clean up if needed (delete spaces)
    if (childSpaceId) {
      try {
        console.log(`\n--- Deleting child space: ${childSpaceId} ---`);
        await deleteSpace({ owner: OWNER_ID, space: childSpaceId });
        console.log(`Child space ${childSpaceId} deleted.`);
      } catch (e: any) {
        console.error(`Failed to delete child space: ${e.message}`);
      }
    }
    if (rootSpaceId) {
      try {
        console.log(`\n--- Deleting root space: ${rootSpaceId} ---`);
        await deleteSpace({ owner: OWNER_ID, space: rootSpaceId });
        console.log(`Root space ${rootSpaceId} deleted.`);
      } catch (e: any) {
        console.error(`Failed to delete root space: ${e.message}`);
      }
    }
  }
}

// Uncomment to run the example
// main();
```

### Explanation and How to Use:

1. **`ID` Type:** A simple alias for `string` to make it clear what `ID`s represent.
2. **`ErrorResponse`:** Defines the shape of your error messages from the API.
3. **`SpaceDetails`:** A comprehensive interface for a space object, useful for when you retrieve full space data.
4. **`API_BASE_URL`:** **CRITICAL:** You must update this to the actual base URL where your API is running (e.g., `http://localhost:8080/api/Space`).
5. **`apiClient`:** An Axios instance configured with your base URL and `Content-Type` header. This promotes reusability and centralizes configuration.
6. **`handleApiError`:** A utility function to gracefully extract error messages from `AxiosError` objects. This makes your `catch` blocks cleaner.
7. **Endpoint-Specific Types:**
   * For each `POST` endpoint, I've created:
     * An `interface` for its `Request Body` (e.g., `CreateSpaceRequest`).
     * An `interface` or `type` for its `Success Response Body` (e.g., `CreateSpaceResponse`). Note that for endpoints returning an array of objects (like `_getSpaceChildren`), the response interface is for *each item in the array*, and Axios will expect an array of those items (e.g., `GetSpaceOwnerResponseItem[]`). For empty responses, `Record<string, never>` or `{}` works.
8. **Endpoint Functions:**
   * Each function (`createSpace`, `moveSpace`, etc.) is an `async` function.
   * It takes the `Request Body` type as an argument.
   * It uses `apiClient.post<ResponseType>('/endpointPath', data)`. The `<ResponseType>` generic parameter is crucial for Axios to correctly infer the type of `response.data`.
   * It `awaits` the response.
   * It extracts and returns the relevant data from `response.data`.
   * It includes a `try...catch` block to handle potential API errors, using the `handleApiError` utility.
   * For query endpoints returning arrays (like `_getSpaceOwner`), it often expects `response.data` to be an array, and you'll typically access the first element `response.data[0]`.
   * For `_getSpaceChildren` and `_getSpacesString`, it uses `map` to transform the array of objects into an array of simple IDs or strings.
9. **Example Usage (`main` function):**
   * Demonstrates how to import and call these functions.
   * Shows how to handle `Promise` returns and `async/await`.
   * Includes basic `try...catch` blocks for robust client-side error handling.
   * Includes a cleanup section to show how you might delete created resources.

### To Use This Code:

1. **Install Axios:**
   ```bash
   npm install axios
   npm install --save-dev @types/axios
   ```
   or
   ```bash
   yarn add axios
   yarn add -D @types/axios
   ```
2. **Save:** Save the code above (or the relevant parts) in a `.ts` file (e.g., `spaceApiClient.ts`).
3. **Configure `API_BASE_URL`:** Change `http://localhost:3000/api/Space` to match the actual address of your backend API.
4. **Import and Call:** In your application code (e.g., a React component, a Node.js script), import the functions you need:
   ```typescript
   import { createSpace, getSpaces, deleteSpace, ID } from './spaceApiClient';

   async function runApp() {
     const ownerId: ID = "someUserId";
     try {
       const newSpaceId = await createSpace({
         owner: ownerId,
         name: "My New Project",
         spaceType: "Project",
         parent: null
       });
       console.log("Created space:", newSpaceId);

       const allSpaces = await getSpaces();
       console.log("All spaces:", allSpaces);

       // ... do more things

       await deleteSpace({ owner: ownerId, space: newSpaceId });
       console.log("Deleted space:", newSpaceId);

     } catch (error: any) {
       console.error("API call failed:", error.message);
     }
   }

   runApp();
   ```

This setup provides a highly type-safe and organized way to interact with your Space API, leveraging the power of TypeScript and Axios.
