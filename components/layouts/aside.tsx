
'use client'
import React, { ReactNode } from 'react';
import { Paper, useMediaQuery, useTheme } from '@mui/material';
import styles from "@/styles/components/layouts/aside.module.scss";
import { useAppSelector } from '@/store/store';

export interface asideProps {
    children?: ReactNode;
    addClassName?: string; //inverse
    hideOnMobile?: boolean;
    showBoxShadow?: boolean;
    toggleSidebar?: boolean;
}

const Aside: React.FC<asideProps> = ({addClassName, children, hideOnMobile, showBoxShadow = true, toggleSidebar = false}) => {
  const toggle = useAppSelector((state) => state.toggle);
  const showSidebar = toggle.toggleArr.find((content) => content?.id === 1);
  if (toggleSidebar){
    if(!showSidebar?.open){
      return (
        <Paper component="aside" sx={{boxShadow: showBoxShadow ? 'inherit' : 'none'}} className={`${styles.aside} ${addClassName} ${hideOnMobile && styles.hideOnMobile}`}>
             {children}
        </Paper> 
      );
    }

  } else {
    return (
      <Paper component="aside" sx={{boxShadow: showBoxShadow ? 'inherit' : 'none'}} className={`${styles.aside} ${addClassName} ${hideOnMobile && styles.hideOnMobile}`}>
           {children}
      </Paper> 
    );
  }
  
};

export default Aside;
