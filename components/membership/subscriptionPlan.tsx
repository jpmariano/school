'use client'
import React from 'react';
import { Box, Paper, Typography, Button, useTheme } from '@mui/material';
import { useMembershipContext } from './membershipProvider';
import { useTabContext } from './TabProvider';



const SubscriptionPlan: React.FC = () => {
  const membershipContext = useMembershipContext();
  const tabContext = useTabContext();
  const theme = useTheme();
  if (membershipContext.type === null) {
    return (
      <Box component="div" className='flex justify-center'>
        <Paper className="p-4">
          <Button variant="contained" color="primary" onClick={() => tabContext.setTabValue(1)}>
            Free Go to Billing Information 
          </Button>
        </Paper>
        <Paper className="p-4">
          <Button variant="contained" color="primary" onClick={() => tabContext.setTabValue(1)}>
          Monthly Go to Billing Information 
          </Button>
        </Paper>
        <Paper className="p-4">
          <Button variant="contained" color="primary" onClick={() => tabContext.setTabValue(1)}>
            Yearly Go to Billing Information 
          </Button>
        </Paper>
        <Paper className="p-4">
          <Button variant="contained" color="primary" onClick={() => tabContext.setTabValue(1)}>
            Group Monthly Go to Billing Information 
          </Button>
        </Paper>
        <Paper className="p-4">
          <Button variant="contained" color="primary" onClick={() => tabContext.setTabValue(1)}>
            Group Yearly Go to Billing Information 
          </Button>
        </Paper>
      </Box>
    );
  }


  return (
    <Box component="div" className='flex justify-center'>
        <Box className="p-4">
          <Button variant="contained" className="flex justify-center flex-col" color="info" onClick={() => tabContext.setTabValue(1)}>
            <Box component={"span"}> <Typography component="p" variant="body1" sx={{color: "#ffffff"}}>MONTHLY PERSONAL MEMBERSHIP</Typography> </Box>
            <Box component={"span"}> $25.00 USD per month </Box>
            <Box component={"span"}> Signup </Box>
          </Button>
        </Box>
        <Box className="p-4">
          <Button variant="contained" className="flex justify-center flex-col"  color="info" onClick={() => tabContext.setTabValue(1)}>
            <Box component={"span"}> <Typography component="p" variant="body1" sx={{color: "#ffffff"}}>ANNUAL PERSONAL MEMBERSHIP</Typography> </Box>
            <Box component={"span"}> $240.00 USD per year </Box>
            <Box component={"span"}> Signup </Box>
          </Button>
        </Box>
        <Box className="p-4">
          <Button variant="contained" className="flex justify-center flex-col"  color="info" onClick={() => tabContext.setTabValue(1)}>
            <Box component={"span"}><Typography component="p" variant="body1" sx={{color: "#ffffff"}}> MONTHLY GROUP MEMBERSHIP</Typography> </Box>
            <Box component={"span"}> $20.00 USD each member per month </Box>
            <Box component={"span"}> Signup </Box>
          </Button>
        </Box>
        <Box className="p-4">
          <Button variant="contained" className="flex justify-center flex-col"  color="info" onClick={() => tabContext.setTabValue(1)}>
            <Box component={"span"}> <Typography component="p" variant="body1" sx={{color: "#ffffff"}}>ANNUAL GROUP MEMBERSHIP </Typography></Box>
            <Box component={"span"}> $180.00 USD each member per year </Box>
            <Box component={"span"}> Signup </Box>
          </Button>
        </Box>
      </Box>
  );
};

export default SubscriptionPlan;
