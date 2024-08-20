"use client";

import React, {useState} from 'react';
import Image from "next/image";
import {TeachersListComponent} from '@/app/_components/teachers-list.component'
import ChildrenListComponent from '@/app/_components/children-list.component'
import {GenerateTeacherComponent} from "@/app/_components/generate-teacher.component";

type Props = {};

const InstitutionPanel: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    midname: '',
    lastname: '',
    email: '',
    class: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [institutionData, setInstitutionData] = useState<any>();

  const fetchInstitutionById = async () => {
    const res = await fetch('http://ec2-3-125-52-214.eu-central-1.compute.amazonaws.com:8080/institutions?institutionId=18', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer eyJhbGciOiJIUzM4NCJ9.eyJmdWxsTmFtZSI6IkJvemhpZGFyIE1hcmlucHYiLCJzdWIiOiJicm1hcmlub3YtZGlyZWN0b3I0QGdtYWlsLmNvbSIsImlhdCI6MTcyNDE1MjE2OSwiZXhwIjoxNzI0MTU1NzY5LCJhdXRob3JpdGllcyI6WyJESVJFQ1RPUiJdfQ.pU4ZPK-N_K8Fc5GnlLPbtwkKVtma3w5T6EH-5eqrQcsZzcJk69lbnKtPTXKQy3gb`
      }
    })
    const data = await res.json();
    setInstitutionData(data)
  }


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here, you would typically send formData to your server
  };

  const teachers = [
    {id: 1, name: 'John', lastname: 'Doe', classes: 'Math, Science'},
    {id: 2, name: 'Jane', lastname: 'Smith', classes: 'English, History'},
  ];

  const children = [
    {
      id: 1,
      name: 'Alice',
      midname: 'A',
      lastname: 'Johnson',
      age: 10,
      class: '5A',
      teacher: 'Mr. Doe',
      gender: 'Female',
      avatarImg: '/default-kid-avatar.png'
    },
    {
      id: 2,
      name: 'Bob',
      midname: 'B',
      lastname: 'Brown',
      age: 9,
      class: '4B',
      teacher: 'Ms. Smith',
      gender: 'Male',
      avatarImg: '/default-kid-avatar.png'
    },
  ];

  return (
    <div className="w-full p-6 space-y-6">
      <button onClick={fetchInstitutionById}>Get Institution</button>
      <p>{institutionData?.name}</p>
      {/* Teachers List */}
      <TeachersListComponent/>
    </div>
  );
};

export default InstitutionPanel;

