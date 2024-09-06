'use client'
 

import {  useAppSelector } from '@/store/store'
import { ReactNode, useState } from 'react'
import {darkTheme, lightTheme} from '@/material/thememode'
import {  ThemeProvider } from '@mui/material'
import { toggle } from '@/store/features/toggleSlice'
import { useEffect } from 'react'
import LinearLoading from '../layouts/linearLoading'


export interface ThemeProviderProps {
    children?: ReactNode;
}

const ThemeProviders: React.FC<ThemeProviderProps> = ({children}) =>  {

    const toggle = useAppSelector((state) => state.toggle);
    //const [isDark, setsDark] = useState(false);
    const isDark = toggle.toggleArr.find((content) => content?.id === 0 );
    const [isModeSet, setIsModeSet] = useState(false);
    
    
    useEffect(() => {
        console.log(isDark);
        if (isDark !== "undefined") {
            setIsModeSet(true);
        } 
      }, [isDark]); 
      
      
      

 
    return (
        <ThemeProvider theme={isDark?.open ? darkTheme : lightTheme}>{isModeSet ? children : <LinearLoading />}</ThemeProvider>
      );
  };
  
  export default ThemeProviders;