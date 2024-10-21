
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import parse from 'html-react-parser'
import { Box, Paper, Typography } from '@mui/material';
import { Included, paragraphProps, Body, SubcriptionNode, SubscriptionType } from '@/types';
import { useUserProfileContext } from '@/components/userProfile/userProvider';
import {getActiveSubscription, isFetchResponse} from '@/api/drupal';
import { useParams } from 'next/navigation';
import ProfilePicture from '../userProfile/profilePicture';
import { useMembershipContext } from './membershipProvider';
//import styles from "@/styles/components/paraText/paratext.module.scss";


interface SubscriptionDisplayProps {
  type: SubscriptionType | null;
  status: boolean | null;
}

const SubscriptionDisplay: React.FC =  () => {
  const membershipContext = useMembershipContext();
  
  
  if (membershipContext.type === null) {
    return (<><Paper className="p-4">
      <Box component={"ul"} className="list-none">
      <Box component={"li"}><Typography component="p" variant="body1">Membership Type:</Typography> <Typography component="p" variant="body2">"No Active Subscription"</Typography></Box>
    </Box>
    </Paper></>);
  }

  const getSubscriptionTypeLabel = (typeValue: SubscriptionType): string => {
    switch (typeValue) {
      case "monthly" as SubscriptionType:
        return "Monthly";
        case "yearly" as SubscriptionType:
        return "Yearly";
        case "free" as SubscriptionType:
        return "Free";
      case "monthly_group" as SubscriptionType:
        return "Monthly Group";
        case "yearly_group" as SubscriptionType:
        return "Yearly Group";
      default:
        //console.log("typeValue*************", typeValue);
        return "No Active Subscription";
    }
  };
  // Map the subscription value to its corresponding label
  console.log("typeValue*************", membershipContext.type);
  const subscriptionTypeLabel = getSubscriptionTypeLabel(membershipContext.type);

  return (
    <Paper className="p-4">
    <Box component={"ul"} className="list-none">
      <Box component={"li"} className="flex"><Typography component="p" variant="body1" className='w-44'>Membership Type:</Typography> <Typography component="p" variant="body2" className='mt-1'>{subscriptionTypeLabel}</Typography></Box>
      {membershipContext.member_status !== null && <Box component={"li"} className="flex"><Typography component="p" variant="body1" className='w-44'>Status:</Typography> <Typography component="p" variant="body2" className='mt-1'>{membershipContext.member_status ? "Active" : "Inactive"}</Typography></Box>}
    </Box>
    </Paper>);

};

export default SubscriptionDisplay;
