"use client";

import React from "react";
import InstitutionManagement from "@/app/_components/institution-management.component";

const Institution = () => {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">
        Institution Management
      </h1>
      <InstitutionManagement />
    </div>
  );
};

export default Institution;
