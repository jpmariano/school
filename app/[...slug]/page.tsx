
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
import {node_lesson} from '@/types'
import BodyContent from '@/components/bodyContent'
//import stripJsonComments from 'strip-json-comments'
//import { getPage } from '@/api/drupal';

export type lesson = {
  term_node_tid: string;
  draggableviews: string;
  view_node: string;
  title: string;
  field_subject_of_lesson: string;
};

export type listOfLessons = lesson[];

export async function generateMetadata(): Promise<Metadata> {

  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "Webupps";
  const pathSegments = pathname.split("/").filter((segment) => segment !== ""); // Split pathname into segments and remove empty segments
  const titleSegments = pathSegments.map(
    (segment) => segment.charAt(0).toUpperCase() + segment.slice(1) // Capitalize the first letter of each segment
  );
  const lastIteminTitleSegments = titleSegments.pop();
  
 
  //const title = titleSegments.join(" › "); // Join segments with a separator
  const title = `${lastIteminTitleSegments} | Webupps`;
  const description = 'lorem';
  return { title, description };
}  // Example: "/home/profile" turns to "Home › Profile"

async function getPage(slug: string){
  const response = await fetch(`${BASE_URL}/router/translate-path?path=${slug}`);
  const data = await response.json();
  return data;
} 

async function getListofLessonByTaxId(taxid: string){
  const response = await fetch(`${BASE_URL}/api/v1/${taxid}?_format=json`);

  const result = await response.json();

  return result;
} 

async function getNode(uuid = '', bundle = '') {
  let params = {};
	switch (bundle) {
		case 'lesson': {
			break;
		}
		default: {
			break;
		}
	}
  ///jsonapi/node/lesson/4b8e32c1-2b60-4753-a3a1-8ba77fd44088
  //const response = await fetch(`${BASE_URL}/jsonapi/node/${bundle}/${uuid}, ${params}`);
  const response = await fetch(`${BASE_URL}/jsonapi/node/${bundle}/${uuid}`);
	const data = await response.json();
	
	return data;
}

async function getTaxonomyTerm(uuid: string){
  const response = await fetch(`${BASE_URL}/jsonapi/taxonomy_term/subject/${uuid}`);
  const data = await response.json();
  return data;
} 

export default async function slug() {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "Webupps";
  const pageDetails = await getPage(pathname);
  const nodeLesson = await getNode(pageDetails.entity.uuid, 'lesson');
  const nodeLessonInt = nodeLesson as node_lesson;
  
  

  switch(pageDetails.entity.type) { 
    case 'taxonomy_term': { 
       const taxonomyPage = await getTaxonomyTerm(pageDetails.entity.uuid);
       //console.log(taxonomyPage)
       break; 
    } 
    case 'node': { 
      const lessonPage = await getNode(pageDetails.entity.uuid, pageDetails.entity.bundle);

      break; 
   } 
    default: { 
       //statements; 
       break; 
    } 
 } 

 const allLessons = await getListofLessonByTaxId(pageDetails.entity.id);
 const arrayOfAllLesson = allLessons as listOfLessons;
 const listOfAllLessonPerChapter = arrayOfAllLesson.map((item: lesson, index) => { return item.field_subject_of_lesson}).filter((value, index, array) => array.indexOf(value) === index);  

  return (
    <Main>
      <CenterBoxWithSidebar fullHeight={true}>
        <Aside hideOnMobile={true} showBoxShadow={false} toggleSidebar={true}>
            <MainVerticalNavigation />
        </Aside>
        <NotAside addClassName="inverse" showBoxShadow={false}>
          <Box component='article'>
            <Typography component='h1' variant='h1' className="">{pageDetails.label}</Typography>
            {pageDetails.entity.type == 'taxonomy_term' && listOfAllLessonPerChapter.map((chapter: string, index: number) => {
              return (
                <List key={index}>
                  <ListItem><ListItemText primary={chapter} /></ListItem>
                  {arrayOfAllLesson.map((item: lesson, index1: number) => {
                    if (item.field_subject_of_lesson === chapter) {
                      return (
                        <List key={index1} sx={{ ml: 2}}>
                          <ListItem> <Link href={item.view_node}>{item.title}</Link></ListItem>
                        </List>
                      );
                    }
                  })}
                </List>
              );
            })}
            {pageDetails.entity.type == 'node' && BodyContent(nodeLessonInt.data.attributes.body.value)}
          </Box>
        </NotAside>
      </CenterBoxWithSidebar>
    </Main>
  )
}
