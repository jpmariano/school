
'use client'
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import {  ErrorResponse, SubcriptionNode, SubscriptionType, UserAccountDetails } from '@/types';
import {  isFetchResponse } from '@/api/drupal';
import getActiveSubscription from './getActiveSubscription';



type MembershipContextType = {
    type: SubscriptionType | null;
    member_status: boolean | null;
    setType: React.Dispatch<React.SetStateAction<SubscriptionType | null>>;
    setMemberStatus: React.Dispatch<React.SetStateAction<boolean | null>>;
}


interface MembershipProviderProps {
  children: ReactNode;
  id: string;
  //initialMembership: UserAccountDetails;
}



export const MembershipContext = createContext<null | MembershipContextType> (null);

//Context Children Wrapper
export const MembershipProvider: React.FC<MembershipProviderProps> =  ({id, children}) => {
  const [type, setType] = useState<SubscriptionType | null>(null);
  const [member_status, setMemberStatus] = useState<boolean | null>(null);

  useEffect(() => {
    const activeSubscription = getActiveSubscription(id);
    activeSubscription.then((data : SubcriptionNode[]) => {
        setType(data.length > 0 ? data[0].field_subscription_type.length > 0 ? data[0].field_subscription_type[0].value : null : null);
        setMemberStatus(data.length > 0 ? data[0].status.length > 0 ? data[0].status[0].value : null : null);
    }).catch((error) => {
        console.log(error);
    });
  }, [id]);

  return (
    <MembershipContext.Provider value={{  type, member_status, setType, setMemberStatus }}>
      {children}
    </MembershipContext.Provider>
    );
};  

//Use by Children
export const useMembershipContext = () => {
  const membershipContext = useContext(MembershipContext);
  if(!membershipContext) throw new Error("You need to use this context inside the MembershipProvider");
  return (membershipContext);
}; 


