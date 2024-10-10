
import Main from '@/components/main'
import CenterBoxWithSidebar from '@/components/layouts/centerBoxWithSidebar'
import Aside from '@/components/layouts/aside'
import NotAside from '@/components/layouts/notAside'
import AuthProgressWrapper from '@/components/authProgressWrapper'
import MainVerticalNavigation from '@/components/navigation/mainVerticalNavigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'
import { CustomSession } from '@/types'
import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'
import UserProfile from '@/components/userProfile'
import { getSessionToken } from '@/api/drupal'


interface UserPageProps {
    params: {
      id: string;
    };
  }

  
export default async function User({ params }: UserPageProps) {
    const { id } = params;
    const session = await getServerSession(authOptions) as CustomSession;
    if(session.user.userId !== id){
        redirect('/unauthorized');
    }
    //const X_CSRF_TOKEN = session.user.drupal_session
    //console.log('session***********', session.user);
    //console.log('getSessionToken***********', getSessionToken());
  return (
    <Main>
        <CenterBoxWithSidebar fullHeight={true}>
            <Aside hideOnMobile={true} showBoxShadow={false} toggleSidebar={true}>
                <MainVerticalNavigation />
            </Aside>
          <NotAside addClassName="inverse" showBoxShadow={false}>
            <UserProfile id={id} />
          </NotAside>
        </CenterBoxWithSidebar>
    </Main>
  )
}
