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
import { headers } from 'next/headers';
import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/utils/authOptions';
import SessionProviderWrapper from '@/components/sessionProviderWrapper';
import LayoutContainer from '@/components/layouts/layoutContainer';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Webupps',
  description: 'Where coders Build, Code, and Succeed',
  icons: {
    icon: '/favicon.png', // Path to your favicon in the public folder
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headerList = headers();
  const pathname = headerList.get('x-current-path') || '';
  const hideHeaders: Array<string> = ['/login', '/password-reset'];
  const session = await getServerSession(authOptions);
 //{pathname && !hideHeaders.includes(pathname) && <Header/>}
  
  return (
    
      <html lang={'en'}>
      <Box component="body" className={inter.className} suppressHydrationWarning={true}>
      <Providers>
        <StyledEngineProvider injectFirst>
          <SessionProviderWrapper session={session}>
            
            <ThemeProviders>
            <Header/>
            <LayoutContainer>
              {children}
              <TemporaryDrawer>
                <MainVerticalNavigation />
              </TemporaryDrawer>
              </LayoutContainer>
            </ThemeProviders>
          </SessionProviderWrapper>
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
