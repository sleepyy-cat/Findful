---
timestamp: 'Fri Oct 24 2025 23:44:04 GMT-0400 (Eastern Daylight Time)'
parent: '[[..\20251024_234404.3c36b767.md]]'
content_id: 9d49137d374120058f6f51bbca13b883722701117f891a47c40bb001abb8a508
---

# response:

Okay, let's create a robust API client for your "Bundle Concept" using Axios and TypeScript.

We'll define interfaces for all your request and response bodies, create a dedicated Axios instance, and then build a service class that encapsulates all your API calls with proper type safety and error handling.

***

### 1. Project Setup (if you haven't already)

Make sure you have Node.js and npm/yarn installed.

```bash
# Initialize a new project if not already done
mkdir bundle-api-client
cd bundle-api-client
npm init -y

# Install dependencies
npm install axios
npm install --save-dev typescript @types/node @types/axios
```

Create a `tsconfig.json` file:

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "lib": ["es2018", "dom"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "**/*.spec.ts"
  ]
}
```

***

### 2. `src/bundleApiClient.ts` (API Client Implementation)

```typescript
import axios, { AxiosInstance, AxiosError } from 'axios';

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
  private readonly BASE_URL = '/api/Bundle'; // Base path for all bundle endpoints

  /**
   * Initializes the BundleApiClient.
   * @param customBaseURL Optional. Override the default base URL if your server is hosted elsewhere.
   *                      E.g., "http://localhost:3000/api/Bundle"
   */
  constructor(customBaseURL?: string) {
    this.apiClient = axios.create({
      baseURL: customBaseURL || this.BASE_URL,
      headers: {
        'Content-Type': 'application/json',
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
          throw new Error(`API Error: ${apiError.error} (Status: ${error.response.status})`);
        } else {
          throw new Error(`Server Error: ${error.response.status} ${error.response.statusText}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('Network Error: No response received from server.');
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
      const response = await this.apiClient.post<CreateBundleResponse>('/createBundle', data);
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
      await this.apiClient.post('/deleteBundle', data);
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
  public async addItemToBundle(data: ItemBundleModificationRequest): Promise<void> {
    try {
      await this.apiClient.post('/addItemToBundle', data);
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
  public async removeItemFromBundle(data: ItemBundleModificationRequest): Promise<void> {
    try {
      await this.apiClient.post('/removeItemFromBundle', data);
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
      const response = await this.apiClient.post<Bundle[]>('/getBundles', {});
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}
```

***

### 3. `src/index.ts` (Example Usage)

```typescript
import { BundleApiClient, Bundle, BundleModificationRequest, ItemBundleModificationRequest } from './bundleApiClient';

// Instantiate the client.
// If your API is hosted at, say, http://localhost:3000, you'd do:
// const bundleApi = new BundleApiClient('http://localhost:3000/api/Bundle');
// For this example, we'll assume the client-side code is served from the same
// origin as the API, so '/api/Bundle' is relative to the current origin.
const bundleApi = new BundleApiClient();

async function runExample() {
  const userId = "user123";
  const otherUserId = "user456"; // For testing ownership rules
  const bundleName1 = "My First Bundle";
  const bundleName2 = "My Second Bundle";
  const item1 = "itemA123";
  const item2 = "itemB456";
  const nonExistentItem = "itemXYZ";

  console.log("--- Starting Bundle API Demo ---");

  try {
    // 1. Create Bundle
    console.log(`\nCreating bundle '${bundleName1}' for user '${userId}'...`);
    const newBundle1: Bundle = await bundleApi.createBundle({ user: userId, name: bundleName1 });
    console.log("Created bundle:", newBundle1);

    console.log(`\nCreating bundle '${bundleName2}' for user '${userId}'...`);
    const newBundle2: Bundle = await bundleApi.createBundle({ user: userId, name: bundleName2 });
    console.log("Created bundle:", newBundle2);

    // 2. Try to create a duplicate bundle (should fail)
    console.log(`\nAttempting to create duplicate bundle '${bundleName1}' for user '${userId}' (expected error)...`);
    try {
      await bundleApi.createBundle({ user: userId, name: bundleName1 });
    } catch (e: any) {
      console.error("Caught expected error:", e.message);
    }

    // 3. Add item to bundle
    console.log(`\nAdding item '${item1}' to bundle '${bundleName1}' for user '${userId}'...`);
    await bundleApi.addItemToBundle({ user: userId, item: item1, bundleName: bundleName1 });
    console.log("Item added successfully.");

    console.log(`\nAdding item '${item2}' to bundle '${bundleName1}' for user '${userId}'...`);
    await bundleApi.addItemToBundle({ user: userId, item: item2, bundleName: bundleName1 });
    console.log("Item added successfully.");

    // 4. Try to add same item again (should fail)
    console.log(`\nAttempting to add duplicate item '${item1}' to bundle '${bundleName1}' (expected error)...`);
    try {
      await bundleApi.addItemToBundle({ user: userId, item: item1, bundleName: bundleName1 });
    } catch (e: any) {
      console.error("Caught expected error:", e.message);
    }

    // 5. Get all bundles to see changes
    console.log("\nRetrieving all bundles...");
    const allBundlesAfterAdd: Bundle[] = await bundleApi.getBundles();
    console.log("All bundles:", JSON.stringify(allBundlesAfterAdd, null, 2));

    // 6. Remove item from bundle
    console.log(`\nRemoving item '${item1}' from bundle '${bundleName1}' for user '${userId}'...`);
    await bundleApi.removeItemFromBundle({ user: userId, item: item1, bundleName: bundleName1 });
    console.log("Item removed successfully.");

    // 7. Try to remove non-existent item from bundle (should fail)
    console.log(`\nAttempting to remove non-existent item '${nonExistentItem}' from bundle '${bundleName1}' (expected error)...`);
    try {
      await bundleApi.removeItemFromBundle({ user: userId, item: nonExistentItem, bundleName: bundleName1 });
    } catch (e: any) {
      console.error("Caught expected error:", e.message);
    }

    // 8. Try to modify another user's bundle (should fail)
    console.log(`\nAttempting to add item to '${bundleName1}' using different user '${otherUserId}' (expected error)...`);
    try {
        await bundleApi.addItemToBundle({ user: otherUserId, item: item1, bundleName: bundleName1 });
    } catch (e: any) {
        console.error("Caught expected error:", e.message);
    }


    // 9. Get all bundles again to see removal
    console.log("\nRetrieving all bundles after item removal...");
    const allBundlesAfterRemove: Bundle[] = await bundleApi.getBundles();
    console.log("All bundles:", JSON.stringify(allBundlesAfterRemove, null, 2));

    // 10. Delete a bundle
    console.log(`\nDeleting bundle '${bundleName2}' for user '${userId}'...`);
    await bundleApi.deleteBundle({ user: userId, name: bundleName2 });
    console.log("Bundle deleted successfully.");

    // 11. Get all bundles one last time
    console.log("\nRetrieving all bundles after bundle deletion...");
    const finalBundles: Bundle[] = await bundleApi.getBundles();
    console.log("Final bundles:", JSON.stringify(finalBundles, null, 2));

  } catch (err: any) {
    console.error("\nAn unhandled error occurred during the demo:", err.message);
  }

  console.log("\n--- Bundle API Demo Complete ---");
}

runExample();
```

***

### 4. How to Compile and Run

1. **Compile:**
   ```bash
   npx tsc
   ```
   This will create a `dist` folder with `bundleApiClient.js` and `index.js`.

2. **Run the example:**
   ```bash
   node dist/index.js
   ```

### Explanation:

1. **Interfaces (`Bundle`, `BundleModificationRequest`, etc.):**
   * These are crucial for TypeScript. They define the exact shape of the data that goes into and comes out of your API calls.
   * This provides strong type checking at compile time, catching many potential errors before runtime.

2. **`BundleApiClient` Class:**
   * **`axios.create()`:** We create a custom Axios instance (`this.apiClient`). This is good practice because:
     * It allows you to set a `baseURL` once, so you don't repeat the `/api/Bundle` part in every call.
     * You can set common `headers` (like `Content-Type`) for all requests made through this client.
     * It makes it easier to add interceptors for things like authentication tokens, logging, or error handling globally.
   * **`constructor(customBaseURL?: string)`:** Allows you to configure the base URL for the API. This is very useful when deploying to different environments (development, staging, production) where the API might have a different hostname.
   * **`private handleError(error: unknown): never`:** This is a centralized error handling method.
     * It uses `axios.isAxiosError(error)` to correctly identify Axios-specific errors.
     * It differentiates between server responses (with `error.response`), network issues (`error.request`), and other setup errors.
     * It attempts to extract the specific `error` message from the `ApiErrorResponse` structure you defined.
     * It `throws` a new `Error` to ensure the calling code receives a consistent error object to catch. The `never` return type indicates that this function will *always* throw an error and never return normally.
   * **Public Methods (e.g., `createBundle`):**
     * Each public method corresponds to an API endpoint.
     * They are `async` and return `Promise<T>` where `T` is the expected success response type.
     * They use `await this.apiClient.post(...)` to make the actual API call.
     * `try...catch` blocks wrap each call, delegating error handling to `this.handleError()`.
     * The generic types on `this.apiClient.post<ResponseType>(...)` are essential for TypeScript to know the shape of the data returned by Axios.

3. **`src/index.ts` (Example Usage):**
   * Demonstrates how to import and use the `BundleApiClient`.
   * Includes example calls for all endpoints, showcasing both successful operations and expected error scenarios based on your requirements (e.g., creating a duplicate bundle, adding an item already present).
   * Uses `try...catch` for each logical block to gracefully handle expected API errors and `console.error` to display them.

This setup provides a highly maintainable, type-safe, and robust client for interacting with your "Bundle Concept" API.
