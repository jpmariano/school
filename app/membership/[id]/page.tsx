
import Main from '@/components/main'
import CenterBoxWithSidebar from '@/components/layouts/centerBoxWithSidebar'
import Aside from '@/components/layouts/aside'
import NotAside from '@/components/layouts/notAside'
import AuthProgressWrapper from '@/components/authProgressWrapper'
import MainVerticalNavigation from '@/components/navigation/mainVerticalNavigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'
import { CustomSession, ErrorResponse, UserAccountDetails } from '@/types'
import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'
import UserProfile from '@/components/userProfile'
import { getSessionToken, getUserProfile, isFetchResponse } from '@/api/drupal'
import { UserProfileProvider } from '@/components/userProfile/userProvider'
import FetchUserProfile from '@/components/userProfile/fetchUserProfile'
import UserAccountNavigation from '@/components/navigation/userAccountNavigation'
import Membership from '@/components/membership'


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
    //const userProfileResponse: Response | ErrorResponse = await getUserProfile(id);
    //const userProfileLoaded: UserAccountDetails = isFetchResponse(userProfileResponse) && await userProfileResponse.json();
    //console.log('userProfileLoaded***********', userProfileLoaded);
    console.log('session***********', session);
    console.log('id*******', id);
  return (
    <Main>
        <CenterBoxWithSidebar fullHeight={true}>
            <Aside hideOnMobile={true} showBoxShadow={false} toggleSidebar={true}>
                <UserAccountNavigation id={id}/>
            </Aside>
          <NotAside addClassName="inverse" showBoxShadow={false}>
       
            <Membership id={id}/>
    
          </NotAside>
        </CenterBoxWithSidebar>
    </Main>
  )
}
