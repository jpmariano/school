
'use client'
import React, { useEffect } from 'react';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setToggle } from '@/store/features/toggleSlice';
import LightIcon from '@mui/icons-material/Light';
import MenuIcon from '@mui/icons-material/Menu';

export interface asideNaveIconProps {
    toggleId: number;
}

const AsideNaveIcon: React.FC<asideNaveIconProps> = ({ toggleId }) => {
    const toggle = useAppSelector((state) => state.toggle);
    const [mode, setMode] = React.useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const showAside = toggle.toggleArr.find((content) => content.id === toggleId );
        
        if (showAside) {
            setMode(showAside.open);
        } 
        console.log(toggle)
    }, [toggleId, toggle]);


    const toggleMode = () => {
        console.log('test')
        const showAside = toggle.toggleArr.find((content) => content?.id === toggleId );
        if(showAside){
            console.log('test')
            dispatch(setToggle({ open: !showAside?.open, id: toggleId }));
        } else {
            console.log('test')
            dispatch(setToggle({ open: !mode, id: toggleId }));
        } 
    };
    return (

        <IconButton onClick={toggleMode} sx={{ color: mode ? "inherit": "#FCB61C"}}  aria-label="Sidebar Navigation Toggle Button Test">
            <MenuIcon />
        </IconButton>


    );
};

export default AsideNaveIcon;
