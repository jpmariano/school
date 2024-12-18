
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
import {breadcrumbPath, lesson, listOfLessons, node, lessonid, Relationships, PathDetails, Data, ErrorResponse, CustomSession, GetNodeResponse} from '@/types'
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
import HorizontalSeparator from '@/components/layouts/horizontalSeparator'
import { NodePageProvider } from '@/components/nodePage'
import FullWidthBox from '@/components/layouts/fullWidth'
import CenterBox from '@/components/layouts/centerBox'



let  data: GetNodeResponse | ErrorResponse;

export async function generateMetadata(): Promise<Metadata> {

  //const data: GetNodeResponse | ErrorResponse = await GetNodePage();
  //data =  = await GetNodePage();
  if(data !== undefined){
    if(!("status" in data)){
      const { pageDetails, node } = data;
      return {
        title: pageDetails.label,
        description: node ? node.data.attributes.body.value : 'Learn by coding',
      };
    }
  }
     

  return {
    title: 'Webupps',
    description: 'Lean by coding',
  };
  
 
} 


export default async function page(params) {
  console.log('params-------', params);
  
  try {
    const data = await GetNodePage();
    //const data = await GetNodePage();
    if("status" in data){
      console.log("data_______", data);
      if (data.status)  {
        throw new Error(data.status.toString());
      }
      notFound();
    } else {
      const { pageDetails, node, nodeLessonCompletion, pathname} = data;
      const title = `${pageDetails.label} | Webupps`;
      const description = node ? node.data.attributes.body.value : pageDetails.label; // Adjust the description based on your data
      const paragraphType: keyof Relationships | null =  node ? Object.keys(node.data.relationships).filter((s) => s.indexOf('paragraph') !== -1)[0] as keyof Relationships : null;
      const hasComponents = paragraphType !== null;
      const content = node ? hasComponents && (
        <NodePageProvider 
              field_lesson_ref={pageDetails.entity.id} 
              field_subject_ref={node?.data?.relationships?.field_subject_of_lesson?.data?.meta?.drupal_internal__target_id} 
              initialnodeLessonCompletion={nodeLessonCompletion}>
                <Box id="title"><Typography component='h1' variant='h1' className="" sx={{ display: 'inline-block', mb:2 }}>{pageDetails.label}</Typography>
                    <LessonCompleted />
                </Box>
                <Slices
                  data={paragraphType ? node.data.relationships?.[paragraphType ? paragraphType : "field_paragraph_lesson"] : null}
                  included={node.included}
                  nodetype={node.data.type}
                />
        </NodePageProvider>
      ) : <Box id="title"><Typography component='h1' variant='h1' className="" sx={{ display: 'inline-block', mb:2 }}>{pageDetails.label}</Typography></Box>;
     
      return (
          <Main>
            <CenterBoxWithSidebar fullHeight={true}>
              <Aside hideOnMobile={true} showBoxShadow={false} toggleSidebar={true}>
                <MainVerticalNavigation />
              </Aside>
              <NotAside addClassName="inverse" showBoxShadow={false}>
                <Box component='article'>
                  <Breadcrumb pathname={pathname} />
     
                  {content} 
               
                   
                </Box>
              </NotAside>
            </CenterBoxWithSidebar>
          </Main>
      )
    }
    

      
      
   } catch (error) {
    console.log("error*****", error);
     if (error instanceof CustomError) {
      console.log("errorA*****", error);
       if (error.statusCode === 401) {
        return <TokenExpiredMessage />;
       }
     } else if (error instanceof Error) {
      const errorCode = Number(error.message);
          switch(errorCode) {
            case 404:
              notFound();
              break;
            case 401:
              return <TokenExpiredMessage />;
              break;
            default:
              if(errorCode >= 500){
                throw new Error(`Server Error (${errorCode}): Something went wrong.`);
              } else if (errorCode >= Number(400) && errorCode < 500) {
                throw new Error(`Client Error (${errorCode}): Something went wrong.`);
              } else {
                throw new Error(`Unknown Error (${errorCode}): Something went wrong.`);
              }
              break;
          } 
      } else {
        if(error = "Error: 401"){
          return <TokenExpiredMessage />;
        }
        notFound();
     }
     
   }

  
}
