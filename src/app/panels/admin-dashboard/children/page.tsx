"use client";

import React from "react";
import KidManagement from "@/app/_components/kid-managment.component";
import { Baby } from "lucide-react";

const Children = () => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-gradient-to-br from-violet-100 to-purple-50 rounded-lg">
          <Baby className="h-6 w-6 text-violet-600" />
        </div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600">
          Children Management
        </h1>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <KidManagement />
      </div>
    </div>
  );
};

export default Children;
