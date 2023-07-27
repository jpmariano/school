
import React, { ReactNode } from 'react';
import { Paper } from '@mui/material';
import styles from "@/styles/components/layouts/notaside.module.scss";

export interface notAsideProps {
    children?: ReactNode;
    component?: any;
    addClassName?: string | null;
}

const NotAside: React.FC<notAsideProps> = ({component = "section", addClassName, children}) => {
  return (
    <Paper component={component} className={`${styles.content} ${addClassName}`}>
         {children}
    </Paper> 
    );
};

export default NotAside;