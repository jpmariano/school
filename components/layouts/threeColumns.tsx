
import React, { ReactNode } from 'react';
import { Paper } from '@mui/material';
import styles from "@/styles/components/layouts/threecolumns.module.scss";

export interface cnterBoxProps {
    children?: ReactNode;
}

const ThreeColumns: React.FC<cnterBoxProps> = ({children}) => {
  return (
    <Paper component="section" className={styles.threeColumns}>
         {children}
    </Paper> 
    );
};

export default ThreeColumns;
