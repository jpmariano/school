import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/utils/authOptions"; // adjust the path as needed
import type { Session } from 'next-auth'; // Import your CustomSession type
import { CompletedCourse, CustomSession, ErrorResponse } from '@/types';
type ResponseData = {
  message: string
}
 
export async function GET(request: NextRequest, res: NextResponse): Promise<Response|ErrorResponse>  {
  const { searchParams } = new URL(request.url);
  
  // Extract the 'uid' parameter from the query
  const nid = searchParams.get('nid');
 
  if (!nid) {
    return NextResponse.json({ message: 'No NID provided' }, { status: 400 });
  }
 
  try {
    const session = await getServerSession(authOptions) as CustomSession;

    if (!session) {
        return NextResponse.json({ message: 'No session' }, { status: 500 });
    }

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session.user.access_token}`
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/node/${nid}?_format=json`, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      return NextResponse.json({ message: 'something went wrong getting course completion' }, { status: response.status });
    }
    return response;
    //const result = await response.json();
    //return NextResponse.json(result);
 
  } catch (error) {
    return NextResponse.json({ message: 'something went wrong' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
    try {
      // Retrieve and parse the JSON body from the request
      const completedCourseRaw = await req.json();
      const completedcourse = completedCourseRaw as CompletedCourse;
      if (!completedcourse) {
        return NextResponse.json({ message: 'completedLesson json not found' }, { status: 400 });
      }
      
      try {
      
        const session = await getServerSession(authOptions) as CustomSession;
    
        if (!session) {
            return NextResponse.json({ message: 'No session' }, { status: 500 });
        }
    
        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session.user.access_token}`
        };
        //return NextResponse.json({ message: completedLesson }, { status: 200 });
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/node?_format=json`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(completedcourse)
        });
    
        if (!response.ok) {
          //throw new Error(`HTTP error! status: ${response.status}`);
          return NextResponse.json({ message: 'something went wrong completing lesson' }, { status: response.status });
        }
        return response; 
        
      } catch (error) {
        return NextResponse.json({ message: 'something went wrong completing lesson' }, { status: 500 });
      }
    } catch (error) {
      // In case of parsing error or unexpected issues
      return NextResponse.json({ message: 'Invalid JSON or error parsing body' }, { status: 400 });
    }
}
