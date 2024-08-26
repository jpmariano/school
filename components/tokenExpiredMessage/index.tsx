"use client";
import { Box, Paper, Typography } from '@mui/material'
import Link from 'next/link'
import Main from '@/components/main'
import HorizontalSeparator from '@/components/layouts/horizontalSeparator'
import FullWidthBox from '@/components/layouts/fullWidth'
import FullPageTemplate from '@/components/layouts/fullPageTemplate'
import CenterBox from '@/components/layouts/centerBox'
import LinkColor from '@/components/linkColor'
import { signOut } from 'next-auth/react'
 
export default function TokenExpiredMessage() {
    const handleSignOut = () => {
        signOut({ callbackUrl: '/login' });
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