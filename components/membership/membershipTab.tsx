
'use client'
import React, { Suspense, useEffect, useState } from 'react';
import { paragraphProps, SubscriptionType } from '@/types';
import { BASE_URL } from '@/api/config';
import ContentImage from '.';
import CodeText from '.';
import { Box, Tabs, Tab, useTheme } from '@mui/material';
import { usePathname, useSearchParams } from 'next/navigation'
import getActiveSubscription from './getActiveSubscription';

import SubscriptionDisplay from './subscriptionDisplay';


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

const MembershipTab: React.FC =  () => {
    const [value, setValue] = useState(0);
    const theme = useTheme();
    let isLight: boolean = true;
    if (theme.palette.mode === 'dark') {
        isLight = false;
    }
    
    //const searchParams = useSearchParams();
    //const pathName = usePathname();
    //const id: string = pathName.split('/').pop() || '';
    //const activeSubscriptionResponse = await getActiveSubscription(id);
    //console.log("activeSubscriptionResponse", activeSubscriptionResponse);
   // const { id } = router ? router : { id: '' };
    //console.log("searchParams", searchParams);
    //console.log("pathName", id);
 

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

    return (
        <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{'& .MuiTabs-indicator': { backgroundColor: isLight ? '#000000' : '#ffffff'}}}>
          <Tab label="Membership" {...a11yProps(0)} sx={{'&.Mui-selected':{color: isLight ? '#000000' : '#ffffff'}}}/>
          <Tab label="Item Two" {...a11yProps(1)} sx={{'&.Mui-selected':{color: isLight ? '#000000' : '#ffffff'}}}/>
          <Tab label="Item Three" {...a11yProps(2)} sx={{'&.Mui-selected':{color: isLight ? '#000000' : '#ffffff'}}}/>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <SubscriptionDisplay />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
    );


};

export default MembershipTab;
