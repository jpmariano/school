
'use client'
import React, { useEffect } from 'react';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
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
        let modeFromStorage;
        modeFromStorage = localStorage.getItem("modeFromStorage") || "";

        if(modeFromStorage){
            modeFromStorage === "1" ? dispatch(setToggle({ open: true, id: toggleId })) : dispatch(setToggle({ open: false, id: toggleId }));
        } 
        
    }, []);

    useEffect(() => {

        const isDark = toggle.toggleArr.find((content) => content?.id === toggleId );
        if (isDark) {
           
            setMode(isDark.open);
        } 
        
    }, [toggleId, toggle]);

    const toggleMode = () => {
        const isDark = toggle.toggleArr.find((content) => content?.id === toggleId );
        if(isDark){
            //localStorage.setItem("modeFromStorage", favoriteNumber)
            !isDark?.open ? localStorage.setItem("modeFromStorage", "1") : localStorage.setItem("modeFromStorage", "0");
            dispatch(setToggle({ open: !isDark?.open, id: toggleId }));
        } else {
            !mode ? localStorage.setItem("modeFromStorage", "1") : localStorage.setItem("modeFromStorage", "0");
            dispatch(setToggle({ open: !mode, id: toggleId }));
        } 
    };
    return (

        <IconButton onClick={toggleMode} sx={{ color: mode ? "#000000": "#FCB61C", float: 'left', marginTop: '14px', marginLeft: '3px', padding: '3px'}}  aria-label="light and dark mode toggle">
            {mode ?  <NightlightRoundIcon /> :  <LightModeIcon />}
        </IconButton>


    );
};

export default LightDarkModeBtn;
