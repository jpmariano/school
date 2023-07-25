import Image from 'next/image'
import styles from './page.module.css'
import {darkTheme, lightTheme} from '@/material/thememode'
import { StyledEngineProvider, ThemeProvider } from '@mui/material'
export default function Home() {
  return (
    <main className={styles.main}>
      test
    </main>
  )
}
