
"use client";

import React, { useState } from 'react';
import Image from "next/image";
import { TeachersListComponent } from '@/app/_components/teachers-list.component'
import  ChildrenListComponent  from '@/app/_components/children-list.component'
import {GenerateTeacherComponent} from "@/app/_components/generate-teacher.component";

type Props = {};

const DashboardInstitution: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    midname: '',
    lastname: '',
    email: '',
    class: '',
  });

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

  const teachers = [
    { id: 1, name: 'John', lastname: 'Doe', classes: 'Math, Science' },
    { id: 2, name: 'Jane', lastname: 'Smith', classes: 'English, History' },
  ];

  const children = [
    { id: 1, name: 'Alice', midname: 'A', lastname: 'Johnson', age: 10, class: '5A', teacher: 'Mr. Doe', gender: 'Female' },
    { id: 2, name: 'Bob', midname: 'B', lastname: 'Brown', age: 9, class: '4B', teacher: 'Ms. Smith', gender: 'Male' },
  ];

  return (

      <div className="w-3/4 p-6 space-y-6">
        {/* Teachers List */}
        <TeachersListComponent/>
        {/* Form to Generate Teachers */}
        <GenerateTeacherComponent/>
      </div>
  );
};

export default DashboardInstitution;

