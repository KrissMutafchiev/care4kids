// lib/services/user-service.ts

import { IUser } from "@/types/interfaces";

/**
 * Fetch users by role or filters (e.g., groupClass, institution)
 * @param filters Optional filters to apply to the query
 * @returns Promise resolving to an array of users
 */
export const fetchUsers = async (
  filters?: Record<string, string>,
): Promise<IUser[]> => {
  const query = filters ? "?" + new URLSearchParams(filters).toString() : "";
  const response = await fetch(`/api/users${query}`);
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
};

/**
 * Get a single user by ID
 * @param id The user ID to fetch
 * @returns Promise resolving to a user
 */
export const getUserById = async (id: string): Promise<IUser> => {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) throw new Error("Failed to fetch user");
  return response.json();
};

/**
 * Create a new user (teacher, parent, etc.)
 * @param data The user data to create
 * @returns Promise resolving to the created user
 */
export const createUser = async (data: IUser): Promise<IUser> => {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create user");
  return response.json();
};

/**
 * Update an existing user
 * @param id The user ID to update
 * @param data The updated user data
 * @returns Promise resolving to the updated user
 */
export const updateUser = async (id: string, data: IUser): Promise<IUser> => {
  const response = await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update user");
  return response.json();
};

/**
 * Delete a user
 * @param id The user ID to delete
 * @returns Promise resolving to void
 */
export const deleteUser = async (id: string): Promise<void> => {
  const response = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete user");
};
