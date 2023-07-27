
'use client'
import React, { useEffect } from 'react';
import { IconButton, Popover, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setToggle } from '@/store/features/toggleSlice';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';



const LoginDropdown: React.FC = () => {
   
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

   

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
                    <AccountCircleIcon fontSize="large" />
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
                        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
                    </Popover></div>
         

    );
};

export default LoginDropdown;
