
'use client'
import React, { useEffect } from 'react';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setToggle } from '@/store/features/toggleSlice';
import LightIcon from '@mui/icons-material/Light';

export interface lightDarkModeProps {
    toggleId: number;
}

const LightDarkModeBtn: React.FC<lightDarkModeProps> = ({ toggleId }) => {
    const toggle = useAppSelector((state) => state.toggle);
    const [mode, setMode] = React.useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const isDark = toggle.toggleArr.find((content) => content?.id === toggleId );
        if (isDark) {
            setMode(isDark.open);
        } 
        
    }, [toggleId, toggle]);

    const toggleMode = () => {
        const isDark = toggle.toggleArr.find((content) => content?.id === toggleId );
        
        if(isDark){
            dispatch(setToggle({ open: !isDark?.open, id: toggleId }));
        } else {
            dispatch(setToggle({ open: !mode, id: toggleId }));
        } 
    };
    return (

        <IconButton onClick={toggleMode} sx={{ color: mode ? "#000000": "#FCB61C", float: 'left', marginTop: '14px', marginLeft: '3px', padding: '3px'}}  aria-label="light and dark mode toggle">
            <LightModeIcon />
        </IconButton>


    );
};

export default LightDarkModeBtn;
