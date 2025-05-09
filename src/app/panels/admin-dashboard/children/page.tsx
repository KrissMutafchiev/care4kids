"use client";

import React from "react";
import KidManagement from "@/app/_components/kid-managment.component";

type Props = {};

const Children = (props: Props) => {
  return (
    <div className="flex flex-col space-y-4 p-6">
      <KidManagement/> 
    </div>
  );
};

export default Children;
