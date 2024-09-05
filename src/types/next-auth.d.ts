declare module "next-auth" {
  import { User } from "@/types/interfaces";

  interface Session {
    user: User;
  }
}
