import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { api } from "../../../services/api";

type CredentialsType = {
  username: string;
  password: string;
}

let user: any = null;

export default NextAuth({
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const {username, password} = credentials as CredentialsType;
        const res = await api.post('/auth/signin', {username, password});
        
        if(res.status == 200) {
          const parse = JSON.parse(Buffer.from(res.data.token.split('.')[1], 'base64').toString());

          user = {
            id: parse.user_id,
            name: parse.fullName,
            email: parse.sub,
            role: parse.roles,
            token: res.data.token
          }

          return user;
        } else {
          return null;
        }
      },
    })
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: "/",
    error: "/",
    signOut: "/"
  },
  
  callbacks: {
    async jwt({token}){
      user && (token.user = user);
      return token
    },

    async session({ session, token }) {
      session.user = token.user
      
      return session
    }
  }

})