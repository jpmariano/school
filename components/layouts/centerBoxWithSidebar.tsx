
import React, { ReactNode } from 'react';
import { Paper } from '@mui/material';
import styles from "@/styles/components/layouts/centerboxwithsidebar.module.scss";

export interface cnterBoxProps {
    children?: ReactNode;
    addClassName?: string | null;
    fullwidth?: Boolean;
    mobileReverseOrder?: Boolean;
    fullHeight?: Boolean;
}

const CenterBoxWithSidebar: React.FC<cnterBoxProps> = ({fullwidth = true, mobileReverseOrder = false, fullHeight = false, addClassName, children}) => {
  return (
    <Paper component="section" className={`${fullwidth ? styles.sectionFull : styles.section} ${mobileReverseOrder && styles.mobileReverseOrder} ${fullHeight && styles.fullHeight} ${addClassName}`}>
         {children}
    </Paper> 
    );
};

export default CenterBoxWithSidebar;
