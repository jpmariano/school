
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
import {breadcrumbPath, lesson, listOfLessons, node, lessonid, Relationships, PathDetails, Data} from '@/types'
import BodyContent from '@/components/bodyContent'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CircleIcon from '@mui/icons-material/Circle';
import LessonsPerChapter from '@/components/lessonsPerChapter'
import Breadcrumb from '@/components/breadCrumb';
import LessonCompleted from '@/components/lessonCompleted'
import Slices from '@/components/slices'
import { NextRequest } from 'next/server'
import { getLessonCompletion, getNode, getPage } from '@/api/drupal'

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

  const pageDetails: PathDetails = await getPage(pathname ? pathname : '/');
  const node:node =  await getNode(pageDetails.entity.uuid, 'lesson');
  const nodeLessonCompletion:lessonid[] =  await getLessonCompletion('1', pageDetails.entity.id);
  

  const routes: breadcrumbPath[] = [{path: '/', breadcrumb: 'Home'},{path: '/html', breadcrumb: 'HTML'}, {path: params.slug, breadcrumb: pageDetails.label}];

  const paragraphType: keyof Relationships | null =  await node ? Object.keys(node.data.relationships).filter((s) => s.indexOf('paragraph') !== -1)[0] as keyof Relationships : null;
  const hasComponents = paragraphType !== null;
  
  const content = hasComponents && (
		<Slices
			data={paragraphType ? node.data.relationships?.[paragraphType ? paragraphType : "field_paragraph_lesson"] : null}
			included={node.included}
			nodetype={node.data.type}
		/>
	); 
  

  return (
    <Main>
      <CenterBoxWithSidebar fullHeight={true}>
        <Aside hideOnMobile={true} showBoxShadow={false} toggleSidebar={true}>
            <MainVerticalNavigation />
        </Aside>
        <NotAside addClassName="inverse" showBoxShadow={false}>
          <Box component='article'>
            <Breadcrumb route={routes} />
            <Box id="title" ><Typography component='h1' variant='h1' className="" sx={{display: 'inline-block'}}>{pageDetails.label}</Typography><LessonCompleted nodeLessonCompletion={nodeLessonCompletion} /></Box>
            {"entity" in pageDetails && "type" in pageDetails.entity &&  pageDetails.entity.type == 'node' && <BodyContent value={node.data.attributes.body.value} />}
            {content}
          </Box>
        </NotAside>
      </CenterBoxWithSidebar>
    </Main>
  )
}
