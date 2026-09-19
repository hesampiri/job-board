import type { NextAuthConfig } from "next-auth";

export default {
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  providers: [],
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
} satisfies NextAuthConfig;
