import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    role: "employer" | "jobseeker";
    companyId: string | null;
  }
  interface Session {
    user: {
      id: string;
      role: "employer" | "jobseeker";
      companyId: string | null;
    };
  }
}
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: "employer" | "jobseeker";
    companyId: string | null;
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
        if (passwordsmatch)
          return {
            id: user.id,
            email: user.email,
            role: user.role,
            companyId: user.companyId,
          };
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.companyId = user.companyId;
      }
      return token;
    },
    async session({ token, session }) {
      session.user.id = token.id as string;
      session.user.role = token.role as "employer" | "jobseeker";
      session.user.companyId = token.companyId as string;
      return session;
    },
  },
});
