// owner.ts (or similar file for core types)
export interface Owner {
  username: string;
}

// item.ts (or similar file for core types)
import { UserApiClient } from "../user/client.ts"; // Assuming Owner is in a separate file

export interface Item {
  owner: UserApiClient;
  name: string;
  description: string;
  category: string;
}

// error.ts (or similar file for core types)
export interface ErrorResponse {
  error: string;
}
