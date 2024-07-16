
import Main from '@/components/main'
import CenterBoxWithSidebar from '@/components/layouts/centerBoxWithSidebar'
import Aside from '@/components/layouts/aside'
import NotAside from '@/components/layouts/notAside'
import CenterBox from '@/components/layouts/centerBox'
import LoginForm from '@/components/loginForm'
import { Divider } from '@mui/material'



export default function Home() {

  return (
    <Main>
        <Divider sx={{border: 'none', height: '100px'}}/>
        <LoginForm></LoginForm>
    </Main>
  )
}
