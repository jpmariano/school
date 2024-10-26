import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import { useMembershipContext } from './membershipProvider';
import { useTabContext } from './TabProvider';
import SubscriptionPlan from './subscriptionPlan';



const SubscriptionDisplay: React.FC = () => {
  const membershipContext = useMembershipContext();
  const tabContext = useTabContext();

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

  const getSubscriptionTypeLabel = (typeValue: string): string => {
    switch (typeValue) {
      case "monthly":
        return "Monthly";
      case "yearly":
        return "Yearly";
      case "free":
        return "Free";
      case "monthly_group":
        return "Monthly Group";
      case "yearly_group":
        return "Yearly Group";
      default:
        return "No Active Subscription";
    }
  };

  const subscriptionTypeLabel = getSubscriptionTypeLabel(membershipContext.type);

  return (
    <Paper className="p-4">
      <Box component={"ul"} className="list-none">
        <Box component={"li"} className="flex">
          <Typography component="p" variant="body1" className='w-44'>Membership Type:</Typography>
          <Typography component="p" variant="body2" className='mt-1'>{subscriptionTypeLabel}</Typography>
        </Box>
        {membershipContext.member_status !== null && (
          <Box component={"li"} className="flex">
            <Typography component="p" variant="body1" className='w-44'>Status:</Typography>
            <Typography component="p" variant="body2" className='mt-1'>{membershipContext.member_status ? "Active" : "Inactive"}</Typography>
          </Box>
        )}
      </Box>
      {/* Add button to navigate to the Billing Information tab */}
      <SubscriptionPlan />
    </Paper>
  );
};

export default SubscriptionDisplay;
