// services/user/userService.ts

import { IUser } from "@/types/interfaces";

// ✅ Fetch users by role or filters (e.g., groupClass, institution)
export const fetchUsers = async (filters?: Record<string, string>): Promise<IUser[]> => {
  const query = filters
    ? "?" + new URLSearchParams(filters).toString()
    : "";
  const response = await fetch(`/api/users${query}`);
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
};

// ✅ Get single user
export const getUserById = async (id: string): Promise<IUser> => {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) throw new Error("Failed to fetch user");
  return response.json();
};

// ✅ Create user (teacher, parent, etc.)
export const createUser = async (data: IUser): Promise<IUser> => {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create user");
  return response.json();
};

// ✅ Update user
export const updateUser = async (id: string, data: IUser): Promise<IUser> => {
  const response = await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update user");
  return response.json();
};

// ✅ Delete user
export const deleteUser = async (id: string): Promise<void> => {
  const response = await fetch(`/api/users/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete user");
};
