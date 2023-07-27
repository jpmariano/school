
'use client'
import React, { ReactNode, useEffect } from 'react';
import { Box, IconButton, Paper, useTheme } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setToggle } from '@/store/features/toggleSlice';
import styles from "@/styles/components/main/main.module.scss";
import useWindowDimensions from '@/utils/useWindowDimensions';

export interface Props {
    children?: ReactNode;
}

const Main: React.FC<Props> = ({ children }) => {
    const theme = useTheme();
    let isLight: boolean = true;
    if (theme.palette.mode === 'dark') {
        isLight = false;
    }
    //const toggle = useAppSelector((state) => state.toggle); 
    //const { height, width } = useWindowDimensions(); 
    //const heightPx = `${String(height)}px`;
    //console.log(theme) minHeight: `${String(height)}px`
    console.log(theme);
    return (
    
    <Box component="main" className={`${styles.main} ${theme.palette.mode}`} sx={{ backgroundColor: isLight ? '#F3F3F3'  : '#121212' }} >
      {children}
    </Box>


    );
};

export default Main;
