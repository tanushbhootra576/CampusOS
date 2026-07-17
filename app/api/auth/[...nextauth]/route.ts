import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/src/lib/mongodb-client";
import User from "@/src/db/models/User";
import connectToDatabase from "@/src/lib/mongodb";

import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
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
        if (!credentials?.email || !credentials?.password) return null;
        
        await connectToDatabase();
        const user = await User.findOne({ email: credentials.email });
        
        if (user) {
          // In a real app, compare hashed password here.
          return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
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
        token.role = user.role || 'student';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
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
