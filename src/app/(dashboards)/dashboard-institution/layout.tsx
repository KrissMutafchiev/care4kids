"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";

const DashboardLayout = ({ children }:any) => {


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-white p-4 shadow-lg">
        <div className="flex flex-col items-center">
          <Image
            className="w-24 h-24 rounded-full"
            src="/default-institution-avatar.png" // Replace with actual image path
            alt="Profile"
            width={200}
            height={200}
          />
          <h2 className="mt-4 text-xl font-semibold">Institution Name</h2>
          <p className="mt-2 text-gray-600">Description of the institution.</p>
          <nav className="mt-4 w-full">
            <ul className="space-y-2">
              <li><Link href="/dashboard-institution" className="text-blue-600 hover:underline">Dashboard</Link></li>
              <li><Link href="/dashboard-institution/teachers" className="text-blue-600 hover:underline">Teachers</Link></li>
              <li><Link href="/dashboard-institution/children" className="text-blue-600 hover:underline">Children</Link></li>
              <li><Link href="/dashboard-institution/settings" className="text-blue-600 hover:underline">Settings</Link></li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="w-full p-4 ">
      {children}
      </div>
    </div>
  );
};

export default DashboardLayout;