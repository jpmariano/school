
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
import { GetNodePage } from '@/utils/getNodePage'
import CustomError from '@/utils/CustomError'

//import stripJsonComments from 'strip-json-comments'
//import { getPage } from '@/api/drupal';





export async function generateMetadata(): Promise<Metadata> {
  try {
    const { pageDetails, node } = await GetNodePage();
    
    const title = `${pageDetails.label} | Webupps`;
    const description = node ? node.data.attributes.body.value : pageDetails.label; // Adjust the description based on your data
    
    return { title, description };
  } catch (error) {
    if (error instanceof CustomError) {
			if (error.message === '401') {
        return {
          title: 'Page Not Found | Webupps',
          description: 'Page Not Found',
        };
      }
		}
    return {
      title: 'Webupps',
      description: 'Page Error',
    };
  }
  
}  



export default async function slug({ params }: { params: { slug: string } }) {
  const { pageDetails, node, nodeLessonCompletion, pathname} = await GetNodePage();
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
