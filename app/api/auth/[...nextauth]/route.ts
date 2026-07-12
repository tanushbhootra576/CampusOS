import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/src/lib/mongodb-client";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

  ],
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin', // Optional: Custom sign-in page if needed
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
