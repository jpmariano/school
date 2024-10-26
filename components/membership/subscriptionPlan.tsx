'use client'
import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Button, useTheme } from '@mui/material';
import { useMembershipContext } from './membershipProvider';
import { useTabContext } from './TabProvider';



const SubscriptionPlan: React.FC = () => {
  const membershipContext = useMembershipContext();
  const tabContext = useTabContext();
  const theme = useTheme();
  const [content, setContent] = useState<React.ReactNode>(null);
  //console.log("membershipContext", membershipContext.type);
  useEffect(() => {
    if (membershipContext.type === null) {
      setContent(

        <Box component="div" className='flex justify-center'>
          <Box className="p-4 w-full lg:w-1/2 2xl:w-1/4">
            <Button variant="contained" className="flex justify-center flex-col w-full" color="info" onClick={() => tabContext.setTabValue(1)}>
              <Box component={"span"}> <Typography component="p" variant="body1" sx={{ color: "#ffffff" }}>FREE PERSONAL MEMBERSHIP</Typography> </Box>
              <Box component={"span"}> 1 Month Free </Box>
              <Box component={"span"}> Signup </Box>
            </Button>
         </Box>
        </Box>

      );
    }
  }, [membershipContext.type]);

  return (
    <>{content}
      <Box component="div" className="flex flex-wrap justify-around">
        <Box className="p-4 w-full lg:w-1/2 xl:w-1/4">
          <Button variant="contained" className="flex justify-center flex-col w-full" color="info" onClick={() => tabContext.setTabValue(1)}>
            <Box component="span">
              <Typography component="p" variant="body1" sx={{ color: "#ffffff" }}>MONTHLY PERSONAL MEMBERSHIP</Typography>
            </Box>
            <Box component="span">$25.00 USD per month</Box>
            <Box component="span">Signup</Box>
          </Button>
        </Box>
        <Box className="p-4 w-full lg:w-1/2 xl:w-1/4">
          <Button variant="contained" className="flex justify-center flex-col w-full" color="info" onClick={() => tabContext.setTabValue(1)}>
            <Box component="span">
              <Typography component="p" variant="body1" sx={{ color: "#ffffff" }}>ANNUAL PERSONAL MEMBERSHIP</Typography>
            </Box>
            <Box component="span">$240.00 USD per year</Box>
            <Box component="span">Signup</Box>
          </Button>
        </Box>
        <Box className="p-4 w-full lg:w-1/2 xl:w-1/4">
          <Button variant="contained" className="flex justify-center flex-col w-full" color="info" onClick={() => tabContext.setTabValue(1)}>
            <Box component="span">
              <Typography component="p" variant="body1" sx={{ color: "#ffffff" }}>MONTHLY GROUP MEMBERSHIP</Typography>
            </Box>
            <Box component="span">$20.00 USD each member per month</Box>
            <Box component="span">Signup</Box>
          </Button>
        </Box>
        <Box className="p-4 w-full lg:w-1/2 xl:w-1/4">
          <Button variant="contained" className="flex justify-center flex-col w-full" color="info" onClick={() => tabContext.setTabValue(1)}>
            <Box component="span">
              <Typography component="p" variant="body1" sx={{ color: "#ffffff" }}>ANNUAL GROUP MEMBERSHIP</Typography>
            </Box>
            <Box component="span">$180.00 USD each member per year</Box>
            <Box component="span">Signup</Box>
          </Button>
        </Box>
      </Box>

    </>
  );
};

export default SubscriptionPlan;
