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

interface Role {
  id: number;
  name: string;
}

export interface Teacher {
  id: number;
  email: string;
  password: string | null;
  firstName: string;
  middleName: string;
  lastName: string;
  position: Array<string> | null;
  phoneNumber: string | null;
  roles: Role[];
  classes?: Array<string> | null;
  avatarImg?: string | null;

}
