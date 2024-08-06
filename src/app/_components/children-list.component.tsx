
"use client";

import React from 'react';

type Props = {};

export const ChildrenListComponent: React.FC = () => {



  const children = [
    { id: 1, name: 'Alice', midname: 'A', lastname: 'Johnson', age: 10, class: '5A', teacher: 'Mr. Doe', gender: 'Female' },
    { id: 2, name: 'Bob', midname: 'B', lastname: 'Brown', age: 9, class: '4B', teacher: 'Ms. Smith', gender: 'Male' },
  ];


  return (
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
  );
};


