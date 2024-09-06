"use client";
import { Box, Paper, Typography } from '@mui/material'
import Link from 'next/link'
import Main from '@/components/main'
import HorizontalSeparator from '@/components/layouts/horizontalSeparator'
import FullWidthBox from '@/components/layouts/fullWidth'
import FullPageTemplate from '@/components/layouts/fullPageTemplate'
import CenterBox from '@/components/layouts/centerBox'
import LinkColor from '@/components/linkColor'
import { signOut, useSession } from 'next-auth/react'
import customSignOut from '@/components/customSignOut';
 
export default function TokenExpiredMessage() {
  const { data: session } = useSession();
    const handleSignOut = async () => {
      const accessToken = session?.user.access_token as string | undefined;
        await customSignOut(accessToken);
        //signOut({ callbackUrl: '/login' });
      };

  return (

      <FullPageTemplate>
          <Main>
            <HorizontalSeparator />
            <CenterBox>
              <Box component="div">
                <Typography variant="h1" component="h1" align="center">401 Unauthorized</Typography>
                <Typography component="p">Your Token is Expired</Typography>
                <Link href="#" onClick={handleSignOut} >
                    <Typography  variant="button" display="block" align="center" >Try Logging In</Typography>
                </Link>
              </Box>
            </CenterBox>
          </Main>
      </FullPageTemplate>
  
  )
}