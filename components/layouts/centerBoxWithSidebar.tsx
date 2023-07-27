
import React, { ReactNode } from 'react';
import { Paper } from '@mui/material';
import styles from "@/styles/components/layouts/centerboxwithsidebar.module.scss";

export interface cnterBoxProps {
    children?: ReactNode;
    addClassName?: string | null;
    fullwidth?: Boolean;
}

const CenterBoxWithSidebar: React.FC<cnterBoxProps> = ({fullwidth = true, addClassName, children}) => {
  return (
    <Paper component="section" className={`${fullwidth ? styles.sectionFull : styles.section} ${addClassName}`}>
         {children}
    </Paper> 
    );
};

export default CenterBoxWithSidebar;
