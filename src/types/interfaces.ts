export interface User {
  firstName: string | null | undefined;
  middleName: string | null | undefined;
  lastName: string | null | undefined;
  email: string;
  phoneNumber: string;
  position: any;
  roles: Array<Object>;
  jwtToken: string;
}
