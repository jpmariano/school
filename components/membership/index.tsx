
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
import SubscriptionDisplay from './subscriptionDisplay';
import MembershipTab from './membershipTab';
import { MembershipProvider } from './membershipProvider';
import ParentComponentTab from './parentComponentTab';
//import styles from "@/styles/components/paraText/paratext.module.scss";


interface MembershipProps {
  id: string;
}

const Membership: React.FC<MembershipProps> =  async ({ id}) => {
  //const [value, setValue] = useState(0); // Tab state
  //const userProfileContext = useUserProfileContext();
 
  /*
  const subcriptionResponse = await getActiveSubscription();
  const subscription: SubcriptionNode[] = isFetchResponse(subcriptionResponse) && await subcriptionResponse.json();
  const subscriptionType = subscription.length > 0 ? subscription[0].field_subscription_type.length > 0 ? subscription[0].field_subscription_type[0].value : null : null;
  const subscriptionStatus = subscription.length > 0 ? subscription[0].status.length > 0 ? subscription[0].status[0].value : null : null;
  console.log("subcription*************", subscription);*/
  //console.log("subcription*************", subscription[0].field_subscription_type[0].value);
  //return (<><SubscriptionDisplay type={subscriptionType} status={subscriptionStatus}/></>); //SubscriptionDisplay;
  //return(<MembershipTab />);
  return (<MembershipProvider id={id}><ParentComponentTab /></MembershipProvider>);

};

export default Membership;
