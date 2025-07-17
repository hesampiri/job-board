import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface User {
    role: "employer" | "jobseeker";
    companyId: string | null
  }
  interface Session {
    user:{
      role: "employer" | "jobseeker";
      companyId: string | null
    }
  }
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (
          !credentials ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null;
        }
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: { email: email },
        });
        if (!user) return null;
        const passwordsmatch = await bcrypt.compare(password, user.password);
        if (passwordsmatch) return user;
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({user , token}){
      if(user){
        token.role = user.role
        token.companyId = user.companyId
      }
      return token
    },
    async session({token , session}){
      session.user.role = token.role as "employer" | "jobseeker"
      session.user.companyId = token.companyId as string
      return session
    }
  },
});
