'use client'


import { useSession } from 'next-auth/react';
import customSignOut from '.';
import { Button, useTheme } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const SignOutButton = () => {
    const { data: session } = useSession();

    const handleSignOut = async () => {
        const accessToken = session?.user.access_token as string | undefined;
        await customSignOut(accessToken);
    };

    const theme = useTheme();
    let isLight: boolean = true;
    if (theme.palette.mode === 'dark') {
        isLight = false;
    }

    return (
        <Button onClick={handleSignOut} variant="contained" endIcon={<ExitToAppIcon />} 
        sx={{bgcolor: isLight ? '#003966'  : '#121212', 
            "&:hover": { bgcolor: isLight ? '#1da8fe'  : '#ffffff', color:  isLight ? '#ffffff'  : '#000000',}, 
            color:  '#ffffff'}}>
            Sign Out
        </Button>
    );
};

export default SignOutButton;
