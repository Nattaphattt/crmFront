import { getRoleApi } from "#/app/api/other/roleApi";
import { NextAuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { getUserApi } from "#/app/api/other/userApi";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID as string,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET as string,
      issuer: process.env.KEYCLOAK_ISSUER as string,
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      let userData = await getUserApi(session.user?.email!!,token.access_token)
      session.jwt = token;
      session.userData = userData!!
    
      return session;
      
    },
    jwt: async ({ token, user, account, profile }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
          ...account,
        };
      }
      return token;
    },
  },
};
