'use client'
import React, { useState } from 'react';
import MembershipTab from './membershipTab';
import { Box } from '@mui/material';

const ParentComponentTab: React.FC = () => {
  const [value, setValue] = useState(0); // Tab state

  return (
    <Box component="div">
      <MembershipTab value={value} setValue={setValue} />
    </Box>
  );
};

export default ParentComponentTab;
