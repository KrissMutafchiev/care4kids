import NextAuth, { DefaultUser } from "next-auth";

// Extend the DefaultUser type in NextAuth
declare module "next-auth" {
  interface User extends DefaultUser {
    role?: "superAdmin" | "admin" | "teacher" | "parent"; // Add any other roles you use
  }

  // Extend the session object to include the role
  interface Session {
    user: {
      id: string;
      role?: "superAdmin" | "admin" | "teacher" | "parent";
    } & DefaultUser; // You can keep other default properties like name, email, etc.
  }

  // Extend the JWT token to include the role
  interface JWT {
    id: string;
    role?: "superAdmin" | "admin" | "teacher" | "parent";
  }
}