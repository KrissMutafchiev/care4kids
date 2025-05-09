import { Types } from "mongoose";

export interface IUser {
  _id: string; // Optional, only present when fetched from the database
  firstName: string | null | undefined;
  middleName: string | null | undefined;
  lastName: string | null | undefined;
  email: string;
  phoneNumber: string;
  position: any;
  roles: Array<Object>;
  jwtToken: string;
  institution: IInstitution;
  groupClasses?: IGroupClass[]; 
  children?: IKid[];              // For parents
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean; 

}



export interface IInstitution {
  _id?: string; // Optional, only present when fetched from the database
  name: string;
  address: string;
  email: string;
  uic: string;
  contactPerson?: string; // Optional field for the contact person
  createdAt?: Date; // Optional, populated automatically by Mongoose
  updatedAt?: Date; // Optional, populated automatically by Mongoose
}


export interface IGroupClass  {
  _id: string;
  name: string;
  institution: IInstitution;
  kids: string[];
  teacher: string[];
};

export interface IKid {
  _id?: string; // Optional for when creating a new kid
  firstName: string;
  lastName: string;
  middleName: string;
  gender: string; // You can expand gender options if needed  "Male" | "Female" | "Other";
  age: number  | undefined;
  groupClass?: string; // GroupClass ID (optional)
  teachers: string[]; // Array of User IDs (ObjectId references)
  institution: string; // Institution ID (required)
  parents: string[]; // Array of User IDs (ObjectId references)
  createdAt?: Date; // Optional, managed by Mongoose timestamps
  updatedAt?: Date; // Optional, managed by Mongoose timestamps
}