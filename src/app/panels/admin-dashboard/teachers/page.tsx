"use client";

import React from "react";
import { Users } from "lucide-react";
import { TeachersList } from "@/app/_components/teachers-list.component";

const TeachersManagement = () => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-gradient-to-br from-teal-100 to-emerald-50 rounded-lg">
          <Users className="h-6 w-6 text-teal-600" />
        </div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600">
          Teachers Management
        </h1>
      </div>

      {/* TeachersList Component */}
      <TeachersList showFilters={true} />
    </div>
  );
};

export default TeachersManagement;
