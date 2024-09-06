import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {getNewAccessToken, getSessionToken, getUserInfo, isFetchResponse, userLogin} from '@/api/drupal';
import { CustomJWT, CustomSession, CustomUser, ErrorResponse, Token, tokenResponse, userinfo } from "@/types";
import userData from '@/data/userLogin.json';
import { signOut } from "next-auth/react";

let isRefreshing = false;
let refreshTokenPromise: Promise<CustomJWT>;

export const authOptions: NextAuthOptions = { 
    providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req): Promise<CustomUser | null> {
     
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

          const drupalSessionResponse = await getSessionToken();
          if (!isFetchResponse(drupalSessionResponse)) {
            console.error('Fetching session token failed:', drupalSessionResponse);
            return null;
          }
          const drupal_session: string = await drupalSessionResponse.text();
          //console.log('drupalSessionResponse', drupal_session);
      
          return {
            id: userInfo.sub,
            name: userInfo.name || null,
            email: userInfo.email || null,
            roles: userInfo.roles,
            userId: userInfo.sub,
            drupal_session: drupal_session,
            access_token: token_data.access_token,
            refresh_token: token_data.refresh_token,
            expires_in: token_data.expires_in
          }
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        } 
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }): Promise<CustomJWT> {
      const custom_token: CustomJWT = token as CustomJWT;
      if(account && user){
      
        // the user present here gets the same data as received from DB call  made above -> fetchUserInfo(credentials.opt)
        return { ...token,
          access_token: user.access_token,
          refresh_token: user.refresh_token,
          expires_in: user.expires_in,
          scope: account.scope,
          userId: user.id,
          roles: user.roles,
          drupal_session: user.drupal_session,
          issued_at: Date.now() / 1000
        } as CustomJWT; 
      }

      const now = Date.now() / 1000;
      const expirationTime = custom_token.issued_at! + custom_token.expires_in!;
      //const expirationTime = custom_token.issued_at! + 120;

      if (now < expirationTime - 90) {
        return custom_token;
      }
      if (!isRefreshing) {
        isRefreshing = true;
        refreshTokenPromise = getNewAccessToken(custom_token.refresh_token!)
          .then(async (new_tokens) => {
            if (!isFetchResponse(new_tokens)) {
              console.error('Failed to refresh token:', new_tokens);
              return custom_token;  // Return the existing token if refresh fails
            }

            const token_data: Token = await new_tokens.json();
            const drupalSessionResponse = await getSessionToken();
            if (!isFetchResponse(drupalSessionResponse)) {
              return custom_token;
            }
            const drupal_session: string = await drupalSessionResponse.text();

            const refreshedToken: CustomJWT = {
              ...custom_token,
              drupal_session: drupal_session,
              access_token: token_data.access_token,
              refresh_token: token_data.refresh_token,
              expires_in: token_data.expires_in,
              issued_at: Date.now() / 1000,
            };

            isRefreshing = false;
            return refreshedToken;
          })
          .catch((error) => {
            console.error('Error refreshing token:', error);
            isRefreshing = false;
            signOut({ callbackUrl: '/login' });
            return custom_token;  // Return the existing token if refresh fails
          });
      }

      // Wait for the refreshTokenPromise to resolve if refresh is already in progress
    
      return refreshTokenPromise ?? custom_token;
     
    },
    async session({ session, token, user }): Promise<CustomSession> {
      const customToken = token as CustomJWT;
      const customSession = session as CustomSession;
      customSession.user.drupal_session = customToken.drupal_session;
      customSession.user.userId = customToken.userId;
      customSession.user.roles = customToken.roles;
      customSession.user.access_token = customToken.access_token;
      customSession.user.refresh_token = customToken.refresh_token;
      customSession.user.expires_in = customToken.expires_in;
      //customSession.expires = user.expires_in;
      return customSession;
    }
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
    maxAge: 14400,  // Session expires in 1 hour (3600 seconds)
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