
import React from 'react';
//import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
import { Box, useTheme, Grid} from '@mui/material';
import Logo from "@/components/logo";
import HeaderNav from "@/components/headernav";

/*
export const getStaticProps: GetStaticProps = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const theme = useTheme();
return { props: { theme } }
}   */
 
  
const Header: React.FC = () => {
    //console.log(this)
   //const theme = useTheme();
   //console.log(theme)
  return (
   <Box component="header" p={2} sx={{display: "flex", justifyContent: 'space-between'}}>
        <Box  sx={{ }}>
        <Logo />
        </Box>
        <Box  sx={{}}>
        <HeaderNav />
        </Box>         
     
                
          
      
    </Box>
        
    );
};

export default Header;
