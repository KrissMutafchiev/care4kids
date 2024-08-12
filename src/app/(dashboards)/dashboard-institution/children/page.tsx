import React from "react";
import ChildrenListComponent from "@/app/_components/children-list.component";

type Props = {};

const ChildrenList: React.FC = async () => {
  const response: any = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  const childrenData = await response.json();
  return <ChildrenListComponent childrenData={childrenData} />;
};

export default ChildrenList;
