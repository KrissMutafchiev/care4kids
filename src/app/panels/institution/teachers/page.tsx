
import React from 'react';

import { TeachersListComponent } from '@/app/_components/teachers-list.component'
import { parseCookies } from "nookies";
import { headers } from "next/headers";

import {getTeachers} from "@/lib/api/teachers.service"
type Props = {};

const TeachersList: React.FC = async () => {
  // Access cookies from the request headers on the server side


  // Use the JWT token in subsequent API requests
  // const response = await fetch(url, {
  //   method: "GET",
  //   headers: {
  //       'Authorization': `Bearer ${jwtToken}`,  // Include the JWT token in the Authorization header
  //       'Content-Type': 'application/json',     // Set content type
  //     },
  // });

  const teachers = await getTeachers(26);
  console.log('---->Teachers---->',teachers)
  // if (!response.ok) {
  //   throw new Error("Failed to fetch Teachers data.");
  // }

  // const protectedData = await response.json();


  return (
    <div>
      <TeachersListComponent teachers={ teachers} />
    </div>
  );
};


export default TeachersList