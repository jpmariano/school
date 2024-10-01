// types/next-auth.d.ts

import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extend the User type
declare module "next-auth" {
  interface User extends DefaultUser {
    roles: string[];
    drupal_session: string;
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
    scope?: string;
    userId: string;
  }

  interface Session {
    user: {
      roles: string[];
      drupal_session: string;
      access_token?: string;
      refresh_token?: string;
      expires_in?: number;
      scope?: string;
      userId: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    roles: string[];
    drupal_session: string;
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
    scope?: string;
  }
}
