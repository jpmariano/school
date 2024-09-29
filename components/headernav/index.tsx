'use client'
import React from 'react';
import { Box, List, ListItem, Typography, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import navItems from '@/data/mainnav.json';
import styles from "@/styles/components/headernav/index.module.scss";

const HeaderNav: React.FC = () => {
  const theme = useTheme();
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  if (!isMobile) {
    return (
      <Box component="nav">
        <List sx={{ display: 'flex', direction: 'row', color: "#ffffff" }}>
          {navItems?.map((item: any, i: number) => (
            <ListItem key={i.toString()}>
              <Link 
                href={item.link} 
                passHref 
                className={`${styles.navlink} ${pathname === item.link ? styles.navlink__isActive : ''}`}
              >
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
    );
  }

  return null; // Return null for mobile view to avoid rendering the nav
};

export default HeaderNav;
