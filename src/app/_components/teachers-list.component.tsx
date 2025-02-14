"use client";

import React, { useEffect, useState ,useRef} from "react";
import Image from "next/image";
import { GenerateTeacherComponent } from "@/app/_components/generate-teacher.component";
import { Checkbox, Table ,Button, Label, Modal, TextInput} from "flowbite-react";
import { EditTeacherModalComponent } from "@/app/_components/edit-teacher-modal.component";
import { Teacher } from "../../types/interfaces";

interface TeachersListProps {
  teachers: Teacher[]; // Define the prop as an array of teachers
}
export const TeachersListComponent: React.FC<TeachersListProps> = ({
  teachers,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [openGenerateTeacherModal, setGenerateTeacherModal] = useState(false);

  const [teacher, setTeacher] = useState<Teacher>();

  const dummyTeachers = [
    {
      id: 1,
      name: "John",
      midname: "Roz",
      lastname: "Doe",
      classes: ["Math", "Science"],
      positions: ["Miss", "Medic"],
      phone: "0892222233",
      email: "doe@gmail.com",
      avatarImg: "/default-man-avatar.png",
    },
    {
      id: 2,
      name: "Jane",
      midname: "Gregory",
      lastname: "Smith",
      classes: ["English", "History"],
      positions: ["Miss", "Psychologist"],
      phone: "08922322233",
      email: "Smith@gmail.com",
      avatarImg: "/default-woman-avatar.png",
    },
    {
      id: 3,
      name: "Michael",
      midname: "Allen",
      lastname: "Johnson",
      classes: ["Physics", "Chemistry"],
      positions: ["Mr.", "Lab Technician"],
      phone: "08922445566",
      email: "johnson@gmail.com",
      avatarImg: "/default-man-avatar.png",
    },
    {
      id: 4,
      name: "Emily",
      midname: "Anne",
      lastname: "Brown",
      classes: ["Biology", "Physical Education"],
      positions: ["Miss", "Coach"],
      phone: "08922556677",
      email: "brown@gmail.com",
      avatarImg: "/default-woman-avatar.png",
    },
    {
      id: 5,
      name: "Christopher",
      midname: "Lee",
      lastname: "Davis",
      classes: ["Geography", "History"],
      positions: ["Mr.", "Counselor"],
      phone: "08922667788",
      email: "davis@gmail.com",
      avatarImg: "/default-man-avatar.png",
    },
    {
      id: 6,
      name: "Sophia",
      midname: "Grace",
      lastname: "Miller",
      classes: ["Art", "Music"],
      positions: ["Miss", "Art Director"],
      phone: "08922778899",
      email: "miller@gmail.com",
      avatarImg: "/default-woman-avatar.png",
    },
    {
      id: 7,
      name: "Daniel",
      midname: "James",
      lastname: "Wilson",
      classes: ["Computer Science", "Mathematics"],
      positions: ["Mr.", "IT Specialist"],
      phone: "08922889900",
      email: "wilson@gmail.com",
      avatarImg: "/default-man-avatar.png",
    },
    {
      id: 8,
      name: "Olivia",
      midname: "Rose",
      lastname: "Taylor",
      classes: ["French", "Literature"],
      positions: ["Miss", "Librarian"],
      phone: "08922990011",
      email: "taylor@gmail.com",
      avatarImg: "/default-woman-avatar.png",
    },
    {
      id: 9,
      name: "David",
      midname: "Alexander",
      lastname: "Anderson",
      classes: ["Physics", "Math"],
      positions: ["Mr.", "Dean"],
      phone: "08923000122",
      email: "anderson@gmail.com",
      avatarImg: "/default-man-avatar.png",
    },
    {
      id: 10,
      name: "Emma",
      midname: "Louise",
      lastname: "Thomas",
      classes: ["Spanish", "History"],
      positions: ["Miss", "Head of Department"],
      phone: "08923112233",
      email: "thomas@gmail.com",
      avatarImg: "/default-woman-avatar.png",
    },
  ];

  const handleEditTeacher = (teacherId: number) => {
    const filteredTeacher = teachers.find(
      (teacher: any) => teacher.id === teacherId
    );
    setTeacher(filteredTeacher);
    setOpenModal(true);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
        <div className="flex grid-cols-2 gap-2">
          <button
            id="dropdownActionButton"
            data-dropdown-toggle="dropdownAction"
            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
          >
            <span className="sr-only">Action button</span>
            Action
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <Button
            onClick={() => setGenerateTeacherModal(true)}
          >
            Generate Teacher
          </Button>
          {/* <Dropdown menu */}
          <div
            id="dropdownAction"
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownActionButton"
            >
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Reward
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Promote
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Activate account
                </a>
              </li>
            </ul>
            <div className="py-1">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Delete User
              </a>
            </div>
          </div>
        </div>
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for users"
          />
        </div>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="p-4">
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>Classes</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Phone</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {teachers.map(teacher => (
            <Table.Row
              key={teacher.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="p-4">
                <Checkbox />
              </Table.Cell>
              <Table.Cell className="p-4">
                <Image
                  className="w-10 h-10 rounded-full"
                  src={
                    teacher.avatarImg ? teacher.avatarImg : "/default-man-avatar.png"
                  }
                  alt="Jese image"
                  height={100}
                  width={100}
                />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {teacher.firstName} {teacher.middleName} {teacher.lastName}
              </Table.Cell>
              <Table.Cell>
                {" "}
                {teacher.position?.map((position: string, index: number) => (
                  <div key={`position-${index}`} className="font-normal text-gray-500">
                    {position}
                  </div>
                ))}
              </Table.Cell>
              <Table.Cell>
                {teacher.classes?.map((teacherClass, index) => (
                  <span key={`teacherClass-${index}`} className="grid">
                    {teacherClass}
                  </span>
                ))}
              </Table.Cell>
              <Table.Cell>{teacher.email}</Table.Cell>
              <Table.Cell>{teacher.phoneNumber}</Table.Cell>

              <Table.Cell>
                <a
                  href="#"
                  onClick={() => handleEditTeacher(teacher.id)}
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* <!-- Generate Child Component --> */}

      {/* <!-- Edit user modal --> */}
      <EditTeacherModalComponent
        openModal={openModal}
        teacher={teacher}
        closeModal={() => setOpenModal(false)}
      />

      <Modal show={openGenerateTeacherModal} size="md" popup onClose={() => setGenerateTeacherModal(false)} >
        <Modal.Header />
        <Modal.Body>
            {/* Form to Generate Teachers */}
            <GenerateTeacherComponent />
        </Modal.Body>
      </Modal>

    </div>
  );
};
