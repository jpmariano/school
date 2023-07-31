
import React, { ReactNode } from 'react';
import { Box, Paper } from '@mui/material';
import styles from "@/styles/components/layouts/stackrightbtn.module.scss";

export interface cnterBoxProps {
    children?: ReactNode;
}

const StackRightBtn: React.FC<cnterBoxProps> = ({children}) => {
  return (
    <Box component="div" className={styles.stackrightbtn}>
         {children}
    </Box> 
    );
};

export default StackRightBtn;
