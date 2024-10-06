import { CompletedCourse, CustomSession } from "@/types";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GetCompletedCourse = async (tid: string) => {
  const session = await getServerSession(authOptions) as CustomSession;
    try {
        const response = await fetch(`/api/completed-course?tid=${tid}&uid=${session.user.userId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = response.json();
        return data;
      } catch (error) {
        return {
			success: false,
			message: error instanceof Error ? error.message : "Server failed getting completed-course",
			status: 500
		};
      }
}; 

export const PostCompletedCourse = async (completedCourse:CompletedCourse) => {
    try {

        if (!completedCourse) {
            return NextResponse.json({ message: 'Completed course json not found' }, { status: 400 });
        }

        const response = await fetch('/api/completed-course', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(completedCourse),
          });
        
        if (!response.ok) {
            return NextResponse.json({ message: 'something went wrong Post completed-course' }, { status: response.status });
        }

        const data = response.json();
        return data;
      } catch (error) {
        return {
			success: false,
			message: error instanceof Error ? error.message : "Server failed Post completed-course",
			status: 500
		};
      }
}; 


export const PatchCompletedCourse = async (nid: string, completedCourse:CompletedCourse) => {

    try {

        if (!completedCourse) {
            return NextResponse.json({ message: 'Completed Course json not found' }, { status: 400 });
        }

        const response = await fetch(`/api/completed-course/${nid}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(completedCourse),
          });
        
        if (!response.ok) {
            return NextResponse.json({ message: 'something went wrong Patching completed-course' }, { status: response.status });
        }

        const data = response.json();
        return data;
      } catch (error) {
        return {
			success: false,
			message: error instanceof Error ? error.message : "Server failed Patching completed-course",
			status: 500
		};
      }
}; 

export default {
    GetCompletedCourse,
    PostCompletedCourse,
    PatchCompletedCourse
  };
