// Import necessary modules
"use client";
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation'
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import LinearLoading from '@/components/layouts/linearLoading';

interface AuthProgressWrapperProps {
  children: React.ReactNode;
}

const AuthProgressWrapper: React.FC<AuthProgressWrapperProps> = ({ children }) => {
  // Get session and status from useSession hook
  const { data: session, status } = useSession();

  useEffect(() => {
    // If the user is not authenticated, redirect to the /login page
    if (status === 'unauthenticated') {
      redirect(`/login`);
    }
  }, [status]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Safe to use `document` or `window` here
      console.log("Document is available");
    }
  }, []);

  // Render loading state if session is loading
  if (status === 'loading') {
    return  <LinearLoading />; // You can customize this loading state
  }

  if (status === 'authenticated') {
    return <>{children}</>; // Render children only if authenticated
  }

  // Optionally, handle other cases if needed (e.g., an error state)
  return <LinearLoading />;
};

export default AuthProgressWrapper;
