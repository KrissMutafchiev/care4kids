import { IGroupClass } from "@/types/interfaces";


  
  // ✅ Fetch all or by institution
  export const fetchGroupClasses = async (filters?: Record<string, string>): Promise<IGroupClass[]> => {
    const query = filters
      ? "?" + new URLSearchParams(filters).toString()
      : "";
    const response = await fetch(`/api/group-classes${query}`);
    if (!response.ok) throw new Error("Failed to fetch group classes");
    return response.json();
  };
  
  // ✅ Get one group class by ID
  export const getGroupClassById = async (id: string): Promise<IGroupClass> => {
    const response = await fetch(`/api/group-classes/${id}`);
    if (!response.ok) throw new Error("Failed to fetch group class");
    return response.json();
  };
  
  // ✅ Create a new group class
  export const createGroupClass = async (data: IGroupClass): Promise<IGroupClass> => {
    const response = await fetch(`/api/group-classes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create group class");
    return response.json();
  };
  
  // ✅ Update a group class
  export const updateGroupClass = async (id: string, data: IGroupClass): Promise<IGroupClass> => {
    const response = await fetch(`/api/group-classes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update group class");
    return response.json();
  };
  
  // ✅ Delete a group class
  export const deleteGroupClass: (id: string) => Promise<void> = async (id: string): Promise<void> => {
    const response = await fetch(`/api/group-classes/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete group class");
  };
  