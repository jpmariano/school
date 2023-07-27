'use client'
 

import {  useAppSelector } from '@/store/store'
import { ReactNode } from 'react'
import {darkTheme, lightTheme} from '@/material/thememode'
import {  ThemeProvider } from '@mui/material'


export interface ThemeProviderProps {
    children?: ReactNode;
}

const ThemeProviders: React.FC<ThemeProviderProps> = ({children}) =>  {

    const toggle = useAppSelector((state) => state.toggle);
    return (
        <ThemeProvider theme={toggle.open ? darkTheme : lightTheme}>{children}</ThemeProvider>
          
      );
  };
  
  export default ThemeProviders;