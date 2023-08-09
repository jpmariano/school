
'use client'
import React, { useContext } from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box, Link, List, ListItem, useMediaQuery, useTheme } from '@mui/material';
import Logo from "@/components/logo";
import { IsMobileContext } from '@/components/provider/ismobileProvider';
import styles from "@/styles/components/headernav/index.module.scss";

const HeaderNav: React.FC = () => {
 // const { isMobile } = useContext(IsMobileContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  if(!isMobile){
    return (
      <Box component="nav" >
         <List sx={{ display: 'flex', direction: 'row', color: "#ffffff"}}>
              <ListItem><Link href="/" >Home</Link></ListItem>
              <ListItem><Link href="/test" >Test</Link></ListItem>
              <ListItem><Link href="/font" className={styles.link} >font</Link></ListItem>
              <ListItem><Link href="/" className={styles.link} >Home3</Link></ListItem>
              <ListItem><Link href="/"className={styles.link} >Home4</Link></ListItem>
         </List>
      </Box> 
      )
  }
};

export default HeaderNav;
