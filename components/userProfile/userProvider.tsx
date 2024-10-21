
'use client'
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import {  ErrorResponse, UserAccountDetails } from '@/types';
import { getUserProfile, isFetchResponse } from '@/api/drupal';
import FetchUserProfile from './fetchUserProfile';


type UserProfileContextType = {
    userProfile: UserAccountDetails | null;
    setUserProfile: React.Dispatch<React.SetStateAction<UserAccountDetails | null>>;
}


interface UserProfileProviderProps {
  children: ReactNode;
  id: string;
  //initialUserProfile: UserAccountDetails;
}



export const UserProfileContext = createContext<null | UserProfileContextType> (null);

//Context Children Wrapper
export const UserProfileProvider: React.FC<UserProfileProviderProps> =  ({id, children}) => {
  const [userProfile, setUserProfile] = useState<UserAccountDetails | null>(null);

  useEffect(() => {
    const userProfileJson = FetchUserProfile(id);
          userProfileJson.then((data: UserAccountDetails) => {
            setUserProfile(data);
          }); 
  }, [id]);

  return (
    <UserProfileContext.Provider value={{  userProfile, setUserProfile }}>
      {children}
    </UserProfileContext.Provider>
    );
};  

//Use by Children
export const useUserProfileContext = () => {
  const userProfileContext = useContext(UserProfileContext);
  if(!userProfileContext) throw new Error("You need to use this context inside the UserProfileProvider");
  return (userProfileContext);
}; 


