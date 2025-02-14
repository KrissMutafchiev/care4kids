import { Types } from "mongoose";

export interface User {
  firstName: string | null | undefined;
  middleName: string | null | undefined;
  lastName: string | null | undefined;
  email: string;
  phoneNumber: string;
  position: any;
  roles: Array<Object>;
  jwtToken: string;
  institutions:Array<number>
}


export interface TeacherModel {
  _id: Types.ObjectId | string;
  firstName: string;
  lastName: string;
  email: string;
  role: "teacher"; // Specific to the teacher role
  institution: {
    _id: Types.ObjectId | string;
    name: string;
  }; // Populated field for the institution the teacher belongs to
  groupClass?: {
    _id: Types.ObjectId | string;
    name: string;
  }; // Optional field for the group class
  isActive: boolean; // Indicates if the teacher account is active
  createdAt: Date;
  updatedAt: Date;
}


export interface InstitutionModel {
  _id?: string; // Optional, only present when fetched from the database
  name: string;
  address: string;
  email: string;
  uic: string;
  contactPerson?: string; // Optional field for the contact person
  createdAt?: Date; // Optional, populated automatically by Mongoose
  updatedAt?: Date; // Optional, populated automatically by Mongoose
}


export interface GroupClassModel  {
  _id: string;
  name: string;
  institution: InstitutionModel;
  kids: string[];
  teacher: string[];
};