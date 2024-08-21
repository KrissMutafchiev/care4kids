

import React from 'react';
import { TeachersListComponent } from '@/app/_components/teachers-list.component'

type Props = {};

 const TeachersList: React.FC = () => {
  const login = async () => {
    const res = await fetch(
      "http://ec2-3-125-52-214.eu-central-1.compute.amazonaws.com:8080/login",
      {
        
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin":
            'http://ec2-3-125-52-214.eu-central-1.compute.amazonaws.com:8080',

          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "kris3vv-director4@gmail.com",
          password: "test1",
        }),
      }
    );
    const data = await res.json();
    console.log(data)
  };
  login()
  return (
    <TeachersListComponent/>
  );
};


export default TeachersList