import { UserRole } from "@prisma/client";
import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    companyId: string | null;
  }
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: UserRole;
      companyId: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    companyId: string | null;
  }
}
