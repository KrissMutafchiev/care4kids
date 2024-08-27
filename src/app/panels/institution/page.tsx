"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TeachersListComponent } from "@/app/_components/teachers-list.component";
import ChildrenListComponent from "@/app/_components/children-list.component";
import { GenerateTeacherComponent } from "@/app/_components/generate-teacher.component";

type Props = {};

const InstitutionPanel: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    midname: "",
    lastname: "",
    email: "",
    class: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [institutionData, setInstitutionData] = useState<any>();
  const [loginData, setLogin] = useState<any>();

  const fetchInstitutionById = async () => {
    const res = await fetch(
      "http://ec2-3-125-52-214.eu-central-1.compute.amazonaws.com:8080/institutions?institutionId=26",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer eyJhbGciOiJIUzM4NCJ9.eyJmdWxsTmFtZSI6IktyaXMgTXV0YWYiLCJzdWIiOiJrcmlzM3Z2LWRpcmVjdG9yNEBnbWFpbC5jb20iLCJpYXQiOjE3MjQxNzkzNTUsImV4cCI6MTcyNDE4Mjk1NSwiYXV0aG9yaXRpZXMiOlsiRElSRUNUT1IiXX0.3WORsMU4u8-unH1O4gXJ5jGORnGdZWeXJTRnHf8Ndnj_CjqS4XhYxtRzsFrgG0oq`,
        },
      }
    );
    const data = await res.json();
    setInstitutionData(data);
  };

  const csrfToken = async () => {
    const res = await fetch(
      "http://localhost:3000/api/csfr",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data
  };

  const login = async () => {
    //const csfrToken = await csrfToken()
    const res = await fetch(
      "http://ec2-3-125-52-214.eu-central-1.compute.amazonaws.com:8080/login",
      {

        method: "POST",
        headers: {
          "Access-Control-Allow-Origin":
            '*',
          "X-XSRF-TOKEN":"5e468db3-e060-4368-9ee6-51220f1241dc",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "kris3vv-director4@gmail.com",
          password: "test1",
        }),
      }
    );
    const data = await res.json();
    setLogin(data);
  };

  const dummyData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/users",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    setLogin(data);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here, you would typically send formData to your server
  };

  const teachers = [
    { id: 1, name: "John", lastname: "Doe", classes: "Math, Science" },
    { id: 2, name: "Jane", lastname: "Smith", classes: "English, History" },
  ];

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
      avatarImg: "/default-kid-avatar.png",
    },
    {
      id: 2,
      name: "Bob",
      midname: "B",
      lastname: "Brown",
      age: 9,
      class: "4B",
      teacher: "Ms. Smith",
      gender: "Male",
      avatarImg: "/default-kid-avatar.png",
    },
  ];

  return (
    <div className="w-full p-6 space-y-6">
      <button onClick={fetchInstitutionById}>Get Institution</button>
      <button onClick={csrfToken}>Login</button>

      <p>{institutionData?.name}</p>
      <p>{loginData}</p>
      {/* Teachers List */}
      <TeachersListComponent />
    </div>
  );
};

export default InstitutionPanel;
