
"use client";

import React, { useState } from 'react';
import Image from "next/image";

type Props = {};

export const TeachersListComponent: React.FC = () => {



  const teachers = [
    { id: 1, name: 'John', lastname: 'Doe', classes: 'Math, Science' },
    { id: 2, name: 'Jane', lastname: 'Smith', classes: 'English, History' },
  ];



  return (
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
  );
};


