import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    name: string;
    email: string;
    id: number;
    token: string;
    role: string[];
  }

  interface Session {
    user: User
  }
}