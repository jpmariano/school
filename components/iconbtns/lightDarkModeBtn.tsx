
'use client'
import React, { useEffect } from 'react';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setToggle } from '@/store/features/toggleSlice';
import LightIcon from '@mui/icons-material/Light';

export interface lightDarkModeProps {
    toggleId: string;
}

const LightDarkModeBtn: React.FC<lightDarkModeProps> = ({ toggleId }) => {
    const toggle = useAppSelector((state) => state.toggle);
    const [mode, setMode] = React.useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (toggle.id === toggleId) {
            setMode(toggle.open);
        } 
      
    }, [toggleId, toggle]);

    const toggleMode = () => {
        dispatch(setToggle({ open: !toggle.open, id: toggleId }));
    };
    return (

        <IconButton onClick={toggleMode} sx={{ color: mode ? "inherit": "#FCB61C", position: "absolute", top: "27px", left: "228px"}}  aria-label="light and dark mode toggle">
            <LightModeIcon />
        </IconButton>


    );
};

export default LightDarkModeBtn;
