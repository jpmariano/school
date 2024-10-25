import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { useMembershipContext } from './membershipProvider';



const SubscriptionPlan: React.FC = () => {
  const membershipContext = useMembershipContext();

  if (membershipContext.type === null) {
    return (
      <Paper className="p-4">
        <Box component={"ul"} className="list-none">
          <Box component={"li"}>
            <Typography component="p" variant="body1">Membership Type:</Typography>
            <Typography component="p" variant="body2">"No Active Subscription"</Typography>
          </Box>
        </Box>
      </Paper>
    );
  }


  return (
    <Paper className="p-4">
      
    </Paper>
  );
};

export default SubscriptionPlan;
