'use client'
 

import {  useAppSelector } from '@/store/store'
import { ReactNode } from 'react'
import {darkTheme, lightTheme} from '@/material/thememode'
import {  ThemeProvider, useMediaQuery, useTheme } from '@mui/material'
import React, { useState, createContext } from "react";

export interface IsMobileProviderProps {
    children?: ReactNode;
    size: 'sm' | 'md' | 'lg' | 'xl';
}

type IsMobileContextProps = { 
    isMobile: boolean,
  };

export const IsMobileContext = createContext<Partial<IsMobileContextProps>>({});

const IsMobileProvider: React.FC<IsMobileProviderProps> = ({size, children}) =>  {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(size));


    return (
        <IsMobileContext.Provider value={{ isMobile: isMobile  }}>
            {children}
        </IsMobileContext.Provider>
      
          
      );
  };
  
  export default IsMobileProvider;