'use client'
import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser'
import { Box } from '@mui/material';
import styles from "@/styles/components/backgroundImage/backgroundimage.module.scss";
import Image from 'next/image'
import { DrupalFile, Picture } from '@/types';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FileUploadForm from '../fileUploadForm';
import { useUserProfileContext } from '@/components/userProfile/userProvider';
import GetUserProfilePicture from '@/components/userProfile/getUserProfilePicture';

interface profilePictureProps {
    picture: Picture;
}
const ProfileIcon: React.FC = () => {
    const userProfileContext = useUserProfileContext();
    const [url, setUrl] = useState<string>('');
    useEffect(() => {
      //console.log('picture', picture);
      if(userProfileContext.userProfile?.user_picture) {
        const userProfilePicture= GetUserProfilePicture(userProfileContext.userProfile?.user_picture[0].target_id.toString());
        userProfilePicture.then((data) => {
          console.log('userProfilePicture********', data);
          setUrl(data);
            }).catch((error) => {
              console.log(error);
            })
      }
      }, [userProfileContext.userProfile?.user_picture]);

  if(url === '') {
    return <AccountCircleIcon fontSize="large" />;
  }
  return <Box component="div" sx={{}} className='flex justify-center items-center'>
    <Image
      src={url}
      width={userProfileContext.userProfile?.user_picture[0].width}
      height={userProfileContext.userProfile?.user_picture[0].height}
      alt={userProfileContext.userProfile?.user_picture[0].alt ? userProfileContext.userProfile?.user_picture[0].alt : 'profile picture'}
      className='h-auto w-10 rounded-full'
    />
  </Box>
};

export default ProfileIcon;
