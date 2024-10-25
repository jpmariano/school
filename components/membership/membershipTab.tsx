'use client'
import React, { useState } from 'react';
import { Box, Tabs, Tab, useTheme } from '@mui/material';
import SubscriptionDisplay from './subscriptionDisplay';
import { useMembershipContext } from './membershipProvider';
import { useTabContext } from './TabProvider';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface MembershipTabProps {
  value: number;
  setValue: (newValue: number) => void; // Add setValue as prop
}

const MembershipTab: React.FC = () => {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const tabContext = useTabContext();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    //setValue(newValue); // Use setValue from props
    tabContext.setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabContext.tab_value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ '& .MuiTabs-indicator': { backgroundColor: isLight ? '#000000' : '#ffffff' } }}
        >
          <Tab label="Membership" {...a11yProps(0)} sx={{ '&.Mui-selected': { color: isLight ? '#000000' : '#ffffff' } }} />
          <Tab label="Billing Information" {...a11yProps(1)} sx={{ '&.Mui-selected': { color: isLight ? '#000000' : '#ffffff' } }} />
          <Tab label="Invoices" {...a11yProps(2)} sx={{ '&.Mui-selected': { color: isLight ? '#000000' : '#ffffff' } }} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tabContext.tab_value} index={0}>
        <SubscriptionDisplay /> {/* Pass setValue as prop */}
      </CustomTabPanel>
      <CustomTabPanel value={tabContext.tab_value} index={1}>
        Billing Information Content
      </CustomTabPanel>
      <CustomTabPanel value={tabContext.tab_value} index={2}>
        Invoices Content
      </CustomTabPanel>
    </Box>
  );
};

export default MembershipTab;
