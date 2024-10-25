
import React, { useState } from 'react';
import MembershipTab from './membershipTab';
import { Box } from '@mui/material';
import { TabProvider } from './TabProvider';

const ParentComponentTab: React.FC = () => {
  //const [value, setValue] = useState(0); // Tab state
  
  return (
    <Box component="div">
      <TabProvider>
        <MembershipTab />
      </TabProvider>
    </Box>
  );
};

export default ParentComponentTab;
