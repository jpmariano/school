import Image from 'next/image'
import styles from './page.module.css'
import {darkTheme, lightTheme} from '@/material/thememode'
import { StyledEngineProvider, ThemeProvider, Typography } from '@mui/material'
import Main from '@/components/main'
export default function Home() {
  return (
    <Main>
      <Typography component="h1" variant="h1">test</Typography>
      <Typography component="h2" variant="h2">test</Typography>
      <Typography component="h3" variant="h3">test</Typography>
      <Typography component="h4" variant="h4">test</Typography>
      <Typography component="p">test</Typography>
    </Main>
  )
}
