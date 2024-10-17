import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/utils/authOptions"; // adjust the path as needed
import { CustomSession, ErrorResponse } from '@/types';
import CustomError from '@/utils/CustomError';
type ResponseData = {
  message: string
}
 
export async function GET(request: NextRequest, { params }: { params: { id: string } }): Promise<Response|ErrorResponse>  {
   
	const { id } = params;
    if (!id) {
        return NextResponse.json({ message: 'ID not provided' }, { status: 400 });
    }
    const session = await getServerSession(authOptions) as CustomSession;
	const headers = {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${session.user.access_token}`
	};
	
    
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}?_format=json`, {
			method: "GET",
			headers: headers,
		});

		if (!response.ok) {
			return NextResponse.json({ message: 'something went wrong getting lesson completion' }, { status: response.status });
		}

		const result: Response = response;
		return result;
	} catch (error) {
		if (error instanceof CustomError) {
            return NextResponse.json({ message: error.message }, { status: error.statusCode });
		}
		return NextResponse.json({ message: "unkown error" }, { status: 500});
	}


}


export async function PATCH(req: NextRequest, { params }: { params: { id: string } }): Promise<Response|ErrorResponse> {
	const { id } = params;
    if (!id) {
        return NextResponse.json({ message: 'ID not provided' }, { status: 400 });
    }
    try {
      // Retrieve and parse the JSON body from the request
      const userUpdateRaw = await req.json();
      //const completedcourse = completedCourseRaw as CompletedCourse;
      if (!userUpdateRaw) {
        return NextResponse.json({ message: 'user update json not found' }, { status: 400 });
      }
      
      try {
      
        const session = await getServerSession(authOptions) as CustomSession;
    
        if (!session) {
            return NextResponse.json({ message: 'No session' }, { status: 500 });
        }
    
        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.user.access_token}`,
		      "X-CSRF-Token": session.user.drupal_session
        };
		
        //return NextResponse.json({ message: completedLesson }, { status: 200 });
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}?_format=json`, {
          method: "PATCH",
          headers: headers,
          body: JSON.stringify(userUpdateRaw)
        });
    
        if (!response.ok) {
          //throw new Error(`HTTP error! status: ${response.status}`);
          return NextResponse.json({ message: 'something went wrong updating user' }, { status: response.status });
        }
        return response; 
        
      } catch (error) {
        return NextResponse.json({ message: 'something went wrong updating user' }, { status: 500 });
      }
    } catch (error) {
      // In case of parsing error or unexpected issues
      return NextResponse.json({ message: 'Invalid JSON or error parsing body' }, { status: 400 });
    }
}
