
import Main from '@/components/main'
import CenterBoxWithSidebar from '@/components/layouts/centerBoxWithSidebar'
import Aside from '@/components/layouts/aside'
import NotAside from '@/components/layouts/notAside'
import AuthProgressWrapper from '@/components/authProgressWrapper'
import Typography from '@mui/material/Typography'
import HorizontalSeparator from '@/components/layouts/horizontalSeparator'
import CenterBox from '@/components/layouts/centerBox'
import MainVerticalNavigation from '@/components/navigation/mainVerticalNavigation'



export default function Home() {
  
  return (
    <Main>
        <CenterBoxWithSidebar fullHeight={true}>
          <Aside hideOnMobile={true} showBoxShadow={false} toggleSidebar={true}>
            <MainVerticalNavigation />
          </Aside>
          <NotAside addClassName="inverse" showBoxShadow={false}>
            <Typography component="h1" variant="h1" align="center">Unauthorized - Error 401</Typography>
            <Typography component="p" variant="body2">You are not authorized to view this page. </Typography>
          </NotAside>
        </CenterBoxWithSidebar>
    </Main>
  )
}
