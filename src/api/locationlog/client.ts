import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import {
  Item,
  Space,
  LocationLog,
  ApiErrorResponse,
  LocationLogApiError,
  Owner // Also export Owner, Item, Space for convenience
} from './types';

export class LocationLogApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string, axiosConfig?: AxiosRequestConfig) {
    this.axiosInstance = axios.create({
      baseURL, // e.g., "http://localhost:3000/api" or "/api" if proxying
      headers: {
        'Content-Type': 'application/json',
      },
      ...axiosConfig, // Allow users to override or add custom config like auth tokens
    });
  }

  /**
   * Centralized error handling for all API calls.
   * Throws a custom `LocationLogApiError` for easier client-side consumption.
   */
  private handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      if (axiosError.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errorMessage = axiosError.response.data?.error || `API Error: ${axiosError.response.status}`;
        throw new LocationLogApiError(
          errorMessage,
          axiosError.response.status,
          axiosError
        );
      } else if (axiosError.request) {
        // The request was made but no response was received
        throw new LocationLogApiError('No response received from the server. The server might be down or unreachable.', undefined, axiosError);
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new LocationLogApiError(`Request setup error: ${axiosError.message}`, undefined, axiosError);
      }
    }
    // Handle non-Axios errors
    throw new LocationLogApiError(`An unexpected error occurred: ${String(error)}`, undefined, error);
  }

  /**
   * POST /api/LocationLog/createLog
   * Creates a new location log for a given item in a specified space.
   */
  async createLog(thisItem: Item, currentSpace: Space): Promise<LocationLog> {
    try {
      const response = await this.axiosInstance.post<LocationLog>('/LocationLog/createLog', {
        thisItem,
        currentSpace,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * POST /api/LocationLog/placeItem
   * Places an item into a specified space, updating its current location and history,
   * or creating a new log if one doesn't exist for the item.
   */
  async placeItem(linkItem: Item, linkSpace: Space): Promise<void> {
    try {
      // The success response body is empty, so we just await the request.
      await this.axiosInstance.post<Record<string, never>>('/LocationLog/placeItem', {
        linkItem,
        linkSpace,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * POST /api/LocationLog/deleteLog
   * Deletes the location log associated with a specific item.
   */
  async deleteLog(currItem: Item): Promise<void> {
    try {
      // The success response body is empty, so we just await the request.
      await this.axiosInstance.post<Record<string, never>>('/LocationLog/deleteLog', {
        currItem,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * POST /api/LocationLog/_getItemLog
   * Retrieves the location log for a specific item.
   * Returns an array, which could be empty if not found, or contain one log.
   */
  async getItemLog(item: Item): Promise<LocationLog[]> {
    try {
      const response = await this.axiosInstance.post<LocationLog[]>('/LocationLog/_getItemLog', { item });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * POST /api/LocationLog/_getLogs
   * Retrieves all existing location logs.
   */
  async getLogs(): Promise<LocationLog[]> {
    try {
      const response = await this.axiosInstance.post<LocationLog[]>('/LocationLog/_getLogs', {});
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}

// Export the types along with the client for easier consumption
export { Item, Space, LocationLog, Owner };
```

### 3. Usage Example

Here's how you would use this client in your application:

```typescript
// src/app.ts or your main application file

import { LocationLogApiClient, LocationLogApiError, Item, Space, Owner } from './api/locationLog/client'; // Adjust path as needed

// --- Configuration ---
// Assuming your API is hosted at http://localhost:3000
// If you're using a proxy in your frontend (e.g., create-react-app proxy config),
// you might just use '/api' as the baseURL for the client.
const API_BASE_URL = 'http://localhost:3000/api';

// You can pass custom Axios config, e.g., for authentication headers
const apiClient = new LocationLogApiClient(API_BASE_URL, {
  // headers: {
  //   Authorization: `Bearer YOUR_AUTH_TOKEN`,
  // },
});

// --- Example Usage ---
async function runExample() {
  const owner: Owner = { username: 'john_doe' };

  const item1: Item = { name: 'Laptop', owner };
  const item2: Item = { name: 'Mouse', owner };

  const space1: Space = { name: 'Office Desk', owner };
  const space2: Space = { name: 'Meeting Room A', owner };
  const space3: Space = { name: 'Storage Cabinet', owner };

  try {
    console.log('--- Creating a new log for Laptop ---');
    const newLog = await apiClient.createLog(item1, space1);
    console.log('Created Log:', newLog);

    console.log('\n--- Placing Laptop into Meeting Room A ---');
    await apiClient.placeItem(item1, space2);
    console.log('Laptop placed in Meeting Room A.');

    console.log('\n--- Placing Mouse into Office Desk (will create a new log) ---');
    await apiClient.placeItem(item2, space1);
    console.log('Mouse placed in Office Desk.');

    console.log('\n--- Getting log for Laptop ---');
    const laptopLog = await apiClient.getItemLog(item1);
    if (laptopLog.length > 0) {
      console.log('Laptop Log:', laptopLog[0]);
    } else {
      console.log('Laptop log not found.');
    }

    console.log('\n--- Getting all logs ---');
    const allLogs = await apiClient.getLogs();
    console.log('All Logs:', allLogs);

    console.log('\n--- Placing Laptop back to Meeting Room A (no change expected) ---');
    await apiClient.placeItem(item1, space2); // Should not add to history if currentSpace is same
    const laptopLogAfterNoChange = await apiClient.getItemLog(item1);
    console.log('Laptop Log after placing in same space:', laptopLogAfterNoChange[0]);


    console.log('\n--- Deleting log for Mouse ---');
    await apiClient.deleteLog(item2);
    console.log('Mouse log deleted.');

    console.log('\n--- Getting all logs after deletion ---');
    const logsAfterDeletion = await apiClient.getLogs();
    console.log('Logs after deletion:', logsAfterDeletion);

  } catch (error) {
    if (error instanceof LocationLogApiError) {
      console.error('API Error:', error.message);
      if (error.statusCode) {
        console.error('Status Code:', error.statusCode);
      }
      // You can also access the original AxiosError if needed
      // console.error('Original Error:', error.originalError);
    } else {
      console.error('An unexpected non-API error occurred:', error);
    }
  }

  // --- Example of an expected error (e.g., creating a log that already exists) ---
  try {
    console.log('\n--- Attempting to create a log for Laptop again (expected error) ---');
    await apiClient.createLog(item1, space3);
    console.log('Unexpected: Successfully created duplicate log for Laptop.');
  } catch (error) {
    if (error instanceof LocationLogApiError) {
      console.error('Expected API Error (duplicate log):', error.message);
    } else {
      console.error('An unexpected non-API error occurred during expected error test:', error);
    }
  }
}

runExample();