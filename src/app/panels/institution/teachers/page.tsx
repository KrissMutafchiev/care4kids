
import React from 'react';

import { TeachersListComponent } from '@/app/_components/teachers-list.component'

type Props = {};

const TeachersList: React.FC = async () => {


  return (
    <div>
      <TeachersListComponent teachers={ []} />
    </div>
  );
};


export default TeachersList