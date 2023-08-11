
import React, { ReactNode } from 'react';
import { Paper } from '@mui/material';
import styles from "@/styles/components/layouts/notaside.module.scss";

export interface notAsideProps {
    children?: ReactNode;
    component?: any;
    addClassName?: 'inverse';
    showBoxShadow?: boolean;
}

const NotAside: React.FC<notAsideProps> = ({component = "section", addClassName, showBoxShadow = true,  children}) => {
  return (
    <Paper component={component} sx={{boxShadow: showBoxShadow ? 'inherit' : 'none'}} className={`${styles.content} ${addClassName}`}>
         {children}
    </Paper> 
    );
};

export default NotAside;