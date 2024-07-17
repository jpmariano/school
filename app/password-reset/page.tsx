
import Main from '@/components/main'
import CenterBoxWithSidebar from '@/components/layouts/centerBoxWithSidebar'
import Aside from '@/components/layouts/aside'
import NotAside from '@/components/layouts/notAside'
import CenterBox from '@/components/layouts/centerBox'
import LoginForm from '@/components/loginForm'
import { Divider } from '@mui/material'
import PasswordResetForm from '@/components/passwordReset'



export default function slug() {

  return (
    <Main>
        <Divider sx={{border: 'none', height: '100px'}}/>
        <PasswordResetForm/>
    </Main>
  )
}
