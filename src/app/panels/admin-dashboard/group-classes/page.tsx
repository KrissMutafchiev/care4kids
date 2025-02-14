"use client";

import React, { useState, useEffect } from "react";
import {
  Label,
  TextInput,
  Button,
  Table,
  Spinner,
  Modal,
  Select,
} from "flowbite-react";
import { useAlert } from "@/app/context/AlertContext";
import { GroupClassModel, InstitutionModel } from "@/types/interfaces"; // Ensure you have these interfaces
import { Trash2, Edit } from "lucide-react";

const GroupClasses = () => {
  const { showAlert } = useAlert();

  const [groupClasses, setGroupClasses] = useState<GroupClassModel[]>([]);
  const [institutions, setInstitutions] = useState<InstitutionModel[]>([]); // Institutions for dropdown
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedGroup, setSelectedGroup] = useState<GroupClassModel | null>(
    null
  );
  const [formData, setFormData] = useState<any>({
    name: "",
    institution: {},
    kids: [],
    teacher: [],
  });

  // Fetch institutions and group classes on load
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch group classes
        const groupResponse = await fetch(
          "/api/operative/group-class/get-group-class"
        );
        if (!groupResponse.ok) throw new Error("Failed to fetch group classes");
        const groupData = await groupResponse.json();
        setGroupClasses(groupData);

        // Fetch institutions
        const institutionResponse = await fetch(
          "/api/operative/institution/get-institution"
        );
        if (!institutionResponse.ok)
          throw new Error("Failed to fetch institutions");
        const institutionData = await institutionResponse.json();
        setInstitutions(institutionData);
      } catch (error: any) {
        showAlert(error.message || "Failed to fetch data", "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle modal open/close
  const openModal = (groupClass: GroupClassModel | null = null) => {
    setSelectedGroup(groupClass);
    if (groupClass) {
      setFormData({
        name: groupClass.name,
        institution: groupClass.institution,
        kids: groupClass.kids || [],
        teacher: groupClass.teacher || [],
      });
    } else {
      setFormData({ name: "", institution: {}, kids: [], teacher: [] });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGroup(null);
    setFormData({ name: "", institution: {}, kids: [], teacher: [] });
  };

  // Handle form submission for create/update
  const handleSubmit = async () => {
    const endpoint = selectedGroup
      ? `/api/operative/group-class/update-group-class/${selectedGroup._id}`
      : "/api/operative/group-class/create-group-class";
    const method = selectedGroup ? "PUT" : "POST";

    try {
      // Ensure formData contains the selected institution object (not just ID)
      if (!formData.institution) {
        showAlert("Institution is required", "error");
        return;
      }

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save group class");

      const updatedData = await response.json();

      setGroupClasses(prev => {
        if (selectedGroup) {
          return prev.map(g => (g._id === updatedData._id ? updatedData : g));
        } else {
          return [...prev, updatedData];
        }
      });

      // Show success alert
      showAlert("Group class saved successfully!", "success");
      closeModal();
    } catch (error: any) {
      showAlert("Failed to save group class", "error");
    }
  };

  // Handle delete action
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this group class?")) return;

    try {
      const response = await fetch(
        `/api/operative/group-class/delete-group-class/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete group class");

      setGroupClasses(prev => prev.filter(g => g._id !== id));
      showAlert("Group class deleted successfully!", "success");
    } catch (error: any) {
      showAlert("Failed to delete group class", "error");
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Group Classes</h1>
        <Button onClick={() => openModal()} color="primary">
          Add Group Class
        </Button>
      </div>

      {/* Group Classes Table */}
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Institution</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {groupClasses.map((group: GroupClassModel) => (
            <Table.Row key={group._id}>
              <Table.Cell>{group.name}</Table.Cell>
              {/* Access the full institution data */}
              <Table.Cell>{group.institution?.name || "N/A"}</Table.Cell>
              <Table.Cell>
                <div className="flex space-x-4">
                  <Button
                    size="sm"
                    color="info"
                    onClick={() => openModal(group)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    size="sm"
                    color="failure"
                    onClick={() => handleDelete(group._id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* Modal for Create/Update */}
      <Modal show={isModalOpen} onClose={closeModal}>
        <Modal.Header>
          {selectedGroup ? "Edit Group Class" : "Add Group Class"}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" value="Name" />
              <TextInput
                id="name"
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="institution" value="Institution" />
              <Select
                id="institution"
                value={formData.institution}
                onChange={e =>
                  setFormData({ ...formData, institution: e.target.value })
                }
                required
              >
                <option value="">Select Institution</option>
                {institutions.map(institution => (
                  <option key={institution._id} value={institution._id}>
                    {institution.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit} color="success">
            Save
          </Button>
          <Button onClick={closeModal} color="failure">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GroupClasses;
