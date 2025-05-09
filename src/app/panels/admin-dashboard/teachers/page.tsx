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
  IUser,
  IInstitution,
  IGroupClass,
} from "@/types/interfaces";
import { USER_ROLE } from "@/utils/user-role.consts";
import { deleteUser, fetchUsers ,createUser, updateUser} from "@/services/user-service";
import { fetchInstitutions } from "@/services/institution-service";
import { fetchGroupClasses } from "@/services/group-class-service";

const TeachersManagement = () => {
  const { showAlert } = useAlert();

  const [teachers, setTeachers] = useState<IUser[]>([]);
  const [institutions, setInstitutions] = useState<IInstitution[]>([]);
  const [groupClasses, setGroupClasses] = useState<IGroupClass[]>([]);
  const [selectedInstitution, setSelectedInstitution] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTeacher, setSelectedTeacher] = useState<IUser | null>(
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
        const institutions = await fetchInstitutions()
        setInstitutions(institutions);

        if (institutions.length > 0 && institutions[0]._id) {
          setSelectedInstitution(institutions[0]._id);
        }

        // Fetch group classes
        const groupClasses = await fetchGroupClasses();
        setGroupClasses(groupClasses);
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
      const teachersData = await fetchUsers({ institutions: selectedInstitution, role: USER_ROLE.TEACHER });
      setTeachers(teachersData);
    } catch (error: any) {
      showAlert(error.message || "Failed to fetch teachers", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (teacher: IUser | null = null) => {
    setSelectedTeacher(teacher);
    setFormData(
      teacher
        ? {
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            email: teacher.email,
            institution: teacher.institution?._id || "",
            groupClass: teacher.groupClasses?.[0]?._id || "",
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
  
    try {
      let result;
  
      if (selectedTeacher) {
        result = await updateUser(selectedTeacher._id, formData);
      } else {
        result = await createUser(formData);
      }
  
      if (!result) throw new Error("Invalid response from server");
  
      await fetchTeachers();
  
      showAlert(
        selectedTeacher
          ? "User updated successfully!"
          : `User created successfully!`,'success'
      );
  
      closeModal();
    } catch (error: any) {
      showAlert(error.message || "Failed to save user", "error");
    }
  };
  

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this teacher?")) return;

    try {
      await deleteUser(id)
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
            <Table.Row key={teacher._id?.toString()}>
              <Table.Cell>
                {teacher.firstName} {teacher.lastName}
              </Table.Cell>
              <Table.Cell>{teacher.email}</Table.Cell>
              <Table.Cell>{teacher.institution?.name || "N/A"}</Table.Cell>
              <Table.Cell>{teacher.groupClasses?.[0]?.name || "N/A"}</Table.Cell>
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
                    onClick={() => teacher._id && handleDelete(teacher._id.toString())}
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
