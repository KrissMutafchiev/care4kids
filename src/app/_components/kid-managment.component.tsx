"use client";

import React, { useState, useEffect } from "react";
import { IInstitution, IGroupClass, IKid, IUser } from "../../types/interfaces";
import { Modal, Button, Table, Card, Spinner } from "flowbite-react";
import { fetchInstitutions } from "@/services/institution-service";
import {
  fetchKids,
  createKid,
  updateKid,
  deleteKid,
} from "@/services/kid-service";
import { fetchGroupClasses } from "@/services/group-class-service";
import { fetchUsers } from "@/services/user-service";
import { useAlert } from "../context/AlertContext";
import { Baby, Search, Plus, Pencil, Trash } from "lucide-react";

const KidManagement = () => {
  const { showAlert } = useAlert();

  const [kids, setKids] = useState<IKid[]>([]);
  const [institutions, setInstitutions] = useState<IInstitution[]>([]);
  const [classes, setClasses] = useState<IGroupClass[]>([]);
  const [teachers, setTeachers] = useState<IUser[]>([]);
  const [selectedInstitution, setSelectedInstitution] = useState<string>("");
  const [formData, setFormData] = useState<IKid>({
    firstName: "",
    middleName: "",
    lastName: "",
    age: undefined,
    gender: "",
    institution: "",
    groupClass: "",
    teachers: [],
    parents: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentKidId, setCurrentKidId] = useState<string>("");

  useEffect(() => {
    const loadInstitutions = async () => {
      try {
        const institutions = await fetchInstitutions();
        setInstitutions(institutions);
        if (institutions.length && institutions[0]._id) {
          setSelectedInstitution(institutions[0]._id);
        }
      } catch (error: any) {
        showAlert(error.message || "Failed to load institutions", "error");
      }
    };
    loadInstitutions();
  }, []);

  useEffect(() => {
    if (selectedInstitution) {
      fetchKidsByInstitution(selectedInstitution);
      loadClassesByInstitution(selectedInstitution);
    }
  }, [selectedInstitution]);

  const fetchKidsByInstitution = async (institutionId: string) => {
    try {
      setIsLoading(true);
      const data = await fetchKids({ institution: institutionId });
      setKids(data);
    } catch (error: any) {
      showAlert(error.message || "Failed to load kids", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const loadClassesByInstitution = async (institutionId: string) => {
    try {
      const data = await fetchGroupClasses(institutionId);
      setClasses(data);
    } catch (error: any) {
      showAlert(error.message || "Failed to load classes", "error");
    }
  };

  const loadTeachersByClass = async (classId: string) => {
    try {
      const data = await fetchUsers({ groupClasses: classId });
      setTeachers(data);
    } catch (error: any) {
      showAlert(error.message || "Failed to load teachers", "error");
    }
  };

  const handleInstitutionChange = (institutionId: string) => {
    setSelectedInstitution(institutionId);
  };

  const handleSubmit = async () => {
    try {
      const newKid = isEditMode
        ? await updateKid(currentKidId, { ...formData })
        : await createKid(formData);

      setKids((prevKids) =>
        isEditMode
          ? prevKids.map((kid) => (kid._id === currentKidId ? newKid : kid))
          : [...prevKids, newKid],
      );
      closeModal();
      showAlert(
        isEditMode ? "Kid updated successfully!" : "Kid added successfully!",
        "success",
      );
    } catch (error: any) {
      showAlert(error.message || "Failed to save kid", "error");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      age: undefined,
      gender: "",
      institution: selectedInstitution,
      groupClass: "",
      teachers: [],
      parents: [],
    });
    setCurrentKidId("");
  };

  const handleDelete = async (_id: string) => {
    if (confirm("Are you sure you want to delete this kid?")) {
      await deleteKid(_id);
      showAlert("Kid deleted successfully!", "success");
      setKids((prevKids) => prevKids.filter((kid) => kid._id !== _id));
    }
  };

  const handleEdit = (kid: IKid) => {
    setFormData({
      firstName: kid.firstName,
      middleName: kid.middleName,
      lastName: kid.lastName,
      age: kid.age,
      gender: kid.gender,
      institution: kid.institution || "", // Keep the institution
      groupClass: kid.groupClass || "", // Keep the class
      teachers: Array.isArray(kid.teachers) ? kid.teachers : [], // Ensure teachers array
      parents: Array.isArray(kid.parents) ? kid.parents : [], // Ensure parents array
    });

    setCurrentKidId(kid._id || "");
    setIsEditMode(true);
    setIsModalOpen(true);

    // Fetch group classes based on the kid's institution
    if (kid.institution) {
      loadClassesByInstitution(kid.institution);
    }

    // Fetch teachers based on the selected group class
    if (kid.groupClass) {
      loadTeachersByClass(kid.groupClass);
    }
  };

  // Filter kids based on search term
  const filteredKids = kids.filter((kid) => {
    const fullName =
      `${kid.firstName} ${kid.middleName} ${kid.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex h-full">
      <div className="w-1/4 p-4 border-r bg-gray-50">
        <h2 className="text-xl font-bold mb-4 text-blue-800">Institutions</h2>
        <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
          {institutions.map((inst) => (
            <Card
              key={inst._id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedInstitution === inst._id
                  ? "border-l-4 border-blue-500 bg-blue-50"
                  : ""
              }`}
              onClick={() => inst._id && handleInstitutionChange(inst._id)}
            >
              <div className="p-2">
                <h5 className="text-md font-semibold">{inst.name}</h5>
                {inst.address && (
                  <p className="text-xs text-gray-500">{inst.address}</p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div className="w-3/4 p-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Baby className="h-6 w-6 text-blue-500 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">
                Kids Management
              </h2>
            </div>
            <Button
              color="success"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> Add Kid
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner size="xl" />
            </div>
          ) : (
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
              <Table hoverable={true}>
                <Table.Head>
                  <Table.HeadCell>First Name</Table.HeadCell>
                  <Table.HeadCell>Middle Name</Table.HeadCell>
                  <Table.HeadCell>Last Name</Table.HeadCell>
                  <Table.HeadCell>Gender</Table.HeadCell>
                  <Table.HeadCell>Age</Table.HeadCell>
                  <Table.HeadCell>Class</Table.HeadCell>
                  <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {filteredKids.length > 0 ? (
                    filteredKids.map((kid) => (
                      <Table.Row
                        key={kid._id}
                        className="bg-white hover:bg-gray-50"
                      >
                        <Table.Cell className="font-medium text-gray-900">
                          {kid.firstName}
                        </Table.Cell>
                        <Table.Cell>{kid.middleName}</Table.Cell>
                        <Table.Cell>{kid.lastName}</Table.Cell>
                        <Table.Cell>{kid.gender}</Table.Cell>
                        <Table.Cell>{kid.age}</Table.Cell>
                        <Table.Cell>{kid.groupClass || "N/A"}</Table.Cell>
                        <Table.Cell>
                          <div className="flex space-x-2">
                            <Button
                              color="light"
                              size="xs"
                              onClick={() => handleEdit(kid)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              color="failure"
                              size="xs"
                              onClick={() => kid._id && handleDelete(kid._id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))
                  ) : (
                    <Table.Row>
                      <Table.Cell colSpan={7} className="text-center py-4">
                        {searchTerm
                          ? "No kids match your search"
                          : "No kids found for this institution"}
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            </div>
          )}
        </div>
      </div>
      <Modal show={isModalOpen} onClose={closeModal} size="lg">
        <Modal.Header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <h3 className="text-xl font-bold">
            {isEditMode ? "Edit Kid" : "Add Kid"}
          </h3>
        </Modal.Header>
        <Modal.Body>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              {/* Middle Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Middle Name
                </label>
                <input
                  type="text"
                  value={formData.middleName}
                  onChange={(e) =>
                    setFormData({ ...formData, middleName: e.target.value })
                  }
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: Number(e.target.value) })
                  }
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Institution */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Institution
                </label>
                <select
                  value={formData.institution}
                  onChange={(e) =>
                    setFormData({ ...formData, institution: e.target.value })
                  }
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Institution</option>
                  {institutions.map((institution) => (
                    <option key={institution._id} value={institution._id}>
                      {institution.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Group Class */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class
                </label>
                <select
                  value={formData.groupClass}
                  onChange={(e) =>
                    setFormData({ ...formData, groupClass: e.target.value })
                  }
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Class (Optional)</option>
                  {classes.map((classItem) => (
                    <option key={classItem._id} value={classItem._id}>
                      {classItem.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Assign Teachers */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assign Teachers (Optional)
              </label>
              <select
                multiple
                value={formData.teachers}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    teachers: Array.from(
                      e.target.selectedOptions,
                      (option) => option.value,
                    ),
                  })
                }
                className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.firstName} {teacher.lastName}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">
                Hold Ctrl/Cmd to select multiple teachers
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button onClick={handleSubmit} color="success" className="px-6">
                {isEditMode ? "Update Kid" : "Save Kid"}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default KidManagement;
