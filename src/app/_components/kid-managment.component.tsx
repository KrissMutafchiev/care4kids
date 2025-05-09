"use client";

import React, { useState, useEffect } from "react";
import {
  IInstitution,
  IGroupClass,
  IKid,
  IUser,
} from "../../types/interfaces";
import { Modal, Button, Table } from "flowbite-react";
import { fetchInstitutions } from "@/services/institution-service";
import { fetchKids, createKid ,updateKid ,deleteKid } from "@/services/kid-service";
import { fetchGroupClasses } from "@/services/group-class-service";
import { fetchUsers } from "@/services/user-service";
import { useAlert } from "../context/AlertContext";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentKidId, setCurrentKidId] = useState<string>('');

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
      const data = await fetchKids({ institution: institutionId });
      setKids(data);
    } catch (error: any) {
      showAlert(error.message || "Failed to load kids", "error");
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
        ? await updateKid( currentKidId, {...formData} )
        : await createKid(formData);

      setKids((prevKids) =>
        isEditMode
          ? prevKids.map((kid) => (kid._id === currentKidId ? newKid : kid))
          : [...prevKids, newKid]
      );
      closeModal();
      showAlert(isEditMode ? "Kid updated successfully!" : "Kid added successfully!", "success");
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
    setCurrentKidId('');
  };

  const handleDelete = async (_id: string) => {
    if (confirm("Are you sure you want to delete this kid?")) {
      await deleteKid(_id);
      showAlert("Kid deleted successfully!", "success");
      setKids(prevKids => prevKids.filter(kid => kid._id !== _id));
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

    setCurrentKidId(kid._id || '');
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

  return (
    <div className="flex">
      <div className="w-1/4 p-4 border-r">
        <h2 className="text-lg font-bold mb-2">Institutions</h2>
        {institutions.map(inst => (
          <div
            key={inst._id}
            className={`p-2 cursor-pointer ${
              selectedInstitution === inst._id ? "bg-blue-300" : ""
            }`}
            onClick={() => inst._id && handleInstitutionChange(inst._id)}
          >
            {inst.name}
          </div>
        ))}
      </div>
      <div className="w-3/4 p-4">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">Kids List</h2>
          <Button onClick={() => setIsModalOpen(true)}>Add Kid</Button>
        </div>
        <Table>
          <Table.Head>
            <Table.HeadCell>First Name</Table.HeadCell>
            <Table.HeadCell>Middle Name</Table.HeadCell>
            <Table.HeadCell>Last Name</Table.HeadCell>
            <Table.HeadCell>Gender</Table.HeadCell>
            <Table.HeadCell>Age</Table.HeadCell>
            <Table.HeadCell>Class</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {kids?.map(kid => (
              <Table.Row key={kid._id}>
                <Table.Cell>{kid.firstName}</Table.Cell>
                <Table.Cell>{kid.middleName}</Table.Cell>
                <Table.Cell>{kid.lastName}</Table.Cell>
                <Table.Cell>{kid.gender}</Table.Cell>
                <Table.Cell>{kid.age}</Table.Cell>
                <Table.Cell>{kid.groupClass || "N/A"}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => handleEdit(kid)}>Edit</Button>
                  <Button onClick={() => kid._id && handleDelete(kid._id)}>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <Modal show={isModalOpen} onClose={closeModal}>
        <Modal.Header>{isEditMode ? "Edit Kid" : "Add Kid"}</Modal.Header>
        <Modal.Body>
          <form>
            {/* First Name */}
            <label className="block mt-4 mb-2">First Name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={e =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
            />

            {/* Middle Name */}
            <label className="block mt-4 mb-2">Middle Name</label>
            <input
              type="text"
              value={formData.middleName}
              onChange={e =>
                setFormData({ ...formData, middleName: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
            />

            {/* Last Name */}
            <label className="block mt-4 mb-2">Last Name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={e =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
            />

            {/* Gender */}
            <label className="block mt-4 mb-2">Gender</label>
            <select
              value={formData.gender}
              onChange={e =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            {/* Age */}
            <label className="block mt-4 mb-2">Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={e =>
                setFormData({ ...formData, age: Number(e.target.value) })
              }
              className="w-full p-2 border rounded-lg"
            />

            {/* Institution */}
            <label className="block mt-4 mb-2">Institution</label>
            <select
              value={formData.institution}
              onChange={e =>
                setFormData({ ...formData, institution: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
            >
              {institutions.map(institution => (
                <option key={institution._id} value={institution._id}>
                  {institution.name}
                </option>
              ))}
            </select>

            {/* Group Class */}
            <label className="block mt-4 mb-2">Class</label>
            <select
              value={formData.groupClass}
              onChange={e =>
                setFormData({ ...formData, groupClass: e.target.value })
              }
              className="w-full p-2 border rounded-lg"
            >
              {classes.map(classItem => (
                <option key={classItem._id} value={classItem._id}>
                  {classItem.name}
                </option>
              ))}
            </select>

            {/* Assign Teachers */}
            <label className="block mt-4 mb-2">Assign Teachers</label>
            <select
              multiple
              value={formData.teachers}
              onChange={e =>
                setFormData({
                  ...formData,
                  teachers: Array.from(e.target.selectedOptions, option =>
                    option.value
                  ),
                })
              }
              className="w-full p-2 border rounded-lg"
            >
              {teachers.map(teacher => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.firstName} {teacher.lastName}
                </option>
              ))}
            </select>

            {/* Assign Parents */}
            {/* <label className="block mt-4 mb-2">Assign Parents</label>
            <select
              multiple
              value={formData.parents.map(parent => parent._id)}
              onChange={e =>
                setFormData({
                  ...formData,
                  parents: Array.from(e.target.selectedOptions, option =>
                    parents.find(parent => parent._id === option.value)
                  ).filter(Boolean) as ITeacher[], // Assuming Parent structure is similar
                })
              }
              className="w-full p-2 border rounded-lg"
            >
              {parents.map(parent => (
                <option key={parent._id} value={parent._id}>
                  {parent.firstName} {parent.lastName}
                </option>
              ))}
            </select> */}

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              className="mt-4 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
            >
              {isEditMode ? "Update Kid" : "Save Kid"}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default KidManagement;
