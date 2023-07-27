
import React, { ReactNode } from 'react';
import { Paper } from '@mui/material';

export interface cnterBoxProps {
    children?: ReactNode;
}

const FullWidthBox: React.FC<cnterBoxProps> = ({children}) => {
  return (
    <Paper component="section" sx={{ width: "100%", display: "flex",  margin: "0 auto", flexDirection: "column", justifyContent: "center", p: 1, borderRadius: 0}}>
         {children}
    </Paper> 
    );
};

export default FullWidthBox;
