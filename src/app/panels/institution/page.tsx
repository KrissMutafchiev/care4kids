"use client";

import React, { useState } from "react";
import Image from "next/image";
import { TeachersListComponent } from "@/app/_components/teachers-list.component";
import ChildrenListComponent from "@/app/_components/children-list.component";
import { GenerateTeacherComponent } from "@/app/_components/generate-teacher.component";

type Props = {};

const InstitutionPanel: React.FC = () => {

  return (
    <div className="w-full p-6 space-y-6">
      {/* Teachers List */}
      <TeachersListComponent />
    </div>
  );
};

export default InstitutionPanel;
