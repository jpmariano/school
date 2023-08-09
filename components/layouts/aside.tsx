
import React, { ReactNode } from 'react';
import { Paper } from '@mui/material';
import styles from "@/styles/components/layouts/aside.module.scss";

export interface asideProps {
    children?: ReactNode;
    addClassName?: string; //inverse
    hideOnMobile?: boolean;
}

const Aside: React.FC<asideProps> = ({addClassName, children, hideOnMobile}) => {
  return (
    <Paper component="aside" className={`${styles.aside} ${addClassName} ${hideOnMobile && styles.hideOnMobile}`}>
         {children}
    </Paper> 
    );
};

export default Aside;
