import Image from 'next/image'
import styles from './page.module.css'
import {darkTheme, lightTheme} from '@/material/thememode'
import { StyledEngineProvider, ThemeProvider, Typography } from '@mui/material'
import Main from '@/components/main'
import CenterBoxWithSidebar from '@/components/layouts/centerBoxWithSidebar'
import Aside from '@/components/layouts/aside'
import NotAside from '@/components/layouts/notAside'
export default function Home() {
  return (
    <Main>
      <CenterBoxWithSidebar fullHeight={true}>
        <Aside addClassName="inverse">item 1</Aside>
        <NotAside addClassName="inverse">item 2</NotAside>
      </CenterBoxWithSidebar>
    </Main>
  )
}
