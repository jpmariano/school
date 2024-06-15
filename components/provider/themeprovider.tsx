'use client'
 

import {  useAppSelector } from '@/store/store'
import { ReactNode, useState } from 'react'
import {darkTheme, lightTheme} from '@/material/thememode'
import {  ThemeProvider } from '@mui/material'
import { toggle } from '@/store/features/toggleSlice'


export interface ThemeProviderProps {
    children?: ReactNode;
}

const ThemeProviders: React.FC<ThemeProviderProps> = ({children}) =>  {

    const toggle = useAppSelector((state) => state.toggle);
    //const [isDark, setsDark] = useState(false);
    const isDark = toggle.toggleArr.find((content) => content?.id === 0 );
  
    return (
        <ThemeProvider theme={isDark?.open ? darkTheme : lightTheme}>{children}</ThemeProvider>
          
      );
  };
  
  export default ThemeProviders;