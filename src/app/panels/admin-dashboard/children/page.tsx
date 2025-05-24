"use client";

import React from "react";
import KidManagement from "@/app/_components/kid-managment.component";

const Children = () => {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Children Management</h1>
      <KidManagement />
    </div>
  );
};

export default Children;
