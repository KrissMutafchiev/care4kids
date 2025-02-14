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
import { Trash2, Edit } from "lucide-react";
import { useAlert } from "@/app/context/AlertContext";
import {
  TeacherModel,
  InstitutionModel,
  GroupClassModel,
} from "@/types/interfaces";
import { USER_ROLE } from "@/utils/user-role.consts";

const TeachersManagement = () => {
  const { showAlert } = useAlert();

  const [teachers, setTeachers] = useState<TeacherModel[]>([]);
  const [institutions, setInstitutions] = useState<InstitutionModel[]>([]);
  const [groupClasses, setGroupClasses] = useState<GroupClassModel[]>([]);
  const [selectedInstitution, setSelectedInstitution] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherModel | null>(
    null
  );

  const [formData, setFormData] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    institution: "",
    groupClass: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch institutions
        const institutionResponse = await fetch(
          "/api/operative/institution/get-institution"
        );
        if (!institutionResponse.ok)
          throw new Error("Failed to fetch institutions");
        const institutionData = await institutionResponse.json();
        setInstitutions(institutionData);

        if (institutionData.length > 0) {
          setSelectedInstitution(institutionData[0]._id);
        }

        // Fetch group classes
        const groupResponse = await fetch(
          "/api/operative/group-class/get-group-class"
        );
        if (!groupResponse.ok) throw new Error("Failed to fetch group classes");
        const groupData = await groupResponse.json();
        setGroupClasses(groupData);
      } catch (error: any) {
        showAlert(error.message || "Failed to fetch data", "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedInstitution) {
      fetchTeachers();
    }
  }, [selectedInstitution]);

  const fetchTeachers = async () => {
    setIsLoading(true);
    try {
      const teacherResponse = await fetch(
        `/api/operative/users/get-users/institution?institutionId=${selectedInstitution}`
      );
      if (!teacherResponse.ok) throw new Error("Failed to fetch teachers");
      const teacherData = await teacherResponse.json();
      setTeachers(teacherData);
    } catch (error: any) {
      showAlert(error.message || "Failed to fetch teachers", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (teacher: TeacherModel | null = null) => {
    setSelectedTeacher(teacher);
    setFormData(
      teacher
        ? {
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            email: teacher.email,
            institution: teacher.institution._id || "",
            groupClass: teacher.groupClass?._id || "",
            role: USER_ROLE.TEACHER,
          }
        : {
            firstName: "",
            lastName: "",
            email: "",
            institution: selectedInstitution || "",
            groupClass: "",
            role: USER_ROLE.TEACHER,
          }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTeacher(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      institution: selectedInstitution || "",
      groupClass: "",
      role: USER_ROLE.TEACHER,
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.institution
    ) {
      showAlert("All fields except GroupClass are required", "error");
      return;
    }

    const endpoint = selectedTeacher
      ? `/api/operative/users/update-user/${selectedTeacher._id}`
      : "/api/operative/users/create-user";
    const method = selectedTeacher ? "PUT" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save user");

      const result = await response.json();

      if (!result.teachers) throw new Error("Invalid response from server");

      setTeachers(result.teachers);

      showAlert(
        selectedTeacher
          ? "User updated successfully!"
          : `User created successfully! Temporary password: ${result.tempPassword}`,
        "success"
      );

      closeModal();
    } catch (error: any) {
      showAlert(error.message || "Failed to save user", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this teacher?")) return;

    try {
      const response = await fetch(`/api/operative/users/delete-user/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete teacher");

      setTeachers((prev) => prev.filter((t) => t._id !== id));
      showAlert("Teacher deleted successfully!", "success");
    } catch (error: any) {
      showAlert("Failed to delete teacher", "error");
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
        <h1 className="text-xl font-bold">Teachers Management</h1>
        <Button onClick={() => openModal()} color="primary">
          Add Teacher
        </Button>
      </div>
      {/* Institution Filter */}
      <div>
        <Label htmlFor="institutionFilter" value="Filter by Institution" />
        <Select
          id="institutionFilter"
          value={selectedInstitution}
          onChange={e => setSelectedInstitution(e.target.value)}
        >
          <option value="">All Institutions</option>
          {institutions.map(inst => (
            <option key={inst._id} value={inst._id}>
              {inst.name}
            </option>
          ))}
        </Select>
      </div>

      {/* Teachers Table */}
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Institution</Table.HeadCell>
          <Table.HeadCell>Group Class</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {teachers.map(teacher => (
            <Table.Row key={teacher._id.toString()}>
              <Table.Cell>
                {teacher.firstName} {teacher.lastName}
              </Table.Cell>
              <Table.Cell>{teacher.email}</Table.Cell>
              <Table.Cell>{teacher.institution.name}</Table.Cell>
              <Table.Cell>{teacher.groupClass?.name || "N/A"}</Table.Cell>
              <Table.Cell>
                <div className="flex space-x-4">
                  <Button
                    size="sm"
                    color="info"
                    onClick={() => openModal(teacher)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    size="sm"
                    color="failure"
                    onClick={() => handleDelete(teacher._id.toString())}
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
          {selectedTeacher ? "Edit Teacher" : "Add Teacher"}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <Label htmlFor="firstName" value="First Name" />
              <TextInput
                id="firstName"
                value={formData.firstName}
                onChange={e =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName" value="Last Name" />
              <TextInput
                id="lastName"
                value={formData.lastName}
                onChange={e =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                type="email"
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
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
                {institutions.map(inst => (
                  <option key={inst._id} value={inst._id}>
                    {inst.name}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="groupClass" value="Group Class (Optional)" />
              <Select
                id="groupClass"
                value={formData.groupClass}
                onChange={e =>
                  setFormData({ ...formData, groupClass: e.target.value })
                }
              >
                <option value="">None</option>
                {groupClasses.map(group => (
                  <option key={group._id} value={group._id}>
                    {group.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>
            {selectedTeacher ? "Update" : "Create"}
          </Button>
          <Button color="gray" onClick={closeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TeachersManagement;
