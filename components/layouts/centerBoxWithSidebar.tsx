"use client"
import React, { ReactNode } from 'react';
import { Paper } from '@mui/material';
import styles from "@/styles/components/layouts/centerboxwithsidebar.module.scss";
import useWindowDimensions from '@/utils/useWindowDimensions';

export interface cnterBoxProps {
    children?: ReactNode;
    addClassName?: string | null;
    fullwidth?: Boolean;
    mobileReverseOrder?: Boolean;
    fullHeight?: Boolean;
}

const CenterBoxWithSidebar: React.FC<cnterBoxProps> = ({fullwidth = true, mobileReverseOrder = false, fullHeight = false, addClassName, children}) => {
  const { height, width } = useWindowDimensions();
  return (
    <Paper component="section" sx={{ minHeight: fullHeight ? `${height}px` : 'auto'}} className={`${fullwidth ? styles.sectionFull : styles.section} ${mobileReverseOrder && styles.mobileReverseOrder}  ${addClassName}`}>
         {children}
    </Paper> 
    );
};

export default CenterBoxWithSidebar;
