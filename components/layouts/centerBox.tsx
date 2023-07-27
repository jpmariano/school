
import React, { ReactNode } from 'react';
import { Paper } from '@mui/material';
import styles from "@/styles/components/layouts/sectionbox.module.scss";

export interface cnterBoxProps {
    children?: ReactNode;
}

const CenterBox: React.FC<cnterBoxProps> = ({children}) => {
  return (
    <Paper component="section" className={styles.section}>
         {children}
    </Paper> 
    );
};

export default CenterBox;
