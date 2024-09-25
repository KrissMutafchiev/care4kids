
import React from 'react';

import { TeachersListComponent } from '@/app/_components/teachers-list.component'
import {getTeachers} from "@/lib/api/teachers.service"

type Props = {};

const TeachersList: React.FC = async () => {

  const teachers = await getTeachers(26);
  console.log('---->Teachers---->',teachers)

  return (
    <div>
      <TeachersListComponent teachers={ teachers} />
    </div>
  );
};


export default TeachersList