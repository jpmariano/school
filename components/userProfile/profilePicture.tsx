'use client'
import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser'
import { Box } from '@mui/material';
import styles from "@/styles/components/backgroundImage/backgroundimage.module.scss";
import Image from 'next/image'
import { DrupalFile, Picture } from '@/types';
import GetUserProfilePicture from './getUserProfilePicture';


interface profilePictureProps {
    picture: Picture;
}
const ProfilePicture: React.FC<profilePictureProps> = ({picture}) => {
    const [url, setUrl] = useState<string>('');
    useEffect(() => {
        const userProfilePicture= GetUserProfilePicture(picture.target_id.toString());
        userProfilePicture.then((data) => {
            console.log('data********', data);
            setUrl(data);
              }); 
      }, [picture]);
  return <Box component="div" sx={{}} className='flex justify-center items-center'>
    <Image
      src={url}
      width={picture.width}
      height={picture.height}
      alt={picture.alt}
      className='h-auto md:w-20 w-10 rounded-full'
    />
  </Box>
};

export default ProfilePicture;
