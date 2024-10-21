
'use client'
import React, { useEffect } from 'react';
import { IconButton, Link, Popover, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setToggle } from '@/store/features/toggleSlice';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { useSession } from "next-auth/react";
import SignOutButton from '@/components/customSignOut/signOutButton';
import SignInButton from '@/components/customSignOut/signInButton';
import { UserProfileProvider } from '@/components/userProfile/userProvider';
import ProfileIcon from './profileIcon';
import IconNav from './iconNav';


const LoginDropdown: React.FC = () => {
   
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const { data: session, status } = useSession();
   

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setOpen(!open)
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setOpen(!open)
        setAnchorEl(null);
    };

    

    return (
      
        <div><IconButton onClick={handleOpen}  sx={{ color: open ? "#FCB61C" : "#ffffff" }} aria-label="Open login and sign up Link">
                    <UserProfileProvider id={session?.user.userId!}>
                        <ProfileIcon />
                    </UserProfileProvider>
                </IconButton><Popover
                    open={open}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      anchorEl={anchorEl}
                      onClose={handlePopoverClose} >
                        {!session ? 
                        <SignInButton /> : 
                        
                        <IconNav />}
                    </Popover></div>
         

    );
};

export default LoginDropdown;
