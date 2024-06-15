import { Box, Paper, Typography } from '@mui/material'
import Link from 'next/link'
import Main from '@/components/main'
import HorizontalSeparator from '@/components/layouts/horizontalSeparator'
import FullWidthBox from '@/components/layouts/fullWidth'
import FullPageTemplate from '@/components/layouts/fullPageTemplate'
import CenterBox from '@/components/layouts/centerBox'
import LinkColor from '@/components/linkColor'
 
export default function NotFound() {
  return (

      <FullPageTemplate>
          <Main>
            <HorizontalSeparator />
            <CenterBox>
              <Box component="div">
                <Typography variant="h1" component="h1" align="center">404 Page not Found</Typography>
                <Typography component="p">Could not find requested resource</Typography>
                <LinkColor href="/">Return Home</LinkColor>
              </Box>
            </CenterBox>
              
          </Main>
      </FullPageTemplate>
  
  )
}