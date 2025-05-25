"use client";

import React from "react";
import InstitutionManagement from "@/app/_components/institution-management.component";
import { School } from "lucide-react";

const Institution = () => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-gradient-to-br from-indigo-100 to-blue-50 rounded-lg">
          <School className="h-6 w-6 text-indigo-600" />
        </div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600">
          Institution Management
        </h1>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <InstitutionManagement />
      </div>
    </div>
  );
};

export default Institution;
