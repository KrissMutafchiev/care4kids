"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Label,
  Modal,
  TextInput,
  FileInput,
  Select,
  Spinner,
} from "flowbite-react";
import {
  customThemeButton,
  customThemeModal,
} from "@/app/_components/custom-flowbite-theme";
import { UserPlus, Save } from "lucide-react";
import { IUser, IGroupClass } from "../../types/interfaces";
import { fetchGroupClasses } from "@/services/group-class-service";
import { fetchInstitutions } from "@/services/institution-service";
import { createUser, updateUser } from "@/services/user-service";
import { useAlert } from "@/app/context/AlertContext";
import { USER_ROLE } from "@/utils/user-role.consts";

interface ModalProps {
  openModal: boolean;
  teacher: IUser | null;
  closeModal: () => void;
  onSuccess?: () => void;
}

export const EditTeacherModalComponent: React.FC<ModalProps> = ({
  openModal,
  closeModal,
  teacher,
  onSuccess,
}) => {
  const { showAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(false);
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [groupClasses, setGroupClasses] = useState<IGroupClass[]>([]);

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    role: USER_ROLE.TEACHER,
    groupClass: "",
    email: "",
    phoneNumber: "",
    institution: "",
    avatarImg: "",
    isActive: true,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const institutionsData = await fetchInstitutions();
        setInstitutions(institutionsData);

        if (teacher?.institution) {
          const institutionId =
            typeof teacher.institution === "string"
              ? teacher.institution
              : teacher.institution._id;

          if (institutionId) {
            const classesData = await fetchGroupClasses(institutionId);
            setGroupClasses(classesData);
          }
        }
      } catch (error: any) {
        showAlert(error.message || "Failed to load data", "error");
      }
    };

    if (openModal) {
      loadData();
    }
  }, [openModal]);

  useEffect(() => {
    if (teacher) {
      const institutionId =
        typeof teacher.institution === "string"
          ? teacher.institution
          : teacher.institution?._id || "";

      const groupClassId =
        teacher.groupClasses && teacher.groupClasses.length > 0
          ? typeof teacher.groupClasses[0] === "string"
            ? teacher.groupClasses[0]
            : teacher.groupClasses[0]?._id || ""
          : "";

      setFormData({
        firstName: teacher.firstName || "",
        middleName: teacher.middleName || "",
        lastName: teacher.lastName || "",
        role: teacher.role || USER_ROLE.TEACHER,
        groupClass: groupClassId,
        email: teacher.email || "",
        phoneNumber: teacher.phoneNumber || "",
        institution: institutionId,
        avatarImg: teacher.avatarImg || "",
        isActive: teacher.isActive !== undefined ? teacher.isActive : true,
      });
    } else {
      // Reset form for new teacher
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        role: USER_ROLE.TEACHER,
        groupClass: "",
        email: "",
        phoneNumber: "",
        institution: institutions.length > 0 ? institutions[0]._id : "",
        avatarImg: "",
        isActive: true,
      });
    }
  }, [teacher, institutions]);

  const handleInstitutionChange = async (institutionId: string) => {
    setFormData({ ...formData, institution: institutionId, groupClass: "" });

    if (institutionId) {
      try {
        const classesData = await fetchGroupClasses(institutionId);
        setGroupClasses(classesData);
      } catch (error: any) {
        showAlert(error.message || "Failed to load classes", "error");
      }
    } else {
      setGroupClasses([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.institution
    ) {
      showAlert("Please fill in all required fields", "error");
      return;
    }

    try {
      setIsLoading(true);

      const teacherData = {
        ...formData,
        groupClasses: formData.groupClass ? [formData.groupClass] : [],
      };

      if (teacher?._id) {
        // Update existing teacher
        await updateUser(teacher._id, teacherData);
        showAlert("Teacher updated successfully", "success");
      } else {
        // Create new teacher
        await createUser(teacherData);
        showAlert("Teacher created successfully", "success");
      }

      if (onSuccess) {
        onSuccess();
      }

      closeModal();
    } catch (error: any) {
      showAlert(error.message || "Failed to save teacher", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {openModal && (
        <Modal
          show={openModal}
          onClose={closeModal}
          theme={customThemeModal}
          size="3xl"
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="flex items-center">
                  <UserPlus className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-xl font-medium text-gray-900">
                    {teacher ? "Edit Teacher" : "Add New Teacher"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="firstName" value="First Name *" />
                    </div>
                    <TextInput
                      id="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          firstName: event.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  {/* Middle Name */}
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="middleName" value="Middle Name" />
                    </div>
                    <TextInput
                      id="middleName"
                      placeholder="Middle Name"
                      value={formData.middleName}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          middleName: event.target.value,
                        })
                      }
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="lastName" value="Last Name *" />
                    </div>
                    <TextInput
                      id="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          lastName: event.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Email *" />
                    </div>
                    <TextInput
                      id="email"
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(event) =>
                        setFormData({ ...formData, email: event.target.value })
                      }
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="phoneNumber" value="Phone" />
                    </div>
                    <TextInput
                      id="phoneNumber"
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          phoneNumber: event.target.value,
                        })
                      }
                    />
                  </div>

                  {/* Institution */}
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="institution" value="Institution *" />
                    </div>
                    <Select
                      id="institution"
                      value={formData.institution}
                      onChange={(event) =>
                        handleInstitutionChange(event.target.value)
                      }
                      required
                    >
                      <option value="">Select Institution</option>
                      {institutions.map((inst) => (
                        <option key={inst._id} value={inst._id}>
                          {inst.name}
                        </option>
                      ))}
                    </Select>
                  </div>

                  {/* Group Class */}
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="groupClass" value="Class (Optional)" />
                    </div>
                    <Select
                      id="groupClass"
                      value={formData.groupClass}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          groupClass: event.target.value,
                        })
                      }
                    >
                      <option value="">Select Class</option>
                      {groupClasses.map((cls) => (
                        <option key={cls._id} value={cls._id}>
                          {cls.name}
                        </option>
                      ))}
                    </Select>
                  </div>

                  {/* Status */}
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="isActive" value="Status" />
                    </div>
                    <Select
                      id="isActive"
                      value={formData.isActive.toString()}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          isActive: event.target.value === "true",
                        })
                      }
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </Select>
                  </div>

                  {/* Avatar */}
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="avatar" value="Avatar (Optional)" />
                    </div>
                    <FileInput
                      id="avatar"
                      helperText="Upload a profile picture"
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          avatarImg: event.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <Button color="gray" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    theme={customThemeButton}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner size="sm" className="mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-5 w-5" />
                        {teacher ? "Update Teacher" : "Add Teacher"}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};
