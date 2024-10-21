'use client'
import React from 'react';
import { Box, Icon, List, ListItem, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import navItems from '@/data/iconnav.json';
import styles from "@/styles/components/iconbtns/iconnav.module.scss";
import { useSession } from 'next-auth/react';
import SignOutButton from '@/components/customSignOut/signOutButton';

const IconNav: React.FC = () => {
  const theme = useTheme();
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    let isLight: boolean = true;
    if (theme.palette.mode === 'dark') {
        isLight = false;
    }
  const { data: session } = useSession();
  if (!isMobile) {
    return (
      <Paper component="nav">
        <List sx={{ display: 'flex', color: isLight ? '#1E1E1E'  : '#ffffff' }} className='flex-col'>
          {navItems?.map((item: any, i: number) => (
            <ListItem key={i.toString()}>
              <Link 
                href={item.link === '/user' ? `${item.link}/${session?.user?.userId}` : item.link}
                passHref 
                className={`${isLight ? styles.navlinkdark  : styles.navlink } ${pathname === item.link ? isLight ? styles.navlinkdark__isActive  : styles.navlink__isActive : ''}`}
              >
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: isLight ? '#1E1E1E'  : '#ffffff' }}
                >
                  {item.name}
                </Typography>
              </Link>
            </ListItem>
          ))}
        </List>
        <SignOutButton />
      </Paper>
    );
  }

  return null; // Return null for mobile view to avoid rendering the nav
};

export default IconNav;
