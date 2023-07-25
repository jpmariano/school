import Header from '@/components/header'
import "the-new-css-reset/css/reset.css";
import '@/styles/index.scss';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {darkTheme, lightTheme} from '@/material/thememode'
import { StyledEngineProvider, ThemeProvider } from '@mui/material'
import { Providers } from '@/components/provider';

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
      <body className={inter.className} suppressHydrationWarning={true}>
      <Providers>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={lightTheme}>
            <Header />
            {children}
          </ThemeProvider>
        </StyledEngineProvider>
        </Providers>
      </body>
    </html>
  )
}


