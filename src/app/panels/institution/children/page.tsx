import React from "react";
import ChildrenListComponent from "@/app/_components/children-list.component";

type Props = {};

const ChildrenList: React.FC = async () => {
 


  const response = await fetch(
    "http://ec2-3-125-52-214.eu-central-1.compute.amazonaws.com:8080/login",
    {
      method: "POST",
      headers: {
        "X-XSRF-TOKEN": "cf0a802f-a8e5-4e16-8cc3-f29e4aa834b0", // Use the appropriate CSRF token if needed
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "email": "kris3vv-director4@gmail.com", "password": "test1" }), // Send the extracted email and password
    }
  );
  //console.log(response.body);
  // if (!response.ok) {
  //   throw new Error('Failed to fetch User ');
  // }

  const user = await response;
  console.log('---->',user);

  const children = [
    {
      id: 1,
      name: "Alice",
      midname: "A",
      lastname: "Johnson",
      age: 10,
      class: "5A",
      teacher: "Mr. Doe",
      gender: "Female",
      avatarImg: "/default-woman-avatar.png",
    },
    {
      id: 2,
      name: "Bob",
      midname: "B",
      lastname: "Smith",
      age: 11,
      class: "5B",
      teacher: "Mrs. Green",
      gender: "Male",
      avatarImg: "/default-kid-avatar.png",
    },
    {
      id: 3,
      name: "Charlie",
      midname: "C",
      lastname: "Brown",
      age: 9,
      class: "4A",
      teacher: "Ms. Lee",
      gender: "Male",
      avatarImg: "/default-kid-avatar.png",
    },
    {
      id: 4,
      name: "Daisy",
      midname: "D",
      lastname: "Miller",
      age: 10,
      class: "5A",
      teacher: "Mr. Doe",
      gender: "Female",
      avatarImg: "/default-woman-avatar.png",
    },
    {
      id: 5,
      name: "Ethan",
      midname: "E",
      lastname: "White",
      age: 12,
      class: "6A",
      teacher: "Mr. Black",
      gender: "Male",
      avatarImg: "/default-kid-avatar.png",
    },
  ];
  //const childrenData = await response.json();
  return <ChildrenListComponent childrenData={children} />;
};

export default ChildrenList;
