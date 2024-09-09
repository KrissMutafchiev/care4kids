"use client";

import React, {useState} from 'react';
import KidReportComponent from "@/app/_components/kid-report.component";
import ChildrenListComponent from "@/app/_components/children-list.component";
import Image from "next/image";
import {Datepicker} from "flowbite-react";

const DashboardKidReport: React.FC = () => {

  const [formData, setFormData] = useState({
    happiness: '',
    meals: '',
    sleepStart: '',
    sleepEnd: '',
    behavior: '',
    activities: '',
  });

  const children = [
    {
      id: 1,
      name: "Alice",
      midname: "A",
      lastname: "Johnson",
      age: 10,
      class: "5A",
      teacher: "Mr. Doe",
      gender: "Female",
      avatarImg: "/default-woman-avatar.png",
    },
    {
      id: 2,
      name: "Bob",
      midname: "B",
      lastname: "Smith",
      age: 11,
      class: "5B",
      teacher: "Mrs. Green",
      gender: "Male",
      avatarImg: "/default-kid-avatar.png",
    },
    {
      id: 3,
      name: "Charlie",
      midname: "C",
      lastname: "Brown",
      age: 9,
      class: "4A",
      teacher: "Ms. Lee",
      gender: "Male",
      avatarImg: "/default-kid-avatar.png",
    },
    {
      id: 4,
      name: "Daisy",
      midname: "D",
      lastname: "Miller",
      age: 10,
      class: "5A",
      teacher: "Mr. Doe",
      gender: "Female",
      avatarImg: "/default-woman-avatar.png",
    },
    {
      id: 5,
      name: "Ethan",
      midname: "E",
      lastname: "White",
      age: 12,
      class: "6A",
      teacher: "Mr. Black",
      gender: "Male",
      avatarImg: "/default-kid-avatar.png",
    },
  ];


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here, you would typically send formData to your server
  };


  return (
    <div className="flex h-screen space-x-4">
      <div className="w-2/3 bg-white p-4 rounded-lg shadow-lg overflow-y-auto">
        {/* Kid's Name and Date */}
        <div className="mb-6">
          <div className=" bg-white flex flex-col p-4 shadow-lg">
            <div className="flex flex-col items-center">
              <Image
                className="w-24 h-24 rounded-full"
                src="/default-kid-avatar.png" // Replace with actual image path
                alt="Profile"
                width={200} height={200}
              />
              <h2 className="mt-4 text-xl font-semibold">Kid`s Name</h2>
              <p className="mt-2 text-gray-600">Some info about the kid.</p>
            </div>
            <div className="flex flex-col items-center w-72">
              <Datepicker  title="Kid Report Calendar"  inline  autoHide={false} />
            </div>
          </div>
        </div>
        <ChildrenListComponent childrenData={children}/>
      </div>
      <div className="flex flex-col space-y-">
        <KidReportComponent/>
      </div>
    </div>
  );
};

export default DashboardKidReport;
