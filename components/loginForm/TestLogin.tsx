'use client'
import { Box } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'

const TestLogin: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    console.log(searchParams);
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: '' }}
    >
      Test
    </Box>
  );
};

export default TestLogin;
