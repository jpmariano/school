
'use client'
import React, { useContext } from 'react';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box, List, ListItem, Typography, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';
import Logo from "@/components/logo";
import { IsMobileContext } from '@/components/provider/ismobileProvider';
import styles from "@/styles/components/headernav/index.module.scss";
import { usePathname } from 'next/navigation';


const HeaderNav: React.FC = () => {
 // const { isMobile } = useContext(IsMobileContext);
  const theme = useTheme();
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const navItems = [
    { name: 'Home', link: '/' },
    { name: 'Test', link: '/test' },
    { name: 'font', link: '/font' }
  ];


  if(!isMobile){
    return (
      <Box component="nav" >
         <List sx={{ display: 'flex', direction: 'row', color: "#ffffff"}}>
         {navItems?.map((item: any, i: number) => (
              <ListItem
                key={i.toString()}
              >
                <Link href={item.link} passHref key={i.toString()} className={
                  pathname === item.link
                    ? styles.navlink__isActive
                    : styles.navlink
                }>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: '#ffffff' }}
                  >
                    {item.name}
                  </Typography>
                </Link>
              </ListItem>
            ))}
         </List>
      </Box> 
      )
  }
};

export default HeaderNav;
