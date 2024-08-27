
import React from 'react';
import parse from 'html-react-parser'
import { Box } from '@mui/material';
import styles from "@/styles/components/backgroundImage/backgroundimage.module.scss";
import Image from 'next/image'

const BackgroundImage: React.FC = () => {
//const BodyContent = (value: string) => {
  return <Box component="div" className={styles.backgroundContainer}>
    <Image
      src="/logo_webupps_gray_transparent.svg"
      width={500}
      height={500}
      alt="Webupps Logo Background"
      className={styles.backgroundImage}
    />
  </Box>
};

export default BackgroundImage;
