import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
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
            name: user.name,
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
        token.name = user.name;
        token.id = user.id;
        token.role = user.role;
        token.companyId = user.companyId;
      }
      return token;
    },
    async session({ token, session }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.role = token.role as "employer" | "jobseeker";
      session.user.companyId = token.companyId as string;
      return session;
    },
  },
});
