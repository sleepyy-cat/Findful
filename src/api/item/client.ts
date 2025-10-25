// item-api.service.ts
import axios, { AxiosInstance, AxiosError } from 'axios';
import {
    // Core types
    Item, Owner, ErrorResponse,

    // Request/Response types for each endpoint
    CreateItemRequest, CreateItemSuccessResponse,
    DeleteItemRequest,
    UpdateItemDetailsRequest,
    GetItemQueryRequest,
    GetItemOwnerArrayResponse,
    GetItemNameArrayResponse,
    GetItemDescriptionArrayResponse,
    GetItemCategoryArrayResponse,
    GetItemsSuccessResponse,
    GetItemsStringSuccessResponse,
    GetItemsByUserRequest, GetItemsByUserSuccessResponse
} from './item-api.types'; // Adjust path as needed

// A base URL for your API
const API_BASE_URL = '/api/Item';

export class ItemApiClient {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string = API_BASE_URL) {
        this.axiosInstance = axios.create({
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Optional: Add request/response interceptors for logging, error handling, auth tokens
        this.axiosInstance.interceptors.response.use(
            response => response,
            error => {
                const axiosError = error as AxiosError<ErrorResponse>;
                if (axiosError.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.error(`API Error: ${axiosError.response.status}`, axiosError.response.data);
                    // You might want to throw a custom error here or transform the error
                    return Promise.reject(axiosError.response.data.error || 'An unknown error occurred');
                } else if (axiosError.request) {
                    // The request was made but no response was received
                    console.error('Network Error:', axiosError.request);
                    return Promise.reject('Network error or server is unreachable');
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Axios Error:', axiosError.message);
                    return Promise.reject('Request setup error');
                }
            }
        );
    }

    /**
     * Creates a new item for a specified owner.
     * @param request - The item details for creation.
     * @returns The newly created item.
     */
    public async createItem(request: CreateItemRequest): Promise<CreateItemSuccessResponse> {
        try {
            const response = await this.axiosInstance.post<CreateItemSuccessResponse>('/createItem', request);
            return response.data;
        } catch (error) {
            // Error is already handled by interceptor, just re-throw or log more specifically if needed
            throw error;
        }
    }

    /**
     * Deletes a specific item from the collection.
     * @param request - The owner and item details to identify the item for deletion.
     */
    public async deleteItem(request: DeleteItemRequest): Promise<void> {
        try {
            await this.axiosInstance.post<{} /* Empty response */>('/deleteItem', request);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Updates the name, description, and/or category of an existing item.
     * @param request - The owner, original item details, and new optional details for update.
     */
    public async updateItemDetails(request: UpdateItemDetailsRequest): Promise<void> {
        try {
            await this.axiosInstance.post<{} /* Empty response */>('/updateItemDetails', request);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves the username of the owner of a specified item.
     * @param request - The item details to identify the item.
     * @returns The owner's username.
     */
    public async getItemOwner(request: GetItemQueryRequest): Promise<GetItemOwnerArrayResponse[0]> {
        try {
            const response = await this.axiosInstance.post<GetItemOwnerArrayResponse>('/_getItemOwner', request);
            // Assuming the spec means a single item is returned in the array for this query
            if (response.data && response.data.length > 0) {
                return response.data[0];
            }
            throw new Error('Item owner not found or response was empty.');
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves the name of a specified item.
     * @param request - The item details to identify the item.
     * @returns The item's name.
     */
    public async getItemName(request: GetItemQueryRequest): Promise<GetItemNameArrayResponse[0]> {
        try {
            const response = await this.axiosInstance.post<GetItemNameArrayResponse>('/_getItemName', request);
             if (response.data && response.data.length > 0) {
                return response.data[0];
            }
            throw new Error('Item name not found or response was empty.');
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves the description of a specified item.
     * @param request - The item details to identify the item.
     * @returns The item's description.
     */
    public async getItemDescription(request: GetItemQueryRequest): Promise<GetItemDescriptionArrayResponse[0]> {
        try {
            const response = await this.axiosInstance.post<GetItemDescriptionArrayResponse>('/_getItemDescription', request);
             if (response.data && response.data.length > 0) {
                return response.data[0];
            }
            throw new Error('Item description not found or response was empty.');
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves the category of a specified item.
     * @param request - The item details to identify the item.
     * @returns The item's category.
     */
    public async getItemCategory(request: GetItemQueryRequest): Promise<GetItemCategoryArrayResponse[0]> {
        try {
            const response = await this.axiosInstance.post<GetItemCategoryArrayResponse>('/_getItemCategory', request);
             if (response.data && response.data.length > 0) {
                return response.data[0];
            }
            throw new Error('Item category not found or response was empty.');
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves a list of all items currently in the collection.
     * @returns An array of all items.
     */
    public async getItems(): Promise<GetItemsSuccessResponse> {
        try {
            const response = await this.axiosInstance.post<GetItemsSuccessResponse>('/_getItems', {});
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves a list of names for all items in the collection.
     * @returns An array containing the names of all items.
     */
    public async getItemsString(): Promise<GetItemsStringSuccessResponse> {
        try {
            const response = await this.axiosInstance.post<GetItemsStringSuccessResponse>('/_getItemsString', {});
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves all items owned by a specified user.
     * @param request - The user whose items are to be retrieved.
     * @returns An array of items owned by the specified user.
     */
    public async getItemsByUser(request: GetItemsByUserRequest): Promise<GetItemsByUserSuccessResponse> {
        try {
            const response = await this.axiosInstance.post<GetItemsByUserSuccessResponse>('/_getItemsByUser', request);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
```

---

### How to Use

1.  **Install Axios:**
    ```bash
    npm install axios
    npm install -D @types/axios # for TypeScript typings
    ```

2.  **Organize Files:**
    You'd typically put these in files like:
    *   `src/api/core-types.ts` (for `Owner`, `Item`, `ErrorResponse`)
    *   `src/api/item-api.types.ts` (for endpoint-specific request/response interfaces)
    *   `src/api/item-api.service.ts` (for the `ItemApiClient` class)

3.  **Example Usage:**

    ```typescript
    // main.ts or some component/service file
    import { ItemApiClient } from './api/item-api.service';
    import { Owner, Item } from './api/core-types'; // Assuming 'core-types.ts'

    const itemApiClient = new ItemApiClient();

    async function runApp() {
        // --- Create an Item ---
        const newOwner: Owner = { username: 'john_doe' };
        const newItemDetails = {
            owner: newOwner,
            name: 'My First Item',
            description: 'A shiny new item.',
            category: 'Gadgets'
        };

        try {
            const createdItemResponse = await itemApiClient.createItem(newItemDetails);
            console.log('Created Item:', createdItemResponse.item);

            // Let's assume the created item's full details are needed for subsequent operations
            const createdItem: Item = createdItemResponse.item;

            // --- Get Item Owner ---
            const itemOwnerResponse = await itemApiClient.getItemOwner({ item: createdItem });
            console.log('Item Owner:', itemOwnerResponse.ownerUsername);

            // --- Update Item ---
            await itemApiClient.updateItemDetails({
                owner: newOwner, // Must be the item's owner
                item: createdItem, // Identify the item to update
                name: 'My Updated Item', // New name
                description: 'An even shinier updated item.', // New description
                // category: 'Electronics' // Category can also be updated
            });
            console.log('Item updated successfully.');

            // --- Get All Items ---
            const allItems = await itemApiClient.getItems();
            console.log('All Items:', allItems);

            // --- Get Items by User ---
            const johnsItems = await itemApiClient.getItemsByUser({ user: { username: 'john_doe' } });
            console.log("John's Items:", johnsItems);

            // --- Delete Item ---
            // Note: The original spec sends the full item object for deletion.
            // If the item's details (like name) changed after update, you'd need the *current*
            // state of the item for this to work based on your spec.
            // A more robust API might use a unique item ID.
            const itemToDelete: Item = {
                owner: newOwner,
                name: 'My Updated Item', // Use the updated name for identification
                description: 'An even shinier updated item.',
                category: 'Gadgets' // Original category if not updated, or updated category if changed
            }
            await itemApiClient.deleteItem({ owner: newOwner, item: itemToDelete });
            console.log('Item deleted successfully.');

        } catch (error) {
            console.error('API call failed:', error);
        }
    }

    runApp();