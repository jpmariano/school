import { CompletedLesson } from "@/types";
import { NextRequest, NextResponse } from "next/server";

type ResponseData = {
    message: string;
  }


  
export const PatchCompletionData = async (nid: string, completedLesson: CompletedLesson) => {

    try {

        if (!completedLesson) {
            return NextResponse.json({ message: 'completedLesson json not found' }, { status: 400 });
        }

        const response = await fetch(`/api/completed-lesson/${nid}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(completedLesson),
          });
        
        if (!response.ok) {
            return NextResponse.json({ message: 'something went wrong Patching completed-lesson' }, { status: response.status });
        }

        const data = response.json();
        return data;
      } catch (error) {
        return {
			success: false,
			message: error instanceof Error ? error.message : "Server failed Patching completed-lesson",
			status: 500
		};
      }
  }; 

export default PatchCompletionData;