
'use client'
import React from 'react';
import Link from 'next/link';
import { Box, useTheme } from '@mui/material';



export interface linkColorProps {
    href: string;
    children: string; 
    //children?: ReactNode;
}


const LinkColor: React.FC<linkColorProps> = ({ href, children}) => {
  const theme = useTheme();

  return <Link href={href} ><Box component="span" sx={{ color: theme.palette.secondary.main}}>{children}</Box></Link>
};

export default LinkColor;
