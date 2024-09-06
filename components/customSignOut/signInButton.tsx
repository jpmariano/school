'use client'


import { useSession } from 'next-auth/react';
import customSignOut from '.';
import { Button, useTheme } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useRouter } from 'next/navigation';

const SignInButton = () => {
    
    const router = useRouter();
    const handleSignIn = async () => {
        //redirect('/login');
        router.push('/login')
    };

    const theme = useTheme();
    let isLight: boolean = true;
    if (theme.palette.mode === 'dark') {
        isLight = false;
    }
    //'#1da8fe' 
    return (
        <Button onClick={handleSignIn} variant="contained" endIcon={<LoginIcon />} sx={{bgcolor: isLight ? '#003966'  : '#121212', 
            "&:hover": { bgcolor: isLight ? '#1da8fe'  : '#ffffff', color:  isLight ? '#ffffff'  : '#000000',}, 
            color:  '#ffffff'}}>
            Sign In
        </Button>
    );
};

export default SignInButton;
