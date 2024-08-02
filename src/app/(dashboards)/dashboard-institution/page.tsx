
"use client";

import React, { useState } from 'react';
import Image from "next/image";

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
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-white p-4 shadow-lg">
        <div className="flex flex-col items-center">
          <Image
            className="w-24 h-24 rounded-full"
            src="/default-woman-avatar.png" // Replace with actual image path
            alt="Profile"
            width={200}
            height={200}
          />
          <h2 className="mt-4 text-xl font-semibold">Institution Name</h2>
          <p className="mt-2 text-gray-600">Description of the institution.</p>
          <nav className="mt-4 w-full">
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-600 hover:underline">Dashboard</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Teachers</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Children</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Settings</a></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Right Content */}
      <div className="w-3/4 p-6 space-y-6">
        {/* Teachers List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Teachers</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Name</th>
                  <th className="px-4 py-2 border-b">Last Name</th>
                  <th className="px-4 py-2 border-b">Classes</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map(teacher => (
                  <tr key={teacher.id}>
                    <td className="px-4 py-2 border-b">{teacher.name}</td>
                    <td className="px-4 py-2 border-b">{teacher.lastname}</td>
                    <td className="px-4 py-2 border-b">{teacher.classes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Children List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Children</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b">Name</th>
                  <th className="px-4 py-2 border-b">Middle Name</th>
                  <th className="px-4 py-2 border-b">Last Name</th>
                  <th className="px-4 py-2 border-b">Age</th>
                  <th className="px-4 py-2 border-b">Class</th>
                  <th className="px-4 py-2 border-b">Teacher</th>
                  <th className="px-4 py-2 border-b">Gender</th>
                </tr>
              </thead>
              <tbody>
                {children.map(child => (
                  <tr key={child.id}>
                    <td className="px-4 py-2 border-b">{child.name}</td>
                    <td className="px-4 py-2 border-b">{child.midname}</td>
                    <td className="px-4 py-2 border-b">{child.lastname}</td>
                    <td className="px-4 py-2 border-b">{child.age}</td>
                    <td className="px-4 py-2 border-b">{child.class}</td>
                    <td className="px-4 py-2 border-b">{child.teacher}</td>
                    <td className="px-4 py-2 border-b">{child.gender}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form to Generate Teachers */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Generate Teacher</h2>
          <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="midname" className="block text-sm font-medium text-gray-700">Middle Name</label>
                <input
                  type="text"
                  id="midname"
                  name="midname"
                  value={formData.midname}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="class" className="block text-sm font-medium text-gray-700">Class</label>
                <input
                  type="text"
                  id="class"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashboardInstitution;

