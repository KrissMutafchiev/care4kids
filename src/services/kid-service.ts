
import { IKid } from "@/types/interfaces";

// ✅ Fetch all kids
export const fetchKids = async (filters?: Record<string, string>): Promise<IKid[]> => {
    const query = filters ? "?" + new URLSearchParams(filters).toString() : "";
    const response = await fetch(`/api/kids${query}`);
    if (!response.ok) throw new Error("Failed to fetch kids");
    return response.json();
  };

// ✅ Get kid by ID
export const getKidById = async (id: string): Promise<IKid> => {
  const response = await fetch(`/api/kids/${id}`);
  if (!response.ok) throw new Error("Failed to fetch kid");
  return response.json();
};

// ✅ Create kid
export const createKid = async (data: IKid): Promise<IKid> => {
  const response = await fetch("/api/kids", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create kid");
  return response.json();
};

// ✅ Update kid
export const updateKid = async (id: string, data: IKid): Promise<IKid> => {
  const response = await fetch(`/api/kids/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update kid");
  return response.json();
};

// ✅ Delete kid
export const deleteKid = async (id: string): Promise<void> => {
  const response = await fetch(`/api/kids/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete kid");
};
