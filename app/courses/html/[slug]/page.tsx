
import Main from '@/components/main'
import CenterBoxWithSidebar from '@/components/layouts/centerBoxWithSidebar'
import Aside from '@/components/layouts/aside'
import NotAside from '@/components/layouts/notAside'
import MainVerticalNavigation from '@/components/navigation/mainVerticalNavigation'
import type { Metadata } from 'next'
import { headers } from "next/headers";
import { BASE_URL } from '@/api/config';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material'
import Link from 'next/link'
import {breadcrumbPath, lesson, listOfLessons, node, lessonid, Relationships, PathDetails, Data, ErrorResponse, CustomSession} from '@/types'
import BodyContent from '@/components/bodyContent'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CircleIcon from '@mui/icons-material/Circle';
import LessonsPerChapter from '@/components/lessonsPerChapter'
import Breadcrumb from '@/components/breadCrumb';
import LessonCompleted from '@/components/lessonCompleted'
import Slices from '@/components/slices'
import { NextRequest } from 'next/server'
import { getLessonCompletion, getNode, getPage, isFetchResponse } from '@/api/drupal'
import TokenExpiredMessage from '@/components/tokenExpiredMessage'
import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'

//import stripJsonComments from 'strip-json-comments'
//import { getPage } from '@/api/drupal';





export async function generateMetadata(): Promise<Metadata> {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  const pathSegments = pathname && pathname.split("/").filter((segment) => segment !== ""); // Split pathname into segments and remove empty segments
  const titleSegments = pathSegments && pathSegments.map(
    (segment) => segment.charAt(0).toUpperCase() + segment.slice(1) // Capitalize the first letter of each segment
  );
  const lastIteminTitleSegments = titleSegments && titleSegments.pop();
  
 
  //const title = titleSegments.join(" › "); // Join segments with a separator
  const title = `${lastIteminTitleSegments} | Webupps`;
  const description = 'lorem';
  return { title, description };
}  // Example: "/home/profile" turns to "Home › Profile"



export default async function slug({ params }: { params: { slug: string } }) {
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  const page_details_response: Response | ErrorResponse = await getPage(pathname ? pathname : '/');
  const session: CustomSession = await getServerSession(authOptions) as CustomSession;
  if (!isFetchResponse(page_details_response)) {
    if(page_details_response.status === 401){
      return <TokenExpiredMessage />;
    }
    notFound();
  }
  const pageDetails: PathDetails = await page_details_response.json();
  console.log('pageDetails: ************', pageDetails);
  //let node: node | null = null;
  const nodeResponse: Response | ErrorResponse =  await getNode(pageDetails.entity.uuid, 'lesson');

  const node: node | null = isFetchResponse(nodeResponse) && await nodeResponse.json();
  const nodeLessonCompletionResponse: Response | ErrorResponse  =  await getLessonCompletion(session.user.userId, pageDetails.entity.id);
  const nodeLessonCompletion:lessonid[] | [] =  isFetchResponse(nodeLessonCompletionResponse) && await nodeLessonCompletionResponse.json();
  const paragraphType: keyof Relationships | null =  node ? Object.keys(node.data.relationships).filter((s) => s.indexOf('paragraph') !== -1)[0] as keyof Relationships : null;
  const hasComponents = paragraphType !== null;
  const content = node && hasComponents && (
		<Slices
			data={paragraphType ? node.data.relationships?.[paragraphType ? paragraphType : "field_paragraph_lesson"] : null}
			included={node.included}
			nodetype={node.data.type}
		/>
	);
  
  /*
  <Breadcrumb pathname={pathname} />
            <Box id="title" ><Typography component='h1' variant='h1' className="" sx={{display: 'inline-block'}}>{pageDetails.label}</Typography><LessonCompleted nodeLessonCompletion={nodeLessonCompletion} /></Box>
            {"entity" in pageDetails && "type" in pageDetails.entity &&  pageDetails.entity.type == 'node' && <BodyContent value={node.data.attributes.body.value} />}
            {content}*/
  return (
    <Main>
      <CenterBoxWithSidebar fullHeight={true}>
        <Aside hideOnMobile={true} showBoxShadow={false} toggleSidebar={true}>
            <MainVerticalNavigation />
        </Aside>
        <NotAside addClassName="inverse" showBoxShadow={false}>
          <Box component='article'>
          <Breadcrumb pathname={pathname} />
            <Box id="title" ><Typography component='h1' variant='h1' className="" sx={{display: 'inline-block'}}>{pageDetails.label}</Typography><LessonCompleted nodeLessonCompletion={nodeLessonCompletion} /></Box>
            {"entity" in pageDetails && "type" in pageDetails.entity &&  pageDetails.entity.type == 'node' && node && <BodyContent value={node.data.attributes.body.value} />}
            {content}
          </Box>
        </NotAside>
      </CenterBoxWithSidebar>
    </Main>
  )
}
