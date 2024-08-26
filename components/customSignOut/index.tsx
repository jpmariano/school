'use client'
import { revokeToken } from '@/api/drupal';
import { signOut, useSession } from 'next-auth/react';


export default async function CustomSignOut() {
    const { data: session, status } = useSession();
  
  if (session?.user?.access_token) {
    await revokeToken(session.user.access_token);
  }
  
  signOut({ callbackUrl: '/login' });
}
