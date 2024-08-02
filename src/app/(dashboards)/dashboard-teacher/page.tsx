"use client";

import React, { useState } from 'react';
import Image from "next/image";
import Link from 'next/link'


const DashboardTeacher: React.FC = () => {
  const [childFormData, setChildFormData] = useState({
    name: '',
    midname: '',
    lastname: '',
    age: '',
    gender: '',
    class: '',
    teacher: '',
    parentEmail: '',
  });

  const handleChildFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setChildFormData({
      ...childFormData,
      [name]: value,
    });
  };

  const handleChildFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Child form submitted:', childFormData);
    // Here, you would typically send childFormData to your server
  };

    // Dummy data for grid and table
    const gridItems = [
      { id: 1, title: "Grid Item 1" },
      { id: 2, title: "Grid Item 2" },
      { id: 3, title: "Grid Item 3" },
      { id: 4, title: "Grid Item 4" },
    ];
  
    const tableData = [
      { id: 1, name: "John", midname: "A", lastname: "Doe", gender: "Male", age: 30 },
      { id: 2, name: "Jane", midname: "B", lastname: "Doe", gender: "Female", age: 28 },
      { id: 3, name: "Sam", midname: "C", lastname: "Smith", gender: "Male", age: 22 },
      { id: 4, name: "Alice", midname: "D", lastname: "Johnson", gender: "Female", age: 35 },
      { id: 5, name: "Bob", midname: "E", lastname: "Brown", gender: "Male", age: 40 },
    ];

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
          <h2 className="mt-4 text-xl font-semibold">Teacher`s Name</h2>
          <p className="mt-2 text-gray-600">Some info about the teacher.</p>
          <nav className="mt-4 w-full">
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-600 hover:underline">Dashboard</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Classes</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Schedule</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Settings</a></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Right Content */}
      <div className="w-3/4 p-6 space-y-6">
        {/* Grid List */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {gridItems.map(item => (
            <div key={item.id} className="p-4 bg-white shadow-md rounded-lg">
              {item.title}
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Midname</th>
                <th className="px-4 py-2 border-b">Lastname</th>
                <th className="px-4 py-2 border-b">Gender</th>
                <th className="px-4 py-2 border-b">Age</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map(row => (
                  <tr key={row.id}>
                    <td className="px-4 py-2 border-b">{row.name}</td>
                    <td className="px-4 py-2 border-b">{row.midname}</td>
                    <td className="px-4 py-2 border-b">{row.lastname}</td>
                    <td className="px-4 py-2 border-b">{row.gender}</td>
                    <td className="px-4 py-2 border-b">{row.age}</td>
                    <td  className="px-4 py-2 border-b">
                      <Link href={'dashboard-kid-report/' + row.id.toString()} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Details</Link>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Form to Create Children */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Create Children</h2>
          <form onSubmit={handleChildFormSubmit} className="bg-white p-6 shadow-md rounded-lg space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={childFormData.name}
                  onChange={handleChildFormChange}
                  className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="midname" className="block text-sm font-medium text-gray-700">Middle Name</label>
                <input
                  type="text"
                  id="midname"
                  name="midname"
                  value={childFormData.midname}
                  onChange={handleChildFormChange}
                  className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={childFormData.lastname}
                  onChange={handleChildFormChange}
                  className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={childFormData.age}
                  onChange={handleChildFormChange}
                  className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={childFormData.gender}
                  onChange={handleChildFormChange}
                  className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label htmlFor="class" className="block text-sm font-medium text-gray-700">Class</label>
                <input
                  type="text"
                  id="class"
                  name="class"
                  value={childFormData.class}
                  onChange={handleChildFormChange}
                  className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="teacher" className="block text-sm font-medium text-gray-700">Teacher</label>
                <input
                  type="text"
                  id="teacher"
                  name="teacher"
                  value={childFormData.teacher}
                  onChange={handleChildFormChange}
                  className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="parentEmail" className="block text-sm font-medium text-gray-700">Parent Email</label>
                <input
                  type="email"
                  id="parentEmail"
                  name="parentEmail"
                  value={childFormData.parentEmail}
                  onChange={handleChildFormChange}
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

export default DashboardTeacher;
