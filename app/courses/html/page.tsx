
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
import {breadcrumbPath, lesson, listOfLessons, PathDetails, lessonid, node, ErrorResponse, CustomSession} from '@/types'
import BodyContent from '@/components/bodyContent'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CircleIcon from '@mui/icons-material/Circle';
import LessonsPerChapter from '@/components/lessonsPerChapter'
import Breadcrumb from '@/components/breadCrumb';
import ChapterCompleted from '@/components/chapterCompleted';
import { NextRequest } from "next/server";
import { getListofCompletedLessonsbySubject, getListofLessonByTaxId, getNode, getPage, isFetchResponse } from '@/api/drupal';
import { notFound } from 'next/navigation';
import { authOptions } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'
import { signOut } from 'next-auth/react'
import TokenExpiredMessage from '@/components/tokenExpiredMessage'
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
/*
async function getPage(slug: string): Promise<PathDetails>{
  const response = await fetch(`${BASE_URL}/router/translate-path?path=${slug}`);
  const data = await response.json();
  return data;
} */




export default async function slug() {
  const session: CustomSession = await getServerSession(authOptions) as CustomSession;
  const headerList = headers();
  const pathname = headerList.get("x-current-path");
  const page_details_response: Response | ErrorResponse = await getPage(pathname ? pathname : '/');

  
  //console.log('page_details_response', page_details_response);
  if (!isFetchResponse(page_details_response)) {
    if(page_details_response.status === 401){
      return <TokenExpiredMessage />;
    }
    notFound();
  }
  const pageDetails: PathDetails = await page_details_response.json();
  
    const allLessonsResponse: Response | ErrorResponse = await getListofLessonByTaxId(pageDetails.entity.id);
    const allLessons: listOfLessons = isFetchResponse(allLessonsResponse) && await allLessonsResponse.json();
    const listOfAllLessonPerChapter:string[] = allLessons.map((item: lesson, index) => { return item.field_subject_of_lesson}).filter((value, index, array) => array.indexOf(value) === index);  
    const listofCompletedLessonsbySubjectResponse: Response | ErrorResponse = await getListofCompletedLessonsbySubject(session.user.userId, pageDetails.entity.id);
    const listofCompletedLessonsbySubject: lessonid[] = isFetchResponse(listofCompletedLessonsbySubjectResponse) && await listofCompletedLessonsbySubjectResponse.json();
 
  
  

  return (
    <Main>
      <CenterBoxWithSidebar fullHeight={true}>
        <Aside hideOnMobile={true} showBoxShadow={false} toggleSidebar={true}>
            <MainVerticalNavigation />
        </Aside>
        <NotAside addClassName="inverse" showBoxShadow={false}>
          <Box component='article'>
            <Breadcrumb pathname={pathname} />
            {pageDetails.entity.type === 'taxonomy_term' && <Box id="title" ><Typography component='h1' variant='h1' className="" sx={{display: 'inline-block'}}>{pageDetails.label}</Typography>
            <ChapterCompleted listOfLessons={allLessons} listofCompletedLessonsbySubject={listofCompletedLessonsbySubject}/>
            <LessonsPerChapter chapters={listOfAllLessonPerChapter} listOfLessons={allLessons} listofCompletedLessonsbySubject={listofCompletedLessonsbySubject} />
            </Box>}
          </Box>
        </NotAside>
      </CenterBoxWithSidebar>
    </Main>
  )
}
