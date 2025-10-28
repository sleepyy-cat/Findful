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
