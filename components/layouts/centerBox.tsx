
import React, { ReactNode } from 'react';
import { Paper, SxProps } from '@mui/material';
import styles from "@/styles/components/layouts/sectionbox.module.scss";
//import { SxProps } from '@mui/material/system';

export interface cnterBoxProps {
    children?: ReactNode;
    isSquare?: boolean;
    sx?: SxProps;
}

const CenterBox: React.FC<cnterBoxProps> = ({ children, isSquare = false, sx}) => {
  return (
    <Paper component="section" className={styles.section}  square={isSquare} sx={sx} >
         {children}
    </Paper> 
    );
};

export default CenterBox;
