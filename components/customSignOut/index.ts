'use client'
import { revokeToken } from '@/api/drupal';
import { signOut, useSession } from 'next-auth/react';


export default async function customSignOut(accessToken: string | undefined) {
  if (accessToken) {
    await revokeToken(accessToken);  // Pass the access token to revokeToken
  }
  
  signOut({ callbackUrl: '/login' });
}