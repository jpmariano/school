
import Main from '@/components/main'
import CenterBoxWithSidebar from '@/components/layouts/centerBoxWithSidebar'
import Aside from '@/components/layouts/aside'
import NotAside from '@/components/layouts/notAside'
import MainVerticalNavigation from '@/components/navigation/mainVerticalNavigation'



export default function Html() {

  return (
    <Main>
      <CenterBoxWithSidebar fullHeight={true}>
        <Aside hideOnMobile={true} showBoxShadow={false} toggleSidebar={true}>
            <MainVerticalNavigation />
        </Aside>
        <NotAside addClassName="inverse" showBoxShadow={false}>item 2</NotAside>
      </CenterBoxWithSidebar>
    </Main>
  )
}