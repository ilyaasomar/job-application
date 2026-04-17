import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./prisma";
import { Role, User } from "@/app/generated/prisma/client";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        let user = null;
        user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        // check the user
        if (!user) {
          console.log("error Invalid credentials");
          return null;
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          user?.password as string,
        );

        if (!isValidPassword) {
          console.log("error Invalid credentials password");

          return null;
        }

        return user;
      },
    }),
  ],

  callbacks: {
    // ✅ This runs on every sign-in — Google users get created here
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const existUser = await prisma.user.findUnique({
            where: {
              email: user?.email as string,
            },
          });

          if (!existUser) {
            const newUser = await prisma.user.create({
              data: {
                name: user?.name as string,
                email: user?.email as string,
                avatarUrl: (user?.image as string) ?? "",
                password: "",
                role: "EMPLOYER",
              },
            });
            user.id = newUser.id;
          } else {
            user.id = existUser.id;
          }

          return true;
        } catch (error) {
          console.error("Error creating Google user:", error);
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user, trigger, account, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.role = (user as User).role;
      }
      // this updates the data in the session every time user get update
      if (trigger === "update" && session?.user?.image) {
        token.image = session.user.image;
      }
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      if (trigger === "update" && session?.email) {
        token.email = session.email;
      }
      // ✅ For Google, role may not be on the user object — fetch from DB
      if (account?.provider === "google" && token.email && !token.role) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
        });
        token.role = dbUser?.role;
        token.id = dbUser?.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        // @ts-ignore
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.BETTER_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: `token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV && process.env.NODE_ENV === "production",
        maxAge: 60 * 30, // 30 minutes
      },
    },
  },
});
