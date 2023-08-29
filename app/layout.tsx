import Header from '@/components/header'
import "the-new-css-reset/css/reset.css";
import "@/app/global.css";
import '@/styles/index.scss';
import '@/styles/fonts.scss';
import type { GetServerSideProps, Metadata } from 'next'
import { Inter } from 'next/font/google'
import {darkTheme, lightTheme} from '@/material/thememode'
import { Box, StyledEngineProvider, ThemeProvider } from '@mui/material'
import { Providers } from '@/components/provider';
import { useAppSelector } from '@/store/store';
import ThemeProviders from '@/components/provider/themeprovider';
import TemporaryDrawer from '@/components/layouts/temporaryDrawer';
import MainVerticalNavigation from '@/components/navigation/mainVerticalNavigation';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  
  
  return (
    
      <html lang={'en'}>
      <Box component="body" className={inter.className} suppressHydrationWarning={true}>
      <Providers>
        <StyledEngineProvider injectFirst>
          <ThemeProviders>
            <Header />
            {children}
            <TemporaryDrawer>
              <MainVerticalNavigation />
            </TemporaryDrawer>
          </ThemeProviders>
        </StyledEngineProvider>
        </Providers>
      </Box>
    </html>
 
    
  )
}
/*
export async function getServerSideProps: GetServerSideProps<Props> = async (
  context: any
) => {
 console.log(context)
  return { props: {} }
}*/
