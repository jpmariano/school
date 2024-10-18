'use client'
import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser'
import { Box } from '@mui/material';
import styles from "@/styles/components/backgroundImage/backgroundimage.module.scss";
import Image from 'next/image'
import { DrupalFile, Picture } from '@/types';
import GetUserProfilePicture from './getUserProfilePicture';
import { useUserProfileContext } from './userProvider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FileUploadForm from '../fileUploadForm';

interface profilePictureProps {
    picture: Picture;
}
const ProfilePicture: React.FC = () => {
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
    return <Box component="div" sx={{}} className='flex justify-center items-center'>
      <AccountCircleIcon fontSize="large" className="block mx-auto my-0" />
      <FileUploadForm />
    </Box>;
  }
  return <Box component="div" sx={{}} className='flex justify-center items-center'>
    <Image
      src={url}
      width={userProfileContext.userProfile?.user_picture[0].width}
      height={userProfileContext.userProfile?.user_picture[0].height}
      alt={userProfileContext.userProfile?.user_picture[0].alt ? userProfileContext.userProfile?.user_picture[0].alt : 'profile picture'}
      className='h-auto md:w-20 w-10 rounded-full'
    />
    <FileUploadForm />
  </Box>
};

export default ProfilePicture;
