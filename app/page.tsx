
import Main from '@/components/main'
import CenterBoxWithSidebar from '@/components/layouts/centerBoxWithSidebar'
import Aside from '@/components/layouts/aside'
import NotAside from '@/components/layouts/notAside'
import AuthProgressWrapper from '@/components/authProgressWrapper'



export default function Home() {

  return (
    <Main>
        <CenterBoxWithSidebar fullHeight={true}>
          <Aside hideOnMobile={true} showBoxShadow={false} toggleSidebar={true}>item 1</Aside>
          <NotAside addClassName="inverse" showBoxShadow={false}>item 2</NotAside>
        </CenterBoxWithSidebar>
    </Main>
  )
}
