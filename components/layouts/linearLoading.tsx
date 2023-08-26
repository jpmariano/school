
'use client'
import React, { ReactNode, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { LinearProgress } from "@mui/material";
import styles from "@/styles/components/main/main.module.scss";



const LinearLoading = () => {
    const theme = useTheme();
    let isLight: boolean = true;
    if (theme.palette.mode === 'dark') {
        isLight = false;
    }
    //const toggle = useAppSelector((state) => state.toggle); 
    //const { height, width } = useWindowDimensions(); 
    //const heightPx = `${String(height)}px`;
    //console.log(theme) minHeight: `${String(height)}px`
   //console.log(theme);
    return (
    
    <Box component="main" className={`${styles.main} ${theme.palette.mode}`} sx={{ backgroundColor: isLight ? '#F3F3F3'  : '#121212' }} >
      <LinearProgress />
    </Box>


    );
};

export default LinearLoading;
