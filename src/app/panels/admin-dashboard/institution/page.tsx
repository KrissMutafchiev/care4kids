"use client";

import React from "react";

import { InstitutionManagement } from "@/app/_components/institution-management.component";

type Props = {};

const Institution = (props: Props) => {
  return (
    <div className="flex flex-col space-y-4 p-6">
      <InstitutionManagement/>
    </div>
  );
};

export default Institution;
