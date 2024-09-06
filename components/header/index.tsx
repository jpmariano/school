
'use client'
import React, { useEffect, useState } from 'react';
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
import { headers } from 'next/headers';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';
import styles from "@/styles/components/header/index.module.scss";

/*
export const getStaticProps: GetStaticProps = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useTheme();
return { props: { theme } }
}   */
 
  
const Header: React.FC = () => {
    //const headerList = headers();
    //const pathname = headerList.get('x-current-path') || '';
    const pathname = usePathname();
    const hideHeaders: Array<string> = ['/login', '/password-reset'];
    const searchParams = useSearchParams();
    const [isRedirect, setIsRedirect] = useState(false);
    
    console.log('fromRedirect*********', searchParams.get('redirect'));
   // const router = useRouter();
    //const isRedirected = router.query.redirected === 'true';
    //console.log('isRedirected', isRedirected);
   //{pathname && !hideHeaders.includes(pathname) && <Header/>}

   useEffect(() => {
     //const fromRedirect = searchParams.get('redirect') === 'true';
     if(searchParams.get('redirect')){
        setIsRedirect(true);
     }
   }, [isRedirect]);
   if(!isRedirect){
    if (pathname && hideHeaders.includes(pathname)) {
        return null;
    }
   }
   
    
   
  return ( 
   <Box component="header" px={2} className={styles.header} >
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
