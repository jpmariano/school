
import Main from '@/components/main'
import CenterBoxWithSidebar from '@/components/layouts/centerBoxWithSidebar'
import Aside from '@/components/layouts/aside'
import NotAside from '@/components/layouts/notAside'
import { notFound } from 'next/navigation';
import { headers } from "next/headers";
import { getPage, isFetchResponse } from '@/api/drupal';
import { ErrorResponse } from '@/types';

export default async function Page() {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  //console.log('pathname', pathname);
  //const pageDetails: PathDetails = await getPage(pathname ? pathname : '/');
  const page_details_response: Response | ErrorResponse = await getPage(pathname ? pathname : '/');
    if (!isFetchResponse(page_details_response)) {
      // notFound();
    }
  return (
    <Main>
      <CenterBoxWithSidebar fullHeight={true}>
        <Aside hideOnMobile={true} showBoxShadow={false} toggleSidebar={true}>item 1</Aside>
        <NotAside addClassName="inverse" showBoxShadow={false}>item 2</NotAside>
      </CenterBoxWithSidebar>
    </Main>
  )
}
