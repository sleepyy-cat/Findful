---
timestamp: 'Tue Oct 28 2025 00:44:34 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251028_004434.c4181ef8.md]]'
content_id: e3fe511deb42135236ca31e854e75e3fe7d3b1948bdf0301c0c4cc051b06ee30
---

# response:

Okay, let's create a robust TypeScript client for your API specification using Axios.

We'll define interfaces for all request and response bodies, set up a configured Axios instance, and create a `BundleApiClient` class to encapsulate all API calls, including centralized error handling.

***

### 1. Setup: Install Axios

If you haven't already, install Axios:

```bash
npm install axios
# OR
yarn add axios
```

### 2. API Client Implementation

Let's put everything in a single file for clarity, e.g., `bundleApiClient.ts`.

```typescript
// bundleApiClient.ts
import axios, { AxiosInstance, AxiosError } from 'axios';

// --- 1. Type Definitions (Interfaces) ---

/** Represents a single bundle object. */
export interface Bundle {
  owner: string;
  name: string;
  members: string[]; // Array of item IDs
}

/** Common error response from the API. */
export interface ApiError {
  error: string;
}

// --- Request Body Interfaces ---

export interface CreateBundleRequest {
  user: string;
  name: string;
}

export interface DeleteBundleRequest {
  user: string;
  name: string;
}

export interface AddItemToBundleRequest {
  user: string;
  item: string;
  bundleName: string;
}

export interface RemoveItemFromBundleRequest {
  user: string;
  item: string;
  bundleName: string;
}

export interface GetBundlesRequest {} // Empty object as per spec

// --- Response Body Interfaces ---

export interface CreateBundleResponse {
  bundle: Bundle;
}

export interface DeleteBundleResponse {} // Empty object as per spec

export interface AddItemToBundleResponse {} // Empty object as per spec

export interface RemoveItemFromBundleResponse {} // Empty object as per spec

export type GetBundlesResponse = Bundle[]; // Array of bundles

// --- 2. Custom Error Handling ---

/**
 * A custom error class to wrap API errors for easier catching and handling
 * in the application.
 */
export class BundleServiceError extends Error {
  apiError?: ApiError;
  status?: number; // HTTP status code

  constructor(message: string, options?: { apiError?: ApiError; status?: number }) {
    super(message);
    this.name = 'BundleServiceError';
    this.apiError = options?.apiError;
    this.status = options?.status;

    // Maintain proper stack trace for where our error was thrown (V8 specific)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BundleServiceError);
    }
  }
}

/**
 * Centralized function to handle Axios errors and transform them into
 * our custom BundleServiceError.
 * @param error The error caught from an Axios request.
 * @returns {never} This function always throws.
 */
function handleAxiosError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const apiErrorMessage = (axiosError.response?.data as ApiError)?.error;
    const statusCode = axiosError.response?.status;

    if (apiErrorMessage) {
      throw new BundleServiceError(apiErrorMessage, { apiError: axiosError.response?.data as ApiError, status: statusCode });
    } else if (axiosError.request) {
      // The request was made but no response was received
      throw new BundleServiceError('No response received from the server. Please check your network connection.', { status: statusCode });
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new BundleServiceError(`Request failed: ${axiosError.message}`, { status: statusCode });
    }
  }
  // For non-Axios errors (e.g., programming errors before the request is sent)
  throw new BundleServiceError('An unexpected client error occurred.', { apiError: { error: (error as Error).message } });
}

// --- 3. API Client Class ---

export class BundleApiClient {
  private axiosInstance: AxiosInstance;

  /**
   * Creates an instance of BundleApiClient.
   * @param baseURL The base URL for the API (e.g., 'http://localhost:3000/api/Bundle').
   *                Defaults to '/api/Bundle' for relative paths in a proxy setup.
   */
  constructor(baseURL: string = '/api/Bundle') {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      // You might add an interceptor here for authentication tokens, etc.
      // interceptors: {
      //   request: [
      //     (config) => {
      //       const token = localStorage.getItem('authToken');
      //       if (token) {
      //         config.headers.Authorization = `Bearer ${token}`;
      //       }
      //       return config;
      //     },
      //   ],
      // },
    });
  }

  /**
   * Creates a new bundle.
   * @param data Request body containing user and bundle name.
   * @returns The newly created bundle object.
   * @throws {BundleServiceError} If the API call fails.
   */
  public async createBundle(data: CreateBundleRequest): Promise<CreateBundleResponse> {
    try {
      const response = await this.axiosInstance.post<CreateBundleResponse>('/createBundle', data);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }

  /**
   * Deletes an existing bundle.
   * @param data Request body containing user and bundle name.
   * @returns An empty object on success.
   * @throws {BundleServiceError} If the API call fails.
   */
  public async deleteBundle(data: DeleteBundleRequest): Promise<DeleteBundleResponse> {
    try {
      const response = await this.axiosInstance.post<DeleteBundleResponse>('/deleteBundle', data);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }

  /**
   * Adds an item to an existing bundle.
   * @param data Request body containing user, item ID, and bundle name.
   * @returns An empty object on success.
   * @throws {BundleServiceError} If the API call fails.
   */
  public async addItemToBundle(data: AddItemToBundleRequest): Promise<AddItemToBundleResponse> {
    try {
      const response = await this.axiosInstance.post<AddItemToBundleResponse>('/addItemToBundle', data);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }

  /**
   * Removes an item from an existing bundle.
   * @param data Request body containing user, item ID, and bundle name.
   * @returns An empty object on success.
   * @throws {BundleServiceError} If the API call fails.
   */
  public async removeItemFromBundle(data: RemoveItemFromBundleRequest): Promise<RemoveItemFromBundleResponse> {
    try {
      const response = await this.axiosInstance.post<RemoveItemFromBundleResponse>('/removeItemFromBundle', data);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }

  /**
   * Retrieves a list of all bundles.
   * Note: The spec uses POST with an empty body for this query, which is unusual for a GET operation.
   * We are adhering to the spec here.
   * @returns A list of all bundles.
   * @throws {BundleServiceError} If the API call fails.
   */
  public async getBundles(): Promise<GetBundlesResponse> {
    try {
      const response = await this.axiosInstance.post<GetBundlesResponse>('/getBundles', {}); // Empty body as per spec
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  }
}
```

