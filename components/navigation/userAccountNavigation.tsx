
'use client'
import React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import styles from "@/styles/components/navigation/mainVerticalNavigation.module.scss";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, useTheme } from '@mui/material';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import CodeIcon from '@mui/icons-material/Code';
import Icon from '@/components/icon';
import user_account from '@/public/icons/user_account.svg';
import user_account_dark from '@/public/icons/user_account_dark.svg';
import member_card from '@/public/icons/user-card-svgrepo-com.svg';
import member_card_dark from '@/public/icons/user-card-svgrepo-com-dark.svg';
import { usePathname, useRouter } from 'next/navigation';


interface UserAccountNavigationProps {
    id: string;
  }


const UserAccountNavigation: React.FC<UserAccountNavigationProps> = ({ id}) => {

  const theme = useTheme();
    let isLight: boolean = true;
    if (theme.palette.mode === 'dark') {
        isLight = false;
    }
  const router = useRouter();
  const pathname = usePathname();
  const isMedium = theme.breakpoints.between('md', 'lg');

  return (
    <List
      sx={{ width: '100%' }}
      component="nav"
      aria-labelledby="Side Navigation"
    >
      <ListItemButton onClick={(event) => { router.push(`/user/${id}`) }} className={ pathname === `/user/${id}` ? isLight ? styles.navlink__isActive : styles.navlinkDark__isActive : styles.navlink }>
        <ListItemIcon className={styles.ListItemIcon}>
          <Icon svg={isLight ? user_account : user_account_dark} alt={'User Icon'} size='md'/>
        </ListItemIcon>
        <ListItemText primary="Account" sx={{display: { md: 'none', lg: 'block' }}}/>
      </ListItemButton>
      <ListItemButton onClick={(event) => { router.push(`/membership/${id}`) }} className={ pathname === `/membership/${id}` ? isLight ? styles.navlink__isActive : styles.navlinkDark__isActive : styles.navlink }>
        <ListItemIcon className={styles.ListItemIcon}>
          <Icon svg={isLight ? member_card : member_card_dark} alt={'Member Icon'} size='md'/>
        </ListItemIcon>
        <ListItemText primary="Membership" sx={{display: { md: 'none', lg: 'block' }}}/>
      </ListItemButton>

      
    </List>
  );
};

export default UserAccountNavigation;
