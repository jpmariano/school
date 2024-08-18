import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {getUserInfo, isFetchResponse, userLogin} from '@/api/drupal';
import { CustomJWT, CustomSession, ErrorResponse, Token, tokenResponse, userinfo } from "@/types";
import userData from '@/data/userLogin.json';

export const authOptions: NextAuthOptions = { 
    providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
     
        if (!credentials) {
          console.log('No credentials provided');
          return null;
        }
          
        try {
          const tokens = await userLogin(credentials);
          
         // const tokens = await userLogin({ username: 'johnpaul.mariano@tiag.net', password: 'G1vovMFOM@u2g$Y' });
         console.log('tokens', isFetchResponse(tokens));
          if (!isFetchResponse(tokens)) {
            console.error('Login failed:');
            return null;
          }
          //const token_data = tokens.json() as unknown as Token;
          const token_data: Token = await tokens.json();
          const userInfoResponse = await getUserInfo(token_data.access_token);
          console.log('userInfoResponse', isFetchResponse(userInfoResponse));
          if (!isFetchResponse(userInfoResponse)) {
            console.error('Fetching user info failed:', userInfoResponse);
            return null;
          } 

          const userInfo: userinfo = await userInfoResponse.json();
          if (!userInfo || !('sub' in userInfo)) {
            console.error('Invalid user info:', userInfo);
            return null;
          }
      
          return {
            id: userInfo.sub,
            name: userInfo.name || null,
            email: userInfo.email || null,
            roles: userInfo.roles,
          };
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        } 
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if(account && user){
      
        // the user present here gets the same data as received from DB call  made above -> fetchUserInfo(credentials.opt)
        return { ...token,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          expires_at: account.expires_at,
          scope: account.scope,
          userId: account.userId
        }
      }
      // Return previous token if the user is not signing in again
      return token as CustomJWT;
    },
    async session({ session, token, user }) {
      const customSession = session as CustomSession;
      customSession.access_token = (token as CustomJWT).access_token;
      customSession.refresh_token = (token as CustomJWT).refresh_token;
      customSession.expires_at = (token as CustomJWT).expires_at;
      customSession.scope = (token as CustomJWT).scope;
      customSession.userId = (token as CustomJWT).userId;
      return customSession;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    newUser: '/signup',
    error: '/login',   // Redirect to your login page for errors
  },
  debug: true,
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET, // TODO: Define env variables https://next-auth.js.org/configuration/options
  /*
  session: {
    strategy: "database",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
    
    // The session token is usually either a random UUID or string, however if you
    // need a more customized session token string, you can define your own generate function.
    generateSessionToken: () => {
      return userData.id ?? randomBytes(32).toString("hex")
    }
  }*/
}