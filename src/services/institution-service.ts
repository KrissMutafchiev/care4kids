import { IInstitution } from "@/types/interfaces";

// ✅ Fetch all institutions
export const fetchInstitutions = async (): Promise<IInstitution[]> => {
  const response = await fetch("/api/institutions");
  if (!response.ok) throw new Error("Failed to fetch institutions");
  return response.json();
};

// ✅ Get institution by ID
export const getInstitutionById = async (id: string): Promise<IInstitution> => {
  const response = await fetch(`/api/institutions/${id}`);
  if (!response.ok) throw new Error("Failed to fetch institution");
  return response.json();
};

// ✅ Create institution
export const createInstitution = async (data: IInstitution): Promise<IInstitution> => {
  const response = await fetch("/api/institutions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create institution");
  return response.json();
};

// ✅ Update institution
export const updateInstitution = async (id: string, data: IInstitution): Promise<IInstitution> => {
  const response = await fetch(`/api/institutions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update institution");
  return response.json();
};

// ✅ Delete institution
export const deleteInstitution = async (id: string): Promise<void> => {
  const response = await fetch(`/api/institutions/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete institution");
};
