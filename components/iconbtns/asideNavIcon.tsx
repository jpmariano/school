
'use client'
import React, { useEffect } from 'react';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setToggle } from '@/store/features/toggleSlice';
import LightIcon from '@mui/icons-material/Light';
import MenuIcon from '@mui/icons-material/Menu';

export interface asideNavIconProps {
    toggleId: number;
}

const AsideNavIcon: React.FC<asideNavIconProps> = ({ toggleId }) => {
    const toggle = useAppSelector((state) => state.toggle);
    const [mode, setMode] = React.useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const showAside = toggle.toggleArr.find((content) => content?.id === toggleId );
        if (showAside) {
            setMode(showAside.open);
        } 
    }, [toggleId, toggle]);


    const toggleMode = () => {
        const showAside = toggle.toggleArr.find((content) => content?.id === toggleId );
        if(showAside){
            dispatch(setToggle({ open: !showAside?.open, id: toggleId }));
        } else {
            dispatch(setToggle({ open: !mode, id: toggleId }));
        } 
    };
    return (

        <IconButton onClick={toggleMode} sx={{ color: "inherit", float: 'left', marginTop: '2px'}}  aria-label="Sidebar Navigation Toggle Button">
            <MenuIcon />
        </IconButton>


    );
};

export default AsideNavIcon;
