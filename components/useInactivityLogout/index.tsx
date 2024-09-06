"use client";
import { useEffect, useRef } from 'react';
import { signOut, useSession } from 'next-auth/react';
import customSignOut from '@/components/customSignOut';
import { revokeToken } from '@/api/drupal';

const useInactivityLogout = (timeout: number) => {

  const { data: session, status } = useSession();
  
  
  const timer = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(async () => {
      if (session?.user?.access_token) {
        customSignOut(session.user.access_token);
        //await revokeToken(session.user.access_token);
      } else {
        signOut({ callbackUrl: '/login' });
      }
      //signOut({ callbackUrl: '/login' });
      //CustomSignOut();  // Use customSignOut instead of signOut
    }, timeout);
  };

  const handleActivity = () => {
    resetTimer();
  };

  useEffect(() => {
    // Start the inactivity timer when the component mounts
    resetTimer();

    // Listen for various user activities
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('click', handleActivity);

    // Cleanup the listeners and timer on component unmount
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('click', handleActivity);
    };
  }, [timeout]);

  return null;
};

export default useInactivityLogout;