***

### 3. How to Use It

You can import and use this `BundleApiClient` in your application:

```typescript
// app.ts or a React/Vue component

import { BundleApiClient, BundleServiceError, Bundle } from './bundleApiClient'; // Adjust path as needed

// Initialize the client
// If your backend is on the same domain and uses /api/Bundle, the default is fine.
// Otherwise, specify the full URL, e.g., 'http://localhost:5000/api/Bundle'
const bundleApiClient = new BundleApiClient('http://localhost:5000/api/Bundle'); // Example: Replace with your actual backend URL

async function exampleUsage() {
  const userId = 'user123';
  const bundleName = 'My Awesome Collection';
  const itemId1 = 'itemABC';
  const itemId2 = 'itemXYZ';

  try {
    // 1. Create a bundle
    console.log(`Creating bundle "${bundleName}" for user "${userId}"...`);
    const createdBundle = await bundleApiClient.createBundle({ user: userId, name: bundleName });
    console.log('Bundle created:', createdBundle.bundle);

    // 2. Add items to the bundle
    console.log(`Adding item "${itemId1}" to bundle "${bundleName}"...`);
    await bundleApiClient.addItemToBundle({ user: userId, item: itemId1, bundleName: bundleName });
    console.log('Item 1 added successfully.');

    console.log(`Adding item "${itemId2}" to bundle "${bundleName}"...`);
    await bundleApiClient.addItemToBundle({ user: userId, item: itemId2, bundleName: bundleName });
    console.log('Item 2 added successfully.');

    // 3. Get all bundles (to see the updates)
    console.log('Retrieving all bundles...');
    const allBundles = await bundleApiClient.getBundles();
    console.log('All bundles:', allBundles);
    const myBundle = allBundles.find(b => b.owner === userId && b.name === bundleName);
    console.log('My updated bundle:', myBundle);

    // 4. Remove an item from the bundle
    console.log(`Removing item "${itemId1}" from bundle "${bundleName}"...`);
    await bundleApiClient.removeItemFromBundle({ user: userId, item: itemId1, bundleName: bundleName });
    console.log('Item 1 removed successfully.');

    // 5. Get all bundles again to confirm removal
    console.log('Retrieving all bundles after item removal...');
    const allBundlesAfterRemoval = await bundleApiClient.getBundles();
    const myBundleAfterRemoval = allBundlesAfterRemoval.find(b => b.owner === userId && b.name === bundleName);
    console.log('My bundle after item removal:', myBundleAfterRemoval);


    // 6. Delete the bundle
    console.log(`Deleting bundle "${bundleName}" for user "${userId}"...`);
    await bundleApiClient.deleteBundle({ user: userId, name: bundleName });
    console.log('Bundle deleted successfully.');

    // 7. Try to get all bundles again (bundle should be gone)
    console.log('Retrieving all bundles after bundle deletion...');
    const bundlesAfterDeletion = await bundleApiClient.getBundles();
    console.log('All bundles:', bundlesAfterDeletion);

  } catch (error) {
    if (error instanceof BundleServiceError) {
      console.error('API Error:', error.message);
      if (error.apiError) {
        console.error('Detailed API Error:', error.apiError.error);
      }
      if (error.status) {
        console.error('HTTP Status:', error.status);
      }
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
}

exampleUsage();
```

