
import React, { useEffect } from 'react';
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { Box, useTheme, Grid, IconButton, useMediaQuery} from '@mui/material';
import Logo from "@/components/logo";
import HeaderNav from "@/components/headernav";
import LightModeIcon from '@mui/icons-material/LightMode';
import { useAppDispatch, useAppSelector } from '@/store/store';
import LightDarkModeBtn from '@/components/iconbtns/lightDarkModeBtn';
import LoginDropdown from '@/components/iconbtns/loginDropdown';
import IsMobileProvider from '@/components/provider/ismobileProvider';
import AsideNavIcon from '@/components/iconbtns/asideNavIcon';

/*
export const getStaticProps: GetStaticProps = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useTheme();
return { props: { theme } }
}   */
 
  
const Header: React.FC = () => {
    
 
  return (
   <Box component="header" px={2} sx={{display: "flex", justifyContent: 'space-between', background: "#1d2c55", color: "#ffffff"}} >
        <Box  sx={{position: "relative"}}>
            <AsideNavIcon toggleId={1}/>
            <Logo /> 
            <LightDarkModeBtn toggleId={0}/>
        </Box>
        <Box  sx={{}}>
       
            <HeaderNav />
        
        
        </Box>
        <Box  sx={{}}>
        <LoginDropdown />
        </Box>            
    </Box>
        
    );
};

export default Header;
