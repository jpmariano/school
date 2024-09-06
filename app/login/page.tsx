

import Main from '@/components/main'
import CenterBoxWithSidebar from '@/components/layouts/centerBoxWithSidebar'
import Aside from '@/components/layouts/aside'
import NotAside from '@/components/layouts/notAside'
import CenterBox from '@/components/layouts/centerBox'
import LoginForm from '@/components/loginForm'
import { Divider } from '@mui/material'
import LoginPageWrapper from '@/components/authProgressWrapper/loginPageWrapper'
import BackgroundImage from '@/components/backgroundImage'



export default function Home() {

  return (
    <LoginPageWrapper>

    
    <Main>
        <Divider sx={{border: 'none', height: '100px'}}/>
        <LoginForm></LoginForm>
    </Main>
    </LoginPageWrapper>
  )
}
