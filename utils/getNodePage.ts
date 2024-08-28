import { getLessonCompletion, getNode, getPage, isFetchResponse } from "@/api/drupal";
import { CustomSession, ErrorResponse, PathDetails, node, lessonid } from "@/types";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { authOptions } from "./authOptions";

export async function GetNodePage() {
    const headerList = headers();
    const pathname = headerList.get("x-current-path");
    const pageDetailsResponse: Response | ErrorResponse = await getPage(pathname ? pathname : '/');
    
    if (!isFetchResponse(pageDetailsResponse)) {
      if (pageDetailsResponse.status === 401) {
        throw new Error('401');
      }
      notFound();
    }
    
    const pageDetails: PathDetails = await pageDetailsResponse.json();
    const session: CustomSession = await getServerSession(authOptions) as CustomSession;
    const nodeResponse: Response | ErrorResponse = await getNode(pageDetails.entity.uuid, 'lesson');
    const node: node | null = isFetchResponse(nodeResponse) && await nodeResponse.json();
    const nodeLessonCompletionResponse: Response | ErrorResponse = await getLessonCompletion(session.user.userId, pageDetails.entity.id);
    const nodeLessonCompletion: lessonid[] | [] = isFetchResponse(nodeLessonCompletionResponse) && await nodeLessonCompletionResponse.json();
    
    return { pageDetails, node, nodeLessonCompletion, pathname };
  }