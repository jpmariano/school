"use client";
import { useEffect, useRef } from 'react';
import { signOut } from 'next-auth/react';

const useInactivityLogout = (timeout: number) => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      signOut({ callbackUrl: '/login' });
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
