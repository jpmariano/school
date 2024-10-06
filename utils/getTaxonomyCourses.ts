import { getCompletedCourseByTaxId, getLessonCompletion, getListofCompletedLessonsbySubject, getListofLessonByTaxId, getNode, getPage, getTaxonomyTerm, isFetchResponse } from "@/api/drupal";
import { CustomSession, ErrorResponse, PathDetails, node, lessonid, GetNodeResponse, listOfLessons, lesson, GetTaxonomyPageCoursesResponse, TaxonomyComponents, TaxonomyPage, CompletedCourseNode } from "@/types";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { authOptions } from "./authOptions";
import { GetCompletedCourse } from "@/components/quiz/completedCourse";



export async function getTaxonomyPageCourses(): Promise<GetTaxonomyPageCoursesResponse|ErrorResponse> {
    const headerList = headers();
    const pathname = headerList.get("x-current-path");
    const pageDetailsResponse: Response | ErrorResponse = await getPage(pathname ? pathname : '/');
    
    if (!isFetchResponse(pageDetailsResponse)) {
      /*
      if (pageDetailsResponse.status === 401) {
        throw new Error('401');
      }
      notFound();*/
      return pageDetailsResponse;
    }
    
    const pageDetails: PathDetails = await pageDetailsResponse.json();
    const taxonomyPageResponse: Response | ErrorResponse = await getTaxonomyTerm(pageDetails.entity.uuid);
    const taxonomyPage: TaxonomyPage | null = isFetchResponse(taxonomyPageResponse) && await taxonomyPageResponse.json();
    const allLessonsResponse: Response | ErrorResponse = await getListofLessonByTaxId(pageDetails.entity.id);
    const allLessons: listOfLessons = isFetchResponse(allLessonsResponse) && await allLessonsResponse.json();
    const listOfAllLessonPerChapter:string[] = allLessons.map((item: lesson, index) => { return item.field_subject_of_lesson}).filter((value, index, array) => array.indexOf(value) === index);  
    const listofCompletedLessonsbySubjectResponse: Response | ErrorResponse = await getListofCompletedLessonsbySubject(pageDetails.entity.id);
    const listofCompletedLessonsbySubject: lessonid[] = isFetchResponse(listofCompletedLessonsbySubjectResponse) && await listofCompletedLessonsbySubjectResponse.json();
    const completedCourseResponse: Response | ErrorResponse = await getCompletedCourseByTaxId(pageDetails.entity.id);
    const completedCourse: CompletedCourseNode[] | [] = isFetchResponse(completedCourseResponse) && await completedCourseResponse.json();
    
    return { pageDetails, allLessons, listOfAllLessonPerChapter, listofCompletedLessonsbySubject, pathname, taxonomyPage, completedCourse };
  }