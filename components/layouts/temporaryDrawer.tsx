
'use client'
import React, { ReactNode } from 'react';
import { Box, Drawer, Paper, useMediaQuery, useTheme } from '@mui/material';
import styles from "@/styles/components/layouts/stackrightbtn.module.scss";
import { useAppSelector } from '@/store/store';
import AsideNavIcon from '@/components/iconbtns/asideNavIcon';
import Logo from '@/components/logo';

export interface temporaryDrawerProps {
    children?: ReactNode;
}

const TemporaryDrawer: React.FC<temporaryDrawerProps> = ({children}) => {
 const toggle = useAppSelector((state) => state.toggle);
  const theme = useTheme();
  const showSidebar = toggle.toggleArr.find((content) => content?.id === 1);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    return (
        <Drawer
            anchor="left"
            elevation={0}
            open={showSidebar?.open}
            variant="temporary"
            disableScrollLock={true}
            sx={{
                width: '100vw',
                '& .MuiDrawer-paper': {
                    backgroundColor: 'background.paper',
                    color: '#ffffff',
                    padding: '32px, 24px, 32px, 24px',
                    width: isMobile ? '50vw' : '375px',
                    maxWidth: isMobile ? '50vw' : '375px',
                    height: '100vh',
                },
            }}
        >
            <Box sx={{background: "#1d2c55"}}>
                <AsideNavIcon toggleId={1}/>
                <Logo /> 
            </Box>
            {children}
        </Drawer>
    );
  } else {
    return null;
  }
    
};

export default TemporaryDrawer;
