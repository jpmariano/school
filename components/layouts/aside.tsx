
import React, { ReactNode } from 'react';
import { Paper } from '@mui/material';
import styles from "@/styles/components/layouts/aside.module.scss";

export interface asideProps {
    children?: ReactNode;
    addClassName?: 'inverse';
}

const Aside: React.FC<asideProps> = ({addClassName, children}) => {
  return (
    <Paper component="aside" className={`${styles.aside} ${addClassName}`}>
         {children}
    </Paper> 
    );
};

export default Aside;
