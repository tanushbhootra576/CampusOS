import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "@/src/lib/mongodb-client";

import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // adapter: MongoDBAdapter(clientPromise), // Disabled temporarily for UI dev without DB
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Mock authorization for UI testing
        if (credentials?.email && credentials?.password) {
          return { id: "1", name: "Campus User", email: credentials.email };
        }
        return null;
      }
    })
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
        session.user.id = token.id;
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
