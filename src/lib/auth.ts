import jwt from "jsonwebtoken";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { Account, User as AuthUser } from "next-auth";

/**
 * Decodes a JWT token and retrieves user information
 * @param token The JWT token to decode
 * @returns The decoded user information or null if invalid
 */
export function decodeJWT(token: string) {
  try {
    const secret = process.env.NEXTAUTH_SECRET as string;
    const decoded = jwt.verify(token, secret) as any;
    return decoded?.user;
  } catch (error) {
    return null;
  }
}

/**
 * NextAuth configuration options
 */
export const authOptions: any = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        try {
          console.log("Attempting login with email:", credentials?.email);

          const user = await User.findOne({ email: credentials?.email });

          if (!user || !credentials) {
            console.log("User not found or credentials missing");
            return null;
          }

          console.log("User found, checking password");
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (isPasswordCorrect) {
            console.log("Password correct, login successful");
            return {
              id: user._id.toString(),
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
              isFirstLogin: user.isFirstLogin,
            };
          }

          console.log("Password incorrect");
          return null;
        } catch (err) {
          console.error("Authorization error:", err);
          throw new Error("Error during authorization");
        }
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Refresh token every 24h
  },

  callbacks: {
    async signIn({ user }: { user: AuthUser }) {
      if (!user) return false;
      return true;
    },
    async session({ session, token }: any) {
      if (token.id) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.isFirstLogin = token.isFirstLogin;
      }
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role || "user";
        token.isFirstLogin = user.isFirstLogin || false;
      }
      return token;
    },
    async redirect({ url, baseUrl }: any) {
      // Redirect users to the password reset page if it's their first login
      if (url === baseUrl && url !== "/reset-password") {
        const sessionResponse = await fetch(`${baseUrl}/api/auth/session`);
        const session = await sessionResponse.json();
        if (session?.user?.isFirstLogin) {
          return `${baseUrl}/reset-password`;
        }
      }
      return url;
    },
  },
};
