"use client";
import { useState, useEffect } from "react";
import { useFetchData } from "@/utils/useFetchData";
import Modal from "@/app/_components/ui/modal.component";
import InstitutionForm from "@/app/_components/managment/institution/institution-form.component";
import ListInstitution from "@/app/_components/managment/institution/institution-list.component";
import HeaderToolbar from "@/app/_components/managment/institution/header-toolbar.component";
import DetailInstitution from "@/app/_components/managment/institution/institution-detail.component";
import GroupClassForm from "@/app/_components/managment/group-class/group-class-form.component";
import { Card, Button, Tabs } from "flowbite-react";
import {
  deleteInstitution,
  fetchInstitutions,
} from "@/services/institution-service";
import { fetchUsers, createUser } from "@/services/user-service";
import { useAlert } from "@/app/context/AlertContext";
import { USER_ROLE } from "@/utils/user-role.consts";

const InstitutionManagement = () => {
  const {
    data: institutions,
    setData: setInstitutions,
    loading,
    error,
  } = useFetchData<any[]>("/api/institutions");
  const [selectedInstitution, setSelectedInstitution] = useState<{
    _id: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [editingInstitution, setEditingInstitution] = useState<{
    _id: string;
  } | null>(null);
  const [teachers, setTeachers] = useState<any[]>([]);
  const { showAlert } = useAlert();
  const [activeTab, setActiveTab] = useState("institution");

  // Teacher form state
  const [teacherForm, setTeacherForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: USER_ROLE.TEACHER,
    groupClass: "",
  });

  const handleSelectInstitution = (institution: any) => {
    setSelectedInstitution(institution);
    // Load teachers for this institution
    if (institution?._id) {
      fetchTeachers(institution._id);
    }
  };

  const fetchTeachers = async (institutionId: string) => {
    try {
      const teachersData = await fetchUsers({
        institution: institutionId,
        role: "teacher",
      });
      setTeachers(teachersData);
    } catch (error: any) {
      showAlert(error.message || "Failed to fetch teachers", "error");
    }
  };

  const handleAdd = () => {
    setEditingInstitution(null);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    setEditingInstitution(selectedInstitution);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedInstitution) return;
    await deleteInstitution(selectedInstitution._id);
    setInstitutions(
      institutions?.filter((inst) => inst._id !== selectedInstitution._id) ||
        [],
    );
    setSelectedInstitution(null);
  };

  // Handle adding a class to the selected institution
  const handleAddClass = () => {
    if (!selectedInstitution) {
      showAlert("Please select an institution first", "warning");
      return;
    }
    setIsClassModalOpen(true);
  };

  // Handle adding a teacher to the selected institution
  const handleAddTeacher = () => {
    if (!selectedInstitution) {
      showAlert("Please select an institution first", "warning");
      return;
    }
    setIsTeacherModalOpen(true);
  };

  // Handle teacher form input changes
  const handleTeacherFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setTeacherForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit teacher form
  const handleTeacherSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInstitution?._id) return;

    try {
      // Generate a temporary password
      const tempPassword = Math.random().toString(36).slice(-8);

      const newTeacher = await createUser({
        ...teacherForm,
        password: tempPassword,
        institution: selectedInstitution._id,
        isActive: true,
      });

      showAlert("Teacher added successfully!", "success");
      fetchTeachers(selectedInstitution._id);
      setIsTeacherModalOpen(false);

      // Reset form
      setTeacherForm({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: USER_ROLE.TEACHER,
        groupClass: "",
      });
    } catch (error: any) {
      showAlert(error.message || "Failed to add teacher", "error");
    }
  };

  if (loading) return <p>Loading institutions...</p>;

  if (error)
    return <p className="text-red-500">Failed to load institutions.</p>;

  return (
    <div className="h-screen p-4 flex flex-col bg-gray-100">
      {/* Header Toolbar at the Top */}
      <div className="mb-4 bg-white shadow-md rounded-lg p-4">
        <HeaderToolbar
          selectedInstitution={selectedInstitution}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />

        {/* Additional Action Buttons */}
        {selectedInstitution && (
          <div className="mt-4 flex gap-2">
            <Button color="blue" onClick={handleAddClass} size="sm">
              Add Class
            </Button>
            <Button color="green" onClick={handleAddTeacher} size="sm">
              Add Teacher
            </Button>
          </div>
        )}
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-1 gap-4">
        {/* Left - Institution List */}
        <div className="w-1/3 bg-white shadow-md p-4 rounded-lg overflow-auto border border-gray-300">
          <ListInstitution
            institutions={institutions}
            onSelect={handleSelectInstitution}
          />
        </div>

        {/* Right - Institution Detail View */}
        <div className="w-2/3">
          {selectedInstitution ? (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <Tabs.Group
                aria-label="Institution tabs"
                style="underline"
                onActiveTabChange={(tab) =>
                  setActiveTab(tab === 0 ? "institution" : "teachers")
                }
              >
                <Tabs.Item active title="Institution Details">
                  <DetailInstitution institution={selectedInstitution} />
                </Tabs.Item>
                <Tabs.Item title="Teachers">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-4">Teachers</h3>
                    {teachers.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3">
                                Name
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Email
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Phone
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Classes
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {teachers.map((teacher) => (
                              <tr
                                key={teacher._id}
                                className="bg-white border-b hover:bg-gray-50"
                              >
                                <td className="px-6 py-4 font-medium text-gray-900">
                                  {teacher.firstName} {teacher.lastName}
                                </td>
                                <td className="px-6 py-4">{teacher.email}</td>
                                <td className="px-6 py-4">
                                  {teacher.phoneNumber || "N/A"}
                                </td>
                                <td className="px-6 py-4">
                                  {teacher.groupClasses?.length
                                    ? teacher.groupClasses
                                        .map((c: any) => c.name)
                                        .join(", ")
                                    : "No classes assigned"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-gray-500">
                        No teachers found for this institution.
                      </p>
                    )}
                  </div>
                </Tabs.Item>
              </Tabs.Group>
            </div>
          ) : (
            <Card className="p-4 bg-gray-50 shadow-sm border border-gray-300">
              <p className="text-gray-500">
                Select an institution to view details.
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Modal for Add/Edit Institution */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <InstitutionForm
          initialData={editingInstitution}
          onSuccess={async () => {
            const updatedInstitutions = await fetchInstitutions(); // Fetch latest institutions
            setInstitutions(updatedInstitutions); // Update the list
            setIsModalOpen(false);
          }}
        />
      </Modal>

      {/* Modal for Add Class */}
      <Modal
        isOpen={isClassModalOpen}
        onClose={() => setIsClassModalOpen(false)}
      >
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-4">
            Add Class to {selectedInstitution?.name}
          </h3>
          <GroupClassForm
            institutionId={selectedInstitution?._id}
            onSuccess={() => {
              showAlert("Class added successfully!", "success");
              setIsClassModalOpen(false);
            }}
          />
        </div>
      </Modal>

      {/* Modal for Add Teacher */}
      <Modal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
      >
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-4">
            Add Teacher to {selectedInstitution?.name}
          </h3>
          <form onSubmit={handleTeacherSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={teacherForm.firstName}
                  onChange={handleTeacherFormChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={teacherForm.lastName}
                  onChange={handleTeacherFormChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={teacherForm.email}
                onChange={handleTeacherFormChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={teacherForm.phoneNumber}
                onChange={handleTeacherFormChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="pt-4">
              <Button type="submit" color="success">
                Add Teacher
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default InstitutionManagement;