***

### Explanation of the Implementation:

1. **Type Definitions:**
   * `Bundle`: Represents the core structure of a bundle object.
   * `ApiError`: Defines the common error response format.
   * Separate interfaces for each request and response body, ensuring strong typing for all API interactions.

2. **Custom Error Handling (`BundleServiceError` and `handleAxiosError`):**
   * `BundleServiceError`: A custom `Error` class extends the native `Error` to provide more context. It can store the `ApiError` object directly and the HTTP status code. This allows you to catch `BundleServiceError` specifically in your application logic and access its properties.
   * `handleAxiosError`: This central function catches `unknown` errors (as `try...catch` blocks do in TypeScript) and intelligently determines if it's an `AxiosError`.
     * If it's an `AxiosError` and contains a `response.data.error` (matching your `ApiError` format), it throws a `BundleServiceError` with that specific message.
     * If no specific API error is found but the request was sent (e.g., server timeout), it provides a generic network error message.
     * If the request couldn't even be sent (e.g., malformed URL), it reports a request setup error.
     * It handles non-Axios errors as well, providing a fallback.
     * The `never` return type indicates that this function *always* throws an error, which helps TypeScript's control flow analysis.

3. **`BundleApiClient` Class:**
   * **`axiosInstance`:** A private `AxiosInstance` is created in the constructor. This instance is pre-configured with the `baseURL` and `Content-Type` headers. This is crucial for:
     * **Reusability:** All methods use the same configured instance.
     * **Maintainability:** Configuration changes are made in one place.
     * **Interceptors:** You can easily add Axios interceptors (e.g., for adding authentication tokens, logging, or refresh token logic) to this instance.
   * **Constructor:** Accepts an optional `baseURL`. This makes your client flexible for different environments (development, production, testing) without hardcoding the URL.
   * **Methods for Endpoints:**
     * Each public method (`createBundle`, `deleteBundle`, etc.) corresponds to an API endpoint.
     * They are `async` and return `Promise<T>` where `T` is the specific success response type.
     * They use `this.axiosInstance.post` (or `get`, if applicable, but your spec uses POST for all) to make the request.
     * The `try...catch` block wraps each request, calling `handleAxiosError` if an error occurs.
     * Type assertions like `<CreateBundleResponse>` are used with `axios.post` to inform TypeScript about the expected response data shape.

This setup provides a type-safe, error-resilient, and modular way to interact with your Bundle API from a TypeScript application.
