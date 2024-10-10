
import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import parse from 'html-react-parser'
import { Box } from '@mui/material';
import MuiTabs from '@/components/tabs';
import { getUserProfile, isFetchResponse } from '@/api/drupal';
import { ErrorResponse, UserAccountDetails } from '@/types';
import FileUploadForm from '@/components/fileUploadForm';


export interface bodyContentProps {
  id: string;
}

const UserProfile: React.FC<bodyContentProps> = async ({id}) => {
    const userProfileResponse: Response | ErrorResponse = await getUserProfile(id);
    const userProfile: UserAccountDetails = isFetchResponse(userProfileResponse) && await userProfileResponse.json();
    console.log('userProfile********', userProfile);
  return (<MuiTabs>
    <Box component="div" className='body-content' title="Profile"><FileUploadForm /></Box>
    <Box component="div" className='body-content'>Files</Box>
    </MuiTabs>);
};

export default UserProfile;
